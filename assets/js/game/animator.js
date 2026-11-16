/* ==========================================================================
   Animador de sprites — independente do personagem e do spritesheet.

   Desenha UM quadro do spritesheet num elemento de exatos frame×frame px
   (background-position em pixels inteiros, tamanho natural da imagem). A
   ampliação e o espelhamento são transforms inteiros; a posição é aplicada por
   quem usa (player.js) via setPosition().

   Configurável em tempo de execução:
     animator.animations[nome].{frames, interval, loop, row}   quadros e intervalo
     animator.speed        multiplicador de reprodução (2 = duas vezes mais rápido)
     animator.state        animação atual (play(nome) para trocar)
     animator.flip         true = espelhado horizontalmente
   ========================================================================== */

/**
 * @param {{
 *   element: HTMLElement,
 *   sheet: { url: string, frame: number, scale: number, columns: number, rows: number },
 *   animations: Record<string, {row: number, frames: number[], interval: number, loop: boolean}>,
 *   initial?: string,
 * }} options
 */
export function createAnimator({ element, sheet, animations, initial = "idle" }) {
  const { frame, scale } = sheet;
  const animator = {
    animations: structuredClone(animations),
    speed: 1,
    flip: false,
    state: initial,
    frameIndex: 0, // posição dentro de animations[state].frames
    finished: false, // true quando uma animação sem loop chegou ao fim
  };

  let elapsed = 0;
  let x = 0;
  let y = 0;
  let clipBottom = 0;
  let dirty = true;
  const last = { col: -1, row: -1, flip: null, x: NaN, y: NaN, clip: NaN };

  element.style.width = `${frame}px`;
  element.style.height = `${frame}px`;
  element.style.backgroundImage = `url("${sheet.url}")`;
  element.style.backgroundSize = `${frame * sheet.columns}px ${frame * sheet.rows}px`; // tamanho NATURAL
  element.style.transformOrigin = "0 0";

  const current = () => animator.animations[animator.state];

  animator.play = (name, { restart = false } = {}) => {
    if (!animator.animations[name]) throw new Error(`Animação desconhecida: ${name}`);
    if (name === animator.state && !restart) return;
    animator.state = name;
    animator.frameIndex = 0;
    animator.finished = false;
    elapsed = 0;
    dirty = true;
  };

  /** @param {number} dt segundos */
  animator.update = (dt) => {
    const anim = current();
    const interval = anim.interval / Math.max(animator.speed, 0.001) / 1000;
    if (animator.finished || interval <= 0) return;
    elapsed += dt;
    while (elapsed >= interval) {
      elapsed -= interval;
      if (animator.frameIndex < anim.frames.length - 1) animator.frameIndex++;
      else if (anim.loop) animator.frameIndex = 0;
      else {
        animator.finished = true;
        break;
      }
    }
  };

  /** Posição do canto superior esquerdo do QUADRO, em px de CSS (arredondada ao pixel). */
  animator.setPosition = (px, py) => {
    x = Math.round(px);
    y = Math.round(py);
  };

  /** Recorta a parte inferior do quadro (px do spritesheet); usado ao sair do bloco. */
  animator.setClipBottom = (px) => {
    clipBottom = Math.max(0, Math.round(px));
  };

  animator.render = () => {
    const anim = current();
    const col = anim.frames[Math.min(animator.frameIndex, anim.frames.length - 1)];
    if (
      dirty ||
      col !== last.col ||
      anim.row !== last.row ||
      animator.flip !== last.flip ||
      x !== last.x ||
      y !== last.y ||
      clipBottom !== last.clip
    ) {
      element.style.backgroundPosition = `${-col * frame}px ${-anim.row * frame}px`;
      element.style.transform = animator.flip
        ? `translate(${x + frame * scale}px, ${y}px) scale(${-scale}, ${scale})`
        : `translate(${x}px, ${y}px) scale(${scale})`;
      element.style.clipPath = clipBottom ? `inset(0 0 ${clipBottom}px 0)` : "";
      Object.assign(last, { col, row: anim.row, flip: animator.flip, x, y, clip: clipBottom });
      dirty = false;
    }
  };

  return animator;
}
