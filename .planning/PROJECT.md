# Mag'Beads

## What This Is

Mag'Beads is a CAC-registered bead making business (Reg. No. 3804623, Rivers State) based in Rumuigbo, Port Harcourt. This is their portfolio and shop website — showcasing waistbeads, bracelets, necklaces, beaded bags, anklets, phone straps and custom pieces for all genders. The site tells the brand story, converts TikTok visitors into buyers via WhatsApp, and has a Paystack payment page ready to activate when the account is verified. Nationwide delivery across Nigeria.

## Core Value

A TikTok visitor lands on the site, sees stunning bead work, and places a WhatsApp order in under 60 seconds.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] **Gallery**: Product gallery showcasing bead work organized by product category (waistbeads, bracelets, necklaces, beaded bags, anklets, phone straps)
- [ ] **WhatsApp CTA**: Prominent "Order on WhatsApp" button throughout site with pre-filled message linked to Mag'Beads WhatsApp
- [ ] **About**: Brand story section — CAC-registered business since 2022, Port Harcourt roots, quality/luxury positioning, both genders served
- [ ] **Order Info**: How to order page with steps, delivery info (nationwide Nigeria), trust badges including CAC registration
- [ ] **Paystack Page**: Simple, standalone payment page for order deposits — ready to activate when Paystack account is verified
- [ ] **Responsive design**: Mobile-first (most visitors come from TikTok on phones)
- [ ] **Bold & vibrant visual design**: Rich colors, energetic, African aesthetic that matches the bead brand identity

### Out of Scope

- Full cart/inventory system — custom order model means WhatsApp handles order flow for now
- User accounts & login — no accounts needed for enquiry/order model
- CMS / blog — TikTok is the content channel; site is the destination
- Multi-vendor marketplace — single-brand site only

## Context

- **Legal name**: MAG'BEADS — CAC Business Name Reg. No. 3804623, registered 23 November 2022
- **Registered under**: Companies and Allied Matters Act 2020 (CAMA 2020)
- **Nature of business**: Beads Making, General Contracts and Merchandise
- **Address**: No. 4 Ordu Street, Rumuigbo, Rivers State
- **Brand**: @magbeadsoboho (TikTok) — "Best Bead Plug in Port Harcourt, Topnotch Quality, Luxury, Affordable"
- **Products**:
  - Waistbeads
  - Bracelets
  - Necklaces
  - Beaded bags
  - Anklets
  - Phone straps
  - Custom orders (both genders, luxury + affordable)
- **Primary traffic source**: TikTok (mobile-first audience)
- **Social links**:
  - TikTok: https://www.tiktok.com/@magbeadsoboho
  - Instagram: https://www.instagram.com/mag_beads
  - WhatsApp link: https://wa.me/message/WUS4HFGE7PKBO1
  - WhatsApp Business number: +234 703 239 1971
- **Order channel**: WhatsApp — link: wa.me/message/WUS4HFGE7PKBO1 | number: +234 703 239 1971 (use link for CTA buttons, number for display)
- **Payment**: Paystack (account not yet active — will integrate when ready); WhatsApp handles purchases in the interim
- **Content state**: Raw content available on Instagram (@mag_beads) and TikTok — 12+ posts visible, wide color range, to be uploaded once site is ready
- **Photography style**: Mix of dark background product shots, on-body worn shots, flat lay on coloured backgrounds (orange, white). Dark bg makes colors pop best — primary gallery aesthetic.
- **Product listing format**: Color name + strands + length (inches) + price per strand (e.g. "Sky Blue · 3 strands · 40″ · ₦3,500/strand")
- **Pricing range observed**: ₦1,500–₦3,500 per strand / piece depending on product type
- **Product range confirmed from Instagram**:
  - Waistbeads: navy, red, glow-in-dark, black, pink crystal, gold/tan, sky blue — primary product
  - Bracelets: evil eye (blue), purple chunky, men's black stack — secondary product
  - Necklaces: multi-strand pearl — tertiary product
