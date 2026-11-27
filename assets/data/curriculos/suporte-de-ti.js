/* Currículo: Suporte de TI — só conteúdo. Marcadores [Exemplo] = substituir. */
import { PERFIL, contatos } from "../perfil.js";
import { criarAnos } from "../projetos.js";

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
    itens: [
      {
        titulo: "Redes e conectividade",
        descricao: "Diagnóstico de acesso, Wi-Fi, VPN e infraestrutura básica de rede local.",
        imagem: "competencias/rede.svg",
        relacao: { tipo: "certificacao", id: "tecnico-de-informatica" },
      },
      {
        titulo: "Sistemas e manutenção",
        descricao: "Instalação, configuração e manutenção preventiva de computadores e periféricos.",
        imagem: "competencias/servidor.svg",
        relacao: { tipo: "certificacao", id: "tecnico-de-informatica" },
      },
      {
        titulo: "Atendimento ao usuário",
        descricao: "Triagem, diagnóstico e resolução de incidentes com comunicação objetiva e empática.",
        imagem: "competencias/suporte.svg",
      },
      {
        titulo: "Ferramentas Gerais",
        descricao: "Uso de ferramentas específicas como Canva, Trello, Miro, CapCut, ChatGPT, Manus, etc.",
        imagem: "competencias/ferramentas.svg",
        relacao: { tipo: "projeto", id: "ai-tests" },
      },
      {
        titulo: "Atividades de Escritório",
        descricao: "Uso de ferramentas como Excel, Word, Powerpoint e Word para atividades ocasionais.",
        imagem: "competencias/documentacao.svg",
        relacao: { tipo: "certificacao", id: "tecnico-de-informatica" },
      },
      {
        titulo: "Tecnologias de Desenvolvimento",
        descricao: "Amplo conhecimento em tecnologias como HTML5, CSS3, Javascript, Python, SQL, etc.",
        imagem: "competencias/codigo.svg",
        relacao: { tipo: "projeto", id: "meu-portifolio-online-suporte-de-ti" },
      },
      {
        titulo: "Comunicação e Didática",
        descricao: "Facilidade de comunicação e ensino com pessoas de todas as idades.",
        imagem: "competencias/codigo.svg",
        relacao: { tipo: "experiencia", id: "professor-python" },
      },
    ],
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
    itens: [
      {
        id: "fundamentos-de-ti",
        titulo: "Fundamentos de TI: Hardware e Software",
        descricao: "Emitido pela Fundação Bradesco em outubro de 2026. Mais detalhes no LinkedIn.",
        imagem: "certificacoes/certificado-fundamentos-de-ti-bradesco.jpeg",
        imagemAlt: "",
      },
      {
        id: "tecnico-de-informatica",
        titulo: "Ensino Técnico em Informática",
        descricao: "Emitido pela Fundação Oswaldo Cruz em dezembro de 2025. Mais detalhes no LinkedIn.",
        imagem: "certificacoes/placeholder.svg",
        imagemAlt: "",
      },
      {
        id: "devops-e-agile-culture",
        titulo: "DevOps & Agile Culture",
        descricao: "Emitido pela FIAP em outubro de 2026. Mais detalhes no LinkedIn.",
        imagem: "certificacoes/certificado-devops-e-agile-culture-fiap.jpeg",
        imagemAlt: "",
      },
      {
        id: "ef-set-ingles",
        titulo: "Certificado oficial EF SET 56/100 (B2 Independente).",
        descricao: "Emitido pela EF SET em outubro de 2026. Mais detalhes no LinkedIn.",
        imagem: "certificacoes/certificado-ef-set-ingles.jpeg",
        imagemAlt: "",
      },
      {
        id: "cursa-excel",
        titulo: "Excel do básico ao avançado",
        descricao: "Emitido pelo Cursa em fevereiro de 2025. Mais detalhes no LinkedIn.",
        imagem: "certificacoes/certificado-cursa-excel.png",
        imagemAlt: "",
      },
    ],
  },
};
