import { skillGroups } from '../data/skills'
import Icon from './Icon'
import SectionTitle from './SectionTitle'

export default function Skills() {
  return (
    <section id="skills">
      <SectionTitle>Skills</SectionTitle>
      <div className="skills-grid">
        {skillGroups.map((g) => (
          <div className="panel" key={g.title}>
            <h3>{g.title}</h3>
            <ul className="tags">
              {g.items.map((item) => (
                <li key={item.name}>
                  <Icon icon={item.icon} />
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
