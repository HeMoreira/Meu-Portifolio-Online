/* ==========================================================================
   Validação do código secreto — funções PURAS e isoladas.
   Nada aqui toca o DOM, usa eval ou grava dados. O valor digitado é tratado
   apenas como string: filtrado, normalizado e comparado.
   ========================================================================== */
import { SECRET_CODE, CODE_LENGTH } from "./config.js";

/** Mantém só letras A–Z/a–z e no máximo CODE_LENGTH caracteres (usado ao digitar/colar). */
export function sanitizeInput(raw) {
  return String(raw ?? "")
    .replace(/[^A-Za-z]/g, "")
    .slice(0, CODE_LENGTH);
}

/** Normalização controlada: texto, sem espaços nas pontas, em maiúsculas. */
export function normalizeCode(raw) {
  return String(raw ?? "")
    .normalize("NFKC")
    .trim()
    .toUpperCase();
}

/** true somente para o código exato (BA, ba, Ba, bA…). */
export function isSecretCode(raw) {
  const value = normalizeCode(raw);
  return value.length === CODE_LENGTH && /^[A-Z]+$/.test(value) && value === SECRET_CODE;
}
