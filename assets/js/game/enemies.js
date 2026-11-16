/* ==========================================================================
   Inimigos — entidades, movimento cíclico e ataque com feixe.

   Os dois inimigos usam a MESMA lógica (createEnemy) e mantêm estados
   independentes: cada um tem posição, velocidade, direção, estado, animação,
   temporizador de ataque, hitbox e referência ao alvo.

   ESTADOS (enemy.state):
     dormant    ainda não apareceu (escondido)
     spawning   animação "spawn" (não se move, não ataca)
     idle       animação "idle" + movimento cíclico entre as laterais
     attacking  animação "attack": movimento PARADO até o fim; feixe ativo

   MOVIMENTO: u(t) = (1 − cos(2πt/ciclo)) / 2 vai de 0 (esquerda) a 1 (direita) e
   volta. A derivada é zero nas pontas e máxima no meio: saída lenta, aceleração,
   travessia central rápida, desaceleração perto da extremidade oposta e inversão
   suave (a velocidade passa por zero e muda de sinal sem salto). Um começa na
   esquerda (t=0) e o outro na direita (t=ciclo/2): vão em direção ao centro, se
   cruzam e seguem para as laterais opostas.
   O tempo `t` avança a `dt × fator`, onde o FATOR (0…1) é suavizado: ao atacar ele
   cai a zero em ~0,3 s (freada) e, depois do ataque, sobe de novo suavemente — a
   velocidade nunca dá um salto. Verticalmente cada inimigo é uma MOLA amortecida
   que persegue a altura do jogador (atraso + leve vai-e-vem), dentro da tela.

   OLHAR: o sprite (que olha para a direita) é espelhado conforme o lado em que o
   alvo está — independente da direção do deslocamento.

   ATAQUE (ver ATTACK em config.js): quando o temporizador zera, toca "attack".
     quadros 1–2 (índices < strikeFrame)  prévia: feixe vermelho-escuro, sem dano
     quadro 3   (índice = strikeFrame)    feixe neon + colisão verificada UMA vez
     quadro 4                              recuperação (feixe some)
   O feixe parte da boca do inimigo, persegue o alvo com atraso (aimSmoothing, dá
   para desviar) e trava a mira no instante do disparo. Quem causa o dano não é o
   inimigo: ele só emite "enemy:hit"; a regra de dano vive em match.js.

   Renderização do feixe: enemy.beam é um objeto de dados (modo + dois pontos);
   quem desenha é fx.js (canvas). Nenhum elemento DOM é criado por ataque.
   ========================================================================== */
import { h } from "../core.js";
import { createAnimator } from "./animator.js";
import { ATTACK, BEAM, ENEMIES, ENEMY_ANIMATIONS, ENEMY_SHEET } from "./config.js";

export const ENEMY_STATES = Object.freeze({
  DORMANT: "dormant",
  SPAWNING: "spawning",
  IDLE: "idle",
  ATTACKING: "attacking",
});

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
const SIZE = ENEMY_SHEET.frame * ENEMY_SHEET.scale;

/** Interseção segmento × retângulo (Liang–Barsky). */
export function segmentHitsRect(x1, y1, x2, y2, r) {
  let t0 = 0;
  let t1 = 1;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const clip = (p, q) => {
    if (p === 0) return q >= 0;
    const t = q / p;
    if (p < 0) {
      if (t > t1) return false;
      if (t > t0) t0 = t;
    } else {
      if (t < t0) return false;
      if (t < t1) t1 = t;
    }
    return true;
  };
  return clip(-dx, x1 - r.x) && clip(dx, r.x + r.width - x1) && clip(-dy, y1 - r.y) && clip(dy, r.y + r.height - y1);
}

/**
 * @param {{
 *   id: string, index: number, side: "left"|"right", sheetUrl: string,
 *   container: HTMLElement,
 *   target: { center: () => {x:number,y:number}, hitbox: () => ({x,y,width,height}|null) },
 *   emitter: ReturnType<import("./events.js").createEmitter>,
 * }} options
 */
