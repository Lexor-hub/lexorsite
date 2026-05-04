# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Dev server with Turbopack at localhost:3000
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint
```

No test suite is configured.

## Architecture

Single-page Next.js 15 (App Router) site. The entire UI lives in one large client component:

- `src/app/page.tsx` — renders `<LexorExperience />`
- `src/components/lexor-experience.tsx` — ~1400-line monolith containing all sections, animations, and logic
- `src/app/layout.tsx` — metadata, fonts (Bricolage_Grotesque, Geist, JetBrains_Mono), lang=pt-BR
- `src/app/globals.css` — CSS variables (design tokens), custom cursor styles, loader, scroll bar

## Key implementation details

**WhatsApp integration**: `WHATSAPP_NUMBER` constant at the top of `lexor-experience.tsx`. The diagnostic form encodes answers and opens `https://wa.me/{number}?text={encoded}`.

**Custom cursor**: Dot + ring + label system implemented in JS — disabled on touch devices. All `cursor-none` classes depend on it being active.

**Animations**: No animation library — all done with `requestAnimationFrame`, CSS transitions, and `IntersectionObserver` for scroll-triggered reveals.

**Scroll tracking**: Two granular scroll trackers (for "System" and "Method" sections) computed against `getBoundingClientRect()`.

**Styling**: Tailwind v4 via `@tailwindcss/postcss`. Design tokens live in CSS variables in `globals.css`. Accent color is lime-green `#c6f432`.

**SVG diagrams**: The cockpit (8-node interconnected system diagram) and module mockups are inline SVG built directly in JSX — not imported assets.

## Content

8 page sections: Manifesto → Problem → System → Modules → Projects → Method → Qualification → Diagnostic (lead form).

6 showcased projects: ID Transportes, Focus Club, Rede Kumon, Duda Dias, Lexy Tools, Sorveteria Tatus.

All copy is in Brazilian Portuguese.
