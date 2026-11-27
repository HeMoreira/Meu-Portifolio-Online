/* ==========================================================================
   Dados de EXEMPLO — usados apenas pela página /styleguide/.
   É também o modelo para os seis currículos reais (etapa 2): copie este
   arquivo para {slug}.js e troque o conteúdo. Nenhum HTML aqui.

   Caminhos de mídia são relativos à CATEGORIA:
     imagens → assets/images/<categoria>/…   (ex.: "competencias/html.svg")
     vídeos  → assets/videos/<categoria>/…   (ex.: "projetos/demo.mp4")
   Dois currículos podem apontar para o MESMO arquivo — não copie mídia.

   Projetos e experiências vivem no catálogo central (assets/data/projetos.js).
   Competências e certificações também vivem em catálogos centrais (assets/data/competencias.js,
   assets/data/certificacoes.js); aqui usamos catálogos locais só para o styleguide.
   Ids (projeto.id, certificacao.id) viram âncoras (#projeto-{id},
   #certificacao-{id}) e são usados em competencias[].relacao.
   ========================================================================== */

import { criarAnos } from "../projetos.js";
import { criarCertificacoes } from "../certificacoes.js";
import { criarCompetencias } from "../competencias.js";

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
    // n = 3 usa o formato em BLOCOS (modal montado do jeito que este item quiser);
    // os demais, o formato resumido { resumo, tecnologias, etapas }.
    detalhes:
      n === 3
        ? [
            { tipo: "dados", titulo: "Ficha do projeto", itens: [{ rotulo: "Duração", valor: "3 semanas" }, { rotulo: "Equipe", valor: "Individual" }, { rotulo: "Papel", valor: "Design e código" }] },
            { tipo: "lista", titulo: "Resultados", itens: ["Pontuação 100 em acessibilidade", "Zero dependências"] },
            { tipo: "texto", titulo: "Aprendizados", texto: ["Primeiro parágrafo livre.", "Segundo parágrafo livre."] },
            { tipo: "acoes", itens: [{ rotulo: "Ver online", href: "https://example.com", icone: "external" }] },
          ]
        : {
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

/** Certificações de exemplo (nos currículos reais: assets/data/certificacoes.js). */
const CATALOGO_CERTIFICACOES_EXEMPLO = {
  // todos os campos opcionais preenchidos; imagem horizontal
  c1: {
    titulo: "Certificação completa",
    descricao: "Preenche todos os campos opcionais do modal.",
    imagem: "certificacoes/certificado-devops-e-agile-culture-fiap.jpeg",
    organizacao: "Instituição de exemplo",
    cargaHoraria: 40,
    emissao: "2025-03-14",
    expiracao: "2028-03",
    credencial: { codigo: "ABC-123-XYZ", url: "https://example.com/credencial" },
    competencias: ["Competência extra do catálogo"],
  },
  // imagem VERTICAL: aparece inteira e as laterais são preenchidas pelo fundo borrado
  c2: {
    titulo: "Certificado em retrato (imagem vertical)",
    descricao: "A imagem nunca é cortada; o espaço lateral recebe uma versão borrada dela.",
    imagem: "certificacoes/certificado-cursa-excel.png",
    organizacao: "Cursa",
    cargaHoraria: 1,
    emissao: "2025-02",
    expiracao: "nunca",
  },
  // sem nenhum campo de detalhes: o card não mostra o botão
  c3: {
    titulo: "Certificação com descrição longa e sem detalhes",
    descricao:
      "Cards aceitam descrições mais extensas sem quebrar o grid: a altura se ajusta ao conteúdo, os cards da mesma linha se igualam e o botão de detalhes (quando existe) fica sempre no fim do card.",
    imagem: "certificacoes/certificado-ef-set-ingles.jpeg",
    imagemAlt: "Certificado de exemplo",
  },
  // modal personalizado: blocos próprios, na ordem desejada
  c4: {
    titulo: "Certificação com modal personalizado",
    descricao: "O modal é montado com blocos escolhidos por esta certificação.",
    imagem: "certificacoes/placeholder.svg",
    imagemAlt: "Certificado de exemplo",
    detalhes: [
      { tipo: "texto", texto: "Um texto livre antes dos dados." },
      { tipo: "dados", titulo: "Resumo", itens: [{ rotulo: "Nível", valor: "Intermediário" }, { rotulo: "Idioma", valor: "Português" }] },
      { tipo: "lista", titulo: "O que foi estudado", itens: ["Tópico um", "Tópico dois", "Tópico três"] },
      { tipo: "competencias" },
    ],
  },
  // imagem horizontal e só a organização
  c5: {
    titulo: "Certificação mínima",
    descricao: "Só organização e data.",
    imagem: "certificacoes/certificado-fundamentos-de-ti-bradesco.jpeg",
    organizacao: "Outra instituição",
    emissao: "2024-11",
  },
};

/** Competências de exemplo (catálogo local; nos currículos reais vivem em assets/data/competencias.js). */
const CATALOGO_COMPETENCIAS_EXEMPLO = {
  k1: {
    titulo: "Competência com projeto",
    descricao: "Descrição curta do que você domina e como aplica no dia a dia.",
    imagem: "competencias/placeholder.svg",
    relacao: { tipo: "projeto", id: "p1" },
  },
  k2: {
    titulo: "Competência com certificado",
    descricao: "Cards com descrições de tamanhos diferentes mantêm o botão alinhado na base, graças ao layout flexível. Este texto é propositalmente mais longo para demonstrar isso.",
    imagem: "competencias/placeholder.svg",
    relacao: { tipo: "certificacao", id: "c1" },
  },
  k3: {
    titulo: "Outra competência",
    descricao: "Aponta para o segundo projeto.",
    imagem: "competencias/placeholder.svg",
    relacao: { tipo: "experiencia", id: "e2" },
  },
  k4: {
    titulo: "Sem botão de relação",
    descricao: "O botão é opcional: sem `relacao`, o card mostra apenas imagem, título e descrição.",
    imagem: "competencias/placeholder.svg",
  },
};

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
    itens: criarCompetencias(["k1", "k2", "k3", "k4"], CATALOGO_COMPETENCIAS_EXEMPLO),
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
    // Só ids; o catálogo é local porque este arquivo é o styleguide.
    itens: criarCertificacoes(["c1", "c2", "c3", "c4", "c5"], CATALOGO_CERTIFICACOES_EXEMPLO),
  },
};
