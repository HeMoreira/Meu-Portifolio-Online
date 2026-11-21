/* ==========================================================================
   Configuração do jogo — TODOS os números ajustáveis em um só lugar.
   Unidades: px de CSS (do documento) e segundos, salvo indicação.
   ========================================================================== */

/* ---------- Spritesheet do personagem ----------
   Quadros de EXATAMENTE `frame` × `frame` px, em `columns` colunas. O arquivo é
   usado em tamanho natural (sem background-size) e ampliado por `scale` INTEIRO
   com image-rendering: pixelated, então cada pixel do sprite vira scale×scale
   pixels de tela, sem recorte nem borrão. Para trocar a arte: substitua o PNG
   mantendo o layout (ou mude `src`, `frame`, `columns` e ANIMATIONS abaixo). */
export const SPRITESHEET = {
  src: "images/game/player.png", // relativo a /assets/
  frame: 32,
  columns: 4,
  rows: 5,
  scale: 3,
};

/* ---------- Animações ----------
   row       linha do spritesheet (a ordem dos grupos é livre)
   frames    colunas usadas, na ordem de reprodução (pode repetir ou pular quadros)
   interval  ms por quadro (antes de aplicar `speed`)
   loop      true: repete · false: para no último quadro
   Tudo isto pode ser alterado em tempo de execução: player.animator.animations. */
export const ANIMATIONS = {
  idle: { row: 0, frames: [0, 1, 2, 3], interval: 220, loop: true },
  run: { row: 1, frames: [0, 1, 2, 3], interval: 95, loop: true },
  jump: { row: 2, frames: [0, 1, 2, 3], interval: 110, loop: false },
  doubleJump: { row: 3, frames: [0, 1, 2, 3], interval: 75, loop: false },
  damage: { row: 4, frames: [0, 1, 2, 3], interval: 90, loop: true },
};

/** Tempo mínimo (ms) em uma animação antes de trocar por idle/run (evita piscadas). */
export const ANIMATION_MIN_HOLD = 90;

/* ---------- Corpo físico dentro do quadro (px do spritesheet) ----------
   A hitbox do personagem NÃO é o quadro: é a caixa do corpo desenhada dentro dele. */
export const BODY = { x: 9, y: 10, width: 14, height: 22 };

/* ---------- Física ---------- */
export const PHYSICS = {
  step: 1 / 120, // passo fixo da simulação (s); o render interpola
  maxSteps: 8,
  gravity: 2400, // px/s²
  maxFallSpeed: 1300,
  runSpeed: 300, // px/s
  groundAccel: 3200,
  groundFriction: 3600,
  airAccel: 2000,
  airFriction: 700,
  jumpSpeed: 780, // salto inicial (≈127 px de altura)
  doubleJumpSpeed: 720, // segundo salto (≈108 px)
  jumpCutFactor: 0.5, // soltar o salto cedo corta a subida (salto variável)
  coyoteTime: 0.1, // s de tolerância para pular logo depois de sair da borda
  jumpBuffer: 0.12, // s: salto pedido pouco antes de aterrissar ainda vale
  maxJumps: 2, // salto + salto duplo
};

/* ---------- Plataformas (hitboxes) ----------
   Cada bloco de mídia vira uma plataforma "one-way" (só se aterrissa por cima).
   A hitbox é um retângulo CALCULADO a partir do bloco, independente do SVG:
     top      deslocamento do topo da hitbox em relação ao topo do bloco (px; negativo = acima)
     inset    recuo lateral (px) de cada lado
     height   espessura da hitbox (px)
   Cada bloco pode sobrescrever com data-hitbox-top / -inset / -height. */
export const PLATFORM = { top: 0, inset: 6, height: 24 };

/* ---------- Câmera vertical ---------- */
export const CAMERA = {
  anchor: 0.58, // o personagem fica a 58% da altura da tela (um pouco abaixo do centro)
  /* Mola amortecida (aceleração e desaceleração suaves): a câmera ACELERA rumo ao alvo e
     freia ao chegar, com um leve "respiro" (damping < 1 ⇒ ultrapassa uma fração de pixel). */
  frequency: 9, // rad/s: maior = mais "colada" (≈ 0,5 s para assentar)
  damping: 0.88, // 1 = amortecimento crítico (sem bounce); < 1 deixa o bounce discreto
  maxSpeed: 2400, // px/s: teto da velocidade da câmera
  lookAhead: 0.12, // s·vy: olha um pouco para onde o personagem está indo
  lookAheadMax: 140,
  bottomPadding: 0.3, // limite inferior do jogo = base da última plataforma + 30% da tela
  /* Bounce de pouso: a câmera "afunda" um pouco e volta. Só em quedas fortes. */
  landKick: { minSpeed: 520, scale: 0.09, max: 130 },
};

