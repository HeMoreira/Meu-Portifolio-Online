/* ==========================================================================
   theme.js — alternância de tema claro/escuro (lógica ÚNICA do site).

   Script CLÁSSICO, carregado no <head> sem defer/async: aplica o tema ANTES
   da primeira pintura (evita o "flash" de tema errado). Nenhuma página
   duplica esta lógica.

   - Primeira visita: usa prefers-color-scheme do sistema operacional.
   - Escolha manual: gravada em localStorage e compartilhada entre páginas,
     visitas e abas.
   - Qualquer elemento com [data-theme-toggle] vira um botão de alternância
     (delegação de eventos — funciona mesmo para botões criados depois).
   - API pública mínima: window.PortfolioTheme { get, set, toggle, sync }
     e o evento "themechange" em document.
   ========================================================================== */
(function () {
  "use strict";

  var KEY = "portfolio-theme";
  var root = document.documentElement;
  var media = window.matchMedia("(prefers-color-scheme: dark)");

  function readStored() {
    try {
      var value = localStorage.getItem(KEY);
      return value === "light" || value === "dark" ? value : null;
    } catch (e) {
      return null; // armazenamento bloqueado (modo privado, etc.)
    }
  }

  function store(value) {
    try {
      localStorage.setItem(KEY, value);
    } catch (e) {
      /* ignora: o tema vale apenas para esta página */
    }
  }

  function current() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  /* Atualiza rótulo/tooltip dos botões: descrevem a AÇÃO disponível. */
  function sync() {
    var label = current() === "dark" ? "Ativar tema claro" : "Ativar tema escuro";
    var buttons = document.querySelectorAll("[data-theme-toggle]");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute("aria-label", label);
      buttons[i].setAttribute("title", label);
    }
  }

  function apply(theme, persist) {
    root.setAttribute("data-theme", theme);
    if (persist) store(theme);
    sync();
    document.dispatchEvent(new CustomEvent("themechange", { detail: { theme: theme } }));
  }

  function toggle() {
    apply(current() === "dark" ? "light" : "dark", true);
  }

  // 1) aplica o tema inicial imediatamente
  apply(readStored() || (media.matches ? "dark" : "light"), false);

  // 2) um clique em qualquer [data-theme-toggle] alterna o tema
  document.addEventListener("click", function (event) {
    var target = event.target;
    if (target && target.closest && target.closest("[data-theme-toggle]")) toggle();
  });

  // 3) sem escolha manual, acompanha mudanças do sistema operacional
  function onSystemChange(event) {
    if (!readStored()) apply(event.matches ? "dark" : "light", false);
  }
  if (media.addEventListener) media.addEventListener("change", onSystemChange);
  else if (media.addListener) media.addListener(onSystemChange);

  // 4) sincroniza com outras abas/páginas abertas
  window.addEventListener("storage", function (event) {
    if (event.key === KEY && (event.newValue === "light" || event.newValue === "dark")) {
      apply(event.newValue, false);
    }
  });

  window.PortfolioTheme = {
    get: current,
    set: function (theme) {
      if (theme === "light" || theme === "dark") apply(theme, true);
    },
    toggle: toggle,
    sync: sync,
  };
})();
