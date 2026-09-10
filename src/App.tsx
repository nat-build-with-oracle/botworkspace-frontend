import { useMemo, useState, type FormEvent } from 'react'
import { ConversationPanel } from './components/ConversationPanel'
import { InspectorPanel } from './components/InspectorPanel'
import { MobileToolbar } from './components/MobileToolbar'
import { SpacesPanel } from './components/SpacesPanel'
import { Topbar } from './components/Topbar'
import { seedMessages, spaces } from './data/fixtures'
import type { Message } from './types'
import './App.css'

function App() {
  const [activeSpaceId, setActiveSpaceId] = useState('studio')
  const [messages, setMessages] = useState(seedMessages)
  const [query, setQuery] = useState('')
  const [draft, setDraft] = useState('')
  const [isSoftLight, setIsSoftLight] = useState(false)
  const [mobilePanel, setMobilePanel] = useState<'spaces' | 'inspector' | null>(null)
  const [announcement, setAnnouncement] = useState('Fixture mode. Nothing leaves this browser.')

  const activeSpace = spaces.find((space) => space.id === activeSpaceId) ?? spaces[0]
  const filteredSpaces = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return spaces
    return spaces.filter((space) => {
      const spaceMessages = messages.filter((message) => message.spaceId === space.id)
      return [space.name, space.description, ...spaceMessages.map((message) => message.body)].some((value) => value.toLowerCase().includes(normalizedQuery))
    })
  }, [messages, query])
  const visibleMessages = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return messages.filter((message) => message.spaceId === activeSpace.id && (!normalizedQuery || message.body.toLowerCase().includes(normalizedQuery)))
  }, [activeSpace.id, messages, query])

  function selectSpace(spaceId: string) {
    setActiveSpaceId(spaceId)
    setMobilePanel(null)
    const selected = spaces.find((space) => space.id === spaceId)
    setAnnouncement(`${selected?.name ?? 'Space'} selected. Fixture content loaded.`)
  }

  function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmedDraft = draft.trim()
    if (!trimmedDraft) return
    const localMessage: Message = {
      id: `local-${Date.now()}`,
      spaceId: activeSpace.id,
      author: 'You',
      role: 'human',
      body: trimmedDraft,
      timestamp: 'now',
      tone: 'ember',
      tag: 'local',
    }
    setMessages((current) => [...current, localMessage])
    setDraft('')
    setAnnouncement('Local fixture added. This message was not sent anywhere.')
  }

  return (
    <div className={`app-shell ${isSoftLight ? 'soft-light' : ''}`}>
      <div aria-live="polite" className="sr-only">{announcement}</div>
      <Topbar isSoftLight={isSoftLight} onToggleTheme={() => setIsSoftLight((value) => !value)} />
      <MobileToolbar activeSpace={activeSpace} mobilePanel={mobilePanel} onPanelChange={setMobilePanel} />
      <main className="workspace-grid">
        <SpacesPanel
          activeSpaceId={activeSpace.id}
          filteredSpaces={filteredSpaces}
          mobilePanel={mobilePanel}
          onClose={() => setMobilePanel(null)}
          onQueryChange={setQuery}
          onSelect={selectSpace}
          query={query}
        />
        <ConversationPanel
          activeSpace={activeSpace}
          draft={draft}
          onDraftChange={setDraft}
          onOpenInspector={() => setMobilePanel('inspector')}
          onSubmit={submitMessage}
          visibleMessages={visibleMessages}
        />
        <InspectorPanel
          activeSpace={activeSpace}
          messageCount={messages.filter((message) => message.spaceId === activeSpace.id).length}
          mobilePanel={mobilePanel}
          onAnnounce={setAnnouncement}
          onClose={() => setMobilePanel(null)}
        />
      </main>
    </div>
  )
}

export default App
