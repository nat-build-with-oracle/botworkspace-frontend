import { Icon } from './Icon'

type PanelHeadingProps = {
  title: string
  closeLabel: string
  onClose: () => void
}

export function PanelHeading({ title, closeLabel, onClose }: PanelHeadingProps) {
  return (
    <div className="panel-heading">
      <h2>{title}</h2>
      <button aria-label={closeLabel} className="icon-button mobile-close" onClick={onClose} type="button">
        <Icon name="x" size={18} />
      </button>
    </div>
  )
}
