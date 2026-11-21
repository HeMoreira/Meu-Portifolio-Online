/* ==========================================================================
   Interface de vidas — canto superior esquerdo (abaixo do cabeçalho fixo).

   Só LÊ o estado (state.lives / state.maxLives): quem muda as vidas (combate,
   etapa 3) faz state.set({ lives }) — ou game.setLives(n) — e esta interface
   reage. Não conhece física nem personagem.

   Corações de EXATAMENTE 16×16 px (SVG 16×16, 1 pixel de arte = 1 px de CSS),
   gerados a partir de uma máscara; estados: full · losing (animação) · lost.
   ========================================================================== */
import { h } from "../../core.js";
import { svg, pathFromPixels } from "../world/svg/pixel.js";

const SIZE = 16;

/** Máscara da curva do coração (16×16). */
function heartPixels() {
  const inside = (x, y) => {
    const nx = (x + 0.5 - SIZE / 2) / 6.9;
    const ny = -(y + 0.5 - SIZE / 2 - 1) / 6.9;
    return (nx * nx + ny * ny - 1) ** 3 - nx * nx * ny ** 3 <= 0;
  };
  const fill = [];
  const outline = [];
  const light = [];
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      if (!inside(x, y)) continue;
      const edge = !inside(x - 1, y) || !inside(x + 1, y) || !inside(x, y - 1) || !inside(x, y + 1);
      (edge ? outline : fill).push([x, y]);
    }
  }
  for (const [x, y] of fill) if ((x === 3 && y === 4) || (x === 4 && y === 4) || (x === 3 && y === 5)) light.push([x, y]);
  return { fill, outline, light };
}

let cached = null;
function createHeartSvg() {
  cached ??= heartPixels();
  return svg(
    "svg",
    { class: "game-heart__svg", width: SIZE, height: SIZE, viewBox: `0 0 ${SIZE} ${SIZE}`, "shape-rendering": "crispEdges", "aria-hidden": "true", focusable: "false" },
    svg("path", { class: "game-heart__fill", d: pathFromPixels(cached.fill) }),
    svg("path", { class: "game-heart__outline", d: pathFromPixels(cached.outline) }),
    svg("path", { class: "game-heart__light", d: pathFromPixels(cached.light) }),
  );
}

/** @param {{state: ReturnType<import("../state.js").createGameState>}} options */
export function mountLives({ state }) {
  const { maxLives } = state.get();
  const hearts = Array.from({ length: maxLives }, () =>
    h("span", { class: "game-heart", "data-state": "full" }, createHeartSvg()),
  );
  for (const heart of hearts) {
    // ao fim da animação de perda, o coração assume o estado "lost"
    heart.addEventListener("animationend", () => {
      if (heart.dataset.state === "losing") heart.dataset.state = "lost";
    });
  }
  const root = h("div", { class: "game-lives", "data-game-ui": "", role: "img" }, ...hearts);

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  /** Tremida curta do painel ao perder uma vida (em degraus; só transform). */
  const SHAKE = [{ transform: "translate(0,0)" }, { transform: "translate(-3px,0)" }, { transform: "translate(3px,1px)" }, { transform: "translate(-2px,0)" }, { transform: "translate(0,0)" }];

  function render(lives, previous) {
    root.setAttribute("aria-label", `Vidas: ${lives} de ${maxLives}`);
    if (previous !== undefined && lives < previous && !reduce.matches) root.animate(SHAKE, { duration: 320, easing: "steps(1, end)" });
    hearts.forEach((heart, i) => {
      // movimento reduzido: sem animação de perda — o coração já nasce "lost"
      const next = i < lives ? "full" : previous !== undefined && i < previous && !reduce.matches ? "losing" : "lost";
      if (heart.dataset.state === "lost" && next === "losing") return;
      heart.dataset.state = next;
    });
  }

  render(state.get().lives);
  document.body.append(root);
  const off = state.subscribe((now, before) => {
    if (now.lives !== before.lives) render(now.lives, before.lives);
  });

  return {
    element: root,
    destroy() {
      off();
      root.getAnimations().forEach((a) => a.cancel());
      root.remove();
    },
  };
}
