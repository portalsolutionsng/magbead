# Stack Research — Magbead

**Project:** Magbead bead jewelry portfolio + shop (Nigeria/Africa market)
**Researched:** 2026-05-24
**Overall confidence:** HIGH (all major choices verified against current official sources)

---

## Critical Hosting Note (Read First)

**Vercel Hobby plan is explicitly non-commercial.** Vercel's own terms define commercial use as "any Deployment used for financial gain of anyone involved, including... methods of requesting or processing payment from visitors." A Paystack payment page disqualifies this site from the free Hobby tier. GitHub Pages carries the same prohibition for e-commerce.

**Netlify Free plan explicitly permits commercial use.** Netlify's documentation states: "You can deploy commercial projects, personal sites, or other creative explorations." The free plan has 300 build credits/month with hard limits (no surprise bills). This is the correct free host for Magbead.

The recommended stack is built around Netlify, not Vercel.

---

## Recommended Stack

| Technology | Version | Purpose | Confidence | Why |
|------------|---------|---------|-----------|-----|
| Next.js | 16.2.x (latest) | Framework | HIGH | Full-stack React with API routes for Paystack server-side; React ecosystem; Netlify adapter exists |
| React | 19.x | UI runtime | HIGH | Ships with Next.js 16; React Compiler now stable |
| TypeScript | 5.x | Type safety | HIGH | Default in Next.js scaffolding; catches Paystack key/type errors early |
| Tailwind CSS | 4.3.x | Styling | HIGH | CSS-first config, 100x faster incremental builds, native CSS variables map well to vibrant custom palettes |
| Motion (ex Framer Motion) | 12.x | Animations | HIGH | Renamed from framer-motion in mid-2025; hardware-accelerated, 120fps scroll; import from `motion/react` |
| next/image | (bundled) | Image optimization | HIGH | Auto-converts phone JPEGs to WebP/AVIF; lazy load; 70-80% bandwidth reduction on mobile |
| @paystack/inline-js | latest | Payment popup | HIGH | Official Paystack V2 inline library; popup stays on-page; server-side transaction init required |
| Netlify | Free plan | Hosting | HIGH | Commercial use allowed; 100GB bandwidth; 300 build credits/month; Next.js support via adapter |
| Netlify Edge Functions | (bundled) | Paystack API route | HIGH | Runs server-side code for Paystack secret key; replaces need for separate backend |

---

## Key Choices

### 1. Next.js over Astro

Astro 5 is genuinely faster (40% better FCP, 90% less JS) for pure static sites and would be the better choice if this were only a portfolio. The decisive factor is Paystack.

Paystack's own security model requires transaction initialization from a server — the secret key must never touch the client. Astro supports server endpoints only when deployed with an SSR adapter, which removes Astro's static-site performance advantage and complicates Netlify deployment. Next.js with API routes (or Netlify Edge Functions) is the native pattern for this. Staying on Next.js means adding Paystack later requires zero structural change: create `app/api/paystack/route.ts`, add the secret key as an env var, done.

If Paystack were never planned, Astro would win. Given the roadmap, Next.js is correct.

### 2. Netlify over Vercel

Vercel Hobby is non-commercial by explicit policy — payment processing on the site violates terms of service. Netlify Free explicitly allows commercial deployments. Both offer comparable CDN performance globally. Netlify's credit system (September 2025) means a static Next.js site with infrequent deploys costs roughly 15 credits/deploy and ~1 credit/GB bandwidth — well within the 300 free credits/month for a site at this scale. No surprise overage charges (hard limit).

The Netlify Next.js adapter (`@netlify/plugin-nextjs`) handles App Router, Server Components, and Edge Functions automatically.

### 3. Tailwind CSS v4 over v3 or other CSS frameworks

Tailwind v4 (released January 2025, currently 4.3.x) shifts to CSS-first configuration — you define brand colors and design tokens directly in `@theme` blocks in CSS, not a JavaScript config file. This is ideal for a vibrant brand: define `--color-gold`, `--color-coral`, `--color-deep-teal` once in CSS, generate utility classes automatically. Incremental builds are 100x faster than v3. No `tailwind.config.js` to maintain.

Do not use Bootstrap or MUI — they impose design constraints that fight against a bold/vibrant custom aesthetic. Tailwind makes the aesthetic easy; Bootstrap makes it a fight.

### 4. Motion v12 for animations

The `framer-motion` npm package is deprecated (no new development). The successor is the `motion` package with imports from `motion/react`. V12 uses the Web Animations API and ScrollTimeline for hardware-accelerated 120fps animations — critical for silky scroll effects and product card reveals on mid-range Android phones common in Nigeria. Use `<motion.div>` for entrance animations on gallery cards and the hero. Keep animations optional (respect `prefers-reduced-motion`) for accessibility.

### 5. next/image for all product photos

Phone photos from TikTok content are typically 3-8MB JPEGs. `next/image` converts them to WebP/AVIF (70-80% smaller), generates responsive `srcset`, lazy-loads off-screen images, and adds blur placeholders. On Nigerian 4G (average 14-33Mbps download in 2025), this difference is a 3-4 second load vs under 1 second per image. This is non-negotiable.

**Caveat:** Netlify's image optimization (via the Next.js adapter) does not have the same 5K-transform hard limit that Vercel imposes. Netlify counts image optimization as bandwidth credits, which is more forgiving for a gallery-heavy site.

### 6. Paystack via @paystack/inline-js V2

