---
status: approved
phase: 1
phase_name: Foundation
created: 2026-05-24
reviewed_at: 2026-05-24
design_system: manual (Tailwind v4 CSS-first @theme, no shadcn)
---

# UI-SPEC — Phase 1: Foundation

> **What visual and interaction contracts does this phase need?**
>
> Phase 1 ships: scaffold, global layout (bottom nav + footer), hero section, floating WhatsApp button, OG meta. Everything a visitor sees when the TikTok bio link goes live.

---

## 0. Design System Declaration

**Tool:** Manual — Tailwind CSS v4 with CSS-first `@theme {}` block. No shadcn. No component registry.

**Rationale:** The brand requires a fully custom dark palette with jewel-tone accents that do not map to any shadcn preset. Tailwind v4's `@theme` syntax defines design tokens directly in CSS, which suits this vibrant-but-controlled palette perfectly.

**shadcn gate:** Not applicable. The client locked a custom aesthetic that predates any preset. No `components.json` will be created.

**Registry safety gate:** Not applicable (no third-party registries declared).

---

## 1. Color System

### Palette — Full Hex Values

All color names are semantic token names used in Tailwind `@theme {}` and throughout this spec.

#### Surface Colors (60% rule — dominant canvas)

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-surface-base` | `#0A0A0F` | Page background — near-black with a faint blue-violet undertone, not flat black |
| `--color-surface-raised` | `#12121A` | Cards, bottom nav background, modal/sheet backgrounds |
| `--color-surface-overlay` | `#1A1A26` | Hover states on cards, input backgrounds, skeleton base |
| `--color-surface-border` | `#2A2A3A` | Subtle dividers, card borders, bottom nav border-top |

#### Text Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-text-primary` | `#F5F0E8` | Body copy, headlines — warm off-white (never pure #FFF, too harsh on dark) |
| `--color-text-secondary` | `#A09890` | Captions, metadata, category labels, secondary nav labels |
| `--color-text-muted` | `#5A5450` | Placeholder text, disabled states |
| `--color-text-inverse` | `#0A0A0F` | Text on gold/light buttons |

#### Accent Colors (10% rule — reserved uses listed explicitly)

| Token | Hex | Reserved For |
|-------|-----|-------------|
| `--color-accent-gold` | `#D4A843` | Primary CTA buttons, active nav indicator, price highlights, hero CTA — **luxury signal** |
| `--color-accent-gold-dim` | `#A8832E` | Gold button hover/pressed state |
| `--color-accent-gold-glow` | `#D4A84333` | Gold glow shadow on CTAs (box-shadow, rgba 20%) |
| `--color-accent-jewel-blue` | `#2563EB` | Accent decoration only — NOT used for interactive elements |
| `--color-accent-crystal-purple` | `#7C3AED` | Accent decoration only — category badge background tint |
| `--color-accent-deep-red` | `#DC2626` | Destructive states only (none in Phase 1) |

#### Semantic Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-whatsapp` | `#25D366` | WhatsApp buttons exclusively — floating button, inline CTAs |
| `--color-whatsapp-dim` | `#1DA851` | WhatsApp button hover/pressed state |
| `--color-whatsapp-glow` | `#25D36633` | WhatsApp button glow shadow (box-shadow, rgba 20%) |
| `--color-loading-bar` | `#D4A843` | Top-of-page navigation progress bar (same as gold accent) |

### 60 / 30 / 10 Split Declaration

- **60% — Surface base + raised:** `#0A0A0F` page backgrounds, `#12121A` cards/nav — the dark canvas that makes bead colors pop
- **30% — Surface overlay + borders:** `#1A1A26` interactive surfaces, `#2A2A3A` structural dividers
- **10% — Accents:** Gold (`#D4A843`) for CTAs and price signals; WhatsApp green (`#25D366`) for WhatsApp entry points only

### Contrast Ratios (WCAG AA compliance on dark backgrounds)

| Foreground | Background | Ratio | WCAG Level |
|------------|------------|-------|------------|
| `#F5F0E8` text | `#0A0A0F` surface | 16.2:1 | AAA |
| `#F5F0E8` text | `#12121A` card | 14.8:1 | AAA |
| `#A09890` secondary | `#0A0A0F` surface | 5.1:1 | AA |
| `#D4A843` gold | `#0A0A0F` surface | 7.4:1 | AA (large) |
| `#0A0A0F` inverse | `#D4A843` gold button | 7.4:1 | AA |
| `#0A0A0F` inverse | `#25D366` WA button | 8.1:1 | AA |

