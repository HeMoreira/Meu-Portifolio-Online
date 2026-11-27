/* Currículo: Desenvolvedor Front-End — só conteúdo. Marcadores [Exemplo] = substituir. */
import { PERFIL, contatos } from "../perfil.js";
import { criarAnos } from "../projetos.js";

export default {
  perfil: { ...PERFIL, funcao: "Desenvolvedor Front-End" },

  sobre: {
    paragrafos: [
      "Estudante do 3º semestre da graduação em Análise e Desenvolvimento de Sistemas, sou formado como técnico em informática na Fundação Oswaldo Cruz e estou aberto a oportunidades como estagiário ou Júnior na área de Desenvolvimento Front-End",
      "Possuo conhecimento variado na área de desenvolvimento, o que inclui Design de Interfaces; Conceitos de UI e UX; Tecnologias como HTML5, CSS3 e Javascript; Prompt Engineering e uso de LLMs no fluxo de trabalho; Versionamento de código e trabalho em equipe com Git/Github; Conhecimento em linguagens de programação como Python e C#; Aplicações de uso variado (Excel, Word, Powerpoint, Canva, etc.) e muito mais.",
      "Possuo ainda uma grande bagagem como operador de agentes de IA generativa e suporte de TI, além de estar sempre disposto a usar meu repertório para aprender algo novo, fazendo de mim um profissional muito versátil e eficiente em minhas entregas.",
    ],
    links: contatos("email", "linkedin", "github"),
  },

  competencias: {
    intro: "Competências relacionadas ao meu trabalho como desenvolvedor front-end.",
    itens: [
      {
        titulo: "Ferramentas Modernas",
        descricao: "HTML5, CSS3, Javascript, Jinja2, template engines e mais para maior produtividade.",
        imagem: "competencias/ferramentas.svg",
        relacao: { tipo: "certificacao", id: "responsive-web-design" },
      },
      {
        titulo: "Interfaces responsivas",
        descricao: "Layouts fluidos e responsivos com CSS moderno. Priorização da simplicidade com a abordagem mobile first.",
        imagem: "competencias/interface.svg",
        relacao: { tipo: "certificacao", id: "responsive-web-design" },
      },
      {
        titulo: "JavaScript moderno",
        descricao: "Código modular e legível, sem dependências desnecessárias, com atenção ao desempenho.",
        imagem: "competencias/codigo.svg",
        relacao: { tipo: "projeto", id: "meu-portifolio-online" },
      },
      {
        titulo: "Acessibilidade",
        descricao: "Semântica, contraste, consciência de público, foco e ARIA aplicados desde o início do projeto.",
        imagem: "competencias/acessibilidade.svg",
        relacao: { tipo: "projeto", id: "meu-portifolio-online" },
      },
      {
        titulo: "Desenvolvimento com IA",
        descricao: "Uso de LLMs avançadas no processo de desenvolvimento. Eu cuido apenas da intenção.",
        imagem: "competencias/ia.svg",
        relacao: { tipo: "projeto", id: "meu-portifolio-online" },
      },
      {
        titulo: "Design de Interfaces",
        descricao: "Princípios de UI, UX, cores, design e outros. Questiono os resultados da IA com contexto.",
        imagem: "competencias/ideia.svg",
        relacao: { tipo: "certificacao", id: "responsive-web-design" },
      },
      {
        titulo: "Performance e qualidade",
        descricao: "Otimização de carregamento, medição com ferramentas de auditoria e testes de interface.",
        imagem: "competencias/automacao.svg",
      },
      {
        titulo: "Devops e Cultura Ágil",
        descricao: "Conhecimento de DevOps, Scrum, Kanban, XP e outros. Adaptação a culturas ágeis.",
        imagem: "competencias/rede.svg",
        relacao: { tipo: "certificacao", id: "devops-e-agile-culture" },
      },
      {
        titulo: "Pesquisa de Público",
        descricao: "Não adivinho. Se eu não conheço o público eu pesquiso antes de desenvolver.",
        imagem: "competencias/pesquisa.svg",
        relacao: { tipo: "projeto", id: "imaginaria-imobiliaria" },
      },
      
    ],
  },

  projetos: {
    intro: "Interfaces construídas com atenção a detalhes e a quem as usa.",
    // Cada ano lista só os ids do catálogo (assets/data/projetos.js), na ordem de exibição.
    anos: criarAnos({
      2025: {
        itens: [
          "brawl-stars-brawler-picker",
        ],
      },
      2026: {
        itens: [
          "imaginaria-imobiliaria",
          "meu-portifolio-online",
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
