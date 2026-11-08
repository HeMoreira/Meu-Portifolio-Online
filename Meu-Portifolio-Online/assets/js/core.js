/* ==========================================================================
   core.js — utilitários compartilhados por todos os módulos.
   ========================================================================== */

/**
 * Raiz de /assets/, calculada a partir da localização DESTE arquivo.
 * Por isso funciona de qualquer página, em qualquer profundidade de rota e
 * mesmo se o site for publicado em um subcaminho (ex.: usuario.github.io/repo/).
 */
export const ASSETS_ROOT = new URL("../", import.meta.url);

/** Página inicial (etapa 3), na raiz do site. Resolvida a partir de /assets/, vale para qualquer página. */
export const HOME_URL = new URL("../index.html", ASSETS_ROOT).href;

/** URL da página de um currículo ({slug}.html, na raiz do site). */
export const pageUrl = (slug) => new URL(`../${slug}.html`, ASSETS_ROOT).href;

/**
 * Resolve um recurso de mídia a partir da CATEGORIA, não da página.
 *   assetUrl("images", "competencias/html.svg")
 * Os dados de cada currículo só informam "competencias/html.svg"; trocar a
 * estrutura de pastas exige mexer em um único lugar (aqui).
 * URLs absolutas (https://…) e data: passam sem alteração.
 * @param {"images"|"videos"} category
 * @param {string} [path]
 */
export function assetUrl(category, path) {
  if (!path) return "";
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(path)) return path;
  return new URL(`${category}/${path}`, ASSETS_ROOT).href;
}

/** Ids de âncora padronizados: competências apontam para eles. */
export function anchorId(tipo, id) {
  return `${tipo === "certificacao" ? "certificacao" : "projeto"}-${id}`;
}

/**
 * Criador de elementos DOM (sem innerHTML → dados de conteúdo nunca viram HTML).
 * props: class, dataset, style (objeto de custom properties/propriedades),
 *        onclick etc. (funções) e qualquer atributo. null/false são ignorados.
 */
export function h(tag, props = {}, ...children) {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(props || {})) {
    if (value == null || value === false) continue;
    if (key === "class") el.className = value;
    else if (key === "dataset") Object.assign(el.dataset, value);
    else if (key === "style") {
      for (const [prop, val] of Object.entries(value)) el.style.setProperty(prop, val);
    } else if (key.startsWith("on") && typeof value === "function") {
      el.addEventListener(key.slice(2), value);
    } else el.setAttribute(key, value === true ? "" : String(value));
  }
  el.append(...children.flat(Infinity).filter((c) => c != null && c !== false));
  return el;
}

/** Texto apenas para leitores de tela. */
export const srOnly = (text) => h("span", { class: "visually-hidden" }, text);

let uid = 0;
/** Id único para ligar rótulos (aria-labelledby). */
export const nextId = (prefix) => `${prefix}-${++uid}`;