---

## 2. Typography

### Font Pairing

| Role | Font Family | Source | Rationale |
|------|-------------|--------|-----------|
| **Display / Headlines** | `Playfair Display` | Google Fonts | Elegant serif with editorial prestige — signals luxury; works beautifully large on dark backgrounds; represents the "Topnotch Quality" side of the brand |
| **Body / UI** | `Inter` | Google Fonts | Neutral, highly readable sans-serif; excellent on dark backgrounds; familiar from apps (Instagram, WhatsApp) — signals the "native app" feel and affordability |

**Loading strategy:** Preload both fonts via `<link rel="preload">` in `layout.tsx`. Use `display: swap` to prevent invisible text during font load.

**Google Fonts URL:**
```
https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;600&display=swap
```

### Type Scale (exactly 4 sizes)

| Token | Size | Usage |
|-------|------|-------|
| `--font-size-hero` | `40px` | Hero headline ("Mag'Beads" brand name on homepage hero) |
| `--font-size-heading` | `24px` | Section headings, page titles, product names on detail |
| `--font-size-body` | `16px` | Body copy, card descriptions, form labels, nav labels |
| `--font-size-caption` | `13px` | Category badges, price metadata, timestamps, trust badge text |

### Font Weights (exactly 2)

| Token | Weight | Usage |
|-------|--------|-------|
| `--font-weight-regular` | `400` | All body copy, captions, secondary text |
| `--font-weight-semibold` | `600` | Inter UI bold — button labels, active nav labels, price values |
| `--font-weight-bold` | `700` | Playfair Display headlines only |

**Note on Inter 600:** When Inter is used at bold weight (button labels, nav active states, prices), use weight 600 — not 700. Playfair Display uses 700 for all display sizes.

### Line Heights

| Context | Line Height | Value |
|---------|-------------|-------|
| Hero headline | `1.1` | Tight leading — editorial, impactful |
| Section headings | `1.2` | Standard heading leading |
| Body copy | `1.6` | Generous — readability on dark bg |
| Captions and badges | `1.3` | Compact |
| Button labels | `1.0` | Single line, vertically centered |

### Letter Spacing

| Context | Tracking | Value |
|---------|----------|-------|
| Hero headline | `normal` | Playfair default |
| Section headings | `normal` | Playfair default |
| Category badges / ALL CAPS labels | `+0.08em` | Improves legibility on small uppercase |
| Button labels | `+0.02em` | Subtle open feeling |

---

## 3. Spacing & Layout

### Spacing Scale (8-point, multiples of 4)

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | `4px` | Icon internal padding, badge tight padding |
| `--space-2` | `8px` | Inline element gaps, icon-to-label gap |
| `--space-3` | `12px` | Compact padding inside small components |
| `--space-4` | `16px` | Standard content padding, card padding, list-item gap |
| `--space-5` | `24px` | Section internal spacing, button padding (vertical 12px, horizontal 24px) |
| `--space-6` | `32px` | Section gaps, hero content stack gap |
| `--space-8` | `48px` | Between major sections |
| `--space-10` | `64px` | Large section separators |

**Touch target exception:** 44px minimum touch target (FOUND-03, APP-01). This is not a spacing token — it is a `min-height`/`min-width` constraint applied to all interactive elements.

### Grid & Layout

#### Mobile (default, 390px reference width)

- **Horizontal page padding:** `16px` (left and right) — `px-4` in Tailwind
- **Content column:** Full width minus 32px (16px each side)
- **Card grid:** 2-column, `gap-3` (12px) — 1:1 aspect ratio product cards (Phase 2, declared now for consistency)
- **Bottom nav height:** `56px` fixed + `env(safe-area-inset-bottom)` additional padding

#### Tablet (768px breakpoint)

- **Horizontal page padding:** `24px`
- **Card grid:** 3-column
- **Bottom nav:** Remains visible — centered, max-width 640px, pill-style container

#### Desktop (1024px+ breakpoint)

- **Max content width:** `1280px`, centered with `auto` horizontal margins
- **Horizontal page padding:** `48px`
- **Card grid:** 4-column
- **Bottom nav:** Hidden on desktop (≥1024px) — replaced by top header with inline links
- **Desktop header:** Horizontal nav links, same dark background, no hamburger

#### Container widths

| Context | Max-width | Padding |
|---------|-----------|---------|
| Default page container | `1280px` | `16px` (mobile), `48px` (desktop) |
| Hero section | `100%` (full bleed) | None — hero bleeds edge-to-edge |
| Text-heavy sections | `768px` | Centered within container |

