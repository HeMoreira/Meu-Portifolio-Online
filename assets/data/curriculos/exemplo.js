/* ==========================================================================
   Dados de EXEMPLO — usados apenas pela página /styleguide/.
   É também o modelo para os seis currículos reais (etapa 2): copie este
   arquivo para {slug}.js e troque o conteúdo. Nenhum HTML aqui.

   Caminhos de mídia são relativos à CATEGORIA:
     imagens → assets/images/<categoria>/…   (ex.: "competencias/html.svg")
     vídeos  → assets/videos/<categoria>/…   (ex.: "projetos/demo.mp4")
   Dois currículos podem apontar para o MESMO arquivo — não copie mídia.

   Projetos e experiências vivem no catálogo central (assets/data/projetos.js).
   Ids (projeto.id, certificacao.id) viram âncoras (#projeto-{id},
   #certificacao-{id}) e são usados em competencias[].relacao.
   ========================================================================== */

import { criarAnos } from "../projetos.js";

/** Item de exemplo. Nos currículos reais estes dados vivem em assets/data/projetos.js. `video` usa um arquivo que não existe: só mostra o botão. */
function exemploItem(n, tipo, video = false) {
  return {
    tipo,
    titulo: n === 2 ? "Título propositalmente mais longo para testar a quebra de linha do cartão" : `Exemplo ${n}`,
    descricao:
      n === 3
        ? "Um resumo bem mais longo para provar que todos os cards de um ano têm a mesma altura: quando o parágrafo de um cresce, os demais acompanham. Contexto, problema, solução, o seu papel e os resultados alcançados."
        : "Resumo curto do item: o problema, a solução e o seu papel.",
    repositorio: tipo === "projeto" ? "https://github.com/" : null,
    media: video
      ? { tipo: "video", src: "projetos/exemplo.mp4", alt: "Vídeo de exemplo" }
      : { tipo: "imagem", src: "projetos/placeholder.svg", alt: "Imagem de exemplo" },
    metricas: [
      { rotulo: "Desempenho", valor: 90 },
      { rotulo: "Acessibilidade", valor: 100 },
      { rotulo: "Boas práticas", valor: 80 },
      { rotulo: "Documentação", valor: 45 },
    ],
    detalhes: {
      resumo: "Texto mais completo exibido no modal.",
      etapas: ["Planejamento", "Execução", "Entrega"],
      tecnologias: ["HTML5", "CSS3", "JavaScript"],
    },
  };
}

/** Catálogo local do styleguide: ids "p{n}" (projeto), "e{n}" (experiência), "v" (com vídeo). */
const CATALOGO_EXEMPLO = Object.fromEntries([
  ...[1, 2, 3, 4, 5, 6].flatMap((n) => [
    [`p${n}`, exemploItem(n, "projeto")],
    [`e${n}`, exemploItem(n, "experiencia")],
  ]),
  ["v", exemploItem(1, "projeto", true)],
]);

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
        relacao: { tipo: "projeto", id: "p1" },
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
        relacao: { tipo: "experiencia", id: "e2" },
      },
      {
        titulo: "Sem botão de relação",
        descricao: "O botão é opcional: sem `relacao`, o card mostra apenas imagem, título e descrição.",
        imagem: "competencias/placeholder.svg",
      },
    ],
  },

  projetos: {
    intro: "Cada ano do roadmap tem a sua lista: 0 itens (vazio), 1 (card único) ou 2+ (carrossel infinito).",
    // Aqui só ids e ordem (o catálogo é local, pois este arquivo é só o styleguide).
    anos: criarAnos(
      {
        2021: { itens: ["p1"] },
        2022: { itens: ["p1", "e2"] },
        2023: { itens: ["p1", "e2", "p3"] },
        2024: { itens: ["p1", "e2", "p3", "e4"] },
        2025: { itens: ["p1", "e2", "p3", "e4", "p5", "e6"] },
        2026: { itens: ["v", "e2"] },
      },
      { de: 2020, ate: 2026, catalogo: CATALOGO_EXEMPLO },
    ),
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
