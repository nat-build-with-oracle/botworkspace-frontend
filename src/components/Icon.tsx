import type { ReactNode } from 'react'
import type { IconName } from '../types'

export function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    'arrow-up': <path d="M12 19V5m0 0L6.5 10.5M12 5l5.5 5.5" />,
    grid: <><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /></>,
    moon: <path d="M20.5 15.2A8.5 8.5 0 0 1 8.8 3.5 8.5 8.5 0 1 0 20.5 15.2Z" />,
    panel: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M8 4v16M16 4v16" /></>,
    search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></>,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4m9.4 9.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m9.4-9.4 1.4-1.4" /></>,
    x: <path d="m6 6 12 12M18 6 6 18" />,
  }
  return (
    <svg aria-hidden="true" className="icon" fill="none" height={size} viewBox="0 0 24 24" width={size} stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  )
}
