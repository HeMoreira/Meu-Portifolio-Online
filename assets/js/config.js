/* ==========================================================================
   config.js — fonte única de verdade para dados globais do site.
   ========================================================================== */

/** Seções de todo currículo, na ordem da navegação. O id vira #id na página. */
export const SECTIONS = [
  { id: "sobre", label: "Sobre" },
  { id: "competencias", label: "Competências" },
  { id: "projetos", label: "Projetos" },
  { id: "certificacoes", label: "Certificações" },
];

/** Seções da página inicial (navegação do header da home). */
export const HOME_SECTIONS = [
  { id: "apresentacao", label: "Apresentação" },
  { id: "curriculos", label: "Currículos" },
];

/**
 * Os seis currículos. O slug é, ao mesmo tempo:
 *   - a pasta/rota pública        → /{slug}/
 *   - o arquivo de dados          → assets/data/curriculos/{slug}.js
 *   - a identidade de cor (CSS)   → <html data-accent="{slug}">
 */
export const CURRICULOS = [
  { slug: "suporte-de-ti", rotulo: "Suporte de TI" },
  { slug: "desenvolvedor-frontend", rotulo: "Front-End" },
  { slug: "desenvolvedor-backend", rotulo: "Back-End" },
  { slug: "desenvolvedor-fullstack", rotulo: "Full Stack" },
  { slug: "desenvolvedor-freelancer", rotulo: "Freelancer" },
  { slug: "domador-de-ias", rotulo: "Domador de IAs" },
];
