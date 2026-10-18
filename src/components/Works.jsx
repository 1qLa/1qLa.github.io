import { works } from '../data/works'
import SectionTitle from './SectionTitle'
import WorkCard from './WorkCard'

// featured の作品は大きく先頭に、そのほかは2列で並べる
export default function Works() {
  return (
    <section id="works">
      <SectionTitle>Works</SectionTitle>
      {works.filter((w) => w.featured).map((w) => <WorkCard key={w.id} work={w} />)}
      <div className="works-grid">
        {works.filter((w) => !w.featured).map((w) => <WorkCard key={w.id} work={w} />)}
      </div>
    </section>
  )
}
