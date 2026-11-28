/* ==========================================================================
   Catálogo CENTRAL de projetos e experiências: TODAS as informações de cada item
   ficam aqui. Os currículos (assets/data/curriculos/{slug}.js → projetos.anos) só
   dizem QUAIS ids exibir em cada ano e em que ordem. O mesmo id pode aparecer em
   vários anos e em vários currículos.

   Campos de um item (a chave do objeto é o id e vira a âncora #projeto-{id}):
     tipo        "projeto" (padrão) | "experiencia"  → prefixo "Projeto: " / "Experiência: "
     titulo, descricao, repositorio?, media?, metricas (4), detalhes?
     media       { tipo: "imagem", src: "projetos/arquivo.webp" }   → assets/images/projetos/
                 { tipo: "video",  src: VIDEOS.chave }              → link do YouTube, exibido em iframe

   Precisa de um texto diferente em outro currículo? Crie outro item com id próprio
   (ex.: "meu-portifolio-online-suporte-de-ti") e referencie esse id no currículo.
   ========================================================================== */

/** Intervalo padrão do roadmap. Cada currículo pode informar o seu em criarAnos(…, { de, ate }). */
export const ANOS_PADRAO = { de: 2023, ate: 2026 };

const VIDEOS = {
  meuPortifolioOnline: "https://youtu.be/COLE_O_ID_MEUPORTIFOLIOONLINE",
  examflowAutomation: "https://youtu.be/QbmaNfXAEBA",
  uniEletronics: "https://youtu.be/N3SIoyP6tAk",
  newsletterLinkedin: "https://youtu.be/JgssIQpqyv8",
  imaginariaImobiliaria: "https://youtu.be/Lhgud_nmj8E",
  brawlerPicker: "https://youtu.be/zVK575CxKmc",
  professorPython: "https://youtu.be/a0H85c0e9Y0",
  consultationStation: "https://youtu.be/COLE_O_ID_CONSULTATIONSTATION",
  aiTests: "https://youtu.be/EDgC-W2cxNM",
};


const formacaoAnaliseDesenvolvimentoSistemas = {
  tipo: "experiencia",
  titulo: "Formação em andamento - ADS",
  descricao: "Curso superior de Análise e Desenvolvimento de Sistemas que inclui conteúdos de matérias variadas na área de Desenvolvimento, Cybersegurança, Arquitetura, Infraestrutura, Modelagem de dados e mais.",
  media: { tipo: "imagem", src: "projetos/formacao_ads.jpg" },
  metricas: [
    { rotulo: "Desenvolvimento de Sistemas", valor: 95 },
    { rotulo: "Operação de Hardware e Software", valor: 70 },
    { rotulo: "Redes e Segurança Digital", valor: 85 },
    { rotulo: "Trabalho em Equipe", valor: 95 },
  ],
  detalhes: {
    resumo: "Prevê o conteúdo de matérias variadas no ramo da tecnologia, como Desenvolvimento para Internet, Arquitetura de Redes, Cybersegurança, Internet das Coisas, Modelagem de Dados, Desenvolvimento Front-End, Desenvolvimento Back-End, entre outros. Com ótimos professores, o curso prepara bem os alunos para os desafios reais do mercado de trabalho.",
    tecnologias: ["Desenvolvimento para Internet", "Arquitetura de Redes", "Cybersegurança", "Internet das Coisas", "Modelagem de Dados", "Desenvolvimento Front-End", "Desenvolvimento Back-End", "Lógica de Programação"],
  },
}

const meuPortifolioOnlineDesenvolvedorFrontend = {
  tipo: "projeto",
  titulo: "Meu Portifolio Online",
  descricao: "Website completo desenvolvido para exibição do meu portifólio (esse em que você está agora). Desenvolvido com IA, mas com cuidado em design, escalabilidade, responsividade e mais.",
  repositorio: "https://github.com/HeMoreira/Meu-Portifolio-Online",
  media: { tipo: "video", src: VIDEOS.meuPortifolioOnline },
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
}

