// `コード` の部分を <code> にして表示する
export default function InlineText({ text }) {
  return text.split('`').map((part, i) => (i % 2 === 1 ? <code key={i}>{part}</code> : part))
}
