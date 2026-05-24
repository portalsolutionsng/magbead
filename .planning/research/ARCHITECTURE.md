# Architecture Research — Magbead

**Domain:** Artisan jewelry portfolio + WhatsApp-first shop
**Researched:** 2026-05-24
**Overall confidence:** HIGH (standard Next.js patterns, well-documented Paystack + WhatsApp flows)

---

## Page Structure

The site needs exactly six routes. Keep it flat — every extra route is friction between a TikTok visitor and placing an order.

| Route | Type | Purpose |
|-------|------|---------|
| `/` | SSG | Hero + featured gallery grid + primary WhatsApp CTA |
| `/gallery` | SSG | Full filterable product gallery, all categories |
| `/gallery/[slug]` | SSG | Single product detail: large photo, description, Order on WhatsApp button |
| `/about` | SSG | Brand story, Port Harcourt roots, quality positioning |
| `/order` | SSG | How-to-order steps, delivery info (nationwide Nigeria), trust badges |
| `/pay` | SSR-capable | Paystack deposit page — static shell now, activates when account verifies |

**Why this structure:**
- `/gallery/[slug]` enables per-product WhatsApp pre-fill ("Hi, I want to order [Product Name]") and deep-linkable product sharing — critical for TikTok bio links.
- `/pay` must NOT be `output: export` (static-only), because Paystack's `initialize` endpoint requires a server-side secret key call. The page can be hidden behind a banner until account activates, but the route must exist so no rebuild is needed on activation day.
- Everything except `/pay` can be SSG — pre-rendered at build time, served as CDN-cached HTML by Vercel.

**Route that does NOT exist yet:** `/cart`, `/checkout`, `/account` — intentionally omitted per project scope.

---

## Component Architecture

### Layout Shell

```
<RootLayout>            — font, metadata, global styles
  <TopNav />            — logo left, nav links right, WhatsApp button in nav
  {children}
  <FloatingWhatsApp />  — sticky bottom-right WhatsApp button (mobile-critical)
  <Footer />            — brand name, social links, contact
</RootLayout>
```

### Shared Components

| Component | Props | Used On |
|-----------|-------|---------|
| `WhatsAppButton` | `message?: string`, `label?: string`, `variant: 'cta' | 'floating' | 'nav'` | Every page |
| `ProductCard` | `product: Product`, `priority?: boolean` | Home, Gallery |
| `GalleryGrid` | `products: Product[]`, `activeFilter?: string` | Gallery |
| `CategoryFilter` | `categories: string[]`, `active: string`, `onChange` | Gallery |
| `HeroSection` | `headline`, `subline`, `ctaText`, `image` | Home |
| `SectionHeading` | `title`, `subtitle?` | All pages |
| `TrustBadges` | static | Order page |
| `PaystackForm` | `amount`, `email`, `orderId` | `/pay` only |

### Data Types

```typescript
// products.ts — the single source of truth
interface Product {
  slug: string;
  name: string;
  category: "jewelry" | "accessories" | "custom";
  gender: "womens" | "mens" | "unisex";
  price?: number;           // optional — custom pieces are quote-based
  priceLabel: string;       // "₦15,000" or "Quote on request"
  images: string[];         // relative paths or Cloudinary URLs
  description: string;
  featured: boolean;        // shows on home page hero grid
  tags: string[];           // e.g. ["anklet", "waist beads", "bracelet"]
}
```

### WhatsApp Button — Single Abstraction

All WhatsApp touchpoints use one component so the phone number is never duplicated:

```typescript
// The wa.me URL format
const WHATSAPP_NUMBER = "WUS4HFGE7PKB01"; // from PROJECT.md
const buildWaUrl = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

// Per-product message
const productOrderMessage = (product: Product) =>
  `Hi Magbead! I'd like to order: ${product.name}. Please share details and pricing.`;
```

---

## Data Layer

**Recommendation: Local JSON/TypeScript files read at build time. No CMS.**

Rationale: The client has no technical team. A CMS (Contentful, Sanity, Strapi) adds an external dependency, a free tier limit, a login to manage, and a build webhook to configure. None of that is needed for ~20-50 products that change infrequently. JSON files committed to the repo is the right abstraction at this stage.

### File Layout

```
/data/
  products.ts        — typed product array, the whole catalog
  categories.ts      — ["jewelry", "accessories", "custom"]
  site.ts            — site-wide config: WhatsApp number, tagline, brand copy
```

### How Pages Consume Data

```typescript
// app/gallery/page.tsx — SSG, reads at build time
import { products } from "@/data/products";

export default function GalleryPage() {
  return <GalleryGrid products={products} />;
}

