/* ==========================================================================
   Carrossel de projetos/experiências (2 ou mais itens).

   Infinito: o item central é maior; há sempre 2 de cada lado (repetidos quando há poucos
   itens). Posições são inteiros absolutos — o item de uma posição p é itens[p mod n] — e só
   as posições a até 3 passos do centro existem no DOM.

   Todos os cards têm a MESMA ALTURA: a do maior card do ano. Uma "régua" invisível com uma
   cópia (sem mídia) de cada item é medida e o resultado vai para --card-h.

   Devolve { el, cardDe(index) } — cardDe leva o item ao centro e retorna o card.
   A posição visual de cada card vem só do CSS (data-o="-3…3"); ver carrossel.css.
   ========================================================================== */
import { h, anchorId, nextId } from "../core.js";
import { icon } from "../icons.js";
import { createProjeto, resetarProjeto, rotuloTipo } from "./projeto.js";

const ALCANCE = 3; // posições mantidas no DOM de cada lado (±3); só ±2 são visíveis
const SWIPE_PX = 60;
const mod = (i, n) => ((i % n) + n) % n;

/* ------------------------------------------------------------------ carrossel */

/**
 * @param {object[]} itens  4 ou mais (funciona com menos, repetindo)
 * @param {{rotulo: string, inicial?: number}} opcoes
 */
