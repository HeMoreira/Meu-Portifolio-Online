/* ==========================================================================
   Renderização — gerenciador do laço de animação (requestAnimationFrame).

   O laço só existe enquanto há "sistemas" registrados e a aba está visível:
   com zero sistemas (etapa 1) NÃO há rAF nenhum, ou seja, custo zero.
   Etapa 2: física, animação de sprites e câmera entram como sistemas
   { update(dt, now) } via add(); nada neste arquivo precisa mudar.
   ========================================================================== */

const MAX_DT = 1 / 20; // limita saltos (aba em segundo plano, engasgos) a 50 ms

export function createRenderer() {
  /** @type {Set<{update: (dt: number, now: number) => void}>} */
  const systems = new Set();
  let frame = 0;
  let last = 0;
  let destroyed = false;

  const shouldRun = () => !destroyed && systems.size > 0 && !document.hidden;

  function tick(now) {
    frame = 0;
    if (!shouldRun()) return;
    const dt = Math.min((now - last) / 1000, MAX_DT);
    last = now;
    for (const system of systems) system.update(dt, now);
    frame = requestAnimationFrame(tick);
  }

  function sync() {
    if (shouldRun() && !frame) {
      last = performance.now();
      frame = requestAnimationFrame(tick);
    } else if (!shouldRun() && frame) {
      cancelAnimationFrame(frame);
      frame = 0;
    }
  }

  const onVisibility = () => sync();
  document.addEventListener("visibilitychange", onVisibility);

  return {
    add(system) {
      systems.add(system);
      sync();
      return () => this.remove(system);
    },
    remove(system) {
      systems.delete(system);
      sync();
    },
    get running() {
      return frame !== 0;
    },
    destroy() {
      destroyed = true;
      systems.clear();
      sync();
      document.removeEventListener("visibilitychange", onVisibility);
    },
  };
}
