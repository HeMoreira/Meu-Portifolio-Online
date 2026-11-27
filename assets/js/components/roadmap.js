/* ==========================================================================
   Roadmap: linha horizontal larga com um círculo (com imagem) por ano.
   O círculo ativo fica no centro da tela, com o dobro do tamanho; a linha
   desliza por baixo (translateX controlado por --i). Semântica: tablist/tab,
   com setas ← → Home End, botões anterior/próximo, arrastar e rolagem lateral.
   Estrutura visual em roadmap.css.
   ========================================================================== */
import { h, assetUrl, nextId } from "../core.js";
import { icon } from "../icons.js";

const SWIPE_PX = 45;

/** Imagem do círculo: a do ano, senão a 1ª imagem de um item, senão null (ícone). */
function imagemDoAno(ano) {
  if (ano.imagem) return { src: ano.imagem, alt: ano.imagemAlt ?? "" };
  const item = ano.itens.find((i) => i.media?.tipo === "imagem" && !/placeholder/.test(i.media.src));
  return item ? { src: item.media.src, alt: "" } : null;
}

const resumoAcessivel = (n) => (n === 0 ? "sem itens" : n === 1 ? "1 item" : `${n} itens`);

/**
 * @param {{
 *   anos: {ano: number, imagem?: string, imagemAlt?: string, itens: object[]}[],
 *   inicial: number, painelId: string, onChange: (index: number) => void
 * }} opcoes
 */
export function createRoadmap({ anos, inicial, painelId, onChange }) {
  const n = anos.length;
  let atual = -1;

  const tabs = anos.map((ano) => {
    const img = imagemDoAno(ano);
    return h(
      "button",
      {
        class: "roadmap__node",
        type: "button",
        role: "tab",
        id: nextId("ano"),
        "aria-controls": painelId,
        "aria-selected": "false",
        tabindex: "-1",
        "data-vazio": ano.itens.length === 0 ? "true" : null,
      },
      h(
        "span",
        { class: "roadmap__avatar" },
        img
          ? h("img", {
              src: assetUrl("images", img.src),
              alt: img.alt,
              loading: "lazy",
              decoding: "async",
              draggable: "false",
            })
          : icon("flag", "roadmap__fallback"),
      ),
      h("span", { class: "roadmap__year" }, String(ano.ano)),
      h("span", { class: "visually-hidden" }, `, ${resumoAcessivel(ano.itens.length)}`),
    );
  });

  const track = h(
    "div",
    { class: "roadmap__track", role: "tablist", "aria-label": "Anos", "aria-orientation": "horizontal" },
    h("div", { class: "roadmap__line", "aria-hidden": "true" }, h("span", { class: "roadmap__progress" })),
    ...tabs.map((tab) => h("div", { class: "roadmap__stop", role: "presentation" }, tab)),
  );
  const stage = h("div", { class: "roadmap__stage" }, track);

  const prev = h("button", { class: "icon-btn roadmap__nav roadmap__nav--prev", type: "button" }, icon("prev"));
  const next = h("button", { class: "icon-btn roadmap__nav roadmap__nav--next", type: "button" }, icon("next"));
  prev.addEventListener("click", () => set(atual - 1));
  next.addEventListener("click", () => set(atual + 1));

  const el = h("div", { class: "roadmap", style: { "--n": n, "--i": 0 } }, stage, prev, next);

  /** Seleciona o ano `index`. Retorna true se mudou. */
  function set(index, { focus = false, emit = true } = {}) {
    const i = Math.max(0, Math.min(n - 1, index));
    const mudou = i !== atual;
    if (mudou) {
      const tinhaFoco = el.contains(document.activeElement) && document.activeElement.classList.contains("roadmap__nav");
      atual = i;
      el.style.setProperty("--i", i);
      tabs.forEach((tab, k) => {
        tab.setAttribute("aria-selected", String(k === i));
        tab.tabIndex = k === i ? 0 : -1;
        tab.dataset.dist = Math.min(Math.abs(k - i), 3);
      });
      // Setas só existem quando há destino naquele sentido
      prev.hidden = i === 0;
      next.hidden = i === n - 1;
      prev.setAttribute("aria-label", i > 0 ? `Ano anterior: ${anos[i - 1].ano}` : "Ano anterior");
      next.setAttribute("aria-label", i < n - 1 ? `Próximo ano: ${anos[i + 1].ano}` : "Próximo ano");
      // Uma seta que acabou de sumir não pode deixar o foco no vazio
      if (tinhaFoco && document.activeElement?.hidden !== false) tabs[i].focus({ preventScroll: true });
      if (emit) onChange(i);
    }
    if (focus) tabs[i].focus({ preventScroll: true });
    return mudou;
  }

  tabs.forEach((tab, k) => tab.addEventListener("click", () => set(k)));

  // Teclado (padrão WAI-ARIA tabs, ativação automática)
  track.addEventListener("keydown", (event) => {
    const alvo = { ArrowLeft: atual - 1, ArrowRight: atual + 1, Home: 0, End: n - 1 }[event.key];
    if (alvo === undefined) return;
    event.preventDefault();
    set(alvo, { focus: true });
  });

  // Arrastar / deslizar: arrasta para a esquerda → próximo ano
  let drag = null;
  let suprimirClique = false;
  stage.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    drag = { x: event.clientX, id: event.pointerId };
  });
  stage.addEventListener("pointermove", (event) => {
    if (!drag || event.pointerId !== drag.id) return;
    const dx = event.clientX - drag.x;
    if (Math.abs(dx) < SWIPE_PX) return;
    suprimirClique = true;
    drag = null;
    set(atual + (dx < 0 ? 1 : -1));
  });
  const fimDrag = () => {
    drag = null;
    setTimeout(() => (suprimirClique = false), 0);
  };
  stage.addEventListener("pointerup", fimDrag);
  stage.addEventListener("pointercancel", fimDrag);
  stage.addEventListener("click", (event) => {
    if (suprimirClique) {
      event.stopPropagation();
      event.preventDefault();
    }
  }, true);

  // Rolagem lateral (trackpad / shift+roda)
  let ultimaRoda = 0;
  stage.addEventListener(
    "wheel",
    (event) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY) || Math.abs(event.deltaX) < 20) return;
      event.preventDefault();
      if (event.timeStamp - ultimaRoda < 380) return;
      ultimaRoda = event.timeStamp;
      set(atual + Math.sign(event.deltaX));
    },
    { passive: false },
  );

  set(inicial, { emit: false });
  return { el, set, tabId: (i) => tabs[i].id };
}
