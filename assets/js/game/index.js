/* ==========================================================================
   Jogo do modo secreto — MÓDULO DE INICIALIZAÇÃO (único ponto de entrada).

   É importado dinamicamente por easter-egg/secret-mode.js durante o 3º pulso:
       const mod = await import("../game/index.js");
       const resources = await mod.loadGame({ signal });   // carga (loader.js)
       const game = mod.mountGame(resources, { … });        // montagem (tela coberta)
       game.destroy();                                      // desfaz TUDO (saída)

   Mapa de responsabilidades (assets/js/game/):
     loader.js      carrega estilos, fontes, módulos e o spritesheet
     config.js      TODOS os números ajustáveis (física, câmera, sprites, teclas…)
     state.js       estado observável: fase, vidas, progresso do tutorial
     events.js      emissor de eventos entre os sistemas
     renderer.js    ÚNICO laço requestAnimationFrame (zero custo sem sistemas)
     input.js       teclas pressionadas → ações
     physics.js     mundo: gravidade, passo fixo, colisão one-way, corpos
     platforms.js   hitboxes dos blocos (independentes do SVG)
     player.js      personagem: estados, saltos, surgimento, dano
     animator.js    animação de sprites 32×32 configurável
     camera.js      câmera vertical suave (rolagem da página)
     enemies.js     os dois inimigos: spawn, movimento cíclico, ataque, feixe (dados)
     match.js       regras: dano/vidas, pontuação, relógio, aparição, término
     fx.js          canvas único: feixes e luzes de coleta
     view.js        zoom direcional (camada visual; a física nunca vê o zoom)
     endzone.js     região luminosa final (acima do rodapé)
     ui/*           hud (sair), popup, vidas, modal de fim, trava de links
     world/*        troca das mídias por SVGs (blocos) e introdução

   FLUXO:  INTRO ──Enter/Espaço──► EMERGING ──saiu do bloco──► PLAYING ──meta/morte──► ENDED
                ▲                                                                       │
                └──────────────── reset() (Jogar novamente, sob o pulso longo) ◄─────────┘
   O laço (único rAF) só é registrado quando o jogo COMEÇA e é REMOVIDO quando a
   partida termina: na introdução e no modal não há física nem rAF do jogo rodando.

   Etapa 4 (polimento): ganchos prontos — eventos do emitter (land, score, player:jump,
   player:life-lost, enemy:attack, enemy:hit, match:end), camera.targetFor()/setY(),
   fx (canvas) para partículas, data-outcome no modal.
   ========================================================================== */
import { loadResources } from "./loader.js";
import { createGameState, PHASES } from "./state.js";
import { createRenderer } from "./renderer.js";
import { createEmitter } from "./events.js";
import { CAMERA, LIVES, PHYSICS, SCORE } from "./config.js";
import { h } from "../core.js";

/** Fase de CARGA: baixa tudo o que o jogo precisa. Não toca no DOM da página. */
export function loadGame({ signal } = {}) {
  return loadResources({ signal });
}

/**
 * Fase de MONTAGEM: aplica a transformação visual e liga o jogo.
 * Chamada com a tela coberta, depois de <html data-secret-mode="on"> estar definido.
 * @param {Awaited<ReturnType<typeof loadGame>>} resources
 * @param {{onExitRequest: () => void}} options
 */
