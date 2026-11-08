/* Certificações: grid de cards (imagem, título, descrição) */
import { h, assetUrl, anchorId } from "../core.js";

/**
 * @param {{id: string, titulo: string, descricao?: string, imagem: string, imagemAlt?: string}} item
 */
export function createCertificacao(item) {
  const titleId = `${anchorId("certificacao", item.id)}-titulo`;
  return h(
    "article",
    {
      class: "card certificacao",
      id: anchorId("certificacao", item.id),
      "aria-labelledby": titleId,
    },
    h("img", {
      class: "certificacao__media",
      src: assetUrl("images", item.imagem),
      alt: item.imagemAlt ?? `Certificado: ${item.titulo}`,
      width: 640,
      height: 400,
      loading: "lazy",
      decoding: "async",
    }),
    h(
      "div",
      { class: "certificacao__body" },
      h("h3", { id: titleId }, item.titulo),
      item.descricao ? h("p", { class: "certificacao__desc" }, item.descricao) : null,
    ),
  );
}

export function createCertificacoesGrid(itens = []) {
  return h(
    "ul",
    { class: "grid grid--cards", role: "list" },
    ...itens.map((item) => h("li", {}, createCertificacao(item))),
  );
}