- **Freebie strategy**: Multiple posts offer "+Freebie 🎁" with orders — strong conversion tactic; feature on site ("Surprise freebie with every order")
- **Branded packaging**: MAG'BEADS thank-you card (black, branded) visible in posts — signals premium quality; show on About/brand section
- **Men's products confirmed**: Black bracelet stacks explicitly for men — ensure men's section is visible on homepage
- **Custom orders confirmed**: "JOJO" custom order visible — custom order flow is real and active
- **Port Harcourt identity**: Geo-tag used deliberately on posts — lean into PHC origin as a brand identity signal
- **Trust signal**: CAC registration is a strong trust signal for Nigerian customers — prominently display reg. number
- **Nigerian market note**: Star-rating widgets = distrust. Use WhatsApp chat screenshots + delivery photos as social proof instead

## App-Like UX Direction

The site must feel like a native app on mobile — not a website viewed on a phone. Visitors come from TikTok; the transition should feel seamless.

**What "app feeling" means concretely:**
- **Bottom navigation bar** — Home, Shop, About, Order (like Instagram/TikTok) instead of a top hamburger menu
- **Full-screen sections** — hero and product detail pages fill the entire viewport (`100dvh`)
- **Swipe gestures** — horizontal swipe through gallery images on product detail pages
- **Smooth page transitions** — animated route changes via Motion v12, no jarring full-page reloads
- **Touch-optimised** — no hover states, only touch/tap states; 44px minimum tap targets everywhere
- **Bottom sheet modals** — product quick-view or order confirmation as slide-up sheets, not popups
- **Skeleton loaders** — branded loading states instead of blank screens while images load
- **PWA (Progressive Web App)** — manifest + service worker so users can "Add to Home Screen" and launch it like an installed app with the Mag'Beads icon
- **No visible scrollbars** — clean, full-bleed layouts
- **Snap scrolling** on gallery sections — each category snaps into place like Stories/Reels
- **Sticky WhatsApp CTA** — always one tap away, no matter where the user is
- **Quality icons throughout** — consistent icon set used for nav, CTAs, product specs, trust signals, and social links

## Constraints

- **Hosting**: **Cloudflare Pages** (preferred — free, commercial use allowed, global CDN, supports serverless Workers for Paystack API routes) OR **GitHub Pages** (static only — fine until Paystack activates, no server-side support) — NOT Vercel (ToS prohibits payment processing on free tier)
- **Tech**: Must be easy to go live without complex DevOps; Paystack integration must be addable without full rebuild; if GitHub Pages used for now, must be able to migrate to Cloudflare Pages when Paystack activates; do NOT use Next.js static export mode — disables image optimization and API routes
- **Content**: No professional photoshoot yet — site must look great with real product photos from phones/TikTok; pre-process images with sharp to WebP before committing
- **Payment**: Paystack page must be buildable now but can remain inactive (env-var toggle) until account verification completes

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js 16 on Cloudflare Pages | Free, commercial use allowed, global CDN, Cloudflare Workers handles Paystack server-side API routes; GitHub Pages fallback is static-only | — Pending |
| Tailwind v4 | CSS-first @theme config ideal for vibrant brand palette; 100x faster builds; released Jan 2025 | — Pending |
| Motion v12 (not framer-motion) | Framer Motion deprecated; Motion v12 uses hardware-accelerated WAAPI, matters on mid-range Android | — Pending |
| Lucide React for icons | Tree-shakeable, consistent stroke style, 1,500+ icons, zero config with Next.js — used for nav, CTAs, specs, trust signals, social | — Pending |
| WhatsApp CTA: link for buttons, number for display | Use wa.me/message/WUS4HFGE7PKBO1 for clickable CTAs; display +234 703 239 1971 as visible phone number for trust | — Pending |
| WhatsApp-first ordering | Paystack not yet active; WhatsApp is the dominant trusted commerce channel in Nigeria | — Pending |
| Mobile-first design | Majority of visitors arrive from TikTok on mobile devices | — Pending |
| Dark background gallery | Matches existing Instagram/TikTok content style; bead colors pop on dark bg | — Pending |
| Display CAC registration | Strong trust signal; distinguishes from unregistered vendors | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-24 — corrected WhatsApp link, added business number (+234 703 239 1971), updated hosting to Cloudflare Pages / GitHub Pages*
