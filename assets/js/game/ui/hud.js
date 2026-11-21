/* ==========================================================================
   HUD do jogo — os controles que existem no modo secreto.
   Etapa 1: botão "Sair" + aviso para leitores de tela. A etapa 2 acrescenta
   aqui o botão de instruções e o popup (usando .modal/.btn já existentes).

   Reaproveita o componente .btn da página (neutralizado pelo pixel-ui.css) e
   é marcado com data-game-keep para escapar da trava de links.
   ========================================================================== */
import { h } from "../../core.js";

/** @param {{onExit: () => void}} options */
export function mountHud({ onExit }) {
  const exit = h(
    "button",
    {
      class: "btn btn--sm game-hud__exit",
      type: "button",
      "data-game-keep": "",
      "aria-label": "Sair do modo secreto (atalho: Esc)",
      title: "Sair (Esc)",
      onclick: () => onExit(),
    },
    "Sair",
  );

  const live = h("p", { class: "visually-hidden", role: "status" });

  const hud = h(
    "div",
    { class: "game-hud", "data-game-ui": "" },
    exit,
    live,
  );

  document.body.append(hud);
  // texto inserido depois da montagem para ser anunciado (timeout cancelável: nenhum callback órfão)
  const announce = window.setTimeout(() => {
    live.textContent = "Modo secreto ativado. Use o botão Sair para voltar à página normal.";
  }, 50);

  return {
    element: hud,
    destroy() {
      clearTimeout(announce);
      hud.remove();
    },
  };
}
