/* Projetos: texto + 2 botões à esquerda, mídia à direita, 4 barras abaixo */
import { h, assetUrl, anchorId, srOnly, nextId } from "../core.js";
import { icon } from "../icons.js";
import { openProjectModal } from "./modal.js";

/** Mídia do projeto: imagem (images/projetos/…) ou vídeo (videos/projetos/…). */
function createMedia(media, titulo) {
  if (!media) return null;

  if (media.tipo === "video") {
    return h(
      "figure",
      { class: "projeto__media" },
      h(
        "video",
        {
          controls: true,
          playsinline: true,
          preload: "metadata", // sem autoplay: respeita prefers-reduced-motion e dados móveis
          poster: media.poster ? assetUrl("images", media.poster) : null,
          "aria-label": media.alt ?? `Vídeo do projeto ${titulo}`,
        },
        h("source", { src: assetUrl("videos", media.src), type: media.mime }),
        "Seu navegador não suporta vídeo HTML5.",
      ),
    );
  }

  return h(
    "figure",
    { class: "projeto__media" },
    h("img", {
      src: assetUrl("images", media.src),
      alt: media.alt ?? "",
      width: 1280,
      height: 800,
      loading: "lazy",
      decoding: "async",
    }),
  );
}

/** Barras de métrica. O valor (0–100) vira a custom property CSS --value. */
function createMetricas(metricas) {
  if (!metricas?.length) return null;

  return h(
    "ul",
    { class: "metricas", role: "list", "aria-label": "Indicadores do projeto" },
    ...metricas.map((m) => {
      const valor = Math.max(0, Math.min(100, Number(m.valor) || 0));
      const labelId = nextId("metrica");
      return h(
        "li",
        { class: "metrica" },
        h(
          "div",
          { class: "metrica__head" },
          h("span", { class: "metrica__label", id: labelId }, m.rotulo),
          h("span", { class: "metrica__value" }, `${valor}%`),
        ),
        h(
          "div",
          {
            class: "metrica__bar",
            role: "meter",
            "aria-labelledby": labelId,
            "aria-valuemin": 0,
            "aria-valuemax": 100,
            "aria-valuenow": valor,
            "aria-valuetext": `${valor}%`,
          },
          h("span", { class: "metrica__fill", style: { "--value": `${valor}%` } }),
        ),
      );
    }),
  );
}

/**
 * @param {{
 *   id: string, titulo: string, descricao: string, repositorio?: string,
 *   media?: {tipo: "imagem"|"video", src: string, alt?: string, poster?: string, mime?: string},
 *   metricas?: {rotulo: string, valor: number}[],
 *   detalhes?: object
 * }} projeto
 */
export function createProjeto(projeto) {
  const titleId = `${anchorId("projeto", projeto.id)}-titulo`;

  const repoLink = projeto.repositorio
    ? h(
        "a",
        {
          class: "btn btn--primary",
          href: projeto.repositorio,
          target: "_blank",
          rel: "noopener noreferrer",
        },
        icon("code"),
        "Repositório",
        srOnly(` do projeto ${projeto.titulo} (abre em nova aba)`),
      )
    : // sem repositório informado: botão desabilitado, nunca um link fictício
      h(
        "button",
        { class: "btn btn--primary", type: "button", disabled: true },
        icon("code"),
        "Repositório indisponível",
        srOnly(` para o projeto ${projeto.titulo}`),
      );

  const detailsButton = projeto.detalhes
    ? h(
        "button",
        {
          class: "btn btn--outline",
          type: "button",
          "aria-haspopup": "dialog",
          onclick: (event) => openProjectModal(projeto, event.currentTarget),
        },
        icon("info"),
        "Ver detalhes",
        srOnly(` do projeto ${projeto.titulo}`),
      )
    : null;

  return h(
    "article",
    {
      class: "card projeto",
      id: anchorId("projeto", projeto.id),
      "aria-labelledby": titleId,
    },
    h(
      "div",
      { class: "projeto__texto" },
      h("h3", { id: titleId }, projeto.titulo),
      h("p", {}, projeto.descricao),
      repoLink || detailsButton ? h("div", { class: "btn-group" }, repoLink, detailsButton) : null,
    ),
    createMedia(projeto.media, projeto.titulo),
    createMetricas(projeto.metricas),
  );
}

export function createProjetosList(itens = []) {
  return h(
    "ul",
    { class: "projetos__lista", role: "list" },
    ...itens.map((item) => h("li", {}, createProjeto(item))),
  );
}
