// 背景絵は 320x180 のドット絵。CSS の表示のしかた(PC は cover、スマホ幅は高さの45%を下に寄せる)に合わせて、
// 絵の中の座標を画面の座標に直す。
export const BG_W = 320
export const BG_H = 180

export function backgroundGeometry(width, height, mobile) {
  let sc, ox, oy
  if (mobile) {
    sc = (height * 0.45) / BG_H
    ox = (width - BG_W * sc) * 0.12
    oy = height - BG_H * sc
  } else {
    sc = Math.max(width / BG_W, height / BG_H)
    ox = (width - BG_W * sc) / 2
    oy = (height - BG_H * sc) / 2
  }
  return { sc, toX: (lx) => ox + lx * sc, toY: (ly) => oy + ly * sc }
}