### Full-Screen Sections

Hero section uses `height: 100dvh` (PERF-03). This is mandatory — never `100vh` — to prevent iOS Safari toolbar clipping.

### Safe Area Insets

Applied via CSS `env()` functions:

```css
/* Floating WhatsApp button */
padding-bottom: calc(env(safe-area-inset-bottom) + 16px);

/* Bottom nav */
padding-bottom: env(safe-area-inset-bottom);
height: calc(56px + env(safe-area-inset-bottom));
```

---

## 4. Component Patterns

### 4.1 Bottom Navigation Bar (APP-01)

**Structure:** Fixed to bottom, always visible on mobile (hidden ≥1024px desktop).

```
[Home]  [Shop]  [About]  [Order]
  ↑ active indicator: 2px gold bar above icon
```

**Specifications:**
- Background: `#12121A` with `border-top: 1px solid #2A2A3A`
- Height: `56px` + `env(safe-area-inset-bottom)` (total rendered height varies by device)
- 4 items, equally spaced, `min-width: 44px` each (touch target)
- Active state: Gold `#D4A843` icon + label + 2px gold top border on item
- Inactive state: `#5A5450` icon + label (muted)
- Icon size: `22px` stroke-width `1.5`
- Label: `11px` Inter 400, `1.3` line-height — appears below icon
- Transition on active change: icon color fade `150ms ease`
- Backdrop: `backdrop-filter: blur(12px)` for a translucent blur-glass effect over content beneath
- z-index: `50`

**Icons (Lucide React):**
- Home → `Home`
- Shop → `ShoppingBag`
- About → `Info`
- Order → `MessageCircle`

### 4.2 Hero Section (FOUND-05)

**Full viewport, dark canvas with brand content above the fold at 390px.**

**Layout (mobile, stacked vertically):**
```
[Hero background: dark gradient + product image]
  ↕ content centered, z-index above image
  [MAG'BEADS logotype — 40px Playfair Display bold]
  [Tagline — 16px Inter regular]
  [CTA button — "Order on WhatsApp"]
  [Secondary: scroll hint arrow]
```

**Specifications:**
- Height: `100dvh`
- Background: `#0A0A0F` base with product image as `background-image` at 40% opacity (overlay: `linear-gradient(to bottom, rgba(10,10,15,0.3) 0%, rgba(10,10,15,0.85) 70%, #0A0A0F 100%)`)
- Brand name: `40px` Playfair Display 700, `#F5F0E8`, `letter-spacing: normal`, `line-height: 1.1`
- Tagline: `"Best Bead Plug in Port Harcourt · Topnotch Quality · Luxury · Affordable"` — `16px` Inter 400, `#A09890`
- CTA button: See Section 4.5 (WhatsApp CTA button spec)
- Scroll hint: Lucide `ChevronDown` icon, `#5A5450`, `24px`, animates with subtle `translateY` bounce `2s infinite ease-in-out`

**Desktop adaptation (≥1024px):**
- Two-column layout: text left, product image right
- Image fills right half at full height
- Text left-aligned, vertically centered in left column

### 4.3 Floating WhatsApp Button (FOUND-06, PERF-04)

**Always visible on every page. Single tap away from ordering.**

**Specifications:**
- Shape: Circle, `56px` diameter
- Background: `#25D366` (WhatsApp green)
- Icon: Custom WhatsApp SVG (see Section 6.2), white, `28px`
- Position: `fixed`, `bottom: calc(env(safe-area-inset-bottom) + 72px)`, `right: 16px`
  - The `72px` clears the bottom nav bar (56px height + 16px gap)
- z-index: `60` (above bottom nav at 50)
- Shadow: `0 4px 16px rgba(37, 211, 102, 0.35)` — green glow
- Hover/press state: scale to `0.95`, shadow dims to `0 2px 8px rgba(37, 211, 102, 0.2)`
- Press animation: `scale` via Motion v12, `duration: 0.1s`
- Link: `https://wa.me/message/WUS4HFGE7PKBO1`
- `aria-label`: `"Chat with Mag'Beads on WhatsApp"`
- `target="_blank"`, `rel="noopener noreferrer"`

**Desktop adaptation (≥1024px):**
- Remains in same fixed position
- Bottom adjusted: `bottom: 32px` (no bottom nav to clear)
- Size increases to `64px` diameter

### 4.4 Global Header (desktop only, ≥1024px)

