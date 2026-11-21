/* ==========================================================================
   Personagem — entidade jogável.

   Responsabilidades (e só estas): ler o input, decidir velocidades, escolher a
   animação e desenhar o sprite. A integração física e a colisão são do mundo
   (physics.js); o personagem é um corpo registrado nele.

   MODOS (controle/física):
     hidden    ainda não surgiu (introdução em andamento)
     emerging  sai do topo do bloco inicial: movimento ROTEIRIZADO, sem gravidade,
               sem colisão e SEM controles (entradas descartadas)
     active    física ligada + controles (o dano bloqueia os controles por um tempo)

   ESTADOS DE ANIMAÇÃO (PLAYER_STATES), escolhidos automaticamente:
     idle         no chão, parado
     run          no chão, em movimento
     jump         salto inicial ou queda
     doubleJump   salto adicional (segura o último quadro até aterrissar)
     damage       após hurt() — também é a animação da queda da morte

   SALTOS: coyote time (pular logo após sair da borda), buffer (pedido pouco antes
   de aterrissar) e salto variável (soltar cedo corta a subida). Há PHYSICS.maxJumps
   saltos por "viagem"; aterrissar numa plataforma os restaura. Sair de uma borda
   sem pular consome o primeiro: no ar resta só o salto duplo.

   ETAPA 3:
     dead   die(): hitbox desligada (hitbox === null), sem colisão com plataformas,
            gravidade continua — o corpo permanece no DOM e cai para fora da área.
     gone   vanish(): some ao entrar na região final.
     reset() devolve tudo ao estado inicial (reinício da partida).
   ========================================================================== */
import { h } from "../core.js";
import { createAnimator } from "./animator.js";
import { ANIMATION_MIN_HOLD, ANIMATIONS, BODY, DAMAGE, EMERGE, PHYSICS, SPRITESHEET } from "./config.js";

export const PLAYER_STATES = Object.freeze({
  IDLE: "idle",
  RUN: "run",
  JUMP: "jump",
  DOUBLE_JUMP: "doubleJump",
  DAMAGE: "damage",
});

const MODES = Object.freeze({ HIDDEN: "hidden", EMERGING: "emerging", ACTIVE: "active", DEAD: "dead", GONE: "gone" });
const approach = (value, target, delta) =>
  value < target ? Math.min(value + delta, target) : Math.max(value - delta, target);
const easeOut = (u) => 1 - (1 - u) * (1 - u);
const lerp = (a, b, t) => a + (b - a) * t;

/**
 * @param {{
 *   world: ReturnType<import("./physics.js").createWorld>,
 *   input: ReturnType<import("./input.js").createInput>,
 *   emitter: ReturnType<import("./events.js").createEmitter>,
 *   container: HTMLElement,
 *   sheetUrl: string,
 * }} options
 */
