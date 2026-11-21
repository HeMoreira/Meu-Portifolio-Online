/* ==========================================================================
   Efeitos — UM canvas fixo sobre a tela para feixes e luzes de coleta.

   Por que canvas: feixes e partículas mudam todo quadro; num único canvas isso
   custa zero nós de DOM e nenhum recálculo de layout. O canvas só é redesenhado
   enquanto há algo a mostrar (e limpo uma vez quando tudo acaba).

   Coordenadas: tudo entra em px do DOCUMENTO (sem zoom) e é convertido para a tela
   por `project` (rolagem + zoom direcional do view.js) no momento do desenho.

   FEIXES  (dados vindos de enemies.js: { mode, x1,y1,x2,y2 })
     preview  vermelho-escuro, fino, sem dano
     strike   vermelho neon, grosso, com núcleo claro
     Desenhados em "pixels" de BEAM.pixel px alinhados a uma grade (estética pixel
     art; nada de antialiasing).

   LUZES   burst({ from, target, onArrive })
     LIGHTS.count luzes nascem em anel ao redor de `from`; a i-ésima parte LIGHTS.stagger·i
     segundos depois, acelera em direção ao alvo (re-mirado a cada quadro) e some
     ao chegar ao centro dele. A cauda é um triângulo com pontas arredondadas, na
     direção contrária ao movimento, que cresce com a velocidade.
   ========================================================================== */
import { h } from "../core.js";
import { BEAM, LIGHTS } from "./config.js";

const TAU = Math.PI * 2;

/**
 * @param {{
 *   getBeams?: () => Array<{mode:string,x1:number,y1:number,x2:number,y2:number}>,
 *   project?: (x: number, y: number, out: {x:number,y:number}) => {x:number,y:number},
 * }} [options]  project: documento → tela (view.js, inclui o zoom); padrão = só a rolagem
 */