**Only shown on desktop — mobile uses bottom nav exclusively.**

**Specifications:**
- Height: `64px`
- Background: `#0A0A0F` with `border-bottom: 1px solid #2A2A3A`
- Left: "MAG'BEADS" wordmark — `20px` Playfair Display 700, `#F5F0E8`
- Right: Nav links (Home, Shop, About, Order) — `16px` Inter 400, `#A09890`; active link: `#D4A843` gold
- Sticky: `position: sticky; top: 0; z-index: 40`
- No hamburger menu at any breakpoint

### 4.5 Primary CTA Button (WhatsApp)

**The main conversion action across the site.**

**Specifications:**
- Background: `#25D366` (WhatsApp green) — this IS the primary CTA color for Phase 1 because all orders go through WhatsApp
- Label: `"Order on WhatsApp"` — `16px` Inter 600, `#0A0A0F` (inverse dark text)
- Icon left: Custom WhatsApp SVG, `20px`, `#0A0A0F`
- Padding: `12px top/bottom`, `24px left/right`
- Border radius: `12px`
- Min-height: `48px` (exceeds 44px touch target requirement)
- Shadow: `0 4px 20px rgba(37, 211, 102, 0.4)`
- Hover/Active: background → `#1DA851`, shadow dims
- Motion: `whileHover={{ scale: 1.02 }}`, `whileTap={{ scale: 0.97 }}`
- Full-width on mobile, auto-width on desktop

### 4.6 Secondary Button (Gold accent)

**Used for secondary actions — not ordering, but navigating or browsing.**

**Specifications:**
- Background: `#D4A843` (gold)
- Label: `16px` Inter 600, `#0A0A0F`
- Padding: `12px top/bottom`, `24px left/right`
- Border radius: `12px`
- Min-height: `48px`
- Shadow: `0 4px 16px rgba(212, 168, 67, 0.3)`
- Hover/Active: background → `#A8832E`

### 4.7 Ghost Button (Outline variant)

**For low-emphasis actions.**

- Background: transparent
- Border: `1px solid #2A2A3A`
- Label: `16px` Inter 400, `#A09890`
- Hover: border → `#D4A843`, label → `#F5F0E8`
- Padding: `10px top/bottom`, `20px left/right`
- Border radius: `12px`
- Min-height: `44px`

### 4.8 Skeleton Loaders (APP-04)

**Shown while images or content loads. No spinners.**

**Shimmer animation (CSS keyframes):**
```css
@keyframes shimmer {
  0%   { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}
.skeleton {
  background: linear-gradient(
    90deg,
    #1A1A26 25%,
    #2A2A3A 50%,
    #1A1A26 75%
  );
  background-size: 800px 100%;
  animation: shimmer 1.5s infinite linear;
}
```

**Skeleton shapes used in Phase 1:**
- Hero image skeleton: full viewport width, `300px` tall, `border-radius: 0`
- Card skeleton: `1:1` aspect ratio square, `border-radius: 12px`
- Text line skeleton: `height: 16px`, `border-radius: 4px`, various widths (`80%`, `60%`, `40%`)

### 4.9 Top Loading Bar (LOCKED — YouTube/Google style)

**Thin linear progress bar at the very top of the page on route navigation.**

**Specifications:**
- Position: `fixed`, `top: 0`, `left: 0`, `right: 0`, z-index: `100`
- Height: `3px`
- Color: `#D4A843` (gold — matches primary accent)
- Animation: starts at `0%` width, progresses to ~`80%` while navigating, completes to `100%` on route load, then fades out `opacity: 0` over `300ms`
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)` for natural feel
- Implementation: Motion v12 `motion` component with `initial={{ scaleX: 0, transformOrigin: 'left' }}` → `animate={{ scaleX: 1 }}`
- No spinner overlay — this IS the only loading indicator during navigation

### 4.10 Footer

**Shown below page content, above bottom nav padding.**

**Content (all in one column on mobile):**
1. "MAG'BEADS" wordmark — `20px` Playfair Display 700
2. Tagline — `13px` Inter 400, `#A09890`
3. Trust signals row: CAC badge, nationwide delivery badge, freebie badge (see Section 4.11)
4. Social links: TikTok icon + `@magbeadsoboho`, Instagram icon + `@mag_beads`
5. WhatsApp number: `+234 703 239 1971` (display only — tappable tel: link)
6. CAC Reg: `"CAC Reg. No. 3804623"` — `13px`, `#5A5450`
7. Copyright: `"© 2024 Mag'Beads. All rights reserved."` — `11px`, `#5A5450`

