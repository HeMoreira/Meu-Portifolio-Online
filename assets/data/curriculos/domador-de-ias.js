/* Currículo: Domador de IAs — só conteúdo. Marcadores [Exemplo] = substituir. */
import { PERFIL, contatos } from "../perfil.js";

export default {
  perfil: { ...PERFIL, funcao: "Engenheiro de IA" },

  sobre: {
    paragrafos: [
      "Estudante do 3º semestre da graduação em Análise e Desenvolvimento de Sistemas, sou formado como técnico em informática na Fundação Oswaldo Cruz e estou aberto a oportunidades como estagiário ou Júnior na área de Engenharia de IA.",
      "Possuo conhecimento variado na área de desenvolvimento, o que inclui Design de Interfaces; Conceitos de UI e UX; Tecnologias como HTML5, CSS3 e Javascript; Prompt Engineering e uso de LLMs no fluxo de trabalho; Versionamento de código e trabalho em equipe com Git/Github; Conhecimento em linguagens de programação como Python e C#; Aplicações de uso variado (Excel, Word, Powerpoint, Canva, etc.) e muito mais.",
      "Possuo ainda uma grande bagagem como desenvolvedor frontend, backend e suporte de TI, além de estar sempre disposto a usar meu repertório para aprender algo novo, fazendo de mim um profissional muito versátil e eficiente em minhas entregas.",
    ],
    links: contatos("email", "linkedin", "github"),
  },

  competencias: {
    intro: "Não sou apenas um Vibe Coder. Sei o que pedir porque conheço as ferramentas e o processo.",
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
        titulo: "Prompt Engineering",
        descricao: "Traduzo intenção em instruções claras para modelos de linguagem.",
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
    intro: "Sites completos desenvolvidos com foco em segurança, escalabilidade e design.",
    itens: [
      {
        id: "imaginaria-imobiliaria",
        titulo: "Imaginaria-Imobiliária",
        descricao:
          "Website completo para anúncio e venda de imóveis com o objetivo de ser simples e robusto. Desenvolvido por completo em um mês com segurança avançada, código organizado e design limpo com a ajuda de agentes de IA.",
        repositorio: "https://github.com/HeMoreira/imaginaria-imobiliaria",
        media: { tipo: "video", src: "projetos/imaginaria_imobiliaria_project.mp4", alt: "Vídeo ilustrativo do projeto" },
        metricas: [
          { rotulo: "Design de Interfaces", valor: 80 },
          { rotulo: "Processo de testagem", valor: 80 },
          { rotulo: "Documentação de processos", valor: 65 },
          { rotulo: "Integração com backend", valor: 95 },
        ],
        detalhes: {
          resumo: "Desenvolvido com o Framework Flask, o website de anúncio de imóveis possui um alto nível de segurança com sistema CRUD completo, autenticação, integração com banco de dados, integração com um sistema de mapas e muito mais. Tudo desenvolvido em 1 mês com foco em escalabilidade, segurança e design responsivo.",
          etapas: [
            { titulo: "Pesquisa de Design", descricao: "Antes mesmo de abrir o editor de código, pesquisei por alguns websites de venda de imóveis e analisei com calma cada detalhe." },
            { titulo: "Definição dos requisitos", descricao: "Após entender as necessidades do cliente e produto, comecei a definir o que era necessário para garantir uma boa experiência de usuário e conforto visual. Tudo integrado a um sistema real desenvolvido com o framework Flask" },
            { titulo: "Vibe Coding consciente", descricao: "Com a base definida, usei agentes de IA para fazerem o trabalho braçal. Algumas horas refinando os prompts ajudaram a garantir que o resultado cumprisse os requisitos." },
            { titulo: "Revisão e Ajustes", descricao: "Mesmo com todo o cuidado, sempre sobra algum ponto fora da curva. Felizmente, com minha bagagem técnica nas tecnologias utilizadas, não tive dificuldade em perceber e corrigir cada imprecisão." },
          ],
          tecnologias: ["SQLAlchemy", "Flask", "Python", "Segurança", "UX", "UI", "HTML5", "CSS3", "Javascript", "Jinja2", "Prompt Engineering", "Claude", "Gemini", "Git", "Sistema de Logs", "Leaflet (biblioteca javascript)"],
        },
      },
      {
        id: "meu-portifolio-online",
        titulo: "Meu Portifolio Online",
        descricao:
          "Website completo desenvolvido para exibição do meu portifólio (esse em que você está agora). Desenvolvido com IA, mas com cuidado em design, escalabilidade, responsividade e mais.",
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
            { titulo: "Definição dos requisitos", descricao: "O site precisava funcionar independentemente de currículo, apresentando minhas capacidades para variados grupos de pessoa interessadas em diferentes habilidades. Toda a estrutura e design precisou ser desenvolvida considerando todos esses fatores." },
            { titulo: "Vibe Coding consciente", descricao: "Com a base definida, usei agentes de IA para fazerem o trabalho braçal. Algumas horas refinando os prompts ajudaram a garantir que o resultado cumprisse os requisitos." },
            { titulo: "Revisão e Ajustes", descricao: "Mesmo com todo o cuidado, sempre sobra algum ponto fora da curva. Felizmente, com minha bagagem técnica nas tecnologias utilizadas, não tive dificuldade em perceber e corrigir cada imprecisão." },
          ],
          tecnologias: ["UX", "UI", "HTML5", "CSS3", "Javascript", "Prompt Engineering", "Claude", "ChatGPT", "Git", "Github"],
        },
      },
      {
        id: "brawl-stars-brawler-picker",
        titulo: "Brawl Stars Brawler Picker",
        descricao:
          "Website completo desenvolvido para comparar dados complexos de diferentes personagens do jogo 'Brawl Stars' com o objetivo de encontrar as combinações mais favoráveis.",
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
            { titulo: "Definição dos requisitos", descricao: "O site usa matemática complexa para apresentar ao usuário múltiplas informações sobre os brawlers. Desenvolver isso foi um grande desafio tanto para o backend quanto para o frontend, já que era necessário balancear as fórmulas para que trouxessem os resultados esperados e, ao mesmo tempo, o design precisava manter tudo acessível sem poluir a tela." },
            { titulo: "Vibe Coding consciente", descricao: "Com a base definida, usei agentes de IA para fazerem o trabalho braçal. Algumas horas refinando os prompts ajudaram a garantir que o resultado cumprisse os requisitos." },
            { titulo: "O problema do design moderno genérico", descricao: "O código entregue possuia os mesmos elementos comuns de designs modernos genéricos de sempre, o que costuma funcionar bem, mas quando eu vi essa estética ao lado da imagem dos brawlers e seus seletores com uma estética muito mais colorida e cartunesca, logo ficou claro que aquilo não iria funcionar. Os inputs de nome, cards e status simplesmente não conversavam com as imagens ao lado." },
            { titulo: "Revisão e Ajustes", descricao: "Com os vários problemas descobertos na fase anterior, o objetivo aqui não era só ajustar, mas buscar refazer o estilo de vários elementos para que o site seguisse uma única estética que remetesse ao jogo." },
          ],
          tecnologias: ["Django", "Python", "SQLite", "UX", "UI", "HTML5", "CSS3", "Javascript", "Prompt Engineering", "Claude", "ChatGPT", "Gemini", "Git", "Github", "Excel", "Integração com Backend"],
        },
      },
    ],
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
