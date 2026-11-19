import { useLayoutEffect, useRef } from 'react'
import { backgroundGeometry } from '../lib/geometry'
import { siGithub } from 'simple-icons'
import Cat from './Cat'
import clockImg from '../assets/clock.png'
import Icon from './Icon'

// 部屋のドット絵の上に、古いテレビを置き、名前を画面の中に映す。
// 「クラウドセキュリティエンジニア志望」は、デザイン案にあった文言(違えば直す)。
// テレビの飾り(アンテナ・ダイヤル・通気口・電源ランプ)は、aria-hidden で読み上げから外している。
const STAGE_W = 1280 // スマホ幅で縮小する前の、画面の幅(高さは800)

export default function Hero() {
  const frameRef = useRef(null)
  const heroRef = useRef(null)
  const tvRef = useRef(null)
  const innerRef = useRef(null)

  // スマホ幅(600px以下)は、PC の画面(1280x800)をそのまま組んで、横幅に合わせて縮小する。
  // 縮小の倍率は --k に入れ、CSS が transform で縮める。縮めても要素の寸法は1280x800のままなので、猫の動きも同じ計算でよい。
  // テレビ台の脚が背景の床(絵の y=134)に着くように、テレビの位置も合わせる。
  useLayoutEffect(() => {
    const frame = frameRef.current, hero = heroRef.current, tv = tvRef.current, inner = innerRef.current
    const FLOOR_Y = 134 // 背景の絵の中の、床の y
    const LEG = 17 // 台の脚が台の下にはみ出す分(CSS の .tv-stand::before/after と同じ)
    const CLOCK_H = 72 // アンテナの上に出る時計の分(CSS の .tv-clock の高さ + 8px)
    const place = () => {
      frame.style.setProperty('--k', matchMedia('(max-width: 600px)').matches ? frame.clientWidth / STAGE_W : 1)
      const g = backgroundGeometry(hero.clientWidth, hero.clientHeight)
      inner.style.paddingTop = Math.max(14 + CLOCK_H, g.toY(FLOOR_Y) - LEG - tv.offsetHeight) + 'px'
    }
    place()
    addEventListener('resize', place)
    // 文字の折り返しや、フォントの読み込みでテレビの高さが変わったときも、合わせ直す。
    const observer = new ResizeObserver(place)
    observer.observe(tv)
    return () => { removeEventListener('resize', place); observer.disconnect() }
  }, [])

  return (
    <div className="hero-frame" ref={frameRef}>
    <div className="hero" ref={heroRef}>
      <div className="hero-bg" aria-hidden="true" />
      <Cat heroRef={heroRef} />
      <div className="hero-inner" ref={innerRef}>
        <div className="tv" ref={tvRef}>
          <img className="tv-clock" src={clockImg} alt="" aria-hidden="true" />
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
    </div>
  )
}
