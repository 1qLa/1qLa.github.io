"""ヒーローの背景(部屋のドット絵 assets/hero-bg.png)を作る。

標準ライブラリだけで動く。使い方: python3 tools/make_room_bg.py [出力先]
昼の部屋を1枚出力する。壁掛け時計は 12:00 で固定。
320x180 の絵を、CSS 側で拡大して表示する(image-rendering: pixelated)。
左にキャットタワー、中央は挨拶文のために空け、右に窓・爪研ぎ・ペットベッドを置く。
床には段ボールの爪研ぎ。毛糸玉はページ側で動かす。
"""
import math, struct, sys, zlib

W, H = 320, 180
FLOOR = 128   # 壁と床の境目

C = {
    'wall': (246, 232, 208), 'wall2': (240, 222, 192), 'base': (206, 170, 124),
    'floor': (234, 200, 150), 'plank': (216, 176, 124), 'sun': (248, 226, 176),
    'ol': (107, 79, 58),
    'cream': (240, 229, 207), 'cream2': (222, 207, 178),
    'sisal': (222, 188, 122), 'sisal2': (190, 152, 84),
    'dark': (86, 66, 54),
    'toy': (224, 166, 74), 'rope': (226, 205, 160),
    'sky1': (150, 208, 255), 'sky2': (214, 238, 255), 'cloud': (255, 255, 255),
    'frame': (255, 252, 246), 'frame2': (226, 214, 196),
    'curt': (170, 214, 182), 'curt2': (140, 190, 154),
    'bed': (244, 168, 176), 'bed2': (226, 132, 146), 'bedin': (252, 214, 218),
    'card': (214, 170, 110), 'card2': (190, 142, 82),
    'yarn': (224, 82, 82), 'yarn2': (186, 56, 60),
}

px = [[C['wall']] * W for _ in range(H)]


def put(x, y, c):
    if 0 <= x < W and 0 <= y < H:
        px[y][x] = C[c] if isinstance(c, str) else c


def rect(x0, y0, x1, y1, c):
    for y in range(y0, y1 + 1):
        for x in range(x0, x1 + 1):
            put(x, y, c)


def box(x0, y0, x1, y1, fill, line='ol'):
    rect(x0, y0, x1, y1, line)
    rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, fill)


def ellipse(cx, cy, rx, ry, c):
    for y in range(int(cy - ry) - 1, int(cy + ry) + 2):
        for x in range(int(cx - rx) - 1, int(cx + rx) + 2):
            if ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1:
                put(x, y, c)


def post(x0, y0, x1, y1):
    """麻縄を巻いた柱"""
    box(x0, y0, x1, y1, 'sisal')
    for y in range(y0 + 2, y1, 3):
        rect(x0 + 1, y, x1 - 1, y, 'sisal2')


CLOCK = (165, 45, 14)   # 壁掛け時計の中心 x, y と半径


def glass():
    """窓の外(昼)。"""
    for y in range(23, 80):
        t = (y - 23) / 57
        col = tuple(int(C['sky1'][i] * (1 - t) + C['sky2'][i] * t) for i in range(3))
        rect(239, y, 289, y, col)
    ellipse(250, 38, 7, 3, 'cloud'); ellipse(256, 36, 5, 3, 'cloud'); ellipse(280, 66, 7, 3, 'cloud')
    rect(263, 21, 265, 81, 'frame'); rect(237, 49, 291, 51, 'frame')   # 窓の桟


def clock_face():
    """丸い壁掛け時計(12個の目盛りと、12:00 を指す針)。"""
    cx, cy, r = CLOCK
    ellipse(cx, cy, r + 1.5, r + 1.5, 'ol')
    ellipse(cx, cy, r, r, 'frame2')
    ellipse(cx, cy, r - 1.5, r - 1.5, 'frame')
    for k in range(12):
        ang = math.radians(k * 30)
        long_tick = k % 3 == 0
        r0 = r - (5 if long_tick else 4)
        for rr in range(int(r0), int(r - 2)):
            put(int(round(cx + math.sin(ang) * rr)), int(round(cy - math.cos(ang) * rr)), 'ol')
    # 針は 12:00 に固定(短針は太く短く、長針は細く長く)
    rect(cx - 1, cy - 6, cx, cy, 'ol')
    rect(cx, cy - 9, cx, cy - 6, 'ol')
    rect(cx - 1, cy - 1, cx, cy, 'ol')


