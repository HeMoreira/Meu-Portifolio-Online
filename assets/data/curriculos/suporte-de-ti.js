/* Currículo: Suporte de TI — só conteúdo. Marcadores [Exemplo] = substituir. */
import { PERFIL, contatos } from "../perfil.js";

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
        relacao: { tipo: "projeto", id: "meu-portifolio-online" },
      },
      {
        titulo: "Comunicação e Didática",
        descricao: "Facilidade de comunicação e ensino com pessoas de todas as idades.",
        imagem: "competencias/codigo.svg",
        relacao: { tipo: "projeto", id: "professor-python" },
      },
    ],
  },

  projetos: {
    intro: "Projetos diversos que demonstram minhas capacidades na prática.",
    itens: [
      {
        id: "ai-tests",
        titulo: "AI-Tests",
        descricao:
          "Projeto com o objetivo de testar e avaliar diferentes modelos de IA. Foco em testagem e documentação para solucionar problemas de eficiência e agilizar processos.",
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
            { titulo: "Definição dos requisitos", descricao: "Planejamento do objetivo a ser alcançado, critérios de avaliação justos, seleção das LLMs, etc." },
            { titulo: "Análise cuidadosa", descricao: "Cada teste foi realizado com cautela para garantir um resultado agradável e funcional considerando o objetivo final da avaliação." },
            { titulo: "Anotações organizadas", descricao: "Ferranentas como o Trello e o Word foram utilizadas para anotar os resultados obtidos." },
            { titulo: "Desenvolvimento da apresentação", descricao: "Para garantir que o resultado fosse apresentável ao público geral, os documentos desenvolvidos foram reorganizados em uma apresentação simples e curta feita pelo Canva/Powerpoint e que foca só no essencial." },
          ],
          tecnologias: ["ChatGPT", "Claude", "Copilot", "DeepSeek", "Gemini", "Powerpoint", "Word", "Canva", "Documentação", "Trello"],
        },
      },
      {
        id: "meu-portifolio-online",
        titulo: "Meu Portifolio Online",
        descricao:
          "Website completo desenvolvido para exibição do meu portifólio (esse em que você está agora). Utiliza tecnologias de desenvolvimento diversas como HTML5, CSS3 e Javascript.",
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
            { titulo: "Definição dos requisitos", descricao: "Mapeamento dos problemas que a página precisava resolver. Precisei considerar os tipos de usuários que consumiriam a página e encontrar um equilíbrio entre múltiplas funcionalidades e escalabilidade." },
            { titulo: "Desenvolvimento com IA", descricao: "Com a base definida, usei agentes de IA para fazerem o trabalho braçal." },
            { titulo: "Revisão e Ajustes", descricao: "Para garantir que o resultado fosse adequado, múltiplos testes e correções foram aplicadas." },
          ],
          tecnologias: ["HTML5", "CSS3", "Git", "ChatGPT", "Documentação", "Javascript"],
        },
      },
      {
        id: "professor-python",
        titulo: "Professor de Python",
        descricao:
          "Entre agosto de 2025 e fevereiro de 2026, fui professor de Python para alguns senhores de idade, o que me deu experiência real com comunicação clara e didática.",
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
            { titulo: "Preparação de apresentações", descricao: "Antes de cada aula, preparei aprentações com o Canva e Powerpoint para facilitar o aprendizado." },
            { titulo: "Didática e Paciência", descricao: "Como a maioria dos alunos tinha mais de 50 anos, me esforçei para apresentar o conteúdo de forma didática, parando para entender os problemas dos alunos assim que surgissem com calma e empatia." },
            { titulo: "Aprendizado contínuo", descricao: "Analisando o perfil dos alunos, fui adaptando o material continuamente para associar os problemas novos à antigos e facilitar o aprendizado." },
          ],
          tecnologias: ["Python", "Powerpoint", "Canva", "Documentação", "Didática e comunicação"],
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
