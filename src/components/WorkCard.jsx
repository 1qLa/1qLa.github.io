import { lazy, Suspense } from 'react'
import Flow from './Flow'
import Icon from './Icon'
import InlineText from './InlineText'

// Three.js は重いので、桃太郎の枠が必要になってから別ファイルとして読み込む
const MomotaroScene = lazy(() => import('./MomotaroScene'))

function Media({ media }) {
  if (!media) return null
  if (media.kind === 'scene') {
    return (
      <Suspense fallback={<div className="media scene" role="img" aria-label={media.label} />}>
        <MomotaroScene label={media.label} caption={media.caption} />
      </Suspense>
    )
  }
  return (
    <div className="media">
      <img
        src={media.src}
        alt={media.alt}
        width={media.width}
        height={media.height}
        loading="lazy"
        className={media.contain ? 'contain' : undefined}
      />
    </div>
  )
}

export default function WorkCard({ work }) {
  return (
    <article className="work">
      <Media media={work.media} />
      <h3>{work.title}</h3>
      <p className="stack">{work.stack}</p>
      {work.role && (
        <dl className="role">
          <div><dt>開発期間</dt><dd>{work.role.period}</dd></div>
          <div><dt>担当</dt><dd>{work.role.scope}</dd></div>
          {work.role.status && <div><dt>状況</dt><dd>{work.role.status}</dd></div>}
        </dl>
      )}
      {work.body.map((block, i) =>
        typeof block === 'string'
          ? <p key={i}><InlineText text={block} /></p>
          : <Flow key={i} label={block.flow.label} steps={block.flow.steps} />
      )}
      <div className="chips">
        {work.links.map((l) => (
          <a key={l.href} className="chip" href={l.href}>
            {l.icon && <Icon icon={l.icon} />}
            {l.label}
          </a>
        ))}
      </div>
    </article>
  )
}