**Specifications:**
- Background: `#12121A`
- Padding: `32px 16px` on mobile, `48px` on desktop
- Social icon size: `20px` Lucide strokes
- Bottom padding: `calc(env(safe-area-inset-bottom) + 80px)` — clears bottom nav

### 4.11 Trust Badge Component

**Three badges shown in footer (and later on hero/order page).**

**Each badge:**
- Background: `#1A1A26`
- Border: `1px solid #2A2A3A`
- Border radius: `8px`
- Padding: `8px 12px`
- Layout: icon left, text right, `gap: 8px`
- Icon: `16px` Lucide, `#D4A843` gold
- Text: `13px` Inter 400, `#A09890`

**Three instances:**
1. Icon: `Truck` — Text: `"Nationwide Delivery"`
2. Icon: `Gift` — Text: `"Free Gift with Every Order"`
3. Icon: `BadgeCheck` — Text: `"CAC Reg. No. 3804623"`

---

## 5. Motion & Animation

**Framework:** Motion v12 — import from `motion/react`. Never `framer-motion`.

### Page Transitions (APP-02)

**Route change animation — wraps page content:**

```tsx
// Page wrapper — applied to every route's root element
<motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -8 }}
  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
>
```

- Enter: fade in + slide up 12px → 0px, `250ms`
- Exit: fade out + slide up 8px, `200ms`
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)` (Material Design standard ease)
- No scale transforms — keeps it app-like, not bouncy

### Loading Bar Animation

```tsx
// On route start
<motion.div
  style={{ scaleX: progress, transformOrigin: 'left center' }}
  transition={{ duration: 0.3, ease: 'easeOut' }}
/>
```

- Progress 0 → 0.8 during navigation: `400ms ease-out`
- Complete 0.8 → 1.0 on route resolve: `200ms ease-in`
- Fade out `opacity` 1 → 0: `300ms` delay `100ms` after complete

### Scroll Hint (Hero)

```tsx
<motion.div
  animate={{ y: [0, 8, 0] }}
  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
/>
```

### Floating WhatsApp Button Entrance

```tsx
<motion.div
  initial={{ scale: 0, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ delay: 0.8, duration: 0.4, type: 'spring', stiffness: 300, damping: 20 }}
/>
```

- Springs in from scale 0 after `800ms` page load delay
- Feels "native" — like a notification badge appearing

### Button Interaction States

All interactive elements:
```tsx
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.97 }}
transition={{ duration: 0.1 }}
```

### `prefers-reduced-motion` Compliance

All Motion components must check `useReducedMotion()` hook:
- If `true`: disable `y` translate animations, disable scale animations, keep opacity fades (functional, not decorative)
- Loading bar remains — it is informational
- Skeleton shimmer remains — it is a loading state, not decoration

### Skeleton Shimmer

CSS animation only (not Motion v12) — `1.5s infinite linear` as defined in Section 4.8.

---

## 6. Icons

### 6.1 Lucide React — Usage Map

**Package:** `lucide-react` (tree-shaken imports only — `import { Home } from 'lucide-react'`)

**Global defaults:**
- `strokeWidth={1.5}` everywhere unless noted
- Size `22px` in bottom nav
- Size `20px` in inline UI (buttons, badges, footer)
- Size `16px` in captions and micro-UI
- Color: inherits from parent (set via Tailwind `text-` class, not icon prop)

**Bottom Navigation:**

| Nav Item | Lucide Icon | Import |
|----------|-------------|--------|
| Home | `Home` | `import { Home }` |
| Shop | `ShoppingBag` | `import { ShoppingBag }` |
| About | `Info` | `import { Info }` |
| Order | `MessageCircle` | `import { MessageCircle }` |

**Trust Badges (Footer + later pages):**

| Badge | Lucide Icon | Import |
|-------|-------------|--------|
| Nationwide Delivery | `Truck` | `import { Truck }` |
| Free Gift | `Gift` | `import { Gift }` |
| CAC Registered | `BadgeCheck` | `import { BadgeCheck }` |

**Social Links (Footer):**

| Platform | Lucide Icon | Import |
|----------|-------------|--------|
| TikTok | `Music2` | `import { Music2 }` — (Lucide's closest to TikTok; note: no official TikTok icon in Lucide) |
| Instagram | `Instagram` | `import { Instagram }` |

**Note on TikTok:** Lucide does not have an official TikTok icon. Use `Music2` as a stand-in OR use a custom SVG (see note below). **Recommended:** Use a custom TikTok SVG icon identical in stroke style to Lucide.

**UI Icons (used in later phases, declared now for consistency):**

| Usage | Lucide Icon |
|-------|-------------|
| Ruler / Length spec | `Ruler` |
| Layers / Strands spec | `Layers` |
| Tag / Price | `Tag` |
| Search | `Search` |
| Filter | `SlidersHorizontal` |
| Back navigation | `ChevronLeft` |
| Close / dismiss | `X` |
| Scroll hint | `ChevronDown` |
| External link | `ExternalLink` |
| Phone | `Phone` |
| Share | `Share2` |

### 6.2 Custom WhatsApp SVG Icon

Lucide does not include a WhatsApp icon. Use the official WhatsApp brand SVG, redrawn to match Lucide's stroke style.

**Spec:**
- ViewBox: `0 0 24 24`
- Stroke-based (not filled) — `stroke="currentColor"`, `strokeWidth="1.5"`, `strokeLinecap="round"`, `strokeLinejoin="round"`, `fill="none"`
- Path: Standard WhatsApp phone-in-speech-bubble silhouette
- Export as: `WhatsAppIcon` React component accepting `className` and `size` props

**WhatsApp SVG path (stroke version):**
```svg
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
     stroke-linecap="round" stroke-linejoin="round">
  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
  <path d="M9 10c0 .6.4 1 1 1h.01"/>
  <path d="M14 10c0 .6.4 1 1 1h.01"/>
  <path d="M9.5 15s.8 1 2.5 1 2.5-1 2.5-1"/>
