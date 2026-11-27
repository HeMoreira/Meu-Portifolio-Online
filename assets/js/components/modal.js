/* ==========================================================================
   Modal de detalhes — UM modelo para projetos, experiências e certificações.
   Um único <dialog> nativo é criado sob demanda e reaproveitado. O navegador
   cuida de: foco preso, Esc para fechar e fundo inerte. Aqui tratamos:
   fechar ao clicar no fundo, devolver o foco ao botão de origem e travar
   a rolagem da página.

   O conteúdo é uma LISTA DE BLOCOS, renderizados na ordem informada; cada item
   escolhe quais blocos mostrar e em que ordem. Todos são opcionais:

     { tipo: "texto",   titulo?, texto: string | string[] }
     { tipo: "etapas",  titulo?, itens: (string | {titulo, descricao?})[] }
     { tipo: "badges",  titulo,  itens: string[] }
     { tipo: "dados",   titulo?, itens: {rotulo, valor, href?}[] }      ← pares rótulo/valor
     { tipo: "lista",   titulo?, itens: string[] }
     { tipo: "acoes",   itens: {rotulo, href, icone?, primario?}[] }     ← botões/links

   Para um novo tipo de bloco, basta registrar uma função em BLOCOS.
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
  h("section", { class: "modal__section" }, title ? h("h3", {}, title) : null, content);

/** Só http(s): nunca javascript: ou data: vindos dos dados. */
const urlSegura = (href) => (/^https?:\/\//i.test(href ?? "") ? href : null);

/* ---------- Renderizadores de bloco ---------- */
const BLOCOS = {
  texto: ({ titulo, texto }) => {
    const paragrafos = [texto].flat().filter(Boolean);
    return paragrafos.length ? section(titulo, h("div", { class: "modal__texto" }, ...paragrafos.map((t) => h("p", {}, t)))) : null;
  },

  etapas: ({ titulo = "Etapas de desenvolvimento", itens = [] }) =>
    itens.length
      ? section(
          titulo,
          h(
            "ol",
            { class: "steps", role: "list" },
            ...itens.map((etapa) => {
              const { titulo: t, descricao } = typeof etapa === "string" ? { titulo: etapa } : etapa;
              return h(
                "li",
                { class: "steps__item" },
                h("div", {}, h("span", { class: "steps__title" }, t), descricao ? h("p", { class: "steps__desc" }, descricao) : null),
              );
            }),
          ),
        )
      : null,

  badges: ({ titulo, itens = [] }) =>
    itens.length
      ? section(titulo, h("ul", { class: "badges", role: "list" }, ...itens.map((t) => h("li", { class: "badge" }, t))))
      : null,

  dados: ({ titulo, itens = [] }) => {
    const validos = itens.filter((d) => d?.rotulo && d.valor != null && d.valor !== "");
    if (!validos.length) return null;
    return section(
      titulo,
      h(
        "dl",
        { class: "dados" },
        ...validos.map((d) => {
          const href = urlSegura(d.href);
          return h(
            "div",
            { class: "dados__item" },
            h("dt", {}, d.rotulo),
            h("dd", {}, href ? h("a", { href, target: "_blank", rel: "noopener noreferrer" }, String(d.valor), srOnly(" (abre em nova aba)")) : String(d.valor)),
          );
        }),
      ),
    );
  },

  lista: ({ titulo, itens = [] }) =>
    itens.length ? section(titulo, h("ul", { class: "lista" }, ...itens.map((t) => h("li", {}, t)))) : null,

  acoes: ({ itens = [] }) => {
    const links = itens.filter((a) => a?.rotulo && urlSegura(a.href));
    if (!links.length) return null;
    return h(
      "div",
      { class: "btn-group" },
      ...links.map((a, i) =>
        h(
          "a",
          {
            class: `btn ${a.primario === false || i > 0 ? "btn--outline" : "btn--primary"}`,
            href: a.href,
            target: "_blank",
            rel: "noopener noreferrer",
          },
          icon(a.icone ?? "external"),
          a.rotulo,
          srOnly(" (abre em nova aba)"),
        ),
      ),
    );
  },
};

function renderBloco(bloco) {
  const render = BLOCOS[bloco?.tipo];
  if (!render) {
    console.warn(`Bloco de modal desconhecido: "${bloco?.tipo}".`);
    return null;
  }
  return render(bloco);
}

/** true se pelo menos um bloco tem algo a mostrar (decide se o botão "Ver detalhes" existe). */
export function temConteudo(blocos = []) {
  return blocos.some((bloco) => BLOCOS[bloco?.tipo]?.(bloco));
}

/**
 * @param {{ titulo: string, rotulo?: string, blocos: object[] }} conteudo
 *   rotulo: texto pequeno acima do título (ex.: "Projeto", "Certificação")
 * @param {HTMLElement} [openerEl]  botão que abriu o modal (recebe o foco ao fechar)
 */
export function openModal({ titulo, rotulo, blocos = [] }, openerEl) {
  const d = ensureDialog();
  opener = openerEl ?? null;

  d.replaceChildren(
    h(
      "div",
      { class: "modal__panel" },
      h(
        "div",
        { class: "modal__header" },
        h(
          "div",
          {},
          rotulo ? h("p", { class: "modal__eyebrow" }, rotulo) : null,
          h("h2", { class: "modal__title", id: "modal-title" }, titulo),
        ),
        h("button", { class: "icon-btn", type: "button", "aria-label": "Fechar detalhes", onclick: () => d.close() }, icon("close")),
      ),
      h("div", { class: "modal__body" }, ...blocos.map(renderBloco)),
    ),
  );
  document.documentElement.classList.add("has-modal");

  if (typeof d.showModal === "function") d.showModal();
  else d.setAttribute("open", ""); // fallback para navegadores sem <dialog>
}
