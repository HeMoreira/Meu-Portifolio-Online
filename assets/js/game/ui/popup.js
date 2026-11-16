/* ==========================================================================
   Popup de instruções — parte inferior da tela, fundo preto translúcido.

   Aparece quando o personagem surge (fase EMERGING). Some LENTAMENTE só depois
   que o jogador fizer as quatro ações pelo menos uma vez; o registro vive no
   estado do jogo (state.tutorial = { left, right, jump, doubleJump }) e é
   alimentado pelos eventos do personagem (ver index.js). As teclas já feitas
   ficam esmaecidas, mostrando o progresso.
   ========================================================================== */
import { h } from "../../core.js";
import { PHASES } from "../state.js";
import { svg, pathFromPixels } from "../world/svg/pixel.js";

const FADE_OUT_MS = 2600;
// A fonte pixel não tem setas: desenhadas em SVG 7×7 (seta para cima; as demais são giros de 90°)
const ARROW_UP = ["...#...", "..###..", ".#####.", "...#...", "...#...", "...#...", "...#..."];
function arrow(direction) {
  const turns = { up: 0, right: 1, down: 2, left: 3 }[direction];
  const pixels = [];
  ARROW_UP.forEach((row, y) =>
    [...row].forEach((ch, x) => {
      if (ch !== "#") return;
      let [px, py] = [x - 3, y - 3];
      for (let i = 0; i < turns; i++) [px, py] = [-py, px];
      pixels.push([px + 3, py + 3]);
    }),
  );
  return svg("svg", { class: "game-key__arrow", viewBox: "0 0 7 7", "shape-rendering": "crispEdges", "aria-hidden": "true" }, svg("path", { d: pathFromPixels(pixels), fill: "currentColor" }));
}
const key = (label, action, extra = "") =>
  h("kbd", { class: `game-key ${extra}`.trim(), "data-action": action }, typeof label === "string" && label.length === 1 && "←→↑".includes(label) ? arrow({ "←": "left", "→": "right", "↑": "up" }[label]) : label);

/** @param {{state: ReturnType<import("../state.js").createGameState>}} options */
export function mountPopup({ state }) {
  const root = h(
    "section",
    { class: "game-popup", "data-game-ui": "", "data-state": "hidden", "aria-label": "Instruções do jogo", role: "status" },
    h(
      "div",
      { class: "game-popup__row" },
      h("div", { class: "game-popup__keys", "aria-hidden": "true" }, key("←", "left"), key("→", "right"), h("span", { class: "game-popup__or" }, "ou"), key("A", "left"), key("D", "right")),
      h("p", { class: "game-popup__text" }, "Use as setas esquerda e direita ou A e D para movimentar o personagem."),
    ),
    h(
      "div",
      { class: "game-popup__row" },
      h("div", { class: "game-popup__keys", "aria-hidden": "true" }, key("↑", "jump"), key("W", "jump"), key("Espaço", "jump", "game-key--wide")),
      h("p", { class: "game-popup__text" }, "Use a seta para cima, W ou espaço para pular e realizar o pulo duplo."),
    ),
    h("p", { class: "game-popup__goal" }, "Pule de imagem em imagem para conseguir pontos e finalizar o jogo!"),
  );
  document.body.append(root);

  let timer = 0;
  const set = (name) => {
    root.dataset.state = name;
  };

  function update({ phase, tutorial }) {
    // reinício → volta a "hidden" (reaparece quando o personagem surgir); fim de jogo → some
    if (phase === PHASES.INTRO || phase === PHASES.ENDED) {
      clearTimeout(timer);
      set(phase === PHASES.INTRO ? "hidden" : "gone");
      for (const el of root.querySelectorAll(".game-key")) el.removeAttribute("data-done");
      return;
    }
    const done = { left: tutorial.left, right: tutorial.right, jump: tutorial.jump && tutorial.doubleJump };
    for (const el of root.querySelectorAll(".game-key")) {
      const action = el.dataset.action;
      el.toggleAttribute("data-done", Boolean(done[action]));
    }
    const complete = tutorial.left && tutorial.right && tutorial.jump && tutorial.doubleJump;
    const playing = phase === PHASES.EMERGING || phase === PHASES.PLAYING;

    if (complete && root.dataset.state === "visible") {
      set("leaving"); // desaparece lentamente (transição CSS de FADE_OUT_MS)
      timer = window.setTimeout(() => set("gone"), FADE_OUT_MS + 100);
    } else if (!complete && playing && root.dataset.state === "hidden") {
      // dois quadros: garante que a transição de entrada seja executada
      // (só se ainda estiver "entering": um reinício/fim nesse meio-tempo não pode reabri-lo)
      requestAnimationFrame(() => requestAnimationFrame(() => root.dataset.state === "entering" && set("visible")));
      root.dataset.state = "entering";
    }
  }

  update(state.get());
  const off = state.subscribe((now) => update(now));

  return {
    element: root,
    destroy() {
      off();
      clearTimeout(timer);
      root.remove();
    },
  };
}
