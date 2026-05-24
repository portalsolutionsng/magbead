# Requirements: Mag'Beads

**Defined:** 2026-05-24
**Core Value:** A TikTok visitor lands on the site, sees stunning bead work, and places a WhatsApp order in under 60 seconds.

## v1 Requirements

### Foundation

- [ ] **FOUND-01**: Site scaffolded with Next.js 16, Tailwind v4, TypeScript, and deployed to GitHub Pages
- [ ] **FOUND-02**: Global layout includes header (brand name, nav, WhatsApp icon) and footer (social links, CAC reg number, phone number)
- [ ] **FOUND-03**: Site is fully mobile-responsive with 44px minimum touch targets throughout
- [ ] **FOUND-04**: All pages render OG meta tags (title, description, og:image) in server-rendered HTML for TikTok/Instagram link previews
- [ ] **FOUND-05**: Hero section on homepage shows brand name, tagline, hero image, and primary WhatsApp CTA button
- [ ] **FOUND-06**: Floating WhatsApp button is visible on every page and links to `wa.me/message/WUS4HFGE7PKBO1`
- [ ] **FOUND-07**: Site loads under 300KB initial page weight on mobile

### Gallery

- [ ] **GALL-01**: Product gallery displays bead pieces in a dark-background grid with 1:1 aspect ratio cards
- [ ] **GALL-02**: Gallery is filterable by category (waistbeads, bracelets, necklaces, beaded bags, anklets, phone straps) via horizontal scroll pill tabs
- [ ] **GALL-03**: Each product card shows: product name, color, price, and category badge
- [ ] **GALL-04**: Tapping a product card opens a product detail page with large image, full specs (color, strands, length, price per strand), and description
- [ ] **GALL-05**: Product detail page has a prominent "Order on WhatsApp" button with pre-filled message: "Hi Mag'Beads! I'd like to order [product name]"
- [ ] **GALL-06**: Gallery supports placeholder/dummy product data so it can be deployed before real photos are uploaded
- [ ] **GALL-07**: Men's collection pieces are clearly labelled and browsable within the gallery

### Content Pages

- [ ] **CONT-01**: About page tells the Mag'Beads brand story — CAC-registered since 2022, Port Harcourt roots, quality and luxury positioning, serves all genders
- [ ] **CONT-02**: About page displays CAC Business Name Reg. No. 3804623 as a visible trust signal
- [ ] **CONT-03**: About page shows business address: No. 4 Ordu Street, Rumuigbo, Rivers State
- [ ] **CONT-04**: How to Order page explains the order process step-by-step: Browse → WhatsApp → Confirm details → Pay deposit → Delivery
- [ ] **CONT-05**: How to Order page states nationwide Nigeria delivery clearly above the fold
- [ ] **CONT-06**: How to Order page displays WhatsApp link and phone number (+234 703 239 1971) as contact options

### WhatsApp Integration

- [ ] **WA-01**: All WhatsApp CTA buttons use `wa.me/message/WUS4HFGE7PKBO1` deep link (not bare phone number in URL)
- [ ] **WA-02**: WhatsApp pre-fill text is URL-encoded to work on all Android and iOS browsers
- [ ] **WA-03**: Phone number +234 703 239 1971 is displayed visibly in footer and How to Order page
- [ ] **WA-04**: TikTok (@magbeadsoboho) and Instagram (@mag_beads) links are visible in footer

### Design & Performance

- [ ] **PERF-01**: All product images are pre-processed to WebP format at max 1200px width, 80–150KB file size before committing
- [ ] **PERF-02**: `next/image` component used for all product images with explicit `width`, `height`, and `sizes` props
- [ ] **PERF-03**: Site uses `100dvh` (not `100vh`) for full-height sections to avoid iOS Safari toolbar clipping
- [ ] **PERF-04**: Floating WhatsApp button has iOS safe area inset padding so it is not obscured by home indicator
- [ ] **PERF-05**: Dark background aesthetic applied consistently — dark cards, vibrant bead colors, matching the brand's TikTok/Instagram style

### Paystack (Built, Inactive)

