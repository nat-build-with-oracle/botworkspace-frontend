export type IconName =
  | 'arrow-up'
  | 'grid'
  | 'moon'
  | 'panel'
  | 'search'
  | 'sun'
  | 'x'

export type Space = {
  id: string
  name: string
  description: string
}

export type Message = {
  id: string
  spaceId: string
  author: string
  role: 'human' | 'assistant'
  body: string
  timestamp: string
  tag?: 'fixture' | 'local'
}
