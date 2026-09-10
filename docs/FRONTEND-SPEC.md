# BotWorkspace Web — frontend contract

Status: **implemented MVP, deployed to Cloudflare Workers**
Last reviewed: 2026-09-10

This document is the contract for the web companion. It is deliberately narrower than the native Mac app contract: the web project demonstrates the UI model with local fixtures and does not become a credentialed client by accident.

The shipped first screen is intentionally bounded to one workspace viewport. `App.tsx` owns state and composition; reusable `Topbar`, `MobileToolbar`, `SpacesPanel`, `ConversationPanel`, `InspectorPanel`, and `Icon` components own the visual zones, while `data/fixtures.ts` owns authored records.

## 1. Scope

### In scope

- One responsive workspace route (`/`).
- Three visible zones on desktop: spaces rail, conversation sheet, inspector.
- Fixture-backed selection, search, local-only compose, status announcement, theme tone, and mobile navigation.
- Cloudflare Workers Static Assets hosting, with a portable Vite static build.
- Semantic HTML, keyboard focus, reduced motion, and 390px composition.

### Out of scope

- Live model providers, authentication, persistence, file upload, or a server API.
- Private infrastructure discovery or deployment-specific transport details.
- Claims of affiliation with Grok or reuse of proprietary source/assets.
- Native Mac behavior; the parent repository owns that contract.

## 2. Information architecture

```text
BotWorkspace Web
└── Workspace route
    ├── Spaces rail
    │   ├── Search fixture content
    │   ├── Space list + active state
    │   └── Local fixture status
    ├── Conversation sheet
    │   ├── Space title + synthetic badge
    │   ├── Message thread
    │   └── Local-only composer
    └── Inspector
        ├── Selected space summary
        ├── Fixture metadata
        └── Open thread action
```

## 3. Behavior contract

| Interaction | Required result |
| --- | --- |
| Select a space | Active marker moves; title, description, and fixture messages update. |
| Search | Spaces and message summaries filter without a network request; empty state gives a recovery. |
| Compose + send | Enabled only for non-empty text; appends a local fixture message and announces success. |
| Theme button | Toggles the soft-light variant and updates its accessible label. |
| Mobile navigation | Rail/inspector controls reveal labelled panels without losing the conversation. |
| Keyboard navigation | Every action is reachable; focus is visible; icon-only controls have labels. |

## 4. Fixture model

```ts
type Space = {
  id: string
  name: string
  description: string
  count: number
  tone: 'cyan' | 'ember' | 'lilac'
}

type Message = {
  id: string
  spaceId: string
  author: string
  role: 'human' | 'assistant'
  body: string
  timestamp: string
  tag?: 'fixture' | 'local'
}
```

Fixtures are illustrative and must remain labelled in the surface. Any future adapter must preserve the same view model and explicit privacy boundary.

## 5. Visual contract

See [`DESIGN.md`](../DESIGN.md). The first viewport must communicate three-pane workspace structure, a selected conversation, a local/demo boundary, and one clear compose action without scrolling on a 1440px-wide desktop viewport. At 390px, the conversation remains primary and secondary zones become explicit panels.

## 6. Accessibility contract

- `header`, `nav`, `main`, `aside`, and `footer` landmarks are used where appropriate.
- Buttons and inputs have visible or programmatic labels.
- Focus rings use the signal color and are never removed.
- Contrast targets follow WCAG AA for body text and controls.
- Status updates use `aria-live="polite"`.
- Reduced motion disables the signal sweep.

## 7. Privacy and independence contract

Tracked source must not contain sensitive values or environment-specific endpoints. The app must not mention private hosts, private connectivity details, deployment identifiers, or credentials. The project is an independent open-source implementation inspired by observed interaction patterns, not a Grok product or code clone.

## 8. Verification gates

- `npm run lint` passes.
- `npm run build` passes.
- Impeccable detector reports no mechanical UI findings requiring a code change.
- Ego Browser snapshot exposes the workspace landmarks and controls.
- Desktop and mobile captures show no clipping, overflow, or hidden first-viewport mechanism.
- A source scan finds no private endpoint or environment-specific identifiers.

Evidence captured in this repo:

- [Desktop review](../.impeccable/review/desktop.png) at 1440×900.
- [Mobile review](../.impeccable/review/mobile.png) at 390×844.
- The Impeccable mechanical scan returned `[]`; the later visual pass bounded the thread and kept the composer inside the first viewport.
- `npm run lint` and `npm run build` pass.

## 9. Open decisions

- A provider-neutral adapter contract is deferred until a real backend is requested.
- Routing beyond `/` is deferred until a second surface exists.
- Persistent user settings are deferred; theme and compose state are intentionally session-local.

## 10. Deployment contract

- Target: a static-assets-only Cloudflare Worker named `botworkspace-frontend`.
- `wrangler.jsonc` publishes only `./dist`, with public `workers.dev` routing and
  `single-page-application` navigation fallback. It does not enable a backend.
- `npm run deploy:check` builds and performs a Wrangler dry-run without uploading.
- `npm run deploy` rebuilds before publishing; Wrangler is pinned to 4.130.0 in
  the command so no new application dependency is needed.
- Authentication and account selection come from local Wrangler OAuth or external
  environment variables; neither is committed. `.wrangler/`, local environment
  files, and the shared memory link are ignored.
- Git pushes do not automatically deploy. Deployment must be explicitly invoked.
- Release verification: lint, TypeScript/build, Wrangler dry-run, live HTTP asset
  byte comparison, SPA navigation, and an Ego Browser interaction smoke check.

### Live release — 2026-09-10

- URL: <https://botworkspace-frontend.laris.workers.dev>
- Uploaded exactly four static assets: HTML, favicon, hashed JavaScript, and CSS.
- Lint, TypeScript/build, deployment dry-run, and asset boundary assertions passed.
- All four live assets returned HTTP 200 and matched the local build byte-for-byte.
- Ego Browser verified the rendered React app, space selection, local compose,
  theme toggling, and direct navigation through SPA fallback on the live URL.
- Unknown paths return `index.html` with HTTP 200, including missing asset paths.
  This is the documented [assets-only SPA fallback](https://developers.cloudflare.com/workers/static-assets/routing/single-page-application/), not a missing-file 404 contract.