Use the official `@paystack/inline-js` package (Paystack's own V2 inline library). The integration pattern:
1. User clicks "Pay Deposit" button
2. Next.js API route (server-side) calls Paystack Initialize Transaction API using the secret key — returns an `access_code`
3. Client receives `access_code`, calls `PaystackPop.resumeTransaction(access_code)` to open the inline popup
4. Popup stays on-page; user completes payment without redirect

The `react-paystack` community package (v6.0.0, last published 2 years ago, unmaintained) handles client-side only and requires the public key client-side. It's fine for public-key-only flows but the official inline-js V2 with a server-side init is more secure and more current.

### 7. WhatsApp wa.me links

Standard pattern — no library needed:
```
https://wa.me/234XXXXXXXXXX?text=Hi%20Magbead%2C%20I%27m%20interested%20in%20ordering...
```
Phone number: country code (234 for Nigeria) + number, no `+`, no spaces. Message URL-encoded. The project already has the specific wa.me link: `wa.me/message/WUS4HFGE7PKB01` (business deep link format — use this exactly, it already resolves to the correct WhatsApp Business account).

Pre-fill the message per product: "Hi Magbead, I'd like to order [product name]" — makes it trivial for the customer to send.

---

## What NOT to Use

| Technology | Why Not |
|-----------|---------|
| **Vercel (free)** | Non-commercial restriction explicitly covers payment processing. Violates ToS for Magbead. |
| **GitHub Pages** | Same non-commercial restriction for e-commerce. Also no server-side code — Paystack secret key has nowhere to live. |
| **Astro** | Excellent static performance, but SSR adapter removes that advantage when Paystack server routes are needed. Next.js is the better full-stack choice given the roadmap. |
| **Bootstrap / MUI / Chakra UI** | Opinionated visual defaults fight against a bold custom African aesthetic. Require significant override work. Tailwind CSS is blank-slate by design. |
| **react-paystack (community)** | Last published 2+ years ago, unmaintained. Use official `@paystack/inline-js` instead. |
| **framer-motion** | Deprecated npm package. Replaced by `motion` (`motion/react`). Do not install `framer-motion`. |
| **Cloudinary** | Adds complexity and another free-tier account to manage. `next/image` with Netlify handles phone photos sufficiently for this scale. Add Cloudinary only if gallery grows to 200+ images and on-the-fly transforms are needed. |
| **Full cart / inventory system** | Out of scope per PROJECT.md. WhatsApp handles order flow for now. Do not reach for Shopify, WooCommerce, or Medusa. |
| **Redux / Zustand** | No complex state needed. A shop with WhatsApp ordering and a single Paystack payment page needs no global state manager. React's built-in `useState`/`useContext` is sufficient. |
| **React Query / SWR** | No data fetching beyond the Paystack API route. Overkill for this site. |

---

## Installation Reference

```bash
# Scaffold
npx create-next-app@latest magbead --typescript --tailwind --eslint --app

# Upgrade to Tailwind v4 (create-next-app may scaffold v3)
npm install tailwindcss@latest @tailwindcss/postcss@latest

# Animation
npm install motion

# Paystack official inline library
npm install @paystack/inline-js

# Netlify Next.js adapter (add after scaffolding)
npm install @netlify/plugin-nextjs
```

For Netlify deployment, add `netlify.toml`:
```toml
[[plugins]]
package = "@netlify/plugin-nextjs"
```

---

## Version Verification

| Package | Verified Version | Source | Method |
|---------|-----------------|--------|--------|
| Next.js | 16.2.6 | npm registry (published ~8 hours prior to research) | WebSearch → npm registry |
| Tailwind CSS | 4.3.x (4.3.0 current) | npm registry, official Tailwind blog | WebSearch → tailwindcss.com/blog |
| Motion | 12.40.0 | npm registry, GitHub motiondivision/motion | WebSearch → npm |
| Astro | 5.18.0 | npm registry, astro.build blog | WebSearch → astro.build |
| react-paystack | 6.0.0 — last published 2yr ago | npm registry | WebSearch → npm |
| @paystack/inline-js | latest (V2) | paystack.com/docs | WebSearch → Paystack docs |
| Netlify | Free plan active | netlify.com/pricing | WebSearch → Netlify support forums + pricing page |

All versions current as of 2026-05-24. Next.js 16.x is the current stable major (16 released October 2025, 16.2 released March 2026).

---

## Sources

- Vercel Hobby commercial use restriction: https://vercel.com/docs/plans/hobby
- Netlify commercial use allowed: https://answers.netlify.com/t/can-we-use-netlify-free-plan-for-commercial-purposes/41545
- Netlify credit pricing (Sep 2025): https://www.netlify.com/blog/new-pricing-credits/
- Next.js 16 release: https://nextjs.org/blog/next-16
- Tailwind CSS v4 release: https://tailwindcss.com/blog/tailwindcss-v4
- Motion v12 (ex Framer Motion): https://motion.dev/docs/react
- Paystack Inline V2: https://paystack.com/docs/developer-tools/inlinejs/
- Paystack React guide: https://paystack.com/docs/guides/accept_payments_on_your_react_app/
- Astro vs Next.js comparison: https://makersden.io/blog/nextjs-vs-astro-in-2025-which-framework-best-for-your-marketing-website
- Nigeria mobile internet speeds 2025: https://techcabal.com/2026/01/06/nigerias-average-4g-speeds-hit-33mbps/
- Vercel image optimization limits: https://vercel.com/docs/image-optimization/limits-and-pricing
- next/image optimization guide: https://www.debugbear.com/blog/nextjs-image-optimization
