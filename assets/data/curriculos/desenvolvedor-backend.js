/* Currículo: Desenvolvedor Back-End — só conteúdo. Marcadores [Exemplo] = substituir. */
import { PERFIL, contatos } from "../perfil.js";

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
    itens: [
      {
        id: "api-de-pedidos",
        titulo: "[Exemplo] API de pedidos",
        descricao:
          "API REST para cadastro e acompanhamento de pedidos, com autenticação, paginação, validação de entrada e documentação dos endpoints, projetada para ser consumida por aplicações web e móveis.",
        repositorio: null, // PLACEHOLDER: URL do repositório
        media: { tipo: "imagem", src: "projetos/placeholder.svg", alt: "Imagem ilustrativa do projeto (substituir)" },
        metricas: [
          { rotulo: "Cobertura de testes", valor: 85 },
          { rotulo: "Endpoints documentados", valor: 100 },
          { rotulo: "Segurança", valor: 90 },
          { rotulo: "Desempenho", valor: 80 },
        ],
        detalhes: {
          resumo: "Descrição complementar do projeto (substituir): arquitetura, decisões e resultados.",
          etapas: [
            { titulo: "Modelagem", descricao: "Entidades, relacionamentos e contratos da API." },
            { titulo: "Implementação", descricao: "Rotas, regras de negócio e autenticação." },
            { titulo: "Testes", descricao: "Testes unitários e de integração automatizados." },
            { titulo: "Publicação", descricao: "Contêiner, variáveis de ambiente e pipeline de deploy." },
          ],
          tecnologias: ["Node.js", "SQL", "REST", "Docker", "Testes automatizados"],
        },
      },
      {
        id: "servico-de-notificacoes",
        titulo: "[Exemplo] Serviço de notificações assíncronas",
        descricao:
          "Serviço que recebe eventos e envia notificações por fila, com reenvio em caso de falha e registro de cada tentativa para auditoria.",
        repositorio: null, // PLACEHOLDER
        media: { tipo: "imagem", src: "projetos/placeholder.svg", alt: "Imagem ilustrativa do projeto (substituir)" },
        metricas: [
          { rotulo: "Entregas confirmadas", valor: 96 },
          { rotulo: "Resiliência a falhas", valor: 82 },
          { rotulo: "Observabilidade", valor: 70 },
          { rotulo: "Cobertura de testes", valor: 75 },
        ],
        detalhes: {
          resumo: "Descrição complementar do projeto (substituir).",
          etapas: ["Desenho da fila", "Consumidores e reenvio", "Logs e métricas"],
          tecnologias: ["Filas", "Logs estruturados", "Docker", "SQL"],
        },
      },
    ],
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
