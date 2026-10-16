"""ドット絵の猫のスプライトシート(assets/cat-sprite.png)を作る。

標準ライブラリだけで動く。使い方: python3 tools/make_cat_sprite.py [出力先] [プレビュー出力先]
シート: 48x32 のコマを横に8つ(歩き4 + 座り4)。猫は右向き。
"""
import math, struct, sys, zlib

W, H = 48, 32
N_WALK, N_SIT = 4, 4

PAL = {
    'ol': (43, 30, 28),      # 輪郭
    'br': (128, 96, 70),     # 茶(トラ柄の地)
    'dk': (78, 58, 48),      # 濃い縞
    'lt': (164, 130, 98),    # 明るい茶(毛のふち)
    'or': (222, 142, 62),    # オレンジの斑
    'wh': (255, 252, 248),   # 白
    'sh': (226, 218, 222),   # 白の影
    'pk': (240, 150, 160),   # ピンク(鼻・耳)
    'ey': (120, 196, 140),   # 目の緑
    'pu': (30, 36, 30),      # 瞳
}


class Canvas:
    def __init__(self):
        self.p = [[None] * W for _ in range(H)]

    def put(self, x, y, c):
        if 0 <= x < W and 0 <= y < H:
            self.p[y][x] = c

    def get(self, x, y):
        return self.p[y][x] if 0 <= x < W and 0 <= y < H else None

    def rect(self, x0, y0, x1, y1, c):
        for y in range(y0, y1 + 1):
            for x in range(x0, x1 + 1):
                self.put(x, y, c)

    def ellipse(self, cx, cy, rx, ry, c, only_on=None):
        for y in range(int(cy - ry) - 1, int(cy + ry) + 2):
            for x in range(int(cx - rx) - 1, int(cx + rx) + 2):
                if ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1.0:
                    if only_on is None or self.get(x, y) in only_on:
                        self.put(x, y, c)

    def outline(self):
        out = [row[:] for row in self.p]
        for y in range(H):
            for x in range(W):
                if self.p[y][x] is None:
                    for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                        if self.get(x + dx, y + dy) is not None:
                            out[y][x] = 'ol'
                            break
        self.p = out


BODY = ('br', 'dk', 'lt')


def tail(cv, pts, r=3):
    for i, (x, y) in enumerate(pts):
        cv.ellipse(x, y, r, r, 'br')
    for i, (x, y) in enumerate(pts):
        if i % 2 == 1:
            cv.ellipse(x, y, r - 0.3, r - 0.3, 'dk', only_on=('br',))
    x, y = pts[-1]
    cv.ellipse(x, y, r - 0.4, r - 0.4, 'lt', only_on=('br', 'dk'))
    cv.put(x - 1, y - r, 'lt'); cv.put(x + 1, y - r, 'lt')


