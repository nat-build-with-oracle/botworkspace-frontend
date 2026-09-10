import { Icon } from './Icon'
import type { Space } from '../types'

type MobileToolbarProps = {
  activeSpace: Space
  mobilePanel: 'spaces' | 'inspector' | null
  onPanelChange: (panel: 'spaces' | 'inspector' | null) => void
}

export function MobileToolbar({ activeSpace, mobilePanel, onPanelChange }: MobileToolbarProps) {
  return (
    <div className="mobile-toolbar">
      <button
        aria-expanded={mobilePanel === 'spaces'}
        className="mobile-nav-button"
        onClick={() => onPanelChange(mobilePanel === 'spaces' ? null : 'spaces')}
        type="button"
      >
        <Icon name="grid" size={16} />Spaces
      </button>
      <span className="mobile-current">{activeSpace.name}</span>
      <button
        aria-expanded={mobilePanel === 'inspector'}
        className="mobile-nav-button"
        onClick={() => onPanelChange(mobilePanel === 'inspector' ? null : 'inspector')}
        type="button"
      >
        <Icon name="panel" size={16} />Details
      </button>
    </div>
  )
}
