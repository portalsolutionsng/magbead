# Features Research — Magbead

**Domain:** Artisan bead jewelry portfolio + shop (Nigerian market, TikTok-traffic, WhatsApp ordering)
**Researched:** 2026-05-24
**Overall confidence:** HIGH — Nigerian market specifics verified across multiple sources; global jewelry UX patterns well-established

---

## Table Stakes

Features users expect on arrival. Missing any of these and visitors bounce within seconds — especially TikTok mobile users with zero patience.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Visual product gallery** | Visitors come from TikTok to *see* the work. No gallery = no reason to stay. | Low | Masonry or grid layout; full-bleed images; mobile-first |
| **Category navigation** | Bead jewelry spans necklaces, bracelets, anklets, rings, men's pieces, women's pieces. Users want to find their type. | Low | Simple tabs or horizontal scroll pills — not dropdowns on mobile |
| **Prominent WhatsApp CTA** | Nigerian buyers expect WhatsApp as the order channel. It's the market norm. Hiding it breaks trust. | Low | Pre-filled message with "Hi Magbead, I want to order..." — reduces friction to zero |
| **Mobile-first layout** | >80% of TikTok traffic arrives on phones. Pinching and zooming is an instant bounce. | Low | Touch targets ≥44px; thumb-reachable CTAs; no hover-only interactions |
| **Fast load time** | 40% of users abandon sites that take >3 seconds. TikTok audiences have conditioned reflex to swipe. | Medium | Next.js static generation + image optimization; <2s first paint target |
| **Brand story / About** | Artisan brands live and die by the maker's story. "Who is Magbead?" is the first trust question. | Low | 1–2 paragraphs + face photo of maker; Port Harcourt roots; "Best Bead Plug" claim with context |
| **How to Order page** | Nigerian online buyers are wary of scams. A clear order process with steps, delivery info, and returns policy is a mandatory trust signal. | Low | Step-by-step: Browse → WhatsApp → Confirm → Pay deposit → Delivery |
| **Social proof — customer photos** | Screenshots of happy customers wearing pieces and WhatsApp delivery confirmations are the #1 trust signal in Nigerian commerce. Generic star ratings don't cut it. | Low | Real customer photos/testimonials; WhatsApp chat screenshots with permission |
| **Delivery coverage statement** | "Nationwide delivery" must be visible before the fold. Nigerian buyers outside Port Harcourt fear they can't order. | Low | "We deliver everywhere in Nigeria" + estimated timelines |
| **TikTok link / video embed** | TikTok visitors expect to connect back. Also: TikTok video quality is better than phone photos — use it as gallery content. | Low | Link to @magbeadsoboho in header/footer; optional: embed 2–3 TikTok videos |
| **Contact visibility** | WhatsApp number visible in header. Nigerian buyers phone-call or WhatsApp before committing even if order button exists. | Low | WhatsApp number + link in header AND footer |

---

## Differentiators

