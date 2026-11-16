/* ==========================================================================
   Emissor de eventos do jogo — pub/sub mínimo, sem DOM.

   É o canal entre sistemas independentes (física → personagem → interface →
   estado). A etapa 3 usa os mesmos eventos para inimigos, colisões e dano.

   Eventos emitidos hoje (detail entre chaves):
     land            { body, platform, speed }   um corpo aterrissou numa plataforma
     fall            { body }                    um corpo passou do limite inferior do jogo
     player:emerged  { }                         terminou a saída do bloco inicial
     player:move     { dir }                     -1 esquerda · 1 direita (movimento efetivo)
     player:jump     { double }                  salto inicial (false) ou duplo (true)
     player:land     { platform, speed }         o jogador aterrissou
     player:damage   { }                         o jogador recebeu dano (hurt())
     player:respawn  { platform }                voltou à última plataforma após uma queda
     platforms:change { }                        hitboxes recalculadas (layout mudou)
   ========================================================================== */
export function createEmitter() {
  /** @type {Map<string, Set<Function>>} */
  const listeners = new Map();
  return {
    /** @returns {() => void} função que cancela a assinatura */
    on(type, fn) {
      if (!listeners.has(type)) listeners.set(type, new Set());
      listeners.get(type).add(fn);
      return () => listeners.get(type)?.delete(fn);
    },
    emit(type, detail = {}) {
      for (const fn of [...(listeners.get(type) ?? [])]) fn(detail);
    },
    clear() {
      listeners.clear();
    },
  };
}
