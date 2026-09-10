import { Icon } from './Icon'
import { PanelHeading } from './PanelHeading'
import type { Space } from '../types'

type SpacesPanelProps = {
  activeSpaceId: string
  filteredSpaces: Space[]
  messageCounts: Record<string, number>
  mobilePanel: 'spaces' | 'inspector' | null
  onClose: () => void
  onQueryChange: (query: string) => void
  onSelect: (spaceId: string) => void
  query: string
}

export function SpacesPanel({ activeSpaceId, filteredSpaces, messageCounts, mobilePanel, onClose, onQueryChange, onSelect, query }: SpacesPanelProps) {
  return (
    <aside id="spaces-panel" aria-label="Spaces" className={`spaces-panel ${mobilePanel === 'spaces' ? 'is-mobile-open' : ''}`}>
      <PanelHeading title="Spaces" closeLabel="Close spaces panel" onClose={onClose} />
      <label className="search-field">
        <Icon name="search" size={16} />
        <span className="sr-only">Search spaces and messages</span>
        <input onChange={(event) => onQueryChange(event.target.value)} placeholder="Search workspace" type="search" value={query} />
      </label>
      <nav aria-label="Choose a space">
        <ul className="space-list">
          {filteredSpaces.map((space) => (
            <li key={space.id}>
              <button
                aria-current={space.id === activeSpaceId ? 'page' : undefined}
                className={`space-row ${space.id === activeSpaceId ? 'is-active' : ''}`}
                onClick={() => onSelect(space.id)}
                type="button"
              >
                <span className="space-copy"><strong>{space.name}</strong><small>{space.description}</small></span>
                <span className="space-count" aria-label={`${messageCounts[space.id]} messages`}>{messageCounts[space.id]}</span>
              </button>
            </li>
          ))}
        </ul>
        {!filteredSpaces.length && (
          <div className="empty-state"><p>No spaces match “{query}”.</p><button onClick={() => onQueryChange('')} type="button">Clear search</button></div>
        )}
      </nav>
      <footer className="rail-footer">
        <a href="https://github.com/nat-build-with-oracle/botworkspace-frontend">Source on GitHub <Icon name="arrow-up" size={14} /></a>
      </footer>
    </aside>
  )
}