Features that no generic jewelry template includes — what makes Magbead feel premium and human versus just another shop.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Custom order flow** | Magbead's core offering is made-to-order. A dedicated "Custom Order" section with a guided WhatsApp inquiry (pre-filled with: piece type, gender, occasion, color preference) converts browsers into active custom order conversations. | Low | Button opens WhatsApp with structured pre-fill: "Hi, I want a custom [piece] for [occasion], I like [color]..." |
| **Process / behind-the-scenes section** | Showing bead selection, stringing, and finishing builds perceived value and justifies premium pricing. Buyers pay more when they understand craft. | Low | 3–5 phone photos or a TikTok embed showing the making process |
| **"Worn by real people" gallery** | Lifestyle shots of real customers (men and women) wearing pieces, ideally Nigerian faces. Outperforms studio mockups. Converts "will this look good on me?" doubters. | Low | Customer-submitted photos via WhatsApp; permission-based repost |
| **Gender-inclusive positioning** | Most bead jewelry sites skew female. Explicit male section (e.g., "Men's Collection") visually on the homepage increases male buyer conversion — an underserved segment. | Low | Visible gender tabs or separate category card on homepage |
| **Paystack deposit page (ready when activated)** | Built now, activated later. Allows a clean "Pay deposit to confirm your order" flow via card/bank transfer — professional vs. "send to this bank account" | Medium | Next.js API route + Paystack Inline; page exists but link is hidden until account verifies |
| **Port Harcourt origin badge** | "Made in Port Harcourt, Rivers State" is a geo-identity signal. Port Harcourt buyers feel pride; diaspora buyers feel connection. Unusual — most Nigerian brands claim Lagos. | Trivial | Small badge or tagline in About and footer |
| **Piece naming / story captions** | Gallery items with names ("River Queen Choker," "Oba Set") and 1-line descriptions create emotional attachment and shareability. Nameless photos are forgettable. | Low | Simple text under gallery items; optional hover overlay on desktop |
| **Social media freshness indicator** | Link to TikTok with follower count or "Follow us for new drops" signals active brand. Ghost brands kill trust. | Trivial | Dynamic TikTok follow button or static "New pieces every week on TikTok @magbeadsoboho" |
| **WhatsApp Green Tick / verified handle** | WhatsApp Business account with a business name shows "Magbead" not a phone number in the recipient header. Increases trust for first-time buyers. | Low (setup, not dev) | Register WhatsApp Business profile; configure the wa.me link to that profile |
| **"As Seen on TikTok" banner** | For viral pieces, a small badge "Seen on TikTok" ties the social proof from their scroll to the product on site. | Trivial | Manually flag 1–2 gallery items that appear in popular TikTok videos |

---

## Anti-Features

Features that seem useful but are actively harmful for Magbead at this stage — either killing performance, adding complexity with no ROI, or mismatching the customer journey.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **Full cart / inventory system** | Magbead makes to order — there is no stock to deplete. A cart implies catalogue items with quantity, which creates a false promise of instant fulfilment and breaks the custom order expectation. | WhatsApp CTA per item; Paystack deposit page for confirmed orders only |
| **User accounts / login** | Zero artisan jewelry buyers create accounts to browse once. Login walls add friction before any trust is established. Nigerian buyers in particular will not create accounts for a single vendor. | Zero-friction WhatsApp path; Paystack handles email receipt without accounts |
| **Star rating / review widget** | Generic 5-star plugins look fake in Nigerian market (buyers have been burned by paid reviews). They're also hard to seed with real content at launch. | Screenshot testimonials from WhatsApp customers — far more credible locally |
| **Pop-ups / newsletter capture** | TikTok visitors arrive to browse. A pop-up asking for email before they've seen one product kills first impressions. Email marketing is irrelevant when WhatsApp is the channel. | WhatsApp-based follow-up is already built into the order channel |
| **Blog / CMS** | TikTok is the content channel. A blog competes with TikTok for content effort and will always lose. Empty blog pages signal neglect. | Embed TikTok videos directly; link to TikTok profile |
| **Size guide / measurement tool** | Western jewelry sizing (ring sizes in millimetres, etc.) doesn't match bead jewelry. Beads are sized by the maker for the customer via WhatsApp conversation — this is a feature, not a gap. | "Tell us your wrist / neck / ankle measurement on WhatsApp, we'll advise" |
| **Live inventory / stock count** | "3 left in stock" urgency tactics require inventory tracking. Made-to-order means there's no inventory to track, and false scarcity backfires badly. | "All pieces are made to order — order now, ready in [X] days" |
| **Chatbot / AI chat widget** | Third-party chat widgets slow page load, pop up intrusively, and are redundant when WhatsApp is the channel. Visitors will ignore a chatbot and tap WhatsApp. | WhatsApp CTA handles this entirely |
| **Multi-currency / international shipping** | Magbead ships nationwide in Nigeria. International shipping means customs, logistics, FX — complexity far beyond current scale. | "Nigeria nationwide delivery" is a clear scope; revisit at scale |
| **Complex animations / scroll effects** | Parallax, GSAP sequences, staggered reveals — gorgeous on desktop, laggy on mid-range Nigerian phones, and a guaranteed TikTok bounce if the hero takes 500ms to load. | CSS transitions only; image gallery motion limited to lightbox open/close |
| **Wishlist / save for later** | No accounts means no persistence. Wishlist with no login is meaningless on next visit. | Sharing via WhatsApp ("Send me that piece you saw on my site") is the native wishlist |

