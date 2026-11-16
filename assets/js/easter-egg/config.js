/* ==========================================================================
   Easter egg da foto — configuração central (nenhuma lógica aqui).
   ========================================================================== */

/** Sequência que libera o campo de código. */
export const SECRET_SEQUENCE = ["up", "up", "down", "down", "left", "right", "left", "right"];

/** Código secreto (comparado sem diferenciar maiúsculas/minúsculas). */
export const SECRET_CODE = "BA";
export const CODE_LENGTH = SECRET_CODE.length;

/** O easter egg só funciona acima de 1024px de largura. */
export const ENABLE_QUERY = "(min-width: 1025px)";

/** Pequeno movimento da foto a cada seta (px, ms). */
export const NUDGE = { distance: 10, duration: 240 };

/** Ordem do DOM = ordem de tabulação: cima, esquerda, direita, baixo. */
export const DIRECTIONS = {
  up: { label: "Mover a foto para cima", vector: [0, -1] },
  left: { label: "Mover a foto para a esquerda", vector: [-1, 0] },
  right: { label: "Mover a foto para a direita", vector: [1, 0] },
  down: { label: "Mover a foto para baixo", vector: [0, 1] },
};

/**
 * Estados da interação (atributo data-egg-state no elemento .egg):
 *   disabled → tela ≤ 1024px: foto comum, sem interação
 *   idle     → foto + "Contra o mundo"; hover/foco/toque indicam interatividade
 *   active   → setas visíveis, legenda some
 *   code     → sequência correta: foto escurecida + campo "Faça!"
 *   secret   → código aceito: activateSecretMode() foi chamado (feedback, pulsos,
 *              carregamento e modo secreto ativo; sai para idle pelo botão "Sair")
 */
export const STATES = {
  DISABLED: "disabled",
  IDLE: "idle",
  ACTIVE: "active",
  CODE: "code",
  SECRET: "secret",
};

/** Transições permitidas (qualquer outra é ignorada). */
export const TRANSITIONS = {
  [STATES.DISABLED]: [STATES.IDLE],
  [STATES.IDLE]: [STATES.ACTIVE, STATES.DISABLED],
  [STATES.ACTIVE]: [STATES.CODE, STATES.DISABLED],
  [STATES.CODE]: [STATES.ACTIVE, STATES.SECRET, STATES.DISABLED],
  [STATES.SECRET]: [STATES.IDLE, STATES.DISABLED], // IDLE: saída do modo secreto pelo usuário
};

/**
 * Tempos (ms) da entrada no modo secreto. Tudo em um lugar para ajuste fino.
 *   feedbackMs   confirmação verde do campo (2 ciclos de 1500ms — ver easter-egg.css)
 *   pulses       os dois primeiros pulsos (expansão + retorno, tempo TOTAL de cada um)
 *   third        terceiro pulso, mais longo: expande, segura enquanto carrega, retorna
 *   exit         saída (um único pulso curto: expande, desmonta, retorna)
 *   loadingDelay "Carregando..." só aparece se a carga ainda não terminou após este tempo
 *   loadingMin   uma vez exibido, o texto fica ao menos este tempo (evita "piscada")
 */
export const SECRET_TRANSITION = {
  feedbackMs: 3000,
  pulses: [3000, 3000],
  third: { expandMs: 2400, retractMs: 2400 },
  exit: { expandMs: 1200, retractMs: 1200 },
  loadingDelay: 500,
  loadingMin: 800,
  reducedFadeMs: 350, // prefers-reduced-motion: apenas um fade simples
  reducedFeedbackMs: 900,
};

/** Eventos (CustomEvent, com bubbles) emitidos a partir do elemento .egg. */
export const EVENTS = {
  STATE_CHANGE: "egg:statechange", // detail: { from, to }
  SEQUENCE: "egg:sequence", // detail: { dir, status: "progress"|"reset"|"complete", progress }
  SECRET_ENTERING: "egg:secret-entering", // código aceito: feedback + transição em andamento
  SECRET_ON: "egg:secret-activated", // modo secreto montado (ainda sob o 3º pulso) ← gancho
  SECRET_OFF: "egg:secret-deactivated", // modo secreto desmontado (saída ou cancelamento)
};