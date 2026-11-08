/* Currículo: Desenvolvedor Front-End — só conteúdo. Marcadores [Exemplo] = substituir. */
import { PERFIL, contatos } from "../perfil.js";

export default {
  perfil: { ...PERFIL, funcao: "Desenvolvedor Front-End" },

  sobre: {
    paragrafos: [
      "Construo interfaces web rápidas, acessíveis e responsivas, com HTML semântico, CSS bem organizado e JavaScript sem excessos.",
      "Me importo com o que o usuário sente ao usar o produto: desempenho, legibilidade, navegação por teclado e consistência visual fazem parte de cada entrega.",
    ],
    links: contatos("email", "github", "linkedin"),
  },

  competencias: {
    intro: "Do layout ao comportamento, com foco em qualidade e acessibilidade.",
    itens: [
      {
        titulo: "Interfaces responsivas",
        descricao: "Layouts fluidos com CSS moderno (Grid, Flexbox, custom properties) para qualquer tela.",
        imagem: "competencias/interface.svg",
        relacao: { tipo: "projeto", id: "vitrine-responsiva" },
      },
      {
        titulo: "JavaScript moderno",
        descricao: "Código modular e legível, sem dependências desnecessárias, com atenção ao desempenho.",
        imagem: "competencias/codigo.svg",
        relacao: { tipo: "certificacao", id: "javascript-moderno" },
      },
      {
        titulo: "Acessibilidade",
        descricao: "Semântica, contraste, foco e ARIA aplicados desde o início do projeto.",
        imagem: "competencias/acessibilidade.svg",
        relacao: { tipo: "projeto", id: "design-system" },
      },
      {
        titulo: "Performance e qualidade",
        descricao: "Otimização de carregamento, medição com ferramentas de auditoria e testes de interface.",
        imagem: "competencias/automacao.svg",
        relacao: { tipo: "certificacao", id: "performance-web" },
      },
    ],
  },

  projetos: {
    intro: "Interfaces construídas com atenção a detalhes e a quem as usa.",
    itens: [
      {
        id: "vitrine-responsiva",
        titulo: "[Exemplo] Vitrine de e-commerce responsiva",
        descricao:
          "Catálogo de produtos com filtros, carrinho e checkout simulados, desenvolvido com HTML, CSS e JavaScript puro, priorizando velocidade de carregamento e uso confortável em celulares.",
        repositorio: null, // PLACEHOLDER: URL do repositório
        media: { tipo: "imagem", src: "projetos/placeholder.svg", alt: "Imagem ilustrativa do projeto (substituir)" },
        metricas: [
          { rotulo: "Desempenho", valor: 94 },
          { rotulo: "Acessibilidade", valor: 100 },
          { rotulo: "Boas práticas", valor: 96 },
          { rotulo: "SEO", valor: 90 },
        ],
        detalhes: {
          resumo: "Descrição complementar do projeto (substituir): decisões de interface, desafios e resultados.",
          etapas: [
            { titulo: "Pesquisa e wireframes", descricao: "Definição de fluxos e prioridades de conteúdo." },
            { titulo: "Protótipo visual", descricao: "Paleta, tipografia e componentes-base." },
            { titulo: "Implementação", descricao: "Componentes reutilizáveis e layout responsivo." },
            { titulo: "Auditoria", descricao: "Testes de acessibilidade e de desempenho." },
          ],
          tecnologias: ["HTML5", "CSS3", "JavaScript", "Acessibilidade", "Git"],
        },
      },
      {
        id: "design-system",
        titulo: "[Exemplo] Biblioteca de componentes acessíveis",
        descricao:
          "Conjunto de componentes (botões, modais, formulários, abas) documentados e testados com teclado e leitor de tela, pensado para ser reutilizado em vários projetos.",
        repositorio: null, // PLACEHOLDER
        media: { tipo: "imagem", src: "projetos/placeholder.svg", alt: "Imagem ilustrativa do projeto (substituir)" },
        metricas: [
          { rotulo: "Componentes concluídos", valor: 80 },
          { rotulo: "Cobertura de testes", valor: 70 },
          { rotulo: "Conformidade WCAG", valor: 92 },
          { rotulo: "Documentação", valor: 60 },
        ],
        detalhes: {
          resumo: "Descrição complementar do projeto (substituir).",
          etapas: ["Inventário de padrões", "Tokens de design", "Componentes", "Documentação de uso"],
          tecnologias: ["CSS3", "JavaScript", "ARIA", "Testes manuais", "Documentação"],
        },
      },
    ],
  },

  certificacoes: {
    intro: "Cursos e certificados na área de front-end.",
    itens: [
      {
        id: "javascript-moderno",
        titulo: "[Exemplo] JavaScript moderno",
        descricao: "Instituição, carga horária e ano de conclusão (substituir).",
        imagem: "certificacoes/placeholder.svg",
        imagemAlt: "Imagem ilustrativa de certificado (substituir)",
      },
      {
        id: "performance-web",
        titulo: "[Exemplo] Performance e acessibilidade web",
        descricao: "Instituição, carga horária e ano de conclusão (substituir).",
        imagem: "certificacoes/placeholder.svg",
        imagemAlt: "Imagem ilustrativa de certificado (substituir)",
      },
    ],
  },
};
