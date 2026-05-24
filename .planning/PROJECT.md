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
  - WhatsApp: https://wa.me/message/WUS4HFGE7PKBO1
- **Order channel**: WhatsApp (wa.me/message/WUS4HFGE7PKBO1) — primary for now
- **Payment**: Paystack (account not yet active — will integrate when ready); WhatsApp handles purchases in the interim
- **Content state**: Raw content available — phone photos and TikTok videos; needs organizing/selecting
- **Trust signal**: CAC registration is a strong trust signal for Nigerian customers — prominently display reg. number

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
| Display CAC registration | Strong trust signal for Nigerian customers; distinguishes from unregistered vendors | — Pending |

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
*Last updated: 2026-05-24 after initialization — added CAC registration details and full product list*