export function createCarrossel(itens, { rotulo, inicial = 0 }) {
  const n = itens.length;
  let ativo = inicial; // posição absoluta
  let pronto = false;
  const nos = new Map(); // posição → <li>

  const palco = h("ul", { class: "carrossel__palco", role: "list" });
  const anuncio = h("p", { class: "visually-hidden", "aria-live": "polite", "aria-atomic": "true" });
  const contador = h("span", { class: "carrossel__contador" });
  const prev = h("button", { class: "icon-btn carrossel__nav", type: "button" }, icon("prev"));
  const next = h("button", { class: "icon-btn carrossel__nav", type: "button" }, icon("next"));
  const pontos =
    n <= 8
      ? itens.map((item, i) =>
          h("button", {
            class: "carrossel__ponto",
            type: "button",
            "aria-label": `Ir para ${rotuloTipo(item.tipo)}: ${item.titulo}`,
            onclick: () => irPara(i),
          }),
        )
      : [];

  const controles = h(
    "div",
    { class: "carrossel__controles" },
    prev,
    h("div", { class: "carrossel__status" }, pontos.length ? h("div", { class: "carrossel__pontos" }, ...pontos) : null, contador),
    next,
  );

  const regua = h(
    "div",
    { class: "carrossel__regua", "aria-hidden": "true" },
    ...itens.map((item) => h("div", { class: "carrossel__regua-item" }, createProjeto(item, { comAncora: false, medicao: true }))),
  );
  regua.inert = true;

  const el = h(
    "div",
    {
      class: "carrossel",
      role: "group",
      "aria-roledescription": "carrossel",
      "aria-label": rotulo,
    },
    palco,
    controles,
    anuncio,
    regua,
  );

  /** Altura do maior card do ano → --card-h (todos os cards a respeitam). */
  function igualarAlturas() {
    const maior = Math.max(...[...regua.children].map((c) => c.offsetHeight));
    if (maior > 0) el.style.setProperty("--card-h", `${maior}px`);
  }
  if ("ResizeObserver" in window) {
    const observador = new ResizeObserver(igualarAlturas);
    [...regua.children].forEach((c) => observador.observe(c));
  }

  function criarNo(pos) {
    const item = itens[mod(pos, n)];
    const li = h(
      "li",
      { class: "carrossel__item", "data-item": mod(pos, n) },
      createProjeto(item, { comAncora: false }),
      // Camada que captura o clique nos cards laterais (só mouse/toque; teclado usa os botões)
      h("button", {
        class: "carrossel__escolher",
        type: "button",
        tabindex: "-1",
        "aria-hidden": "true",
        onclick: () => mover(pos - ativo),
      }),
    );
    nos.set(pos, li);
    palco.append(li);
    return li;
  }

  /** Cria/remove nós e aplica a posição (data-o) de cada um. */
  function desenhar() {
    for (const [pos, li] of nos) {
      if (Math.abs(pos - ativo) > ALCANCE) {
        resetarProjeto(li.firstElementChild);
        li.remove();
        nos.delete(pos);
      }
    }
    for (let pos = ativo - ALCANCE; pos <= ativo + ALCANCE; pos++) {
      if (nos.has(pos)) continue;
      const li = criarNo(pos);
      if (pronto && Math.abs(pos - ativo) < ALCANCE) li.dataset.entrando = ""; // salto grande: surge com fade
    }
    for (const [pos, li] of nos) {
      const o = pos - ativo;
      const card = li.firstElementChild;
      li.dataset.o = o;
      const central = o === 0;
      card.inert = !central; // laterais: só visuais (o botão .carrossel__escolher faz o papel de clique)
      if (central) li.removeAttribute("aria-hidden");
      else li.setAttribute("aria-hidden", "true");
      if (central) card.id = anchorId("projeto", itens[mod(pos, n)].id);
      else card.removeAttribute("id");
      if (!central) resetarProjeto(card);
    }
    const i = mod(ativo, n);
    contador.textContent = `${i + 1} / ${n}`;
    pontos.forEach((p, k) => (k === i ? p.setAttribute("aria-current", "true") : p.removeAttribute("aria-current")));
    prev.setAttribute("aria-label", `${rotuloTipo(itens[mod(ativo - 1, n)].tipo)} anterior: ${itens[mod(ativo - 1, n)].titulo}`);
    next.setAttribute("aria-label", `Próximo ${rotuloTipo(itens[mod(ativo + 1, n)].tipo).toLowerCase()}: ${itens[mod(ativo + 1, n)].titulo}`);
  }

  function mover(delta) {
    if (!delta) return;
    ativo += delta;
    desenhar();
    const item = itens[mod(ativo, n)];
    anuncio.textContent = `${rotuloTipo(item.tipo)}: ${item.titulo}, ${mod(ativo, n) + 1} de ${n}`;
  }

  /** Vai para o item `i` pelo caminho mais curto. */
  function irPara(i) {
    let delta = mod(i - ativo, n);
    if (delta > n / 2) delta -= n;
    mover(delta);
  }

  prev.addEventListener("click", () => mover(-1));
  next.addEventListener("click", () => mover(1));
  controles.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    mover(event.key === "ArrowLeft" ? -1 : 1);
  });

  /* Arrastar (mouse/toque) e rolagem lateral */
  let drag = null;
  let suprimirClique = false;
  palco.addEventListener("pointerdown", (event) => {
    if (event.button !== 0 || event.target.closest("video, a, input, select, textarea, button:not(.carrossel__escolher)")) return;
    drag = { x: event.clientX, id: event.pointerId, moveu: false };
  });
  palco.addEventListener("pointermove", (event) => {
    if (!drag || event.pointerId !== drag.id) return;
    const dx = event.clientX - drag.x;
    if (!drag.moveu && Math.abs(dx) > 6) {
      drag.moveu = true;
      palco.setPointerCapture(event.pointerId);
      el.classList.add("is-arrastando");
    }
    if (drag.moveu) el.style.setProperty("--arrasto", `${dx}px`);
  });
  const soltar = (event) => {
    if (!drag || event.pointerId !== drag.id) return;
    const dx = event.clientX - drag.x;
    const moveu = drag.moveu;
    drag = null;
    el.classList.remove("is-arrastando");
    el.style.removeProperty("--arrasto");
    if (moveu) {
      suprimirClique = true;
      setTimeout(() => (suprimirClique = false), 0);
      if (Math.abs(dx) > SWIPE_PX && event.type === "pointerup") mover(dx < 0 ? 1 : -1);
    }
  };
  palco.addEventListener("pointerup", soltar);
  palco.addEventListener("pointercancel", soltar);
  palco.addEventListener("click", (event) => {
    if (suprimirClique) {
      event.stopPropagation();
      event.preventDefault();
    }
  }, true);

  let ultimaRoda = 0;
  palco.addEventListener(
    "wheel",
    (event) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY) || Math.abs(event.deltaX) < 20) return;
      event.preventDefault();
      if (event.timeStamp - ultimaRoda < 380) return;
      ultimaRoda = event.timeStamp;
      mover(Math.sign(event.deltaX));
    },
    { passive: false },
  );

  desenhar();
  pronto = true;
  queueMicrotask(igualarAlturas);

  return {
    el,
    cardDe(index) {
      irPara(index);
      return nos.get(ativo)?.firstElementChild ?? null;
    },
  };
}
