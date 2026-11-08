/* Currículo: Domador de IAs — só conteúdo. Marcadores [Exemplo] = substituir. */
import { PERFIL, contatos } from "../perfil.js";

export default {
  perfil: { ...PERFIL, funcao: "Domador de IAs" },

  sobre: {
    paragrafos: [
      "Trabalho com inteligência artificial generativa de forma prática: escrevo instruções claras, integro modelos a sistemas e automatizo tarefas repetitivas, sempre verificando a qualidade e a segurança do que a IA produz.",
      "Meu foco é transformar modelos de linguagem em ferramentas confiáveis para o dia a dia, com testes, critérios de avaliação e limites bem definidos.",
    ],
    links: contatos("email", "github", "linkedin"),
  },

  competencias: {
    intro: "Do prompt à integração, com avaliação e responsabilidade.",
    itens: [
      {
        titulo: "Engenharia de prompts",
        descricao: "Instruções estruturadas, exemplos e formatos de saída para resultados consistentes.",
        imagem: "competencias/ia.svg",
        relacao: { tipo: "projeto", id: "assistente-de-atendimento" },
      },
      {
        titulo: "Automação de fluxos",
        descricao: "Encadeamento de etapas com IA para processar documentos, dados e mensagens.",
        imagem: "competencias/automacao.svg",
        relacao: { tipo: "projeto", id: "automacao-de-documentos" },
      },
      {
        titulo: "Integração via API",
        descricao: "Uso de APIs de modelos em aplicações, com controle de custo, erros e limites.",
        imagem: "competencias/servidor.svg",
        relacao: { tipo: "certificacao", id: "fundamentos-de-ia" },
      },
      {
        titulo: "Avaliação e uso responsável",
        descricao: "Conjuntos de teste, revisão humana e cuidados com privacidade e vieses.",
        imagem: "competencias/documentacao.svg",
        relacao: { tipo: "certificacao", id: "ia-responsavel" },
      },
    ],
  },

  projetos: {
    intro: "Aplicações em que a IA resolve um problema concreto.",
    itens: [
      {
        id: "assistente-de-atendimento",
        titulo: "[Exemplo] Assistente de atendimento com IA",
        descricao:
          "Assistente que responde dúvidas frequentes a partir de uma base de conhecimento, indica quando não tem certeza e encaminha o caso para uma pessoa quando necessário.",
        repositorio: null, // PLACEHOLDER: URL do repositório
        media: { tipo: "imagem", src: "projetos/placeholder.svg", alt: "Imagem ilustrativa do projeto (substituir)" },
        metricas: [
          { rotulo: "Precisão das respostas", valor: 88 },
          { rotulo: "Cobertura da base", valor: 75 },
          { rotulo: "Encaminhamentos corretos", valor: 92 },
          { rotulo: "Custo por conversa", valor: 70 },
        ],
        detalhes: {
          resumo: "Descrição complementar do projeto (substituir): como o assistente é avaliado e quais são seus limites.",
          etapas: [
            { titulo: "Base de conhecimento", descricao: "Seleção e organização do conteúdo de referência." },
            { titulo: "Prompts e regras", descricao: "Instruções, tom de voz e critérios de encaminhamento." },
            { titulo: "Avaliação", descricao: "Conjunto de perguntas de teste e revisão humana." },
            { titulo: "Publicação", descricao: "Integração via API e monitoramento de qualidade." },
          ],
          tecnologias: ["LLMs", "APIs de modelos", "Engenharia de prompts", "JavaScript", "Avaliação"],
        },
      },
      {
        id: "automacao-de-documentos",
        titulo: "[Exemplo] Automação de triagem de documentos",
        descricao:
          "Fluxo que lê documentos recebidos, extrai informações-chave, classifica o tipo e registra tudo para conferência humana.",
        repositorio: null, // PLACEHOLDER
        media: { tipo: "imagem", src: "projetos/placeholder.svg", alt: "Imagem ilustrativa do projeto (substituir)" },
        metricas: [
          { rotulo: "Classificação correta", valor: 91 },
          { rotulo: "Tempo economizado", valor: 80 },
          { rotulo: "Revisão humana necessária", valor: 35 },
          { rotulo: "Estabilidade do fluxo", valor: 84 },
        ],
        detalhes: {
          resumo: "Descrição complementar do projeto (substituir).",
          etapas: ["Mapeamento do processo", "Extração e classificação", "Conferência humana"],
          tecnologias: ["LLMs", "Automação", "JSON", "APIs"],
        },
      },
    ],
  },

  certificacoes: {
    intro: "Cursos e certificados em inteligência artificial.",
    itens: [
      {
        id: "fundamentos-de-ia",
        titulo: "[Exemplo] Fundamentos de IA generativa",
        descricao: "Instituição, carga horária e ano de conclusão (substituir).",
        imagem: "certificacoes/placeholder.svg",
        imagemAlt: "Imagem ilustrativa de certificado (substituir)",
      },
      {
        id: "ia-responsavel",
        titulo: "[Exemplo] IA responsável e privacidade de dados",
        descricao: "Instituição, carga horária e ano de conclusão (substituir).",
        imagem: "certificacoes/placeholder.svg",
        imagemAlt: "Imagem ilustrativa de certificado (substituir)",
      },
    ],
  },
};
