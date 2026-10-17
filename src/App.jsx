import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Works from './components/Works'
import Contact from './components/Contact'

export default function App() {
  return (
    <>
      <Hero />
      <main className="wrap">
        <About />
        <Skills />
        <Works />
        <Contact />
      </main>
      <footer>
        <div className="wrap">&copy; 2026 金島拓矢</div>
      </footer>
    </>
  )
}
