import { useRef } from 'react'
import { siGithub } from 'simple-icons'
import Cat from './Cat'
import Icon from './Icon'

// 部屋のドット絵の中央に、名前のカードを置く。
// 「クラウドセキュリティエンジニア志望」は、デザイン案にあった文言(違えばここを直す)。
export default function Hero() {
  const heroRef = useRef(null)
  return (
    <div className="hero" ref={heroRef}>
      <div className="hero-bg" aria-hidden="true" />
      <Cat heroRef={heroRef} />
      <div className="hero-inner">
        <div className="hero-card">
          <p className="eyebrow">▶ PORTFOLIO</p>
          <h1>金島拓矢</h1>
          <p className="aim">クラウドセキュリティエンジニア志望</p>
          <p className="school">ECCコンピュータ専門学校 ／ 2028年卒業予定</p>
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
  )
}
