import { useRef } from 'react'
import Cat from './Cat'

const nav = ['About', 'Skills', 'Works', 'Contact']

export default function Hero() {
  const heroRef = useRef(null)
  return (
    <div className="hero" ref={heroRef}>
      <div className="hero-bg" aria-hidden="true" />
      <Cat heroRef={heroRef} />
      <header>
        <div className="wrap">
          <nav>
            {nav.map((n) => <a key={n} href={`#${n.toLowerCase()}`}>{n}</a>)}
          </nav>
        </div>
      </header>
      <div className="hero-inner">
        <h1>金島拓矢 Portfolio</h1>
      </div>
      <a className="scroll-hint" href="#about">Scroll ↓</a>
    </div>
  )
}
