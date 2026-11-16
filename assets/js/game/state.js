/* ==========================================================================
   Gerenciamento de estado do jogo — um store mínimo e observável.
   Sem dependências e sem DOM, exceto o reflexo da fase em <html data-game-phase>
   (útil para CSS). A etapa 2 acrescenta campos (jogador, câmera…) sem mudar a API.
   ========================================================================== */

/**
 * Fases do jogo (uma por vez):
 *   INTRO     bloco de introdução: personagem ilustrado + "Press Enter"
 *   EMERGING  o personagem sai do topo do bloco; controles e gravidade ainda travados
 *   PLAYING   física, controles e câmera ativos
 *   ENDED     fim da partida (meta ou morte): modal de resultado; o laço do jogo está parado
 *
 * Campos usados pelo jogo (index.js): lives/maxLives · score/maxScore · tutorial ·
 * endReason ("goal"|"dead") · result { reason, lives, maxLives, score, maxScore, time }
 */
export const PHASES = {
  INTRO: "intro",
  EMERGING: "emerging",
  PLAYING: "playing",
  ENDED: "ended",
};

/**
 * @template T
 * @param {T} initial
 */
export function createGameState(initial) {
  let state = { ...initial };
  const listeners = new Set();

  const reflect = () => {
    if (state.phase) document.documentElement.dataset.gamePhase = state.phase;
  };
  reflect();

  return {
    get: () => state,
    /** Mescla `patch` e avisa os assinantes só se algo mudou. */
    set(patch) {
      const next = { ...state, ...patch };
      if (Object.keys(patch).every((key) => Object.is(state[key], next[key]))) return;
      const prev = state;
      state = next;
      reflect();
      for (const listener of [...listeners]) listener(state, prev);
    },
    /** @returns {() => void} cancela a assinatura */
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    destroy() {
      listeners.clear();
      delete document.documentElement.dataset.gamePhase;
    },
  };
}
