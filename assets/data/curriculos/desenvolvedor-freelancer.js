/* Currículo: Desenvolvedor Freelancer — só conteúdo. Marcadores [Exemplo] = substituir. */
import { PERFIL, contatos } from "../perfil.js";
import { criarAnos } from "../projetos.js";

export default {
  perfil: { ...PERFIL, funcao: "Desenvolvedor Freelancer" },

  sobre: {
    paragrafos: [
      "Esta rota ainda não foi implementada. As informações presentes nessa página são genéricas e não representam experiências reais.",
    ],
    links: contatos("email", "github", "linkedin"),
  },

  competencias: {
    intro: "Habilidades técnicas e de relacionamento com o cliente.",
    itens: [
      {
        titulo: "Comunicação com clientes",
        descricao: "Alinhamento de expectativas, acompanhamento frequente e linguagem sem jargões.",
        imagem: "competencias/comunicacao.svg",
        // Sem relacao: ainda não há projeto ou certificado associado (botão indisponível)
      },
      {
        titulo: "Gestão de prazos",
        descricao: "Escopo dividido em entregas menores, com estimativas honestas e prioridades claras.",
        imagem: "competencias/tempo.svg",
        relacao: { tipo: "projeto", id: "sistema-de-agendamento" },
      },
      {
        titulo: "Entrega de ponta a ponta",
        descricao: "Da identidade visual e do código à publicação e ao suporte pós-entrega.",
        imagem: "competencias/codigo.svg",
        relacao: { tipo: "projeto", id: "site-institucional" },
      },
      {
        titulo: "Documentação e repasse",
        descricao: "Manuais e orientações para que o cliente consiga operar o que recebeu.",
        imagem: "competencias/documentacao.svg",
        relacao: { tipo: "certificacao", id: "gestao-de-projetos" },
      },
    ],
  },

  projetos: {
    intro: "Trabalhos entregues para clientes, do briefing à publicação.",
    // Cada ano lista só os ids do catálogo (assets/data/projetos.js), na ordem de exibição.
    anos: criarAnos({
      2025: {
        itens: [
          "site-institucional",
        ],
      },
      2026: {
        itens: [
          "sistema-de-agendamento",
        ],
      },
    }),
  },

  certificacoes: {
    intro: "Cursos e certificados que complementam o trabalho independente.",
    itens: [
      {
        id: "gestao-de-projetos",
        titulo: "[Exemplo] Gestão de projetos",
        descricao: "Instituição, carga horária e ano de conclusão (substituir).",
        imagem: "certificacoes/placeholder.svg",
        imagemAlt: "Imagem ilustrativa de certificado (substituir)",
      },
      {
        id: "ux-basico",
        titulo: "[Exemplo] Fundamentos de UX",
        descricao: "Instituição, carga horária e ano de conclusão (substituir).",
        imagem: "certificacoes/placeholder.svg",
        imagemAlt: "Imagem ilustrativa de certificado (substituir)",
      },
    ],
  },
};
