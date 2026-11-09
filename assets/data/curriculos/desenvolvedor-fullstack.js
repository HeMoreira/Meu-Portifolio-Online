/* Currículo: Desenvolvedor Full Stack — só conteúdo. Marcadores [Exemplo] = substituir. */
import { PERFIL, contatos } from "../perfil.js";

export default {
  perfil: { ...PERFIL, funcao: "Desenvolvedor Full Stack" },

  sobre: {
    paragrafos: [
      "Esta rota ainda não foi implementada. As informações presentes nessa página são genéricas e não representam experiências reais.",
    ],
    links: contatos("email", "github", "linkedin"),
  },

  competencias: {
    intro: "Visão do produto inteiro, da tela ao servidor.",
    itens: [
      {
        titulo: "Front-end",
        descricao: "Interfaces responsivas e acessíveis, integradas a APIs com tratamento de estados e erros.",
        imagem: "competencias/interface.svg",
        relacao: { tipo: "projeto", id: "painel-administrativo" },
      },
      {
        titulo: "Back-end e APIs",
        descricao: "Serviços com autenticação, regras de negócio claras e contratos bem documentados.",
        imagem: "competencias/servidor.svg",
        relacao: { tipo: "projeto", id: "plataforma-de-tarefas" },
      },
      {
        titulo: "Bancos de dados",
        descricao: "Modelagem relacional, consultas e migrações para sustentar o produto.",
        imagem: "competencias/banco-de-dados.svg",
        relacao: { tipo: "certificacao", id: "bancos-relacionais" },
      },
      {
        titulo: "Entrega e deploy",
        descricao: "Publicação automatizada e monitoramento básico para manter o produto no ar.",
        imagem: "competencias/nuvem.svg",
        relacao: { tipo: "certificacao", id: "entrega-continua" },
      },
    ],
  },

  projetos: {
    intro: "Aplicações completas, do banco de dados à interface.",
    itens: [
      {
        id: "plataforma-de-tarefas",
        titulo: "[Exemplo] Plataforma de gestão de tarefas",
        descricao:
          "Aplicação web para organizar tarefas em equipe, com quadros, prazos e notificações. Inclui autenticação, API própria e interface responsiva, cobrindo todo o ciclo de desenvolvimento.",
        repositorio: null, // PLACEHOLDER: URL do repositório
        media: { tipo: "imagem", src: "projetos/placeholder.svg", alt: "Imagem ilustrativa do projeto (substituir)" },
        metricas: [
          { rotulo: "Front-end", valor: 90 },
          { rotulo: "Back-end", valor: 88 },
          { rotulo: "Banco de dados", valor: 85 },
          { rotulo: "Deploy", valor: 75 },
        ],
        detalhes: {
          resumo: "Descrição complementar do projeto (substituir): arquitetura geral e principais decisões.",
          etapas: [
            { titulo: "Requisitos", descricao: "Histórias de usuário e escopo da primeira versão." },
            { titulo: "Modelagem e API", descricao: "Banco de dados e contratos entre front e back." },
            { titulo: "Interface", descricao: "Telas, estados e integração com a API." },
            { titulo: "Publicação", descricao: "Pipeline de deploy e monitoramento." },
          ],
          tecnologias: ["JavaScript", "Node.js", "SQL", "HTML5", "CSS3", "Docker"],
        },
      },
      {
        id: "painel-administrativo",
        titulo: "[Exemplo] Painel administrativo com relatórios",
        descricao:
          "Painel com autenticação por perfis, tabelas filtráveis e exportação de relatórios, integrado a uma API de dados.",
        repositorio: null, // PLACEHOLDER
        media: { tipo: "imagem", src: "projetos/placeholder.svg", alt: "Imagem ilustrativa do projeto (substituir)" },
        metricas: [
          { rotulo: "Usabilidade", valor: 88 },
          { rotulo: "Cobertura de testes", valor: 68 },
          { rotulo: "Desempenho das consultas", valor: 82 },
          { rotulo: "Acessibilidade", valor: 92 },
        ],
        detalhes: {
          resumo: "Descrição complementar do projeto (substituir).",
          etapas: ["Perfis e permissões", "Tabelas e filtros", "Relatórios"],
          tecnologias: ["JavaScript", "REST", "SQL", "Acessibilidade"],
        },
      },
    ],
  },

  certificacoes: {
    intro: "Cursos e certificados que sustentam o perfil full stack.",
    itens: [
      {
        id: "bancos-relacionais",
        titulo: "[Exemplo] Bancos de dados relacionais",
        descricao: "Instituição, carga horária e ano de conclusão (substituir).",
        imagem: "certificacoes/placeholder.svg",
        imagemAlt: "Imagem ilustrativa de certificado (substituir)",
      },
      {
        id: "entrega-continua",
        titulo: "[Exemplo] Entrega contínua e DevOps básico",
        descricao: "Instituição, carga horária e ano de conclusão (substituir).",
        imagem: "certificacoes/placeholder.svg",
        imagemAlt: "Imagem ilustrativa de certificado (substituir)",
      },
    ],
  },
};
