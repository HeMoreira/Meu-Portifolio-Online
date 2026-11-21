/* ==========================================================================
   Transição por pulsos — camada acima de TODO o conteúdo.

   Um único elemento (.pulse) é animado só com `transform: scale()` (compositor,
   sem layout): nasce no centro, expande até cobrir a viewport e volta ao centro.

     enter():  pulso 1 ─ pulso 2 ─ pulso 3 (expande, SEGURA, retorna)
                                     ├ load()  começa quando o 3º pulso começa
                                     └ mount() roda com a tela coberta
               Se a carga demorar, "Carregando..." pisca no centro.
     exit():   um pulso (curto; `long` = o pulso longo do 3º): expande ─ teardown() com a tela coberta ─ retorna
     cover():  o mesmo, com uma ação qualquer (reinício do jogo sem recarregar a página)

   A camada só captura eventos a partir do 3º pulso (enter) / do pulso (exit);
   nesse intervalo o resto da página fica `inert` e sem rolagem. Antes disso ela
   é `pointer-events: none` e não interfere em nada.
   prefers-reduced-motion: sem pulsos — um fade simples (entrada) / (saída).

   Este módulo é importado sob demanda por secret-mode.js; não conhece o jogo:
   recebe load/mount/teardown como funções.
   ========================================================================== */
import { h } from "../core.js";
import { SECRET_TRANSITION as T } from "./config.js";

const html = document.documentElement;
const abortError = () => new DOMException("Cancelado", "AbortError");
const nextFrame = () => new Promise((resolve) => requestAnimationFrame(() => resolve()));

