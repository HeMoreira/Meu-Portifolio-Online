/* Invólucro padrão das seções #competencias, #projetos e #certificacoes */
import { h } from "../core.js";

/**
 * @param {{id: string, titulo: string, intro?: string, bleed?: boolean}} meta
 *   bleed: o conteúdo ocupa a largura total da janela (fora do .container); só o cabeçalho fica contido.
 * @param {...Node} content
 */
export function createSection({ id, titulo, intro, bleed = false }, ...content) {
  const titleId = `${id}-titulo`;
  const head = h(
    "div",
    { class: "section__head" },
    h("h2", { class: "section__title", id: titleId }, titulo),
    intro ? h("p", { class: "section__intro" }, intro) : null,
  );

  return h(
    "section",
    { class: bleed ? "section section--bleed" : "section", id, "aria-labelledby": titleId },
    bleed ? h("div", { class: "container" }, head) : h("div", { class: "container" }, head, ...content),
    bleed ? content : null,
  );
}
