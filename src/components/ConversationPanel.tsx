import { useEffect, useRef, type FormEvent } from 'react'
import { Composer } from './Composer'
import { MessageItem } from './MessageItem'
import type { Message, Space } from '../types'

type ConversationPanelProps = {
  activeSpace: Space
  draft: string
  onDraftChange: (draft: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  visibleMessages: Message[]
  query: string
  onClearSearch: () => void
}

export function ConversationPanel({ activeSpace, draft, onDraftChange, onSubmit, visibleMessages, query, onClearSearch }: ConversationPanelProps) {
  const threadRef = useRef<HTMLDivElement>(null)
  const latest = visibleMessages.at(-1)
  useEffect(() => {
    const thread = threadRef.current
    if (thread) thread.scrollTop = latest?.tag === 'local' ? thread.scrollHeight : 0
  }, [activeSpace.id, latest?.id, latest?.tag])

  return (
    <section aria-label="Conversation" className="conversation-panel">
      <header className="conversation-header">
        <h1>{activeSpace.name}</h1>
        <p>{activeSpace.description}</p>
      </header>
      {query.trim() && (
        <div className="search-summary">
          <span>Search: “{query}”</span>
          <button onClick={onClearSearch} type="button">Clear search</button>
        </div>
      )}
      <div className="thread-wrap" ref={threadRef} tabIndex={0} aria-label="Message history">
        <div className="message-list">
          {visibleMessages.length ? visibleMessages.map((message) => <MessageItem key={message.id} message={message} />) : (
            <div className="empty-thread">
              <strong>No messages match this search.</strong>
              <button onClick={onClearSearch} type="button">Clear search</button>
            </div>
          )}
        </div>
      </div>
      <Composer spaceName={activeSpace.name} draft={draft} onDraftChange={onDraftChange} onSubmit={onSubmit} />
    </section>
  )
}
