#!/usr/bin/env python3
"""
Gera o spritesheet PROTÓTIPO do personagem: assets/images/game/player.png

Layout (precisa bater com ANIMATIONS em assets/js/game/config.js):
    128 × 160 px  =  4 colunas × 5 linhas de quadros de EXATAMENTE 32×32 px
    linha 0 idle · 1 run · 2 jump · 3 doubleJump · 4 damage   (4 quadros cada)

O personagem ocupa a caixa x 9–22, y 10–31 de cada quadro (14×22 px) e os pés
tocam a última linha do quadro — é isso que BODY (config.js) assume.

Uso:  python3 tools/generate-player-spritesheet.py   (requer Pillow)
Para usar arte definitiva basta substituir o PNG mantendo o layout (ou ajustar
SPRITESHEET/ANIMATIONS no config.js). Este script é opcional.
"""
from pathlib import Path
from PIL import Image

OUT = Path(__file__).resolve().parent.parent / "assets/images/game/player.png"
FRAME, COLS, ROWS = 32, 4, 5

PALETTE = {
    "o": (11, 18, 48, 255),      # contorno
    "h": (47, 100, 255, 255),    # chapéu
    "H": (143, 180, 255, 255),   # brilho do chapéu
    "s": (253, 253, 253, 255),   # rosto
    "E": (11, 18, 48, 255),      # olhos
    "p": (255, 176, 196, 255),   # bochecha
    "a": (134, 182, 255, 255),   # cachecol
    "b": (36, 78, 214, 255),     # roupa
    "W": (143, 180, 255, 255),   # brilho da roupa
    "f": (30, 52, 140, 255),     # bota
    "R": (255, 92, 92, 255),     # flash de dano (vermelho)
    "w": (255, 255, 255, 255),   # flash de dano (branco)
}

# cabeça + tronco (14×16); o resto (pernas) é desenhado por quadro
UPPER = [
    "....oooooo....",
    "...ohhhhhho...",
    "..ohHHhhhhho..",
    ".ohHhhhhhhhho.",
    ".oooooooooooo.",
    ".osssssssssso.",
    ".ossEssssEsso.",
    ".ossEssssEsso.",
    ".opsssssssspo.",
    "..oossssssoo..",
    "..ooaaaaaaoo..",
    ".obbbbbbbbbbo.",
    "obWbbbbbbbbbbo",
    "obWbbbbbbbbbbo",
    "oobbbbbbbbbboo",
    ".obbbbbbbbbbo.",
]
assert all(len(r) == 14 for r in UPPER)


def new_cell():
    return {}


def put(cell, x, y, ch):
    if 0 <= x < FRAME and 0 <= y < FRAME and ch != ".":
        cell[(x, y)] = ch


def upper(cell, ox, oy, eyes="open", tint=None):
    for r, row in enumerate(UPPER):
        for c, ch in enumerate(row):
            if ch == "E":
                if eyes == "closed":
                    ch = "s" if r == 6 else "E"
                elif eyes == "x":
                    ch = "s"
            if tint and ch in "hHbWaf":
                ch = tint
            put(cell, ox + c, oy + r, ch)
    if eyes == "x":  # olhos em X (3×3) nas colunas 3–5 e 8–10
        for cx in (3, 8):
            for dy, dx in ((0, 0), (0, 2), (1, 1), (2, 0), (2, 2)):
                put(cell, ox + cx + dx, oy + 6 + dy, "E")


def leg(cell, x, top, bottom, forward=False, tint=None):
    """Perna de 4 px de largura do y=top ao y=bottom (últimas 2 linhas = bota)."""
    for y in range(top, bottom + 1):
        boot = y >= bottom - 1
        if boot:
            row = "offfo" if forward else "offo"
            for i, ch in enumerate(row):
                put(cell, x + i, y, tint if tint and ch == "f" else ch)
        else:
            for i, ch in enumerate("obbo"):
                put(cell, x + i, y, tint if tint and ch == "b" else ch)