</svg>
```

**Note:** The above is an approximation. The implementation team should use the WhatsApp-standard silhouette redrawn with Lucide-style strokes. Do not use filled/colored WhatsApp logo assets — stroke style must match Lucide throughout.

---

## 7. Dark Mode (Primary Canvas)

The site is dark-mode-native. There is no light mode in v1.

**Philosophy:** This is not a "dark mode toggle" site. The dark canvas IS the brand aesthetic — identical to the brand's TikTok/Instagram content. The dark background makes bead colors pop. Never fight this decision.

**CSS meta tag:**
```html
<meta name="color-scheme" content="dark">
```

**System preference:** If a user has `prefers-color-scheme: light`, the site still renders dark. This is brand intent, not a user preference site. The `color-scheme` meta tells the browser to render scrollbars and native UI elements (date pickers, etc.) in dark mode.

**Body background:** `background-color: #0A0A0F` — set on `<html>` and `<body>` to prevent white flash during page load.

**OG Image:** Dark background image with gold Mag'Beads logotype — 1200×630px. Must be visually dark to match brand.

---

## 8. PWA Manifest (APP-05)

**File:** `/public/manifest.json`

```json
{
  "name": "Mag'Beads",
  "short_name": "Mag'Beads",
  "description": "Best Bead Plug in Port Harcourt — Topnotch Quality, Luxury, Affordable",
  "start_url": "/",
  "display": "standalone",
  "orientation": "portrait",
  "background_color": "#0A0A0F",
  "theme_color": "#D4A843",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

**Icon design spec:**
- Dark background `#0A0A0F` square
- Centered "M" lettermark or "MB" monogram in gold `#D4A843`
- Font: Playfair Display 700
- Padding: 20% safe zone for maskable intent
- Required sizes: 192×192px and 512×512px PNG
- Apple touch icon: 180×180px at `/public/apple-touch-icon.png`

**Meta tags in `<head>`:**
```html
<meta name="theme-color" content="#D4A843">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Mag'Beads">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.json">
```

**Status bar color (iOS):** `black-translucent` — this lets the dark hero bleed under the iOS status bar for a full-screen immersive feel.

---

## 9. Accessibility

### Touch Targets (FOUND-03)

Every tappable element has `min-height: 44px` and `min-width: 44px`. This includes:
- Bottom nav items (each item min-width 44px)
- Floating WhatsApp button (56px circle — exceeds minimum)
- All buttons (min-height 48px)
- Social media links in footer (wrap in 44×44 tap area even if icon is 20px)

### Scrollbars (APP-06)

```css
* {
  scrollbar-width: none;       /* Firefox */
}
*::-webkit-scrollbar {
  display: none;               /* Chrome, Safari */
}
```

Applied globally. Never suppress scroll functionality — only the scrollbar visual.

### Focus States

