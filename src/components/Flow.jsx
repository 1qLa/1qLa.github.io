export default function Flow({ label, steps }) {
  return (
    <ol className="flow" aria-label={label}>
      {steps.map(([name, note]) => (
        <li key={name}>
          <b>{name}</b>
          <small>{note}</small>
        </li>
      ))}
    </ol>
  )
}
