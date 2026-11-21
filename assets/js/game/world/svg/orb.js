/* ==========================================================================
   Orbe 3D em pixel art — esfera com iluminação em 4 tons e textura em
   "gomos" (meridianos/paralelos) que gira horizontalmente.

   A rotação é uma tira de FRAMES quadros pré-calculados (uma esfera por quadro),
   exibidos por uma animação CSS `steps()` que desliza a tira dentro de uma
   janela (svg aninhado, que recorta). Cores só por classes (.orb-c0…): o CSS do
   modo secreto liga cada classe a accent-fill / accent-detail, então o orbe
   segue o tema em tempo real. Os quadros são calculados UMA vez e clonados.
   ========================================================================== */
import { svg, pathFromPixels } from "./pixel.js";

export const ORB = { size: 28, frames: 24 };
const R = ORB.size / 2;
const LIGHT = normalize([-0.55, -0.62, 0.56]); // luz vinda de cima à esquerda
const MERIDIANS = 8; // 45° entre meridianos
const PARALLEL_STEP = Math.PI / 6; // 30° entre paralelos

function normalize([x, y, z]) {
  const n = Math.hypot(x, y, z);
  return [x / n, y / n, z / n];
}

const inDisc = (x, y) => {
  const dx = x + 0.5 - R;
  const dy = y + 0.5 - R;
  return dx * dx + dy * dy <= R * R - R * 0.45;
};

/** Índice de cor = nível de luz (0–3) × 3 + textura (0 base, 1 célula alternada, 2 linha). */
function shade(x, y, phi) {
  const nx = (x + 0.5 - R) / R;
  const ny = (y + 0.5 - R) / R;
  const nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny));

  const lambert = Math.max(0, nx * LIGHT[0] + ny * LIGHT[1] + nz * LIGHT[2]);
  const level = lambert < 0.2 ? 0 : lambert < 0.48 ? 1 : lambert < 0.78 ? 2 : 3;

  const lon = Math.atan2(nx, nz) + phi;
  const lat = Math.asin(-ny);

  // largura angular de ~0,6 px: linhas ficam finas no centro e se "achatam" nas bordas
  const lonStep = (Math.PI * 2) / MERIDIANS;
  const lonPos = ((lon % lonStep) + lonStep) % lonStep;
  const dLon = Math.min(lonPos, lonStep - lonPos);
  const wLon = 0.62 / (R * Math.max(nz, 0.22));

  const latPos = (((lat + PARALLEL_STEP / 2) % PARALLEL_STEP) + PARALLEL_STEP) % PARALLEL_STEP;
  const dLat = Math.min(latPos, PARALLEL_STEP - latPos);
  const wLat = 0.62 / (R * Math.max(Math.cos(lat), 0.22));

  let texture = 0;
  const cell = Math.floor(lon / lonStep) + Math.floor((lat + PARALLEL_STEP / 2) / PARALLEL_STEP);
  if (cell & 1) texture = 1;
  if (dLon < wLon || dLat < wLat) texture = 2;
  return { index: level * 3 + texture, level, nx, ny, nz };
}

function build() {
  const S = ORB.size;
  const strip = svg("g", { class: "orb__strip" });

  for (let f = 0; f < ORB.frames; f++) {
    const phi = (f / ORB.frames) * Math.PI * 2;
    const byColor = new Map();
    for (let y = 0; y < S; y++) {
      for (let x = 0; x < S; x++) {
        if (!inDisc(x, y)) continue;
        const { index } = shade(x, y, phi);
        if (!byColor.has(index)) byColor.set(index, []);
        byColor.get(index).push([x, y]);
      }
    }
    const frame = svg("g", { transform: `translate(${f * S} 0)` });
    for (const [index, pixels] of [...byColor].sort((a, b) => a[0] - b[0])) {
      frame.append(svg("path", { class: `orb-c${index}`, d: pathFromPixels(pixels) }));
    }
    strip.append(frame);
  }

  // Camadas ESTÁTICAS (não giram): contorno, luz de contorno e brilhos brancos
  const outline = [];
  const rim = [];
  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) {
      if (!inDisc(x, y)) continue;
      const edge = !inDisc(x - 1, y) || !inDisc(x + 1, y) || !inDisc(x, y - 1) || !inDisc(x, y + 1);
      if (edge) {
        outline.push([x, y]);
        continue;
      }
      const { nx, ny } = shade(x, y, 0);
      if (nx * 0.7 + ny * 0.7 > 0.74) rim.push([x, y]); // faixa de luz refletida, embaixo à direita
    }
  }
  const specular = [
    [7, 5], [8, 5], [9, 5],
    [6, 6], [7, 6], [8, 6],
    [6, 7], [7, 7],
    [5, 8],
  ];
  const glint = [[11, 4], [12, 5]]; // pontinhos de brilho secundário

  return svg(
    "svg",
    {
      class: "orb",
      width: S,
      height: S,
      viewBox: `0 0 ${S} ${S}`,
      "shape-rendering": "crispEdges",
      style: `--orb-travel:${-ORB.frames * S}px`,
      "aria-hidden": "true",
    },
    strip,
    svg("path", { class: "orb__rim", d: pathFromPixels(rim) }),
    svg("path", { class: "orb__outline", d: pathFromPixels(outline) }),
    svg("path", { class: "orb__spec", d: pathFromPixels(specular) }),
    svg("path", { class: "orb__glint", d: pathFromPixels(glint) }),
  );
}

let template = null;

/** Cria uma instância do orbe (o cálculo dos quadros é feito uma única vez). */
export function createOrb() {
  template ??= build();
  return template.cloneNode(true);
}
