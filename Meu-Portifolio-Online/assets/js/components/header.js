/* ==========================================================================
   Header: marca, navegação por seções, botão de tema e menu mobile.
   A lógica do TEMA está em theme.js; aqui o botão só carrega [data-theme-toggle].
   ========================================================================== */
import { h, HOME_URL } from "../core.js";
import { icon } from "../icons.js";
import { SECTIONS } from "../config.js";

const NAV_ID = "site-nav";
const DESKTOP_QUERY = "(min-width: 48rem)"; // mesmo ponto de quebra do layout.css

/**
 * @param {{nome: string, funcao: string}} perfil
 * @param {{id: string, label: string}[]} [sections]
 */
export function createHeader(perfil, sections = SECTIONS) {
  const menuButton = h(
    "button",
    {
      class: "icon-btn menu-toggle",
      type: "button",
      "aria-expanded": "false",
      "aria-controls": NAV_ID,
      "aria-label": "Abrir menu",
    },
    icon("menu", "icon-menu"),
    icon("close", "icon-close"),
  );

  const themeButton = h(
    "button",
    {
      class: "icon-btn theme-toggle",
      type: "button",
      "data-theme-toggle": true,
      "aria-label": "Alternar tema",
    },
    icon("sun", "icon-sun"),
    icon("moon", "icon-moon"),
  );

  const nav = h(
    "nav",
    { class: "site-nav", id: NAV_ID, "aria-label": "Seções do currículo", "data-open": "false" },
    h(
      "ul",
      { class: "site-nav__list", role: "list" },
      ...sections.map((s) =>
        h("li", {}, h("a", { class: "site-nav__link", href: `#${s.id}` }, s.label)),
      ),
    ),
  );

  const header = h(
    "header",
    { class: "site-header", id: "topo" },
    h(
      "div",
      { class: "container site-header__inner" },
      h(
        "a",
        { class: "site-header__brand", href: HOME_URL, title: "Ir para a página inicial" },
        h("span", { class: "site-header__name" }, perfil.nome),
        h("span", { class: "site-header__role" }, perfil.funcao),
      ),
      nav,
      h("div", { class: "site-header__actions" }, themeButton, menuButton),
    ),
  );

  setupMobileMenu(header, nav, menuButton);
  return header;
}

/* ---------- Menu mobile ---------- */
function setupMobileMenu(header, nav, button) {
  const desktop = window.matchMedia(DESKTOP_QUERY);

  const setOpen = (open) => {
    nav.dataset.open = String(open);
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  };
  const isOpen = () => nav.dataset.open === "true";

  button.addEventListener("click", () => setOpen(!isOpen()));
  nav.addEventListener("click", (e) => {
    if (e.target.closest("a")) setOpen(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) {
      setOpen(false);
      button.focus();
    }
  });
  document.addEventListener("click", (e) => {
    if (isOpen() && !header.contains(e.target)) setOpen(false);
  });
  desktop.addEventListener("change", (e) => {
    if (e.matches) setOpen(false);
  });
}

/**
 * Marca no menu a seção visível (aria-current="location").
 * Chamar depois que as seções estiverem no DOM.
 */
export function initScrollSpy(header, sections = SECTIONS) {
  if (!("IntersectionObserver" in window)) return;

  const setCurrent = (id) => {
    header.querySelectorAll(".site-nav__link").forEach((link) => {
      if (link.getAttribute("href") === `#${id}`) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  };

  // Faixa de observação estreita, logo acima do meio da tela
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && setCurrent(e.target.id)),
    { rootMargin: "-35% 0px -60% 0px" },
  );

  sections.forEach((s) => {
    const el = document.getElementById(s.id);
    if (el) observer.observe(el);
  });
}
