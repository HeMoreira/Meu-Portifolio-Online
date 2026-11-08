/* ==========================================================================
   Mídia 16:9 da página inicial (imagem ou vídeo).

   Estrutura:
     figure.media[data-media][data-side]
       div.media__content            ← a imagem/vídeo (recortada, com borda)
       div.media__layer[data-layer]  ← camada de interação RESERVADA, inativa.
                                       Cobre exatamente a mídia; é onde as
                                       hitboxes futuras serão inseridas.
   Imagens ficam em assets/images/inicio/, vídeos em assets/videos/inicio/.
   ========================================================================== */
import { h, assetUrl } from "../core.js";

/**
 * @param {{tipo?: "imagem"|"video", src: string, alt?: string, poster?: string, mime?: string}} midia
 * @param {{side: "left"|"right"}} options  lado da página em que a mídia aparece
 *        (define a variação da animação sutil, ver inicio.css)
 */
export function createMidia(midia, { side }) {
  const content =
    midia?.tipo === "video"
      ? h(
          "video",
          {
            controls: true,
            playsinline: true,
            preload: "metadata", // sem autoplay
            poster: midia.poster ? assetUrl("images", midia.poster) : null,
            "aria-label": midia.alt ?? "Vídeo ilustrativo",
          },
          h("source", { src: assetUrl("videos", midia.src), type: midia.mime }),
          "Seu navegador não suporta vídeo HTML5.",
        )
      : h("img", {
          src: assetUrl("images", midia?.src),
          alt: midia?.alt ?? "",
          width: 1280,
          height: 720,
          loading: "lazy",
          decoding: "async",
        });

  return h(
    "figure",
    { class: "media", "data-media": "", "data-side": side },
    h("div", { class: "media__content" }, content),
    h("div", {
      class: "media__layer",
      "data-layer": "interaction",
      "data-active": "false",
      "aria-hidden": "true",
    }),
  );
}
