/* ==========================================================================
   Arte de fundo dos blocos de mídia (viewBox 64×64, pixel art):
     • preenchimento em accent-fill
     • vinheta lateral em accent-detail (faixas em degraus + pontilhado)
     • estrelinhas/brilhos
     • variante "platform": orbe 3D no centro + sombra no chão
     • variante "intro": só o cenário (o personagem fica no overlay .game-intro)
   Cores por classe (.block-art__*): ver css/game/media-blocks.css.
   ========================================================================== */
import { svg, pathFromPixels } from "./pixel.js";
import { createOrb, ORB } from "./orb.js";

const W = 64;

/** Faixas de vinheta: [x inicial, largura, camada de opacidade]. */
const BANDS = [
  [0, 3, 1],
  [3, 3, 2],
  [6, 3, 3],
];

function vignette() {
  const rects = [];
  for (const [x, w, tone] of BANDS) {
    rects.push(
      svg("rect", { class: `block-art__vig block-art__vig--${tone}`, x, y: 0, width: w, height: W }),
      svg("rect", { class: `block-art__vig block-art__vig--${tone}`, x: W - x - w, y: 0, width: w, height: W }),
    );
  }
  // transição pontilhada (xadrez 1×1) depois das faixas sólidas
  const dots = [];
  for (let y = 0; y < W; y++) {
    for (let x = 9; x < 13; x++) {
      if ((x + y) % 2 === 0 || (x < 11 && y % 2 === 0)) {
        dots.push([x, y], [W - 1 - x, y]);
      }
    }
  }
  return svg("g", { class: "block-art__vignette" }, ...rects, svg("path", { class: "block-art__dots", d: pathFromPixels(dots) }));
}

function sparkles(variant) {
  const spots =
    variant === "intro"
      ? [[16, 10], [48, 14], [22, 26], [44, 30]]
      : [[15, 12], [49, 16], [17, 50], [47, 46]];
  const pixels = [];
  for (const [x, y] of spots) pixels.push([x, y], [x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]);
  return svg("path", { class: "block-art__spark", d: pathFromPixels(pixels) });
}

function groundShadow() {
  // elipse achatada em degraus, abaixo do orbe
  const rows = [[24, 16], [22, 20], [24, 16]];
  const pixels = [];
  rows.forEach(([x, w], i) => {
    for (let k = 0; k < w; k++) pixels.push([x + k, 49 + i]);
  });
  return svg("path", { class: "block-art__shadow", d: pathFromPixels(pixels) });
}

/**
 * @param {{variant: "platform"|"intro", phase?: number}} options
 *   phase: defasagem (0–1) da rotação do orbe, para os blocos não girarem em sincronia
 * @returns {SVGSVGElement}
 */
export function createBlockArt({ variant, phase = 0 }) {
  const art = svg(
    "svg",
    {
      class: `block-art block-art--${variant}`,
      viewBox: `0 0 ${W} ${W}`,
      preserveAspectRatio: "xMidYMid slice",
      "shape-rendering": "crispEdges",
      "aria-hidden": "true",
      focusable: "false",
    },
    svg("rect", { class: "block-art__bg", width: W, height: W }),
    vignette(),
    sparkles(variant),
  );

  if (variant === "platform") {
    const orb = createOrb();
    const at = (W - ORB.size) / 2;
    orb.setAttribute("x", at);
    orb.setAttribute("y", at - 3);
    orb.style.setProperty("--orb-delay", `${-(phase % 1) * 4.8}s`);
    art.append(groundShadow(), orb);
  }
  return art;
}
