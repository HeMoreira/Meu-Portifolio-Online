/* ==========================================================================
   Reconhecedor de sequência — lógica PURA (sem DOM, sem timers), testável.

   push(dir):
     - entrada correta  → avança (progress) ou conclui (complete)
     - entrada incorreta → a sequência em andamento é descartada na hora (reset);
       se a entrada errada for, ela mesma, o início da sequência, já conta como
       o primeiro passo de uma nova tentativa.
   Não depende de tempo nem de animações, então cliques rápidos ou animações
   interrompidas não podem deixá-lo em estado inconsistente.
   ========================================================================== */

/** @param {readonly string[]} expected */
export function createSequenceMatcher(expected) {
  let progress = 0;

  return {
    /** @returns {{status: "progress"|"reset"|"complete", progress: number}} */
    push(dir) {
      if (dir === expected[progress]) {
        progress += 1;
        if (progress === expected.length) {
          progress = 0;
          return { status: "complete", progress: expected.length };
        }
        return { status: "progress", progress };
      }
      progress = dir === expected[0] ? 1 : 0;
      return { status: "reset", progress };
    },
    reset() {
      progress = 0;
    },
    get progress() {
      return progress;
    },
  };
}
