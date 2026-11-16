/* ==========================================================================
   Plataformas — hitboxes dos blocos de mídia.

   Cada bloco ([data-media-role]) vira UMA plataforma: um retângulo em
   coordenadas do DOCUMENTO (x, y, width, height) calculado a partir da posição
   do bloco. O SVG nunca participa da colisão — só serve de referência de
   posição. Como as coordenadas são do documento (não da janela), rolar a página
   (câmera) não desalinha nada; só mudanças de layout exigem recalcular, e isso
   é automático (resize + ResizeObserver).

   Configuração (padrões em PLATFORM, config.js; por bloco via atributos):
     data-hitbox-top="-4"     topo da hitbox em relação ao topo do bloco (px)
     data-hitbox-inset="6"    recuo lateral de cada lado (px)
     data-hitbox-height="24"  espessura (px)

   A .media__layer[data-layer="interaction"] de cada bloco é dimensionada igual
   à hitbox (--hitbox-x/y/w/h) e recebe [data-hitbox], o que permite DEPURAR
   visualmente (?debug-hitboxes na URL, ou game.setDebug(true)). Ela continua com
   data-active="false" (sem capturar eventos).
   ========================================================================== */
import { PLATFORM } from "./config.js";

const num = (value, fallback) => {
  const n = Number.parseFloat(value);
  return Number.isFinite(n) ? n : fallback;
};

/** Retângulo do elemento em px do documento (sem zoom). */
function defaultRectOf(el) {
  const r = el.getBoundingClientRect();
  return { left: r.left + window.scrollX, top: r.top + window.scrollY, width: r.width, height: r.height };
}

/**
 * @param {{
 *   blocks: Array<{role: string, element: HTMLElement, layer: HTMLElement|null}>,
 *   emitter: ReturnType<import("./events.js").createEmitter>,
 *   rectOf?: (el: Element) => {left:number,top:number,width:number,height:number},
 * }} options  rectOf: retângulo de layout em px do documento (view.js desfaz o zoom visual)
 */
export function createPlatforms({ blocks, emitter, rectOf = defaultRectOf }) {
  const ac = new AbortController();
  const root = document.documentElement;

  /** Hitboxes, na ordem do documento (de cima para baixo). Os objetos são ATUALIZADOS no lugar. */
  const list = blocks.map((block, index) => ({
    id: `platform-${index}`,
    index,
    role: block.role,
    element: block.element,
    layer: block.layer,
    /** Luz de pouso no topo da imagem (media-blocks.js). */
    flash: () => block.flash?.(),
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  }));

  const api = {
    list,
    /** Base da última plataforma (px do documento): referência do limite inferior do jogo. */
    bottom: 0,
    measure() {
      for (const platform of list) {
        const rect = rectOf(platform.element);
        const { hitboxTop, hitboxInset, hitboxHeight } = platform.element.dataset;
        const top = num(hitboxTop, PLATFORM.top);
        const inset = num(hitboxInset, PLATFORM.inset);
        platform.height = num(hitboxHeight, PLATFORM.height);
        platform.x = rect.left + inset;
        platform.y = rect.top + top;
        platform.width = Math.max(0, rect.width - inset * 2);

        const layer = platform.layer;
        if (layer) {
          layer.dataset.hitbox = "";
          layer.style.setProperty("--hitbox-x", `${inset}px`);
          layer.style.setProperty("--hitbox-y", `${top}px`);
          layer.style.setProperty("--hitbox-w", `${platform.width}px`);
          layer.style.setProperty("--hitbox-h", `${platform.height}px`);
        }
      }
      api.bottom = list.reduce((max, p) => Math.max(max, p.y + p.height), 0);
      emitter.emit("platforms:change");
    },
    setDebug(on) {
      root.toggleAttribute("data-game-debug", Boolean(on));
    },
    destroy() {
      ac.abort();
      root.removeAttribute("data-game-debug");
      for (const { layer } of list) {
        if (!layer) continue;
        delete layer.dataset.hitbox;
        for (const prop of ["--hitbox-x", "--hitbox-y", "--hitbox-w", "--hitbox-h"]) layer.style.removeProperty(prop);
      }
    },
  };

  // Recalcula quando o layout muda (agrupa várias mudanças em um único quadro)
  let queued = 0;
  const schedule = () => {
    if (queued) return;
    queued = requestAnimationFrame(() => {
      queued = 0;
      api.measure();
    });
  };
  const observer = new ResizeObserver(schedule);
  observer.observe(document.body);
  for (const platform of list) observer.observe(platform.element);
  window.addEventListener("resize", schedule, { signal: ac.signal });
  document.fonts?.ready.then(schedule);
  ac.signal.addEventListener("abort", () => {
    observer.disconnect();
    cancelAnimationFrame(queued);
  });

  api.measure();
  return api;
}
