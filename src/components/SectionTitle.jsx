export default function SectionTitle({ children }) {
  return (
    <h2 className="sec-title">
      <span className="sq" aria-hidden="true" />
      {children}
    </h2>
  )
}
