/* ==========================================================================
   Dados de EXEMPLO — usados apenas pela página /styleguide/.
   É também o modelo para os seis currículos reais (etapa 2): copie este
   arquivo para {slug}.js e troque o conteúdo. Nenhum HTML aqui.

   Caminhos de mídia são relativos à CATEGORIA:
     imagens → assets/images/<categoria>/…   (ex.: "competencias/html.svg")
     vídeos  → assets/videos/<categoria>/…   (ex.: "projetos/demo.mp4")
   Dois currículos podem apontar para o MESMO arquivo — não copie mídia.

   Ids (projeto.id, certificacao.id) viram âncoras (#projeto-{id},
   #certificacao-{id}) e são usados em competencias[].relacao.
   ========================================================================== */

export default {
  perfil: {
    nome: "Seu Nome Completo",
    funcao: "Título profissional do currículo",
    foto: { src: "perfil/placeholder.svg", alt: "Retrato de Seu Nome Completo" },
  },

  sobre: {
    paragrafos: [
      "Parágrafo de apresentação. Descreva em poucas linhas quem você é, o que faz e que tipo de problema gosta de resolver. O texto é limitado a uma largura confortável de leitura.",
      "Um segundo parágrafo opcional para contexto: trajetória, foco atual ou o que você busca em novos projetos.",
    ],
    links: [
      { rotulo: "Enviar e-mail", href: "mailto:contato@exemplo.com" },
      { rotulo: "GitHub", href: "https://github.com/" },
      { rotulo: "LinkedIn", href: "https://www.linkedin.com/" },
    ],
  },

  competencias: {
    intro: "Texto opcional de apresentação da seção. Os cards se reorganizam conforme a quantidade de itens.",
    itens: [
      {
        titulo: "Competência com projeto",
        descricao: "Descrição curta do que você domina e como aplica no dia a dia.",
        imagem: "competencias/placeholder.svg",
        relacao: { tipo: "projeto", id: "exemplo-um" },
      },
      {
        titulo: "Competência com certificado",
        descricao: "Cards com descrições de tamanhos diferentes mantêm o botão alinhado na base, graças ao layout flexível. Este texto é propositalmente mais longo para demonstrar isso.",
        imagem: "competencias/placeholder.svg",
        relacao: { tipo: "certificacao", id: "exemplo-um" },
      },
      {
        titulo: "Outra competência",
        descricao: "Aponta para o segundo projeto.",
        imagem: "competencias/placeholder.svg",
        relacao: { tipo: "projeto", id: "exemplo-dois" },
      },
      {
        titulo: "Sem botão de relação",
        descricao: "O botão é opcional: sem `relacao`, o card mostra apenas imagem, título e descrição.",
        imagem: "competencias/placeholder.svg",
      },
    ],
  },

  projetos: {
    intro: "Cada projeto tem repositório, modal de detalhes, mídia e quatro indicadores.",
    itens: [
      {
        id: "exemplo-um",
        titulo: "Nome do primeiro projeto",
        descricao:
          "Resumo do projeto em um ou dois parágrafos curtos: o problema, a solução e o seu papel. A mídia fica à direita em telas largas e abaixo do texto em telas pequenas.",
        repositorio: "https://github.com/",
        media: { tipo: "imagem", src: "projetos/placeholder.svg", alt: "Captura de tela do primeiro projeto" },
        metricas: [
          { rotulo: "Desempenho", valor: 95 },
          { rotulo: "Acessibilidade", valor: 100 },
          { rotulo: "Boas práticas", valor: 90 },
          { rotulo: "SEO", valor: 85 },
        ],
        detalhes: {
          resumo: "Texto mais completo sobre o projeto, exibido no modal: contexto, objetivos e resultados.",
          etapas: [
            { titulo: "Planejamento", descricao: "Levantamento de requisitos e definição do escopo." },
            { titulo: "Prototipação", descricao: "Wireframes e validação rápida com usuários." },
            { titulo: "Desenvolvimento", descricao: "Implementação incremental com revisões frequentes." },
            { titulo: "Entrega", descricao: "Testes finais, publicação e documentação." },
          ],
          tecnologias: ["HTML5", "CSS3", "JavaScript", "Git", "Acessibilidade"],
        },
      },
      {
        id: "exemplo-dois",
        titulo: "Nome do segundo projeto, com um título propositalmente mais longo",
        descricao: "Um texto curto.",
        repositorio: "https://github.com/",
        media: { tipo: "imagem", src: "projetos/placeholder.svg", alt: "Captura de tela do segundo projeto" },
        metricas: [
          { rotulo: "Cobertura de testes", valor: 72 },
          { rotulo: "Entrega do escopo", valor: 100 },
          { rotulo: "Performance", valor: 64 },
          { rotulo: "Documentação", valor: 38 },
        ],
        detalhes: {
          resumo: "Detalhes do segundo projeto.",
          etapas: ["Descoberta", "Implementação", "Publicação"],
          tecnologias: ["Node.js", "SQL", "Docker", "CI/CD", "REST", "Testes automatizados", "Linux"],
        },
      },
    ],
  },

  certificacoes: {
    intro: "Certificados e cursos concluídos.",
    itens: [
      {
        id: "exemplo-um",
        titulo: "Nome da certificação",
        descricao: "Instituição, carga horária e ano de conclusão.",
        imagem: "certificacoes/placeholder.svg",
        imagemAlt: "Certificado de exemplo",
      },
      {
        id: "exemplo-dois",
        titulo: "Outra certificação",
        descricao: "Descrição curta.",
        imagem: "certificacoes/placeholder.svg",
        imagemAlt: "Certificado de exemplo",
      },
      {
        id: "exemplo-tres",
        titulo: "Certificação com descrição longa",
        descricao:
          "Cards aceitam descrições mais extensas sem quebrar o grid: a altura se ajusta ao conteúdo e os cards da mesma linha se igualam.",
        imagem: "certificacoes/placeholder.svg",
        imagemAlt: "Certificado de exemplo",
      },
    ],
  },
};
