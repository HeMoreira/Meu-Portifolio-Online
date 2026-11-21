/* Currículo: Desenvolvedor Front-End — só conteúdo. Marcadores [Exemplo] = substituir. */
import { PERFIL, contatos } from "../perfil.js";

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
    itens: [
      {
        id: "imaginaria-imobiliaria",
        titulo: "Imaginaria-Imobiliária",
        descricao:
          "Website completo para anúncio e venda de imóveis com o objetivo de ser simples e robusto. Design pensado nos usuários considerando o público alvo antes de qualquer decisão.",
        repositorio: "https://github.com/HeMoreira/imaginaria-imobiliaria",
        media: { tipo: "video", src: "projetos/imaginaria_imobiliaria_project.mp4", alt: "Vídeo ilustrativo do projeto" },
        metricas: [
          { rotulo: "Design de Interfaces", valor: 80 },
          { rotulo: "Processo de testagem", valor: 80 },
          { rotulo: "Documentação de processos", valor: 65 },
          { rotulo: "Integração com backend", valor: 95 },
        ],
        detalhes: {
          resumo: "Esse projeto não vive apenas de interface escalável e responsiva. Todo o design precisou ser pensado considerando um público alvo mais velho, além de ter sido integrado à um sistema CRUD real com foco em segurança e robustês.",
          etapas: [
            { titulo: "Pesquisa de Design", descricao: "Antes mesmo de abrir o editor de código, pesquisei por alguns websites de venda de imóveis e analisei com calma cada detalhe." },
            { titulo: "Definição dos requisitos", descricao: "Após entender as necessidades do cliente e produto, comecei a definir o que era necessário para garantir uma boa experiência de usuário e conforto visual. Tudo integrado a um sistema real desenvolvido com o framework Flask" },
            { titulo: "Vibe Coding consciente", descricao: "Com a base definida, usei agentes de IA para fazerem o trabalho braçal. Algumas horas refinando os prompts ajudaram a garantir que o resultado cumprisse os requisitos." },
            { titulo: "Revisão e Ajustes", descricao: "Mesmo com todo o cuidado, sempre sobra algum ponto fora da curva. Felizmente, com minha bagagem técnica nas tecnologias utilizadas, não tive dificuldade em perceber e corrigir cada imprecisão." },
          ],
          tecnologias: ["UX", "UI", "HTML5", "CSS3", "Javascript", "Jinja2", "Prompt Engineering", "Claude", "Gemini", "Git", "Integração com Backend", "Pesquisa"],
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
          resumo: "Esse projeto foi escrito quase inteiramente por modelos de IA, mas antes de qualquer prompt, existiu um planejamento profundo que olhou para a escalabilidade e resistência a atualizações antes de escrever qualquer linha, além do cuidado em criar uma identidade visual única.",
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
          resumo: "Esse projeto me forçou a pensar fora da caixa no quesito design, já que IAs são excelentes para resolver problemas comuns com design moderno, mas podem apresentar dificuldades quando precisam lidar com a apresentação de muitas informações ou uma escolha artística mais específica.",
          etapas: [
            { titulo: "Definição dos requisitos", descricao: "O site usa matemática complexa para apresentar ao usuário múltiplas informações sobre os brawlers. Isso significa que manter o design limpo seria um desafio que precisava de atenção redobrada para dar várias opções para quem quer detalhes, mas sem poluir demais para quem só quer o resultado mais simples e rápido." },
            { titulo: "Vibe Coding consciente", descricao: "Com a base definida, usei agentes de IA para fazerem o trabalho braçal. Algumas horas refinando os prompts ajudaram a garantir que o resultado cumprisse os requisitos." },
            { titulo: "O problema do design moderno genérico", descricao: "O código entregue possuia os mesmos elementos comuns de designs modernos genéricos de sempre, o que costuma funcionar bem, mas quando eu vi essa estética ao lado da imagem dos brawlers e seus seletores com uma estética muito mais colorida e cartunesca, logo ficou claro que aquilo não iria funcionar. Os inputs de nome, cards e status simplesmente não conversavam com as imagens ao lado." },
            { titulo: "Revisão e Ajustes", descricao: "Com os vários problemas descobertos na fase anterior, o objetivo aqui não era só ajustar, mas buscar refazer o estilo de vários elementos para que o site seguisse uma única estética que remetesse ao jogo, gerando familiaridade com o público alvo e mantendo a coesão entre os múltiplos elementos da página." },
          ],
          tecnologias: ["UX", "UI", "HTML5", "CSS3", "Javascript", "Prompt Engineering", "Claude", "ChatGPT", "Gemini", "Git", "Github", "Excel", "Integração com Backend"],
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
