# BotWorkspace Web — visual system

## Surface mode

**Operate.** The visitor is exploring a working app shell, so the design favors scanability, clear state, and a convincing conversation rhythm over a marketing hero.

## Direction

An evening desk for an AI workspace: a deep ink canvas, warm paper-like message surfaces, and a single electric cyan signal that marks focus. The first viewport proves the mechanism immediately by showing all three working zones at once. The browser should feel like a composed instrument, not a dashboard of cards.

## Palette

- Ink: `#0b111d` — page ground and outer chrome.
- Panel: `#101a2a` — navigation and inspector surfaces.
- Paper: `#f2efe7` — conversation surface and readable body copy.
- Paper muted: `#d3d0c8` — secondary message copy.
- Signal: `#68e4db` — selected states, links, focus, and the send action.
- Ember: `#ffb87a` — warm status dot and small human accent.
- Rule: `rgba(255,255,255,.1)` — hairlines only; elevation comes from offset soft shadows.

## Type

Use a crisp platform sans for dense controls and a slightly editorial serif for the workspace title and message lead. Body measure stays comfortable; metadata is compact, uppercase, and tracked only when it improves wayfinding. Never use monospace as a costume: reserve it for fixture IDs and measurements.

## Composition

- Desktop: a 220px rail, fluid conversation center, and 278px inspector inside a 100svh shell.
- The conversation is the only light surface; its header, thread, and composer read as one sheet.
- Navigation is a list with active signal, not a grid of cards.
- Inspector uses grouped rows and an open thread action; it never competes with the message.
- Mobile hides the rail and inspector behind labelled controls and keeps the conversation full width.

## Signature interaction

Selecting a space shifts the active rail marker and conversation title. Sending a message adds a clearly marked local fixture to the thread and announces it in the status region. The one authored motion is a short signal sweep on selection/send; `prefers-reduced-motion` removes it.

## States

Hover and focus are explicit. Empty search results name the recovery. Sending with an empty composer is disabled. Theme toggle changes the paper/ink relationship without changing the information architecture. The app remains legible in the soft-light variant.

## Anti-patterns intentionally avoided

No generic hero, KPI tiles, gradient text, glassmorphism, emoji iconography, fake provider claims, or private infrastructure references. SVG icons are small, hand-authored outline paths with consistent stroke weight.