/* ---------- Zoom direcional (camada visual, view.js) ----------
   O jogo todo se aproxima `amount` (fração) na direção do movimento horizontal e
   volta ao normal ao parar. É só um transform visual: a física, as hitboxes e as
   colisões continuam em coordenadas sem zoom.
   max      ampliação máxima (0,03 = 3 %)
   ahead    px: o centro do zoom fica um pouco à frente do personagem, no sentido do movimento
   rise/fall  1/s: velocidade de entrada/saída do efeito (a saída é mais lenta)
   turn     1/s: suavização da troca de sentido */
export const ZOOM = { max: 0.03, ahead: 160, rise: 2.6, fall: 2.2, turn: 5 };

/* ---------- Surgimento (saída do topo do primeiro bloco) ---------- */
export const EMERGE = {
  rise: 56, // px acima do topo do bloco
  duration: 0.55, // s
  hideInside: 0.85, // fração do corpo que começa dentro do bloco (recortada)
};

/* ---------- Dano ----------
   duration      s no estado "damage" (animação própria, sem controles)
   invulnerable  s de invulnerabilidade a partir do golpe (inclui o tempo de "damage").
                 É um temporizador DO PERSONAGEM (player.hurt() recusa golpes enquanto ativo):
                 nenhum inimigo precisa conhecer a regra.
   knockback     impulso do golpe (px/s) */
export const DAMAGE = { duration: 2, invulnerable: 3.2, knockbackX: 170, knockbackY: 300 };

/* ---------- Teclas (valor de KeyboardEvent.key; letras em minúsculo) ---------- */
export const KEYS = {
  left: ["ArrowLeft", "a"],
  right: ["ArrowRight", "d"],
  jump: ["ArrowUp", " ", "w"],
  start: ["Enter", " "], // "Press Enter" na introdução
};

/* ---------- Vidas ---------- */
export const LIVES = { max: 3, initial: 3 };


/* ==========================================================================
   Etapa 3 — inimigos, combate, pontuação e fim de jogo
   ========================================================================== */

/* ---------- Spritesheets dos inimigos ----------
   Um PNG por inimigo (ENEMIES.sheets), todos com este layout: quadros de EXATOS
   32×32 px, 4 colunas × 3 linhas, uma animação por linha. Substituir a arte NÃO
   altera o comportamento: só o que está em ENEMY_SHEET/ENEMY_ANIMATIONS importa. */
export const ENEMY_SHEET = { frame: 32, columns: 4, rows: 3, scale: 3 };

/* Mesmo formato de ANIMATIONS. A animação "attack" comanda o ataque:
   quadros 1–2 (índices 0–1) = prévia do feixe · quadro 3 (índice 2) = disparo. */
export const ENEMY_ANIMATIONS = {
  spawn: { row: 0, frames: [0, 1, 2, 3], interval: 160, loop: false },
  idle: { row: 1, frames: [0, 1, 2, 3], interval: 220, loop: true },
  attack: { row: 2, frames: [0, 1, 2, 3], interval: 420, loop: false },
};

/* ---------- Inimigos ----------
   sheets        PNGs (relativo a /assets/); o nº de arquivos = nº de inimigos (2)
   sides         lado inicial de cada um
   body          hitbox dentro do quadro (px do spritesheet)
   spawnDepth    o jogador saiu da 1ª plataforma e desceu este tanto abaixo do topo dela → aparecem
   cycle         s de um ciclo completo esquerda → direita → esquerda (cada travessia = cycle/2)
   margin        distância das laterais da tela (px)
   spring        mola vertical (frequency rad/s, damping) que persegue a altura do jogador
   brake/launch  1/s: freada ao atacar e retomada depois (suaviza a velocidade do cruzamento)
   bob           flutuação vertical (px, ciclos/s)
   viewMargin    margens (px) que os mantêm dentro da área visível
   facingDeadZone  px: abaixo disto não trocam o lado para o qual olham */
