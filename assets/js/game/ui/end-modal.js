/* ==========================================================================
   Modal de fim de jogo — aparece quando state.phase vira ENDED.

   Conteúdo: título "Fim de jogo", o personagem em idle (mesmo animador/spritesheet
   do jogo), o resultado (vidas, pontos, tempo da run) e dois botões neutros:
     • Jogar novamente            → onRestart()
     • Retornar à página inicial  → onExit()
   Quem executa as ações (pulso longo, reinício, desmontagem) é secret-mode.js/
   index.js; aqui só há interface.

   Acessibilidade: role="dialog" + aria-modal, foco no 1º botão, Tab preso entre os
   dois botões. NÃO usa <dialog>.showModal(): a "top layer" ficaria acima da camada
   de transição (z-index 9999), e a transição precisa cobrir tudo, inclusive o modal.
   ========================================================================== */
import { h } from "../../core.js";
import { createAnimator } from "../animator.js";
import { ANIMATIONS, SPRITESHEET } from "../config.js";
import { PHASES } from "../state.js";

const SPRITE_SCALE = 4;

/** 42.376 → "42.38 s" */
export const formatTime = (seconds) => `${seconds.toFixed(2)} s`;

/**
 * @param {{
 *   state: ReturnType<import("../state.js").createGameState>,
 *   sheetUrl: string,
 *   onRestart: () => void,
 *   onExit: () => void,
 * }} options
 */
export function mountEndModal({ state, sheetUrl, onRestart, onExit }) {
  const sprite = h("div", { class: "game-end__sprite", "aria-hidden": "true" });
  const animator = createAnimator({ element: sprite, sheet: { url: sheetUrl, ...SPRITESHEET, scale: SPRITE_SCALE }, animations: ANIMATIONS, initial: "idle" });
  animator.setPosition(0, 0);
  animator.render();

  const value = () => h("span", { class: "game-end__value" });
  const lives = value();
  const points = value();
  const time = value();

  const restart = h("button", { class: "btn", type: "button", "data-game-keep": "", "data-action": "restart" }, "Jogar novamente");
  const exit = h("button", { class: "btn", type: "button", "data-game-keep": "", "data-action": "exit" }, "Retornar à página inicial");
  const buttons = [restart, exit];

  const panel = h(
    "section",
    { class: "game-end__panel", role: "dialog", "aria-modal": "true", "aria-labelledby": "game-end-title" },
    h("h2", { class: "game-end__title", id: "game-end-title" }, "Fim de jogo"),
    h("div", { class: "game-end__hero" }, sprite),
    h(
      "ul",
      { class: "game-end__stats" },
      h("li", {}, "Vidas restantes: ", lives),
      h("li", {}, "Pontos coletados: ", points),
      h("li", {}, "Tempo da run: ", time),
    ),
    h("div", { class: "game-end__actions" }, restart, exit),
  );
  const root = h("div", { class: "game-end", "data-game-ui": "", "data-state": "hidden" }, panel);
  document.body.append(root);

  let timer = 0;
  let last = 0;
  const startSprite = () => {
    last = performance.now();
    timer = window.setInterval(() => {
      const now = performance.now();
      animator.update((now - last) / 1000);
      animator.render();
      last = now;
    }, 60);
  };
  const stopSprite = () => {
    clearInterval(timer);
    timer = 0;
  };

  function show({ result }) {
    lives.textContent = `${result.lives}/${result.maxLives}`;
    points.textContent = `${result.score}/${result.maxScore}`;
    time.textContent = formatTime(result.time);
    panel.dataset.outcome = result.reason; // "goal" | "dead" (para o polimento: variações de tom)
    for (const button of buttons) button.disabled = false;
    root.dataset.state = "visible";
    animator.play("idle", { restart: true });
    startSprite();
    restart.focus({ preventScroll: true });
  }

  function hide() {
    stopSprite();
    root.dataset.state = "hidden";
  }

  // foco preso entre os dois botões
  root.addEventListener("keydown", (event) => {
    if (event.key !== "Tab") return;
    const index = buttons.indexOf(document.activeElement);
    const next = (index + (event.shiftKey ? -1 : 1) + buttons.length) % buttons.length;
    event.preventDefault();
    buttons[next].focus({ preventScroll: true });
  });

  const act = (fn) => () => {
    for (const button of buttons) button.disabled = true; // evita cliques duplos durante a transição
    fn();
  };
  restart.addEventListener("click", act(onRestart));
  exit.addEventListener("click", act(onExit));

  const off = state.subscribe((now, before) => {
    if (now.phase === before.phase) return;
    if (now.phase === PHASES.ENDED && now.result) show(now);
    else if (before.phase === PHASES.ENDED) hide();
  });

  return {
    element: root,
    destroy() {
      off();
      stopSprite();
      root.remove();
    },
  };
}
