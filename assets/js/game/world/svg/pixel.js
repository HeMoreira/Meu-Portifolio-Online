/* Utilitários para desenhar pixel art em SVG (sem innerHTML; só a API do DOM). */
const NS = "http://www.w3.org/2000/svg";

/** createElementNS com atributos e filhos. */
export function svg(tag, attrs = {}, ...children) {
  const el = document.createElementNS(NS, tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (value != null && value !== false) el.setAttribute(key, String(value));
  }
  el.append(...children.flat(Infinity).filter(Boolean));
  return el;
}

/**
 * Converte pixels [x, y] em UM atributo `d`, juntando sequências horizontais
 * em retângulos (poucos comandos, ótimo para crispEdges).
 * @param {Iterable<[number, number]>} pixels
 */
export function pathFromPixels(pixels) {
  const rows = new Map();
  for (const [x, y] of pixels) {
    if (!rows.has(y)) rows.set(y, []);
    rows.get(y).push(x);
  }
  let d = "";
  for (const y of [...rows.keys()].sort((a, b) => a - b)) {
    const xs = rows.get(y).sort((a, b) => a - b);
    let start = xs[0];
    let prev = xs[0];
    for (let i = 1; i <= xs.length; i++) {
      if (xs[i] === prev + 1) {
        prev = xs[i];
        continue;
      }
      d += `M${start} ${y}h${prev - start + 1}v1h${start - prev - 1}z`;
      start = prev = xs[i];
    }
  }
  return d;
}
