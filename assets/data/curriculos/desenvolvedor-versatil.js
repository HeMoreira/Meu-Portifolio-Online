/* Currículo: Desenvolvedor Full Stack — só conteúdo. Marcadores [Exemplo] = substituir. */
import { PERFIL, contatos } from "../perfil.js";
import { criarAnos } from "../projetos.js";
import { criarCertificacoes } from "../certificacoes.js";
import { criarCompetencias } from "../competencias.js";

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
    // Só ids do catálogo (assets/data/competencias.js), na ordem de exibição.
    itens: criarCompetencias([
      "front-end",
      "back-end-e-apis",
      "bancos-de-dados",
      "entrega-e-deploy",
    ]),
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
    // Só ids do catálogo (assets/data/certificacoes.js), na ordem de exibição.
    itens: criarCertificacoes([
      "bancos-relacionais",
      "entrega-continua",
    ]),
  },
};
