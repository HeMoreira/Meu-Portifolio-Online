/* ==========================================================================
   Carregamento — TODO recurso exclusivo do jogo entra por aqui, e só aqui.

   É chamado durante o 3º pulso (tela de carregamento). Nada listado no
   MANIFEST é requisitado antes da ativação do modo secreto.

   Etapas seguintes: novos módulos/imagens (inimigos, sprites) entram no MANIFEST;
   o restante do fluxo não muda.
   ========================================================================== */

import { ENEMIES, SPRITESHEET } from "./config.js";

/** Raiz de /assets/ (a partir deste arquivo): funciona em qualquer subcaminho. */
const ASSETS = new URL("../../", import.meta.url);

export const MANIFEST = {
  /** Estilos do modo secreto (a ordem do DOM = ordem da cascata). */
  styles: ["css/game/pixel-ui.css", "css/game/media-blocks.css", "css/game/hud.css", "css/game/player.css", "css/game/combat.css"],
  /** Fontes que precisam estar prontas antes de revelar (já declaradas em easter-egg.css). */
  fonts: ['16px "Press Start 2P"', '12px "Press Start 2P"'],
  /** Módulos JS exclusivos do jogo, carregados em paralelo com import(). */
  modules: {
    linksLock: () => import("./ui/links-lock.js"),
    hud: () => import("./ui/hud.js"),
    mediaBlocks: () => import("./world/media-blocks.js"),
    platforms: () => import("./platforms.js"),
    physics: () => import("./physics.js"),
    input: () => import("./input.js"),
    camera: () => import("./camera.js"),
    player: () => import("./player.js"), // importa o animador
    popup: () => import("./ui/popup.js"),
    lives: () => import("./ui/lives.js"),
    enemies: () => import("./enemies.js"),
    fx: () => import("./fx.js"),
    endzone: () => import("./endzone.js"),
    match: () => import("./match.js"),
    endModal: () => import("./ui/end-modal.js"),
    view: () => import("./view.js"),
  },
  /** Imagens a pré-carregar. images[0] = personagem; images[1..] = inimigos (ENEMIES.sheets). 32×32 por quadro. */
  images: [SPRITESHEET.src, ...ENEMIES.sheets],
};

function loadStylesheet(href, signal) {
  return new Promise((resolve, reject) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = new URL(href, ASSETS).href;
    link.dataset.gameStyle = "";
    link.onload = () => resolve(link);
    link.onerror = () => reject(new Error(`Falha ao carregar ${href}`));
    signal?.addEventListener("abort", () => link.remove(), { once: true });
    document.head.append(link); // anexa já: a ordem de inserção define a cascata
  });
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Falha ao carregar ${src}`));
    img.src = new URL(src, ASSETS).href;
  });
}

/**
 * @param {{signal?: AbortSignal}} [options]
 * @returns {Promise<{modules: Record<string, any>, images: HTMLImageElement[], unload: () => void}>}
 */
export async function loadResources({ signal } = {}) {
  const links = [];
  const unload = () => {
    for (const link of links) link.remove();
    links.length = 0;
  };

  try {
    const names = Object.keys(MANIFEST.modules);
    const [styleLinks, moduleList, images] = await Promise.all([
      Promise.all(MANIFEST.styles.map((href) => loadStylesheet(href, signal))),
      Promise.all(names.map((name) => MANIFEST.modules[name]())),
      Promise.all(MANIFEST.images.map(loadImage)),
      Promise.all(MANIFEST.fonts.map((font) => document.fonts?.load(font))),
    ]);
    links.push(...styleLinks);
    signal?.throwIfAborted();
    return { modules: Object.fromEntries(names.map((name, i) => [name, moduleList[i]])), images, unload };
  } catch (error) {
    for (const link of document.querySelectorAll("link[data-game-style]")) link.remove();
    throw error;
  }
}
