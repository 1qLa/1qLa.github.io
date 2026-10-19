import { useLayoutEffect, useRef } from 'react'
import { backgroundGeometry } from '../lib/geometry'
import { siGithub } from 'simple-icons'
import Cat from './Cat'
import Icon from './Icon'

// 部屋のドット絵の上に、古いテレビを置き、名前を画面の中に映す。
// 「クラウドセキュリティエンジニア志望」は、デザイン案にあった文言(違えば直す)。
// テレビの飾り(アンテナ・ダイヤル・通気口・電源ランプ)は、aria-hidden で読み上げから外している。
export default function Hero() {
  const heroRef = useRef(null)
  const tvRef = useRef(null)
  const innerRef = useRef(null)

  // PC幅では、テレビ台の脚が背景の床(絵の y=134)に着くように、テレビの高さを合わせる。
  // スマホ幅は、背景が下の一部だけなので、上に寄せたまま。
  useLayoutEffect(() => {
    const hero = heroRef.current, tv = tvRef.current, inner = innerRef.current
    const place = () => {
      const mobile = matchMedia('(max-width: 600px)').matches
      if (mobile) { inner.style.paddingTop = ''; return }
      const g = backgroundGeometry(hero.clientWidth, hero.clientHeight, false)
      const LEG = 17 // 台の脚が台の下にはみ出す分(CSS の .tv-stand::before/after と同じ)
      inner.style.paddingTop = Math.max(14, g.toY(134) - LEG - tv.offsetHeight) + 'px'
    }
    place()
    addEventListener('resize', place)
    return () => removeEventListener('resize', place)
  }, [])

  return (
    <div className="hero" ref={heroRef}>
      <div className="hero-bg" aria-hidden="true" />
      <Cat heroRef={heroRef} />
      <div className="hero-inner" ref={innerRef}>
        <div className="tv" ref={tvRef}>
          <div className="tv-clock" aria-hidden="true" />
          <div className="tv-antenna" aria-hidden="true"><i /><i /><b /></div>
          <div className="tv-body">
            <div className="tv-screen">
              <span className="tv-ch" aria-hidden="true">CH 01</span>
              <p className="eyebrow">▶ PORTFOLIO</p>
              <h1>金島拓矢</h1>
              <p className="aim">クラウドセキュリティエンジニア志望</p>
              <p className="school">ECCコンピュータ専門学校 ／ 2028年卒業予定</p>
            </div>
            <div className="tv-side" aria-hidden="true">
              <span className="knob" />
              <span className="knob k2" />
              <span className="vents" />
              <span className="power"><i />POWER</span>
            </div>
          </div>
          <div className="tv-stand">
            <div className="btns">
              <a className="btn btn-primary" href="#works">制作物を見る ▼</a>
              <a className="btn" href="https://github.com/1qLa">
                <Icon icon={siGithub} />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