def build():
    global px
    px = [[C['wall']] * W for _ in range(H)]
    # ---- 壁と床
    for y in range(H):
        for x in range(W):
            if y >= FLOOR:
                px[y][x] = C['floor']
            elif y >= 96:
                px[y][x] = C['wall2']          # 腰壁
    rect(0, 95, W - 1, 95, 'base')
    rect(0, FLOOR - 4, W - 1, FLOOR - 1, 'base')   # 巾木
    rect(0, FLOOR - 5, W - 1, FLOOR - 5, 'wall')
    for y in range(FLOOR + 10, H, 14):               # 床板の横線
        rect(0, y, W - 1, y, 'plank')
    for row, y0 in enumerate(range(FLOOR, H, 14)):    # 床板のつなぎ目
        for x in range((row * 37) % 53, W, 53):
            rect(x, y0, x, min(H - 1, y0 + 13), 'plank')
    # 窓から差す光
    for y in range(FLOOR + 3, FLOOR + 36):
        for x in range(168 + (y - FLOOR) * 2, 250 + (y - FLOOR) * 2):
            if 0 <= x < W:
                put(x, y, 'sun')

    # ---- 窓(右上)
    box(236, 20, 292, 82, 'frame', 'frame2')
    box(231, 16, 297, 20, 'frame2')
    rect(226, 16, 238, 84, 'curt'); rect(290, 16, 302, 84, 'curt')
    for y in range(18, 84, 2):
        put(229, y, 'curt2'); put(234, y, 'curt2'); put(293, y, 'curt2'); put(298, y, 'curt2')
    rect(226, 14, 302, 16, 'frame2')

    # ---- キャットタワー(左)
    box(24, 118, 96, 128, 'cream')                      # 土台
    post(38, 76, 48, 118)                                # 下の柱
    box(52, 92, 90, 118, 'cream')                        # ハウス
    ellipse(71, 112, 8, 11, 'ol'); ellipse(71, 112, 7, 10, 'dark'); rect(63, 112, 79, 118, 'dark')
    box(24, 118, 96, 128, 'cream')                      # 土台(入口の下側を隠す)
    box(26, 70, 92, 78, 'cream')                         # 中段
    post(64, 34, 74, 70)                                 # 上の柱
    box(48, 26, 100, 34, 'cream')                        # 最上段
    for x in range(30, 92, 6):                           # 毛足のざらつき
        put(x, 72, 'cream2'); put(x + 2, 76, 'cream2')
    for x in range(52, 98, 6):
        put(x, 28, 'cream2'); put(x + 3, 32, 'cream2')
    rect(54, 35, 54, 56, 'rope')                         # 吊りおもちゃ
    ellipse(54, 59, 3, 3, 'toy'); put(54, 63, 'toy'); put(53, 64, 'toy'); put(55, 64, 'toy')

    # ---- 爪研ぎポール(中央右)
    box(216, 122, 246, 130, 'cream')
    post(226, 92, 236, 122)
    box(220, 86, 242, 92, 'cream')

    # ---- 段ボールの爪研ぎ(床)
    for k in range(5):
        y = 128 + k
        rect(138 + k * 2, y, 178 - k * 2 + 6, y, 'card')
    box(138, 126, 184, 136, 'card')
    for x in range(141, 183, 3):
        rect(x, 128, x, 134, 'card2')

    # ---- ペットベッド(右)
    ellipse(280, 134, 30, 11, 'ol')
    ellipse(280, 133, 29, 10, 'bed')
    ellipse(280, 130, 22, 6, 'bedin')
    ellipse(280, 131, 21, 4, 'bed2')
    ellipse(280, 129, 19, 3, 'bedin')
    for x in range(258, 304, 5):
        put(x, 136, 'bed2')

    glass()
    clock_face()
    return px


def write_png(path, rows):
    h, w = len(rows), len(rows[0])
    raw = b''.join(b'\x00' + bytes(v for p in row for v in p[:3]) for row in rows)
    def chunk(t, d):
        c = struct.pack('>I', len(d)) + t + d
        return c + struct.pack('>I', zlib.crc32(t + d) & 0xffffffff)
    png = b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', struct.pack('>IIBBBBB', w, h, 8, 2, 0, 0, 0))
    png += chunk(b'IDAT', zlib.compress(raw, 9)) + chunk(b'IEND', b'')
    open(path, 'wb').write(png)


if __name__ == '__main__':
    base = sys.argv[1] if len(sys.argv) > 1 else 'assets/hero-bg.png'
    write_png(base, build())
