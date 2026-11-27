/* ==========================================================================
   Catálogo CENTRAL de projetos e experiências: TODAS as informações de cada item
   ficam aqui. Os currículos (assets/data/curriculos/{slug}.js → projetos.anos) só
   dizem QUAIS ids exibir em cada ano e em que ordem. O mesmo id pode aparecer em
   vários anos e em vários currículos.

   Campos de um item (a chave do objeto é o id e vira a âncora #projeto-{id}):
     tipo        "projeto" (padrão) | "experiencia"  → prefixo "Projeto: " / "Experiência: "
     titulo, descricao, repositorio?, media?, metricas (4), detalhes?

   Precisa de um texto diferente em outro currículo? Crie outro item com id próprio
   (ex.: "meu-portifolio-online-suporte-de-ti") e referencie esse id no currículo.
   ========================================================================== */

/** Intervalo padrão do roadmap. Cada currículo pode informar o seu em criarAnos(…, { de, ate }). */
export const ANOS_PADRAO = { de: 2020, ate: 2026 };

export const CATALOGO = {
  "imaginaria-imobiliaria": {
    tipo: "projeto",
    titulo: "Imaginaria-Imobiliária",
    descricao: "Website completo para anúncio e venda de imóveis com o objetivo de ser simples e robusto. Design pensado nos usuários considerando o público alvo antes de qualquer decisão.",
    repositorio: "https://github.com/HeMoreira/imaginaria-imobiliaria",
    media: {
      tipo: "video",
      src: "projetos/imaginaria_imobiliaria_project.mp4",
      alt: "Vídeo ilustrativo do projeto",
    },
    metricas: [
      { rotulo: "Design de Interfaces", valor: 80 },
      { rotulo: "Processo de testagem", valor: 80 },
      { rotulo: "Documentação de processos", valor: 65 },
      { rotulo: "Integração com backend", valor: 95 },
    ],
    detalhes: {
      resumo: "Esse projeto não vive apenas de interface escalável e responsiva. Todo o design precisou ser pensado considerando um público alvo mais velho, além de ter sido integrado à um sistema CRUD real com foco em segurança e robustês.",
      etapas: [
        {
          titulo: "Pesquisa de Design",
          descricao: "Antes mesmo de abrir o editor de código, pesquisei por alguns websites de venda de imóveis e analisei com calma cada detalhe.",
        },
        {
          titulo: "Definição dos requisitos",
          descricao: "Após entender as necessidades do cliente e produto, comecei a definir o que era necessário para garantir uma boa experiência de usuário e conforto visual. Tudo integrado a um sistema real desenvolvido com o framework Flask",
        },
        {
          titulo: "Vibe Coding consciente",
          descricao: "Com a base definida, usei agentes de IA para fazerem o trabalho braçal. Algumas horas refinando os prompts ajudaram a garantir que o resultado cumprisse os requisitos.",
        },
        {
          titulo: "Revisão e Ajustes",
          descricao: "Mesmo com todo o cuidado, sempre sobra algum ponto fora da curva. Felizmente, com minha bagagem técnica nas tecnologias utilizadas, não tive dificuldade em perceber e corrigir cada imprecisão.",
        },
      ],
      tecnologias: [
        "UX",
        "UI",
        "HTML5",
        "CSS3",
        "Javascript",
        "Jinja2",
        "Prompt Engineering",
        "Claude",
        "Gemini",
        "Git",
        "Integração com Backend",
        "Pesquisa",
      ],
    },
  },

  "meu-portifolio-online": {
    tipo: "projeto",
    titulo: "Meu Portifolio Online",
    descricao: "Website completo desenvolvido para exibição do meu portifólio (esse em que você está agora). Desenvolvido com IA, mas com cuidado em design, escalabilidade, responsividade e mais.",
    repositorio: "https://github.com/HeMoreira/Meu-Portifolio-Online",
    media: { tipo: "video", src: "projetos/meu_portifolio_online_project.mp4" },
    metricas: [
      { rotulo: "Design de Interfaces", valor: 85 },
      { rotulo: "Organização", valor: 90 },
      { rotulo: "Escalabilidade", valor: 95 },
      { rotulo: "Vibe Coding consciente", valor: 85 },
    ],
    detalhes: {
      resumo: "Esse projeto foi escrito quase inteiramente por modelos de IA, mas antes de qualquer prompt, existiu um planejamento profundo que olhou para a escalabilidade e resistência a atualizações antes de escrever qualquer linha, além do cuidado em criar uma identidade visual única.",
      etapas: [
        {
          titulo: "Definição dos requisitos",
          descricao: "O site precisava funcionar independentemente de currículo, apresentando minhas capacidades para variados grupos de pessoa interessadas em diferentes habilidades. Toda a estrutura e design precisou ser desenvolvida considerando todos esses fatores.",
        },
        {
          titulo: "Vibe Coding consciente",
          descricao: "Com a base definida, usei agentes de IA para fazerem o trabalho braçal. Algumas horas refinando os prompts ajudaram a garantir que o resultado cumprisse os requisitos.",
        },
        {
          titulo: "Revisão e Ajustes",
          descricao: "Mesmo com todo o cuidado, sempre sobra algum ponto fora da curva. Felizmente, com minha bagagem técnica nas tecnologias utilizadas, não tive dificuldade em perceber e corrigir cada imprecisão.",
        },
      ],
      tecnologias: ["UX","UI","HTML5","CSS3","Javascript","Prompt Engineering","Claude","ChatGPT","Git","Github"],
    },
  },

  "brawl-stars-brawler-picker": {
    tipo: "projeto",
    titulo: "Brawl Stars Brawler Picker",
    descricao: "Website completo desenvolvido para comparar dados complexos de diferentes personagens do jogo 'Brawl Stars' com o objetivo de encontrar as combinações mais favoráveis.",
    repositorio: "https://github.com/HeMoreira/Brawl-Stars-Brawler-Picker",
    media: { tipo: "video", src: "projetos/brawler_picker_project.mp4" },
    metricas: [
      { rotulo: "Design de Interfaces", valor: 95 },
      { rotulo: "Integração com Excel", valor: 85 },
      { rotulo: "Escalabilidade", valor: 70 },
      { rotulo: "Solução de problemas", valor: 95 },
    ],
    detalhes: {
      resumo: "Esse projeto me forçou a pensar fora da caixa no quesito design, já que IAs são excelentes para resolver problemas comuns com design moderno, mas podem apresentar dificuldades quando precisam lidar com a apresentação de muitas informações ou uma escolha artística mais específica.",
      etapas: [
        {
          titulo: "Definição dos requisitos",
          descricao: "O site usa matemática complexa para apresentar ao usuário múltiplas informações sobre os brawlers. Isso significa que manter o design limpo seria um desafio que precisava de atenção redobrada para dar várias opções para quem quer detalhes, mas sem poluir demais para quem só quer o resultado mais simples e rápido.",
        },
        {
          titulo: "Vibe Coding consciente",
          descricao: "Com a base definida, usei agentes de IA para fazerem o trabalho braçal. Algumas horas refinando os prompts ajudaram a garantir que o resultado cumprisse os requisitos.",
        },
        {
          titulo: "O problema do design moderno genérico",
          descricao: "O código entregue possuia os mesmos elementos comuns de designs modernos genéricos de sempre, o que costuma funcionar bem, mas quando eu vi essa estética ao lado da imagem dos brawlers e seus seletores com uma estética muito mais colorida e cartunesca, logo ficou claro que aquilo não iria funcionar. Os inputs de nome, cards e status simplesmente não conversavam com as imagens ao lado.",
        },
        {
          titulo: "Revisão e Ajustes",
          descricao: "Com os vários problemas descobertos na fase anterior, o objetivo aqui não era só ajustar, mas buscar refazer o estilo de vários elementos para que o site seguisse uma única estética que remetesse ao jogo, gerando familiaridade com o público alvo e mantendo a coesão entre os múltiplos elementos da página.",
        },
      ],
      tecnologias: [
        "UX",
        "UI",
        "HTML5",
        "CSS3",
        "Javascript",
        "Prompt Engineering",
        "Claude",
        "ChatGPT",
        "Gemini",
        "Git",
        "Github",
        "Excel",
        "Integração com Backend",
      ],
    },
  },

  "ai-tests": {
    tipo: "projeto",
    titulo: "AI-Tests",
    descricao: "Projeto com o objetivo de testar e avaliar diferentes modelos de IA. Foco em testagem e documentação para solucionar problemas de eficiência e agilizar processos.",
    repositorio: "https://github.com/HeMoreira/AI-Tests",
    media: { tipo: "video", src: "projetos/ai_tests_project.mp4", alt: "Vídeo ilustrativo do projeto" },
    metricas: [
      { rotulo: "Documentação de processos", valor: 95 },
      { rotulo: "Processo de testagem", valor: 80 },
      { rotulo: "Design de apresentações", valor: 65 },
      { rotulo: "Dados atualizados", valor: 85 },
    ],
    detalhes: {
      resumo: "O projeto teve como objetivo testar e documentar as capacidades de cada modelo de IA avaliado, tendo utilizado múltiplas ferramentas para atingir esse objetivo pensando no consumidor.",
      etapas: [
        {
          titulo: "Definição dos requisitos",
          descricao: "Planejamento do objetivo a ser alcançado, critérios de avaliação justos, seleção das LLMs, etc.",
        },
        {
          titulo: "Análise cuidadosa",
          descricao: "Cada teste foi realizado com cautela para garantir um resultado agradável e funcional considerando o objetivo final da avaliação.",
        },
        {
          titulo: "Anotações organizadas",
          descricao: "Ferranentas como o Trello e o Word foram utilizadas para anotar os resultados obtidos.",
        },
        {
          titulo: "Desenvolvimento da apresentação",
          descricao: "Para garantir que o resultado fosse apresentável ao público geral, os documentos desenvolvidos foram reorganizados em uma apresentação simples e curta feita pelo Canva/Powerpoint e que foca só no essencial.",
        },
      ],
      tecnologias: ["ChatGPT","Claude","Copilot","DeepSeek","Gemini","Powerpoint","Word","Canva","Documentação","Trello"],
    },
  },

  "professor-python": {
    tipo: "experiencia",
    titulo: "Professor de Python",
    descricao: "Entre agosto de 2025 e fevereiro de 2026, fui professor de Python para alguns senhores de idade, o que me deu experiência real com comunicação clara e didática.",
    media: { tipo: "imagem", src: "projetos/professor.jpeg" },
    metricas: [
      { rotulo: "Organização", valor: 90 },
      { rotulo: "Preparo de apresentações", valor: 90 },
      { rotulo: "Didática e Comunicação", valor: 95 },
      { rotulo: "Experiência Real", valor: 90 },
    ],
    detalhes: {
      resumo: "Já possuia o hábito de ensinar programação para colegas e amigos, mas a partir de agosto de 2025 o serviço evoluiu para aulas pagas para pais e conhecidos mais velhos de alguns dos meus amigos.",
      etapas: [
        {
          titulo: "Preparação de apresentações",
          descricao: "Antes de cada aula, preparei aprentações com o Canva e Powerpoint para facilitar o aprendizado.",
        },
        {
          titulo: "Didática e Paciência",
          descricao: "Como a maioria dos alunos tinha mais de 50 anos, me esforçei para apresentar o conteúdo de forma didática, parando para entender os problemas dos alunos assim que surgissem com calma e empatia.",
        },
        {
          titulo: "Aprendizado contínuo",
          descricao: "Analisando o perfil dos alunos, fui adaptando o material continuamente para associar os problemas novos à antigos e facilitar o aprendizado.",
        },
      ],
      tecnologias: ["Python","Powerpoint","Canva","Documentação","Didática e comunicação"],
    },
  },

  // ---- variações por currículo (mesmo projeto, texto adaptado ao público daquele currículo)
  "brawl-stars-brawler-picker-domador-de-ias": {
    tipo: "projeto",
    titulo: "Brawl Stars Brawler Picker",
    descricao: "Website completo desenvolvido para comparar dados complexos de diferentes personagens do jogo 'Brawl Stars' com o objetivo de encontrar as combinações mais favoráveis.",
    repositorio: "https://github.com/HeMoreira/Brawl-Stars-Brawler-Picker",
    media: { tipo: "video", src: "projetos/brawler_picker_project.mp4" },
    metricas: [
      { rotulo: "Design de Interfaces", valor: 95 },
      { rotulo: "Integração com Excel", valor: 85 },
      { rotulo: "Escalabilidade", valor: 70 },
      { rotulo: "Solução de problemas", valor: 95 },
    ],
    detalhes: {
      resumo: "Esse projeto me forçou a pensar fora da caixa tanto em relação a design quanto em relação à lógica, isso porque LLMs são excelentes para desenvolver sites convencionais, mas deixam a desejar quando se vêem perante problemas específicos.",
      etapas: [
        {
          titulo: "Definição dos requisitos",
          descricao: "O site usa matemática complexa para apresentar ao usuário múltiplas informações sobre os brawlers. Desenvolver isso foi um grande desafio tanto para o backend quanto para o frontend, já que era necessário balancear as fórmulas para que trouxessem os resultados esperados e, ao mesmo tempo, o design precisava manter tudo acessível sem poluir a tela.",
        },
        {
          titulo: "Vibe Coding consciente",
          descricao: "Com a base definida, usei agentes de IA para fazerem o trabalho braçal. Algumas horas refinando os prompts ajudaram a garantir que o resultado cumprisse os requisitos.",
        },
        {
          titulo: "O problema do design moderno genérico",
          descricao: "O código entregue possuia os mesmos elementos comuns de designs modernos genéricos de sempre, o que costuma funcionar bem, mas quando eu vi essa estética ao lado da imagem dos brawlers e seus seletores com uma estética muito mais colorida e cartunesca, logo ficou claro que aquilo não iria funcionar. Os inputs de nome, cards e status simplesmente não conversavam com as imagens ao lado.",
        },
        {
          titulo: "Revisão e Ajustes",
          descricao: "Com os vários problemas descobertos na fase anterior, o objetivo aqui não era só ajustar, mas buscar refazer o estilo de vários elementos para que o site seguisse uma única estética que remetesse ao jogo.",
        },
      ],
      tecnologias: [
        "Django",
        "Python",
        "SQLite",
        "UX",
        "UI",
        "HTML5",
        "CSS3",
        "Javascript",
        "Prompt Engineering",
        "Claude",
        "ChatGPT",
        "Gemini",
        "Git",
        "Github",
        "Excel",
        "Integração com Backend",
      ],
    },
  },

  "meu-portifolio-online-domador-de-ias": {
    tipo: "projeto",
    titulo: "Meu Portifolio Online",
    descricao: "Website completo desenvolvido para exibição do meu portifólio (esse em que você está agora). Desenvolvido com IA, mas com cuidado em design, escalabilidade, responsividade e mais.",
    repositorio: "https://github.com/HeMoreira/Meu-Portifolio-Online",
    media: { tipo: "video", src: "projetos/meu_portifolio_online_project.mp4" },
    metricas: [
      { rotulo: "Design de Interfaces", valor: 85 },
      { rotulo: "Organização", valor: 90 },
      { rotulo: "Escalabilidade", valor: 95 },
      { rotulo: "Vibe Coding consciente", valor: 85 },
    ],
    detalhes: {
      resumo: "Esse projeto foi escrito quase inteiramente por modelos de IA, mas antes de qualquer prompt, existiu um planejamento profundo que olhou para a escalabilidade e resistência a atualizações antes de escrever qualquer linha.",
      etapas: [
        {
          titulo: "Definição dos requisitos",
          descricao: "O site precisava funcionar independentemente de currículo, apresentando minhas capacidades para variados grupos de pessoa interessadas em diferentes habilidades. Toda a estrutura e design precisou ser desenvolvida considerando todos esses fatores.",
        },
        {
          titulo: "Vibe Coding consciente",
          descricao: "Com a base definida, usei agentes de IA para fazerem o trabalho braçal. Algumas horas refinando os prompts ajudaram a garantir que o resultado cumprisse os requisitos.",
        },
        {
          titulo: "Revisão e Ajustes",
          descricao: "Mesmo com todo o cuidado, sempre sobra algum ponto fora da curva. Felizmente, com minha bagagem técnica nas tecnologias utilizadas, não tive dificuldade em perceber e corrigir cada imprecisão.",
        },
      ],
      tecnologias: ["UX","UI","HTML5","CSS3","Javascript","Prompt Engineering","Claude","ChatGPT","Git","Github"],
    },
  },

  "imaginaria-imobiliaria-domador-de-ias": {
    tipo: "projeto",
    titulo: "Imaginaria-Imobiliária",
    descricao: "Website completo para anúncio e venda de imóveis com o objetivo de ser simples e robusto. Desenvolvido por completo em um mês com segurança avançada, código organizado e design limpo com a ajuda de agentes de IA.",
    repositorio: "https://github.com/HeMoreira/imaginaria-imobiliaria",
    media: {
      tipo: "video",
      src: "projetos/imaginaria_imobiliaria_project.mp4",
      alt: "Vídeo ilustrativo do projeto",
    },
    metricas: [
      { rotulo: "Design de Interfaces", valor: 80 },
      { rotulo: "Processo de testagem", valor: 80 },
      { rotulo: "Documentação de processos", valor: 65 },
      { rotulo: "Integração com backend", valor: 95 },
    ],
    detalhes: {
      resumo: "Desenvolvido com o Framework Flask, o website de anúncio de imóveis possui um alto nível de segurança com sistema CRUD completo, autenticação, integração com banco de dados, integração com um sistema de mapas e muito mais. Tudo desenvolvido em 1 mês com foco em escalabilidade, segurança e design responsivo.",
      etapas: [
        {
          titulo: "Pesquisa de Design",
          descricao: "Antes mesmo de abrir o editor de código, pesquisei por alguns websites de venda de imóveis e analisei com calma cada detalhe.",
        },
        {
          titulo: "Definição dos requisitos",
          descricao: "Após entender as necessidades do cliente e produto, comecei a definir o que era necessário para garantir uma boa experiência de usuário e conforto visual. Tudo integrado a um sistema real desenvolvido com o framework Flask",
        },
        {
          titulo: "Vibe Coding consciente",
          descricao: "Com a base definida, usei agentes de IA para fazerem o trabalho braçal. Algumas horas refinando os prompts ajudaram a garantir que o resultado cumprisse os requisitos.",
        },
        {
          titulo: "Revisão e Ajustes",
          descricao: "Mesmo com todo o cuidado, sempre sobra algum ponto fora da curva. Felizmente, com minha bagagem técnica nas tecnologias utilizadas, não tive dificuldade em perceber e corrigir cada imprecisão.",
        },
      ],
      tecnologias: [
        "SQLAlchemy",
        "Flask",
        "Python",
        "Segurança",
        "UX",
        "UI",
        "HTML5",
        "CSS3",
        "Javascript",
        "Jinja2",
        "Prompt Engineering",
        "Claude",
        "Gemini",
        "Git",
        "Sistema de Logs",
        "Leaflet (biblioteca javascript)",
      ],
    },
  },

  "meu-portifolio-online-suporte-de-ti": {
    tipo: "projeto",
    titulo: "Meu Portifolio Online",
    descricao: "Website completo desenvolvido para exibição do meu portifólio (esse em que você está agora). Utiliza tecnologias de desenvolvimento diversas como HTML5, CSS3 e Javascript.",
    repositorio: "https://github.com/HeMoreira/Meu-Portifolio-Online",
    media: { tipo: "video", src: "projetos/meu_portifolio_online_project.mp4" },
    metricas: [
      { rotulo: "Organização", valor: 90 },
      { rotulo: "Simplificação de processos", valor: 85 },
      { rotulo: "Design de Interfaces", valor: 95 },
      { rotulo: "Cobertura da documentação", valor: 70 },
    ],
    detalhes: {
      resumo: "O processo de desenvolvimento da página envolveu múltiplas etapas que envolveram mais do que as tecnologias em si, mas o pensamento de resolução do problema.",
      etapas: [
        {
          titulo: "Definição dos requisitos",
          descricao: "Mapeamento dos problemas que a página precisava resolver. Precisei considerar os tipos de usuários que consumiriam a página e encontrar um equilíbrio entre múltiplas funcionalidades e escalabilidade.",
        },
        {
          titulo: "Desenvolvimento com IA",
          descricao: "Com a base definida, usei agentes de IA para fazerem o trabalho braçal.",
        },
        {
          titulo: "Revisão e Ajustes",
          descricao: "Para garantir que o resultado fosse adequado, múltiplos testes e correções foram aplicadas.",
        },
      ],
      tecnologias: ["HTML5","CSS3","Git","ChatGPT","Documentação","Javascript"],
    },
  },
};

