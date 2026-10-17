// 毛糸玉の動き: だんだん減速し、左右の壁で跳ね返る(跳ね返ると勢いが落ちる)
export const STOP_SPEED = 4

export function stepYarn({ x, v }, dt, { min, max }) {
  if (Math.abs(v) <= STOP_SPEED) return { x, v: 0 }
  let nx = x + v * dt
  let nv = v * Math.max(0, 1 - 1.5 * dt)
  if (nx < min) { nx = min; nv = -nv * 0.6 }
  if (nx > max) { nx = max; nv = -nv * 0.6 }
  return { x: nx, v: nv }
}
