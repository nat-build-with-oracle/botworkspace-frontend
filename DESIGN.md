# BotWorkspace Web — visual system

## Direction

A quiet split-view workspace, not an AI landing page. Keep the incumbent ink rails
and warm paper conversation; use compact platform typography and a single muted
teal for selection, focus, and actions. The conversation carries the hierarchy.

This refinement preserves the sample conversations and three-zone structure.
It removes repetitive demo badges, sparkle motifs, decorative tiles, editorial
serif headings, and controls that did not perform an action.

## Palette

Tokens live in `src/styles/foundation.css`.

| Role | Ink theme | Soft-light theme |
| --- | --- | --- |
| Chrome | `#0e1719` | `#e3e8e4` |
| Rail | `#142023` | `#edf0eb` |
| Selected row | `#213538` | `#d8e4df` |
| Rail text | `#f0eee8` | `#1d2b2c` |
| Rail secondary | `#a9b4b3` | `#596568` |
| Paper | `#f1eee5` | same |
| Paper text / secondary | `#29302f` / `#626b68` | same |
| Action on paper | `#39736e` | `#356b66` |

Teal is a functional accent, not a badge or glow. Avatars use neutral initials.
Hairlines separate zones; no shadows or decorative entrance animations.

## Typography and hierarchy

- One platform UI sans stack, with Avenir as a fallback; no editorial serif.
- Brand 14px/600; conversation title 20–23px/600; rail headings 17px/600.
- Message body 14px with 1.62 line-height and a maximum 70ch measure.
- Secondary text and metadata 11–13px, sentence case, not tracked uppercase.
- Mobile inputs use 16px to avoid focus-triggered text zoom on mobile Safari.
- “Demo · local only” appears once globally. Only newly added messages have a
  Local marker. One composer line explains that reload clears local state.

## Composition

- A 100dvh shell: 50px topbar, then one bounded workspace.
- Desktop rails: 228px / fluid conversation / 244px; intermediate: 205px / fluid /
  215px. Pane headings align to a 76px row.
- Thread scrolls internally. The composer stays within the conversation pane.
- At 820px and below, a 44px navigation strip exposes Spaces and Details. An open
  secondary pane replaces the conversation; it is not a modal or overlay.
- Closed mobile panes use `display: none`, removing their controls from tab order.
- Mobile close, theme, navigation, and send controls have at least 44px targets.

## Interaction language

- Search offers explicit recovery in the rail and conversation.
- Enter adds a local message; Shift+Enter inserts a newline. IME confirmation
  must not submit. Adding clears search so the new message is visible.
- Message and participant counts are computed from current records.
- Mobile open moves focus into the pane; close or Escape restores the trigger.
- Focus uses a contextual teal outline, including the scrollable thread and
  input containers. Placeholder text, selection, caret, and scrollbars are themed.
- Theme switching changes the rail tone without altering layout or persistence.

## Implementation boundaries

`App.tsx` owns session state. Zone components compose shared `PanelHeading`,
`MessageItem`, `Composer`, and `Icon` pieces. Four CSS files own foundation,
rails, conversation, and responsive rules; `App.css` only imports them.

No new dependencies, provider connections, persistence, private endpoints, or
proprietary assets. See `docs/FRONTEND-SPEC.md` for behavior and deployment.
