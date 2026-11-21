#!/usr/bin/env python3
"""
Gera os spritesheets PROTÓTIPO dos dois inimigos:
    assets/images/game/enemy-a.png   (sentinela redonda)
    assets/images/game/enemy-b.png   (sentinela com chifres)

Layout (precisa bater com ENEMY_SHEET / ENEMY_ANIMATIONS em assets/js/game/config.js):
    128 × 96 px  =  4 colunas × 3 linhas de quadros de EXATAMENTE 32×32 px
    linha 0 spawn · 1 idle · 2 attack   (4 quadros cada)

Os sprites olham para a DIREITA (o jogo espelha quando o alvo está à esquerda).
Attack: quadros 1–2 = carga (prévia do feixe) · quadro 3 = disparo · quadro 4 = recuperação.

Uso:  python3 tools/generate-enemy-spritesheets.py   (requer Pillow)
Para usar arte definitiva basta substituir os PNGs mantendo o layout.
"""
from pathlib import Path
from PIL import Image, ImageDraw

OUT = Path(__file__).resolve().parent.parent / "assets/images/game"
FRAME, COLS, ROWS = 32, 4, 3

THEMES = {
    "enemy-a": dict(line=(18, 14, 32), dark=(58, 52, 86), mid=(104, 96, 150), light=(168, 160, 214), horns=False),
    "enemy-b": dict(line=(30, 12, 18), dark=(96, 40, 56), mid=(150, 72, 92), light=(214, 128, 148), horns=True),
}
WHITE = (250, 250, 250)
RED_D = (122, 12, 28)
RED = (230, 28, 52)
NEON = (255, 40, 70)
PINK = (255, 200, 210)


def disc(d, cx, cy, r, fill):
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=fill)


def body(d, t, cx, cy, r, squash=0):
    """Corpo redondo com contorno, sombra e luz (pixel art, sem suavização)."""
    disc(d, cx, cy, r + 1, t["line"])
    disc(d, cx, cy, r, t["dark"])
    disc(d, cx - 1, cy - 1, max(r - 2, 1), t["mid"])
    if r >= 6:
        disc(d, cx - 3, cy - 3, max(r - 7, 1), t["light"])
    if t["horns"] and r >= 6:
        for sx in (-1, 1):
            hx = cx + sx * (r - 3)
            d.polygon([(hx - sx * 2, cy - r + 1), (hx + sx * 2, cy - r - 5), (hx + sx * 1, cy - r + 3)], fill=t["line"])
            d.polygon([(hx - sx * 1, cy - r + 1), (hx + sx * 2, cy - r - 4), (hx + sx * 1, cy - r + 2)], fill=t["mid"])
    elif r >= 6:
        for dx, dy in ((0, -r - 3), (-r - 2, 2), (r + 2, 2)):  # espinhos
            d.rectangle([cx + dx - 1, cy + dy - 1, cx + dx + 1, cy + dy + 1], fill=t["line"])


def eye(d, cx, cy, mood):
    """Olho voltado para a direita. mood: idle | blink | charge1 | charge2 | fire | recover."""
    ex, ey = cx + 3, cy
    if mood == "blink":
        d.rectangle([ex - 4, ey, ex + 4, ey + 1], fill=(18, 14, 32))
        return
    d.rectangle([ex - 5, ey - 4, ex + 5, ey + 4], fill=(18, 14, 32))
    d.rectangle([ex - 4, ey - 3, ex + 4, ey + 3], fill=WHITE)
    iris = {"idle": RED_D, "charge1": RED_D, "charge2": RED, "fire": NEON, "recover": RED_D}[mood]
    d.rectangle([ex - 1, ey - 2, ex + 3, ey + 2], fill=iris)
    if mood in ("fire", "charge2"):
        d.rectangle([ex + 1, ey - 1, ex + 2, ey + 1], fill=PINK if mood == "fire" else WHITE)
    else:
        d.rectangle([ex + 1, ey, ex + 2, ey], fill=(18, 14, 32))
    if mood == "fire":
        d.rectangle([ex - 5, ey - 4, ex + 5, ey - 4], fill=NEON)
        d.rectangle([ex - 5, ey + 4, ex + 5, ey + 4], fill=NEON)


def sparks(d, cx, cy, n, color):
    pts = [(cx + 11, cy - 6), (cx + 12, cy + 5), (cx + 9, cy - 1), (cx + 13, cy)]
    for x, y in pts[:n]:
        d.rectangle([x, y, x + 1, y + 1], fill=color)


def cell(name, t, row, col):
    img = Image.new("RGBA", (FRAME, FRAME), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    cx, cy = 14, 16
    if row == 0:  # spawn: nasce de um ponto de luz
        if col == 0:
            disc(d, 16, 16, 2, WHITE)
        elif col == 1:
            disc(d, 16, 16, 6, t["light"]); disc(d, 16, 16, 4, WHITE); disc(d, 16, 16, 2, t["mid"])
        elif col == 2:
            body(d, t, 15, 16, 9); eye(d, 15, 16, "blink")
            d.rectangle([2, 15, 5, 16], fill=WHITE); d.rectangle([27, 15, 30, 16], fill=WHITE)
        else:
            body(d, t, cx, cy, 10); eye(d, cx, cy, "idle")
            d.rectangle([2, 4, 3, 5], fill=WHITE); d.rectangle([28, 26, 29, 27], fill=WHITE)
    elif row == 1:  # idle: flutua (±1 px) e pisca no último quadro
        bob = (0, -1, 0, 1)[col]
        body(d, t, cx, cy + bob, 10)
        eye(d, cx, cy + bob, "blink" if col == 3 else "idle")
    else:  # attack
        if col == 0:
            body(d, t, cx - 1, cy, 10); eye(d, cx - 1, cy, "charge1")
        elif col == 1:
            body(d, t, cx - 2, cy, 10); eye(d, cx - 2, cy, "charge2"); sparks(d, cx - 2, cy, 2, RED)
        elif col == 2:
            body(d, t, cx + 1, cy, 10); eye(d, cx + 1, cy, "fire"); sparks(d, cx + 1, cy, 4, NEON)
        else:
            body(d, t, cx, cy, 10); eye(d, cx, cy, "recover")
    return img


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for name, t in THEMES.items():
        sheet = Image.new("RGBA", (FRAME * COLS, FRAME * ROWS), (0, 0, 0, 0))
        for row in range(ROWS):
            for col in range(COLS):
                sheet.paste(cell(name, t, row, col), (col * FRAME, row * FRAME))
        assert sheet.size == (128, 96)
        sheet.save(OUT / f"{name}.png")
        print("ok", OUT / f"{name}.png")


if __name__ == "__main__":
    main()
