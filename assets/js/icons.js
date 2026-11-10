/* ==========================================================================
   icons.js — ícones SVG inline (traço, 24×24). Strings constantes e confiáveis;
   herdam a cor via currentColor e o tamanho via .icon (base.css).
   ========================================================================== */

const NS = "http://www.w3.org/2000/svg";

const PATHS = {
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  close: '<path d="M18 6 6 18M6 6l12 12"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  code: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
  external: '<path d="M7 17 17 7M7 7h10v10"/>',
  up: '<path d="m18 15-6-6-6 6"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  triangle: '<path d="M8 11 L32 2 L56 11 Z"/>', // triângulo achatado (setas do easter egg)
};

const VIEWBOXES = {
  triangle: "0 0 64 14",
};

/**
 * @param {keyof typeof PATHS} name
 * @param {string} [extraClass] ex.: "icon-sun"
 */
export function icon(name, extraClass = "") {
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("viewBox", VIEWBOXES[name] ?? "0 0 24 24");
  svg.setAttribute("class", `icon ${extraClass}`.trim());
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  svg.innerHTML = PATHS[name] ?? "";
  return svg;
}
