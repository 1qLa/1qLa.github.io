import { useEffect, useRef } from 'react'
import { backgroundGeometry } from '../lib/geometry'
import { stepYarn } from '../lib/yarn'

// ドット絵の猫が、毛糸玉を追いかけて、構えて、前足で転がし続ける。
// スプライトのコマ: 0-3 歩き / 4-7 座り / 10-11 構える(8-9 は寝る姿で、今は使わない)
const SIT = 4
const CROUCH = 10

export default function Cat({ heroRef }) {
  const catRef = useRef(null)
  const yarnRef = useRef(null)

  useEffect(() => {
    const hero = heroRef.current
    const cat = catRef.current
    const yarn = yarnRef.current
    if (!hero || !cat || !yarn) return undefined

    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const geom = () => backgroundGeometry(hero.clientWidth, hero.clientHeight, matchMedia('(max-width: 600px)').matches)
    const scale = () => parseFloat(getComputedStyle(cat).getPropertyValue('--s'))
    const catW = () => cat.offsetWidth
    const maxX = () => Math.max(0, hero.clientWidth - catW())
    const setFrame = (f) => cat.style.setProperty('--f', f)

    let x = maxX() * 0.75     // 猫の左端
    let dir = 1
    let ball = { x: geom().toX(200), v: 0 }   // 毛糸玉の中心 x と速度
    let state = 'chase'
    let t = 0
    let visible = true
    let raf = 0

    const place = () => {
      cat.style.transform = `translateX(${Math.round(x)}px)`
      cat.classList.toggle('left', dir < 0)
      const w = yarn.offsetWidth
      yarn.style.transform = `translateX(${Math.round(ball.x - w / 2)}px) rotate(${Math.round((ball.x / (w / 2)) * 57.3)}deg)`
    }
    place()
    setFrame(SIT)
    if (reduce) return undefined   // 視差効果を減らす設定: 座ったまま動かさない

    const observer = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    observer.observe(hero)

    let last = performance.now()
    const tick = (now) => {
      raf = requestAnimationFrame(tick)
      const dt = Math.min((now - last) / 1000, 0.1)
      last = now
      if (!visible) return
      const s = scale()
      const w = catW()
      const width = hero.clientWidth
      const speed = 14 * s

      ball = stepYarn(ball, dt, { min: yarn.offsetWidth, max: width - yarn.offsetWidth })

      if (state === 'chase') {
        const gap = ball.x - (x + w / 2)
        if (Math.abs(gap) > w * 0.55) {
          dir = gap > 0 ? 1 : -1
          t += dt
          setFrame(Math.floor(t / 0.11) % 4)
          x += dir * speed * 1.7 * dt
        } else {
          state = 'crouch'
          t = 0
          dir = gap >= 0 ? 1 : -1
        }
      } else {
        t += dt
        setFrame(CROUCH + (Math.floor(t / 0.14) % 2))
        if (t > 0.7) {
          const away = ball.x > width * 0.8 ? -1 : ball.x < width * 0.2 ? 1 : dir
          ball = { ...ball, v: away * (150 + Math.random() * 170) * (s / 4) }
          state = 'chase'
          t = 0
        }
      }
      x = Math.max(0, Math.min(maxX(), x))
      place()
    }
    raf = requestAnimationFrame(tick)

    const onResize = () => { x = Math.min(x, maxX()); place() }
    addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      removeEventListener('resize', onResize)
    }
  }, [heroRef])

  return (
    <>
      <div className="yarn" ref={yarnRef} aria-hidden="true" />
      <div className="cat" ref={catRef} aria-hidden="true"><div className="cat-sprite" /></div>
    </>
  )
}
