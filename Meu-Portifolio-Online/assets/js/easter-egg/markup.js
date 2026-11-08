/* ==========================================================================
   Estrutura (apenas DOM, sem comportamento) da foto interativa.

   div.egg[data-egg][data-egg-state]          ← raiz; estado em data-egg-state
     div.egg__stage                           ← área de hover (foto + região das setas)
       div.egg__photo[data-media="foto"]
         div.egg__trigger[data-egg-trigger]   ← vira botão só quando o egg está ativo
           img.egg__img + span.egg__tint
         div.media__layer[data-layer="interaction"]  ← camada reservada (inativa)
         form.egg__code[hidden]               ← "Faça!" + campo de 2 letras
       div.egg__pad[role=group][hidden]       ← 4 setas
     p.egg__caption                           ← "Contra o mundo"

   Nenhum texto digitado pelo usuário passa por aqui; tudo é criado com a API
   do DOM (h() usa createElement/setAttribute/append, nunca innerHTML).
   ========================================================================== */
import { h, assetUrl, nextId } from "../core.js";
import { icon } from "../icons.js";
import { DIRECTIONS, CODE_LENGTH, STATES } from "./config.js";

/**
 * @param {{foto: {src: string, alt?: string}, nome: string, legenda: string}} options
 */
export function createEggMarkup({ foto, nome, legenda }) {
  const padId = nextId("egg-pad");
  const inputId = nextId("egg-code");
  const statusId = nextId("egg-status");

  const arrows = Object.entries(DIRECTIONS).map(([dir, { label }]) =>
    h(
      "button",
      {
        class: `egg__arrow egg__arrow--${dir}`,
        type: "button",
        "data-egg-dir": dir,
        "aria-label": label,
      },
      icon("triangle"),
    ),
  );

  const codeForm = h(
    "form",
    { class: "egg__code", "data-egg-code": "", hidden: true, novalidate: true, autocomplete: "off" },
    h("label", { class: "egg__label", for: inputId }, "Faça!"),
    h("input", {
      class: "egg__input",
      id: inputId,
      name: "egg-code",
      type: "text",
      maxlength: CODE_LENGTH,
      inputmode: "text",
      autocomplete: "off",
      autocapitalize: "characters",
      spellcheck: "false",
      placeholder: "__",
      "aria-describedby": statusId,
    }),
    h("p", { class: "visually-hidden", id: statusId, role: "status" }),
  );

  return h(
    "div",
    {
      class: "egg",
      "data-egg": "",
      "data-egg-state": STATES.DISABLED,
      "data-egg-label": `Foto de ${nome}`,
    },
    h(
      "div",
      { class: "egg__stage" },
      h(
        "div",
        { class: "egg__photo", "data-media": "foto" },
        h(
          "div",
          { class: "egg__trigger", "data-egg-trigger": "" },
          h("img", {
            class: "egg__img",
            src: assetUrl("images", foto.src),
            alt: foto.alt ?? "",
            width: 176,
            height: 176,
            decoding: "async",
          }),
          h("span", { class: "egg__tint", "aria-hidden": "true" }),
        ),
        // Camada de interação reservada para as hitboxes futuras (inativa)
        h("div", {
          class: "media__layer",
          "data-layer": "interaction",
          "data-active": "false",
          "aria-hidden": "true",
        }),
        codeForm,
      ),
      h(
        "div",
        {
          class: "egg__pad",
          id: padId,
          role: "group",
          "aria-label": "Controles direcionais",
          "data-egg-pad": "",
          hidden: true,
        },
        ...arrows,
      ),
    ),
    h("p", { class: "egg__caption" }, legenda),
  );
}
