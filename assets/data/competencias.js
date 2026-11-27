/* ==========================================================================
   Catálogo CENTRAL de competências: TODAS as informações de cada competência
   ficam aqui. Os currículos (curriculos/{slug}.js → competencias.itens) só dizem
   QUAIS ids exibir e em que ordem — igual a projetos.js e certificacoes.js.

   Campos de uma competência (a chave é o id):
     titulo, descricao           texto do card
     imagem, imagemAlt?          em assets/images/competencias/…
     relacao?                    { tipo: "projeto" | "experiencia" | "certificacao", id }
                                 liga o botão do card ao item da MESMA página; sem ela, o
                                 botão fica "Indisponível". Se o item não estiver no currículo
                                 que usa a competência, o botão também fica indisponível.

   Os currículos nunca sobrescrevem campos. Precisa de outra relação ou de outro texto em
   um currículo? Crie outra entrada aqui (use `{ ...base, relacao }` para não repetir texto).
   ========================================================================== */

const ferramentasModernas = {
  titulo: "Ferramentas Modernas",
  descricao: "HTML5, CSS3, Javascript, Jinja2, template engines e mais para maior produtividade.",
  imagem: "competencias/ferramentas.svg",
  relacao: { tipo: "certificacao", id: "responsive-web-design" },
};
const interfacesResponsivas = {
  titulo: "Interfaces responsivas",
  descricao: "Layouts fluidos e responsivos com CSS moderno. Priorização da simplicidade com a abordagem mobile first.",
  imagem: "competencias/interface.svg",
  relacao: { tipo: "certificacao", id: "responsive-web-design" },
};
const acessibilidade = {
  titulo: "Acessibilidade",
  descricao: "Semântica, contraste, consciência de público, foco e ARIA aplicados desde o início do projeto.",
  imagem: "competencias/acessibilidade.svg",
  relacao: { tipo: "projeto", id: "meu-portifolio-online" },
};
const desenvolvimentoComIa = {
  titulo: "Desenvolvimento com IA",
  descricao: "Uso de LLMs avançadas no processo de desenvolvimento. Eu cuido apenas da intenção.",
  imagem: "competencias/ia.svg",
  relacao: { tipo: "projeto", id: "meu-portifolio-online" },
};
const designDeInterfaces = {
  titulo: "Design de Interfaces",
  descricao: "Princípios de UI, UX, cores, design e outros. Questiono os resultados da IA com contexto.",
  imagem: "competencias/ideia.svg",
  relacao: { tipo: "certificacao", id: "responsive-web-design" },
};
const pesquisaDePublico = {
  titulo: "Pesquisa de Público",
  descricao: "Não adivinho. Se eu não conheço o público eu pesquiso antes de desenvolver.",
  imagem: "competencias/pesquisa.svg",
  relacao: { tipo: "projeto", id: "imaginaria-imobiliaria" },
};

