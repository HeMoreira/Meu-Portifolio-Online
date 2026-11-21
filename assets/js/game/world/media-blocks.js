/* ==========================================================================
   Blocos de mídia do modo secreto.

   Transforma, de forma REVERSÍVEL, as mídias da página inicial em blocos SVG
   pixel art: cada [data-media] troca a imagem/vídeo por uma arte inline
   (a mídia original é guardada e devolvida em destroy()). As estruturas
   existentes são mantidas intactas e reaproveitadas:

     figure.media[data-media][data-media-role="platform"]        ← 3+ áreas de currículo
       div.media__content > svg.block-art--platform (orbe)
       div.media__layer[data-layer="interaction"]                ← hitboxes (etapa 2)

     div.egg__photo[data-media="foto"][data-media-role="intro"]  ← a foto do easter egg (1ª plataforma)
       div.egg__trigger > svg.block-art--intro
       div.game-intro[data-slot="intro"]                         ← NOVO: introdução
         span[data-slot="player-spawn"]                          ← ponto de saída do jogador real
         svg.game-intro__character + p.game-intro__prompt "Press Enter"
       div.media__layer[data-layer="interaction"]                ← hitboxes (etapa 2)

   Atributos: data-media-role ("intro"|"platform") e data-media-index (ordem de cima
   para baixo) em cada bloco. As hitboxes NÃO ficam aqui: platforms.js as calcula a
   partir destes blocos e as expõe na .media__layer de cada um.
   ========================================================================== */
import { h } from "../../core.js";
import { createBlockArt } from "./svg/block-art.js";
import { createCharacter } from "./svg/character.js";
import { LANDING_FLASH } from "../config.js";

/** Piscadas curtas (opacidade em degraus): luz de pouso no topo da imagem. */
const FLASH_KEYFRAMES = [{ opacity: 0 }, { opacity: 1 }, { opacity: 0.15 }, { opacity: 1 }, { opacity: 0 }];
const FLASH_REDUCED = [{ opacity: 0 }, { opacity: 0.8 }, { opacity: 0 }];

/** O elemento que contém a mídia a ser trocada, e a mídia em si. */
function findMedia(block) {
  const isIntro = block.dataset.media === "foto";
  const host = block.querySelector(isIntro ? ".egg__trigger" : ".media__content");
  const original = host?.querySelector(isIntro ? ".egg__img" : "img, video");
  return { isIntro, host, original };
}

function createIntro() {
  const character = createCharacter();
  const prompt = h("p", { class: "game-intro__prompt" }, "Press enter");
  return h(
    "div",
    { class: "game-intro", "data-slot": "intro", tabindex: "-1" },
    // âncora onde o personagem real surgirá (topo do bloco); vazia nesta etapa
    h("span", { class: "game-intro__spawn", "data-slot": "player-spawn" }),
    h("div", { class: "game-intro__stage" }, character, prompt),
  );
}

/**
 * @param {ParentNode} scope
 */
export function mountMediaBlocks(scope = document) {
  const blocks = [...scope.querySelectorAll("[data-media]")];
  /** @type {{block: Element, host: Element, original: Element, art: Element, extra: Element|null}[]} */
  const records = [];
  const result = { intro: null, platforms: [], all: [] };

  blocks.forEach((block, index) => {
    const { isIntro, host, original } = findMedia(block);
    if (!host || !original) return;

    const art = createBlockArt({ variant: isIntro ? "intro" : "platform", phase: index * 0.27 });
    original.replaceWith(art);

    block.dataset.mediaRole = isIntro ? "intro" : "platform";
    block.dataset.mediaIndex = String(index);

    // luz de pouso: faixa no topo da imagem (dentro da moldura do bloco)
    const flash = h("span", { class: "block-flash", "aria-hidden": "true" });
    (isIntro ? block : host).append(flash);

    let extra = null;
    const entry = {
      role: isIntro ? "intro" : "platform",
      element: block,
      art,
      layer: block.querySelector('.media__layer[data-layer="interaction"]'),
      /** Pisca a luz no topo da imagem (chamar só em pousos válidos). */
      flash() {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        flash.getAnimations().forEach((a) => a.cancel());
        flash.animate(reduce ? FLASH_REDUCED : FLASH_KEYFRAMES, { duration: LANDING_FLASH.duration, easing: "steps(1, end)" });
      },
    };

    if (isIntro) {
      extra = createIntro();
      // fora de .egg__trigger (que recorta): o personagem poderá sair do topo do bloco
      block.append(extra);
      entry.spawn = extra.querySelector('[data-slot="player-spawn"]');
      entry.focusTarget = extra;
      /** Encerra a introdução ilustrada: o personagem jogável a substitui. */
      entry.leave = () => {
        extra.dataset.state = "leaving";
      };
      /** Reinício: a introdução ilustrada volta (personagem + "Press Enter"). */
      entry.restore = () => {
        delete extra.dataset.state;
      };
      result.intro = entry;
    } else {
      result.platforms.push(entry);
    }
    result.all.push(entry);
    records.push({ block, host, original, art, extra, flash });
  });

  return {
    ...result,
    /** Devolve as mídias originais e remove tudo o que foi criado. */
    destroy() {
      for (const { block, original, art, extra, flash } of records) {
        art.replaceWith(original);
        extra?.remove();
        flash.getAnimations().forEach((a) => a.cancel());
        flash.remove();
        delete block.dataset.mediaRole;
        delete block.dataset.mediaIndex;
      }
      records.length = 0;
    },
  };
}
