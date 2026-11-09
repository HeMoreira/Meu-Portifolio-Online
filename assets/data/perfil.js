/* ==========================================================================
   Dados COMPARTILHADOS pelos seis currículos: nome, foto e contatos.
   Edite aqui uma vez e todas as páginas são atualizadas.
   ========================================================================== */

export const PERFIL = {
  nome: "Henrique Ferreira Moreira",
  foto: { src: "perfil/foto-perfil_icon.jpeg", alt: "Retrato de Henrique Ferreira Moreira" },
};

const CONTATOS = {
  email: { rotulo: "E-mail", href: "mailto:henriquefmoreira2@gmail.com" },
  linkedin: { rotulo: "LinkedIn", href: "https://www.linkedin.com/in/henrique-ferreira-moreira-a4281b321/" },
  github: { rotulo: "GitHub", href: "https://github.com/HeMoreira" },
};

/** Seleciona (e ordena) os contatos de um currículo: contatos("email", "github"). */
export const contatos = (...chaves) => chaves.map((chave) => CONTATOS[chave]);
