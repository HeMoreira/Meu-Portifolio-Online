/* ==========================================================================
   home-page.js — ponto de entrada da página inicial (/index.html).

   Usa o mesmo shell, header, rodapé, tema e botões das páginas de currículo.
   O conteúdo vem de assets/data/inicio.js. O easter egg é um módulo à parte
   (assets/js/easter-egg/) e só é conectado aqui, em UMA linha.
   ========================================================================== */
import { h } from "./core.js";
import { HOME_SECTIONS } from "./config.js";
import { mountPage } from "./page-shell.js";
import { createApresentacao, createAreaCurriculo } from "./components/inicio.js";
import { initEasterEggs } from "./easter-egg/index.js";
import data from "../data/inicio.js";

const main = h(
  "main",
  { id: "conteudo" },
  createApresentacao(data.apresentacao, data.perfil),
  h(
    "div",
    { class: "sections-group", id: "curriculos" },
    ...data.curriculos.map(createAreaCurriculo),
  ),
);

mountPage({ perfil: data.perfil, main, sections: HOME_SECTIONS });

initEasterEggs(main);
