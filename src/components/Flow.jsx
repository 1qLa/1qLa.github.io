// 番号つきの構成図。最後の段階(通知先)だけ色を変える
export default function Flow({ label, steps }) {
  return (
    <ol className="flow" aria-label={label}>
      {steps.map(([name, note], i) => (
        <li key={name} className={i === steps.length - 1 ? 'last' : undefined}>
          <b>{name}</b>
          <small>{note}</small>
        </li>
      ))}
    </ol>
  )
}
