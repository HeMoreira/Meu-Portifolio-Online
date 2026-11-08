/* ==========================================================================
   resume-page.js — ponto de entrada de TODAS as páginas de currículo.

   A página HTML só declara:
     <html data-accent="{slug}">   → identidade de cor (accents.css)
     <body data-curriculo="{slug}"> → qual arquivo de dados carregar
   e este módulo monta header, as 4 seções e o rodapé a partir de
   assets/data/curriculos/{slug}.js, usando os componentes compartilhados.

   Para adicionar um novo recurso global (ex.: o easter egg da home), crie um
   módulo em assets/js/ e carregue-o com seu próprio <script type="module">
   na página que o utiliza — nada aqui precisa mudar.
   ========================================================================== */
import { h, anchorId } from "./core.js";
import { mountPage } from "./page-shell.js";
import { createSection } from "./components/section.js";
import { createSobre } from "./components/sobre.js";
import { createCompetenciasGrid } from "./components/competencia.js";
import { createProjetosList } from "./components/projeto.js";
import { createCertificacoesGrid } from "./components/certificacao.js";

const SLUG_PATTERN = /^[a-z0-9-]+$/;

async function loadData(slug) {
  if (!SLUG_PATTERN.test(slug)) throw new Error(`Identificador de currículo inválido: "${slug}"`);
  // Caminho relativo a ESTE arquivo (assets/js/) — igual para qualquer página.
  const module = await import(`../data/curriculos/${slug}.js`);
  return module.default;
}

function render(data) {
  const { perfil, sobre, competencias, projetos, certificacoes } = data;

  // Âncoras que existem nesta página: competências só linkam para elas
  const destinos = new Set([
    ...(projetos.itens ?? []).map((p) => anchorId("projeto", p.id)),
    ...(certificacoes.itens ?? []).map((c) => anchorId("certificacao", c.id)),
  ]);

  const main = h(
    "main",
    { id: "conteudo" },
    createSobre(perfil, sobre),
    createSection(
      {
        id: "competencias",
        titulo: competencias.titulo ?? "Competências",
        intro: competencias.intro,
      },
      createCompetenciasGrid(competencias.itens, destinos),
    ),
    createSection(
      { id: "projetos", titulo: projetos.titulo ?? "Projetos", intro: projetos.intro },
      createProjetosList(projetos.itens),
    ),
    createSection(
      {
        id: "certificacoes",
        titulo: certificacoes.titulo ?? "Certificações",
        intro: certificacoes.intro,
      },
      createCertificacoesGrid(certificacoes.itens),
    ),
  );

  mountPage({ perfil, main });
}

function renderError(error) {
  console.error(error);
  document.body.append(
    h(
      "main",
      { id: "conteudo", class: "container" },
      h(
        "p",
        { class: "noscript", role: "alert" },
        "Não foi possível carregar o conteúdo desta página. Tente novamente mais tarde.",
      ),
    ),
  );
}

const slug = document.body.dataset.curriculo;

try {
  const data = await loadData(slug);
  const root = document.documentElement;
  if (!root.dataset.accent) root.dataset.accent = data.accent ?? slug;
  render(data);
} catch (error) {
  renderError(error);
}
