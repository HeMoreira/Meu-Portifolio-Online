/* ==========================================================================
   Easter egg da foto — controlador (máquina de estados + eventos).

   Responsabilidades: transições de estado, setas, movimento da foto, campo de
   código e ciclo de vida. A lógica de sequência (sequence.js), de validação
   (code.js) e o gancho futuro (secret-mode.js) ficam em módulos separados.

   Uso:   initEasterEggs(main)  →  procura [data-egg] e conecta cada um.
   Nada aqui conhece header, tema ou currículos.
   ========================================================================== */
import {
  SECRET_SEQUENCE,
  CODE_LENGTH,
  ENABLE_QUERY,
  NUDGE,
  DIRECTIONS,
  STATES as S,
  TRANSITIONS,
  EVENTS,
} from "./config.js";
import { createSequenceMatcher } from "./sequence.js";
import { sanitizeInput, isSecretCode } from "./code.js";
import { activateSecretMode, deactivateSecretMode } from "./secret-mode.js";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Conecta todos os [data-egg] dentro de `scope`. */
export function initEasterEggs(scope = document) {
  return [...scope.querySelectorAll("[data-egg]")].map((root) => initEasterEgg(root));
}

/**
 * @param {HTMLElement} root elemento .egg criado por createEggMarkup()
 * @param {{mediaQuery?: MediaQueryList}} [options]
 */
