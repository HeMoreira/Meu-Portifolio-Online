/* Projeto / experiência: "Projeto: " ou "Experiência: " + título, texto e 2 botões à esquerda,
   mídia à direita e 4 barras (no máximo 2 por linha) abaixo.
   O layout (1 ou 2 colunas) responde à LARGURA DO PRÓPRIO CARD (container query), porque o mesmo
   card aparece no centro do carrossel, nas laterais (reduzido por transform) e em listas. */
import { h, assetUrl, anchorId, srOnly, nextId } from "../core.js";
import { icon } from "../icons.js";
import { openModal, temConteudo } from "./modal.js";

const TIPOS = { projeto: "Projeto", experiencia: "Experiência" };

/** Rótulo do tipo ("Projeto" | "Experiência"). Desconhecido vira projeto. */
export const rotuloTipo = (tipo) => TIPOS[tipo] ?? TIPOS.projeto;

/** Botão que amplia o vídeo sobre o card inteiro (só em telas largas — ver projetos.css). */
function createVideoToggle(card, titulo) {
  const label = h("span", { class: "projeto__video-toggle-label" }, "Ampliar vídeo");
  const button = h(
    "button",
    { class: "projeto__video-toggle", type: "button" },
    icon("expand", "icon-expand"),
    icon("collapse", "icon-collapse"),
    label,
    srOnly(` de ${titulo}`),
  );
  button.addEventListener("click", () => {
    const expanded = card.dataset.videoExpanded !== "true";
    setVideoExpanded(card, expanded);
    button.focus();
  });
  return button;
}

/** Amplia/reduz o vídeo do card. O mesmo <video> permanece no DOM: reprodução e tempo são preservados. */
export function setVideoExpanded(card, expanded) {
  const button = card.querySelector(".projeto__video-toggle");
  if (!button) return;
  if (expanded) card.dataset.videoExpanded = "true";
  else delete card.dataset.videoExpanded;
  button.querySelector(".projeto__video-toggle-label").textContent = expanded
    ? "Reduzir vídeo"
    : "Ampliar vídeo";
}

/** Volta o card ao estado normal (vídeo reduzido e pausado). Usado quando ele sai de cena. */
export function resetarProjeto(card) {
  setVideoExpanded(card, false);
  card.querySelector("video")?.pause();
}

/**
 * Blocos do modal de um projeto/experiência. `detalhes` aceita:
 *  - um ARRAY de blocos (ver modal.js): cada item monta o modal do seu jeito; ou
 *  - o formato resumido { resumo?, tecnologias?, etapas? } (+ botão do repositório automático).
 * Sem `detalhes`, não há modal (e nem botão).
 */
export function blocosDoProjeto(projeto) {
  const d = projeto.detalhes;
  if (!d) return [];
  if (Array.isArray(d)) return d;
  return [
    { tipo: "texto", texto: d.resumo },
    { tipo: "badges", titulo: "Tecnologias utilizadas", itens: d.tecnologias },
    { tipo: "etapas", itens: d.etapas },
    { tipo: "acoes", itens: projeto.repositorio ? [{ rotulo: "Ver repositório", href: projeto.repositorio, icone: "code" }] : [] },
  ];
}

/** Mídia do projeto: imagem (images/projetos/…) ou vídeo (videos/projetos/…). */
function createMedia(media, titulo, card, medicao) {
  if (!media) return null;
  // Cópia só para medir altura (ver carrossel.js): a moldura tem proporção fixa, não precisa de arquivo
  if (medicao) return h("figure", { class: "projeto__media" });

  if (media.tipo === "video") {
    return h(
      "figure",
      { class: "projeto__media projeto__media--video" },
      h(
        "video",
        {
          controls: true,
          playsinline: true,
          preload: "metadata", // sem autoplay: respeita prefers-reduced-motion e dados móveis
          poster: media.poster ? assetUrl("images", media.poster) : null,
          "aria-label": media.alt ?? `Vídeo de ${titulo}`,
        },
        h("source", { src: assetUrl("videos", media.src), type: media.mime }),
        "Seu navegador não suporta vídeo HTML5.",
      ),
      createVideoToggle(card, titulo),
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
      draggable: "false",
    }),
  );
}

/** Barras de métrica. O valor (0–100) vira a custom property CSS --value. */
function createMetricas(metricas) {
  if (!metricas?.length) return null;

  return h(
    "ul",
    { class: "metricas", role: "list", "aria-label": "Indicadores" },
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
 *   id: string, tipo?: "projeto"|"experiencia", titulo: string, descricao: string, repositorio?: string,
 *   media?: {tipo: "imagem"|"video", src: string, alt?: string, poster?: string, mime?: string},
 *   metricas?: {rotulo: string, valor: number}[],
 *   detalhes?: object | object[]
 * }} projeto
 * @param {{ comAncora?: boolean, medicao?: boolean }} [opcoes]
 *   comAncora: define id="projeto-{id}" (só uma cópia por página)
 *   medicao:   cópia sem mídia, usada só para medir a altura do maior card do ano
 */
export function createProjeto(projeto, { comAncora = true, medicao = false } = {}) {
  const titleId = nextId("projeto-titulo");
  const tipo = rotuloTipo(projeto.tipo);
  const rotulo = tipo;

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
        srOnly(` de ${projeto.titulo} (abre em nova aba)`),
      )
    : projeto.tipo === "experiencia"
      ? null // experiência não tem repositório: nada de botão desabilitado sem sentido
      : // sem repositório informado: botão desabilitado, nunca um link fictício
        h(
          "button",
          { class: "btn btn--primary", type: "button", disabled: true },
          icon("code"),
          "Repositório indisponível",
          srOnly(` para ${projeto.titulo}`),
        );

  const blocos = blocosDoProjeto(projeto);
  const detailsButton = temConteudo(blocos)
    ? h(
        "button",
        {
          class: "btn btn--outline",
          type: "button",
          "aria-haspopup": "dialog",
          onclick: (event) => openModal({ titulo: projeto.titulo, rotulo, blocos }, event.currentTarget),
        },
        icon("info"),
        "Ver detalhes",
        srOnly(` de ${projeto.titulo}`),
      )
    : null;

  const card = h("article", {
    class: "card projeto",
    id: comAncora ? anchorId("projeto", projeto.id) : null,
    "aria-labelledby": titleId,
    "data-tipo": projeto.tipo ?? "projeto",
  });

  card.append(
    h(
      "div",
      { class: "projeto__inner" },
      h(
        "div",
        { class: "projeto__texto" },
        h(
          "h3",
          { id: titleId },
          h("span", { class: "projeto__tipo" }, `${tipo}: `),
          projeto.titulo,
        ),
        h("p", {}, projeto.descricao),
        repoLink || detailsButton ? h("div", { class: "btn-group" }, repoLink, detailsButton) : null,
      ),
      createMedia(projeto.media, projeto.titulo, card, medicao),
      createMetricas(projeto.metricas),
    ),
  );

  // Esc reduz o vídeo ampliado
  card.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && card.dataset.videoExpanded === "true") {
      event.stopPropagation();
      setVideoExpanded(card, false);
      card.querySelector(".projeto__video-toggle")?.focus();
    }
  });

  return card;
}
