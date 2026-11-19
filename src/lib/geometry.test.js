import { describe, expect, it } from 'vitest'
import { backgroundGeometry, BG_W, BG_H } from './geometry'

describe('backgroundGeometry', () => {
  it('PC幅(16:10)では高さに合わせて拡大し、左右を均等に切り落とす', () => {
    const g = backgroundGeometry(1280, 800)
    expect(g.sc).toBeCloseTo(800 / BG_H)
    expect(g.toX(BG_W / 2)).toBeCloseTo(640)   // 絵の中央は画面の中央
    expect(g.toY(0)).toBeCloseTo(0)
    expect(g.toY(BG_H)).toBeCloseTo(800)
  })

  it('横長の画面では幅に合わせて拡大する', () => {
    const g = backgroundGeometry(1920, 800)
    expect(g.sc).toBeCloseTo(1920 / BG_W)
  })
})
