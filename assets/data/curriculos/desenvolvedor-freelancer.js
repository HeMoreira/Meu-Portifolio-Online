/* Currículo: Desenvolvedor Freelancer — só conteúdo. Marcadores [Exemplo] = substituir. */
import { PERFIL, contatos } from "../perfil.js";
import { criarAnos } from "../projetos.js";
import { criarCertificacoes } from "../certificacoes.js";
import { criarCompetencias } from "../competencias.js";

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
    // Só ids do catálogo (assets/data/competencias.js), na ordem de exibição.
    itens: criarCompetencias([
      "comunicacao-com-clientes",
      "gestao-de-prazos",
      "entrega-de-ponta-a-ponta",
      "documentacao-e-repasse",
    ]),
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
    // Só ids do catálogo (assets/data/certificacoes.js), na ordem de exibição.
    itens: criarCertificacoes([
      "gestao-de-projetos",
      "ux-basico",
    ]),
  },
};
