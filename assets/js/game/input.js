/* ==========================================================================
   Entrada — estado das teclas (não depende do auto-repeat do sistema).

   Mantém o conjunto de teclas pressionadas (keydown/keyup) e lê-las por AÇÃO
   (left, right, jump, start; ver KEYS em config.js):
     isDown(ação)   true enquanto a tecla estiver pressionada (vale ao segurar)
     axis()         -1 / 0 / 1 (se as duas estiverem pressionadas, vence a mais recente)
     consume(ação)  true UMA vez por pressionamento (usado pelo salto)

   Modos (setMode): "off" ignora tudo · "intro" só reconhece a tecla de início
   (onStart) · "play" reconhece os controles e impede a rolagem da página ·
   "locked" (modal de fim de jogo): nenhuma ação de jogo, rolagem bloqueada, botões
   continuam ativáveis por Enter/Espaço.

   Não interfere no resto da página:
     • ignora campos de texto, selects, contenteditable e diálogos;
     • Enter/Espaço sobre botões e links continuam ativando o elemento;
     • ignora combinações com Ctrl/Alt/Meta (atalhos do navegador);
     • limpa as teclas ao perder o foco (nada fica "preso").
   Todos os listeners nascem aqui (só após a ativação) e morrem em destroy().
   ========================================================================== */
import { KEYS } from "./config.js";

const SCROLL_KEYS = new Set(["ArrowDown", "PageUp", "PageDown", "Home", "End"]);
const norm = (event) => (event.key.length === 1 ? event.key.toLowerCase() : event.key);

const isEditable = (el) =>
  el instanceof HTMLElement &&
  (el.isContentEditable || el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT");
const inDialog = (el) => el instanceof Element && !!el.closest('dialog[open], [role="dialog"]');
/** Elementos que reagem a Enter/Espaço por conta própria (links travados não contam). */
const isActivatable = (el) =>
  el instanceof Element &&
  !!el.closest('button, a[href], summary, [role="button"], [role="link"]') &&
  !el.closest('[aria-disabled="true"]');

/** @param {{bindings?: typeof KEYS}} [options] */
export function createInput({ bindings = KEYS } = {}) {
  const ac = new AbortController();
  const { signal } = ac;
  const down = new Set();
  const stamp = { left: 0, right: 0 };
  const pressed = new Set();
  let mode = "off";
  let startHandler = null;

  const actionsOf = (key) => Object.keys(bindings).filter((action) => bindings[action].includes(key));
  const isDown = (action) => bindings[action].some((key) => down.has(key));

  function onKeyDown(event) {
    if (mode === "off" || event.ctrlKey || event.altKey || event.metaKey) return;
    if (isEditable(event.target) || inDialog(event.target)) return;

    const key = norm(event);
    if (mode === "locked") {
      if (isActivatable(event.target)) return; // Enter/Espaço/Tab nos botões do modal
      if (SCROLL_KEYS.has(key) || key === "ArrowUp" || key === " ") event.preventDefault();
      return;
    }
    const actions = actionsOf(key);
    const scrollKey = mode === "play" && SCROLL_KEYS.has(key);
    if (!actions.length && !scrollKey) return;
    if ((key === "Enter" || key === " ") && isActivatable(event.target)) return; // o elemento tem prioridade

    if (mode === "intro") {
      if (actions.includes("start")) {
        event.preventDefault();
        if (!event.repeat) startHandler?.();
      }
      return;
    }

    // mode === "play": só ações de jogo e teclas de rolagem (a câmera controla a rolagem)
    const gameplay = actions.filter((action) => action !== "start");
    if (!gameplay.length && !scrollKey) return;
    event.preventDefault();
    if (event.repeat) return;
    down.add(key);
    for (const action of gameplay) {
      if (action === "left" || action === "right") stamp[action] = event.timeStamp;
      if (action === "jump") pressed.add("jump");
    }
  }

  const onKeyUp = (event) => down.delete(norm(event));
  const release = () => down.clear();

  window.addEventListener("keydown", onKeyDown, { signal });
  window.addEventListener("keyup", onKeyUp, { signal });
  window.addEventListener("blur", release, { signal });
  document.addEventListener("visibilitychange", release, { signal });
  // a câmera dirige a rolagem durante o jogo: a roda do mouse não deve disputar com ela
  window.addEventListener(
    "wheel",
    (event) => {
      if (mode === "locked" || (mode === "play" && !isEditable(event.target) && !inDialog(event.target))) event.preventDefault();
    },
    { signal, passive: false },
  );

  return {
    setMode(next) {
      mode = next;
      if (next !== "play") {
        down.clear();
        pressed.clear();
      }
    },
    get mode() {
      return mode;
    },
    onStart(fn) {
      startHandler = fn;
    },
    isDown,
    axis() {
      const left = isDown("left");
      const right = isDown("right");
      if (left && right) return stamp.left > stamp.right ? -1 : 1;
      return left ? -1 : right ? 1 : 0;
    },
    /** true uma única vez por pressionamento da ação (ex.: "jump"). */
    consume(action) {
      return pressed.delete(action);
    },
    clearPresses() {
      pressed.clear();
    },
    destroy() {
      ac.abort();
      down.clear();
      pressed.clear();
    },
  };
}
