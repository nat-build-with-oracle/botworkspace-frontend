export type IconName =
  | 'arrow-up'
  | 'chevron'
  | 'command'
  | 'grid'
  | 'moon'
  | 'panel'
  | 'plus'
  | 'search'
  | 'spark'
  | 'sun'
  | 'thread'
  | 'x'

export type Tone = 'cyan' | 'ember' | 'lilac'

export type Space = {
  id: string
  name: string
  description: string
  count: number
  tone: Tone
}

export type Message = {
  id: string
  spaceId: string
  author: string
  role: 'human' | 'assistant'
  body: string
  timestamp: string
  tone: Tone
  tag?: 'fixture' | 'local'
}
