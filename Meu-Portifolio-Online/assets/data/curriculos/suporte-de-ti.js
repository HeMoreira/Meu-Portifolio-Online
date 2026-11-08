/* Currículo: Suporte de TI — só conteúdo. Marcadores [Exemplo] = substituir. */
import { PERFIL, contatos } from "../perfil.js";

export default {
  perfil: { ...PERFIL, funcao: "Analista de Suporte de TI" },

  sobre: {
    paragrafos: [
      "Atuo no atendimento e na resolução de incidentes de tecnologia, garantindo que pessoas e equipes voltem a trabalhar o mais rápido possível, com clareza na comunicação e foco na causa raiz dos problemas.",
      "Gosto de transformar soluções recorrentes em documentação e processos simples, reduzindo chamados repetidos e deixando o ambiente de TI mais previsível.",
    ],
    links: contatos("email", "linkedin", "github"),
  },

  competencias: {
    intro: "Áreas em que concentro meu trabalho de suporte.",
    itens: [
      {
        titulo: "Atendimento ao usuário",
        descricao: "Triagem, diagnóstico e resolução de incidentes com comunicação objetiva e empática.",
        imagem: "competencias/suporte.svg",
        relacao: { tipo: "projeto", id: "central-de-chamados" },
      },
      {
        titulo: "Redes e conectividade",
        descricao: "Diagnóstico de acesso, Wi-Fi, VPN e infraestrutura básica de rede local.",
        imagem: "competencias/rede.svg",
        relacao: { tipo: "projeto", id: "inventario-de-ativos" },
      },
      {
        titulo: "Sistemas e manutenção",
        descricao: "Instalação, configuração e manutenção preventiva de estações, sistemas e periféricos.",
        imagem: "competencias/servidor.svg",
        relacao: { tipo: "certificacao", id: "fundamentos-de-ti" },
      },
      {
        titulo: "Documentação e processos",
        descricao: "Bases de conhecimento e procedimentos que reduzem chamados repetidos.",
        imagem: "competencias/documentacao.svg",
        relacao: { tipo: "projeto", id: "central-de-chamados" },
      },
    ],
  },

  projetos: {
    intro: "Projetos que demonstram organização, método e atenção ao usuário.",
    itens: [
      {
        id: "central-de-chamados",
        titulo: "[Exemplo] Central de chamados interna",
        descricao:
          "Fluxo de abertura, priorização e acompanhamento de chamados com base de conhecimento associada. O objetivo é reduzir o tempo de resposta e dar visibilidade ao andamento de cada solicitação.",
        repositorio: null, // PLACEHOLDER: URL do repositório
        media: { tipo: "imagem", src: "projetos/placeholder.svg", alt: "Imagem ilustrativa do projeto (substituir)" },
        metricas: [
          { rotulo: "Tempo de resposta", valor: 90 },
          { rotulo: "Resolução no 1º contato", valor: 75 },
          { rotulo: "Satisfação do usuário", valor: 88 },
          { rotulo: "Cobertura da documentação", valor: 70 },
        ],
        detalhes: {
          resumo: "Descrição complementar do projeto (substituir): contexto, problema enfrentado e resultados obtidos.",
          etapas: [
            { titulo: "Levantamento", descricao: "Mapeamento dos tipos de chamado e dos gargalos." },
            { titulo: "Definição do fluxo", descricao: "Categorias, prioridades e prazos de atendimento." },
            { titulo: "Implantação", descricao: "Configuração da ferramenta e treinamento dos usuários." },
            { titulo: "Melhoria contínua", descricao: "Revisão de indicadores e atualização da base de conhecimento." },
          ],
          tecnologias: ["ITSM", "Active Directory", "Windows", "Linux", "Documentação"],
        },
      },
      {
        id: "inventario-de-ativos",
        titulo: "[Exemplo] Inventário de ativos de TI",
        descricao:
          "Controle centralizado de equipamentos, licenças e responsáveis, facilitando manutenção preventiva, auditorias e planejamento de renovação do parque.",
        repositorio: null, // PLACEHOLDER
        media: { tipo: "imagem", src: "projetos/placeholder.svg", alt: "Imagem ilustrativa do projeto (substituir)" },
        metricas: [
          { rotulo: "Equipamentos catalogados", valor: 95 },
          { rotulo: "Licenças regularizadas", valor: 80 },
          { rotulo: "Manutenção em dia", valor: 65 },
          { rotulo: "Dados atualizados", valor: 85 },
        ],
        detalhes: {
          resumo: "Descrição complementar do projeto (substituir).",
          etapas: ["Coleta de dados", "Padronização dos registros", "Rotina de atualização"],
          tecnologias: ["Planilhas", "Redes", "Hardware", "Licenciamento"],
        },
      },
    ],
  },

  certificacoes: {
    intro: "Formações e certificados na área de suporte.",
    itens: [
      {
        id: "fundamentos-de-ti",
        titulo: "[Exemplo] Fundamentos de TI",
        descricao: "Instituição, carga horária e ano de conclusão (substituir).",
        imagem: "certificacoes/placeholder.svg",
        imagemAlt: "Imagem ilustrativa de certificado (substituir)",
      },
      {
        id: "atendimento-ao-cliente",
        titulo: "[Exemplo] Atendimento e experiência do usuário",
        descricao: "Instituição, carga horária e ano de conclusão (substituir).",
        imagem: "certificacoes/placeholder.svg",
        imagemAlt: "Imagem ilustrativa de certificado (substituir)",
      },
    ],
  },
};