---

## Feature Dependencies

```
Category navigation → Gallery
(Gallery must exist before categories make sense)

Gallery items → Custom Order CTA
(Seeing a piece triggers the custom inquiry; CTAs on gallery items require items to exist)

Paystack deposit page → WhatsApp ordering flow
(Paystack is the payment step AFTER WhatsApp confirms the order details — not a standalone path)

How to Order page → Delivery info + Paystack deposit page
(How to Order references both the delivery scope and the payment mechanism)

Social proof / customer photos → WhatsApp ordering
(Customer photos come from completed WhatsApp orders; seeded retroactively)

Brand story / About → Custom Order CTA
(Buyers who read the story convert on custom orders at higher rates — story page should end with CTA)

TikTok embed / link → Gallery
(TikTok videos serve as gallery content supplement — both are visual product proof)

Paystack account verification → Paystack deposit page activation
(Page is built but the "Pay Now" link remains disabled until Paystack account is approved)
```

---

## MVP Priority Order

Based on the core value proposition ("TikTok visitor lands, sees bead work, orders on WhatsApp in 60 seconds"):

**Phase 1 — Must ship:**
1. Mobile-first visual gallery with category navigation
2. WhatsApp CTA throughout (pre-filled message, prominent placement)
3. Brand story / About section with maker photo
4. How to Order page with delivery coverage

**Phase 2 — Ship before sharing widely:**
5. Customer photo testimonials (seed with 5+ real examples)
6. Custom order guided inquiry flow (structured WhatsApp pre-fill)
7. Behind-the-scenes / process section
8. Paystack deposit page (built, inactive)

**Defer:**
- Paystack activation: blocked on account verification, not on development
- "Worn by real people" gallery: requires collecting permissions from customers
- Piece naming/captions: content work, can be added to gallery incrementally

---

## Sources

- Nigerian WhatsApp commerce patterns: [Techpoint Africa — WhatsApp preferred by Nigerian SMBs](https://techpoint.africa/insight/whatsapp-not-instagram-is-the-preferable-platform-for-small-businesses-in-nigeria/); [LuliChat conversational commerce](https://lulichat.com/blog/the-new-era-of-conversational-commerce-in-nigeria-and-how-businesses-can-win/)
- Nigerian trust signals: [Sizzle.ng — Social proofs that convert Nigerian buyers](https://sizzle.ng/social-proofs-convert-buyers-nigeria/)
- TikTok landing page conversion: [AdsMCP TikTok landing page guide](https://adsmcp.com/blog/tiktok-landing-page-conversion-optimization/)
- Jewelry site UX best practices: [Mindshare Consulting jewelry website design](https://www.mindshare.consulting/blog/jewelry-website-design/); [Colorlib jewelry examples 2026](https://colorlib.com/wp/jewelry-website-design/)
- Artisan brand story impact: [Amptive — jewelry brand story](https://www.amptive.com/industry-insights/how-to-create-a-jewelry-brand-story-that-resonates-with-customers); [Tashvi AI brand storytelling](https://tashvi.ai/blog/how-to-write-compelling-jewelry-brand-story)
- WhatsApp pre-filled ordering UX: [Interakt — WhatsApp ordering](https://www.interakt.shop/resource-center/how-to-help-your-customers-place-orders-on-whatsapp/)
- Paystack integration: [Paystack developer docs](https://paystack.com/developers)
- Overengineering risks: [Boldist — over-engineered websites](https://boldist.co/web-design/overengineering-vs-simplified-website-design/)
- Nigerian jewelry brands research: [Spottr unique Nigerian jewelry brands](https://blog.spottr.app/2025/01/10/unique-jewelry-brands-in-nigeria-for-custom-pieces/); [Bellafricana Nigerian jewellery](https://bellafricana.com/made-nigeria-jewellery-brands-know/)