export const CATALOGO_COMPETENCIAS = {
  /* ---- Front-end / Domador de IAs (compartilhadas) ---- */
  "ferramentas-modernas": ferramentasModernas,
  "interfaces-responsivas": interfacesResponsivas,
  "javascript-moderno": {
    titulo: "JavaScript moderno",
    descricao: "Código modular e legível, sem dependências desnecessárias, com atenção ao desempenho.",
    imagem: "competencias/codigo.svg",
    relacao: { tipo: "projeto", id: "meu-portifolio-online" },
  },
  "acessibilidade": acessibilidade,
  "acessibilidade-domador-de-ias": { ...acessibilidade, relacao: { tipo: "projeto", id: "meu-portifolio-online-domador-de-ias" } },
  "desenvolvimento-com-ia": desenvolvimentoComIa,
  "desenvolvimento-com-ia-domador-de-ias": { ...desenvolvimentoComIa, relacao: { tipo: "projeto", id: "meu-portifolio-online-domador-de-ias" } },
  "design-de-interfaces": designDeInterfaces,
  "performance-e-qualidade": {
    titulo: "Performance e qualidade",
    descricao: "Otimização de carregamento, medição com ferramentas de auditoria e testes de interface.",
    imagem: "competencias/automacao.svg",
  },
  "devops-e-cultura-agil": {
    titulo: "Devops e Cultura Ágil",
    descricao: "Conhecimento de DevOps, Scrum, Kanban, XP e outros. Adaptação a culturas ágeis.",
    imagem: "competencias/rede.svg",
    relacao: { tipo: "certificacao", id: "devops-e-agile-culture" },
  },
  "pesquisa-de-publico": pesquisaDePublico,
  "pesquisa-de-publico-domador-de-ias": { ...pesquisaDePublico, relacao: { tipo: "projeto", id: "imaginaria-imobiliaria-domador-de-ias" } },
  "prompt-engineering": {
    titulo: "Prompt Engineering",
    descricao: "Traduzo intenção em instruções claras para modelos de linguagem.",
    imagem: "competencias/codigo.svg",
    relacao: { tipo: "projeto", id: "meu-portifolio-online-domador-de-ias" },
  },

  /* ---- Suporte de TI ---- */
  "redes-e-conectividade": {
    titulo: "Redes e conectividade",
    descricao: "Diagnóstico de acesso, Wi-Fi, VPN e infraestrutura básica de rede local.",
    imagem: "competencias/rede.svg",
    relacao: { tipo: "certificacao", id: "tecnico-de-informatica" },
  },
  "sistemas-e-manutencao": {
    titulo: "Sistemas e manutenção",
    descricao: "Instalação, configuração e manutenção preventiva de computadores e periféricos.",
    imagem: "competencias/servidor.svg",
    relacao: { tipo: "certificacao", id: "tecnico-de-informatica" },
  },
  "atendimento-ao-usuario": {
    titulo: "Atendimento ao usuário",
    descricao: "Triagem, diagnóstico e resolução de incidentes com comunicação objetiva e empática.",
    imagem: "competencias/suporte.svg",
  },
  "ferramentas-gerais": {
    titulo: "Ferramentas Gerais",
    descricao: "Uso de ferramentas específicas como Canva, Trello, Miro, CapCut, ChatGPT, Manus, etc.",
    imagem: "competencias/ferramentas.svg",
    relacao: { tipo: "projeto", id: "ai-tests" },
  },
  "atividades-de-escritorio": {
    titulo: "Atividades de Escritório",
    descricao: "Uso de ferramentas como Excel, Word, Powerpoint e Word para atividades ocasionais.",
    imagem: "competencias/documentacao.svg",
    relacao: { tipo: "certificacao", id: "tecnico-de-informatica" },
  },
  "tecnologias-de-desenvolvimento": {
    titulo: "Tecnologias de Desenvolvimento",
    descricao: "Amplo conhecimento em tecnologias como HTML5, CSS3, Javascript, Python, SQL, etc.",
    imagem: "competencias/codigo.svg",
    relacao: { tipo: "projeto", id: "meu-portifolio-online-suporte-de-ti" },
  },
  "comunicacao-e-didatica": {
    titulo: "Comunicação e Didática",
    descricao: "Facilidade de comunicação e ensino com pessoas de todas as idades.",
    imagem: "competencias/codigo.svg",
    relacao: { tipo: "experiencia", id: "professor-python" },
  },
};

/**
 * Devolve a competência do catálogo (ou null, com aviso, se o id não existir).
 * @param {string} id
 * @param {Record<string, object>} [catalogo]
 */
export function resolverCompetencia(id, catalogo = CATALOGO_COMPETENCIAS) {
  const base = typeof id === "string" ? catalogo[id] : null;
  if (!base) {
    console.warn(`Competência "${id}" não existe no catálogo (assets/data/competencias.js).`);
    return null;
  }
  return { ...base, id };
}

/**
 * Lista de competências de um currículo, na ordem dos ids.
 *   competencias: { intro, itens: criarCompetencias(["acessibilidade", "front-end"]) }
 */
export function criarCompetencias(ids = [], catalogo = CATALOGO_COMPETENCIAS) {
  return ids.map((id) => resolverCompetencia(id, catalogo)).filter(Boolean);
}
