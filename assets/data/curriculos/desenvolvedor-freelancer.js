/* Currículo: Desenvolvedor Freelancer — só conteúdo. Marcadores [Exemplo] = substituir. */
import { PERFIL, contatos } from "../perfil.js";

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
    itens: [
      {
        id: "site-institucional",
        titulo: "[Exemplo] Site institucional para pequeno negócio",
        descricao:
          "Site rápido e responsivo com apresentação dos serviços, galeria e formulário de contato, entregue com orientação para o cliente atualizar o conteúdo sozinho.",
        repositorio: null, // PLACEHOLDER: URL do repositório (ou deixe null se for privado)
        media: { tipo: "imagem", src: "projetos/placeholder.svg", alt: "Imagem ilustrativa do projeto (substituir)" },
        metricas: [
          { rotulo: "Entrega no prazo", valor: 100 },
          { rotulo: "Satisfação do cliente", valor: 95 },
          { rotulo: "Desempenho", valor: 92 },
          { rotulo: "SEO básico", valor: 88 },
        ],
        detalhes: {
          resumo: "Descrição complementar do projeto (substituir): briefing, desafios e resultado para o cliente.",
          etapas: [
            { titulo: "Briefing", descricao: "Objetivos, público e conteúdo disponível." },
            { titulo: "Layout", descricao: "Proposta visual validada com o cliente." },
            { titulo: "Desenvolvimento", descricao: "Implementação responsiva e testes em dispositivos reais." },
            { titulo: "Publicação e treinamento", descricao: "Hospedagem, domínio e manual de uso." },
          ],
          tecnologias: ["HTML5", "CSS3", "JavaScript", "SEO", "Hospedagem"],
        },
      },
      {
        id: "sistema-de-agendamento",
        titulo: "[Exemplo] Sistema de agendamento online",
        descricao:
          "Aplicação para um prestador de serviços receber agendamentos, evitar conflitos de horário e enviar lembretes aos clientes.",
        repositorio: null, // PLACEHOLDER
        media: { tipo: "imagem", src: "projetos/placeholder.svg", alt: "Imagem ilustrativa do projeto (substituir)" },
        metricas: [
          { rotulo: "Escopo entregue", valor: 90 },
          { rotulo: "Estabilidade", valor: 85 },
          { rotulo: "Facilidade de uso", valor: 93 },
          { rotulo: "Documentação", valor: 75 },
        ],
        detalhes: {
          resumo: "Descrição complementar do projeto (substituir).",
          etapas: ["Levantamento de regras", "Protótipo", "Desenvolvimento", "Entrega e suporte"],
          tecnologias: ["JavaScript", "Node.js", "SQL", "E-mail transacional"],
        },
      },
    ],
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
