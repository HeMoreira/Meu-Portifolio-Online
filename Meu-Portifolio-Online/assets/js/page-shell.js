/* ==========================================================================
   page-shell.js — montagem comum a TODAS as páginas (currículos e home):
   skip link, header, <main>, rodapé, rótulo do botão de tema, scroll-spy
   e rolagem até o #hash. Cada página só fornece o <main> e a lista de seções.
   ========================================================================== */
import { h } from "./core.js";
import { createHeader, initScrollSpy } from "./components/header.js";
import { createFooter } from "./components/footer.js";
import { SECTIONS } from "./config.js";

/**
 * @param {{perfil: {nome: string, funcao: string}, main: HTMLElement, sections?: {id: string, label: string}[]}} options
 */
export function mountPage({ perfil, main, sections = SECTIONS }) {
  const skipLink = h("a", { class: "skip-link", href: "#conteudo" }, "Pular para o conteúdo");
  const header = createHeader(perfil, sections);

  document.body.prepend(skipLink, header);
  document.body.append(main, createFooter(perfil));

  // Só agora o botão de tema está no DOM: define seu rótulo conforme o tema ativo
  window.PortfolioTheme?.sync();
  initScrollSpy(header, sections);

  // O alvo do #hash não existia quando o navegador tentou rolar até ele
  if (location.hash.length > 1) {
    document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();
  }
}
