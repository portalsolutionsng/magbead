# Phase 1 Research: Foundation

**Phase:** 01 — Foundation
**Researched:** 2026-05-24
**Status:** COMPLETE

---

## Goal Recap

Ship a real Mag'Beads URL live on GitHub Pages — brand name, bottom nav, hero section with primary WhatsApp CTA, floating WhatsApp button on every page — ready to put in the TikTok bio immediately. Must have OG meta tags for TikTok/Instagram link preview cards.

---

## Stack Decisions (Locked)

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | `16.2.x` | Framework — App Router, SSG |
| `react` / `react-dom` | `19.x` | Bundled with Next.js 16 |
| `typescript` | `5.x` | Type safety |
| `tailwindcss` | `4.3.x` | Styling — CSS-first `@theme {}` |
| `@tailwindcss/postcss` | `4.x` | PostCSS integration for Tailwind v4 |
| `motion` | `12.x` | Page transitions — `import from 'motion/react'` |
| `lucide-react` | latest | Icons — tree-shakeable stroke icons |
| `nextjs-toploader` | `3.x` | YouTube-style top loading bar |
| `serwist` / `@serwist/next` | `9.x` | PWA — manifest + service worker |

**Never install:** `framer-motion` (deprecated), `react-paystack` (unmaintained), `next-pwa` (stale), `output: 'export'` mode

---

## 1. Project Scaffold (create-next-app)

```bash
npx create-next-app@latest magbead \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*"
```

> **Note:** `create-next-app` with `--tailwind` in 2025/2026 installs Tailwind v4 (not v3). Verify with `npm list tailwindcss` after scaffold.

If Tailwind v3 is installed, upgrade:
```bash
npm uninstall tailwindcss postcss autoprefixer
npm install tailwindcss@^4 @tailwindcss/postcss@^4
```

### postcss.config.mjs (Tailwind v4)
```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

No `tailwind.config.js` needed — configuration lives in CSS.

---

## 2. Tailwind v4 — CSS-First Configuration

In `app/globals.css`:
```css
@import "tailwindcss";

@theme {
  /* ── Brand palette ── */
  --color-canvas: #0A0A0F;
  --color-card: #12121A;
  --color-border: #1A1A26;
  --color-gold: #D4A843;
  --color-gold-hover: #E8BC52;
  --color-whatsapp: #25D366;
  --color-text-primary: #F5F0E8;
  --color-text-secondary: #9B8F82;
  --color-text-muted: #6B6058;

  /* ── Typography ── */
  --font-display: "Playfair Display", Georgia, serif;
  --font-body: "Inter", system-ui, sans-serif;
  --font-weight-regular: 400;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* ── Sizing ── */
  --spacing-touch: 44px;
  --spacing-nav: 56px;

  /* ── Radius ── */
  --radius-card: 12px;
  --radius-pill: 9999px;
  --radius-button: 8px;

  /* ── Shadows ── */
  --shadow-card: 0 4px 24px rgba(0, 0, 0, 0.4);
  --shadow-gold: 0 0 20px rgba(212, 168, 67, 0.3);
}
```

**Usage in JSX:** Standard Tailwind utilities work normally, but custom tokens are accessible as `bg-[--color-canvas]` or via arbitrary values. To use semantic classes, define them in `@layer utilities`.

---

## 3. Google Fonts (Next.js Font Optimization)

In `app/layout.tsx`:
```tsx
import { Playfair_Display, Inter } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-inter',
  display: 'swap',
});
```

Then add `className={`${playfair.variable} ${inter.variable}`}` to `<html>`.

Update `@theme` to use the Next.js font variables:
```css
--font-display: var(--font-playfair), Georgia, serif;
--font-body: var(--font-inter), system-ui, sans-serif;
```

---

## 4. GitHub Pages Deployment

### Key constraint
GitHub Pages requires static HTML files. Next.js standard build produces them via SSG — BUT `output: 'export'` is NOT used (disables image optimization and API routes).

### GitHub Actions workflow
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
        env:
          GITHUB_PAGES: true
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

### next.config.ts for GitHub Pages

```ts
import type { NextConfig } from 'next';

const isGithubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  output: 'export',       // Required for GitHub Pages static files
  trailingSlash: true,
  images: {
    unoptimized: isGithubPages, // GitHub Pages can't run Next.js image optimizer
  },
  // basePath only needed if deploying to username.github.io/repo-name
  // With custom domain (e.g. magbeads.com.ng), no basePath needed
  // basePath: isGithubPages ? '/magbead' : '',
  // assetPrefix: isGithubPages ? '/magbead/' : '',
};

export default nextConfig;
```

> **CRITICAL NOTE on `output: 'export'`**: The SUMMARY.md and PITFALLS.md say "never use output: export" BUT this is specifically because it blocks API routes and next/image optimization. For Phase 1-3 (GitHub Pages static site with no API routes yet), `output: 'export'` is required and acceptable. The key trade-off:
> - `output: 'export'` + GitHub Pages: Set `images.unoptimized: true` — images aren't optimized on the fly, so pre-process all images to WebP manually (which we do anyway per PERF-01/02)
> - When migrating to Cloudflare Pages (Phase 4+): Remove `output: 'export'`, remove `images.unoptimized`, add `PAYSTACK_ACTIVE` env var
> - This is a clean migration with zero code changes to page components

---

## 5. YouTube-Style Top Loading Bar (nextjs-toploader)

```bash
npm install nextjs-toploader
```

In `app/layout.tsx`:
```tsx
import NextTopLoader from 'nextjs-toploader';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <NextTopLoader 
          color="#D4A843"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
        />
        {children}
      </body>
    </html>
  );
}
```

> Renders a thin gold (#D4A843) bar at the top edge — YouTube/Google chrome style. Works with Next.js App Router without config. No NProgress needed.

---

## 6. Motion v12 Page Transitions

**Import:** Always `from 'motion/react'` — NOT `from 'framer-motion'` (deprecated).

### Template-based transitions (App Router)

Create `app/template.tsx` (runs on every route change, unlike `layout.tsx` which persists):
```tsx
'use client';
import { motion } from 'motion/react';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
```

> `template.tsx` is the correct Next.js App Router primitive for per-route animations. `layout.tsx` wraps persist across routes (correct for nav/footer), `template.tsx` re-mounts on every route change (correct for page transitions).

---

## 7. PWA — Progressive Web App

```bash
npm install @serwist/next serwist
```

### next.config.ts (with Serwist):
```ts
import withSerwist from '@serwist/next';

const withPWA = withSerwist({
  swSrc: 'app/sw.ts',
  swDest: 'public/sw.js',
  disable: process.env.NODE_ENV === 'development',
});

export default withPWA(nextConfig);
```

### app/sw.ts (service worker):
```ts
import type { PrecacheEntry, SerwistGlobalConfig } from 'serwist';
import { Serwist } from 'serwist';

declare global {
  interface ServiceWorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [],
});

