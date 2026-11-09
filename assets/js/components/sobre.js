/* Seção #sobre: foto circular, nome (h1), função, parágrafos e links */
import { h, assetUrl, srOnly } from "../core.js";
import { icon } from "../icons.js";

const isExternal = (href) => /^https?:\/\//i.test(href);

function createLink(link, index) {
  // Contato ainda não informado (href vazio): botão desabilitado, nunca um link fictício
  if (!link.href) {
    return h(
      "button",
      { class: "btn btn--outline", type: "button", disabled: true },
      link.rotulo,
      srOnly(" (ainda não informado)"),
    );
  }
  const external = isExternal(link.href);
  return h(
    "a",
    {
      class: `btn ${index === 0 ? "btn--primary" : "btn--outline"}`,
      href: link.href,
      target: external ? "_blank" : null,
      rel: external ? "noopener noreferrer" : null,
    },
    link.rotulo,
    external ? icon("external") : null,
    external ? srOnly(" (abre em nova aba)") : null,
  );
}

/**
 * @param {{nome: string, funcao: string, foto?: {src: string, alt?: string}}} perfil
 * @param {{paragrafos: string[], links?: {rotulo: string, href: string}[]}} sobre
 */
export function createSobre(perfil, sobre) {
  const foto = perfil.foto
    ? h("img", {
        class: "avatar sobre__foto",
        src: assetUrl("images", perfil.foto.src),
        alt: perfil.foto.alt ?? "",
        width: 208,
        height: 208,
        decoding: "async",
      })
    : null;

  return h(
    "section",
    { class: "section", id: "sobre", "aria-labelledby": "sobre-titulo" },
    h(
      "div",
      { class: "container sobre" },
      foto,
      h(
        "div",
        { class: "sobre__texto" },
        h("h1", { id: "sobre-titulo" }, perfil.nome),
        h("p", { class: "sobre__funcao" }, perfil.funcao),
        h("div", { class: "prose" }, ...(sobre.paragrafos ?? []).map((p) => h("p", {}, p))),
        sobre.links?.length
          ? h("div", { class: "btn-group" }, ...sobre.links.map(createLink))
          : null,
      ),
    ),
  );
}