/**
 * Devolve o item do catálogo (ou null, com aviso, se o id não existir).
 * @param {string} id
 * @param {Record<string, object>} [catalogo]
 */
export function resolverItem(id, catalogo = CATALOGO) {
  const base = typeof id === "string" ? catalogo[id] : null;
  if (!base) {
    console.warn(`Projeto/experiência "${id}" não existe no catálogo (assets/data/projetos.js).`);
    return null;
  }
  return { tipo: "projeto", ...base, id };
}

/**
 * Monta a lista de anos de um currículo, em ordem crescente (o último é o ano inicial do roadmap).
 *   criarAnos({ 2025: { imagem?, imagemAlt?, itens: ["id-a", "id-b"] } }, { de: 2020, ate: 2026 })
 * Anos sem entrada ficam na linha do tempo, vazios. `catalogo` só é trocado no styleguide.
 * @returns {{ano: number, imagem?: string, imagemAlt?: string, itens: object[]}[]}
 */
export function criarAnos(porAno = {}, { de, ate, catalogo = CATALOGO } = ANOS_PADRAO) {
  de ??= ANOS_PADRAO.de;
  ate ??= ANOS_PADRAO.ate;
  for (const ano of Object.keys(porAno)) {
    if (Number(ano) < de || Number(ano) > ate) console.warn(`Ano ${ano} fora do intervalo ${de}–${ate}: ignorado.`);
  }
  return Array.from({ length: ate - de + 1 }, (_, i) => {
    const ano = de + i;
    const { itens = [], ...resto } = porAno[ano] ?? {};
    return { ano, ...resto, itens: itens.map((id) => resolverItem(id, catalogo)).filter(Boolean) };
  });
}
