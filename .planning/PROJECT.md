# Magbead

## What This Is

Magbead is a portfolio and shop website for Port Harcourt's leading custom bead maker, @magbeadsoboho on TikTok. The site showcases bead work (jewelry, accessories, custom pieces for all genders), tells the brand story, and converts visitors into buyers via WhatsApp — with Paystack checkout added when the account activates. Nationwide delivery across Nigeria.

## Core Value

A TikTok visitor lands on the site, sees stunning bead work, and places a WhatsApp order in under 60 seconds.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] **Gallery**: Product gallery showcasing bead work organized by category (jewelry, accessories, custom pieces, both genders)
- [ ] **WhatsApp CTA**: Prominent "Order on WhatsApp" button throughout site with pre-filled message linked to Magbead's WhatsApp
- [ ] **About**: Brand story section — who Magbead is, Port Harcourt roots, quality/luxury positioning
- [ ] **Order Info**: How to order page with steps, delivery info (nationwide Nigeria), trust badges
- [ ] **Paystack Page**: Simple, standalone payment page for order deposits — ready to activate when Paystack account is verified
- [ ] **Responsive design**: Mobile-first (most visitors come from TikTok on phones)
- [ ] **Bold & vibrant visual design**: Rich colors, energetic, African aesthetic that matches the bead brand identity

### Out of Scope

- Full cart/inventory system — custom order model means WhatsApp handles order flow for now
- User accounts & login — no accounts needed for enquiry/order model
- CMS / blog — TikTok is the content channel; site is the destination
- Multi-vendor marketplace — single-brand site only

## Context

- **Brand**: Magbead by @magbeadsoboho (TikTok) — "Best Bead Plug in Port Harcourt, Topnotch Quality, Luxury, Affordable"
- **Location**: Port Harcourt, Nigeria; ships nationwide
- **Primary traffic source**: TikTok (mobile-first audience)
- **Social links**:
  - TikTok: https://www.tiktok.com/@magbeadsoboho
  - Instagram: https://www.instagram.com/mag_beads
  - WhatsApp: https://wa.me/message/WUS4HFGE7PKBO1
- **Order channel**: WhatsApp (wa.me/message/WUS4HFGE7PKBO1) — primary for now
- **Payment**: Paystack (account not yet active — will integrate when ready); WhatsApp handles purchases in the interim
- **Content state**: Raw content available — phone photos and TikTok videos; needs organizing/selecting
- **Products**: Custom bead jewelry and accessories for all genders; luxury and affordable ranges; made-to-order

## Constraints

- **Hosting**: Free hosting required — Vercel (Next.js) or GitHub Pages (static) preferred
- **Tech**: Must be easy to go live without complex DevOps; Paystack integration must be addable without full rebuild
- **Content**: No professional photoshoot yet — site must look great with real product photos from phones/TikTok
- **Payment**: Paystack page must be buildable now but can remain inactive until account verification completes

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js on Vercel | Free hosting, easy go-live, supports Paystack API route later without rebuilding | — Pending |
| WhatsApp-first ordering | Paystack not yet active; WhatsApp is existing channel customers already use | — Pending |
| Mobile-first design | Majority of visitors arrive from TikTok on mobile devices | — Pending |
| Bold & vibrant aesthetic | Matches the energy of bead art and African craft; differentiates from generic e-commerce templates | — Pending |

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
*Last updated: 2026-05-24 after initialization*
