import { siGithub } from 'simple-icons'
import Icon from './Icon'

export default function Contact() {
  return (
    <section id="contact">
      <h2>Contact</h2>
      <p>ご相談やご質問は、メールかGitHubからお気軽にご連絡ください。</p>
      <ul className="tags">
        <li>
          <a href="https://github.com/1qLa">
            <Icon icon={siGithub} color="currentColor" />
            GitHub
          </a>
        </li>
        <li><a href="mailto:kane170617@gmail.com">kane170617@gmail.com</a></li>
      </ul>
    </section>
  )
}