def arm(cell, x, y, h=5):
    for r in range(h):
        for i, ch in enumerate("obbo" if 0 < r < h - 1 else "oooo"):
            put(cell, x + i, y + r, ch)


def pose(dy=0, left=(11, 31, False), right=(18, 31, False), eyes="open",
         arms=None, shift=0, tint=None):
    cell = new_cell()
    oy = 10 + dy
    upper(cell, 9 + shift, oy, eyes, tint)
    top = oy + 16
    for x, bottom, fwd in (left, right):
        if bottom - 1 > top:
            leg(cell, x + shift, top, bottom, fwd, tint)
    for ax, ay in (arms or []):
        arm(cell, ax + shift, oy + ay)
    return cell


def rotate90(cell, quarter_turns, cx=16, cy=21):
    """Gira em múltiplos de 90° em torno de (cx, cy): exato, sem reamostragem."""
    out = {}
    for (x, y), ch in cell.items():
        dx, dy = x - cx, y - cy
        for _ in range(quarter_turns % 4):
            dx, dy = -dy, dx
        out[(cx + dx, cy + dy)] = ch
    return out


# ---------- quadros ----------
idle = [
    pose(0), pose(0),
    pose(1, left=(11, 31, False), right=(18, 31, False)),
    pose(1, eyes="closed"),
]
run = [
    pose(0, left=(8, 31, True), right=(19, 29, False), shift=1, arms=[(6, 12), (24, 12)]),
    pose(1, left=(12, 31, False), right=(14, 27, False), shift=1),
    pose(0, left=(19, 31, True), right=(8, 29, False), shift=1, arms=[(6, 12), (24, 12)]),
    pose(1, left=(14, 27, False), right=(17, 31, False), shift=1),
]
jump = [
    pose(2, left=(11, 31, False), right=(18, 31, False)),                    # agacha
    pose(-1, left=(13, 30, False), right=(16, 30, False), arms=[(5, 6), (25, 6)]),  # sobe
    pose(0, left=(11, 28, False), right=(18, 29, False), arms=[(4, 8), (26, 8)]),   # topo
    pose(0, left=(10, 30, False), right=(19, 30, False), arms=[(5, 5), (25, 5)]),   # cai
]
tuck = pose(0, left=(12, 27, False), right=(17, 27, False), arms=[(6, 10), (24, 10)])
double = [
    rotate90(tuck, 1), rotate90(tuck, 2), rotate90(tuck, 3),
    pose(0, left=(10, 30, False), right=(19, 30, False), arms=[(5, 5), (25, 5)]),
]
damage = [
    pose(1, eyes="x", shift=-2, left=(9, 31, False), right=(19, 29, False), arms=[(4, 4), (26, 6)], tint="w"),
    pose(1, eyes="x", shift=-2, left=(9, 31, False), right=(19, 29, False), arms=[(4, 4), (26, 6)]),
    pose(2, eyes="x", shift=-1, left=(10, 31, False), right=(18, 30, False), arms=[(4, 5), (26, 5)], tint="R"),
    pose(1, eyes="x", shift=-1, left=(10, 31, False), right=(18, 30, False), arms=[(4, 5), (26, 5)]),
]

sheet = Image.new("RGBA", (FRAME * COLS, FRAME * ROWS), (0, 0, 0, 0))
for row, frames in enumerate([idle, run, jump, double, damage]):
    assert len(frames) == COLS
    for col, cell in enumerate(frames):
        for (x, y), ch in cell.items():
            sheet.putpixel((col * FRAME + x, row * FRAME + y), PALETTE[ch])

OUT.parent.mkdir(parents=True, exist_ok=True)
sheet.save(OUT)
assert sheet.size == (128, 160)
print(f"{OUT}  {sheet.size[0]}x{sheet.size[1]}  ({COLS}x{ROWS} quadros de {FRAME}x{FRAME})")
