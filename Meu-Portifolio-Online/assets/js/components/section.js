/* Invólucro padrão das seções #competencias, #projetos e #certificacoes */
import { h } from "../core.js";

/**
 * @param {{id: string, titulo: string, intro?: string}} meta
 * @param {...Node} content
 */
export function createSection({ id, titulo, intro }, ...content) {
  const titleId = `${id}-titulo`;
  return h(
    "section",
    { class: "section", id, "aria-labelledby": titleId },
    h(
      "div",
      { class: "container" },
      h(
        "div",
        { class: "section__head" },
        h("h2", { class: "section__title", id: titleId }, titulo),
        intro ? h("p", { class: "section__intro" }, intro) : null,
      ),
      ...content,
    ),
  );
}
