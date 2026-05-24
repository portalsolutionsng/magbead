# Research Summary — Mag'Beads

**Synthesized:** 2026-05-24
**Overall confidence:** HIGH across all four research domains

---

## Executive Summary

Mag'Beads is a CAC-registered artisan bead jewelry business (Port Harcourt, Rivers State, Reg. No. 3804623) that needs a portfolio-plus-shop website with one primary job: a TikTok visitor lands, sees the work, and places a WhatsApp order in under 60 seconds. The site must support Paystack payment deposits — inactive until account verification completes — without requiring a rebuild when that day arrives.

**Hosting strategy:** Start on **GitHub Pages** (free, static, live immediately). Migrate to **Cloudflare Pages** (free, commercial use, serverless Workers for Paystack API routes) when Paystack activates. Zero code rebuild — just a hosting switch and an env var flip. NOT Vercel (ToS prohibits payment processing on free tier).

The data layer is a local TypeScript file (`products.ts`), not a CMS. All product pages statically generated at build time. The Paystack page is built from day one behind a `PAYSTACK_ACTIVE` env variable toggle. WhatsApp ordering uses a single `WhatsAppButton` component via `wa.me/message/WUS4HFGE7PKBO1` deep link + display number +234 703 239 1971.

---

## Key Decisions (Non-Negotiable)

| Decision | Rationale |
|----------|-----------|
| **GitHub Pages now → Cloudflare Pages for Paystack** | GitHub Pages: free, static, live today. Cloudflare Pages: free, commercial, Workers for Paystack server-side. Switch when Paystack activates. Never Vercel (ToS). |
| **Next.js 16** | Paystack server-side init requires an API route with a secret key. Needed for Cloudflare Workers. Static output works for GitHub Pages phase. |
| **No `output: 'export'`** | Disables `next/image` optimization and API routes. Use static page generation (SSG) within standard Next.js build instead. |
| **`products.ts` data layer** | No CMS, no external dependency, no rate limits. TypeScript imports at build time. Sufficient for 20–50 products. |
| **`PAYSTACK_ACTIVE` env flag** | Payment page built now, hidden behind feature flag. Zero code change on activation day — flip env var in Cloudflare dashboard. |
| **WhatsApp CTA pattern** | Link: `wa.me/message/WUS4HFGE7PKBO1` for buttons. Display: +234 703 239 1971 as visible phone number. One `WhatsAppButton` component handles all touchpoints. |
| **Dark background gallery** | Matches existing TikTok/Instagram brand aesthetic. Bead colors pop on dark backgrounds. Replicate the look — don't fight it. |

---

## Recommended Stack

| Technology | Version | Role |
|------------|---------|------|
| Next.js | 16.2.x | Framework — App Router, SSG for all pages, API routes for Paystack (Phase 4) |
| React | 19.x | Bundled with Next.js 16 |
| TypeScript | 5.x | Type safety — catches Paystack key/env mistakes early |
| Tailwind CSS | 4.3.x | Styling — CSS-first `@theme` for vibrant brand palette; 100x faster builds |
| Motion | 12.x | Animations — import from `motion/react`; `framer-motion` is deprecated |
| next/image | bundled | Image optimization — converts phone JPEGs to WebP/AVIF |
| @paystack/inline-js | latest | Official Paystack V2 inline library (not `react-paystack` — unmaintained) |
| GitHub Pages | Free | Phase 1–3 hosting (static) |
| Cloudflare Pages | Free | Phase 4+ hosting (Workers for Paystack API routes) |

**Never use:** Vercel (ToS), `output: 'export'`, `framer-motion`, `react-paystack`, Bootstrap/MUI/Chakra, full cart/inventory system, user accounts, star ratings.

---

## Table Stakes Features (Must Ship at Launch)

1. **Visual product gallery** — mobile-first grid, 1:1 aspect ratio cards, dark background, category pills (waistbeads, bracelets, necklaces, beaded bags, anklets, phone straps)
2. **Prominent WhatsApp CTA** — on every page; pre-filled per-product messages; `wa.me/message/WUS4HFGE7PKBO1`; display +234 703 239 1971
3. **Brand story / About** — maker story, Port Harcourt roots, CAC registration No. 3804623 prominently displayed
4. **How to Order page** — Browse → WhatsApp → Confirm → Pay deposit → Delivery; nationwide Nigeria delivery stated above the fold
5. **Mobile-first layout** — 44px touch targets, iOS safe area insets, `100dvh` not `100vh`
6. **Fast load** — under 300KB initial page weight; pre-processed WebP images 80–150KB each
7. **TikTok + Instagram links** — visible in header/footer