const meuPortifolioOnlineDesenvolvedorDeIA = {
  tipo: "projeto",
  titulo: "Meu Portifolio Online",
  descricao: "Website completo desenvolvido para exibição do meu portifólio (esse em que você está agora). Desenvolvido com IA, mas com cuidado em design, escalabilidade, responsividade e mais.",
  repositorio: "https://github.com/HeMoreira/Meu-Portifolio-Online",
  media: { tipo: "video", src: VIDEOS.meuPortifolioOnline },
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
}

const meuPortifolioOnlineSuporteDeTI = {
  tipo: "projeto",
  titulo: "Meu Portifolio Online",
  descricao: "Website completo desenvolvido para exibição do meu portifólio (esse em que você está agora). Utiliza tecnologias de desenvolvimento web diversas como HTML5, CSS3 e Javascript.",
  repositorio: "https://github.com/HeMoreira/Meu-Portifolio-Online",
  media: { tipo: "video", src: VIDEOS.meuPortifolioOnline },
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
        descricao: "Com a base definida, usei agentes de IA para fazer o trabalho braçal.",
      },
      {
        titulo: "Revisão e Ajustes",
        descricao: "Para garantir que o resultado fosse adequado, múltiplos testes e correções foram aplicadas.",
      },
    ],
    tecnologias: ["Javascript", "HTML5","CSS3","Git","ChatGPT","Documentação"],
  },
}

const examFlowAutomationSuporteDeTI = {
  tipo: "projeto",
  titulo: "Exam Flow Automation",
  descricao: "Projeto de automação com agentes de IA. A automação resumiu um processo que demorava mais de 30 horas para menos de 4 horas (1 hora e meia para a geração + 2 horas de verificação manual).",
  repositorio: "https://github.com/HeMoreira/Examflow-automation",
  media: { tipo: "video", src: VIDEOS.examflowAutomation },
  metricas: [
    { rotulo: "Poupança de tempo", valor: 95 },
    { rotulo: "Automação de processos", valor: 80 },
    { rotulo: "Qualidade do código", valor: 90 },
    { rotulo: "Cobertura da documentação", valor: 95 },
  ],
  detalhes: {
    resumo: "Criar provas para o meu newsletter do LinkedIn tomava tempo demais da minha rotina e, apesar de ser um processo complexo, consegui usar agentes de IA para automatizar o processo por meio de um script de automação com Langgraph (Python).",
    etapas: [
      {
        titulo: "Identificação do Problema",
        descricao: "Criar provas para a minha newletter demorava tempo demais, tendo me custado mais de 90 horas para a leva de conteúdo de HTML5 (nível Básico e Intermediário) e cerca de 70 horas para a leva de conteúdo de CSS3 (nível Básico e Intermediário). Embora eu tenha conseguido poupar muito tempo da primeira leva para a segunda com o que eu aprendi, enxerguei uma possibilidade de automatizar o processo com agentes de inteligência artificial.",
      },
      {
        titulo: "Busca pela solução",
        descricao: "Não tinha conhecimento técnico específico para a criação de automações, mas com um pouco de estudo e desenvolvimento orientado a inteligência artificial, consegui arquitetar um plano de desenvolvimento robusto que vai do planejamento das questões até a adição automática das mesmas no google forms.",
      },
      {
        titulo: "Entrega satisfatória",
        descricao: "Com algumas boas horas de trabalho, consegui finalizar a primeira entrega satisfatória em menos de 7 dias, o que reduziu o tempo médio para a geração de provas em 750%.",
      },
    ],
    tecnologias: ["Langgraph", "Python", "Pytest", "JSON", "Claude", "ChatGPT", "Gemini", "API Google Forms", "API Google Drive", "SQLite"],
  },
}

