import type { FormEvent } from 'react'
import { Icon } from './Icon'
import type { Message, Space } from '../types'

type ConversationPanelProps = {
  activeSpace: Space
  draft: string
  onDraftChange: (draft: string) => void
  onOpenInspector: () => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  visibleMessages: Message[]
}

export function ConversationPanel({
  activeSpace,
  draft,
  onDraftChange,
  onOpenInspector,
  onSubmit,
  visibleMessages,
}: ConversationPanelProps) {
  return (
    <section aria-label="Conversation" className="conversation-panel">
      <header className="conversation-header">
        <div className="conversation-heading">
          <div className="breadcrumb"><span>BotWorkspace</span><Icon name="chevron" size={12} /><span>Spaces</span></div>
          <div className="title-row"><h1>{activeSpace.name}</h1><span className="fixture-badge">Fixture</span></div>
          <p>{activeSpace.description}</p>
        </div>
        <button aria-label="Open space details" className="header-action" onClick={onOpenInspector} type="button"><Icon name="panel" size={17} /></button>
      </header>
      <div className="thread-wrap">
        <div className="thread-intro">
          <span className={`intro-mark tone-${activeSpace.tone}`}><Icon name="spark" size={16} /></span>
          <div><strong>Conversation seed</strong><span>Authored content · {activeSpace.count} authored notes</span></div>
          <span className="thread-rule" />
        </div>
        <div className="message-list">
          {visibleMessages.length ? visibleMessages.map((message) => (
            <article className={`message ${message.role}`} key={message.id}>
              <div className={`avatar tone-${message.tone}`} aria-hidden="true">{message.role === 'assistant' ? <Icon name="spark" size={16} /> : message.author.slice(0, 1)}</div>
              <div className="message-content">
                <div className="message-meta"><strong>{message.author}</strong>{message.tag && <span className={`message-tag ${message.tag}`}>{message.tag}</span>}<time>{message.timestamp}</time></div>
                <p>{message.body}</p>
              </div>
            </article>
          )) : (
            <div className="empty-thread"><Icon name="search" size={18} /><strong>No messages match this search.</strong><span>Try a different word or clear the search in the spaces rail.</span></div>
          )}
        </div>
      </div>
      <footer className="composer-wrap">
        <form className="composer" onSubmit={onSubmit}>
          <textarea aria-label={`Write a local fixture message in ${activeSpace.name}`} onChange={(event) => onDraftChange(event.target.value)} placeholder="Add a thought to this fixture…" rows={1} value={draft} />
          <div className="composer-controls">
            <span className="composer-hint"><Icon name="command" size={14} />Local fixture</span>
            <span className="composer-hint desktop-only">Enter to add · Shift + Enter for a new line</span>
            <button aria-label="Add local fixture message" className="send-button" disabled={!draft.trim()} type="submit"><Icon name="arrow-up" size={17} /></button>
          </div>
        </form>
        <p className="composer-disclaimer">This demo never sends messages to a provider or a remote server.</p>
      </footer>
    </section>
  )
}
