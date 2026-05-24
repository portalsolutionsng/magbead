# Walking Skeleton — Mag'Beads

**Phase:** 1
**Generated:** 2026-05-24

## Capability Proven End-to-End

A TikTok visitor opens the live GitHub Pages URL on their phone, sees the Mag'Beads-branded hero with a working "Order on WhatsApp" CTA, taps the bottom nav to move between Home / Shop / About / Order with animated transitions, taps the floating WhatsApp button from any page to open the real Mag'Beads chat, and can "Add to Home Screen" — all served as static HTML carrying OG meta tags for link-preview cards.

This is the thinnest slice that exercises every architectural layer: scaffold + build + routing + design system + global chrome (nav/footer/float) + page transitions + PWA + static export + GitHub Pages deploy. No product data, no forms, no API routes — those are later vertical slices.

## Architectural Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Framework | Next.js 16.2.x, App Router, no `src/` dir, `@/*` import alias | Locked in RESEARCH.md. App Router gives `template.tsx` per-route transitions and server-rendered `metadata` for OG tags. |
| Language | TypeScript 5.x | Type safety; catches env/key mistakes before Paystack phase. |
| Styling | Tailwind CSS v4.3.x, CSS-first `@theme {}` in `app/globals.css`, no `tailwind.config.js`, no shadcn | Locked. Vibrant custom dark palette maps to design tokens directly in CSS. UI-SPEC §11 is the canonical token set. |
| PostCSS | `@tailwindcss/postcss` v4 | Required Tailwind v4 PostCSS integration. |
| Fonts | `next/font/google` — Playfair Display 700 (`--font-playfair`), Inter 400/600 (`--font-inter`) | Self-hosted, zero layout shift, `display: swap`. Variables wired into `@theme`. |
| Animation | Motion v12, imported from `motion/react` (NEVER `framer-motion`) | Locked. WAAPI hardware acceleration matters on mid-range Android. |
| Page transitions | `app/template.tsx` (client component) — NOT `layout.tsx` | `template.tsx` remounts per route; `layout.tsx` persists. Correct primitive for per-route fade+slide. |
| Icons | `lucide-react` (tree-shaken named imports) + one custom stroke-style WhatsApp SVG | Locked. Lucide has no WhatsApp glyph; custom SVG matches stroke style. |
| Top loader | `nextjs-toploader` v3, gold `#D4A843`, `showSpinner: false`, height 3 | Locked. YouTube-style nav progress bar; spinner conflicts with bottom-nav aesthetic. |
| PWA | `@serwist/next` + `serwist` v9, `swSrc: app/sw.ts`, `swDest: public/sw.js`, disabled in dev | Locked. Minimum viable PWA: manifest + precache SW so "Add to Home Screen" works. |
| Build / hosting (Phase 1–3) | Static export (`output: 'export'`, `trailingSlash: true`, `images.unoptimized: true`) → GitHub Pages via GitHub Actions | GitHub Pages serves static files only. RESEARCH.md §4: `output: 'export'` is acceptable for the no-API-routes GitHub Pages phase; removed at Phase 4 Cloudflare migration with zero component changes. |
| Custom domain | `public/CNAME` → `magbeads.com.ng`; no `basePath` needed | Custom apex domain means no `/repo-name` path prefix. |
| Directory layout | `app/` routes, `components/layout/*` + `components/ui/*`, `data/site.ts` single source of config | RESEARCH.md §9 architecture. `data/site.ts` is the single source for WhatsApp link, phone, CAC, address, socials. |
| Data layer (this phase) | None — `data/site.ts` static config only | No products/CMS/DB in the skeleton. `products.ts`/`categories.ts` arrive in Phase 2. |

## Stack Touched in Phase 1

- [x] Project scaffold (Next.js 16, TypeScript, Tailwind v4, lint, build)
- [x] Routing — six real App Router routes (`/`, `/gallery`, `/about`, `/order`, `/pay` + root layout/template)
- [x] Design system — Tailwind v4 `@theme` brand tokens + Google Fonts wired
- [x] UI interaction — bottom nav navigates between routes; floating WhatsApp + hero CTA open the real `wa.me` chat; Motion v12 page transitions on every route change
- [x] PWA — `manifest.json` + service worker (`app/sw.ts` → `public/sw.js`); "Add to Home Screen" works
- [x] Server-rendered OG/Twitter meta in `app/layout.tsx` (TikTok crawler reads raw HTML)
- [x] Deployment — GitHub Actions builds static `out/` and publishes to GitHub Pages at a real URL

> Note on the standard skeleton checklist's "DB read AND write": this project has no database in Phase 1 (and intentionally none until Paystack in Phase 4). The equivalent "full-stack proof" here is the static-export build pipeline running end-to-end and serving the deployed site at a live URL with working client-side navigation and external WhatsApp links. The deployment leg is the load-bearing proof, not a DB round-trip.

## Out of Scope (Deferred to Later Slices)

Explicitly NOT in the skeleton — do not re-litigate this minimalism in later phases:

- Product gallery grid, category pill filters, product detail pages (`/gallery/[slug]`), `data/products.ts`, `data/categories.ts` — **Phase 2**
- Image pipeline (`sharp`/WebP), `next/image` usage with real photos — **Phase 2** (skeleton uses `images.unoptimized: true` and a placeholder OG image only)
- About page brand-story content, How-to-Order step flow, full WhatsApp pre-fill messages, customer social proof — **Phase 3** (skeleton ships these routes as branded stubs)
- Paystack payment flow, `PAYSTACK_ACTIVE` env activation, Cloudflare Workers, server-side API routes, removal of `output: 'export'` — **Phase 4** (skeleton ships `/pay` as a branded "coming soon" stub)
- Skeleton shimmer loaders, swipe gestures, bottom-sheet modals, snap scrolling — **Phase 2+** (UI-SPEC declares them; not wired in the skeleton)
- Real designed PWA icons and final OG image artwork — skeleton ships valid placeholder PNGs so the manifest/preview validate; final art is a content task

## Subsequent Slice Plan

Each later phase adds one vertical slice on top of this skeleton WITHOUT altering its architectural decisions (framework, styling, transitions, deploy pipeline):

- **Phase 2 — Gallery:** Add `data/products.ts` + `data/categories.ts`, image pipeline, `/gallery` grid with category pill filters, `/gallery/[slug]` detail pages, per-product WhatsApp CTAs. Fills the `/gallery` route stub.
- **Phase 3 — Content & WhatsApp:** Fill `/about` (brand story, CAC, address) and `/order` (delivery + step flow) route stubs; wire the single `WhatsAppButton` component with URL-encoded pre-fill text site-wide; surface phone + socials in footer.
- **Phase 4 — Paystack Ready:** Migrate hosting to Cloudflare Pages (remove `output: 'export'` + `images.unoptimized`), build `/pay` behind `PAYSTACK_ACTIVE`, add server-side Paystack route. Replaces the `/pay` stub.