export function createPlayer({ world, input, emitter, container, sheetUrl }) {
  const scale = SPRITESHEET.scale;
  const element = h("div", { class: "game-player", "aria-hidden": "true", hidden: true });
  const hitboxDebug = h("span", {
    class: "game-player__hitbox",
    style: {
      left: `${BODY.x}px`,
      top: `${BODY.y}px`,
      width: `${BODY.width}px`,
      height: `${BODY.height}px`,
    },
  });
  element.append(hitboxDebug);
  container.append(element);

  const animator = createAnimator({ element, sheet: { url: sheetUrl, ...SPRITESHEET }, animations: ANIMATIONS });

  const body = world.addBody({
    kind: "player",
    width: BODY.width * scale,
    height: BODY.height * scale,
    active: false,
  });

  let mode = MODES.HIDDEN;
  let facing = 1;
  let jumpsUsed = 0;
  let coyote = 0;
  let buffer = 0;
  let canCut = false;
  let airFromJump = false; // a viagem atual começou com um salto (e não com uma queda)
  let damageTimer = 0;
  let invulnerable = 0;
  let stateAge = 0;
  let lastSafe = null; // última plataforma em que pisou (retorno após cair)
  let emerge = null;

  const player = {
    element,
    animator,
    body,
    get mode() {
      return mode;
    },
    get state() {
      return animator.state;
    },
    get facing() {
      return facing;
    },
    get jumpsUsed() {
      return jumpsUsed;
    },
    get invulnerable() {
      return invulnerable > 0;
    },
    /** Em jogo e vivo (ativo, em qualquer estado de animação). */
    get alive() {
      return mode === MODES.ACTIVE;
    },
    /** Caixa de colisão (a mesma do corpo físico) — null quando desligada (morto, sumido, ainda não surgiu). */
    get hitbox() {
      return mode === MODES.ACTIVE ? body : null;
    },
    get controllable() {
      return mode === MODES.ACTIVE && damageTimer <= 0;
    },

    /** Coloca o personagem DENTRO do bloco e inicia a saída pelo topo. */
    spawn(platform) {
      mode = MODES.EMERGING;
      lastSafe = platform;
      const feetStart = platform.y + body.height * EMERGE.hideInside;
      body.x = platform.x + platform.width / 2 - body.width / 2;
      body.y = feetStart - body.height;
      body.prevX = body.x;
      body.prevY = body.y;
      body.vx = body.vy = 0;
      body.active = false; // a simulação só começa quando a saída termina
      emerge = { platform, t: 0, from: feetStart, to: platform.y - EMERGE.rise };
      element.hidden = false;
      animator.play(PLAYER_STATES.JUMP, { restart: true });
      input.clearPresses();
    },

    /** Passo FIXO (antes de world.step): controles e regras do personagem. */
    step(dt) {
      invulnerable = Math.max(0, invulnerable - dt);
      damageTimer = Math.max(0, damageTimer - dt);

      if (mode === MODES.EMERGING) {
        input.clearPresses(); // nada do que for digitado agora vale depois
        body.prevX = body.x;
        body.prevY = body.y;
        emerge.t += dt;
        const u = Math.min(1, emerge.t / EMERGE.duration);
        const feet = lerp(emerge.from, emerge.to, easeOut(u));
        body.y = feet - body.height;
        if (u >= 1) {
          mode = MODES.ACTIVE;
          body.active = true; // a gravidade passa a atuar: cai até uma plataforma
          body.vx = body.vy = 0;
          jumpsUsed = 1; // no ar sem ter pulado: resta o salto duplo
          airFromJump = false;
          emerge = null;
          emitter.emit("player:emerged");
        }
        return;
      }
      if (mode !== MODES.ACTIVE) return;

      const grounded = body.wasGrounded;
      const canControl = damageTimer <= 0;
      const dir = canControl ? input.axis() : 0;

      // ---- horizontal ----
      const target = dir * PHYSICS.runSpeed;
      if (canControl) {
        const accel = dir !== 0 ? (grounded ? PHYSICS.groundAccel : PHYSICS.airAccel) : grounded ? PHYSICS.groundFriction : PHYSICS.airFriction;
        body.vx = approach(body.vx, target, accel * dt);
      } else {
        // atordoado (dano): o impulso do golpe se dissipa, sem controle
        body.vx = approach(body.vx, 0, (grounded ? PHYSICS.groundFriction : PHYSICS.airFriction) * dt);
      }
      if (dir !== 0) {
        facing = dir;
        emitter.emit("player:move", { dir });
      }

      // ---- temporizadores de salto ----
      if (grounded) {
        coyote = PHYSICS.coyoteTime;
        jumpsUsed = 0;
        airFromJump = false;
      } else {
        coyote -= dt;
        if (coyote <= 0 && jumpsUsed === 0) jumpsUsed = 1; // saiu da borda sem pular
      }
      if (canControl && input.consume("jump")) buffer = PHYSICS.jumpBuffer;
      else buffer -= dt;
      if (!canControl) input.clearPresses();

      // ---- saltos ----
      if (buffer > 0 && canControl) {
        if ((grounded || coyote > 0) && jumpsUsed === 0) {
          body.vy = -PHYSICS.jumpSpeed;
          jumpsUsed = 1;
          coyote = 0;
          buffer = 0;
          canCut = true;
          airFromJump = true;
          animator.play(PLAYER_STATES.JUMP, { restart: true });
          emitter.emit("player:jump", { double: false });
        } else if (!grounded && jumpsUsed > 0 && jumpsUsed < PHYSICS.maxJumps) {
          body.vy = -PHYSICS.doubleJumpSpeed;
          jumpsUsed++;
          buffer = 0;
          canCut = true;
          airFromJump = true;
          animator.play(PLAYER_STATES.DOUBLE_JUMP, { restart: true });
          emitter.emit("player:jump", { double: true });
        }
      }

      // salto variável: soltar a tecla durante a subida corta a velocidade (uma vez)
      if (canCut && body.vy < 0 && !input.isDown("jump")) {
        body.vy *= PHYSICS.jumpCutFactor;
        canCut = false;
      }
      if (body.vy >= 0) canCut = false;
    },

    /** Quadro de render: escolhe a animação, avança o sprite e posiciona. */
    animate(dt) {
      stateAge += dt * 1000;
      animator.flip = facing < 0;
      element.toggleAttribute("data-invulnerable", invulnerable > 0);

      let desired;
      if (mode === MODES.EMERGING) desired = PLAYER_STATES.JUMP;
      else if (mode === MODES.DEAD || damageTimer > 0) desired = PLAYER_STATES.DAMAGE;
      else if (body.grounded) {
        const moving = Math.abs(body.vx) > 24 && (input.axis() !== 0 || Math.abs(body.vx) > PHYSICS.runSpeed * 0.35);
        desired = moving ? PLAYER_STATES.RUN : PLAYER_STATES.IDLE;
      } else {
        // no ar: mantém o salto duplo até aterrissar; senão, salto/queda
        desired = animator.state === PLAYER_STATES.DOUBLE_JUMP ? PLAYER_STATES.DOUBLE_JUMP : PLAYER_STATES.JUMP;
      }

      if (desired !== animator.state) {
        // idle/run só trocam após um tempo mínimo (sem piscar em degraus e bordas)
        const ground = desired === PLAYER_STATES.IDLE || desired === PLAYER_STATES.RUN;
        const fromGround = animator.state === PLAYER_STATES.IDLE || animator.state === PLAYER_STATES.RUN;
        if (!(ground && fromGround) || stateAge >= ANIMATION_MIN_HOLD) {
          animator.play(desired, { restart: true });
          stateAge = 0;
          // caiu de uma borda sem pular: começa já na pose de queda (sem "agachar" no ar)
          if (desired === PLAYER_STATES.JUMP && !airFromJump) {
            animator.frameIndex = animator.animations.jump.frames.length - 1;
            animator.finished = true;
          }
        }
      }
      animator.update(dt);
    },

    /** Desenha na posição interpolada entre o passo anterior e o atual. */
    render(alpha) {
      if (mode === MODES.HIDDEN || mode === MODES.GONE) return;
      const x = lerp(body.prevX, body.x, alpha);
      const y = lerp(body.prevY, body.y, alpha);
      animator.setPosition(x - BODY.x * scale, y - BODY.y * scale);
      // ao sair do bloco, a parte do corpo ainda abaixo do topo fica recortada
      const clip = emerge ? (y + body.height - emerge.platform.y) / scale : 0;
      animator.setClipBottom(clip);
      animator.render();
    },

    /** Centro do corpo (para a câmera), interpolado. */
    focus(alpha) {
      return { y: lerp(body.prevY, body.y, alpha) + body.height / 2, vy: body.vy };
    },

    /** Dano (usado pela etapa 3). Retorna false se já estiver invulnerável ou fora de jogo. */
    hurt({ fromX = null } = {}) {
      if (mode !== MODES.ACTIVE || invulnerable > 0 || damageTimer > 0) return false;
      damageTimer = DAMAGE.duration;
      invulnerable = DAMAGE.invulnerable;
      const dir = fromX == null ? -facing : Math.sign(body.x + body.width / 2 - fromX) || -facing;
      body.vx = dir * DAMAGE.knockbackX;
      body.vy = -DAMAGE.knockbackY;
      body.grounded = body.wasGrounded = false;
      jumpsUsed = Math.max(jumpsUsed, 1);
      canCut = false;
      animator.play(PLAYER_STATES.DAMAGE, { restart: true });
      stateAge = 0;
      emitter.emit("player:damage");
      return true;
    },

    /** Morte: desliga a hitbox e as colisões; a gravidade continua e o corpo cai para fora da área. */
    die() {
      if (mode !== MODES.ACTIVE) return false;
      mode = MODES.DEAD;
      body.platformCollision = false;
      body.vx *= 0.4;
      invulnerable = 0;
      damageTimer = 0;
      canCut = false;
      input.clearPresses();
      animator.play(PLAYER_STATES.DAMAGE, { restart: true });
      stateAge = 0;
      emitter.emit("player:died");
      return true;
    },

    /** Some visualmente (entrou na região final). A simulação do corpo para. */
    vanish() {
      mode = MODES.GONE;
      body.active = false;
      element.hidden = true;
    },

    /** Estado inicial (reinício): escondido, sem velocidade, pronto para spawn(). */
    reset() {
      mode = MODES.HIDDEN;
      facing = 1;
      jumpsUsed = 0;
      coyote = buffer = 0;
      canCut = airFromJump = false;
      damageTimer = invulnerable = stateAge = 0;
      lastSafe = null;
      emerge = null;
      body.active = false;
      body.platformCollision = true;
      body.fallen = false;
      body.grounded = body.wasGrounded = false;
      body.ground = null;
      body.vx = body.vy = 0;
      element.hidden = true;
      element.removeAttribute("data-invulnerable");
      animator.play(PLAYER_STATES.IDLE, { restart: true });
      animator.flip = false;
      input.clearPresses();
    },

    /** Volta à última plataforma segura (após uma queda). */
    respawn() {
      const p = lastSafe ?? world.platforms[0];
      if (!p) return;
      body.x = p.x + p.width / 2 - body.width / 2;
      body.y = p.y - body.height;
      body.prevX = body.x;
      body.prevY = body.y;
      body.vx = body.vy = 0;
      body.fallen = false;
      jumpsUsed = 0;
      emitter.emit("player:respawn", { platform: p });
    },

    setDebug(on) {
      element.toggleAttribute("data-debug", Boolean(on));
    },

    destroy() {
      world.removeBody(body);
      offLand();
      offFall();
      element.remove();
    },
  };

  const offLand = emitter.on("land", ({ body: landed, platform, speed }) => {
    if (landed !== body) return;
    lastSafe = platform;
    emitter.emit("player:land", { platform, speed });
  });
  const offFall = emitter.on("fall", ({ body: fallen }) => {
    if (fallen !== body) return;
    if (mode === MODES.DEAD) emitter.emit("player:fell"); // a queda fatal saiu do mundo
    else if (mode === MODES.ACTIVE) player.respawn();
  });

  return player;
}