- [ ] **PAY-01**: Payment page route `/pay` exists and is built but renders a "Coming Soon" / "Payment activation pending" state
- [ ] **PAY-02**: Payment page activates fully when `PAYSTACK_ACTIVE` environment variable is set to `true` — zero code change required
- [ ] **PAY-03**: Paystack integration uses server-side API route (Cloudflare Worker when migrated) — secret key never exposed to browser

## v2 Requirements

### Social Proof

- **PROOF-01**: "Worn by real people" gallery section with customer photos (submitted via WhatsApp with permission)
- **PROOF-02**: WhatsApp chat screenshots from satisfied customers displayed as testimonials
- **PROOF-03**: Delivery confirmation photos section

### Custom Order Flow

- **ORDER-01**: Structured custom order guided flow — WhatsApp pre-fill asks for piece type, gender, occasion, color preference
- **ORDER-02**: "As Seen on TikTok" badge on gallery items that appeared in popular videos

### Brand & Content

- **BRAND-01**: Behind-the-scenes / process section — bead selection, stringing, finishing
- **BRAND-02**: Named collections with story captions (e.g. "River Queen Choker", "Oba Set")
- **BRAND-03**: Port Harcourt origin badge — geo-identity signal for local buyers and diaspora

### Paystack (Live)

- **PAY-04**: Paystack payment page fully live with deposit collection once account is verified
- **PAY-05**: Migrate hosting from GitHub Pages to Cloudflare Pages to support Paystack API routes
- **PAY-06**: Webhook signature verification (HMAC SHA512) to prevent fake payment confirmations
- **PAY-07**: Order confirmation flow after successful Paystack payment

## Out of Scope

| Feature | Reason |
|---------|--------|
| Shopping cart & inventory system | Custom order model — WhatsApp handles order flow |
| User accounts / login | Not needed for enquiry-based ordering |
| Star ratings / review widgets | Nigerian market research: associated with fake reviews, reduces trust |
| Blog / CMS | TikTok is the content channel; site is the destination |
| Pop-ups / newsletter capture | TikTok traffic is zero-patience — popups cause immediate bounce |
| Multi-vendor marketplace | Single-brand site |
| International shipping | Nigeria-only for v1 |
| Live stock / inventory counts | Custom order model means stock is not pre-set |

## Traceability

Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Pending |
| FOUND-02 | Phase 1 | Pending |
| FOUND-03 | Phase 1 | Pending |
| FOUND-04 | Phase 1 | Pending |
| FOUND-05 | Phase 1 | Pending |
| FOUND-06 | Phase 1 | Pending |
| FOUND-07 | Phase 1 | Pending |
| GALL-01 | Phase 2 | Pending |
| GALL-02 | Phase 2 | Pending |
| GALL-03 | Phase 2 | Pending |
| GALL-04 | Phase 2 | Pending |
| GALL-05 | Phase 2 | Pending |
| GALL-06 | Phase 2 | Pending |
| GALL-07 | Phase 2 | Pending |
| PERF-01 | Phase 2 | Pending |
| PERF-02 | Phase 2 | Pending |
| PERF-03 | Phase 2 | Pending |
| PERF-04 | Phase 2 | Pending |
| PERF-05 | Phase 2 | Pending |
| CONT-01 | Phase 3 | Pending |
| CONT-02 | Phase 3 | Pending |
| CONT-03 | Phase 3 | Pending |
| CONT-04 | Phase 3 | Pending |
| CONT-05 | Phase 3 | Pending |
| CONT-06 | Phase 3 | Pending |
| WA-01 | Phase 3 | Pending |
| WA-02 | Phase 3 | Pending |
| WA-03 | Phase 3 | Pending |
| WA-04 | Phase 3 | Pending |
| PAY-01 | Phase 4 | Pending |
| PAY-02 | Phase 4 | Pending |
| PAY-03 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 32 total (FOUND×7, GALL×7, PERF×5, CONT×6, WA×4, PAY×3)
- Mapped to phases: 32
- Unmapped: 0 ✓

---
*Requirements defined: 2026-05-24*
*Last updated: 2026-05-24 — traceability expanded to per-requirement rows after roadmap creation*
