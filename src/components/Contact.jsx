import { siGithub, siGmail } from 'simple-icons'
import Icon from './Icon'

export default function Contact() {
  return (
    <section id="contact">
      <h2>Contact</h2>
      <p>ご相談やご質問は、メールかGitHubからお気軽にご連絡ください。</p>
      <div className="chips">
        <a className="chip" href="https://github.com/1qLa">
          <Icon icon={siGithub} />
          GitHub
        </a>
        <a className="chip" href="mailto:kane170617@gmail.com">
          <Icon icon={siGmail} />
          kane170617@gmail.com
        </a>
      </div>
    </section>
  )
}
