/* ==========================================================================
   Dados COMPARTILHADOS pelos seis currículos: nome, foto e contatos.
   Edite aqui uma vez e todas as páginas são atualizadas.

   Contatos com href null aparecem como botão desabilitado ("ainda não
   informado") — nenhum link fictício é criado. Para ativar, troque null
   pelo endereço real, por exemplo:
     email:    "mailto:voce@dominio.com"
     linkedin: "https://www.linkedin.com/in/seu-usuario/"
     github:   "https://github.com/seu-usuario"
   ========================================================================== */

export const PERFIL = {
  nome: "[Seu Nome]", // PLACEHOLDER
  foto: { src: "perfil/placeholder.svg", alt: "Retrato de [Seu Nome]" }, // PLACEHOLDER
};

const CONTATOS = {
  email: { rotulo: "E-mail", href: null },
  linkedin: { rotulo: "LinkedIn", href: null },
  github: { rotulo: "GitHub", href: null },
};

/** Seleciona (e ordena) os contatos de um currículo: contatos("email", "github"). */
export const contatos = (...chaves) => chaves.map((chave) => CONTATOS[chave]);
