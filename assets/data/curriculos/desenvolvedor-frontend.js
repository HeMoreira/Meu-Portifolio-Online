/* Currículo: Desenvolvedor Front-End — só conteúdo. Marcadores [Exemplo] = substituir. */
import { PERFIL, contatos } from "../perfil.js";
import { criarAnos } from "../projetos.js";
import { criarCertificacoes } from "../certificacoes.js";
import { criarCompetencias } from "../competencias.js";

export default {
  perfil: { ...PERFIL, funcao: "Desenvolvedor Front-End" },

  sobre: {
    paragrafos: [
      "Estudante do 3º semestre da graduação em Análise e Desenvolvimento de Sistemas, sou formado como técnico em informática na Fundação Oswaldo Cruz e estou aberto a oportunidades como estagiário ou Júnior na área de Desenvolvimento Front-End",
      "Possuo conhecimento variado na área de desenvolvimento, o que inclui Design de Interfaces; Conceitos de UI e UX; Tecnologias como HTML5, CSS3 e Javascript; Prompt Engineering e uso de LLMs no fluxo de trabalho; Versionamento de código e trabalho em equipe com Git/Github; Conhecimento em linguagens de programação como Python e C#; Aplicações de uso variado (Excel, Word, Powerpoint, Canva, etc.) e muito mais.",
      "Possuo ainda uma grande bagagem como operador de agentes de IA generativa e suporte de TI, além de estar sempre disposto a usar meu repertório para aprender algo novo, fazendo de mim um profissional muito versátil e eficiente em minhas entregas.",
    ],
    links: contatos("email", "linkedin", "github"),
  },

  competencias: {
    intro: "Competências relacionadas ao meu trabalho como desenvolvedor front-end.",
    // Só ids do catálogo (assets/data/competencias.js), na ordem de exibição.
    itens: criarCompetencias([
      "ferramentas-modernas",
      "interfaces-responsivas",
      "javascript-moderno",
      "acessibilidade",
      "desenvolvimento-com-ia",
      "design-de-interfaces",
      "performance-e-qualidade",
      "devops-e-cultura-agil",
      "pesquisa-de-publico",
    ]),
  },

  projetos: {
    intro: "Interfaces construídas com atenção a detalhes e a quem as usa.",
    // Cada ano lista só os ids do catálogo (assets/data/projetos.js), na ordem de exibição.
    anos: criarAnos({
      2025: {
        itens: [
          "brawl-stars-brawler-picker",
        ],
      },
      2026: {
        itens: [
          "imaginaria-imobiliaria",
          "meu-portifolio-online",
        ],
      },
    }),
  },

  certificacoes: {
    intro: "Formações e certificados relevantes para a área.",
    // Só ids do catálogo (assets/data/certificacoes.js), na ordem de exibição.
    itens: criarCertificacoes([
      "fundamentos-de-ti",
      "tecnico-de-informatica",
      "devops-e-agile-culture",
      "agentes-autonomos",
      "ef-set-ingles",
      "cursa-excel",
    ]),
  },
};