export function initEasterEgg(root, { mediaQuery = window.matchMedia(ENABLE_QUERY) } = {}) {
  const trigger = root.querySelector("[data-egg-trigger]");
  const photo = root.querySelector(".egg__photo");
  const pad = root.querySelector("[data-egg-pad]");
  const form = root.querySelector("[data-egg-code]");
  const input = form.querySelector("input");
  const status = form.querySelector("[role='status']");
  const arrows = [...pad.querySelectorAll("[data-egg-dir]")];

  const matcher = createSequenceMatcher(SECRET_SEQUENCE);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const lifetime = new AbortController();
  const { signal } = lifetime;

  let state = root.dataset.eggState || S.DISABLED;
  let nudge = null; // animação em curso da foto
  let locked = false; // true entre a última seta correta e a abertura do campo
  let secretOn = false;

  const emit = (name, detail = {}) =>
    root.dispatchEvent(new CustomEvent(name, { bubbles: true, detail }));

  /* ---------- Estado ---------- */
  function setState(next) {
    if (next === state) return true;
    if (!TRANSITIONS[state]?.includes(next)) return false;
    const from = state;
    state = next;
    root.dataset.eggState = next;
    renderState();
    emit(EVENTS.STATE_CHANGE, { from, to: next });
    return true;
  }

  /** Sincroniza o DOM com o estado atual (única função que mostra/oculta partes). */
  function renderState() {
    pad.hidden = state !== S.ACTIVE;
    form.hidden = state !== S.CODE && state !== S.SECRET;
    input.disabled = state === S.SECRET;
    if (trigger.hasAttribute("role")) {
      trigger.setAttribute("aria-expanded", String(state !== S.IDLE));
    }
  }

  /* ---------- Acessibilidade do gatilho (só quando o egg está habilitado) ---------- */
  function upgradeTrigger() {
    trigger.setAttribute("role", "button");
    trigger.setAttribute("tabindex", "0");
    trigger.setAttribute(
      "aria-label",
      `${root.dataset.eggLabel ?? "Foto"}. Ative para exibir os controles direcionais.`,
    );
    trigger.setAttribute("aria-controls", pad.id);
    trigger.setAttribute("aria-expanded", "false");
  }

  function downgradeTrigger() {
    for (const attr of ["role", "tabindex", "aria-label", "aria-controls", "aria-expanded"]) {
      trigger.removeAttribute(attr);
    }
  }

  /* ---------- Habilitar / desabilitar (largura da tela) ---------- */
  function enable() {
    if (state !== S.DISABLED) return;
    upgradeTrigger();
    matcher.reset();
    setState(S.IDLE);
  }

  function disable() {
    nudge?.cancel();
    nudge = null;
    locked = false;
    matcher.reset();
    input.value = "";
    clearFeedback();
    if (secretOn) {
      secretOn = false;
      deactivateSecretMode({ root, emit });
    }
    downgradeTrigger();
    setState(S.DISABLED);
  }

  /* ---------- Foto ---------- */
  function onTrigger() {
    if (state === S.IDLE) setState(S.ACTIVE);
  }

  trigger.addEventListener("click", onTrigger, { signal });
  trigger.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onTrigger();
      }
    },
    { signal },
  );

  /* ---------- Setas: movimento + sequência ---------- */
  function playNudge(dir) {
    nudge?.cancel();
    nudge = null;
    if (reduceMotion.matches || typeof photo.animate !== "function") return Promise.resolve();

    const [x, y] = DIRECTIONS[dir].vector;
    const d = NUDGE.distance;
    const animation = photo.animate(
      [
        { transform: "translate(0, 0)" },
        { transform: `translate(${x * d}px, ${y * d}px)`, offset: 0.45 },
        { transform: "translate(0, 0)" },
      ],
      { duration: NUDGE.duration, easing: "cubic-bezier(0.2, 0.8, 0.3, 1)" },
    );
    nudge = animation;
    // cancelar rejeita `finished`; o timeout garante que nada fique pendente
    return Promise.race([animation.finished.catch(() => {}), wait(NUDGE.duration + 120)]);
  }

  function onArrow(dir) {
    if (state !== S.ACTIVE || locked) return; // cliques fora do contexto são ignorados

    const done = playNudge(dir);
    const result = matcher.push(dir);
    emit(EVENTS.SEQUENCE, { dir, ...result });

    if (result.status === "complete") {
      locked = true; // bloqueia novas setas até a transição terminar
      done.then(() => {
        locked = false;
        if (state !== S.ACTIVE) return; // o egg foi desabilitado nesse meio-tempo
        input.value = "";
        clearFeedback();
        if (setState(S.CODE)) input.focus();
      });
    }
  }

  for (const arrow of arrows) {
    arrow.addEventListener("click", () => onArrow(arrow.dataset.eggDir), { signal });
  }

  /* ---------- Campo de código ---------- */
  function clearFeedback() {
    input.removeAttribute("aria-invalid");
    status.textContent = "";
  }

  function rejectCode(message) {
    input.value = "";
    input.setAttribute("aria-invalid", "true");
    status.textContent = "";
    requestAnimationFrame(() => {
      status.textContent = message; // textContent: nunca interpreta HTML
    });
    input.focus();
  }

  function submitCode() {
    if (state !== S.CODE) return;
    const value = input.value;

    if (value.length < CODE_LENGTH) {
      rejectCode(`Digite ${CODE_LENGTH} letras.`);
    } else if (isSecretCode(value)) {
      if (setState(S.SECRET)) {
        secretOn = true;
        activateSecretMode({ root, emit });
      }
    } else {
      rejectCode("Código incorreto. Tente novamente.");
    }
  }

  input.addEventListener(
    "input",
    () => {
      const clean = sanitizeInput(input.value); // só letras, no máximo 2
      if (clean !== input.value) input.value = clean;
      clearFeedback();
      if (clean.length === CODE_LENGTH) submitCode();
    },
    { signal },
  );

  form.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();
      submitCode();
    },
    { signal },
  );

  // Esc: sai do campo e volta às setas (a sequência precisa ser refeita)
  form.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Escape" && state === S.CODE) {
        event.preventDefault();
        matcher.reset();
        input.value = "";
        clearFeedback();
        if (setState(S.ACTIVE)) trigger.focus();
      }
    },
    { signal },
  );

  /* ---------- Ciclo de vida ---------- */
  const onMediaChange = (event) => (event.matches ? enable() : disable());
  mediaQuery.addEventListener("change", onMediaChange, { signal });
  renderState();
  if (mediaQuery.matches) enable();
  else disable();

  return {
    root,
    get state() {
      return state;
    },
    /** Atalho para ouvir os eventos deste egg (egg:statechange, egg:sequence, …). */
    on(name, handler) {
      root.addEventListener(name, handler, { signal });
    },
    destroy() {
      disable();
      lifetime.abort();
    },
  };
}
