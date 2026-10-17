import { describe, expect, it } from 'vitest'
import { works } from './works'
import { skillGroups } from './skills'

describe('works', () => {
  it('idが重複していない', () => {
    const ids = works.map((w) => w.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it.each(works)('$id: タイトル・使用技術・本文・リンクがある', (w) => {
    expect(w.title).toBeTruthy()
    expect(w.stack).toBeTruthy()
    expect(w.body.length).toBeGreaterThan(0)
    expect(w.links.length).toBeGreaterThan(0)
  })

  it.each(works)('$id: リンクはすべてhttpsで、ラベルがある', (w) => {
    for (const l of w.links) {
      expect(l.label).toBeTruthy()
      expect(l.href.startsWith('https://')).toBe(true)
    }
  })

  it('画像つきの作品には代替テキストがある', () => {
    for (const w of works) {
      if (w.media?.kind === 'image') expect(w.media.alt).toBeTruthy()
    }
  })

  it('構成図の各段階に名前と説明がある', () => {
    for (const w of works) {
      for (const b of w.body) {
        if (typeof b !== 'string' && b.flow) {
          expect(b.flow.steps.length).toBeGreaterThan(1)
          for (const [name, note] of b.flow.steps) {
            expect(name).toBeTruthy()
            expect(note).toBeTruthy()
          }
        }
      }
    }
  })
})

describe('skillGroups', () => {
  it('空のグループがない', () => {
    for (const g of skillGroups) {
      expect(g.title).toBeTruthy()
      expect(g.items.length).toBeGreaterThan(0)
    }
  })
})
