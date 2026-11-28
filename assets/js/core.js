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

/**
 * Converte o link de um vídeo na URL de incorporação (iframe).
 * Aceita links do YouTube (watch?v=, youtu.be/, /embed/, /shorts/, /live/) e usa o domínio
 * youtube-nocookie. O tempo inicial (t= / start=) é preservado. Qualquer outro link
 * https:// (Vimeo, Drive etc.) é usado como está — deve ser uma URL de embed.
 * Caminhos locais, javascript: e afins são recusados (retorna null).
 * @param {string} [src]
 * @returns {{ url: string, youtube: boolean } | null}
 */
export function videoEmbed(src) {
  let u;
  try {
    u = new URL(String(src ?? "").trim());
  } catch {
    return null;
  }
  if (u.protocol !== "https:" && u.protocol !== "http:") return null;

  const host = u.hostname.replace(/^(www|m)\./, "");
  let id = null;
  if (host === "youtu.be") id = u.pathname.split("/")[1];
  else if (host === "youtube.com" || host === "youtube-nocookie.com") {
    const [, kind, rest] = u.pathname.split("/");
    id = kind === "watch" ? u.searchParams.get("v") : ["embed", "shorts", "live", "v"].includes(kind) ? rest : null;
  }

  if (!id) return u.protocol === "https:" && !/youtube/.test(host) ? { url: u.href, youtube: false } : null;
  if (!/^[\w-]+$/.test(id)) return null;

  const params = new URLSearchParams({ rel: "0", playsinline: "1", enablejsapi: "1" });
  const start = parseInt(u.searchParams.get("start") ?? u.searchParams.get("t") ?? "", 10);
  if (start > 0) params.set("start", String(start));
  return { url: `https://www.youtube-nocookie.com/embed/${id}?${params}`, youtube: true };
}

/** Pausa um iframe do YouTube (precisa de enablejsapi=1, já incluído por videoEmbed). */
export function pauseEmbed(iframe) {
  if (iframe?.dataset.provider !== "youtube") return;
  iframe.contentWindow?.postMessage(
    JSON.stringify({ event: "command", func: "pauseVideo", args: "" }),
    "https://www.youtube-nocookie.com",
  );
}

/** Ids de âncora padronizados: competências apontam para eles. Experiências usam o prefixo "projeto-". */
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