const uniEletronicsSuporteDeTI = {
  tipo: "projeto",
  titulo: "UniElectronics Projeto Uninove",
  descricao: "Projeto CRUD desenvolvido em ASP.NET com Razor Pages com meu grupo da faculdade. Utiliza tecnologias diversas como HTML5, CSS3, Javascript e outras tecnologias relacionadas ao ASP.NET.",
  repositorio: "https://github.com/HeMoreira/UniEletronicsProjetoUninove",
  media: { tipo: "video", src: VIDEOS.uniEletronics },
  metricas: [
    { rotulo: "Trabalho em equipe", valor: 90 },
    { rotulo: "Planejamento", valor: 85 },
    { rotulo: "Separação de tarefas", valor: 95 },
    { rotulo: "Cumprimento de prazos", valor: 95 },
  ],
  detalhes: {
    resumo: "O projeto inteiro foi desenvolvido com o uso de inteligência artificial, mas o maior aprendizado foi o trabalho em equipe. Com um prazo curto e limitações de horário, a organização e divisão de tarefas foram essenciais para a entrega satisfatória do projeto.",
    etapas: [
      {
        titulo: "Definição do Escopo",
        descricao: "Sendo um projeto de conclusão de semestre, tinha prazo limite de entrega. Por muitos membros não terem um computador capaz de suportar o Visual Studio, o tempo de desenvolvimento era muito limitado ao período dado pelo professor em aula, o que nos forçou a tomar muito cuidado para não acabar com um escopo de projeto que simplesmente não poderia ser finalizado.",
      },
      {
        titulo: "Divisão de tarefas",
        descricao: "Foi definido que iríamos utilizar um projeto já desenvolvido no Visual Studio Code como base para poupar tempo, então após converter o conteúdo para um projeto no modelo ASP.NET, definimos páginas e processos específicos pelos quais cada membro seria responsável.",
      },
      {
        titulo: "Entrega satisfatória",
        descricao: "Considerando o prazo e as limitações de horário, conseguimos entregar um resultado bastante satisfatório até o dia da entrega.",
      },
    ],
    tecnologias: ["Trabalho em equipe", "ASP.NET", "HTML5", "CSS3", "Javascript", "C#", "SQLite", "Bibliotecas ASP.NET"],
  },
}

const torneSeUmProgramadorMelhorNewsletter = {
  tipo: "projeto",
  titulo: "Torne-se um Programador Melhor - Newsletter",
  descricao: "Newsletter do LinkedIn focada em servir como conteúdo diferente do habitual para ajudar pessoas nos estudos de programação.",
  media: { tipo: "video", src: VIDEOS.newsletterLinkedin },
  metricas: [
    { rotulo: "Poupança de tempo", valor: 95 },
    { rotulo: "Automação de processos", valor: 80 },
    { rotulo: "Qualidade do código", valor: 90 },
    { rotulo: "Cobertura da documentação", valor: 95 },
  ],
  detalhes: {
    resumo: "'Porque o mundo já está cheio de cursos de 'Programação Básica com Python', então vamos fazer algo diferente...'",
    etapas: [
      {
        titulo: "Surgimento e propósito",
        descricao: "Tendo surgido da minha vontade de compartilhar conhecimento de forma gratuita, mas também da minha frustração com a quantidade de conteúdo já existente para ensinar o básico, o newsletter tem como foco ensinar de forma profunda conteúdo que raramente é abordado em cursos convencionais, mas que proporcionam valor real no dia a dia como desenvolvedor, além de provas focadas em revisão para evitar o esquecimento dos fundamentos enquanto nos aprofundamos em conteúdo mais avançado.",
      },
      {
        titulo: "Conteúdo e dificuldades",
        descricao: "Não é fácil identificar conteúdo que vive nas trincheiras de assuntos mais convencionais, mas eu sigo estudando para fortalecer meus conhecimentos e descobrir mais formas de expressar o que eu sei para tornar meu conteúdo cada vez mais simples e completo.",
      },
    ],
    tecnologias: ["Canva", "LinkedIn", "Criação de Conteúdo", "Pesquisa e aprendizado contínuo", "HTML5", "CSS3", "Modelagem Matemática", "Prompt Engineering"],
  },
}

