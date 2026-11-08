/* Rodapé compartilhado */
import { h } from "../core.js";
import { icon } from "../icons.js";

export function createFooter(perfil) {
  return h(
    "footer",
    { class: "site-footer" },
    h(
      "div",
      { class: "container site-footer__inner" },
      h("p", {}, `© ${new Date().getFullYear()} ${perfil.nome}`),
    ),
  );
}
