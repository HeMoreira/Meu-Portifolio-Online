/* ==========================================================================
   Conteúdo da PÁGINA INICIAL — só dados. Marcadores [Seu Nome]/[Exemplo] = substituir.

   A ordem de `curriculos` define a ordem das seções e a alternância
   (mídia à esquerda / à direita). `slug` deve ser o nome de uma página existente.
   ========================================================================== */
import { PERFIL } from "./perfil.js";

const MIDIA_PADRAO = {
  tipo: "imagem",
  src: "inicio/placeholder-1x1.svg",
  alt: "",
};
const MIDIA_SUPORTE_TI = {
  tipo: "imagem",
  src: "inicio/suporte-ti_icon.jpg",
  alt: "",
};
const MIDIA_DESENVOLVIMENTO_FRONTEND = {
  tipo: "imagem",
  src: "inicio/desenvolvimento-frontend_icon.webp",
  alt: "",
};
const MIDIA_ENGENHARIA_IA = {
  tipo: "imagem",
  src: "inicio/engenharia-ia_icon.webp",
  alt: "",
};

export default {
  perfil: { ...PERFIL, funcao: "Portfólio profissional" },

  apresentacao: {
    titulo: "Henrique F. Moreira",
    paragrafos: [
      "Olá! Meu nome é Henrique Ferreira Moreira e tenho 18 anos. Sou um desenvolvedor curioso que começou pelo Minecraft em 2020, mas que hoje já desenvolve websites completos, jogos, entre muitos outros.",
      "Tenho conhecimentos diversos e estou disponível para trabalhar em diferentes cargos da área de TI, então sinta-se livre para explorar!",
    ],
    legendaFoto: "Contra o mundo",
  },

  curriculos: [
    {
      slug: "suporte-de-ti",
      titulo: "Suporte de TI",
      texto:
        "Formado como técnico de informática, tenho conhecimentos variados de hardware, software, infraestrutura, redes e segurança, o que me permite resolver uma variedade de problemas e encontrar soluções novas rapidamente.",
      botao: "Ver portfólio de Suporte de TI",
      midia: MIDIA_SUPORTE_TI,
    },
    {
      slug: "desenvolvedor-frontend",
      titulo: "Desenvolvedor Front-End",
      texto:
        "Já tendo desenvolvido uma série de websites completos, possuo amplo conhecimento de UI/UX, HTML5, CSS3, Javascript, Cores, princípios de design e acessibilidade, além de utilizar ferramentas de IA para aumentar a minha produtividade.",
      botao: "Ver portfólio de Front-End",
      midia: MIDIA_DESENVOLVIMENTO_FRONTEND,
    },
    {
      slug: "domador-de-ias",
      titulo: "Engenheiro de IA",
      texto:
        "Como uma boa bagagem em áreas como UI, UX, design, segurança, desenvolvimento de testes, lógica de programação e prompt engineering, sou capaz de trabalhar em stacks com as quais tenho pouca familiaridade sem grandes dificuldades, permitindo que eu me concentre na intenção enquanto LLMs escrevem o código.",
      botao: "Ver portfólio de Engenharia de IA",
      midia: MIDIA_ENGENHARIA_IA,
    },
  ],
};
