/* Currículo: Desenvolvedor Full Stack — só conteúdo. Marcadores [Exemplo] = substituir. */
import { PERFIL, contatos } from "../perfil.js";
import { criarAnos } from "../projetos.js";

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
    // Cada ano lista só os ids do catálogo (assets/data/projetos.js), na ordem de exibição.
    anos: criarAnos({
      2025: {
        itens: [
          "plataforma-de-tarefas",
        ],
      },
      2026: {
        itens: [
          "painel-administrativo",
        ],
      },
    }),
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
