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
    <article className={work.featured ? 'work featured' : 'work'}>
      <Media media={work.media} />
      <div className="work-body">
        <div className="work-head">
          <h3>{work.title}</h3>
          {work.tag && <span className={work.tag.kind === 'wip' ? 'tag tag-wip' : 'tag'}>{work.tag.label}</span>}
        </div>
        <p className="stack">{work.stack}</p>
        {work.role && (
          <dl className="role">
            {work.role.map(([label, value]) => (
              <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
            ))}
          </dl>
        )}
        {work.body.map((block, i) =>
          typeof block === 'string'
            ? <p key={i}><InlineText text={block} /></p>
            : <Flow key={i} label={block.flow.label} steps={block.flow.steps} />
        )}
        {work.note && (
          <p className="note"><b>{work.note.label}:</b>{work.note.text}</p>
        )}
        <div className="btns">
          {work.links.map((l) => (
            <a key={l.href} className={l.primary ? 'btn btn-primary' : 'btn'} href={l.href}>
              {l.icon && <Icon icon={l.icon} color={l.primary ? 'currentColor' : undefined} />}
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </article>
  )
}
