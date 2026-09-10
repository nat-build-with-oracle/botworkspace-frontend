import { Icon } from './Icon'
import type { Space } from '../types'

type SpacesPanelProps = {
  activeSpaceId: string
  filteredSpaces: Space[]
  mobilePanel: 'spaces' | 'inspector' | null
  onClose: () => void
  onQueryChange: (query: string) => void
  onSelect: (spaceId: string) => void
  query: string
}

export function SpacesPanel({
  activeSpaceId,
  filteredSpaces,
  mobilePanel,
  onClose,
  onQueryChange,
  onSelect,
  query,
}: SpacesPanelProps) {
  return (
    <aside aria-label="Spaces" className={`spaces-panel ${mobilePanel === 'spaces' ? 'is-mobile-open' : ''}`}>
      <div className="panel-heading">
        <div><span className="panel-kicker">Workspace</span><h2>Spaces</h2></div>
        <button aria-label="Close spaces panel" className="icon-button mobile-close" onClick={onClose} type="button"><Icon name="x" size={17} /></button>
        <button aria-label="Create a space" className="icon-button" type="button"><Icon name="plus" size={17} /></button>
      </div>
      <label className="search-field">
        <Icon name="search" size={16} />
        <span className="sr-only">Search spaces and messages</span>
        <input onChange={(event) => onQueryChange(event.target.value)} placeholder="Search workspace" type="search" value={query} />
        <kbd>⌘ K</kbd>
      </label>
      <div className="space-list" role="list">
        <div className="list-label"><span>Your spaces</span><span>{filteredSpaces.length}</span></div>
        {filteredSpaces.map((space) => (
          <button
            aria-current={space.id === activeSpaceId ? 'page' : undefined}
            className={`space-row ${space.id === activeSpaceId ? 'is-active' : ''}`}
            key={space.id}
            onClick={() => onSelect(space.id)}
            role="listitem"
            type="button"
          >
            <span className={`space-glyph tone-${space.tone}`}><Icon name={space.id === 'studio' ? 'spark' : space.id === 'signals' ? 'thread' : 'command'} size={15} /></span>
            <span className="space-copy"><strong>{space.name}</strong><small>{space.description}</small></span>
            <span className="space-count">{space.count}</span>
          </button>
        ))}
        {!filteredSpaces.length && (
          <div className="empty-state"><p>No spaces match “{query}”.</p><button onClick={() => onQueryChange('')} type="button">Clear search</button></div>
        )}
      </div>
      <div className="rail-footer">
        <div className="fixture-note">
          <span className="fixture-icon"><Icon name="spark" size={14} /></span>
          <div><strong>Synthetic by design</strong><span>Everything here is a local fixture.</span></div>
        </div>
        <a href="https://github.com/nat-build-with-oracle/botworkspace-frontend"><span>Open source companion</span><Icon name="arrow-up" size={14} /></a>
      </div>
    </aside>
  )
}
