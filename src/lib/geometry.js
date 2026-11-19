// 背景絵は 320x180 のドット絵で、CSS の cover で表示する。
// 絵の中の座標を、表示の座標に直す。
// スマホ幅も、PC の画面(1280x800)をそのまま縮小して見せるので、この計算は共通で使う。
export const BG_W = 320
export const BG_H = 180

export function backgroundGeometry(width, height) {
  const sc = Math.max(width / BG_W, height / BG_H)
  const ox = (width - BG_W * sc) / 2
  const oy = (height - BG_H * sc) / 2
  return { sc, toX: (lx) => ox + lx * sc, toY: (ly) => oy + ly * sc }
}