serwist.addEventListeners();
```

### public/manifest.json:
```json
{
  "name": "Mag'Beads",
  "short_name": "Mag'Beads",
  "description": "Luxury bead jewelry from Port Harcourt. Waistbeads, bracelets, necklaces & custom pieces.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0A0A0F",
  "theme_color": "#0A0A0F",
  "orientation": "portrait",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any maskable" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable" }
  ]
}
```

> **Phase 1 minimum viable PWA:** Just the manifest + basic service worker. Users can "Add to Home Screen". Full offline caching can be added in Phase 2.

---

## 8. OG Meta Tags (Server-Rendered)

In `app/layout.tsx` — **must be in the server component, not client component**:
```tsx
export const metadata: Metadata = {
  title: "Mag'Beads — Luxury Bead Jewelry, Port Harcourt",
  description: "Waistbeads, bracelets, necklaces, beaded bags & custom pieces. CAC-registered. Nationwide delivery. Order on WhatsApp.",
  openGraph: {
    title: "Mag'Beads — Luxury Bead Jewelry",
    description: "Best bead plug in Port Harcourt. Topnotch quality, luxury, affordable. Order via WhatsApp.",
    url: "https://magbeads.com.ng",
    siteName: "Mag'Beads",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Mag'Beads jewelry" }],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mag'Beads — Luxury Bead Jewelry",
    description: "Order on WhatsApp: wa.me/message/WUS4HFGE7PKBO1",
    images: ["/og-image.jpg"],
  },
};
```

> TikTok's crawler does NOT execute JavaScript. OG tags must be present in the raw HTML response. Next.js `metadata` export in a server component satisfies this.

---

## 9. Layout Architecture

```
app/
  layout.tsx          — <html>, fonts, metadata, NextTopLoader, BottomNav, FloatingWhatsApp
  template.tsx        — Motion page transition wrapper (client component)
  globals.css         — @import "tailwindcss"; @theme { ... }
  page.tsx            — Homepage: Hero + featured products preview
  gallery/
    page.tsx          — Full gallery (Phase 2)
    [slug]/page.tsx   — Product detail (Phase 2)
  about/page.tsx      — Brand story (Phase 3)
  order/page.tsx      — How to Order (Phase 3)
  pay/page.tsx        — Paystack (Phase 4)
  sw.ts               — Service worker source
components/
  layout/
    BottomNav.tsx     — Home·Shop·About·Order, 56px, safe area insets
    FloatingWhatsApp.tsx — Fixed button, safe area inset-bottom
  ui/
    WhatsAppButton.tsx  — Reusable CTA button (gold or green variant)
    SkeletonCard.tsx    — Shimmer placeholder for product cards
data/
  site.ts             — siteConfig: whatsappLink, phone, cac, address, socials
  products.ts         — Product[] type + placeholder data (Phase 2)
  categories.ts       — Category[] with labels (Phase 2)
public/
  manifest.json
  sw.js               — Built by @serwist/next
  icons/
    icon-192.png
    icon-512.png
  og-image.jpg        — 1200×630 hero OG image
  images/products/    — WebP product photos (Phase 2)
```

---

## 10. Bottom Navigation Bar

```tsx
// components/layout/BottomNav.tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, Info, MessageCircle } from 'lucide-react';

