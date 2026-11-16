/* ==========================================================================
   Câmera vertical — dirige a rolagem da página.

   O "mundo" é o próprio documento, então a câmera é o scrollTop. A cada quadro uma
   MOLA AMORTECIDA (posição + velocidade) a leva ao alvo "personagem a ~58% da altura
   da tela": ela acelera, freia ao chegar e, em quedas fortes, recebe um pequeno
   impulso (kick) que vira um bounce discreto. Só a rolagem muda — a física não sabe
   que a câmera existe. Limites:
     topo     0 — nunca acompanha para além do início da página;
     base     base da última plataforma + folga, sem passar do fim do documento
              → sem faixas vazias, e a primeira/última plataformas cabem na tela.
   Um pequeno "olhar à frente" (lookAhead) desloca o alvo conforme a velocidade
   vertical: ao cair, mostra mais do que vem abaixo; ao subir, o que vem acima.
   Usa behavior:"instant" porque o CSS do site tem scroll-behavior: smooth.
   ========================================================================== */
import { CAMERA } from "./config.js";

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

/**
 * @param {{getWorldBottom: () => number, config?: typeof CAMERA}} options
 */
export function createCamera({ getWorldBottom, config = CAMERA }) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  const ac = new AbortController();
  let y = window.scrollY;
  let vy = 0; // velocidade da câmera (px/s)
  let applied = Math.round(y);
  let minY = 0;
  let maxY = 0;

  function refresh() {
    const vh = window.innerHeight;
    // offsetHeight = altura de LAYOUT: o zoom (transform) não a altera, ao contrário de scrollHeight
    const docMax = Math.max(0, document.documentElement.offsetHeight - vh);
    const worldMax = getWorldBottom() + config.bottomPadding * vh - vh;
    maxY = Math.max(minY, Math.min(docMax, worldMax));
  }

  window.addEventListener("resize", refresh, { signal: ac.signal });
  refresh();

  return {
    get y() {
      return y;
    },
    get bounds() {
      return { min: minY, max: maxY };
    },
    refresh,
    /** Alvo da câmera para um ponto de interesse (centro do corpo) e sua velocidade vertical. */
    targetFor(focusY, vy = 0) {
      const vh = window.innerHeight;
      const look = clamp(vy * config.lookAhead, -config.lookAheadMax, config.lookAheadMax);
      return clamp(focusY - vh * config.anchor + look, minY, maxY);
    },
    /** @param {number} dt segundos */
    update(dt, focusY, focusVy = 0) {
      const target = this.targetFor(focusY, focusVy);
      // movimento reduzido: sem ultrapassar (amortecimento crítico) e mais firme
      const w = config.frequency * (reduce.matches ? 1.6 : 1);
      const zeta = reduce.matches ? 1 : config.damping;
      vy += (w * w * (target - y) - 2 * zeta * w * vy) * dt;
      vy = clamp(vy, -config.maxSpeed, config.maxSpeed);
      y += vy * dt;
      if (Math.abs(target - y) < 0.05 && Math.abs(vy) < 1) {
        y = target;
        vy = 0;
      }
      if (y <= minY || y >= maxY) {
        y = clamp(y, minY, maxY);
        vy = 0; // encostou num limite: nada de atravessar o topo/fim do mapa
      }
      const next = Math.round(y);
      if (next !== applied) {
        applied = next;
        window.scrollTo({ left: window.scrollX, top: next, behavior: "instant" });
      }
    },
    /** Bounce de pouso: empurra a câmera para baixo conforme a velocidade do impacto. */
    kick(speed) {
      const k = config.landKick;
      if (reduce.matches || speed < k.minSpeed) return;
      vy += Math.min((speed - k.minSpeed) * k.scale + 40, k.max);
    },
    /** Posiciona a câmera diretamente em `value` (reinício). */
    setY(value) {
      y = clamp(value, minY, maxY);
      vy = 0;
      applied = Math.round(y);
      window.scrollTo({ left: window.scrollX, top: applied, behavior: "instant" });
    },
    /** Salta direto (sem interpolar). */
    snap(focusY) {
      y = this.targetFor(focusY);
      vy = 0;
      applied = Math.round(y);
      window.scrollTo({ left: window.scrollX, top: applied, behavior: "instant" });
    },
    destroy() {
      ac.abort();
    },
  };
}
