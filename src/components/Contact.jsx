import { siGithub, siGmail } from 'simple-icons'
import Icon from './Icon'
import SectionTitle from './SectionTitle'

export default function Contact() {
  return (
    <section id="contact">
      <SectionTitle>Contact</SectionTitle>
      <div className="contact-row">
        <div className="sprite-cat" aria-hidden="true" />
        <div className="panel">
          <p>ご相談やご質問は、メールかGitHubからお気軽にご連絡ください。</p>
          <div className="btns">
            <a className="btn btn-primary" href="mailto:kane170617@gmail.com">
              <Icon icon={siGmail} color="currentColor" />
              メール：kane170617@gmail.com
            </a>
            <a className="btn" href="https://github.com/1qLa">
              <Icon icon={siGithub} />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