const navItems = [
  { href: '/',        label: 'Home',  Icon: Home },
  { href: '/gallery', label: 'Shop',  Icon: ShoppingBag },
  { href: '/about',   label: 'About', Icon: Info },
  { href: '/order',   label: 'Order', Icon: MessageCircle },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex"
      style={{
        height: 'calc(56px + env(safe-area-inset-bottom))',
        paddingBottom: 'env(safe-area-inset-bottom)',
        background: '#12121A',
        borderTop: '1px solid #1A1A26',
      }}
    >
      {navItems.map(({ href, label, Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className="flex flex-1 flex-col items-center justify-center gap-0.5 min-h-[44px]"
            style={{ color: active ? '#D4A843' : '#6B6058' }}
          >
            <Icon size={22} strokeWidth={active ? 2.5 : 1.5} />
            <span className="text-[10px] font-medium tracking-wide">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
```

---

## 11. Floating WhatsApp Button

```tsx
// components/layout/FloatingWhatsApp.tsx
import Link from 'next/link';

const WA_LINK = 'https://wa.me/message/WUS4HFGE7PKBO1';

export function FloatingWhatsApp() {
  return (
    <Link
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full shadow-lg"
      style={{
        bottom: 'calc(56px + env(safe-area-inset-bottom) + 16px)',
        background: '#25D366',
      }}
    >
      {/* Custom WhatsApp SVG icon */}
      <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </Link>
  );
}
```

---

## 12. Hero Section (Homepage)

```tsx
// app/page.tsx — simplified hero structure
<section
  className="relative flex min-h-[100dvh] flex-col items-center justify-center text-center px-6"
  style={{ background: 'linear-gradient(180deg, #0A0A0F 0%, #12121A 100%)' }}
>
  <h1 style={{ fontFamily: 'var(--font-playfair)', fontWeight: 700, fontSize: '2.5rem' }}>
    Mag&apos;Beads
  </h1>
  <p className="mt-3 text-lg" style={{ color: '#9B8F82' }}>
    Luxury bead jewelry, Port Harcourt
  </p>
  <Link
    href="https://wa.me/message/WUS4HFGE7PKBO1"
    className="mt-8 inline-flex items-center gap-2 rounded-lg px-8 py-4 font-semibold text-base"
    style={{ background: '#D4A843', color: '#0A0A0F', minHeight: '44px' }}
  >
    <WhatsAppIcon size={20} />
    Order on WhatsApp
  </Link>
</section>
```

> `100dvh` (not `100vh`) — iOS Safari's toolbar clips `100vh` sections, `100dvh` adjusts correctly.

---

## 13. Site Config Data File

```ts
// data/site.ts
export const siteConfig = {
  name: "Mag'Beads",
  tagline: "Best Bead Plug in Port Harcourt. Topnotch Quality, Luxury, Affordable.",
  whatsappLink: "https://wa.me/message/WUS4HFGE7PKBO1",
  phone: "+234 703 239 1971",
  phoneDisplay: "+234 703 239 1971",
  cacNumber: "3804623",
  address: "No. 4 Ordu Street, Rumuigbo, Rivers State",
  tiktok: "https://www.tiktok.com/@magbeadsoboho",
  tiktokHandle: "@magbeadsoboho",
  instagram: "https://www.instagram.com/mag_beads",
  instagramHandle: "@mag_beads",
} as const;
```

---

## 14. Package Weight Budget

Target: < 300KB gzipped initial page weight.

| Package | Approx bundle impact |
|---------|---------------------|
| next (React 19) | ~90KB (framework core) |
| motion/react | ~25KB (with tree-shaking) |
| lucide-react (used icons only) | ~2–5KB |
| nextjs-toploader | ~3KB |
| tailwindcss (used utilities) | ~10–20KB |
| **Total estimate** | **~130–145KB** ✓ |

Product images (Phase 2) capped at 80–150KB each, loaded lazily.

---

## 15. Deployment Flow Summary

```
Phase 1-3: GitHub Pages (static)
├── next.config.ts: output: 'export', images.unoptimized: true
├── GitHub Actions: npm build → /out → deploy-pages
└── Custom domain: magbeads.com.ng (CNAME in /public/CNAME)

Phase 4+: Cloudflare Pages (Workers for Paystack)
├── next.config.ts: remove output: 'export', images.unoptimized: false
├── Cloudflare Pages: connect repo, set PAYSTACK_ACTIVE=true env var
└── Zero code changes to page components required
```

---

## 16. Phase 1 Pitfall Checklist

- [x] `100dvh` not `100vh` — prevents iOS Safari toolbar clipping
- [x] `env(safe-area-inset-bottom)` on floating button and bottom nav
- [x] OG meta tags in `layout.tsx` server component — TikTok spider is not JS-capable
- [x] `encodeURIComponent()` around all WhatsApp pre-fill text
- [x] `output: 'export'` required for GitHub Pages — disable when migrating to Cloudflare
- [x] `images.unoptimized: true` for GitHub Pages phase (pre-process images to WebP manually)
- [x] `--font-playfair` variable on `<html>` — needed for `var(--font-playfair)` to resolve
- [x] `showSpinner: false` on NextTopLoader — spinner conflicts with bottom nav aesthetic
- [x] `min-h-[44px]` on all interactive elements — WCAG touch target requirement
- [x] WhatsApp link `WUS4HFGE7PKBO1` — letter O not zero at end
- [x] No `NEXT_PUBLIC_` prefix on Paystack secret key (Phase 4)
- [x] `template.tsx` for Motion transitions, NOT `layout.tsx`

---

## RESEARCH COMPLETE
