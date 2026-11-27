/* Currículo: Desenvolvedor Back-End — só conteúdo. Marcadores [Exemplo] = substituir. */
import { PERFIL, contatos } from "../perfil.js";
import { criarAnos } from "../projetos.js";
import { criarCertificacoes } from "../certificacoes.js";
import { criarCompetencias } from "../competencias.js";

export default {
  perfil: { ...PERFIL, funcao: "Desenvolvedor Back-End" },

  sobre: {
    paragrafos: [
      "Esta rota ainda não foi implementada. As informações presentes nessa página são genéricas e não representam experiências reais.",
    ],
    links: contatos("email", "github", "linkedin"),
  },

  competencias: {
    intro: "Do contrato da API à infraestrutura que a sustenta.",
    // Só ids do catálogo (assets/data/competencias.js), na ordem de exibição.
    itens: criarCompetencias([
      "apis-e-servicos",
      "bancos-de-dados-backend",
      "infraestrutura-e-deploy",
      "testes-e-automacao",
    ]),
  },

  projetos: {
    intro: "Serviços construídos para serem testáveis, seguros e fáceis de operar.",
    // Cada ano lista só os ids do catálogo (assets/data/projetos.js), na ordem de exibição.
    anos: criarAnos({
      2025: {
        itens: [
          "api-de-pedidos",
        ],
      },
      2026: {
        itens: [
          "servico-de-notificacoes",
        ],
      },
    }),
  },

  certificacoes: {
    intro: "Cursos e certificados na área de back-end.",
    // Só ids do catálogo (assets/data/certificacoes.js), na ordem de exibição.
    itens: criarCertificacoes([
      "modelagem-de-dados",
      "testes-automatizados",
    ]),
  },
};
