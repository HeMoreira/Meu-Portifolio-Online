/* ==========================================================================
   Física — mundo com gravidade e colisão com plataformas.

   • Passo FIXO (PHYSICS.step): quem chama (index.js) acumula o tempo e executa
     world.step(step) quantas vezes couber → o resultado não depende da taxa de
     quadros do dispositivo.
   • Plataformas são retângulos { x, y, width, height } em coordenadas do DOCUMENTO,
     criados por platforms.js — nunca elementos SVG/DOM.
   • Colisão "one-way": só se aterrissa POR CIMA. Um corpo que desce com a base
     acima do topo da plataforma no passo anterior e abaixo dele no atual pousa;
     por baixo e pelos lados é atravessável (dá para saltar "através" do bloco).
   • Corpos genéricos: qualquer entidade (jogador, inimigos da etapa 3) é um
     { x, y, width, height, vx, vy, ... } registrado com addBody().
   ========================================================================== */
import { PHYSICS } from "./config.js";

const EPS = 0.01;

/** Interseção de dois retângulos { x, y, width, height } (base da detecção de dano). */
export function overlaps(a, b) {
  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}

/**
 * @param {{emitter: ReturnType<import("./events.js").createEmitter>, config?: typeof PHYSICS}} options
 */
export function createWorld({ emitter, config = PHYSICS }) {
  /** @type {Array<{x:number,y:number,width:number,height:number}>} */
  let platforms = [];
  const bodies = new Set();
  /** Limites do mundo: paredes laterais, teto e plano de queda (kill plane). */
  const bounds = { left: 0, right: window.innerWidth, top: 0, bottom: Infinity };

  function stepBody(body, dt) {
    body.prevX = body.x;
    body.prevY = body.y;
    body.wasGrounded = body.grounded;
    body.grounded = false;
    body.ground = null;

    if (body.gravityScale) {
      body.vy = Math.min(body.vy + config.gravity * body.gravityScale * dt, config.maxFallSpeed);
    }

    // ---- horizontal (paredes nas bordas da tela) ----
    body.x += body.vx * dt;
    const maxX = bounds.right - body.width;
    if (body.x < bounds.left) {
      body.x = bounds.left;
      body.vx = Math.max(body.vx, 0);
    } else if (body.x > maxX) {
      body.x = maxX;
      body.vx = Math.min(body.vx, 0);
    }

    // ---- vertical ----
    const prevBottom = body.y + body.height;
    body.y += body.vy * dt;
    if (body.y < bounds.top) {
      body.y = bounds.top;
      body.vy = Math.max(body.vy, 0);
    }

    if (body.platformCollision && body.vy >= 0) {
      const bottom = body.y + body.height;
      let landing = null;
      for (const platform of platforms) {
        const overlapX = body.x + body.width > platform.x && body.x < platform.x + platform.width;
        if (overlapX && prevBottom <= platform.y + EPS && bottom >= platform.y) {
          if (!landing || platform.y < landing.y) landing = platform; // a mais alta é a primeira atingida
        }
      }
      if (landing) {
        const speed = body.vy;
        body.y = landing.y - body.height;
        body.vy = 0;
        body.grounded = true;
        body.ground = landing;
        if (!body.wasGrounded) emitter.emit("land", { body, platform: landing, speed });
      }
    }

    if (body.y > bounds.bottom && !body.fallen) {
      body.fallen = true; // dispara uma vez até alguém reposicionar o corpo
      emitter.emit("fall", { body });
    }
  }

  return {
    bounds,
    get platforms() {
      return platforms;
    },
    bodies,
    setPlatforms(list) {
      platforms = list;
    },
    /** Cria um corpo com os padrões do jogo; `props` sobrescreve qualquer campo. */
    addBody(props) {
      const body = {
        x: 0, y: 0, width: 0, height: 0, vx: 0, vy: 0,
        prevX: 0, prevY: 0,
        gravityScale: 1,
        platformCollision: true,
        active: true, // false = a simulação ignora o corpo (ex.: durante a saída do bloco)
        grounded: false, wasGrounded: false, ground: null, fallen: false,
        ...props,
      };
      bodies.add(body);
      return body;
    },
    removeBody(body) {
      bodies.delete(body);
    },
    /** Um passo de simulação de `dt` segundos para todos os corpos ativos. */
    step(dt) {
      for (const body of bodies) if (body.active) stepBody(body, dt);
    },
    /** Corpos cuja caixa intersecta `rect` (etapa 3: feixes, inimigos). */
    query(rect, predicate = () => true) {
      return [...bodies].filter((body) => body.active && overlaps(body, rect) && predicate(body));
    },
  };
}
