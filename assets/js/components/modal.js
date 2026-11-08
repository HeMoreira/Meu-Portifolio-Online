/* ==========================================================================
   Modal de detalhes do projeto.
   Um único <dialog> nativo é criado sob demanda e reaproveitado. O navegador
   cuida de: foco preso, Esc para fechar e fundo inerte. Aqui tratamos:
   fechar ao clicar no fundo, devolver o foco ao botão de origem e travar
   a rolagem da página.
   ========================================================================== */
import { h, srOnly } from "../core.js";
import { icon } from "../icons.js";

let dialog = null;
let opener = null;

function ensureDialog() {
  if (dialog) return dialog;

  dialog = h("dialog", { class: "modal", "aria-labelledby": "modal-title" });

  // Clique no fundo (::backdrop) tem o próprio <dialog> como alvo
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener("close", () => {
    document.documentElement.classList.remove("has-modal");
    opener?.focus();
    opener = null;
  });

  document.body.append(dialog);
  return dialog;
}

const section = (title, content) =>
  h("section", { class: "modal__section" }, h("h3", {}, title), content);

/**
 * Detalhes aceitos em projeto.detalhes:
 *   resumo?: string
 *   etapas?: ({titulo: string, descricao?: string} | string)[]
 *   tecnologias?: string[]
 */
function buildContent(projeto, close) {
  const { resumo, etapas = [], tecnologias = [] } = projeto.detalhes ?? {};

  const steps = etapas.length
    ? section(
        "Etapas de desenvolvimento",
        h(
          "ol",
          { class: "steps", role: "list" },
          ...etapas.map((etapa) => {
            const { titulo, descricao } = typeof etapa === "string" ? { titulo: etapa } : etapa;
            return h(
              "li",
              { class: "steps__item" },
              h(
                "div",
                {},
                h("span", { class: "steps__title" }, titulo),
                descricao ? h("p", { class: "steps__desc" }, descricao) : null,
              ),
            );
          }),
        ),
      )
    : null;

  const techs = tecnologias.length
    ? section(
        "Tecnologias utilizadas",
        h(
          "ul",
          { class: "badges", role: "list" },
          ...tecnologias.map((t) => h("li", { class: "badge" }, t)),
        ),
      )
    : null;

  const repo = projeto.repositorio
    ? h(
        "div",
        { class: "btn-group" },
        h(
          "a",
          {
            class: "btn btn--primary",
            href: projeto.repositorio,
            target: "_blank",
            rel: "noopener noreferrer",
          },
          icon("code"),
          "Ver repositório",
          srOnly(" (abre em nova aba)"),
        ),
      )
    : null;

  return h(
    "div",
    { class: "modal__panel" },
    h(
      "div",
      { class: "modal__header" },
      h("h2", { class: "modal__title", id: "modal-title" }, projeto.titulo),
      h(
        "button",
        { class: "icon-btn", type: "button", "aria-label": "Fechar detalhes", onclick: close },
        icon("close"),
      ),
    ),
    h("div", { class: "modal__body" }, resumo ? h("p", {}, resumo) : null, techs, steps, repo),
  );
}

/**
 * @param {object} projeto  mesmo objeto usado em createProjeto()
 * @param {HTMLElement} [openerEl]  botão que abriu o modal (recebe o foco ao fechar)
 */
export function openProjectModal(projeto, openerEl) {
  const d = ensureDialog();
  opener = openerEl ?? null;

  d.replaceChildren(buildContent(projeto, () => d.close()));
  document.documentElement.classList.add("has-modal");

  if (typeof d.showModal === "function") d.showModal();
  else d.setAttribute("open", ""); // fallback para navegadores sem <dialog>
}
