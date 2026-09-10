import type { ReactNode } from 'react'
import type { IconName } from '../types'

export function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    'arrow-up': <path d="M12 19V5m0 0L6.5 10.5M12 5l5.5 5.5" />,
    chevron: <path d="m8 10 4 4 4-4" />,
    command: (
      <>
        <path d="M9 9V7a3 3 0 1 0-3 3h2m7-1h2a3 3 0 1 0-3-3v2m-5 5v2a3 3 0 1 0 3-3v-2m5 3v-2a3 3 0 1 0-3 3v2" />
        <path d="M9 9h6v6H9z" />
      </>
    ),
    grid: (
      <>
        <rect x="4" y="4" width="6" height="6" rx="1" />
        <rect x="14" y="4" width="6" height="6" rx="1" />
        <rect x="4" y="14" width="6" height="6" rx="1" />
        <rect x="14" y="14" width="6" height="6" rx="1" />
      </>
    ),
    moon: <path d="M20.5 15.2A8.5 8.5 0 0 1 8.8 3.5 8.5 8.5 0 1 0 20.5 15.2Z" />,
    panel: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M8 4v16M8 8h13" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    search: (
      <>
        <circle cx="11" cy="11" r="6.5" />
        <path d="m16 16 4.5 4.5" />
      </>
    ),
    spark: (
      <>
        <path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z" />
        <path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" />
      </>
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4m9.4 9.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m9.4-9.4 1.4-1.4" />
      </>
    ),
    thread: (
      <>
        <path d="M5 5.5h14v10H9l-4 3v-13Z" />
        <path d="M8 9h8M8 12h5" />
      </>
    ),
    x: <path d="m6 6 12 12M18 6 6 18" />,
  }

  return (
    <svg aria-hidden="true" className="icon" fill="none" height={size} viewBox="0 0 24 24" width={size}>
      {paths[name]}
    </svg>
  )
}
