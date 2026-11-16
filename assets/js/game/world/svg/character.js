/* ==========================================================================
   Personagem da introdução — sprite pixel art 14×18 desenhado com rects.
   Cada letra do mapa é uma classe de cor (.px-*), definida no CSS do modo
   secreto a partir de accent-fill / accent-detail / neutros.
   (O personagem JOGÁVEL, 32×32 com spritesheet, entra na etapa 2.)
   ========================================================================== */
import { svg, pathFromPixels } from "./pixel.js";

//  o outline · h chapéu · H brilho do chapéu · s rosto · E olhos · p bochecha
//  a cachecol · b roupa · W brilho da roupa · f pés
const SPRITE = [
  "....oooooo....",
  "...ohhhhhho...",
  "..ohHHhhhhho..",
  ".ohHhhhhhhhho.",
  ".oooooooooooo.",
  ".osssssssssso.",
  ".ossEssssEsso.",
  ".ossEssssEsso.",
  ".opsssssssspo.",
  "..oossssssoo..",
  "..ooaaaaaaoo..",
  ".obbbbbbbbbbo.",
  "obWbbbbbbbbbbo",
  "obWbbbbbbbbbbo",
  "oobbbbbbbbbboo",
  ".obbbbbbbbbbo.",
  "..obbbooobbo..",
  "..offo..offo..",
];

export const CHARACTER = { width: 14, height: SPRITE.length };

/** @returns {SVGSVGElement} */
export function createCharacter() {
  const byClass = new Map();
  SPRITE.forEach((row, y) => {
    [...row].forEach((ch, x) => {
      if (ch === ".") return;
      if (!byClass.has(ch)) byClass.set(ch, []);
      byClass.get(ch).push([x, y]);
    });
  });

  return svg(
    "svg",
    {
      class: "game-intro__character",
      viewBox: `0 0 ${CHARACTER.width} ${CHARACTER.height}`,
      "shape-rendering": "crispEdges",
      "aria-hidden": "true",
      focusable: "false",
    },
    ...[...byClass].map(([ch, pixels]) => svg("path", { class: `px-${ch}`, d: pathFromPixels(pixels) })),
  );
}