---

## Differentiating Features (Phase 2–3)

1. **Custom order guided WhatsApp flow** — structured pre-fill per piece type: "Hi, I want a custom [piece] for [occasion], color [X]…" — kills the "I don't know what to say" friction
2. **Real customer photos** — Nigerian faces wearing the pieces; WhatsApp-submitted with permission; outperforms studio mockups in Nigerian market
3. **Explicit men's section** — underserved segment; explicit inclusion expands the market
4. **Piece names + story captions** — "River Queen Choker", "Oba Set" — names create emotional attachment and shareability
5. **"As Seen on TikTok" badge** — flags gallery items from popular videos; closes the social-proof loop
6. **Behind-the-scenes section** — bead selection, stringing, finishing; builds perceived value

---

## Anti-Features (Never Build at This Scale)

Cart/inventory system, user accounts/login, star ratings, pop-ups/newsletter capture, blog/CMS, live stock counts, multi-currency, complex scroll animations, chatbot.

---

## Architecture — Six Routes

| Route | Type | Purpose |
|-------|------|---------|
| `/` | SSG | Hero + featured gallery + primary WhatsApp CTA |
| `/gallery` | SSG | Full filterable product gallery |
| `/gallery/[slug]` | SSG | Product detail: large image, specs, per-product WhatsApp button |
| `/about` | SSG | Brand story, CAC registration |
| `/order` | SSG | How-to steps, delivery info, trust badges |
| `/pay` | SSG→SSR | Paystack deposit — hidden until `PAYSTACK_ACTIVE=true` |

**Data:** `/data/products.ts` (typed Product array) · `/data/categories.ts` · `/data/site.ts` (WhatsApp link, phone, CAC reg, tagline)

**Image pipeline:** Raw phone photos → sharp/Squoosh locally → WebP max 1200px, 80–150KB, EXIF stripped → `/public/images/products/` → `next/image` with `width`, `height`, `sizes`, `aspect-ratio: 1/1`

---

## Top Pitfalls by Phase

**Phase 1 (Foundation):**
- Never set `output: 'export'` — locks you out of image optimization and API routes
- OG tags in `layout.tsx` from day one — TikTokSpider doesn't execute JavaScript
- `100dvh` not `100vh` — iOS Safari clips `100vh` hero sections
- iOS safe area insets on floating WhatsApp button: `padding-bottom: env(safe-area-inset-bottom)`
- `encodeURIComponent()` on all WhatsApp pre-fill text

**Phase 2 (Gallery):**
- Enforce `aspect-ratio: 1/1` with `object-fit: cover` — inconsistent ratios look amateur
- Run image pre-processing sprint BEFORE gallery ships — raw phone photos are 3–8MB each
- Set `sizes` prop on every `<Image>` — prevents 1200px images downloading on 390px screens
- One `priority` image only (hero) — every extra one stalls First Contentful Paint

**Phase 4 (Paystack — on Cloudflare Pages):**
- Secret key NEVER has `NEXT_PUBLIC_` prefix — immediate, exploitable security failure
- Separate env vars for Preview (test keys) and Production (live keys)
- All amounts in kobo: `Math.round(nairaAmount * 100)`
- HMAC SHA512 webhook verification — missing this allows fake payment confirmations

---

## Suggested Phase Structure

| Phase | Name | Deliverable |
|-------|------|-------------|
| 1 | Foundation | Scaffold, layout, hero, deploy to GitHub Pages. TikTok bio goes live. |
| 2 | Gallery Core | `products.ts`, image prep sprint, `/gallery` + `/gallery/[slug]`, per-product WhatsApp CTAs |
| 3 | Supporting Pages | `/about`, `/order`, customer testimonials, custom order WhatsApp flow |
| 4 | Paystack | Migrate to Cloudflare Pages, `/pay` shell + Workers routes, env toggle, test keys |
| 5 | Polish + SEO | Per-product metadata, OG images, Lighthouse mobile audit, performance budget |

---

## Open Questions

| Question | Matters Because |
|----------|----------------|
| How many products ready for launch? | Determines image prep effort and gallery architecture |
| Are product names and descriptions written? | Naming affects perceived value and shareability |
| Paystack account verification timeline? | If imminent, Phase 4 should move earlier |
| Do customer photos exist for social proof? | "Worn by real people" section requires existing content |
| Will the maker update content herself post-launch? | If yes, a content guide for `products.ts` is needed |

---

*Research is complete. Proceed to requirements definition and roadmap creation.*
