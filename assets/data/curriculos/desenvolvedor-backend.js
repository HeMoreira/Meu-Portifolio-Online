/* Currículo: Desenvolvedor Back-End — só conteúdo. Marcadores [Exemplo] = substituir. */
import { PERFIL, contatos } from "../perfil.js";
import { criarAnos } from "../projetos.js";

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
    itens: [
      {
        titulo: "APIs e serviços",
        descricao: "Projeto e implementação de APIs REST com validação, autenticação e documentação.",
        imagem: "competencias/servidor.svg",
        relacao: { tipo: "projeto", id: "api-de-pedidos" },
      },
      {
        titulo: "Bancos de dados",
        descricao: "Modelagem relacional, consultas eficientes, índices e migrações versionadas.",
        imagem: "competencias/banco-de-dados.svg",
        relacao: { tipo: "certificacao", id: "modelagem-de-dados" },
      },
      {
        titulo: "Infraestrutura e deploy",
        descricao: "Contêineres, variáveis de ambiente e pipelines de entrega automatizados.",
        imagem: "competencias/nuvem.svg",
        relacao: { tipo: "projeto", id: "servico-de-notificacoes" },
      },
      {
        titulo: "Testes e automação",
        descricao: "Testes automatizados e integração contínua para mudar o código com segurança.",
        imagem: "competencias/automacao.svg",
        relacao: { tipo: "certificacao", id: "testes-automatizados" },
      },
    ],
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
    itens: [
      {
        id: "modelagem-de-dados",
        titulo: "[Exemplo] Modelagem de dados e SQL",
        descricao: "Instituição, carga horária e ano de conclusão (substituir).",
        imagem: "certificacoes/placeholder.svg",
        imagemAlt: "Imagem ilustrativa de certificado (substituir)",
      },
      {
        id: "testes-automatizados",
        titulo: "[Exemplo] Testes automatizados e CI/CD",
        descricao: "Instituição, carga horária e ano de conclusão (substituir).",
        imagem: "certificacoes/placeholder.svg",
        imagemAlt: "Imagem ilustrativa de certificado (substituir)",
      },
    ],
  },
};
