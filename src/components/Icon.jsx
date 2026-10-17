// Simple Icons(CC0)のロゴを、そのままページに埋め込んで表示する。
// color を渡さなければ、ブランドの色で表示する。'currentColor' なら、まわりの文字の色になる。
export default function Icon({ icon, color, size = 16 }) {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={color ?? `#${icon.hex}`}
      aria-hidden="true"
      focusable="false"
    >
      <path d={icon.path} />
    </svg>
  )
}
