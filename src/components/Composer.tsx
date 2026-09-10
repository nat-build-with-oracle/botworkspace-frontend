import type { FormEvent, KeyboardEvent } from 'react'
import { Icon } from './Icon'

type ComposerProps = {
  spaceName: string
  draft: string
  onDraftChange: (draft: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export function Composer({ spaceName, draft, onDraftChange, onSubmit }: ComposerProps) {
  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key !== 'Enter' || event.shiftKey || event.nativeEvent.isComposing || event.keyCode === 229) return
    event.preventDefault()
    if (draft.trim()) event.currentTarget.form?.requestSubmit()
  }

  return (
    <footer className="composer-wrap">
      <form className="composer" onSubmit={onSubmit}>
        <textarea
          aria-label={`Write a local message in ${spaceName}`}
          aria-describedby="compose-privacy"
          onChange={(event) => onDraftChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Write a message…"
          rows={2}
          value={draft}
        />
        <div className="composer-controls">
          <span className="composer-hint">Enter to add · Shift + Enter for a new line</span>
          <button aria-label="Add local message" className="send-button" disabled={!draft.trim()} type="submit">
            <Icon name="arrow-up" size={18} />
          </button>
        </div>
      </form>
      <p id="compose-privacy" className="composer-disclaimer">Added only in this browser. Cleared on reload.</p>
    </footer>
  )
}
