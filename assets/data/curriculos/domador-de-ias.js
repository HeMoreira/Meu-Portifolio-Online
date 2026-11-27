/* Currículo: Domador de IAs — só conteúdo. Marcadores [Exemplo] = substituir. */
import { PERFIL, contatos } from "../perfil.js";
import { criarAnos } from "../projetos.js";
import { criarCertificacoes } from "../certificacoes.js";
import { criarCompetencias } from "../competencias.js";

export default {
  perfil: { ...PERFIL, funcao: "Engenheiro de IA" },

  sobre: {
    paragrafos: [
      "Estudante do 3º semestre da graduação em Análise e Desenvolvimento de Sistemas, sou formado como técnico em informática na Fundação Oswaldo Cruz e estou aberto a oportunidades como estagiário ou Júnior na área de Engenharia de IA.",
      "Possuo conhecimento variado na área de desenvolvimento, o que inclui Design de Interfaces; Conceitos de UI e UX; Tecnologias como HTML5, CSS3 e Javascript; Prompt Engineering e uso de LLMs no fluxo de trabalho; Versionamento de código e trabalho em equipe com Git/Github; Conhecimento em linguagens de programação como Python e C#; Aplicações de uso variado (Excel, Word, Powerpoint, Canva, etc.) e muito mais.",
      "Possuo ainda uma grande bagagem como desenvolvedor frontend, backend e suporte de TI, além de estar sempre disposto a usar meu repertório para aprender algo novo, fazendo de mim um profissional muito versátil e eficiente em minhas entregas.",
    ],
    links: contatos("email", "linkedin", "github"),
  },

  competencias: {
    intro: "Não sou apenas um Vibe Coder. Sei o que pedir porque conheço as ferramentas e o processo.",
    // Só ids do catálogo (assets/data/competencias.js), na ordem de exibição.
    itens: criarCompetencias([
      "ferramentas-modernas",
      "interfaces-responsivas",
      "prompt-engineering",
      "acessibilidade-domador-de-ias",
      "desenvolvimento-com-ia-domador-de-ias",
      "design-de-interfaces",
      "performance-e-qualidade",
      "devops-e-cultura-agil",
      "pesquisa-de-publico-domador-de-ias",
    ]),
  },

  projetos: {
    intro: "Sites completos desenvolvidos com foco em segurança, escalabilidade e design.",
    // Cada ano lista só os ids do catálogo (assets/data/projetos.js), na ordem de exibição.
    anos: criarAnos({
      2025: {
        itens: [
          "brawl-stars-brawler-picker-domador-de-ias",
        ],
      },
      2026: {
        itens: [
          "meu-portifolio-online-domador-de-ias",
          "imaginaria-imobiliaria-domador-de-ias",
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
      "ef-set-ingles",
      "cursa-excel",
    ]),
  },
};
