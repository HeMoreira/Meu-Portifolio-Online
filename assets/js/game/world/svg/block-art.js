/* ==========================================================================
   Arte de fundo dos blocos de mídia (viewBox 64×64, pixel art):
     • fundo: radial-gradient em CSS (círculo accent-fill no centro, accent-detail nas bordas;
       ver css/game/media-blocks.css) — nenhum elemento SVG é necessário para ele
     • estrelinhas/brilhos
     • variante "platform": orbe 3D no centro + sombra no chão
     • variante "intro": só o cenário (o personagem fica no overlay .game-intro)
   Cores por classe (.block-art__*): ver css/game/media-blocks.css.
   ========================================================================== */
import { svg, pathFromPixels } from "./pixel.js";
import { createOrb, ORB } from "./orb.js";

const W = 64;

function sparkles(variant) {
  if (variant === "intro") return null;

  const spots = [[15, 12], [49, 16], [17, 50], [47, 46]];
  const pixels = [];

  for (const [x, y] of spots) {
    pixels.push(
      [x, y],
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1]
    );
  }

  return svg("path", {
    class: "block-art__spark",
    d: pathFromPixels(pixels)
  });
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
