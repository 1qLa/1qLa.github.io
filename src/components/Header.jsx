// 画面の上に固定するバー(ロゴは置かない)
export default function Header() {
  return (
    <header className="site-header" id="top">
      <div className="wrap bar">
        <nav aria-label="メイン">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#works">Works</a>
          <a className="btn btn-primary btn-small" href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  )
}
