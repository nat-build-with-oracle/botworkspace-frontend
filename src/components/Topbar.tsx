import { Icon } from './Icon'

type TopbarProps = {
  isSoftLight: boolean
  onToggleTheme: () => void
}

export function Topbar({ isSoftLight, onToggleTheme }: TopbarProps) {
  const themeLabel = isSoftLight ? 'Use ink theme' : 'Use soft light theme'
  return (
    <header className="topbar">
      <div className="brand-lockup">
        <span aria-hidden="true" className="brand-mark"><Icon name="panel" size={20} /></span>
        <p className="brand-name">BotWorkspace</p>
      </div>
      <div className="topbar-actions">
        <span className="demo-status">Demo · local only</span>
        <button aria-label={themeLabel} className="icon-button theme-button" onClick={onToggleTheme} title={themeLabel} type="button">
          <Icon name={isSoftLight ? 'moon' : 'sun'} />
        </button>
      </div>
    </header>
  )
}
