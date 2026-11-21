/* ==========================================================================
   Partida — as REGRAS do jogo: dano e vidas, pontuação, relógio da run,
   aparição dos inimigos e condições de término.

   Não desenha nada nem lê o teclado: reage a eventos e escreve no estado
   (state.lives / score / phase / result), que a interface apenas reflete.

   DANO  "enemy:hit" → player.hurt(): a invulnerabilidade é o temporizador do
         PRÓPRIO personagem (DAMAGE em config.js); se ele recusar o golpe, nenhuma
         vida é perdida. Aceito: −1 vida; na última, player.die() e o combate para.

   PONTOS  "player:land" numa plataforma elegível que ainda não pontuou:
         +1 IMEDIATO no estado (e em `scored`), independentemente dos efeitos —
         o orbe some e 6 luzes voam até o personagem (fx.js).

   TÉRMINO  • "goal": o corpo entra na região final → some → (endDelay) → modal
            • "dead": 3ª vida perdida → cai para fora da área → (deathDelay) → modal
         Ao terminar: phase = ENDED, state.result preenchido e evento "match:end".
         O laço é parado por quem escuta o evento (index.js): sem física rodando.

   RELÓGIO  soma os quadros jogados desde o surgimento do personagem (não conta o
         carregamento, a introdução nem abas ocultas) e congela ao começar o término.
   ========================================================================== */
import { END_ZONE, ENEMIES, SCORE } from "./config.js";
import { PHASES } from "./state.js";

/**
 * @param {{
 *   state: ReturnType<import("./state.js").createGameState>,
 *   emitter: ReturnType<import("./events.js").createEmitter>,
 *   player: ReturnType<import("./player.js").createPlayer>,
 *   enemies: ReturnType<import("./enemies.js").createEnemies>,
 *   platforms: ReturnType<import("./platforms.js").createPlatforms>,
 *   endZone: ReturnType<import("./endzone.js").createEndZone>,
 *   fx: ReturnType<import("./fx.js").createFx>,
 *   rectOf: (el: Element) => {left:number,top:number,width:number,height:number},
 * }} options
 */
export function createMatch({ state, emitter, player, enemies, platforms, endZone, fx, rectOf }) {
  /** ids das plataformas que já pontuaram (independe de qualquer efeito visual). */
  const scored = new Set();
  let runTime = 0;
  /** null | { reason, step: "fall"|"wait", timer } */
  let ending = null;

  const center = { x: 0, y: 0 }; // objeto reutilizado: as luzes o consultam todo quadro
  const bodyCenter = () => {
    center.x = player.body.x + player.body.width / 2;
    center.y = player.body.y + player.body.height / 2;
    return center;
  };
  const playing = () => state.get().phase === PHASES.PLAYING;

  /* ---------- dano ---------- */
  const offHit = emitter.on("enemy:hit", ({ fromX }) => {
    if (!playing() || ending) return;
    if (!player.hurt({ fromX })) return; // invulnerável (ou fora de jogo): nada se perde
    const lives = Math.max(0, state.get().lives - 1);
    state.set({ lives });
    emitter.emit("player:life-lost", { lives });
    if (lives === 0) {
      player.die();
      enemies.setCombat(false);
      beginEnding("dead");
    }
  });

  /* ---------- pontos ---------- */
  const eligible = (platform) => !SCORE.skipFirst || platform.role !== "intro";

  const offLand = emitter.on("player:land", ({ platform }) => {
    if (!playing() || ending || !player.alive) return;
    if (!eligible(platform) || scored.has(platform.id)) return;
    scored.add(platform.id);
    state.set({ score: Math.min(SCORE.max, scored.size) }); // contabilizado JÁ, antes do efeito
    emitter.emit("score", { platform, score: state.get().score });

    // efeito: o orbe some e as luzes seguem até o personagem
    const orb = platform.element.querySelector(".orb");
    if (orb) {
      const r = rectOf(orb);
      const from = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      platform.element.dataset.collected = "";
      fx.burst({ from, target: bodyCenter });
    }
  });

  /* ---------- término ---------- */
  function beginEnding(reason) {
    ending = { reason, step: reason === "goal" ? "wait" : "fall", timer: 0 };
    enemies.setCombat(false);
    state.set({ endReason: reason });
  }

  function finish() {
    const { lives, maxLives, score, maxScore } = state.get();
    const result = { reason: ending.reason, lives, maxLives, score, maxScore, time: runTime };
    state.set({ phase: PHASES.ENDED, result });
    emitter.emit("match:end", result);
  }

  // a queda fatal que sai do mundo encerra a espera pela saída da área
  const offFell = emitter.on("player:fell", () => {
    if (ending?.step === "fall") ending.fell = true;
  });

  return {
    scored,
    get runTime() {
      return runTime;
    },
    get ending() {
      return ending;
    },

    /** Uma vez por quadro (depois da física). */
    update(dt) {
      if (!playing()) return;
      if (!ending) runTime += dt;

      // 1) os inimigos aparecem quando o jogador sai da 1ª plataforma e desce o bastante
      if (!ending && !enemies.spawned && player.alive) {
        const first = platforms.list[0];
        if (first && player.body.y + player.body.height >= first.y + ENEMIES.spawnDepth) enemies.spawn();
      }

      // 2) região final
      if (!ending && player.alive && endZone.reached(player.body)) {
        beginEnding("goal");
        player.vanish();
      }

      // 3) andamento do término
      if (ending) {
        ending.timer += dt;
        if (ending.reason === "goal") {
          if (ending.timer >= END_ZONE.endDelay) finish();
        } else if (ending.step === "fall") {
          const out = player.body.y > window.scrollY + window.innerHeight + END_ZONE.fallMargin;
          if (out || ending.fell || ending.timer >= END_ZONE.deathTimeout) {
            ending.step = "wait";
            ending.timer = 0;
          }
        } else if (ending.timer >= END_ZONE.deathDelay) {
          finish();
        }
      }
    },

    /** Reinício: pontuação, relógio, orbes e término voltam ao início. */
    reset() {
      scored.clear();
      runTime = 0;
      ending = null;
      for (const platform of platforms.list) delete platform.element.dataset.collected;
    },

    destroy() {
      offHit();
      offLand();
      offFell();
    },
  };
}
