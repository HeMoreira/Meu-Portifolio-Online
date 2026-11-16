/* ==========================================================================
   Modo secreto — ORQUESTRADOR da entrada e da saída.

   activateSecretMode() é chamada UMA vez, e somente, quando o código correto é
   aceito (index.js). Este arquivo é pequeno de propósito: ele é carregado com a
   página, então NÃO importa nada do jogo de forma estática. Tudo é sob demanda:

     aceito ─► feedback verde (CSS) ─► import("./transition.js")
            ─► pulso 1 ─► pulso 2 ─► pulso 3 (cobre a tela)
                                       ├─ import("../game/index.js") + recursos   ← carga
                                       └─ coberto: mountGame()                      ← monta
            ─► pulso 3 retorna ao centro ─► modo secreto visível

   Estados em <html data-secret-mode>:
     "entering"  código aceito; feedback/pulsos/carga em andamento
     "on"        modo secreto montado (estética pixel art ativa, jogo pronto)
     (ausente)   página normal

   Desativação: deactivateSecretMode(ctx) é imediata (usada quando a tela encolhe);
   com { animated: true } faz um pulso de saída (botão "Sair" do jogo).
   Ambas são seguras em qualquer fase e reversíveis: o jogo desfaz tudo o que fez.

   Eventos (a partir de .egg): egg:secret-entering → egg:secret-activated → egg:secret-deactivated
   ========================================================================== */
import { EVENTS, SECRET_TRANSITION as T } from "./config.js";

/** @type {null | {phase: "entering"|"active"|"leaving", abort: AbortController, transition: any, game: any, restarting?: boolean}} */
let session = null;

const html = document.documentElement;
const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Espera `ms` ou rejeita com AbortError se a sessão for cancelada. */
function wait(ms, signal) {
  return new Promise((resolve, reject) => {
    if (signal.aborted) return reject(new DOMException("Cancelado", "AbortError"));
    const id = setTimeout(resolve, ms);
    signal.addEventListener(
      "abort",
      () => {
        clearTimeout(id);
        reject(new DOMException("Cancelado", "AbortError"));
      },
      { once: true },
    );
  });
}

/**
 * @param {{root: HTMLElement, emit: (name: string, detail?: object) => void}} context
 *   root = elemento .egg que originou a ativação; emit = emissor de eventos do egg.
 */
export function activateSecretMode(context) {
  if (session) return;
  const { root, emit } = context;
  const s = (session = { phase: "entering", abort: new AbortController(), transition: null, game: null });

  html.dataset.secretMode = "entering";
  emit(EVENTS.SECRET_ENTERING, { root });

  enter(s, context).catch((error) => {
    if (error?.name === "AbortError") return; // cancelado de propósito (ex.: tela reduzida)
    console.error("[modo secreto] falha ao entrar:", error);
    if (session === s) teardown(s, context);
  });
}

async function enter(s, context) {
  const { signal } = s.abort;
  const { root, emit } = context;

  // O módulo da transição é pequeno; começa a baixar já na confirmação verde
  const transitionModule = import("./transition.js");
  await wait(reduceMotion() ? T.reducedFeedbackMs : T.feedbackMs, signal);
  const { createTransition } = await transitionModule;
  signal.throwIfAborted();

  s.transition = createTransition();

  const outcome = await s.transition.enter({
    signal,
    // Roda no INÍCIO do 3º pulso: baixa o módulo do jogo e todos os seus recursos
    load: async () => {
      const mod = await import("../game/index.js");
      return { mod, resources: await mod.loadGame({ signal }) };
    },
    // Roda com a tela totalmente coberta: aplica a estética e monta o jogo
    mount: (result) => {
      html.dataset.secretMode = "on";
      s.game = result.mod.mountGame(result.resources, {
        onExitRequest: () => deactivateSecretMode(context, { animated: true }), // botão "Sair" (pulso curto)
        onRestartRequest: () => restartSecretMode(context), // modal: "Jogar novamente" (pulso longo)
        onHomeRequest: () => deactivateSecretMode(context, { animated: true, long: true }), // modal: "Retornar à página inicial"
      });
      s.phase = "active";
      emit(EVENTS.SECRET_ON, { root, game: s.game });
    },
  });

  s.transition = null;
  if (!outcome.ok && session === s) teardown(s, context); // carga falhou: volta ao normal
}

/** Desfaz tudo e avisa o egg (que volta ao estado ocioso). */
function teardown(s, { root, emit }, { keepTransition = false } = {}) {
  s.abort.abort();
  if (!keepTransition) {
    s.transition?.destroy();
    s.transition = null;
  }
  s.game?.destroy();
  s.game = null;
  delete html.dataset.secretMode;
  if (session === s) session = null;
  emit(EVENTS.SECRET_OFF, { root });
}

/**
 * "Jogar novamente": pulso longo e reinício do jogo SEM recarregar a página.
 * O jogo continua carregado (recursos e módulos já em memória).
 */
export async function restartSecretMode() {
  const s = session;
  if (!s || s.phase !== "active" || s.restarting) return;
  s.restarting = true;
  try {
    const { createTransition } = await import("./transition.js");
    s.transition = createTransition();
    await s.transition.cover({ long: true, action: () => s.game.reset() });
    s.transition = null;
    s.game?.focusIntro(); // a página só deixa de ser inert quando a transição termina
  } catch (error) {
    if (error?.name !== "AbortError") console.error("[modo secreto] falha ao reiniciar:", error);
  } finally {
    s.restarting = false;
  }
}

/**
 * Chamada se a interação for desativada (ex.: tela reduzida abaixo de 1024px) ou
 * quando o usuário sai pelo botão do jogo ({ animated: true }).
 * @param {{root: HTMLElement, emit: (name: string, detail?: object) => void}} context
 * @param {{animated?: boolean, long?: boolean}} [options]  long: pulso longo (modal de fim de jogo)
 */
export async function deactivateSecretMode(context, { animated = false, long = false } = {}) {
  const s = session;
  if (!s) {
    delete html.dataset.secretMode;
    context.emit(EVENTS.SECRET_OFF, { root: context.root });
    return;
  }
  if (s.phase === "leaving") return;
  if (animated && s.restarting) return; // já há uma transição em andamento

  if (animated && s.phase === "active") {
    s.phase = "leaving";
    try {
      const { createTransition } = await import("./transition.js");
      s.transition = createTransition();
      await s.transition.exit({ teardown: () => teardown(s, context, { keepTransition: true }), long });
      s.transition = null;
    } catch (error) {
      console.error("[modo secreto] falha na saída animada:", error);
      if (session === s) teardown(s, context);
    }
    return;
  }

  teardown(s, context); // imediata: sem pulso
}