/* ==========================================================================
   Catálogo CENTRAL de certificações: TODAS as informações de cada certificação
   ficam aqui. Os currículos (curriculos/{slug}.js → certificacoes.itens) só dizem
   QUAIS ids exibir e em que ordem — igual ao catálogo de projetos (projetos.js).

   Campos de uma certificação (a chave é o id e vira a âncora #certificacao-{id}):
     titulo, descricao?          texto do card
     imagem, imagemAlt?          em assets/images/ (aparece inteira; ver certificacoes.css)
   Todos os campos abaixo são OPCIONAIS e alimentam o modal "Ver detalhes":
     organizacao                 organização responsável
     cargaHoraria                duração em horas (número)
     emissao                     "AAAA-MM" ou "AAAA-MM-DD"
     expiracao                   "AAAA-MM" | "AAAA-MM-DD" | "nunca" (→ "Não expira")
     credencial                  { codigo?, url? }  código e link de verificação
     competencias                (opcional) competências 
                                 já liga a esta certificação (competencias[].relacao)
     detalhes                    (opcional) lista de blocos que SUBSTITUI o modal padrão —
                                 mesmos blocos dos projetos (ver components/modal.js); o bloco
                                 { tipo: "competencias" } insere as competências relacionadas.
   Sem nenhum desses campos, o card não mostra o botão de detalhes.
   ========================================================================== */

export const CATALOGO_CERTIFICACOES = {
  "fundamentos-de-ti": {
    titulo: "Fundamentos de TI: Hardware e Software",
    descricao: "Emitido pela Fundação Bradesco em outubro de 2026.",
    imagem: "certificacoes/certificado-fundamentos-de-ti-bradesco.jpeg",
    imagemAlt: "",
    organizacao: "Fundação Bradesco",
    emissao: "2026-10",
    expiracao: "2028-10",
    cargaHoraria: 10,
    credencial: { codigo: "2FC22913-E2ED-48C6-80E2-B6F2793BBA76", url: "https://www.ev.org.br/validar-certificado" },
    competencias: ["Suporte Técnico", "Hardware de Computadores", "Segurança Digital", "Sistemas Operacionais", "Redes e Conectividade"],
  },

  "tecnico-de-informatica": {
    titulo: "Ensino Técnico em Informática",
    descricao: "Emitido pela Fundação Oswaldo Cruz em dezembro de 2025.",
    imagem: "certificacoes/certificado-tecnico-de-informatica-fiocruz.webp",
    imagemAlt: "",
    organizacao: "Fundação Oswaldo Cruz",
    emissao: "2025-12",
    cargaHoraria: 1200,
    competencias: ["Operação de Hardware", "Operação de Software", "Manutenção de computadores", "Arquitetura de Redes", "Desenvolvimento de Sistemas", "Lógica de Programação", "Segurança Digital", "Solucionamento de Problemas", "Pacote Office"],
  },

  "devops-e-agile-culture": {
    titulo: "DevOps & Agile Culture",
    descricao: "Emitido pela FIAP em outubro de 2026.",
    imagem: "certificacoes/certificado-devops-e-agile-culture-fiap.jpeg",
    imagemAlt: "",
    organizacao: "FIAP",
    emissao: "2026-10",
    cargaHoraria: 40,
    credencial: { codigo: "FE5F4A5B09873A81CE65E7606479CF42", url: "https://on.fiap.com.br/validar-certificado/" },
    competencias: ["DevOps", "Agile Culture", "Metodologias Ágeis", "Scrum", "Kanban", "Extreme Programming", "Gestão de Projetos", "UML (Linguagem de Modelagem Unificada)"],
  },

  "agentes-autonomos": {
    titulo: "Agentes Autônomos (Agentic AI)",
    descricao: "Emitido pela FIAP em novembro de 2026.",
    imagem: "certificacoes/certificado-agentes-autonomos-fiap.png",
    imagemAlt: "",
    organizacao: "FIAP",
    emissao: "2026-11",
    cargaHoraria: 40,
    credencial: { codigo: "5509d1d92a483b48b1db4e79221f53c6", url: "https://on.fiap.com.br/validar-certificado/" },
    competencias: ["Agentes Autônomos", "Inteligência Artificial", "Agentes de IA", "n8n", "Automação de Processos"],
  },

  "ef-set-ingles": {
    titulo: "Certificado oficial EF SET 56/100 (B2 Independente).",
    descricao: "Emitido pela EF SET em outubro de 2026.",
    imagem: "certificacoes/certificado-ef-set-ingles.jpeg",
    imagemAlt: "",
    organizacao: "EF SET",
    emissao: "2026-10",
    expiracao: "2036-10",
    credencial: { url: "https://cert.efset.org/pt/Q8UP54" },
    competencias: ["Inglês", "Leitura em inglês", "Compreensão auditiva em inglês", "Gramática em inglês", "Vocabulário em inglês"],
  },

  "cursa-excel": {
    titulo: "Excel do básico ao avançado",
    descricao: "Emitido pelo Cursa em fevereiro de 2025.",
    imagem: "certificacoes/certificado-cursa-excel.png",
    imagemAlt: "",
    organizacao: "Cursa",
    emissao: "2025-02",
    credencial: { url: "https://cursa.app/pt/meu-certificado/cert9d576422c4e75d7644bffd95325da98f" },
    competencias: ["Excel", "Planilhas eletrônicas", "Fórmulas e funções", "Gráficos e visualizações", "Análise de dados"],
  },
};

/**
 * Devolve a certificação do catálogo (ou null, com aviso, se o id não existir).
 * @param {string} id
 * @param {Record<string, object>} [catalogo]
 */
export function resolverCertificacao(id, catalogo = CATALOGO_CERTIFICACOES) {
  const base = typeof id === "string" ? catalogo[id] : null;
  if (!base) {
    console.warn(`Certificação "${id}" não existe no catálogo (assets/data/certificacoes.js).`);
    return null;
  }
  return { ...base, id };
}

/**
 * Lista de certificações de um currículo, na ordem dos ids.
 *   certificacoes: { intro, itens: criarCertificacoes(["fundamentos-de-ti", "cursa-excel"]) }
 */
export function criarCertificacoes(ids = [], catalogo = CATALOGO_CERTIFICACOES) {
  return ids.map((id) => resolverCertificacao(id, catalogo)).filter(Boolean);
}
