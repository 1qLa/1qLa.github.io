import { works } from '../data/works'
import WorkCard from './WorkCard'

export default function Works() {
  return (
    <section id="works">
      <h2>Works</h2>
      {works.map((w) => <WorkCard key={w.id} work={w} />)}
    </section>
  )
}
