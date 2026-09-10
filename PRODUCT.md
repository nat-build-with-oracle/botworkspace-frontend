# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: React + Vite + TypeScript with Tailwind CSS v4 through the official Vite plugin; chosen for a small static companion that can deploy to GitHub Pages without a server.

## Users

Developers and curious readers who want to understand the BotWorkspace interaction model in a browser before opening the native Mac app.

## Product Purpose

BotWorkspace Web is a fixture-driven companion that makes the native app's workspace legible: spaces, messages, a focused thread, and an inspector are visible in one calm working surface. Success means a visitor can understand the shell and try the core interactions in under a minute without credentials or a backend.

## Positioning

It is an open-source UI atlas, not a hosted AI service: the interface demonstrates the product's information architecture with labeled synthetic content instead of pretending to connect to a provider.

## Operating Context

The app is read from a browser at desktop and narrow mobile widths. It is evaluated as a static build and can be served from GitHub Pages. The native Mac repo remains the source of truth for platform behavior; this repo owns the web companion only.

## Capabilities and Constraints

- Show a responsive three-pane workspace with spaces, a conversation, and an inspector.
- Let visitors select a space, search fixture content, compose a local-only message, switch visual tone, and reveal mobile navigation.
- Use fixture data only. No credentials, provider calls, private endpoints, environment identifiers, or private connectivity integration belong in this first surface.
- Keep copy and labels explicit that content is synthetic and the project is independent/open source.
- No source code is copied from Grok or any proprietary application.
- Backend adapters, persistence, authentication, and live model calls are intentionally undecided.

## Brand Commitments

Use the name **BotWorkspace Web** and the parent project's independent/open-source framing. The companion can reference the native BotWorkspace app, but must not imply affiliation with Grok or any other provider.

## Evidence on Hand

- Parent repository: `github.com/nat-build-with-oracle/idea-9sep-wed2026-grok-clone`.
- Native UI screenshots and interaction notes in the parent README and `docs/`.
- AI-generated cover art from the parent repo is available for project documentation, not required by the app surface.
- There is no backend contract or real user dataset; all visible records are authored fixtures.

## Product Principles

1. **Show the mechanism.** The workspace should be understandable at a glance.
2. **Label the boundary.** Synthetic/demo content is visible; private infrastructure never leaks into the UI.
3. **Keep the surface quiet.** Scanability and hierarchy outrank decoration.
4. **Make the small screen honest.** Mobile is a composed navigation mode, not a squeezed desktop.

## Accessibility & Inclusion

Use semantic landmarks, labelled controls, visible keyboard focus, sufficient contrast, reduced-motion support, and a status live region for local-only actions. The interface must remain usable at 390px wide and with touch-sized controls.
