import type { Message } from '../types'

export function MessageItem({ message }: { message: Message }) {
  return (
    <article className={`message ${message.role}`}>
      <div className="avatar" aria-hidden="true">{message.author.slice(0, 1)}</div>
      <div className="message-content">
        <div className="message-meta">
          <strong>{message.author}</strong>
          <time>{message.timestamp}</time>
          {message.tag === 'local' && <span className="message-tag local">Local</span>}
        </div>
        <p>{message.body}</p>
      </div>
    </article>
  )
}
