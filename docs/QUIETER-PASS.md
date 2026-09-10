# Quieter workspace pass

Request: the deployed interface feels too AI-generated. Keep one compact screen
and reusable components; refine the current workspace rather than add a landing page.

## Plan, before source edits

1. Lock space selection, search/empty recovery, compose, theme, and mobile navigation
   with an Ego Browser regression script against the current implementation.
2. Remove repeated synthetic-content badges, sparkles, oversized panel headings,
   decorative icon tiles, and duplicate context. Keep fixture names and messages.
3. Retain the three-pane structure and restrained ink/paper relationship, with
   compact system typography, readable body text, hairlines, and a muted teal action.
4. Replace false affordances with honest UI: remove the inert create-space button
   and pretend thread action; make keyboard hints work. Derive visible counts from
   the actual messages rather than display fictional totals.
5. Preserve session-local data and Cloudflare's static-only deployment boundary.
   Closed mobile panels must not remain in the keyboard tab order.
6. Keep components small and split styles by responsibility rather than append a
   second theme over the old stylesheet. No new dependencies.
7. Run regression checks, lint, typecheck/build, one batched desktop/mobile/theme
   inspection, one correction batch if needed, and an independent review.

## Acceptance

- The conversation, not an oversized title or badge, is the visual focus.
- One always-visible demo disclosure; no repeating fixture pill on every message.
- Every visible action works or is removed; no advertised fake shortcuts.
- Composer stays visible, message text wraps, mobile navigation remains operable.
- Existing sample messages, local-only state and selection behavior survive.
- Update the visual/spec record and screenshots from the final inspected build.

## Baseline evidence

Before implementation, the browser regression passed all 12 checks: initial
conversation, disabled empty compose, space selection, adding/clearing a message,
space isolation and retained local state, empty search and recovery, theme toggle,
and mobile open/close state. Mobile state checks activate the DOM controls;
pointer hit-testing is a separate visual verification, not implied by those checks.

The inherited browser profile uses 150% zoom. The regression compensates its CDP
viewport using measured `pageInfo().w` instead of mislabelling physical screenshot
pixels as CSS viewport width. It does not change the user's profile zoom setting.

## Result and verification — 2026-09-10

- Retained the three-pane layout and all original sample message text. Removed
  ornamental tones/icons, repeated fixture pills, fictional totals, and inert
  create/shortcut/thread controls. Shared components now own headings, message
  rows, and composition; the 1,101-line stylesheet is replaced by four focused files.
- All **25 browser interaction assertions passed locally and on the deployed
  Worker**: selection/search/recovery, local state, truthful counts, Enter and
  Shift+Enter, simulated IME Enter guard, theme, mobile panel focus/close/Escape,
  and no mobile page overflow. Tests live in `scripts/browser-smoke.sh`.
- Lint, TypeScript/build, Wrangler dry-run, and `git diff --check` passed.
- One manual Impeccable source scan returned `[]`. This is mechanical evidence,
  not proof of taste or full accessibility conformance.
- Two batched visual rounds covered ink desktop, soft-light, mobile conversation,
  Spaces, and Details. The correction batch strengthened placeholder/action
  contrast and contextual focus, and removed residual unused styles.
- Measured text contrast: paper action 4.70:1, placeholder 5.08:1, paper metadata
  4.74:1, selected-rail secondary 6.05:1 ink / 4.61:1 soft-light. Focus uses the
  contextual accent rather than the pale rail accent on the paper surface.
- Desktop captures have a **1440×900 CSS viewport**; mobile captures use
  **390×844 CSS**. PNG dimensions are 1.5× larger due to browser zoom. Additional
  layout probes measured 1023×767 and 321×641 CSS; neither created page overflow.
  A long Thai message stayed in the internal scroll region and scrolled into view.
  Exact measurements are in `.impeccable/review/viewports.json`.
- Mobile Spaces and Details also opened through real browser pointer clicks.
- Independent TypeScript and final design reviews passed with no material
  blockers. The leader reviewed all five final capture states. The Details
  capture retains its global topbar and close control, consistent with Spaces.
- Static release verified: all four live files matched the local build bytes;
  direct SPA navigation returned the same app. No backend binding was added.

### Reproduce

```bash
npm run dev
# In another terminal, with Ego Browser available:
npm run test:ui

npm run build
npm run preview -- --port 5174
# In another terminal:
bash scripts/capture-ui.sh
```

### Limits

Browser verification used Chromium through Ego Browser, not Safari/Firefox or a
physical phone. IME coverage exercises the composition event guard, not every OS
input method. The app remains a session-local demo: reload clears messages and
settings; no provider, backend, or persistence is implemented.