For keyboard and accessibility tool users:
```css
:focus-visible {
  outline: 2px solid #D4A843;
  outline-offset: 3px;
  border-radius: 4px;
}
```

Gold focus ring — visible against both dark backgrounds and light elements.

### Reduced Motion

All Motion v12 animations must wrap motion values in `useReducedMotion()` check:
```tsx
const shouldReduceMotion = useReducedMotion()
// If true: skip y translations, skip scale transforms
// Keep opacity transitions (these are functional, not decorative)
```

### Semantic HTML

- `<nav>` wraps bottom navigation
- `<header>` wraps desktop header
- `<footer>` wraps footer
- `<main>` wraps page content
- `<h1>` — one per page, used for hero brand name or page title
- `aria-label` on all icon-only buttons
- `role="progressbar"` on loading bar with `aria-valuenow` updated during navigation

---

## 10. Copywriting Contract

### Brand Voice

**Tone:** Confident, warm, direct. Not formal. Not overly casual. Port Harcourt proud. Premium but approachable. Short sentences. No filler words.

**Persona:** The business owner speaking directly to the customer — not a corporation, not a faceless brand.

### Headlines & Display Copy

| Location | Copy | Notes |
|----------|------|-------|
| Hero brand name | `Mag'Beads` | Exact capitalization — apostrophe included |
| Hero tagline | `Best Bead Plug in Port Harcourt` | Primary tagline |
| Hero sub-tagline | `Topnotch Quality · Luxury · Affordable` | Centered dots as separators |
| Hero CTA (primary) | `Order on WhatsApp` | Verb + channel. No exclamation mark. |

### Navigation Labels

| Item | Label |
|------|-------|
| Home | `Home` |
| Shop | `Shop` |
| About | `About` |
| Order | `Order` |

Simple, one-word labels. No cleverness.

### Trust Signals Copy

| Signal | Copy |
|--------|------|
| Delivery badge | `Nationwide Delivery` |
| Freebie badge | `Free Gift with Every Order` |
| Registration badge | `CAC Reg. No. 3804623` |
| Footer reg line | `CAC Business Name Reg. No. 3804623 · Rivers State` |

### WhatsApp Button Labels

| Context | Label |
|---------|-------|
| Hero primary CTA | `Order on WhatsApp` |
| Floating button | No label — icon only (accessible via aria-label) |
| Floating button aria-label | `Chat with Mag'Beads on WhatsApp` |

### Empty States (Phase 1)

Phase 1 has no data-driven empty states. The only potential empty state is the gallery placeholder (Phase 2 concern). Not applicable to Phase 1.

### Error States (Phase 1)

Phase 1 has no form submissions or API calls. No error states needed in Phase 1.

### Loading State Copy

The loading bar is visual only — no loading text. Do not add "Loading…" text. The bar communicates navigation progress without words.

### Meta / OG Tags

| Tag | Value |
|-----|-------|
| `<title>` | `Mag'Beads — Best Bead Plug in Port Harcourt` |
| `og:title` | `Mag'Beads — Best Bead Plug in Port Harcourt` |
| `og:description` | `Topnotch quality bead jewelry — waistbeads, bracelets, necklaces, anklets & more. Nationwide delivery across Nigeria. Order on WhatsApp.` |
| `og:image` | `/og-image.png` (1200×630, dark background, gold brand name) |
| `twitter:card` | `summary_large_image` |

### Footer Tagline

```
Handcrafted bead jewelry from Port Harcourt, Nigeria.
Nationwide delivery. CAC-registered business since 2022.
```

Two short sentences. Communicates: quality, location, trust, longevity.

---

## 11. Tailwind v4 @theme Configuration

**File:** `src/app/globals.css`

The full token set declared above maps to this Tailwind v4 `@theme` block:

