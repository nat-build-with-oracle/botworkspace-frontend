import { useEffect, useMemo, useState, type FormEvent } from 'react'
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

  const activeMessages = messages.filter((message) => message.spaceId === activeSpace.id)
  const messageCounts = Object.fromEntries(spaces.map((space) => [
    space.id, messages.filter((message) => message.spaceId === space.id).length,
  ]))

  function closePanel() {
    setMobilePanel(null)
    if (mobilePanel) document.getElementById(`toggle-${mobilePanel}`)?.focus()
  }

  useEffect(() => {
    if (mobilePanel && window.matchMedia('(max-width: 820px)').matches) {
      document.querySelector<HTMLButtonElement>(`#${mobilePanel}-panel .mobile-close`)?.focus()
    }
  }, [mobilePanel])

  function selectSpace(spaceId: string) {
    setActiveSpaceId(spaceId)
    closePanel()
    const selected = spaces.find((space) => space.id === spaceId)
    setAnnouncement(`${selected?.name ?? 'Space'} selected. Fixture content loaded.`)
  }

  function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmedDraft = draft.trim()
    if (!trimmedDraft) return
    const localMessage: Message = {
      id: `local-${crypto.randomUUID()}`,
      spaceId: activeSpace.id,
      author: 'You',
      role: 'human',
      body: trimmedDraft,
      timestamp: 'now',
      tag: 'local',
    }
    setMessages((current) => [...current, localMessage])
    setDraft('')
    setQuery('')
    setAnnouncement('Local fixture added. This message was not sent anywhere.')
  }

  return (
    <div className={`app-shell ${isSoftLight ? 'soft-light' : ''}`} onKeyDown={(event) => {
      if (event.key === 'Escape' && mobilePanel) closePanel()
    }}>
      <div aria-live="polite" className="sr-only">{announcement}</div>
      <Topbar isSoftLight={isSoftLight} onToggleTheme={() => setIsSoftLight((value) => !value)} />
      <MobileToolbar activeSpace={activeSpace} mobilePanel={mobilePanel} onPanelChange={setMobilePanel} />
      <main className={`workspace-grid ${mobilePanel ? 'has-mobile-panel' : ''}`}>
        <SpacesPanel
          activeSpaceId={activeSpace.id}
          filteredSpaces={filteredSpaces}
          messageCounts={messageCounts}
          mobilePanel={mobilePanel}
          onClose={closePanel}
          onQueryChange={setQuery}
          onSelect={selectSpace}
          query={query}
        />
        <ConversationPanel
          activeSpace={activeSpace}
          draft={draft}
          onDraftChange={setDraft}
          onSubmit={submitMessage}
          visibleMessages={visibleMessages}
          query={query}
          onClearSearch={() => setQuery('')}
        />
        <InspectorPanel
          activeSpace={activeSpace}
          messageCount={activeMessages.length}
          participants={[...new Set(activeMessages.map((message) => message.author))]}
          mobilePanel={mobilePanel}
          onClose={closePanel}
        />
      </main>
    </div>
  )
}

export default App
