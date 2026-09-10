import { Icon } from './Icon'
import type { Space } from '../types'

type InspectorPanelProps = {
  activeSpace: Space
  messageCount: number
  mobilePanel: 'spaces' | 'inspector' | null
  onAnnounce: (message: string) => void
  onClose: () => void
}

export function InspectorPanel({ activeSpace, messageCount, mobilePanel, onAnnounce, onClose }: InspectorPanelProps) {
  return (
    <aside aria-label="Space details" className={`inspector-panel ${mobilePanel === 'inspector' ? 'is-mobile-open' : ''}`}>
      <div className="panel-heading inspector-heading">
        <div><span className="panel-kicker">Context</span><h2>Details</h2></div>
        <button aria-label="Close details panel" className="icon-button mobile-close" onClick={onClose} type="button"><Icon name="x" size={17} /></button>
      </div>
      <div className="inspector-content">
        <div className="selected-space">
          <div className={`selected-orbit tone-${activeSpace.tone}`}><Icon name="spark" size={21} /></div>
          <span className="panel-kicker">Selected space</span>
          <h3>{activeSpace.name}</h3>
          <p>{activeSpace.description}</p>
        </div>
        <dl className="detail-list">
          <div><dt>State</dt><dd><span className="inline-dot" />Local fixture</dd></div>
          <div><dt>Messages</dt><dd>{messageCount}</dd></div>
          <div><dt>Participants</dt><dd>2</dd></div>
          <div><dt>Updated</dt><dd>Just now</dd></div>
        </dl>
        <div className="inspector-section">
          <div className="section-heading"><span>About this surface</span><Icon name="spark" size={14} /></div>
          <p>BotWorkspace Web is a small, open-source atlas for the native app’s information architecture. It is intentionally disconnected from live services.</p>
        </div>
        <button className="thread-action" onClick={() => onAnnounce('Thread view is represented by this fixture surface.')} type="button">
          <span><Icon name="thread" size={16} />Open thread</span><Icon name="arrow-up" size={15} />
        </button>
      </div>
    </aside>
  )
}