// app/gallery/[slug]/page.tsx — generates one static page per product
export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}
```

No `getStaticProps`, no API calls at build time, no external dependencies — just TypeScript imports. Build is fully deterministic.

### When to Migrate Away from This

If the product count exceeds ~200, or if someone non-technical needs to update the catalog without touching code, migrate to Contentful or Sanity at that point. The TypeScript types defined now become the content model spec — migration is a one-time export, not a rewrite.

---

## Image Pipeline

### The Constraint

Phone photos from TikTok will be 3–8 MB JPEGs, potentially portrait-orientation, inconsistent color. They need to become fast-loading, correctly-cropped WebP images that look great on a 390px mobile screen.

### Recommended Approach: Deploy to Vercel (NOT static export) + next/image

**Do not use `output: 'export'`** in `next.config.js`. The reason is critical:

- Static export disables `next/image` optimization (it requires a server).
- Static export disables API routes (needed for Paystack).
- Vercel's free Hobby tier includes image optimization: **5,000 transformations/month** and **300,000 cache reads/month** (as of March 2025).
- A portfolio site with ~50 products and typical TikTok-sourced traffic will stay well within 5K transforms/month — images are transformed once, then cached.

So: deploy as a standard Next.js app on Vercel (not static export). You get server-side image optimization for free, and API routes for Paystack.

### next/image Usage

```tsx
// ProductCard.tsx
import Image from "next/image";

<Image
  src={product.images[0]}
  alt={product.name}
  width={600}
  height={600}
  className="object-cover w-full aspect-square"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  priority={props.priority}  // true for above-fold images only
/>
```

Key rules:
- Always set `sizes` — prevents the browser downloading a 1200px image for a 400px card.
- Set `priority` only on the first visible image (hero, first gallery row). All others lazy-load.
- Use `aspect-square` CSS — forces consistent card dimensions regardless of phone photo orientation.
- Convert originals to WebP at upload time (use Squoosh, Sharp CLI, or Cloudinary upload) to stay under transform limits.

### Cloudinary: Use If Volume Grows

Cloudinary's free tier (25 credits/month, ~25,000 transformations) can supplement if Vercel limits become a concern. The `next-cloudinary` package provides a drop-in `CldImage` component replacing `next/image`. Migration is a component-level swap, not a data-layer change — safe to defer.

For initial launch: just put optimized images in `/public/images/products/` and point product data at `/images/products/my-product.jpg`. No external service needed.

### Pre-Processing Phone Photos Before Upload

Before committing images, run them through a local script:

```bash
# Install sharp CLI globally
npm install -g sharp-cli

