/* ==========================================================================
   Região final — faixa luminosa que irradia de baixo para cima, na largura
   inteira da tela, SOBRE o rodapé (e só sobre ele: não cobre a última seção).

   Geometria em px do DOCUMENTO (como as plataformas): { x, y, width, height },
   recalculada em measure() (index.js a chama quando o layout muda). O visual é
   só CSS (css/game/combat.css); nenhum elemento é animado por JS.

   O personagem "entra" quando o CENTRO do corpo passa de `enterDepth` (fração da
   altura da região, medida a partir do topo do rodapé) — assim ele precisa mergulhar
   visivelmente na luz antes de sumir. A condição é só "passou da linha": como ela
   acompanha a região, a altura de chegada segue a posição do gradiente.
   ========================================================================== */
import { h } from "../core.js";
import { END_ZONE } from "./config.js";

/** @param {{container: HTMLElement, rectOf: (el: Element) => {top: number}}} options  rectOf: layout sem zoom (view.js) */
export function createEndZone({ container, rectOf }) {
  const element = h(
    "div",
    { class: "game-endzone", "aria-hidden": "true", "data-game-ui": "" },
    h("span", { class: "game-endzone__rays" }),
    h("span", { class: "game-endzone__glow" }),
  );
  container.prepend(element); // antes do personagem: ele aparece por cima da luz

  const rect = { x: 0, y: 0, width: 0, height: END_ZONE.height };

  const api = {
    element,
    rect,
    /** Base da região (px do documento) — o limite inferior que a câmera deve conseguir mostrar. */
    get bottom() {
      return rect.y + rect.height;
    },
    measure() {
      const footer = document.querySelector(".site-footer");
      const box = footer ? rectOf(footer) : null;
      const bottom = document.documentElement.offsetHeight;
      rect.x = 0;
      rect.width = document.documentElement.clientWidth;
      // a região é exatamente o rodapé; sem rodapé, usa a faixa mínima no fim da página
      rect.height = Math.max(box ? box.height : END_ZONE.height, END_ZONE.minHeight);
      rect.y = box ? box.top : bottom - rect.height;
      Object.assign(element.style, {
        left: `${rect.x}px`,
        top: `${rect.y}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
      });
    },
    /** O corpo (x, y, width, height) entrou na região? */
    reached(body) {
      return body.y + body.height / 2 >= rect.y + rect.height * END_ZONE.enterDepth;
    },
    destroy() {
      element.remove();
    },
  };
  api.measure();
  return api;
}
