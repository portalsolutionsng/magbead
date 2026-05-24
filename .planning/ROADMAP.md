# Roadmap: Mag'Beads

## Overview

Four phases that take the Mag'Beads site from empty scaffold to a fully deployed portfolio-shop with gallery, content pages, and a Paystack payment page ready to flip live. Phase 1 puts a real URL in the TikTok bio. Phase 2 fills that URL with stunning product photos. Phase 3 adds the supporting pages that close the sale. Phase 4 builds the payment page and makes it trivial to activate when the Paystack account clears.

## Phases

- [ ] **Phase 1: Foundation** - Scaffold, global layout, hero, deployed live to GitHub Pages
- [ ] **Phase 2: Gallery** - Product gallery with filtering, detail pages, per-product WhatsApp CTAs, image pipeline
- [ ] **Phase 3: Content & WhatsApp** - About page, How to Order page, full WhatsApp integration wired site-wide
- [ ] **Phase 4: Paystack Ready** - Payment page built behind env flag, Cloudflare Pages migration path confirmed

## Phase Details

### Phase 1: Foundation
**Goal**: A real Mag'Beads URL is live on GitHub Pages — brand name, nav, hero, floating WhatsApp button — ready to put in the TikTok bio immediately
**Mode:** mvp
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05, FOUND-06, FOUND-07
**Success Criteria** (what must be TRUE):
  1. The site loads at a real GitHub Pages URL on a mobile phone in under 3 seconds
  2. The floating WhatsApp button is visible on every page and opens the Mag'Beads chat when tapped
  3. Sharing the site URL on TikTok or Instagram shows a branded OG preview card (title, description, image)
  4. The homepage hero displays the Mag'Beads brand name, tagline, and a primary WhatsApp CTA button above the fold on a 390px screen
**Plans**: 1 plan (Walking Skeleton)
- [ ] 01-01-PLAN.md — Scaffold + global chrome + hero + PWA + OG meta, deployed live to GitHub Pages
**UI hint**: yes

### Phase 2: Gallery
**Goal**: Visitors can browse every product category, tap a piece, and tap "Order on WhatsApp" from the product detail page — all on mobile
**Mode:** mvp
**Depends on**: Phase 1
**Requirements**: GALL-01, GALL-02, GALL-03, GALL-04, GALL-05, GALL-06, GALL-07, PERF-01, PERF-02, PERF-03, PERF-04, PERF-05
**Success Criteria** (what must be TRUE):
  1. The gallery shows products on a dark background in a 1:1 grid with category pill filters that work by tap
  2. Tapping a product card opens a detail page with the full spec (color, strands, length, price) and an "Order on WhatsApp" button pre-filled with the product name
  3. All product images are WebP, visually sharp on mobile, and the total page weight stays under 300KB
  4. Men's collection items are visibly labelled and filterable, and gallery works end-to-end with placeholder data before real photos are uploaded
**Plans**: TBD
**UI hint**: yes

### Phase 3: Content & WhatsApp
**Goal**: Every trust question a first-time Nigerian buyer asks — "Is this legit?", "How do I order?", "Where are you?" — is answered on a real page with the WhatsApp button a single tap away
**Mode:** mvp
**Depends on**: Phase 2
**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04, CONT-05, CONT-06, WA-01, WA-02, WA-03, WA-04
**Success Criteria** (what must be TRUE):
  1. The About page shows the Mag'Beads brand story, CAC Reg. No. 3804623, and the Port Harcourt address
  2. The How to Order page states nationwide delivery above the fold and shows the full order process (Browse → WhatsApp → Confirm → Pay deposit → Delivery)
  3. Every WhatsApp CTA button across the site uses the `wa.me/message/WUS4HFGE7PKBO1` deep link with URL-encoded pre-fill text, and the phone number +234 703 239 1971 is displayed in the footer and How to Order page
  4. TikTok (@magbeadsoboho) and Instagram (@mag_beads) links are visible in the footer on every page
**Plans**: TBD
**UI hint**: yes

### Phase 4: Paystack Ready
**Goal**: The `/pay` route exists, is fully built, and activates with zero code change — just flipping `PAYSTACK_ACTIVE=true` in the Cloudflare Pages dashboard when the account is verified
**Mode:** mvp
**Depends on**: Phase 3
**Requirements**: PAY-01, PAY-02, PAY-03
**Success Criteria** (what must be TRUE):
  1. Visiting `/pay` with `PAYSTACK_ACTIVE` unset shows a "Payment activation pending" holding state — not a broken page
  2. Setting `PAYSTACK_ACTIVE=true` activates the full payment flow with zero changes to committed code
  3. The Paystack secret key is only ever present in a server-side environment variable and is never visible in browser network requests or client bundles
**Plans**: TBD

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 0/1 | Planned | - |
| 2. Gallery | 0/? | Not started | - |
| 3. Content & WhatsApp | 0/? | Not started | - |
| 4. Paystack Ready | 0/? | Not started | - |