def head(cv, cx, cy, blink=False):
    # 頭: 上は広く、あごに向けて細い(三角寄り)
    cv.ellipse(cx, cy - 1, 7.2, 5.6, 'br')
    cv.ellipse(cx, cy + 2, 5.4, 3.8, 'br')
    # 耳: 大きく、先に長い房(リンクスティップ)
    widths = [2, 3, 3, 4, 5, 5]
    for ecx in (cx - 5, cx + 5):
        for k, w in enumerate(widths):
            cv.rect(ecx - w // 2, cy - 10 + k, ecx - w // 2 + w - 1, cy - 10 + k, 'br')
        cv.put(ecx, cy - 11, 'dk'); cv.put(ecx, cy - 12, 'dk')
        cv.put(ecx, cy - 7, 'pk'); cv.put(ecx, cy - 6, 'pk')
    # 額の縞とオレンジの斑
    cv.rect(cx - 2, cy - 5, cx - 2, cy - 4, 'dk'); cv.rect(cx + 2, cy - 5, cx + 2, cy - 4, 'dk')
    cv.rect(cx - 1, cy - 5, cx + 1, cy - 3, 'or')
    # 白い口まわり(鼻すじは長くまっすぐ)
    cv.ellipse(cx + 1, cy + 3, 3.8, 3.2, 'wh')
    cv.rect(cx, cy - 2, cx + 1, cy + 1, 'wh')
    cv.put(cx, cy + 1, 'pk'); cv.put(cx + 1, cy + 1, 'pk')
    # 目
    if blink:
        cv.rect(cx - 4, cy - 1, cx - 3, cy - 1, 'pu'); cv.rect(cx + 3, cy - 1, cx + 4, cy - 1, 'pu')
    else:
        cv.rect(cx - 4, cy - 2, cx - 3, cy - 1, 'ey'); cv.put(cx - 3, cy - 1, 'pu'); cv.put(cx - 4, cy - 1, 'pu')
        cv.rect(cx + 3, cy - 2, cx + 4, cy - 1, 'ey'); cv.put(cx + 4, cy - 1, 'pu'); cv.put(cx + 3, cy - 1, 'pu')
    # ほほの毛と、胸のたてがみ(大きな白い襟毛)
    cv.put(cx - 7, cy + 1, 'lt'); cv.put(cx + 7, cy + 1, 'lt')
    cv.ellipse(cx + 1, cy + 7, 7.5, 4, 'wh')
    cv.ellipse(cx - 5, cy + 5, 2.5, 2, 'wh')


def walk_frame(i):
    cv = Canvas()
    ph = i / N_WALK
    bob = 1 if i % 2 else 0
    by = 17 + bob
    sway = [0, -1, 0, 1][i]
    # しっぽ(後ろ=左、上に反る)
    tail(cv, [(10, by - 1), (7, by - 4), (6, by - 8), (6 + sway, by - 11), (8 + sway, by - 13)], 3)
    # 脚(奥→手前の順)
    legs = [(27, 0.5), (15, 0.0), (31, 0.0), (19, 0.5)]
    for lx, off in legs:
        a = 2 * math.sin(2 * math.pi * (ph + off))
        lift = 1 if math.cos(2 * math.pi * (ph + off)) > 0.3 else 0
        x = int(round(lx + a))
        bottom = 29 - lift
        cv.rect(x, by + 3, x + 2, bottom, 'br')
        cv.rect(x, bottom - 1, x + 2, bottom, 'wh')
        cv.put(x + 1, by + 6, 'dk')
    # 胴
    cv.ellipse(22, by, 12.5, 7, 'br')
    cv.ellipse(22, by + 6, 11, 2.2, 'lt', only_on=('br',))
    cv.ellipse(31, by + 3, 5, 5, 'wh', only_on=BODY)
    cv.ellipse(17, by - 3, 5, 3, 'or', only_on=BODY)
    cv.ellipse(25, by + 4, 3, 2, 'or', only_on=BODY)
    for sx in (12, 15, 19, 23, 27):
        cv.rect(sx, by - 6, sx, by - 4, 'dk')
    head(cv, 36, 13 + bob)
    cv.outline()
    return cv


def sit_frame(i):
    cv = Canvas()
    blink = i == 2
    tip = [0, 0, 0, 1][i]
    sway = [0, 1, 0, -1][i]
    # しっぽ(地面にそって前へ、先は軽く上がる)
    tail(cv, [(15, 28), (10, 28), (6, 27 - tip), (4 + sway, 24 - tip), (4 + sway, 20 - tip)], 3)
    # 胴(座った後ろ足の盛り上がり)
    cv.ellipse(19, 22, 10, 8, 'br')
    cv.ellipse(18, 18, 5, 3, 'or', only_on=BODY)
    for sx in (13, 16, 20):
        cv.rect(sx, 15, sx, 17, 'dk')
    cv.ellipse(15, 28, 7, 2.5, 'lt', only_on=('br', None))
    # 胸と前足
    cv.ellipse(28, 21, 4, 7, 'wh')
    cv.rect(26, 24, 28, 29, 'wh'); cv.rect(30, 24, 32, 29, 'wh')
    cv.rect(26, 28, 28, 29, 'sh'); cv.rect(30, 28, 32, 29, 'sh')
    head(cv, 30, 13, blink)
    cv.outline()
    return cv


def write_png(path, rows):
    h, w = len(rows), len(rows[0])
    raw = b''.join(b'\x00' + bytes(v for px in row for v in px) for row in rows)
    def chunk(t, d):
        c = struct.pack('>I', len(d)) + t + d
        return c + struct.pack('>I', zlib.crc32(t + d) & 0xffffffff)
    png = b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', struct.pack('>IIBBBBB', w, h, 8, 6, 0, 0, 0))
    png += chunk(b'IDAT', zlib.compress(raw, 9)) + chunk(b'IEND', b'')
    open(path, 'wb').write(png)


def sheet(scale=1):
    frames = [walk_frame(i) for i in range(N_WALK)] + [sit_frame(i) for i in range(N_SIT)]
    rows = []
    for y in range(H):
        row = []
        for f in frames:
            for x in range(W):
                c = f.p[y][x]
                row.append(PAL[c] + (255,) if c else (0, 0, 0, 0))
        rows.append(row)
    if scale > 1:
        rows = [[px for px in r for _ in range(scale)] for r in rows for _ in range(scale)]
    return rows


if __name__ == '__main__':
    out = sys.argv[1] if len(sys.argv) > 1 else 'assets/cat-sprite.png'
    write_png(out, sheet())
    if len(sys.argv) > 2:
        write_png(sys.argv[2], sheet(6))
