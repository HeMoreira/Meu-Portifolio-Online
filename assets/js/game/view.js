/* ==========================================================================
   Vista — camada VISUAL independente da física: zoom direcional.

   Quando o personagem anda, tudo (conteúdo, blocos, personagem, inimigos) se
   aproxima um pouco na direção do movimento e volta ao normal ao parar. É só um
   `transform: scale()` aplicado às camadas do mundo (`layers`): a física, as
   hitboxes e as colisões nunca veem o zoom, que não altera nenhum tamanho lógico.

   COORDENADAS
     • Física/jogo: px do DOCUMENTO sem zoom (o que platforms.js/physics.js usam).
     • project(x, y): documento → tela (aplica o zoom). Usado pelo fx.js (canvas fixo).
     • rectOf(el): retângulo de LAYOUT do elemento em px do documento, com o zoom
       desfeito — as medições (plataformas, rodapé, orbes) continuam exatas mesmo se
       forem feitas no meio do efeito.
   O centro do zoom é o próprio personagem, deslocado `ahead` px no sentido do
   movimento: o personagem não "escorrega" na tela e o que está à frente cresce.

   Só escreve no DOM enquanto o efeito está ativo (amount > 0); ao voltar a 1 o
   transform é removido (sem camada de composição sobrando). Com movimento reduzido
   o zoom fica desligado.
   ========================================================================== */
import { ZOOM } from "./config.js";

const EPS = 0.00005;

/**
 * @param {{layers: HTMLElement[]}} options  elementos escalados (todos com a mesma origem)
 */
export function createView({ layers }) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  let amount = 0; // 0…1 (intensidade do efeito)
  let dir = 0; // −1…1 (sentido suavizado)
  let z = 1;
  let ox = 0;
  let oy = 0;
  let active = false;
  /** Canto superior esquerdo (px do documento) de cada camada, medido quando o efeito começa. */
  const corners = new Map();

  /**
   * Com `transform-origin: 0 0` a origem é o canto da PRÓPRIA camada, não o do documento:
   * a translação é (origem do zoom − canto) × (1 − z) para o mapeamento ser o mesmo em todas.
   */
  const setTransform = (on) => {
    for (const el of layers) {
      if (!on) {
        el.style.transform = "";
        el.style.transformOrigin = "";
        continue;
      }
      const c = corners.get(el);
      el.style.transformOrigin = "0 0";
      el.style.transform = `translate(${((ox - c.x) * (1 - z)).toFixed(2)}px, ${((oy - c.y) * (1 - z)).toFixed(2)}px) scale(${z.toFixed(5)})`;
    }
  };

  function measureCorners() {
    for (const el of layers) {
      const r = el.getBoundingClientRect(); // sem transform: o efeito ainda não começou
      corners.set(el, { x: r.left + window.scrollX, y: r.top + window.scrollY });
    }
  }

  function clear() {
    if (!active) return;
    active = false;
    z = 1;
    setTransform(false);
  }

  const api = {
    get zoom() {
      return z;
    },
    /**
     * @param {number} dt segundos
     * @param {number} axis −1/0/1: sentido que o jogador está comandando
     * @param {{x:number,y:number}} focus centro do personagem (px do documento)
     */
    update(dt, axis, focus) {
      const target = !reduce.matches && axis !== 0 ? 1 : 0;
      const rate = target > amount ? ZOOM.rise : ZOOM.fall;
      amount += (target - amount) * (1 - Math.exp(-rate * dt));
      if (axis !== 0) dir += (axis - dir) * (1 - Math.exp(-ZOOM.turn * dt));
      // curva suave (ease-in-out) sobre a intensidade para um começo e um fim sem "quina"
      const e = amount * amount * (3 - 2 * amount);
      if (target === 0 && ZOOM.max * e < EPS) {
        amount = 0; // abaixo de ~0,005 % de ampliação: invisível — remove o transform
        clear();
        return;
      }
      z = 1 + ZOOM.max * e;
      ox = focus.x + dir * ZOOM.ahead;
      oy = focus.y;
      if (!active) measureCorners();
      active = true;
      setTransform(true);
    },
    /** Documento → tela (com zoom). Escreve em `out` para não alocar por quadro. */
    project(x, y, out = { x: 0, y: 0 }) {
      out.x = ox + (x - ox) * z - window.scrollX;
      out.y = oy + (y - oy) * z - window.scrollY;
      return out;
    },
    /** Retângulo de layout (sem zoom) em px do documento. */
    rectOf(el) {
      const r = el.getBoundingClientRect();
      const left = r.left + window.scrollX;
      const top = r.top + window.scrollY;
      if (z === 1) return { left, top, width: r.width, height: r.height };
      return {
        left: ox + (left - ox) / z,
        top: oy + (top - oy) / z,
        width: r.width / z,
        height: r.height / z,
      };
    },
    /** Inclui mais uma camada no zoom (criada depois do view). */
    addLayer(el) {
      layers.push(el);
    },
    /** Zera o efeito (reinício / fim de jogo). */
    reset() {
      amount = 0;
      dir = 0;
      clear();
    },
    destroy() {
      amount = 0;
      clear();
    },
  };
  return api;
}
