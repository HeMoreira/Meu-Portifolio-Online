/* ==========================================================================
   Conteúdo da PÁGINA INICIAL — só dados. Marcadores [Seu Nome]/[Exemplo] = substituir.

   Mídias de cada área (16:9):
     imagem → { tipo: "imagem", src: "inicio/arquivo.webp", alt: "…" }   (assets/images/inicio/)
     vídeo  → { tipo: "video",  src: "inicio/arquivo.mp4", mime: "video/mp4",
                poster: "inicio/capa.webp", alt: "…" }                    (assets/videos/inicio/)
   A ordem de `curriculos` define a ordem das seções e a alternância
   (mídia à esquerda / à direita). `slug` deve ser o nome de uma página existente.
   ========================================================================== */
import { PERFIL } from "./perfil.js";

const MIDIA_PADRAO = {
  tipo: "imagem",
  src: "inicio/placeholder-1x1.svg", // PLACEHOLDER: substituir por mídia real
  alt: "Imagem ilustrativa da área (substituir)",
};

export default {
  perfil: { ...PERFIL, funcao: "Portfólio profissional" },

  apresentacao: {
    titulo: "Olá, eu sou [Seu Nome]",
    paragrafos: [
      "Texto de apresentação pessoal (substituir): quem você é, o que faz e o que move seu trabalho. Este portfólio reúne as áreas em que atuo, cada uma com seu próprio currículo.",
    ],
    legendaFoto: "Contra o mundo",
  },

  curriculos: [
    {
      slug: "suporte-de-ti",
      titulo: "Suporte de TI",
      texto:
        "Atendimento, diagnóstico e resolução de incidentes, com foco em redes, sistemas e documentação que evita problemas repetidos.",
      botao: "Ver currículo de Suporte",
      midia: MIDIA_PADRAO,
    },
    {
      slug: "desenvolvedor-frontend",
      titulo: "Desenvolvedor Front-End",
      texto:
        "Interfaces responsivas, acessíveis e rápidas, construídas com HTML semântico, CSS organizado e JavaScript sem excessos.",
      botao: "Ver currículo Front-End",
      midia: MIDIA_PADRAO,
    },
    {
      slug: "desenvolvedor-backend",
      titulo: "Desenvolvedor Back-End",
      texto:
        "APIs e serviços confiáveis, com modelagem de dados cuidadosa, testes automatizados e deploys previsíveis.",
      botao: "Ver currículo Back-End",
      midia: MIDIA_PADRAO,
    },
    {
      slug: "desenvolvedor-fullstack",
      titulo: "Desenvolvedor Full Stack",
      texto:
        "Funcionalidades completas, da interface ao banco de dados, entendendo como cada camada afeta as outras.",
      botao: "Ver currículo Full Stack",
      midia: MIDIA_PADRAO,
    },
    {
      slug: "desenvolvedor-freelancer",
      titulo: "Desenvolvedor Freelancer",
      texto:
        "Sites e sistemas sob medida, do briefing à entrega, com comunicação transparente e prazos realistas.",
      botao: "Ver currículo Freelancer",
      midia: MIDIA_PADRAO,
    },
    {
      slug: "domador-de-ias",
      titulo: "Domador de IAs",
      texto:
        "Prompts, automações e integrações com inteligência artificial generativa, sempre com avaliação e uso responsável.",
      botao: "Ver currículo de IAs",
      midia: MIDIA_PADRAO,
    },
  ],
};
