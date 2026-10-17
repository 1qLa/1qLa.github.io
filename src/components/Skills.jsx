import { skillGroups } from '../data/skills'
import Icon from './Icon'

export default function Skills() {
  return (
    <section id="skills">
      <h2>Skills</h2>
      {skillGroups.map((g) => (
        <div className="skill-group" key={g.title}>
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
    </section>
  )
}
