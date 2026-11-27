/* Certificações: card (imagem inteira, título, descrição e botão "Ver detalhes").
   O botão abre o MESMO modal dos projetos (modal.js), com blocos montados a partir dos
   campos opcionais da certificação (data/certificacoes.js). */
import { h, assetUrl, anchorId, srOnly, nextId } from "../core.js";
import { icon } from "../icons.js";
import { openModal, temConteudo } from "./modal.js";

/** "2026-10" → "outubro de 2026"; "2026-10-05" → "5 de outubro de 2026"; outro texto passa como está. */
export function formatarData(valor) {
  const m = /^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(valor ?? "");
  if (!m) return valor || null;
  const [, ano, mes, dia] = m;
  const data = new Date(Date.UTC(Number(ano), Number(mes) - 1, Number(dia ?? 1)));
  if (Number.isNaN(data.getTime())) return valor;
  return data.toLocaleDateString("pt-BR", dia ? { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" } : { month: "long", year: "numeric", timeZone: "UTC" });
}

/** Títulos das competências do currículo ligadas a esta certificação (+ as extras do catálogo). */
function competenciasRelacionadas(item, competencias) {
  const doCurriculo = competencias
    .filter((c) => c.relacao?.tipo === "certificacao" && c.relacao.id === item.id)
    .map((c) => c.titulo);
  return [...new Set([...(item.competencias ?? []), ...doCurriculo])];
}

/** Blocos do modal. `detalhes` (array) substitui o modelo padrão; { tipo: "competencias" } insere os badges. */
export function blocosDaCertificacao(item, relacionadas) {
  const badges = (titulo) => ({ tipo: "badges", titulo: titulo ?? "Competências relacionadas", itens: relacionadas });
  if (Array.isArray(item.detalhes)) {
    return item.detalhes.map((b) => (b?.tipo === "competencias" ? badges(b.titulo) : b));
  }
  const { codigo, url } = item.credencial ?? {};
  return [
    {
      tipo: "dados",
      itens: [
        { rotulo: "Organização responsável", valor: item.organizacao },
        { rotulo: "Carga horária", valor: item.cargaHoraria ? `${item.cargaHoraria} ${item.cargaHoraria === 1 ? "hora" : "horas"}` : null },
        { rotulo: "Emitido em", valor: formatarData(item.emissao) },
        { rotulo: "Expira em", valor: item.expiracao === "nunca" ? "Não expira" : formatarData(item.expiracao) },
        { rotulo: "Código da credencial", valor: codigo },
      ],
    },
    badges(),
    { tipo: "acoes", itens: url ? [{ rotulo: "Verificar credencial", href: url, icone: "link" }] : [] },
  ];
}

/**
 * @param {object} item  certificação resolvida (ver data/certificacoes.js)
 * @param {{ competencias?: object[] }} [opcoes]  competências do currículo (para os badges do modal)
 */
export function createCertificacao(item, { competencias = [] } = {}) {
  const titleId = nextId("certificacao-titulo");
  const src = assetUrl("images", item.imagem);
  const blocos = blocosDaCertificacao(item, competenciasRelacionadas(item, competencias));

  return h(
    "article",
    {
      class: "card certificacao",
      id: anchorId("certificacao", item.id),
      "aria-labelledby": titleId,
    },
    // A imagem aparece inteira (object-fit: contain); o espaço que sobra é preenchido por uma
    // cópia borrada dela mesma (--cert-img), em vez de faixas vazias.
    h(
      "figure",
      { class: "certificacao__media", style: { "--cert-img": `url("${src}")` } },
      h("img", {
        class: "certificacao__imagem",
        src,
        alt: item.imagemAlt ?? `Certificado: ${item.titulo}`,
        width: 640,
        height: 400,
        loading: "lazy",
        decoding: "async",
      }),
    ),
    h(
      "div",
      { class: "certificacao__body" },
      h("h3", { id: titleId }, item.titulo),
      item.descricao ? h("p", { class: "certificacao__desc" }, item.descricao) : null,
      temConteudo(blocos)
        ? h(
            "div",
            { class: "certificacao__acoes" },
            h(
              "button",
              {
                class: "btn btn--outline",
                type: "button",
                "aria-haspopup": "dialog",
                onclick: (event) => openModal({ titulo: item.titulo, rotulo: "Certificação", blocos }, event.currentTarget),
              },
              icon("info"),
              "Ver detalhes",
              srOnly(` de ${item.titulo}`),
            ),
          )
        : null,
    ),
  );
}

export function createCertificacoesGrid(itens = [], competencias = []) {
  return h(
    "ul",
    { class: "grid grid--cards", role: "list" },
    ...itens.map((item) => h("li", {}, createCertificacao(item, { competencias }))),
  );
}
