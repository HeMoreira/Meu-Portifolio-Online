/* ==========================================================================
   Trava de navegação (reversível).

   Enquanto o jogo está ativo, links não podem levar a outros currículos nem
   recarregar a página. Nada é removido ou reescrito: os links só ganham
   aria-disabled/tabindex="-1" e os cliques são interceptados na fase de captura.
   unlock() devolve exatamente o estado anterior.

   Ficam liberados: o botão de tema ([data-theme-toggle]) e qualquer elemento
   marcado com [data-game-keep] (controles do jogo e interfaces de conclusão).
   ========================================================================== */

const LOCKED = "a[href]:not([data-game-keep])";
const KEEP = "[data-game-keep], [data-theme-toggle]";

export function lockLinks(scope = document) {
  const ac = new AbortController();
  const { signal } = ac;
  /** @type {{el: Element, tabindex: string|null, ariaDisabled: string|null}[]} */
  const marked = [];

  for (const el of scope.querySelectorAll(LOCKED)) {
    marked.push({
      el,
      tabindex: el.getAttribute("tabindex"),
      ariaDisabled: el.getAttribute("aria-disabled"),
    });
    el.setAttribute("aria-disabled", "true");
    el.setAttribute("tabindex", "-1");
  }

  const blocked = (event) => {
    const link = event.target instanceof Element ? event.target.closest(LOCKED) : null;
    if (!link || link.closest(KEEP)) return;
    event.preventDefault();
    event.stopPropagation();
  };

  // click cobre mouse, toque e Enter; auxclick = botão do meio (abre nova aba)
  for (const type of ["click", "auxclick", "dragstart"]) {
    document.addEventListener(type, blocked, { capture: true, signal });
  }

  return {
    unlock() {
      ac.abort();
      for (const { el, tabindex, ariaDisabled } of marked) {
        if (tabindex === null) el.removeAttribute("tabindex");
        else el.setAttribute("tabindex", tabindex);
        if (ariaDisabled === null) el.removeAttribute("aria-disabled");
        else el.setAttribute("aria-disabled", ariaDisabled);
      }
      marked.length = 0;
    },
  };
}
