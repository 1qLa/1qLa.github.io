import { skillGroups } from '../data/skills'

export default function Skills() {
  return (
    <section id="skills">
      <h2>Skills</h2>
      {skillGroups.map((g) => (
        <div className="skill-group" key={g.title}>
          <h3>{g.title}</h3>
          <ul className="tags">
            {g.items.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      ))}
    </section>
  )
}