export function createEnemy({ id, index, side, sheetUrl, container, target, emitter }) {
  const scale = ENEMY_SHEET.scale;
  const element = h("div", { class: "game-enemy", "data-enemy": id, "aria-hidden": "true", hidden: true });
  const hitboxDebug = h("span", {
    class: "game-enemy__hitbox",
    style: {
      left: `${ENEMIES.body.x}px`,
      top: `${ENEMIES.body.y}px`,
      width: `${ENEMIES.body.width}px`,
      height: `${ENEMIES.body.height}px`,
    },
  });
  element.append(hitboxDebug);
  container.append(element);

  const animator = createAnimator({
    element,
    sheet: { url: sheetUrl, ...ENEMY_SHEET },
    animations: ENEMY_ANIMATIONS,
    initial: "spawn",
  });

  const startPhase = side === "left" ? 0 : ENEMIES.cycle / 2;
  let t = startPhase; // fase do ciclo (s de movimento)
  let speed = 0; // fator de velocidade do cruzamento (0 parado … 1 normal), suavizado
  let clock = 0; // tempo desde que apareceu (flutuação)
  let lastStrikeFrame = -1;

  /** Estado atual + espelho em data-state (CSS: piscar do spawn, etc.). */
  function setState(next) {
    enemy.state = next;
    element.dataset.state = next;
  }

  const enemy = {
    id,
    index,
    side,
    element,
    animator,
    target, // referência ao alvo (jogador)
    state: ENEMY_STATES.DORMANT,
    x: 0, // canto superior esquerdo do QUADRO (px do documento)
    y: 0,
    vx: 0, // px/s (horizontal, derivada da curva)
    vy: 0,
    dir: side === "left" ? 1 : -1, // sentido do deslocamento
    facing: side === "left" ? 1 : -1, // lado para o qual olha (o alvo)
    attackTimer: 0, // s até o próximo ataque
    /** Feixe (dados para o fx.js). modo: off | preview | strike */
    beam: { mode: "off", x1: 0, y1: 0, x2: 0, y2: 0, aimX: 0, aimY: 0 },

    get size() {
      return SIZE;
    },
    /** Hitbox no documento (acompanha o espelhamento do sprite). */
    get hitbox() {
      const b = ENEMIES.body;
      const bx = enemy.facing > 0 ? b.x : ENEMY_SHEET.frame - b.x - b.width;
      return { x: enemy.x + bx * scale, y: enemy.y + b.y * scale, width: b.width * scale, height: b.height * scale };
    },
    get center() {
      const r = enemy.hitbox;
      return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
    },
    get visible() {
      return enemy.state !== ENEMY_STATES.DORMANT;
    },

    /** Aparece nas coordenadas dadas e toca "spawn". */
    spawn(x, y) {
      enemy.x = x;
      enemy.y = y;
      t = startPhase;
      speed = 0;
      clock = 0;
      enemy.vx = enemy.vy = 0;
      setState(ENEMY_STATES.SPAWNING);
      element.hidden = false;
      animator.play("spawn", { restart: true });
      emitter.emit("enemy:spawn", { enemy });
    },

    /** Volta ao estado inicial (reinício da partida). */
    reset() {
      setState(ENEMY_STATES.DORMANT);
      enemy.beam.mode = "off";
      enemy.vx = enemy.vy = 0;
      enemy.dir = side === "left" ? 1 : -1;
      enemy.facing = enemy.dir;
      enemy.attackTimer = 0;
      t = startPhase;
      speed = 0;
      clock = 0;
      lastStrikeFrame = -1;
      element.hidden = true;
      animator.flip = false;
      animator.play("spawn", { restart: true });
    },

    /** Interrompe um ataque em andamento (jogador morreu/partida acabou). */
    cancelAttack() {
      if (enemy.state !== ENEMY_STATES.ATTACKING) return;
      enemy.beam.mode = "off";
      setState(ENEMY_STATES.IDLE);
      animator.play("idle", { restart: true });
    },

    /**
     * @param {number} dt segundos
     * @param {{left:number,right:number,viewTop:number,viewBottom:number,combat:boolean}} ctx
     */
    update(dt, ctx) {
      if (enemy.state === ENEMY_STATES.DORMANT) return;
      animator.update(dt);
      clock += dt;
      const tc = target.center();

      // ---- máquina de estados ----
      if (enemy.state === ENEMY_STATES.SPAWNING) {
        if (animator.finished) {
          setState(ENEMY_STATES.IDLE);
          animator.play("idle", { restart: true });
          // início do combate para ESTE inimigo: o 1º ataque vem ATTACK.first (+ defasagem) depois
          enemy.attackTimer = ATTACK.first + index * ATTACK.stagger;
          emitter.emit("enemy:ready", { enemy });
        }
      } else {
        enemy.attackTimer -= dt;
        if (enemy.state === ENEMY_STATES.IDLE && enemy.attackTimer <= 0 && ctx.combat && target.hitbox()) startAttack();
        if (enemy.state === ENEMY_STATES.ATTACKING) updateAttack(dt, tc);
        if (!ctx.combat) enemy.cancelAttack();
      }

      // ---- movimento horizontal cíclico: fator de velocidade suavizado (freia no ataque) ----
      const span = ctx.right - ctx.left;
      const moving = enemy.state === ENEMY_STATES.IDLE;
      const live = moving || enemy.state === ENEMY_STATES.ATTACKING;
      speed += ((moving ? 1 : 0) - speed) * (1 - Math.exp(-(moving ? ENEMIES.launch : ENEMIES.brake) * dt));
      if (!moving && speed < 0.002) speed = 0;
      if (live) {
        t += dt * speed;
        const w = (Math.PI * 2) / ENEMIES.cycle;
        const u = (1 - Math.cos(w * t)) / 2;
        const prevX = enemy.x;
        enemy.x = ctx.left + span * u;
        enemy.vx = dt > 0 ? (enemy.x - prevX) / dt : 0;
        const slope = Math.sin(w * t);
        if (speed > 0.05 && Math.abs(slope) > 1e-3) enemy.dir = slope > 0 ? 1 : -1;
      } else {
        enemy.vx = 0;
        enemy.x = clamp(enemy.x, ctx.left, ctx.right);
      }

      // ---- altura: mola amortecida rumo à altura do jogador (parada durante o ataque) ----
      const bob = ENEMIES.bob.amplitude * Math.sin(Math.PI * 2 * ENEMIES.bob.speed * clock);
      const yTarget = clamp(tc.y - SIZE / 2 + bob, ctx.viewTop, ctx.viewBottom);
      if (enemy.state === ENEMY_STATES.ATTACKING) {
        enemy.vy *= Math.exp(-ENEMIES.brake * dt);
      } else {
        const w = ENEMIES.spring.frequency;
        enemy.vy += (w * w * (yTarget - enemy.y) - 2 * ENEMIES.spring.damping * w * enemy.vy) * dt;
      }
      enemy.y += enemy.vy * dt;
      if (enemy.y < ctx.viewTop || enemy.y > ctx.viewBottom) {
        enemy.y = clamp(enemy.y, ctx.viewTop, ctx.viewBottom);
        enemy.vy = 0;
      }

      // ---- olhar para o alvo (independe do deslocamento) ----
      const dx = tc.x - (enemy.x + SIZE / 2);
      if (Math.abs(dx) > ENEMIES.facingDeadZone) enemy.facing = dx > 0 ? 1 : -1;

      animator.flip = enemy.facing < 0;
      animator.setPosition(enemy.x, enemy.y);
      animator.render();
    },
  };

  /* ---------- ataque ---------- */
  function muzzle() {
    const mx = enemy.facing > 0 ? ATTACK.muzzle.x : ENEMY_SHEET.frame - ATTACK.muzzle.x;
    return { x: enemy.x + mx * scale, y: enemy.y + ATTACK.muzzle.y * scale };
  }

  function startAttack() {
    setState(ENEMY_STATES.ATTACKING);
    enemy.attackTimer = ATTACK.interval; // intervalo de início a início
    lastStrikeFrame = -1;
    animator.play("attack", { restart: true });
    const tc = target.center();
    enemy.beam.aimX = tc.x;
    enemy.beam.aimY = tc.y;
    enemy.beam.mode = "preview";
    emitter.emit("enemy:attack", { enemy });
  }

  function updateAttack(dt, tc) {
    const frame = animator.frameIndex;
    const beam = enemy.beam;
    const striking = frame >= ATTACK.strikeFrame;

    // a mira persegue o alvo até o disparo; depois fica travada
    if (!striking) {
      const k = 1 - Math.exp(-ATTACK.aimSmoothing * dt);
      beam.aimX += (tc.x - beam.aimX) * k;
      beam.aimY += (tc.y - beam.aimY) * k;
    }

    // geometria: da boca, passando pelo ponto mirado, um pouco além
    const m = muzzle();
    let dx = beam.aimX - m.x;
    let dy = beam.aimY - m.y;
    const len = Math.hypot(dx, dy) || 1;
    dx /= len;
    dy /= len;
    beam.x1 = m.x;
    beam.y1 = m.y;
    beam.x2 = m.x + dx * (len + ATTACK.overshoot);
    beam.y2 = m.y + dy * (len + ATTACK.overshoot);

    if (frame === ATTACK.strikeFrame && !animator.finished) {
      beam.mode = "strike";
      if (lastStrikeFrame !== frame) {
        lastStrikeFrame = frame; // a colisão é verificada UMA vez, no instante do disparo
        const box = target.hitbox();
        const pad = BEAM.hitWidth / 2;
        if (box && segmentHitsRect(beam.x1, beam.y1, beam.x2, beam.y2, { x: box.x - pad, y: box.y - pad, width: box.width + pad * 2, height: box.height + pad * 2 })) {
          emitter.emit("enemy:hit", { enemy, fromX: m.x });
        }
      }
    } else if (frame > ATTACK.strikeFrame || animator.finished) {
      beam.mode = "off"; // recuperação
    } else {
      beam.mode = "preview";
    }

    if (animator.finished) {
      beam.mode = "off";
      setState(ENEMY_STATES.IDLE);
      animator.play("idle", { restart: true });
      emitter.emit("enemy:attack-end", { enemy });
    }
  }

  return enemy;
}

