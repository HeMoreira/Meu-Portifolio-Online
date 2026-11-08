/* Competências: grid de cards (imagem circular, título, descrição, botão-link) */
import { h, assetUrl, anchorId, srOnly } from "../core.js";
import { icon } from "../icons.js";

const ACTION_LABEL = { projeto: "Ver projeto", certificacao: "Ver certificação" };

/**
 * @param {{
 *   titulo: string, descricao: string, imagem: string, imagemAlt?: string,
 *   relacao?: {tipo: "projeto"|"certificacao", id: string}
 * }} item
 * @param {Set<string>} [destinos] ids de âncora realmente existentes na página.
 *   Se informado, uma relação que aponte para fora dele vira botão indisponível
 *   (nunca um link quebrado).
 */
export function createCompetencia(item, destinos) {
  const { relacao } = item;
  const target = relacao ? anchorId(relacao.tipo, relacao.id) : null;
  const valid = target && (!destinos || destinos.has(target));

  if (relacao && !valid) console.warn(`Competência "${item.titulo}": destino #${target} não existe.`);

  const action = valid
    ? h(
        "a",
        { class: "btn btn--neutral btn--sm", href: `#${target}` },
        icon("link"), // ícone de dois elos de corrente
        ACTION_LABEL[relacao.tipo] ?? ACTION_LABEL.projeto,
        srOnly(` relacionado a ${item.titulo}`),
      )
    : h(
        "button",
        { class: "btn btn--neutral btn--sm", type: "button", disabled: true },
        icon("link"),
        "Indisponível",
        srOnly(`: ainda não há projeto ou certificado relacionado a ${item.titulo}`),
      );

  return h(
    "article",
    { class: "card competencia" },
    h("img", {
      class: "avatar",
      src: assetUrl("images", item.imagem),
      alt: item.imagemAlt ?? "", // decorativa por padrão: o título já descreve
      width: 104,
      height: 104,
      loading: "lazy",
      decoding: "async",
    }),
    h("h3", {}, item.titulo),
    h("p", { class: "competencia__desc" }, item.descricao),
    action,
  );
}

export function createCompetenciasGrid(itens = [], destinos) {
  return h(
    "ul",
    { class: "grid grid--cards", role: "list" },
    ...itens.map((item) => h("li", {}, createCompetencia(item, destinos))),
  );
}
