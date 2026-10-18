import SectionTitle from './SectionTitle'

// 左の文章は、当面デモ(制作物の内容から書いた仮のもの)。右の表は、確認できている事実だけ。
const facts = [
  ['志望', 'クラウドセキュリティ'],
  ['学校', 'ECCコンピュータ専門学校'],
  ['卒業', '2028年(予定)'],
  ['受賞', '学内展示 コンセプト賞'],
]

export default function About() {
  return (
    <section id="about">
      <SectionTitle>About</SectionTitle>
      <div className="about-grid">
        <div>
          <p>ソフトウェアと現実の世界をつなぐものづくりが好きです。ブラウザで動く3D学習ゲーム、NFCで開くスマートライト、電子ペーパーのカレンダー、TerraformによるAWSの監視をつくっています。</p>
        </div>
        <dl className="panel facts">
          {facts.map(([k, v]) => (
            <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
          ))}
        </dl>
      </div>
    </section>
  )
}