/**
 * Gerenciador dos inimigos: cria os dois, calcula o contexto comum (laterais e
 * faixa visível) e os atualiza.
 * @param {{
 *   emitter: ReturnType<import("./events.js").createEmitter>,
 *   container: HTMLElement,
 *   world: { bounds: { left: number, right: number } },
 *   target: Parameters<typeof createEnemy>[0]["target"],
 *   sheetUrls: string[],
 * }} options
 */
export function createEnemies({ emitter, container, world, target, sheetUrls }) {
  const list = ENEMIES.sheets.map((_, i) =>
    createEnemy({ id: `enemy-${i + 1}`, index: i, side: ENEMIES.sides[i % ENEMIES.sides.length], sheetUrl: sheetUrls[i], container, target, emitter }),
  );
  const beams = list.map((enemy) => enemy.beam);
  let spawned = false;
  let combat = true;

  const api = {
    list,
    /** Os feixes (dados) para o fx.js desenhar. */
    beams,
    get spawned() {
      return spawned;
    },
    /** Liga/desliga o combate (desligado: ataques em curso são cancelados e nenhum novo começa). */
    setCombat(on) {
      combat = Boolean(on);
    },
    /** Faz os dois aparecerem nas laterais, aproximadamente na altura do alvo. */
    spawn() {
      if (spawned) return;
      spawned = true;
      const { left, right, viewTop, viewBottom } = context();
      const cy = target.center().y - SIZE / 2;
      for (const enemy of list) {
        enemy.spawn(enemy.side === "left" ? left : right, clamp(cy, viewTop, viewBottom));
      }
      emitter.emit("enemies:spawn", { enemies: list });
    },
    update(dt) {
      if (!spawned) return;
      const ctx = context();
      for (const enemy of list) enemy.update(dt, ctx);
    },
    reset() {
      spawned = false;
      combat = true;
      for (const enemy of list) enemy.reset();
    },
    setDebug(on) {
      for (const enemy of list) enemy.element.toggleAttribute("data-debug", Boolean(on));
    },
    destroy() {
      for (const enemy of list) enemy.element.remove();
      list.length = 0;
    },
  };

  /** Contexto comum (objeto reutilizado: nenhuma alocação por quadro). */
  const ctx = { left: 0, right: 0, viewTop: 0, viewBottom: 0, combat: true };
  function context() {
    const sy = window.scrollY;
    ctx.left = world.bounds.left + ENEMIES.margin;
    ctx.right = world.bounds.right - SIZE - ENEMIES.margin;
    ctx.viewTop = sy + ENEMIES.viewMargin.top;
    ctx.viewBottom = sy + window.innerHeight - SIZE - ENEMIES.viewMargin.bottom;
    ctx.combat = combat;
    return ctx;
  }

  return api;
}
