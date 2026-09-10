import { PanelHeading } from './PanelHeading'
import type { Space } from '../types'

type InspectorPanelProps = {
  activeSpace: Space
  messageCount: number
  participants: string[]
  mobilePanel: 'spaces' | 'inspector' | null
  onClose: () => void
}

export function InspectorPanel({ activeSpace, messageCount, participants, mobilePanel, onClose }: InspectorPanelProps) {
  return (
    <aside id="inspector-panel" aria-label="Space details" className={`inspector-panel ${mobilePanel === 'inspector' ? 'is-mobile-open' : ''}`}>
      <PanelHeading title="Details" closeLabel="Close details panel" onClose={onClose} />
      <div className="inspector-content">
        <dl className="detail-list">
          <div><dt>Space</dt><dd>{activeSpace.name}</dd></div>
          <div><dt>Messages</dt><dd>{messageCount}</dd></div>
          <div><dt>Participants</dt><dd>{participants.length}</dd></div>
        </dl>
        <section className="inspector-section participants" aria-label="Participants">
          <h3>Participants</h3>
          <ul>{participants.map((name) => (
            <li key={name}><span className="participant-avatar" aria-hidden="true">{name.slice(0, 1)}</span>{name}</li>
          ))}</ul>
        </section>
        <section className="inspector-section">
          <h3>About this workspace</h3>
          <p>BotWorkspace Web is a small, open-source atlas for the native app’s information architecture. It is intentionally disconnected from live services.</p>
        </section>
      </div>
    </aside>
  )
}