export function createTransition() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const pulse = h("div", { class: "pulse", "data-pulse": "soft" });
  const loading = h("p", { class: "pulse-layer__loading", role: "status" });
  const layer = h("div", { class: "pulse-layer", "data-blocking": "false" }, pulse, loading);

  const animations = new Set();
  const inerted = [];
  let destroyed = false;
  let signal = null;

  /* ---------- Tamanho do pulso: círculo que cobre a diagonal da viewport ---------- */
  const sizePulse = () => {
    const d = Math.ceil(Math.hypot(window.innerWidth, window.innerHeight) * 1.5);
    layer.style.setProperty("--pulse-d", `${d}px`);
  };

  /* ---------- Bloqueio da página (só enquanto a tela está coberta) ---------- */
  function lockPage() {
    layer.dataset.blocking = "true";
    html.classList.add("is-secret-transition"); // sem rolagem
    for (const el of document.body.children) {
      if (el === layer || el.inert) continue;
      el.inert = true;
      inerted.push(el);
    }
  }

  function unlockPage() {
    layer.dataset.blocking = "false";
    html.classList.remove("is-secret-transition");
    for (const el of inerted.splice(0)) el.inert = false;
  }

  /* ---------- Animações (Web Animations; sempre canceláveis) ---------- */
  function play(el, keyframes, options) {
    if (destroyed || signal?.aborted) return Promise.reject(abortError());
    const animation = el.animate(keyframes, { fill: "forwards", ...options });
    animations.add(animation);
    return animation.finished.then(
      () => {
        animations.delete(animation);
      },
      () => {
        animations.delete(animation);
        throw abortError();
      },
    );
  }

  const EASE_OUT = "cubic-bezier(0.25, 0.1, 0.25, 1)";
  const EASE_IO = "cubic-bezier(0.45, 0, 0.25, 1)";

  /** Pulso completo (expande e retorna) em `duration` ms. */
  const fullPulse = (duration) =>
    play(
      pulse,
      [
        { transform: "scale(0)", easing: EASE_IO },
        { transform: "scale(1)", offset: 0.5, easing: EASE_IO },
        { transform: "scale(0)" },
      ],
      { duration },
    );

  const expand = (duration) =>
    play(pulse, [{ transform: "scale(0)" }, { transform: "scale(1)" }], {
      duration,
      easing: EASE_IO,
    });

  const retract = (duration) =>
    play(pulse, [{ transform: "scale(1)" }, { transform: "scale(0)" }], {
      duration,
      easing: EASE_IO,
    });

  /** reduced-motion: o pulso fica fixo cobrindo a tela e só a opacidade muda. */
  const fade = (from, to) =>
    play(pulse, [{ opacity: from, transform: "scale(1)" }, { opacity: to, transform: "scale(1)" }], {
      duration: T.reducedFadeMs,
      easing: "linear",
    });

  /** Espera estilos/fontes aplicados e pintados antes de revelar. */
  async function settle() {
    try {
      await document.fonts?.ready;
    } catch {
      /* sem suporte: segue */
    }
    await nextFrame();
    await nextFrame();
  }

  const sleep = (ms) =>
    new Promise((resolve, reject) => {
      if (signal?.aborted) return reject(abortError());
      const id = setTimeout(resolve, ms);
      signal?.addEventListener(
        "abort",
        () => {
          clearTimeout(id);
          reject(abortError());
        },
        { once: true },
      );
    });

  function attach() {
    sizePulse();
    window.addEventListener("resize", sizePulse);
    document.body.append(layer);
  }

  /* ---------- API ---------- */
  return {
    /**
     * @param {{
     *   load: () => Promise<any>,
     *   mount: (loaded: any) => void | Promise<void>,
     *   signal?: AbortSignal,
     * }} options
     * @returns {Promise<{ok: boolean}>}
     */
    async enter({ load, mount, signal: abortSignal }) {
      signal = abortSignal ?? null;
      attach();
      try {
        // a carga começa junto com a camada de carregamento (3º pulso / fade)
        const startLoad = () =>
          load().then(
            (value) => ({ ok: true, value }),
            (error) => ({ ok: false, error }),
          );
        let loadPromise;

        if (reduce) {
          pulse.dataset.pulse = "solid";
          lockPage();
          loadPromise = startLoad();
          await fade(0, 1);
        } else {
          pulse.dataset.pulse = "soft";
          await fullPulse(T.pulses[0]);
          await fullPulse(T.pulses[1]);
          pulse.dataset.pulse = "solid"; // 3º pulso: opaco, vira a camada de carregamento
          lockPage();
          loadPromise = startLoad();
          await expand(T.third.expandMs);
        }

        // ---- tela coberta: o conteúdo original está totalmente oculto ----
        let result = await Promise.race([loadPromise, sleep(T.loadingDelay).then(() => null)]);
        if (result === null) {
          // os pontos animam em degraus (CSS .pulse-layer__dots)
          loading.replaceChildren("Carregando", h("span", { class: "pulse-layer__dots" }, "..."));
          loading.dataset.visible = "true";
          const shownAt = performance.now();
          result = await loadPromise;
          const remaining = T.loadingMin - (performance.now() - shownAt);
          if (remaining > 0) await sleep(remaining);
        }
        signal?.throwIfAborted();

        if (!result.ok) {
          console.error("[modo secreto] falha ao carregar:", result.error);
          loading.textContent = "Não foi possível carregar o modo secreto.";
          loading.dataset.visible = "true";
          loading.dataset.error = "true";
          await sleep(2200);
          delete loading.dataset.visible;
          reduce ? await fade(1, 0) : await retract(T.third.retractMs / 2);
          return { ok: false };
        }

        await mount(result.value);
        signal?.throwIfAborted();
        await settle();
        delete loading.dataset.visible;
        loading.textContent = "";

        reduce ? await fade(1, 0) : await retract(T.third.retractMs);
        return { ok: true };
      } finally {
        this.destroy();
      }
    },

    /**
     * Cobre a tela, executa `action` (com tudo coberto) e revela de novo.
     * Base da saída e do reinício. `long: true` usa o pulso longo (o do 3º pulso).
     * @param {{action: () => void | Promise<void>, long?: boolean}} options
     */
    async cover({ action, long = false }) {
      signal = null;
      attach();
      pulse.dataset.pulse = "solid";
      lockPage();
      const d = long ? T.third : T.exit;
      try {
        reduce ? await fade(0, 1) : await expand(d.expandMs);
        await action();
        await settle();
        reduce ? await fade(1, 0) : await retract(d.retractMs);
      } finally {
        this.destroy();
      }
    },

    /**
     * Saída: cobre a tela, desmonta (teardown) e revela a página normal.
     * @param {{teardown: () => void | Promise<void>, long?: boolean}} options
     */
    exit({ teardown, long = false }) {
      return this.cover({ action: teardown, long });
    },

    /** Remove a camada, cancela animações e devolve a página ao normal. */
    destroy() {
      if (destroyed) return;
      destroyed = true;
      for (const animation of animations) animation.cancel();
      animations.clear();
      window.removeEventListener("resize", sizePulse);
      unlockPage();
      layer.remove();
    },
  };
}
