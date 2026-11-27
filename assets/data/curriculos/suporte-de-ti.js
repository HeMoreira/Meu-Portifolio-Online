/* Currículo: Suporte de TI — só conteúdo. Marcadores [Exemplo] = substituir. */
import { PERFIL, contatos } from "../perfil.js";
import { criarAnos } from "../projetos.js";
import { criarCertificacoes } from "../certificacoes.js";
import { criarCompetencias } from "../competencias.js";

export default {
  perfil: { ...PERFIL, funcao: "Suporte de TI / Help Desk" },

  sobre: {
    paragrafos: [
      "Estudante do 3º semestre da graduação em Análise e Desenvolvimento de Sistemas, sou formado como técnico em informática na Fundação Oswaldo Cruz e estou aberto a oportunidades como estagiário na área de Suporte de TI / Help Desk.",
      "Possuo conhecimento variado na área de informática, o que inclui operação e instalação de hardware e software; Instalação, atualização e configuração de sistemas operacionais (Windows/Linux); Arquitetura de redes; Segurança digital; Aplicações de uso variado (Excel, Word, Powerpoint, Canva, etc.) e muito mais.",
      "Possuo ainda uma grande bagagem como desenvolvedor e operador de agentes de IA generativa, fazendo de mim um profissional muito versátil.",
    ],
    links: contatos("email", "linkedin", "github"),
  },

  competencias: {
    intro: "Capacidades relacionadas ao meu trabalho como Suporte de TI / Help Desk.",
    // Só ids do catálogo (assets/data/competencias.js), na ordem de exibição.
    itens: criarCompetencias([
      "redes-e-conectividade",
      "sistemas-e-manutencao",
      "atendimento-ao-usuario",
      "ferramentas-gerais",
      "atividades-de-escritorio",
      "tecnologias-de-desenvolvimento",
      "comunicacao-e-didatica",
    ]),
  },

  projetos: {
    intro: "Projetos diversos que demonstram minhas capacidades na prática.",
    // Cada ano lista só os ids do catálogo (assets/data/projetos.js), na ordem de exibição.
    anos: criarAnos({
      2025: {
        imagem: "projetos/professor.jpeg",
        itens: [
          "professor-python",
          "ai-tests",
        ],
      },
      2026: {
        itens: [
          "professor-python",
          "meu-portifolio-online-suporte-de-ti",
        ],
      },
    }),
  },

  certificacoes: {
    intro: "Formações e certificados relevantes para a área.",
    // Só ids do catálogo (assets/data/certificacoes.js), na ordem de exibição.
    itens: criarCertificacoes([
      "fundamentos-de-ti",
      "tecnico-de-informatica",
      "devops-e-agile-culture",
      "ef-set-ingles",
      "cursa-excel",
    ]),
  },
};