const imaginariaImobiliaria = {
  tipo: "projeto",
  titulo: "Imaginaria-Imobiliária",
  descricao: "Website completo para anúncio e venda de imóveis com o objetivo de ser simples e robusto. Design pensado nos usuários considerando o público alvo antes de qualquer decisão.",
  repositorio: "https://github.com/HeMoreira/imaginaria-imobiliaria",
  media: {
    tipo: "video",
    src: VIDEOS.imaginariaImobiliaria,
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
}

const imaginariaImobiliariaDesenvolvedorDeIA = {
  tipo: "projeto",
  titulo: "Imaginaria-Imobiliária",
  descricao: "Website completo para anúncio e venda de imóveis com o objetivo de ser simples e robusto. Desenvolvido por completo em um mês com segurança avançada, código organizado e design limpo com a ajuda de agentes de IA.",
  repositorio: "https://github.com/HeMoreira/imaginaria-imobiliaria",
  media: {
    tipo: "video",
    src: VIDEOS.imaginariaImobiliaria,
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
}

const brawlStarsBrawlerPicker = {
  tipo: "projeto",
  titulo: "Brawl Stars Brawler Picker",
  descricao: "Website completo desenvolvido para comparar dados complexos de diferentes personagens do jogo 'Brawl Stars' com o objetivo de encontrar as combinações mais favoráveis.",
  repositorio: "https://github.com/HeMoreira/Brawl-Stars-Brawler-Picker",
  media: { tipo: "video", src: VIDEOS.brawlerPicker },
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
}

const brawlStarsBrawlerPickerDesenvolvedorDeIA = {
  tipo: "projeto",
  titulo: "Brawl Stars Brawler Picker",
  descricao: "Website completo desenvolvido para comparar dados complexos de diferentes personagens do jogo 'Brawl Stars' com o objetivo de encontrar as combinações mais favoráveis.",
  repositorio: "https://github.com/HeMoreira/Brawl-Stars-Brawler-Picker",
  media: { tipo: "video", src: VIDEOS.brawlerPicker },
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
}

const professorPython = {
  tipo: "experiencia",
  titulo: "Professor de Python",
  descricao: "Entre agosto de 2025 e fevereiro de 2026, fui professor pessoal de Python para amigos de conhecidos, o que me deu experiência real com comunicação clara e didática.",
  media: { tipo: "video", src: VIDEOS.professorPython },
  metricas: [
    { rotulo: "Organização", valor: 90 },
    { rotulo: "Preparo de apresentações", valor: 90 },
    { rotulo: "Didática e Comunicação", valor: 95 },
    { rotulo: "Experiência Real", valor: 90 },
  ],
  detalhes: {
    resumo: "Já possuia o hábito de ensinar programação para meu pai e amigos de forma casual, mas a partir de agosto de 2025 o serviço evoluiu para aulas pagas para pais e conhecidos mais velhos de alguns dos meus amigos.",
    etapas: [
      {
        titulo: "Preparação de apresentações",
        descricao: "Antes de cada aula, preparei aprentações com o Canva e Powerpoint para facilitar o aprendizado.",
      },
      {
        titulo: "Didática e Paciência",
        descricao: "Como a maioria dos alunos tinha mais de 40 anos, me esforçei para apresentar o conteúdo de forma didática, parando para entender os problemas dos alunos assim que surgissem com calma e empatia.",
      },
      {
        titulo: "Aprendizado contínuo",
        descricao: "Analisando o perfil dos alunos, fui adaptando o material continuamente para associar os problemas novos à antigos e facilitar o aprendizado.",
      },
    ],
    tecnologias: ["Python","Powerpoint","Canva","Documentação","Didática e comunicação"],
  },
}

const formacaoTecnicoEmInformatica = {
  tipo: "experiencia",
  titulo: "Formação Técnico em Informática",
  descricao: "Curso técnico de informática realizado na FIOCRUZ que inclui conteúdos de matérias variadas na área de Desenvolvimento, Operação de Hardware e Software, Redes, Infraestrutura e mais.",
  media: { tipo: "imagem", src: "projetos/formacao_tecnico_informatica.webp" },
  metricas: [
    { rotulo: "Desenvolvimento de Sistemas", valor: 95 },
    { rotulo: "Operação de Hardware e Software", valor: 90 },
    { rotulo: "Redes e Segurança Digital", valor: 80 },
    { rotulo: "Trabalho em Equipe", valor: 95 },
  ],
  detalhes: {
    resumo: "O curso incluiu aulas práticas e teóricas relacionadas a conceitos de Arquitetura de Redes, Segurança Digital, Análise e Desenvolvimento de Sistemas, Lógica de Programação, Programação Orientada a Objetos (POO), Operação de Hardware e Software, Desenvolvimento Web, entre outras matérias. Com ótimos professores, o curso prepara bem os alunos para os desafios reais do mercado de trabalho.",
    tecnologias: ["Operação de Hardware", "Operação de Software", "Manutenção de computadores", "Arquitetura de Redes", "Desenvolvimento de Sistemas", "Lógica de Programação", "Segurança Digital", "Solucionamento de Problemas", "Pacote Office"],
  },
}

const consultationStation = {
  tipo: "projeto",
  titulo: "Consultation Station",
  descricao: "Sistema web completo para agendamento de consultas. Permite que clientes marquem consultas, enquanto administradores podem gerenciar e visualizar todos os agendamentos.",
  repositorio: "https://github.com/HeMoreira/Consultation-Station",
  media: { tipo: "video", src: VIDEOS.consultationStation },
  metricas: [
    { rotulo: "Integração com Backend", valor: 85 },
    { rotulo: "Desenvolvimento de Testes", valor: 90 },
    { rotulo: "Escalabilidade", valor: 70 },
    { rotulo: "Design de Interfaces", valor: 55 },
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
      "HTML5",
      "CSS3",
      "Javascript",
      "Git",
      "Github",
      "Integração com Backend",
    ],
  },
}

const aiTests = {
  tipo: "projeto",
  titulo: "AI-Tests",
  descricao: "Projeto com o objetivo de testar e avaliar diferentes modelos de IA. Foco em testagem e documentação para solucionar problemas de eficiência e agilizar processos.",
  repositorio: "https://github.com/HeMoreira/AI-Tests",
  media: { tipo: "video", src: VIDEOS.aiTests, alt: "Vídeo ilustrativo do projeto" },
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
}

export const CATALOGO = {
  "formacao-analise-e-desenvolvimento-de-sistemas": formacaoAnaliseDesenvolvimentoSistemas,

  "meu-portifolio-online-desenvolvedor-frontend": meuPortifolioOnlineDesenvolvedorFrontend,

  "meu-portifolio-online-desenvolvedor-de-ia": meuPortifolioOnlineDesenvolvedorDeIA,

  "meu-portifolio-online-suporte-de-ti": meuPortifolioOnlineSuporteDeTI,

  "exam-flow-automation-suporte-de-ti": examFlowAutomationSuporteDeTI,

  "uni-eletronics-suporte-de-ti": uniEletronicsSuporteDeTI,

  "torne-se-um-programador-melhor-newsletter": torneSeUmProgramadorMelhorNewsletter,

  "imaginaria-imobiliaria": imaginariaImobiliaria,

  "imaginaria-imobiliaria-desenvolvedor-de-ia": imaginariaImobiliariaDesenvolvedorDeIA,

  "brawl-stars-brawler-picker": brawlStarsBrawlerPicker,

  "brawl-stars-brawler-picker-desenvolvedor-de-ia": brawlStarsBrawlerPickerDesenvolvedorDeIA,

  "professor-python": professorPython,

  "formacao-tecnico-em-informatica": formacaoTecnicoEmInformatica,
  "ai-tests": aiTests,
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