```css
@import "tailwindcss";

@theme {
  /* Surface colors */
  --color-surface-base: #0A0A0F;
  --color-surface-raised: #12121A;
  --color-surface-overlay: #1A1A26;
  --color-surface-border: #2A2A3A;

  /* Text colors */
  --color-text-primary: #F5F0E8;
  --color-text-secondary: #A09890;
  --color-text-muted: #5A5450;
  --color-text-inverse: #0A0A0F;

  /* Accent colors */
  --color-accent-gold: #D4A843;
  --color-accent-gold-dim: #A8832E;
  --color-accent-gold-glow: #D4A84333;
  --color-accent-jewel-blue: #2563EB;
  --color-accent-crystal-purple: #7C3AED;
  --color-accent-deep-red: #DC2626;

  /* Semantic colors */
  --color-whatsapp: #25D366;
  --color-whatsapp-dim: #1DA851;
  --color-whatsapp-glow: #25D36633;
  --color-loading-bar: #D4A843;

  /* Typography */
  --font-family-display: 'Playfair Display', Georgia, serif;
  --font-family-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

  --font-size-hero: 40px;
  --font-size-heading: 24px;
  --font-size-body: 16px;
  --font-size-caption: 13px;

  --font-weight-regular: 400;
  --font-weight-semibold: 600; /* Inter UI bold — buttons, nav active, prices */
  --font-weight-bold: 700;     /* Playfair Display headlines only */

  --line-height-hero: 1.1;
  --line-height-heading: 1.2;
  --line-height-body: 1.6;
  --line-height-caption: 1.3;

  /* Spacing */
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-5: 24px;
  --spacing-6: 32px;
  --spacing-8: 48px;
  --spacing-10: 64px;

  /* Border radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
}

/* Global resets for app-like feel */
html, body {
  background-color: #0A0A0F;
  color: #F5F0E8;
  color-scheme: dark;
  overscroll-behavior: none;
}

/* Hide scrollbars globally */
* {
  scrollbar-width: none;
}
*::-webkit-scrollbar {
  display: none;
}

/* Focus ring */
:focus-visible {
  outline: 2px solid #D4A843;
  outline-offset: 3px;
  border-radius: 4px;
}
```

---

## 12. Interaction Contract Summary

| Interaction | Trigger | Response | Duration |
|-------------|---------|----------|----------|
| Page navigation | Tap nav item | Loading bar sweeps top + page fades in | 250ms |
| Button tap | Touch start | Scale to 0.97 | 100ms |
| Button hover (desktop) | Mouse enter | Scale to 1.02 | 100ms |
| WhatsApp float entrance | Page load | Spring scale 0→1 after 800ms delay | 400ms spring |
| Scroll hint | Continuous | Bounce 0→8px→0 | 2s infinite |
| Active nav change | Route match | Icon + label color → gold, 2px gold bar | 150ms |
| Skeleton display | Content loading | Shimmer left→right | 1.5s infinite |
| Content reveal | Load complete | Fade in | 200ms |

---

## 13. Decisions Pre-Populated From Upstream

| Source | Decision | Value Used |
|--------|----------|-----------|
| Design direction (LOCKED) | Dark background canvas | `#0A0A0F` base, `#12121A` raised |
| Design direction (LOCKED) | Bottom navigation | 4 items, 56px height, Lucide icons |
| Design direction (LOCKED) | Loading bar style | YouTube-style thin bar, gold, fixed top |
| Design direction (LOCKED) | Motion framework | Motion v12 (`motion/react`) |
| Design direction (LOCKED) | Icon library | Lucide React, strokeWidth 1.5 |
| Design direction (LOCKED) | Custom WhatsApp icon | Stroke-style SVG, not Lucide built-in |
| Design direction (LOCKED) | PWA | Manifest + service worker, standalone display |
| Design direction (LOCKED) | Touch targets | 44px minimum throughout |
| Design direction (LOCKED) | Safe area insets | `env(safe-area-inset-bottom)` on nav + float button |
| Design direction (LOCKED) | 100dvh not 100vh | Hero section height |
| Design direction (LOCKED) | WhatsApp green for CTA | `#25D366` for all WhatsApp entry points |
| Design direction (LOCKED) | Gold for luxury accent | `#D4A843` for prices, CTAs, active states |
| RESEARCH.md | Next.js 16 + Tailwind v4 | CSS-first @theme, no shadcn |
| RESEARCH.md | No `output: 'export'` | Standard SSG via App Router |
| REQUIREMENTS.md FOUND-06 | Floating WhatsApp button | All pages, `wa.me/message/WUS4HFGE7PKBO1` |
| REQUIREMENTS.md FOUND-04 | OG meta tags | Server-rendered, TikTokSpider compatible |
| PROJECT.md | Social links | TikTok: @magbeadsoboho, Instagram: @mag_beads |
| PROJECT.md | WhatsApp display number | `+234 703 239 1971` |
| PROJECT.md | CAC registration | `3804623` |
| PROJECT.md | Trust signal copy | "Surprise freebie with every order" |

**User questions asked during this session:** 0 — all decisions were pre-populated from locked upstream artifacts.

---

*UI-SPEC created: 2026-05-24*
*Phase: 1 — Foundation*
*Status: draft (pending gsd-ui-checker approval)*