export const ENEMIES = {
  sheets: ["images/game/enemy-a.png", "images/game/enemy-b.png"],
  sides: ["left", "right"],
  body: { x: 4, y: 5, width: 21, height: 23 },
  spawnDepth: 220,
  cycle: 9,
  margin: 14,
  /* Vertical: mola própria (mais lenta e mais "solta" que a câmera): eles acompanham a
     altura do jogador com atraso e um leve vai-e-vem, em vez de ficarem presos a ela. */
  spring: { frequency: 2.6, damping: 0.55 },
  /* Velocidade do cruzamento: ao interromper (ataque) a velocidade cai suavemente a zero
     e volta suavemente depois — `brake`/`launch` em 1/s. */
  brake: 9,
  launch: 2.4,
  bob: { amplitude: 9, speed: 0.45 },
  viewMargin: { top: 140, bottom: 110 }, // mantém os inimigos fora do cabeçalho, das vidas (topo) e do HUD (base)
  facingDeadZone: 8,
};

/* ---------- Ataque ----------
   first      s após o início do combate (fim do "spawn") até o 1º ataque
   interval   s entre ataques DO MESMO inimigo (início a início)
   stagger    defasagem entre os inimigos (interval / nº de inimigos ⇒ ataques alternados)
   strikeFrame  índice do quadro de "attack" em que o feixe fica neon e a colisão é verificada
   aimSmoothing 1/s: o feixe persegue o jogador com este atraso (permite desviar)
   overshoot    px que o feixe segue além do ponto mirado
   muzzle       origem do feixe dentro do quadro (px do spritesheet) */
export const ATTACK = {
  first: 3,
  interval: 6,
  stagger: 3,
  strikeFrame: 2,
  aimSmoothing: 7,
  overshoot: 56,
  muzzle: { x: 19, y: 16 },
};

/* ---------- Feixe (canvas; pixels de `pixel` px) ----------
   hitWidth  espessura efetiva (px) usada na colisão com a hitbox do jogador */
export const BEAM = {
  pixel: 4,
  preview: { color: "#7a0a1c", width: 1 },
  strike: { color: "#ff1744", core: "#ffd9e0", width: 3 },
  hitWidth: 16,
};

/* ---------- Pontuação ----------
   max         pontos para concluir (3)
   skipFirst   a plataforma inicial não pontua (é de onde o jogador parte) */
export const SCORE = { max: 3, skipFirst: true };

/* ---------- Luzes da coleta (canvas) ---------- */
export const LIGHTS = {
  count: 6,
  stagger: 0.2, // s entre o início de cada luz
  radius: 6,
  ring: 30, // raio (px) em que esperam ao redor do orbe
  startSpeed: 380, // px/s
  accel: 3400, // px/s²: cada luz acelera; a mira só vira (steer) aos poucos → curvas independentes
  steer: 7, // 1/s: quão rápido o rumo da luz converge para o alvo
  burst: 260, // px/s: impulso inicial para fora do orbe (espalha as seis luzes)
  jitter: 0.18, // variação aleatória de velocidade entre as luzes (±)
  maxSpeed: 1700,
  fade: 70, // px: nos últimos pixels antes do centro a luz encolhe e esmaece
  maxActive: 24, // teto de luzes simultâneas (várias coletas seguidas)
  tailPerSpeed: 0.06, // comprimento da cauda = velocidade × isto (px)
  tailMax: 96,
};

/* ---------- Região final (SOBRE o rodapé) ----------
   height      altura usada só se a página não tiver rodapé (px); minHeight: piso da região
   enterDepth  fração da altura que o personagem precisa atravessar para "entrar"
   endDelay    s entre sumir e abrir o modal
   fallMargin  px abaixo da tela visível a partir dos quais uma queda fatal está "fora da área jogável"
   deathDelay  s entre a queda fatal sair da área e o modal */
export const END_ZONE = { height: 220, minHeight: 48, enterDepth: 0.35, endDelay: 0.55, fallMargin: 60, deathDelay: 0.5, deathTimeout: 4 };


/* ---------- Pouso numa plataforma: luz que pisca no topo da imagem (media-blocks.js) ---------- */
export const LANDING_FLASH = { duration: 420 };
