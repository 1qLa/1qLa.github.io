import { describe, expect, it } from 'vitest'
import { stepYarn, STOP_SPEED } from './yarn'

const bounds = { min: 10, max: 500 }

describe('stepYarn', () => {
  it('遅くなったら止まる', () => {
    expect(stepYarn({ x: 100, v: STOP_SPEED }, 0.016, bounds)).toEqual({ x: 100, v: 0 })
  })

  it('動いている間は進み、だんだん減速する', () => {
    const r = stepYarn({ x: 100, v: 200 }, 0.1, bounds)
    expect(r.x).toBeGreaterThan(100)
    expect(r.v).toBeGreaterThan(0)
    expect(r.v).toBeLessThan(200)
  })

  it('壁で跳ね返ると向きが逆になり、勢いが落ちる', () => {
    const r = stepYarn({ x: 495, v: 300 }, 0.1, bounds)
    expect(r.x).toBe(500)
    expect(r.v).toBeLessThan(0)
    expect(Math.abs(r.v)).toBeLessThan(300)
  })

  it('左の壁でも跳ね返る', () => {
    const r = stepYarn({ x: 12, v: -300 }, 0.1, bounds)
    expect(r.x).toBe(10)
    expect(r.v).toBeGreaterThan(0)
  })
})
