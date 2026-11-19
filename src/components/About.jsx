import SectionTitle from './SectionTitle'

// 左の文章は、本人の言葉(2026-11-19)。右の表は、確認できている事実だけ。
const facts = [
  ['志望', 'クラウドセキュリティ'],
  ['学校', 'ECCコンピュータ専門学校'],
  ['卒業', '2028年(予定)'],
]

export default function About() {
  return (
    <section id="about">
      <SectionTitle>About</SectionTitle>
      <div className="about-grid">
        <div>
          <p>専門学校の授業でAWSを1年間学び、インターンで認証・認可に触れたことをきっかけに、セキュリティ分野に関心を持つようになりました。現在はクラウドセキュリティエンジニアを目指しており、AIセキュリティにも興味があります。</p>
          <p>ゼミではTerraformを用いて、AWS環境の構成ドリフトに関する研究に取り組んでいます。また、ICTトラブルシューティングコンテストやMBSD Cybersecurity Challengesなどのコンテストにも参加してきました。</p>
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
