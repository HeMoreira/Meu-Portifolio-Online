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
     competencias                (opcional) competências extras, além das que o currículo
                                 já liga a esta certificação (competencias[].relacao)
     detalhes                    (opcional) lista de blocos que SUBSTITUI o modal padrão —
                                 mesmos blocos dos projetos (ver components/modal.js); o bloco
                                 { tipo: "competencias" } insere as competências relacionadas.
   Sem nenhum desses campos, o card não mostra o botão de detalhes.
   ========================================================================== */

export const CATALOGO_CERTIFICACOES = {
  "fundamentos-de-ti": {
    titulo: "Fundamentos de TI: Hardware e Software",
    descricao: "Emitido pela Fundação Bradesco em outubro de 2026. Mais detalhes no LinkedIn.",
    imagem: "certificacoes/certificado-fundamentos-de-ti-bradesco.jpeg",
    imagemAlt: "",
    organizacao: "Fundação Bradesco",
    emissao: "2026-10",
  },

  "tecnico-de-informatica": {
    titulo: "Ensino Técnico em Informática",
    descricao: "Emitido pela Fundação Oswaldo Cruz em dezembro de 2025. Mais detalhes no LinkedIn.",
    imagem: "certificacoes/placeholder.svg",
    imagemAlt: "",
    organizacao: "Fundação Oswaldo Cruz",
    emissao: "2025-12",
  },

  "devops-e-agile-culture": {
    titulo: "DevOps & Agile Culture",
    descricao: "Emitido pela FIAP em outubro de 2026. Mais detalhes no LinkedIn.",
    imagem: "certificacoes/certificado-devops-e-agile-culture-fiap.jpeg",
    imagemAlt: "",
    organizacao: "FIAP",
    emissao: "2026-10",
  },

  "ef-set-ingles": {
    titulo: "Certificado oficial EF SET 56/100 (B2 Independente).",
    descricao: "Emitido pela EF SET em outubro de 2026. Mais detalhes no LinkedIn.",
    imagem: "certificacoes/certificado-ef-set-ingles.jpeg",
    imagemAlt: "",
    organizacao: "EF SET",
    emissao: "2026-10",
  },

  "cursa-excel": {
    titulo: "Excel do básico ao avançado",
    descricao: "Emitido pelo Cursa em fevereiro de 2025. Mais detalhes no LinkedIn.",
    imagem: "certificacoes/certificado-cursa-excel.png",
    imagemAlt: "",
    organizacao: "Cursa",
    emissao: "2025-02",
  },

  // ---- exemplos de currículos ainda em construção (substituir)
  "modelagem-de-dados": {
    titulo: "[Exemplo] Modelagem de dados e SQL",
    descricao: "Instituição, carga horária e ano de conclusão (substituir).",
    imagem: "certificacoes/placeholder.svg",
    imagemAlt: "Imagem ilustrativa de certificado (substituir)",
    organizacao: "[Exemplo] Instituição",
  },

  "testes-automatizados": {
    titulo: "[Exemplo] Testes automatizados e CI/CD",
    descricao: "Instituição, carga horária e ano de conclusão (substituir).",
    imagem: "certificacoes/placeholder.svg",
    imagemAlt: "Imagem ilustrativa de certificado (substituir)",
    organizacao: "[Exemplo] Instituição",
  },

  "gestao-de-projetos": {
    titulo: "[Exemplo] Gestão de projetos",
    descricao: "Instituição, carga horária e ano de conclusão (substituir).",
    imagem: "certificacoes/placeholder.svg",
    imagemAlt: "Imagem ilustrativa de certificado (substituir)",
    organizacao: "[Exemplo] Instituição",
  },

  "ux-basico": {
    titulo: "[Exemplo] Fundamentos de UX",
    descricao: "Instituição, carga horária e ano de conclusão (substituir).",
    imagem: "certificacoes/placeholder.svg",
    imagemAlt: "Imagem ilustrativa de certificado (substituir)",
    organizacao: "[Exemplo] Instituição",
  },

  "bancos-relacionais": {
    titulo: "[Exemplo] Bancos de dados relacionais",
    descricao: "Instituição, carga horária e ano de conclusão (substituir).",
    imagem: "certificacoes/placeholder.svg",
    imagemAlt: "Imagem ilustrativa de certificado (substituir)",
    organizacao: "[Exemplo] Instituição",
  },

  "entrega-continua": {
    titulo: "[Exemplo] Entrega contínua e DevOps básico",
    descricao: "Instituição, carga horária e ano de conclusão (substituir).",
    imagem: "certificacoes/placeholder.svg",
    imagemAlt: "Imagem ilustrativa de certificado (substituir)",
    organizacao: "[Exemplo] Instituição",
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
