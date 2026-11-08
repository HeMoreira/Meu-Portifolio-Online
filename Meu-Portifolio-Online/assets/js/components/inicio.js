/* Seções da página inicial: apresentação pessoal e as seis áreas */
import { h, srOnly, pageUrl } from "../core.js";
import { icon } from "../icons.js";
import { createMidia } from "./midia.js";
import { createEggMarkup } from "../easter-egg/markup.js";

/**
 * Apresentação pessoal: texto à esquerda, foto (ponto de entrada do easter egg)
 * à direita. O comportamento do easter egg NÃO está aqui — ver easter-egg/.
 */
export function createApresentacao(apresentacao, perfil) {
  return h(
    "section",
    { class: "section split", id: "apresentacao", "aria-labelledby": "apresentacao-titulo" },
    h(
      "div",
      { class: "container split__inner" },
      h(
        "div",
        { class: "split__texto" },
        h("h1", { id: "apresentacao-titulo" }, apresentacao.titulo),
        h("div", { class: "prose" }, ...apresentacao.paragrafos.map((p) => h("p", {}, p))),
      ),
      h(
        "div",
        { class: "split__midia apresentacao__foto" },
        createEggMarkup({
          foto: perfil.foto,
          nome: perfil.nome,
          legenda: apresentacao.legendaFoto,
        }),
      ),
    ),
  );
}

/**
 * Uma área de atuação. Posições alternadas a partir da apresentação
 * (texto | mídia): índice 0 → mídia à esquerda, 1 → à direita, 2 → esquerda…
 * No DOM o texto sempre vem primeiro (ordem de leitura); a inversão é visual
 * e só acontece em telas largas (inicio.css).
 */
export function createAreaCurriculo(item, index) {
  const mediaFirst = index % 2 === 0;
  const titleId = `area-${item.slug}-titulo`;

  return h(
    "section",
    {
      class: `section split${mediaFirst ? " split--media-first" : ""}`,
      id: `area-${item.slug}`,
      "aria-labelledby": titleId,
    },
    h(
      "div",
      { class: "container split__inner" },
      h(
        "div",
        { class: "split__texto" },
        h("h2", { class: "section__title", id: titleId }, item.titulo),
        h("p", { class: "split__paragrafo" }, item.texto),
        h(
          "a",
          { class: "btn btn--primary", href: pageUrl(item.slug) },
          item.botao ?? "Ver currículo",
          icon("arrow"),
          srOnly(`: ${item.titulo}`),
        ),
      ),
      h(
        "div",
        { class: "split__midia" },
        createMidia(item.midia, { side: mediaFirst ? "left" : "right" }),
      ),
    ),
  );
}
