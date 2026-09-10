import { Icon } from './Icon'

type TopbarProps = {
  isSoftLight: boolean
  onToggleTheme: () => void
}

export function Topbar({ isSoftLight, onToggleTheme }: TopbarProps) {
  return (
    <header className="topbar flex items-center justify-between">
      <div className="brand-lockup">
        <div aria-hidden="true" className="brand-mark"><span /><span /><span /></div>
        <div>
          <p className="brand-name">BotWorkspace</p>
          <p className="brand-mode">Web companion · fixture mode</p>
        </div>
      </div>
      <div className="topbar-actions flex items-center">
        <span className="status-chip"><span className="status-dot" />Local only</span>
        <button
          aria-label={isSoftLight ? 'Use ink theme' : 'Use soft light theme'}
          className="icon-button theme-button"
          onClick={onToggleTheme}
          title={isSoftLight ? 'Use ink theme' : 'Use soft light theme'}
          type="button"
        >
          <Icon name={isSoftLight ? 'moon' : 'sun'} />
        </button>
      </div>
    </header>
  )
}
