import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Works from './components/Works'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Header />
      <Hero />
      <main className="wrap">
        <About />
        <Skills />
        <Works />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