# Resize and convert all product photos to WebP, max 1200px wide
for f in raw-photos/*.jpg; do
  sharp "$f" --resize 1200 --webp -o "public/images/products/$(basename ${f%.jpg}).webp"
done
```

This means Vercel never has to transform a 6 MB original — it serves and caches a pre-optimized 150 KB WebP. Transformation count drops to near zero.

---

## Paystack Integration Point

### Architecture Overview

Paystack requires a secret key for server-side calls. This means the `/pay` route cannot be a static page — it needs a Next.js API Route (or Server Action) that never exposes the secret key to the browser.

```
Browser              Next.js Server           Paystack API
  |                       |                        |
  | POST /api/pay/init    |                        |
  | { amount, email }     |                        |
  |---------------------->|                        |
  |                       | POST /transaction/init  |
  |                       | Authorization: Bearer SK_xxx
  |                       |----------------------->|
  |                       |   { authorization_url, reference }
  |                       |<-----------------------|
  | { authorization_url } |                        |
  |<----------------------|                        |
  | redirect to Paystack  |                        |
  |                                                |
  | [user pays on Paystack hosted page]            |
  |                                                |
  | GET /pay/callback?reference=xxx                |
  |---------------------->|                        |
  |                       | GET /transaction/verify |
  |                       |----------------------->|
  |                       |   { status: "success" } |
  |                       |<-----------------------|
  | Success page          |                        |
  |<----------------------|                        |
```

### Files to Create

```
/app/
  pay/
    page.tsx              — Client form: collect email + order description
    callback/
      page.tsx            — Verify result, show success/failure
/app/api/
  pay/
    initialize/
      route.ts            — POST: calls Paystack initialize, returns redirect URL
    verify/
      route.ts            — GET: calls Paystack verify, returns status
```

### Environment Variables

```bash
# .env.local (never committed)
PAYSTACK_SECRET_KEY=sk_live_xxx   # server-only
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_xxx  # safe to expose to browser
```

### How to "Activate" Without Rebuilding

The `/pay` page exists from day one. While Paystack account is unverified, show a banner:

```tsx
// app/pay/page.tsx
const PAYSTACK_ACTIVE = process.env.NEXT_PUBLIC_PAYSTACK_ACTIVE === "true";

if (!PAYSTACK_ACTIVE) {
  return <ComingSoonBanner message="Payment by card coming soon. Order via WhatsApp for now." />;
}
// otherwise render the form
```

To activate: set `NEXT_PUBLIC_PAYSTACK_ACTIVE=true` in Vercel environment variables and trigger a redeploy (one click in Vercel dashboard). No code change required.

### Amount in Kobo

Paystack API requires amounts in the smallest denomination (kobo for NGN). Always multiply by 100:

```typescript
const amountInKobo = Math.round(amountInNaira * 100);
```

---

## Recommended Build Order

Build for the critical path first: a TikTok visitor landing on the site and placing a WhatsApp order. Everything else is secondary.

### Phase 1: Foundation (Deploy something live on day 1)

1. **Project scaffolding** — `npx create-next-app@latest magbead --typescript --tailwind --app`
2. **Global layout** — `RootLayout`, `TopNav`, `Footer`, fonts (choose a bold display font for headings), color theme (vibrant, African-inspired palette in Tailwind config)
3. **`/` Home page** — Hero section with one strong image, headline, and a WhatsApp CTA button. No gallery yet — just enough to not be empty.
4. **Deploy to Vercel** — connect GitHub repo, one-click deploy. Site is live.

Rationale: Getting a live URL early means the brand can share it, TikTok bio can be updated, and real-device testing begins. The rest is iteration.

### Phase 2: Gallery Core (The main value)

5. **Product data file** — `/data/products.ts` with the first 10-15 products entered
6. **Image pre-processing** — run phone photos through sharp, commit WebP files to `/public/images/products/`
7. **`ProductCard` component** — image, name, price label, Order on WhatsApp button
8. **`/gallery` page** — grid of `ProductCard`s
9. **`/gallery/[slug]` page** — full product detail with large image, description, per-product WhatsApp message

This phase delivers the primary user journey end-to-end.

### Phase 3: Supporting Pages

10. **`/about` page** — brand story copy, portrait image
11. **`/order` page** — ordering steps, delivery info, trust badges
12. **`CategoryFilter` on gallery** — client component filter by category/gender; since all data is in the page already (SSG), filtering is pure client-side state — no API needed

### Phase 4: Paystack (Activate when account verifies)

13. **`/pay` page shell** — form UI, `ComingSoonBanner` while `PAYSTACK_ACTIVE=false`
14. **`/api/pay/initialize` route** — server-side Paystack call
15. **`/api/pay/verify` route** — server-side verification
16. **`/pay/callback` page** — success/failure display
17. **Activation** — flip `NEXT_PUBLIC_PAYSTACK_ACTIVE=true` in Vercel env vars

### Phase 5: Polish

18. **SEO** — `metadata` exports, Open Graph images per product (for TikTok link previews)
19. **Performance audit** — Lighthouse, check LCP on mobile, ensure hero image has `priority`
20. **Floating WhatsApp button** — sticky, always visible on mobile
21. **Analytics** — Vercel Analytics (free, one line of code)

---

## Key Architectural Decisions

| Decision | Rationale |
|----------|-----------|
| Standard Next.js on Vercel, NOT `output: export` | Required for API routes (Paystack) and `next/image` optimization; Vercel Hobby tier includes both for free |
| JSON/TypeScript data, no CMS | Zero external dependencies, no rate limits, no CMS login for a single-brand catalog that changes infrequently |
| Images in `/public`, pre-processed locally | Keeps under Vercel's 5K/month image transform limit; no Cloudinary account needed to launch |
| Single `WhatsAppButton` component | Phone number defined once; consistent pre-filled messages; easy to update if number changes |
| `PAYSTACK_ACTIVE` env flag | Enables building the full payment flow now while keeping it hidden; activation is a Vercel env var change, not a code deploy |
| SSG for all pages except `/pay` | Maximum performance, CDN-cached HTML, works even if Vercel has a cold start issue |

---

## Sources

- Next.js static export constraints: https://nextjs.org/docs/app/guides/static-exports
- Vercel image optimization free tier limits (March 2025): https://vercel.com/changelog/increased-hobby-usage-limits-for-image-optimization
- Paystack React integration guide: https://paystack.com/docs/guides/accept_payments_on_your_react_app/
- Paystack Next.js architecture: https://medium.com/@rufusmfmwellens/mastering-paystack-a-developers-guide-to-secure-scalable-payments-in-next-js-63fd327a5cd3
- next-cloudinary: https://next.cloudinary.dev/
- next/image component docs: https://nextjs.org/docs/app/api-reference/components/image
- WhatsApp floating button pattern: https://github.com/CarlosUlisesOchoa/react-whatsapp-floating-button