export function mountGame(resources, { onExitRequest, onRestartRequest = () => {}, onHomeRequest = onExitRequest }) {
  const {
    linksLock, hud, mediaBlocks, platforms: platformsMod, physics, input: inputMod, camera: cameraMod, player: playerMod,
    popup, lives, enemies: enemiesMod, fx: fxMod, endzone: endzoneMod, match: matchMod, endModal, view: viewMod,
  } = resources.modules;

  const emitter = createEmitter();
  const state = createGameState({
    phase: PHASES.INTRO,
    lives: LIVES.initial,
    maxLives: LIVES.max,
    // ações já realizadas pelo jogador (o popup de instruções some quando todas forem true)
    tutorial: { left: false, right: false, jump: false, doubleJump: false },
    score: 0,
    maxScore: SCORE.max,
    endReason: null, // "goal" | "dead"
    result: null, // { reason, lives, maxLives, score, maxScore, time } quando ENDED
  });
  const renderer = createRenderer();

  const lock = linksLock.lockLinks();
  const blocks = mediaBlocks.mountMediaBlocks(document);
  const ui = hud.mountHud({ onExit: onExitRequest });
  const livesUi = lives.mountLives({ state });
  const popupUi = popup.mountPopup({ state });
  const endUi = endModal.mountEndModal({
    state,
    sheetUrl: resources.images[0].src,
    onRestart: onRestartRequest,
    onExit: onHomeRequest,
  });

  // Camada do mundo: ancorada na origem do DOCUMENTO (rola junto com a página)
  const container = h("div", { class: "game-world", "data-game-ui": "" });
  document.body.append(container);

  // Zoom direcional: só as camadas do conteúdo/mundo (o cabeçalho e a interface fixa não escalam)
  const view = viewMod.createView({
    layers: [document.querySelector("main"), document.querySelector(".site-footer"), container].filter(Boolean),
  });

  const platforms = platformsMod.createPlatforms({ blocks: blocks.all, emitter, rectOf: view.rectOf });
  const world = physics.createWorld({ emitter });
  world.setPlatforms(platforms.list);
  const input = inputMod.createInput();
  const player = playerMod.createPlayer({ world, input, emitter, container, sheetUrl: resources.images[0].src });
  const endZone = endzoneMod.createEndZone({ container, rectOf: view.rectOf });
  // a câmera precisa conseguir mostrar a região final (e um pouco do rodapé)
  const camera = cameraMod.createCamera({ getWorldBottom: () => Math.max(platforms.bottom, endZone.bottom) });

  // inimigos: camada própria ACIMA do personagem (css/game/combat.css documenta as camadas)
  const enemiesLayer = h("div", { class: "game-enemies", "data-game-ui": "" });
  document.body.append(enemiesLayer);
  view.addLayer(enemiesLayer);
  const focus = { x: 0, y: 0 }; // objeto reutilizado (centro do personagem)
  const target = {
    center() {
      focus.x = player.body.x + player.body.width / 2;
      focus.y = player.body.y + player.body.height / 2;
      return focus;
    },
    hitbox: () => player.hitbox,
  };
  const enemies = enemiesMod.createEnemies({
    emitter,
    container: enemiesLayer,
    world,
    target,
    sheetUrls: resources.images.slice(1).map((img) => img.src),
  });
  const fx = fxMod.createFx({ getBeams: () => enemies.beams, project: view.project });
  const match = matchMod.createMatch({ state, emitter, player, enemies, platforms, endZone, fx, rectOf: view.rectOf });

  /** Limites do mundo acompanham o layout (largura útil, plano de queda abaixo da última plataforma). */
  const syncBounds = () => {
    world.bounds.right = document.documentElement.clientWidth;
    endZone.measure();
    camera.refresh();
    // plano de queda: logo abaixo da região que a câmera consegue mostrar
    world.bounds.bottom = Math.max(platforms.bottom, endZone.bottom) + CAMERA.bottomPadding * window.innerHeight + 160;
  };
  syncBounds();

  const offs = [
    emitter.on("platforms:change", syncBounds),
    // progresso do tutorial: o estado registra cada ação feita ao menos uma vez
    emitter.on("player:move", ({ dir }) => mark(dir < 0 ? "left" : "right")),
    emitter.on("player:jump", ({ double }) => mark(double ? "doubleJump" : "jump")),
    emitter.on("player:emerged", () => state.set({ phase: PHASES.PLAYING })),
    // pouso válido: luz no topo da imagem e um bounce discreto da câmera
    emitter.on("player:land", ({ platform, speed }) => {
      platform.flash();
      camera.kick(speed);
    }),
    // fim da partida: PARA o laço (nenhuma física/rAF continua) e trava o teclado
    emitter.on("match:end", () => {
      renderer.remove(system);
      input.setMode("locked");
      fx.clear();
      view.reset();
    }),
  ];

  function mark(action) {
    const { tutorial } = state.get();
    if (!tutorial[action]) state.set({ tutorial: { ...tutorial, [action]: true } });
  }

  /* ---------- O laço: UM só, com passo fixo e interpolação ---------- */
  let accumulator = 0;
  const system = {
    update(dt) {
      accumulator += dt;
      let steps = 0;
      while (accumulator >= PHYSICS.step && steps < PHYSICS.maxSteps) {
        player.step(PHYSICS.step);
        world.step(PHYSICS.step);
        accumulator -= PHYSICS.step;
        steps++;
      }
      if (steps === PHYSICS.maxSteps) accumulator = 0;
      const alpha = accumulator / PHYSICS.step;

      player.animate(dt);
      player.render(alpha);
      const f = player.focus(alpha);
      camera.update(dt, f.y, f.vy);
      view.update(dt, player.controllable ? input.axis() : 0, target.center());

      enemies.update(dt);
      match.update(dt);
      fx.update(dt);
    },
  };

  /** INTRO → EMERGING: o personagem jogável substitui a introdução e sai do topo do bloco. */
  function start() {
    if (state.get().phase !== PHASES.INTRO) return;
    state.set({ phase: PHASES.EMERGING });
    blocks.intro?.leave?.();
    platforms.measure();
    player.spawn(platforms.list[0]);
    input.setMode("play");
    renderer.add(system); // o loop só existe a partir daqui
  }

  /**
   * REINÍCIO (sem recarregar a página): chamado com a tela coberta pelo pulso longo.
   * Vidas, pontos, relógio, orbes, inimigos e personagem voltam ao início; a introdução
   * reaparece e o jogo espera de novo o Enter.
   */
  function reset() {
    renderer.remove(system);
    accumulator = 0;
    input.setMode("intro");
    match.reset();
    enemies.reset();
    fx.clear();
    view.reset();
    player.reset();
    blocks.intro?.restore?.();
    state.set({
      phase: PHASES.INTRO,
      lives: LIVES.initial,
      score: 0,
      endReason: null,
      result: null,
      tutorial: { left: false, right: false, jump: false, doubleJump: false },
    });
    platforms.measure();
    camera.setY(0);
  }

  const focusIntro = () => blocks.intro?.focusTarget?.focus({ preventScroll: true });

  // Saída de emergência: Esc sempre sai (o usuário nunca fica preso ao personagem ou ao modal)
  const lifetime = new AbortController();
  window.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Escape" && !event.repeat && !event.defaultPrevented) onExitRequest();
    },
    { signal: lifetime.signal },
  );

  input.onStart(start);
  input.setMode("intro");

  // O foco vai para o bloco de introdução (não para "Sair"): Enter/Espaço iniciam
  focusIntro();

  if (new URLSearchParams(location.search).has("debug-hitboxes")) {
    platforms.setDebug(true);
    player.setDebug(true);
    enemies.setDebug(true);
  }

  return {
    state,
    emitter,
    renderer,
    world,
    platforms,
    player,
    camera,
    view,
    enemies,
    match,
    fx,
    endZone,
    input,
    /** { intro, platforms, all } — contêineres e camadas de interação por bloco (ver media-blocks.js). */
    blocks,
    start,
    reset,
    /** Devolve o foco ao bloco de introdução (chamar DEPOIS da transição: durante ela a página está inert). */
    focusIntro,
    /** Vidas (a etapa 3 chama isto ao detectar dano). */
    setLives(value) {
      state.set({ lives: Math.max(0, Math.min(value, state.get().maxLives)) });
    },
    setDebug(on) {
      platforms.setDebug(on);
      player.setDebug(on);
      enemies.setDebug(on);
    },
    destroy() {
      lifetime.abort();
      renderer.destroy();
      input.destroy();
      for (const off of offs) off();
      match.destroy();
      view.destroy();
      enemies.destroy();
      enemiesLayer.remove();
      fx.destroy();
      endZone.destroy();
      endUi.destroy();
      player.destroy();
      camera.destroy();
      platforms.destroy();
      popupUi.destroy();
      livesUi.destroy();
      container.remove();
      emitter.clear();
      state.destroy();
      ui.destroy();
      blocks.destroy();
      lock.unlock();
      resources.unload();
    },
  };
}