export function createFx({ getBeams = () => [], project = defaultProject } = {}) {
  const canvas = h("canvas", { class: "game-fx", "data-game-ui": "", "aria-hidden": "true" });
  const ctx = canvas.getContext("2d");
  document.body.append(canvas);

  let dpr = 1;
  let dirty = true;
  /** @type {Array<any>} */
  const lights = []; // compactado no lugar: nenhuma alocação por quadro
  const colors = { fill: "#8ab4ff", detail: "#2f64ff" };
  const pa = { x: 0, y: 0 }; // pontos de tela reutilizados
  const pb = { x: 0, y: 0 };
  const pt = { x: 0, y: 0 };

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    dirty = true;
  }
  resize();
  window.addEventListener("resize", resize);

  /** Lê accent-fill / accent-detail do tema atual (claro/escuro) quando precisa. */
  function readColors() {
    const style = getComputedStyle(document.documentElement);
    colors.fill = style.getPropertyValue("--accent-fill").trim() || colors.fill;
    colors.detail = style.getPropertyValue("--accent-detail").trim() || colors.detail;
  }

  /* ---------- feixe em pixels ---------- */
  function pixelLine(x1, y1, x2, y2, cells, color) {
    const px = BEAM.pixel;
    const steps = Math.max(1, Math.ceil(Math.hypot(x2 - x1, y2 - y1) / (px * 0.75)));
    const half = Math.floor(cells / 2);
    ctx.fillStyle = color;
    let lastX = NaN;
    let lastY = NaN;
    for (let i = 0; i <= steps; i++) {
      const gx = Math.floor((x1 + ((x2 - x1) * i) / steps) / px);
      const gy = Math.floor((y1 + ((y2 - y1) * i) / steps) / px);
      if (gx === lastX && gy === lastY) continue;
      lastX = gx;
      lastY = gy;
      ctx.fillRect((gx - half) * px, (gy - half) * px, cells * px, cells * px);
    }
  }

  /** Quadrado em pixels na boca do inimigo: carrega na prévia, "estoura" no disparo. */
  function muzzle(x, y, cells, color) {
    const px = BEAM.pixel;
    ctx.fillStyle = color;
    ctx.fillRect(Math.floor(x / px) * px - Math.floor(cells / 2) * px, Math.floor(y / px) * px - Math.floor(cells / 2) * px, cells * px, cells * px);
  }

  function drawBeam(beam, now) {
    project(beam.x1, beam.y1, pa);
    project(beam.x2, beam.y2, pb);
    if (beam.mode === "preview") {
      // pulsa levemente (alterna a espessura em passos) para a prévia ficar legível
      const on = Math.floor(now / 140) % 2;
      pixelLine(pa.x, pa.y, pb.x, pb.y, on ? BEAM.preview.width : BEAM.preview.width + 1, BEAM.preview.color);
      muzzle(pa.x, pa.y, on ? 2 : 3, BEAM.preview.color);
    } else if (beam.mode === "strike") {
      pixelLine(pa.x, pa.y, pb.x, pb.y, BEAM.strike.width + 2, "rgb(255 23 68 / 0.35)"); // halo
      pixelLine(pa.x, pa.y, pb.x, pb.y, BEAM.strike.width, BEAM.strike.color);
      pixelLine(pa.x, pa.y, pb.x, pb.y, 1, BEAM.strike.core);
      muzzle(pa.x, pa.y, 4, BEAM.strike.core);
    }
  }

  /* ---------- luzes com cauda ---------- */
  function drawLight(p) {
    project(p.x, p.y, pt);
    const x = pt.x;
    const y = pt.y;
    const r = LIGHTS.radius * p.scale;
    ctx.globalAlpha = p.alpha;
    if (p.phase === "wait") {
      ctx.fillStyle = colors.fill;
      ctx.globalAlpha = 0.35 * p.alpha;
      ctx.beginPath();
      ctx.arc(x, y, r * 1.9, 0, TAU);
      ctx.fill();
      ctx.globalAlpha = p.alpha;
    } else {
      const speed = Math.hypot(p.vx, p.vy) || 1;
      const dx = p.vx / speed;
      const dy = p.vy / speed;
      const len = Math.min(LIGHTS.tailMax, speed * LIGHTS.tailPerSpeed) * p.scale;
      const tipX = x - dx * len;
      const tipY = y - dy * len;
      // triângulo: base = diâmetro da luz, ponta atrás; lineJoin round arredonda as pontas
      const grad = ctx.createLinearGradient(x, y, tipX, tipY);
      grad.addColorStop(0, colors.fill);
      grad.addColorStop(1, "rgb(255 255 255 / 0)");
      ctx.fillStyle = grad;
      ctx.strokeStyle = grad;
      ctx.lineJoin = "round";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x - dy * r, y + dx * r);
      ctx.lineTo(tipX, tipY);
      ctx.lineTo(x + dy * r, y - dx * r);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.globalAlpha = 0.45 * p.alpha;
      ctx.fillStyle = colors.fill;
      ctx.beginPath();
      ctx.arc(x, y, r * 1.8, 0, TAU);
      ctx.fill();
      ctx.globalAlpha = p.alpha;
    }
    // cabeça circular: contorno accent-detail, miolo branco
    ctx.fillStyle = colors.detail;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, TAU);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(x, y, r * 0.62, 0, TAU);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  /**
   * Cada luz é um corpo independente: espera em anel, parte (com atraso próprio) com um
   * impulso para FORA do orbe, acelera e curva aos poucos rumo ao personagem (steer),
   * encolhendo/esmaecendo nos últimos pixels até sumir no centro dele.
   */
  function stepLights(dt) {
    let w = 0;
    for (let i = 0; i < lights.length; i++) {
      const p = lights[i];
      p.age += dt;
      const to = p.target();
      if (p.phase === "wait") {
        const a = p.angle + p.age * 2.2; // gira devagar ao redor da origem
        p.x = p.ox + Math.cos(a) * LIGHTS.ring;
        p.y = p.oy + Math.sin(a) * LIGHTS.ring;
        if (p.age >= p.delay) {
          p.phase = "fly";
          p.speed = LIGHTS.startSpeed * p.mul;
          p.vx = Math.cos(a) * LIGHTS.burst; // sai pela tangente/rumo externo do anel
          p.vy = Math.sin(a) * LIGHTS.burst;
        }
        lights[w++] = p;
        continue;
      }
      const dx = to.x - p.x;
      const dy = to.y - p.y;
      const dist = Math.hypot(dx, dy);
      p.speed = Math.min(LIGHTS.maxSpeed * p.mul, p.speed + LIGHTS.accel * dt);
      if (dist <= Math.max(p.speed * dt, 8)) {
        p.onArrive?.(p); // chegou ao centro do personagem
        continue;
      }
      const k = 1 - Math.exp(-LIGHTS.steer * dt);
      p.vx += ((dx / dist) * p.speed - p.vx) * k;
      p.vy += ((dy / dist) * p.speed - p.vy) * k;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      const near = Math.min(1, dist / LIGHTS.fade);
      p.alpha = 0.25 + 0.75 * near;
      p.scale = 0.4 + 0.6 * near;
      lights[w++] = p;
    }
    lights.length = w;
  }

  const api = {
    get active() {
      return lights.length > 0;
    },
    /**
     * Lança as luzes da coleta.
     * @param {{from: {x:number,y:number}, target: () => {x:number,y:number}, count?: number, onArrive?: (p:any)=>void}} options
     */
    burst({ from, target, count = LIGHTS.count, onArrive }) {
      readColors();
      // teto de luzes simultâneas: descarta as mais antigas
      const overflow = lights.length + count - LIGHTS.maxActive;
      if (overflow > 0) lights.splice(0, overflow);
      const base = Math.random() * 0.6;
      for (let i = 0; i < count; i++) {
        const angle = base + (i / count) * TAU;
        lights.push({
          ox: from.x, oy: from.y,
          x: from.x + Math.cos(angle) * LIGHTS.ring, y: from.y + Math.sin(angle) * LIGHTS.ring,
          vx: 0, vy: 0, speed: 0, angle, age: 0,
          mul: 1 + (Math.random() * 2 - 1) * LIGHTS.jitter, // velocidade própria
          delay: i * LIGHTS.stagger, // cada luz parte 0,2 s depois da anterior
          phase: "wait", alpha: 1, scale: 1, target, onArrive,
        });
      }
      dirty = true;
    },
    /** @param {number} dt segundos @param {number} now ms */
    update(dt, now = performance.now()) {
      const beams = getBeams();
      let hasBeam = false;
      for (const b of beams) if (b.mode !== "off") hasBeam = true;
      if (lights.length) stepLights(dt);
      if (!hasBeam && !lights.length && !dirty) return;
      dirty = false;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const beam of beams) drawBeam(beam, now);
      for (const p of lights) drawLight(p);
      if (hasBeam || lights.length) dirty = true; // redesenha até apagar; o último quadro limpo vem a seguir
    },
    /** Apaga luzes e feixes da tela. */
    clear() {
      lights.length = 0;
      dirty = true;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    },
    destroy() {
      window.removeEventListener("resize", resize);
      canvas.remove();
      lights.length = 0;
    },
  };
  return api;
}

function defaultProject(x, y, out) {
  out.x = x - window.scrollX;
  out.y = y - window.scrollY;
  return out;
}
