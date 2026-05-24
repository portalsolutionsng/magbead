---
phase: 01-foundation
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - package.json
  - package-lock.json
  - tsconfig.json
  - next.config.ts
  - next-env.d.ts
  - postcss.config.mjs
  - .gitignore
  - app/globals.css
  - app/layout.tsx
  - app/template.tsx
  - app/page.tsx
  - app/gallery/page.tsx
  - app/about/page.tsx
  - app/order/page.tsx
  - app/pay/page.tsx
  - app/sw.ts
  - components/layout/BottomNav.tsx
  - components/layout/FloatingWhatsApp.tsx
  - components/layout/Footer.tsx
  - components/ui/WhatsAppButton.tsx
  - components/ui/WhatsAppIcon.tsx
  - data/site.ts
  - public/manifest.json
  - public/CNAME
  - public/og-image.png
  - public/apple-touch-icon.png
  - public/icons/icon-192.png
  - public/icons/icon-512.png
  - .github/workflows/deploy.yml
autonomous: false
requirements: [FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05, FOUND-06, FOUND-07, APP-01, APP-02, APP-05, APP-08]
user_setup:
  - service: github-pages
    why: "Static hosting for the live site — GitHub Pages must be enabled with the GitHub Actions source"
    dashboard_config:
      - task: "Enable GitHub Pages with source = GitHub Actions"
        location: "Repo → Settings → Pages → Build and deployment → Source: GitHub Actions"
      - task: "Add custom domain magbeads.com.ng (optional) and configure DNS, OR remove public/CNAME and set basePath if deploying to user.github.io/magbead"
        location: "Repo → Settings → Pages → Custom domain"

must_haves:
  truths:
    - "Site builds to static HTML with `npm run build` and produces an out/ directory"
    - "Homepage hero shows the Mag'Beads brand name, tagline, hero image background, and an 'Order on WhatsApp' CTA above the fold on a 390px screen"
    - "A floating WhatsApp button is visible on every route and links to wa.me/message/WUS4HFGE7PKBO1"
    - "Bottom nav (Home, Shop, About, Order) is visible on mobile and navigates between all four routes"
    - "Page navigations animate via Motion v12 page transitions and show the gold top loading bar"
    - "View-source on the homepage shows og:title, og:description, og:image meta tags in the raw HTML"
    - "The site can be added to the home screen (valid manifest.json + service worker registered)"
    - "Footer shows social links, phone +234 703 239 1971, and CAC Reg. No. 3804623"
    - "GitHub Actions workflow builds and deploys the static site to GitHub Pages"
  artifacts:
    - path: "data/site.ts"
      provides: "Single source of truth for WhatsApp link, phone, CAC, address, socials"
      contains: "WUS4HFGE7PKBO1"
    - path: "app/layout.tsx"
      provides: "Root layout: fonts, OG metadata, NextTopLoader, BottomNav, FloatingWhatsApp, Footer, manifest links"
      contains: "openGraph"
    - path: "app/template.tsx"
      provides: "Motion v12 per-route page transition wrapper"
      contains: "motion/react"
    - path: "app/page.tsx"
      provides: "Homepage hero with brand name, tagline, hero image, WhatsApp CTA"
      min_lines: 30
    - path: "components/layout/BottomNav.tsx"
      provides: "Bottom navigation bar with 4 Lucide-icon items and safe-area insets"
      contains: "env(safe-area-inset-bottom)"
    - path: "components/layout/FloatingWhatsApp.tsx"
      provides: "Fixed floating WhatsApp button on every page"
      contains: "wa.me/message/WUS4HFGE7PKBO1"
    - path: "components/layout/Footer.tsx"
      provides: "Footer with socials, phone, CAC reg, trust badges"
      contains: "3804623"
    - path: "app/globals.css"
      provides: "Tailwind v4 @import + @theme brand token block + global dark resets"
      contains: "@theme"
    - path: "next.config.ts"
      provides: "output: export + images.unoptimized + serwist PWA wrapper"
      contains: "output"
    - path: "public/manifest.json"
      provides: "PWA manifest for Add to Home Screen"
      contains: "standalone"
    - path: ".github/workflows/deploy.yml"
      provides: "GitHub Actions build + deploy to GitHub Pages"
      contains: "deploy-pages"
  key_links:
    - from: "app/layout.tsx"
      to: "components/layout/BottomNav.tsx"
      via: "import + render outside <main>"
      pattern: "BottomNav"
    - from: "app/layout.tsx"
      to: "components/layout/FloatingWhatsApp.tsx"
      via: "import + render"
      pattern: "FloatingWhatsApp"
    - from: "components/layout/FloatingWhatsApp.tsx"
      to: "data/site.ts"
      via: "siteConfig.whatsappLink"
      pattern: "siteConfig"
    - from: "app/page.tsx"
      to: "components/ui/WhatsAppButton.tsx"
      via: "hero primary CTA"
      pattern: "WhatsAppButton"
    - from: "next.config.ts"
      to: "app/sw.ts"
      via: "@serwist/next swSrc"
      pattern: "swSrc"
---

<objective>
Ship the Mag'Beads Walking Skeleton: a real, deployed GitHub Pages URL with the
complete global app chrome (bottom nav, floating WhatsApp button, footer),
the homepage hero with a primary WhatsApp CTA, Motion v12 page transitions,
server-rendered OG meta tags, and a minimum-viable PWA — ready to paste into
the TikTok bio.

This is Phase 1 of a new project in MVP mode. The "feature" is the application
itself: the thinnest end-to-end slice that proves every architectural layer
(scaffold → Tailwind v4 design system → App Router routing → global chrome →
page transitions → PWA → static export → GitHub Pages deploy) works together.
No product data, no forms, no API routes — those are later vertical slices
(see `01-SKELETON.md` for the architectural contract and deferred scope).

Purpose: Put a live, branded URL in the TikTok bio immediately and lock in the
architecture every later phase builds on.
Output: A deployed static Next.js 16 site at a real GitHub Pages URL satisfying
FOUND-01 through FOUND-07 plus APP-01, APP-02, APP-05, APP-08.
</objective>

## Phase Goal

**As a** TikTok visitor on a mobile phone, **I want to** open the Mag'Beads link
and immediately see a branded hero with a one-tap "Order on WhatsApp" button and
app-like navigation, **so that** I trust the brand and can start an order in seconds.

> Note: ROADMAP.md states the Phase 1 goal in outcome-prose form ("A real Mag'Beads
> URL is live on GitHub Pages…"). The user story above is derived from that goal plus
> PROJECT.md's stated primary actor (TikTok mobile visitor) and Core Value. If a
> different actor/outcome framing is required, run `/gsd mvp-phase 1` to set the
> ROADMAP `**Goal:**` line in canonical user-story form before executing.

## Acceptance Criteria (Phase 1 Success Criteria)
- [ ] The site loads at a real GitHub Pages URL on a mobile phone in under 3 seconds
- [ ] The floating WhatsApp button is visible on every page and opens the Mag'Beads chat when tapped
- [ ] Sharing the site URL on TikTok or Instagram shows a branded OG preview card (title, description, image)
- [ ] The homepage hero displays the Mag'Beads brand name, tagline, and a primary WhatsApp CTA button above the fold on a 390px screen

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/phases/01-foundation/01-UI-SPEC.md
@.planning/phases/01-foundation/01-RESEARCH.md
@.planning/phases/01-foundation/01-SKELETON.md

# 01-UI-SPEC.md is the canonical visual/interaction contract. Section numbers
# referenced in task actions (e.g. "UI-SPEC §4.1") point at it.
# 01-RESEARCH.md holds the locked stack versions and reference code snippets.
</context>

<execution_notes>
- Working directory is `/home/user/magbead` and is ALREADY a git repo on branch
  `claude/skill-installation-89xBv`. The repo currently contains only `.planning/`
  and `README.md`. Do NOT run `create-next-app` in a new subdirectory — scaffold
  IN PLACE in the repo root.
- `create-next-app` refuses to run in a non-empty directory. Scaffold into a temp
  dir and copy files in (see Task 1.1 for the exact procedure), OR pass the current
  directory with the conflict-tolerant flow described in Task 1.1.
- Use `--no-src-dir` layout: `app/`, `components/`, `data/` live at the repo root
  (NOT under `src/`). This matches RESEARCH.md §9 and 01-SKELETON.md.
- Import alias is `@/*` mapped to the repo root.
- Tailwind v4 has NO `tailwind.config.js`. All config is CSS-first in
  `app/globals.css` via `@import "tailwindcss";` + `@theme {}`.
- Motion v12 imports come from `motion/react` — NEVER `framer-motion`.
- The WhatsApp deep link ends in capital letter O: `WUS4HFGE7PKBO1` (not zero).
- All interactive elements must have `min-height: 44px` / `min-width: 44px`.
- Sections that fill the viewport use `100dvh`, never `100vh`.
- This plan is a single sequenced plan executed wave-by-wave. The `wave:` field in
  frontmatter is 1 for the plan as a whole; the "Wave N" headings below are the
  internal task-ordering sequence the executor follows top to bottom.
</execution_notes>

<package_legitimacy>
All packages installed in this plan are well-known, high-trust ecosystem packages
verified against RESEARCH.md §"Stack Decisions (Locked)". No `[ASSUMED]`, `[SUS]`,
or `[SLOP]` packages are introduced. Legitimacy (publisher, weekly downloads,
homepage) for the non-obvious additions is confirmed at the human checkpoint in
Task 1.2 before any install proceeds:

| Package | Registry | Why trusted |
|---------|----------|-------------|
| next, react, react-dom, typescript | npmjs.com | Core Next.js stack, installed by create-next-app |
| tailwindcss, @tailwindcss/postcss | npmjs.com | Official Tailwind v4 packages |
| motion | npmjs.com/package/motion | Official successor to framer-motion, same author |
| lucide-react | npmjs.com/package/lucide-react | Official Lucide React bindings |
| nextjs-toploader | npmjs.com/package/nextjs-toploader | Maintained App Router top-loader, ~3KB |
| @serwist/next, serwist | npmjs.com/package/serwist | Maintained PWA toolkit (next-pwa successor) |
</package_legitimacy>

<tasks>

<!-- ===================================================================== -->
<!-- WAVE 1 — SCAFFOLD (Next.js 16 + Tailwind v4 + deps + base config)      -->
<!-- ===================================================================== -->

<task type="auto">
  <name>Task 1.1: Scaffold Next.js 16 in place (FOUND-01)</name>
  <files>package.json, tsconfig.json, next-env.d.ts, .gitignore, postcss.config.mjs, app/layout.tsx, app/page.tsx, app/globals.css</files>
  <action>
    Scaffold a Next.js 16 + TypeScript + Tailwind v4 + App Router project IN the
    existing repo root (FOUND-01). The repo root already contains `.planning/`,
    `README.md`, and `.git/`, so `create-next-app` cannot target `.` directly
    (non-empty dir). Procedure:

    1. Run create-next-app into a sibling temp directory:
       `npx create-next-app@latest /tmp/magbead-scaffold --typescript --tailwind --app --no-src-dir --import-alias "@/*" --eslint --no-turbopack --use-npm`
       Accept defaults non-interactively.
    2. Copy the generated project files into the repo root WITHOUT clobbering
       `.planning/`, `.git/`, or the existing `README.md`:
       `cp -r /tmp/magbead-scaffold/. /home/user/magbead/` then restore the
       original `README.md` (do not let the template README overwrite it — keep
       the existing one).
    3. Move generated routes/components into the `--no-src-dir` layout if the
       template placed anything under `src/` (it should not with `--no-src-dir`,
       but verify `app/` is at the repo root, not `src/app/`).
    4. Remove `/tmp/magbead-scaffold`.

    Then verify the Tailwind version actually installed — create-next-app's
    `--tailwind` flag installs v4 in 2025/2026, but confirm. If `npm list tailwindcss`
    shows v3, upgrade per RESEARCH.md §1:
    `npm uninstall tailwindcss postcss autoprefixer && npm install tailwindcss@^4 @tailwindcss/postcss@^4`
    and delete any generated `tailwind.config.js`/`tailwind.config.ts` and
    `autoprefixer` from postcss config.

    Pin the framework to the locked versions from RESEARCH.md: `next@^16`,
    `react@^19`, `react-dom@^19`, `typescript@^5`, `tailwindcss@^4`,
    `@tailwindcss/postcss@^4`.

    Ensure `postcss.config.mjs` contains exactly the Tailwind v4 plugin
    (RESEARCH.md §1): a default-exported config object whose `plugins` key has
    `"@tailwindcss/postcss": {}` and NO `autoprefixer`.

    Confirm `tsconfig.json` has the `@/*` path alias mapping to the repo root
    (`"@/*": ["./*"]`).
  </action>
  <verify>
    <automated>cd /home/user/magbead && test -f package.json && test -d app && test ! -d src/app && npx tsc --noEmit && node -e "const p=require('./package.json');const d={...p.dependencies,...p.devDependencies};if(!/^[\^~]?16/.test(d.next))throw new Error('next not v16: '+d.next);if(!/^[\^~]?4/.test(d.tailwindcss))throw new Error('tailwind not v4: '+d.tailwindcss);console.log('OK next='+d.next+' tailwind='+d.tailwindcss)"</automated>
  </verify>
  <done>Repo root contains a Next.js 16 App Router project with `app/` at root (no `src/`), Tailwind v4 + @tailwindcss/postcss installed, `@/*` alias configured, `tsc --noEmit` passes, and `.planning/` + original `README.md` are intact.</done>
</task>

<task type="checkpoint:human-verify" gate="blocking-human">
  <name>Task 1.2: Verify dependency legitimacy before installing add-on packages</name>
  <what-built>
    Task 1.1 scaffolded the core Next.js + Tailwind stack. Before Task 1.3 installs
    the four additional runtime packages (motion, lucide-react, nextjs-toploader,
    @serwist/next + serwist), confirm they are the intended, legitimate packages.
  </what-built>
  <how-to-verify>
    Confirm each package on its registry page (publisher, downloads, repo link):
    1. https://www.npmjs.com/package/motion — official Motion (framer-motion successor)
    2. https://www.npmjs.com/package/lucide-react — official Lucide React bindings
    3. https://www.npmjs.com/package/nextjs-toploader — App Router top loading bar
    4. https://www.npmjs.com/package/serwist and https://www.npmjs.com/package/@serwist/next — PWA toolkit
    These are all named explicitly in RESEARCH.md §"Stack Decisions (Locked)".
    Confirm NONE of the forbidden packages are about to be installed:
    `framer-motion`, `react-paystack`, `next-pwa`.
  </how-to-verify>
  <resume-signal>Type "approved" to proceed with installs, or name any package to swap/remove.</resume-signal>
</task>

<task type="auto">
  <name>Task 1.3: Install Motion, Lucide, top-loader, and Serwist (APP-02, APP-05, APP-08)</name>
  <files>package.json, package-lock.json</files>
  <action>
    Install the locked add-on runtime packages from RESEARCH.md §"Stack Decisions":
    `npm install motion lucide-react nextjs-toploader @serwist/next serwist`

    Then explicitly UNINSTALL/confirm-absent the forbidden packages — they must
    never appear in the dependency tree (RESEARCH.md "Never install"): run
    `npm ls framer-motion next-pwa react-paystack` and confirm each reports
    "(empty)" / not found. If any is present, remove it.

    Do not add any other packages. Sharp/image pipeline and product data packages
    are Phase 2 scope (see 01-SKELETON.md "Out of Scope").
  </action>
  <verify>
    <automated>cd /home/user/magbead && node -e "const d=require('./package.json').dependencies;['motion','lucide-react','nextjs-toploader','@serwist/next','serwist'].forEach(k=>{if(!d[k])throw new Error('missing '+k)});['framer-motion','next-pwa','react-paystack'].forEach(k=>{if(d[k])throw new Error('FORBIDDEN present: '+k)});console.log('deps OK')"</automated>
  </verify>
  <done>motion, lucide-react, nextjs-toploader, @serwist/next, and serwist are in dependencies; framer-motion, next-pwa, and react-paystack are absent.</done>
</task>

<task type="auto">
  <name>Task 1.4: Write Tailwind v4 @theme tokens and global dark resets (PERF-05, APP-06)</name>
  <files>app/globals.css</files>
  <action>
    Replace the create-next-app-generated `app/globals.css` entirely with the
    canonical Tailwind v4 CSS-first config from UI-SPEC §11. The file MUST:

    1. Start with `@import "tailwindcss";` (Tailwind v4 entrypoint — NOT the v3
       `@tailwind base/components/utilities` directives).
    2. Contain an `@theme {}` block with the full token set from UI-SPEC §11:
       - Surface colors: `--color-surface-base:#0A0A0F`, `--color-surface-raised:#12121A`,
         `--color-surface-overlay:#1A1A26`, `--color-surface-border:#2A2A3A`
       - Text colors: `--color-text-primary:#F5F0E8`, `--color-text-secondary:#A09890`,
         `--color-text-muted:#5A5450`, `--color-text-inverse:#0A0A0F`
       - Accents: `--color-accent-gold:#D4A843`, `--color-accent-gold-dim:#A8832E`,
         `--color-accent-gold-glow:#D4A84333`, `--color-accent-jewel-blue:#2563EB`,
         `--color-accent-crystal-purple:#7C3AED`, `--color-accent-deep-red:#DC2626`
       - Semantic: `--color-whatsapp:#25D366`, `--color-whatsapp-dim:#1DA851`,
         `--color-whatsapp-glow:#25D36633`, `--color-loading-bar:#D4A843`
       - Typography: `--font-family-display` and `--font-family-body` referencing
         the Next.js font CSS variables defined in Task 4.1 — set
         `--font-family-display: var(--font-playfair), Georgia, serif;` and
         `--font-family-body: var(--font-inter), system-ui, sans-serif;`
       - Font sizes (`--font-size-hero:40px`, `-heading:24px`, `-body:16px`,
         `-caption:13px`), weights (400/600/700), line-heights, the spacing scale
         (`--spacing-1`..`--spacing-10`), and radii (`--radius-sm`..`--radius-full`)
         exactly as listed in UI-SPEC §11.
    3. After the `@theme` block, add the global resets from UI-SPEC §11 / §9:
       - `html, body { background-color:#0A0A0F; color:#F5F0E8; color-scheme:dark; overscroll-behavior:none; }`
       - Hidden scrollbars globally (APP-06): `* { scrollbar-width:none; }` and
         `*::-webkit-scrollbar { display:none; }`
       - Gold focus ring: `:focus-visible { outline:2px solid #D4A843; outline-offset:3px; border-radius:4px; }`
    4. Add the skeleton shimmer keyframes + `.skeleton` utility class from UI-SPEC §4.8
       (declared now for Phase 2 reuse; harmless if unused in Phase 1).

    Do NOT create a tailwind.config.js — Tailwind v4 is CSS-first only.
  </action>
  <verify>
    <automated>cd /home/user/magbead && grep -q '@import "tailwindcss"' app/globals.css && grep -q '@theme' app/globals.css && grep -q -- '--color-accent-gold: *#D4A843' app/globals.css && grep -q -- '--color-whatsapp: *#25D366' app/globals.css && grep -q 'color-scheme: *dark' app/globals.css && grep -q 'scrollbar-width: *none' app/globals.css && test ! -f tailwind.config.js && test ! -f tailwind.config.ts && echo "globals OK"</automated>
  </verify>
  <done>`app/globals.css` imports Tailwind v4, declares the full @theme token set from UI-SPEC §11, applies dark/scrollbar-hiding/focus-ring global resets, and no tailwind.config.* file exists.</done>
</task>

<!-- ===================================================================== -->
<!-- WAVE 2 — DATA LAYER (single source of truth for site config)          -->
<!-- ===================================================================== -->

<task type="auto">
  <name>Task 2.1: Create data/site.ts site config (FOUND-02, FOUND-06)</name>
  <files>data/site.ts</files>
  <action>
    Create `data/site.ts` exporting a single `siteConfig` const (typed
    `as const`) — the single source of truth every component reads from
    (RESEARCH.md §13, 01-SKELETON.md). Include exactly these fields with these
    values (verbatim — these are the locked values from PROJECT.md / UI-SPEC §10):
      - name: "Mag'Beads"
      - tagline: "Best Bead Plug in Port Harcourt"
      - subTagline: "Topnotch Quality · Luxury · Affordable"
      - footerTagline: "Handcrafted bead jewelry from Port Harcourt, Nigeria. Nationwide delivery. CAC-registered business since 2022."
      - whatsappLink: "https://wa.me/message/WUS4HFGE7PKBO1"   (capital letter O at end, NOT zero)
      - whatsappAria: "Chat with Mag'Beads on WhatsApp"
      - phone: "+2347032391971"        (tel: format, no spaces)
      - phoneDisplay: "+234 703 239 1971"
      - cacNumber: "3804623"
      - cacLine: "CAC Business Name Reg. No. 3804623 · Rivers State"
      - address: "No. 4 Ordu Street, Rumuigbo, Rivers State"
      - tiktok: "https://www.tiktok.com/@magbeadsoboho"
      - tiktokHandle: "@magbeadsoboho"
      - instagram: "https://www.instagram.com/mag_beads"
      - instagramHandle: "@mag_beads"
      - url: "https://magbeads.com.ng"   (canonical site URL for OG tags / metadataBase)
    Also export a `navItems` array used by BottomNav and the desktop header:
    `[{ href:'/', label:'Home' }, { href:'/gallery', label:'Shop' }, { href:'/about', label:'About' }, { href:'/order', label:'Order' }]`.
    Do NOT add product/category data here — that is Phase 2.
  </action>
  <verify>
    <automated>cd /home/user/magbead && npx tsc --noEmit && node -e "const fs=require('fs');const s=fs.readFileSync('data/site.ts','utf8');['WUS4HFGE7PKBO1','3804623','+234 703 239 1971','@magbeadsoboho','@mag_beads','as const'].forEach(t=>{if(!s.includes(t))throw new Error('missing '+t)});if(s.includes('WUS4HFGE7PKB01'))throw new Error('WhatsApp link has zero instead of letter O');console.log('site.ts OK')"</automated>
  </verify>
  <done>`data/site.ts` exports `siteConfig as const` with the locked WhatsApp link (ending in letter O), phone, CAC, address, and social handles, plus `navItems`; tsc passes.</done>
</task>

<!-- ===================================================================== -->
<!-- WAVE 3 — CORE COMPONENTS (global chrome building blocks)              -->
<!-- ===================================================================== -->

<task type="auto">
  <name>Task 3.1: WhatsAppIcon + reusable WhatsAppButton (FOUND-05, APP-08)</name>
  <files>components/ui/WhatsAppIcon.tsx, components/ui/WhatsAppButton.tsx</files>
  <action>
    Create two UI primitives.

    `components/ui/WhatsAppIcon.tsx`: a stroke-style WhatsApp SVG React component
    matching Lucide's stroke aesthetic (UI-SPEC §6.2). Accept `className?: string`
    and `size?: number` (default 24). Render an `<svg viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round"
    strokeLinejoin="round">` using the WhatsApp phone-in-speech-bubble silhouette.
    `stroke="currentColor"` so it inherits color via Tailwind `text-*` classes.
    NOTE: this stroke icon is for inline CTA buttons. The floating button (Task 3.3)
    uses the filled white WhatsApp glyph from RESEARCH.md §11 for maximum recognition
    on the green circle — that filled SVG lives inside FloatingWhatsApp, not here.

    `components/ui/WhatsAppButton.tsx`: a reusable primary CTA button (UI-SPEC §4.5).
    A client component (it uses Motion). Props:
      - `href?: string` (default `siteConfig.whatsappLink` from data/site.ts)
      - `label?: string` (default "Order on WhatsApp")
      - `className?: string`
      - `fullWidth?: boolean`
    Render a Motion-wrapped anchor (`motion.a` from `motion/react`) with
    `target="_blank" rel="noopener noreferrer"`. Styling per UI-SPEC §4.5:
    WhatsApp-green background (`#25D366`), inverse dark text (`#0A0A0F`),
    Inter 600, 16px, `min-height:48px`, padding 12px/24px, border-radius 12px,
    green glow shadow `0 4px 20px rgba(37,211,102,0.4)`, WhatsAppIcon (20px) left
    of label with 8px gap. Interaction: `whileHover={{ scale: 1.02 }}`,
    `whileTap={{ scale: 0.97 }}`, `transition={{ duration: 0.1 }}`. Respect
    `useReducedMotion()` (UI-SPEC §5): when reduced, drop the scale transforms.
    Full-width on mobile when `fullWidth`, auto-width otherwise.
  </action>
  <verify>
    <automated>cd /home/user/magbead && npx tsc --noEmit && grep -q "motion/react" components/ui/WhatsAppButton.tsx && grep -q "useReducedMotion" components/ui/WhatsAppButton.tsx && grep -q 'viewBox="0 0 24 24"' components/ui/WhatsAppIcon.tsx && echo "wa ui OK"</automated>
  </verify>
  <done>`WhatsAppIcon` renders a currentColor stroke SVG; `WhatsAppButton` is a Motion `motion.a` with green/inverse styling, 48px min-height, reduced-motion handling, and defaults its href to siteConfig.whatsappLink; tsc passes.</done>
</task>

<task type="auto">
  <name>Task 3.2: BottomNav component (APP-01, FOUND-03, APP-08)</name>
  <files>components/layout/BottomNav.tsx</files>
  <action>
    Create `components/layout/BottomNav.tsx` per UI-SPEC §4.1 and RESEARCH.md §10.
    Client component (`'use client'`, uses `usePathname`). Import `navItems` is
    NOT used here directly — instead map a local array pairing each route to its
    Lucide icon (the icon→route mapping is UI-specific): Home→`Home`,
    /gallery→`ShoppingBag` (label "Shop"), /about→`Info`, /order→`MessageCircle`
    (all from `lucide-react`).

    Structure: a `<nav>` fixed to the bottom, full width, `z-50`, background
    `#12121A`, `border-top: 1px solid #2A2A3A`, with
    `height: calc(56px + env(safe-area-inset-bottom))` and
    `padding-bottom: env(safe-area-inset-bottom)` (FOUND-03 / PERF-04 safe-area).
    Add `backdrop-filter: blur(12px)` for the translucent glass effect (UI-SPEC §4.1).
    Hide on desktop ≥1024px (`lg:hidden`) since desktop uses the top header.

    Each item: a `next/link` with `flex-1`, centered icon over an 11px Inter label,
    `min-height:44px` / `min-width:44px` touch target. Active state (pathname matches
    href; for "/" require exact match): icon + label colored gold `#D4A843` and a
    2px gold top-border indicator on the active item; inactive: `#5A5450`. Icon size
    22px, strokeWidth 1.5 (2.5 when active). Color transition 150ms ease.
    `aria-current="page"` on the active link.
  </action>
  <verify>
    <automated>cd /home/user/magbead && npx tsc --noEmit && grep -q "'use client'" components/layout/BottomNav.tsx && grep -q "usePathname" components/layout/BottomNav.tsx && grep -q "env(safe-area-inset-bottom)" components/layout/BottomNav.tsx && grep -Eq "Home|ShoppingBag|Info|MessageCircle" components/layout/BottomNav.tsx && grep -q "min-h-\[44px\]\|min-height" components/layout/BottomNav.tsx && echo "bottomnav OK"</automated>
  </verify>
  <done>BottomNav is a fixed, safe-area-aware, blur-glass bottom bar with 4 Lucide-icon items, gold active state with 2px indicator, 44px touch targets, hidden on lg; tsc passes.</done>
</task>

<task type="auto">
  <name>Task 3.3: FloatingWhatsApp button (FOUND-06, PERF-04, APP-02)</name>
  <files>components/layout/FloatingWhatsApp.tsx</files>
  <action>
    Create `components/layout/FloatingWhatsApp.tsx` per UI-SPEC §4.3. Client
    component (uses Motion). Render a Motion-wrapped anchor (`motion.a` from
    `motion/react`) linking to `siteConfig.whatsappLink` (import from `@/data/site`)
    with `target="_blank" rel="noopener noreferrer"` and
    `aria-label={siteConfig.whatsappAria}`.

    Position: `fixed`, `right:16px`,
    `bottom: calc(env(safe-area-inset-bottom) + 72px)` (the 72px clears the 56px
    bottom nav + 16px gap — FOUND-06 / PERF-04), `z-50` (above content; the spec
    notes 60 to sit above the nav at 50 — use `z-[60]`). On desktop ≥1024px there
    is no bottom nav, so override to `lg:bottom-8` and enlarge to 64px diameter
    (`lg:h-16 lg:w-16`).

    Shape: 56px circle (`h-14 w-14`), background WhatsApp green `#25D366`, centered
    white filled WhatsApp glyph 28px — use the FILLED white WhatsApp SVG path from
    RESEARCH.md §11 (`fill="white"`) for recognition on the green circle. Shadow
    `0 4px 16px rgba(37,211,102,0.35)` (green glow).

    Entrance + interaction animation (UI-SPEC §5): `initial={{ scale:0, opacity:0 }}`,
    `animate={{ scale:1, opacity:1 }}`,
    `transition={{ delay:0.8, duration:0.4, type:'spring', stiffness:300, damping:20 }}`;
    `whileTap={{ scale:0.95 }}`. Wrap with `useReducedMotion()` — when reduced,
    render at scale 1 immediately and drop the tap scale.
  </action>
  <verify>
    <automated>cd /home/user/magbead && npx tsc --noEmit && grep -q "motion/react" components/layout/FloatingWhatsApp.tsx && grep -q "siteConfig" components/layout/FloatingWhatsApp.tsx && grep -q "env(safe-area-inset-bottom)" components/layout/FloatingWhatsApp.tsx && grep -q "useReducedMotion" components/layout/FloatingWhatsApp.tsx && grep -q "z-\[60\]\|z-50" components/layout/FloatingWhatsApp.tsx && echo "float OK"</automated>
  </verify>
  <done>FloatingWhatsApp is a fixed 56px green circle (64px on desktop) above the safe-area + bottom nav, links to siteConfig.whatsappLink, spring-enters after 800ms, respects reduced motion; tsc passes.</done>
</task>

<!-- ===================================================================== -->
<!-- WAVE 4 — ROOT LAYOUT + PAGE TRANSITIONS                                -->
<!-- ===================================================================== -->

<task type="auto" tdd="false">
  <name>Task 4.1: Root layout — fonts, OG metadata, chrome, top loader (FOUND-02, FOUND-04, APP-02, APP-05, APP-08)</name>
  <files>app/layout.tsx</files>
  <action>
    Rewrite `app/layout.tsx` (server component — keep it server-rendered so OG
    tags land in raw HTML for the TikTok crawler, RESEARCH.md §8).

    1. Fonts (RESEARCH.md §3): import `Playfair_Display` and `Inter` from
       `next/font/google`. Playfair: `subsets:['latin']`, `weight:['700']`,
       `variable:'--font-playfair'`, `display:'swap'`. Inter: `subsets:['latin']`,
       `weight:['400','600']`, `variable:'--font-inter'`, `display:'swap'`. Apply
       both `.variable` classNames to `<html>` so `var(--font-playfair)` /
       `var(--font-inter)` resolve in the @theme tokens.

    2. Metadata (FOUND-04, UI-SPEC §10 "Meta / OG Tags"): export a typed
       `metadata: Metadata`. Set `metadataBase: new URL(siteConfig.url)`.
       - title: "Mag'Beads — Best Bead Plug in Port Harcourt"
       - description: the UI-SPEC §10 og:description string
       - openGraph: { title (same), description (same), url: siteConfig.url,
         siteName: "Mag'Beads", images:[{ url:'/og-image.png', width:1200,
         height:630, alt:'Mag\\'Beads jewelry' }], locale:'en_NG', type:'website' }
       - twitter: { card:'summary_large_image', title, description, images:['/og-image.png'] }
       Also export `viewport`/`themeColor` via the Next.js `viewport` export:
       `themeColor:'#D4A843'`, `colorScheme:'dark'`. Add the PWA + iOS meta in
       metadata where supported (`appleWebApp: { capable:true, statusBarStyle:'black-translucent', title:"Mag'Beads" }`)
       and `manifest:'/manifest.json'` on the metadata object (links manifest —
       APP-05).

    3. Body: render in order —
       `<NextTopLoader color="#D4A843" height={3} showSpinner={false} crawl={true} easing="ease" speed={200} />`
       (from `nextjs-toploader`), then `{children}` wrapped in `<main className="min-h-[100dvh]">`,
       then `<Footer />`, then `<BottomNav />`, then `<FloatingWhatsApp />`.
       (Footer is created in Wave 6 — import it; if executing strictly top-to-bottom,
       Task 6.1 must land before this builds. Order tasks accordingly OR add the
       Footer import as part of Task 6.1's wiring.) BottomNav + FloatingWhatsApp
       sit OUTSIDE `<main>` so they persist across route transitions and are never
       wrapped by template.tsx.

    4. Set `<html lang="en">` with the font variable classes and the body
       background already handled by globals.css. Add `suppressHydrationWarning`
       on `<html>` if needed for the color-scheme attribute.
  </action>
  <verify>
    <automated>cd /home/user/magbead && npx tsc --noEmit && grep -q "next/font/google" app/layout.tsx && grep -q "openGraph" app/layout.tsx && grep -q "og-image" app/layout.tsx && grep -q "NextTopLoader" app/layout.tsx && grep -q "BottomNav" app/layout.tsx && grep -q "FloatingWhatsApp" app/layout.tsx && grep -q "manifest" app/layout.tsx && grep -q -- "--font-playfair" app/layout.tsx && echo "layout OK"</automated>
  </verify>
  <done>Root layout loads Playfair+Inter as CSS variables, exports server-rendered OG/Twitter metadata pointing at /og-image.png, links the manifest, renders the gold NextTopLoader, and mounts BottomNav + FloatingWhatsApp + Footer outside `<main>`; tsc passes.</done>
</task>

<task type="auto">
  <name>Task 4.2: app/template.tsx — Motion v12 page transitions (APP-02)</name>
  <files>app/template.tsx</files>
  <action>
    Create `app/template.tsx` per RESEARCH.md §6 and UI-SPEC §5 "Page Transitions".
    Client component (`'use client'`). Import `motion` and `useReducedMotion` from
    `motion/react`. Wrap `{children}` in a `motion.div` with
    `initial={{ opacity:0, y:12 }}`, `animate={{ opacity:1, y:0 }}`,
    `exit={{ opacity:0, y:-8 }}`,
    `transition={{ duration:0.25, ease:[0.4,0,0.2,1] }}` (Material standard ease).
    No scale transforms. When `useReducedMotion()` is true, keep only the opacity
    fade and drop the `y` translations (UI-SPEC §5 reduced-motion rule).
    `template.tsx` (NOT layout.tsx) is the correct App Router primitive — it
    remounts on every route change so the enter animation fires per navigation.
  </action>
  <verify>
    <automated>cd /home/user/magbead && npx tsc --noEmit && grep -q "'use client'" app/template.tsx && grep -q "motion/react" app/template.tsx && grep -q "useReducedMotion" app/template.tsx && grep -q "initial" app/template.tsx && echo "template OK"</automated>
  </verify>
  <done>`app/template.tsx` is a client component that wraps children in a Motion fade+slide transition (opacity+y, 250ms, Material ease) with reduced-motion fallback; tsc passes.</done>
</task>

<!-- ===================================================================== -->
<!-- WAVE 5 — HOMEPAGE HERO                                                 -->
<!-- ===================================================================== -->

<task type="auto">
  <name>Task 5.1: Homepage hero (FOUND-05, PERF-03)</name>
  <files>app/page.tsx</files>
  <action>
    Replace `app/page.tsx` with the homepage hero per UI-SPEC §4.2. Server
    component (no client hooks needed — the CTA button and scroll hint are the
    only animated parts; import the client `WhatsAppButton`, and create a tiny
    client scroll-hint inline or as a small client subcomponent).

    Structure a `<section>` with `min-h-[100dvh]` (PERF-03 — NEVER 100vh),
    `relative`, flex column, centered, `text-center`, horizontal padding `px-4`.
    Background: surface base `#0A0A0F` with the hero product image as a
    `background-image` at ~40% opacity behind a gradient overlay
    `linear-gradient(to bottom, rgba(10,10,15,0.3) 0%, rgba(10,10,15,0.85) 70%, #0A0A0F 100%)`
    (UI-SPEC §4.2). Use the placeholder hero image at `/og-image.png` as the
    background for now (real hero photography is a Phase 2 content task — note
    this with a comment); the gradient must keep text readable regardless.

    Content stack (above the fold at 390px):
      1. `<h1>` brand name "Mag'Beads" — Playfair Display 700, 40px
         (`text-[40px]`, `font-[family-name:var(--font-playfair)]` or the
         `--font-family-display` token), `#F5F0E8`, line-height 1.1. Use the
         literal apostrophe rendered safely (`Mag&apos;Beads`).
      2. Tagline `siteConfig.tagline` — Inter 400, 16px, `#A09890`.
      3. Sub-tagline `siteConfig.subTagline` — caption styling.
      4. `<WhatsAppButton fullWidth />` (the primary CTA) — full width on mobile,
         auto on desktop, with adequate top margin (space-6).
      5. Scroll hint: Lucide `ChevronDown`, `#5A5450`, 24px, with the bounce
         animation from UI-SPEC §5 (a small client component using
         `motion` + `useReducedMotion`).

    Desktop ≥1024px adaptation (UI-SPEC §4.2): two-column layout — text left,
    image right. Keep it simple; a `lg:` grid is sufficient.

    Ensure the `<h1>` is the single h1 on the page (accessibility, UI-SPEC §9).
  </action>
  <verify>
    <automated>cd /home/user/magbead && npx tsc --noEmit && grep -q "min-h-\[100dvh\]" app/page.tsx && grep -q "Mag" app/page.tsx && grep -q "WhatsAppButton" app/page.tsx && grep -q "siteConfig" app/page.tsx && grep -Eq "<h1" app/page.tsx && ! grep -q "100vh" app/page.tsx && echo "hero OK"</automated>
  </verify>
  <done>Homepage renders a 100dvh hero with the Mag'Beads h1, tagline, sub-tagline, a full-width WhatsApp CTA, and an animated scroll hint over a gradient-darkened image background; no 100vh anywhere; tsc passes.</done>
</task>

<!-- ===================================================================== -->
<!-- WAVE 6 — FOOTER                                                        -->
<!-- ===================================================================== -->

<task type="auto">
  <name>Task 6.1: Footer with socials, phone, CAC, trust badges (FOUND-02, APP-08)</name>
  <files>components/layout/Footer.tsx, app/layout.tsx</files>
  <action>
    Create `components/layout/Footer.tsx` per UI-SPEC §4.10 + §4.11. Server
    component (no interactivity beyond links). Read all values from
    `siteConfig` (`@/data/site`). Single column on mobile (FOUND-02). Content:

      1. "MAG'BEADS" wordmark — Playfair Display 700, 20px.
      2. Footer tagline `siteConfig.footerTagline` — 13px Inter 400, `#A09890`.
      3. Trust-badge row of 3 badges (UI-SPEC §4.11): each a pill
         (bg `#1A1A26`, border `1px solid #2A2A3A`, radius 8px, padding 8px 12px,
         icon-left/text-right gap 8px, gold 16px Lucide icon, 13px secondary text):
           - `Truck` → "Nationwide Delivery"
           - `Gift` → "Free Gift with Every Order"
           - `BadgeCheck` → `"CAC Reg. No. " + siteConfig.cacNumber`
      4. Social links: TikTok and Instagram. Use Lucide `Instagram` for Instagram;
         for TikTok use Lucide `Music2` as the stand-in (UI-SPEC §6.1 note). Each
         is an anchor (`target="_blank" rel="noopener noreferrer"`) wrapped in a
         44×44 tap area showing icon + handle (`siteConfig.tiktokHandle` /
         `instagramHandle`).
      5. Phone: `siteConfig.phoneDisplay` as a `tel:` link
         (`href={`tel:${siteConfig.phone}`}`), Lucide `Phone` icon, 44px tap area.
      6. CAC reg line `siteConfig.cacLine` — 13px `#5A5450`.
      7. Copyright "© 2024 Mag'Beads. All rights reserved." — 11px `#5A5450`.

    Styling: bg `#12121A`, padding `32px 16px` mobile / `48px` desktop, and a
    bottom padding `calc(env(safe-area-inset-bottom) + 80px)` so the bottom nav
    never covers footer content (UI-SPEC §4.10).

    Then WIRE it: ensure `app/layout.tsx` imports and renders `<Footer />` after
    `{children}`/`<main>` and before `<BottomNav />` (this completes the Task 4.1
    Footer reference — if Task 4.1 already added the import, just confirm it
    resolves).
  </action>
  <verify>
    <automated>cd /home/user/magbead && npx tsc --noEmit && grep -q "siteConfig" components/layout/Footer.tsx && grep -Eq "Truck|Gift|BadgeCheck" components/layout/Footer.tsx && grep -Eq "Instagram|Music2" components/layout/Footer.tsx && grep -q "tel:" components/layout/Footer.tsx && grep -q "cacLine\|3804623\|cacNumber" components/layout/Footer.tsx && grep -q "Footer" app/layout.tsx && grep -q "env(safe-area-inset-bottom)" components/layout/Footer.tsx && echo "footer OK"</automated>
  </verify>
  <done>Footer renders wordmark, tagline, 3 trust badges, TikTok+Instagram social links, a tel: phone link, the CAC reg line, and copyright — all from siteConfig with safe-area bottom padding — and is wired into the root layout; tsc passes.</done>
</task>

<!-- ===================================================================== -->
<!-- WAVE 7 — STUB ROUTES (so bottom nav links resolve)                    -->
<!-- ===================================================================== -->

<task type="auto">
  <name>Task 7.1: Branded stub pages for /gallery, /about, /order, /pay</name>
  <files>app/gallery/page.tsx, app/about/page.tsx, app/order/page.tsx, app/pay/page.tsx</files>
  <action>
    Create four branded stub routes so every bottom-nav target resolves and page
    transitions can be demonstrated end-to-end (01-SKELETON.md: routes ship as
    branded stubs in Phase 1; content arrives in Phases 2–4).

    Each page is a server component, a centered `min-h-[60dvh]` section on the
    dark canvas with: a Playfair `<h1>` page title, a one-line Inter description,
    and a "Coming soon" caption in `#5A5450`. Reuse the brand styling.
      - `app/gallery/page.tsx` — h1 "Shop", copy "Our full bead gallery is coming soon."
        Add a per-page `metadata` export with title "Shop — Mag'Beads".
      - `app/about/page.tsx` — h1 "About Mag'Beads", copy "Our story is coming soon."
        metadata title "About — Mag'Beads".
      - `app/order/page.tsx` — h1 "How to Order", copy "Order steps coming soon. Tap the WhatsApp button to order now."
        Include a `<WhatsAppButton />` so ordering works from this page today.
        metadata title "How to Order — Mag'Beads".
      - `app/pay/page.tsx` — h1 "Payment", copy "Payment activation pending — order on WhatsApp for now."
        (matches the eventual PAY-01 holding state intent). metadata title "Pay — Mag'Beads".

    Every page inherits the floating WhatsApp button, bottom nav, footer, OG tags,
    and page transition from the root layout/template — no extra wiring needed.
  </action>
  <verify>
    <automated>cd /home/user/magbead && npx tsc --noEmit && for p in gallery about order pay; do test -f app/$p/page.tsx || { echo "missing app/$p/page.tsx"; exit 1; }; done && grep -q "WhatsAppButton" app/order/page.tsx && echo "stubs OK"</automated>
  </verify>
  <done>Four branded stub routes exist (/gallery, /about, /order, /pay), each with a title, copy, per-page metadata, and the /order page includes a working WhatsApp CTA; tsc passes.</done>
</task>

<!-- ===================================================================== -->
<!-- WAVE 8 — PWA (manifest + service worker + icons)                      -->
<!-- ===================================================================== -->

<task type="auto">
  <name>Task 8.1: PWA manifest, service worker, and placeholder icons (APP-05)</name>
  <files>public/manifest.json, app/sw.ts, public/icons/icon-192.png, public/icons/icon-512.png, public/apple-touch-icon.png</files>
  <action>
    Wire the minimum-viable PWA (APP-05) per RESEARCH.md §7 and UI-SPEC §8.

    1. `public/manifest.json` — use the UI-SPEC §8 manifest verbatim: name +
       short_name "Mag'Beads", description (UI-SPEC §8), `start_url:"/"`,
       `display:"standalone"`, `orientation:"portrait"`, `background_color:"#0A0A0F"`,
       `theme_color:"#D4A843"`, and the two icons (192, 512) with
       `purpose:"any maskable"` pointing at `/icons/icon-192.png` and
       `/icons/icon-512.png`.

    2. `app/sw.ts` — the Serwist service worker source verbatim from RESEARCH.md §7:
       imports from `serwist`, declares the `__SW_MANIFEST` global, instantiates
       `new Serwist({ precacheEntries: self.__SW_MANIFEST, skipWaiting:true,
       clientsClaim:true, navigationPreload:true, runtimeCaching:[] })` and calls
       `serwist.addEventListeners()`. (The next.config wiring is done in Task 10.1.)

    3. Placeholder icons — generate valid PNGs at the required sizes so the
       manifest validates and "Add to Home Screen" works (final designed art is a
       content task per 01-SKELETON.md "Out of Scope"). Generate dark-background
       (`#0A0A0F`) squares with a gold (`#D4A843`) centered "M":
         - `public/icons/icon-192.png` (192×192)
         - `public/icons/icon-512.png` (512×512)
         - `public/apple-touch-icon.png` (180×180)
       Generate them programmatically WITHOUT adding a runtime dependency — e.g.
       a one-off Node script using the already-available `canvas`-free approach:
       write a minimal valid PNG via an inline script, or use ImageMagick if
       present (`command -v convert`), or `npx --yes sharp-cli` as a dev-only
       one-shot. If no image tool is available, create solid `#0A0A0F` PNGs of the
       correct dimensions (a valid colored square is sufficient for the manifest to
       validate). Do NOT commit a runtime image dependency.
  </action>
  <verify>
    <automated>cd /home/user/magbead && node -e "const m=require('./public/manifest.json');if(m.display!=='standalone')throw new Error('display');if(!m.icons||m.icons.length<2)throw new Error('icons');console.log('manifest OK')" && grep -q "Serwist" app/sw.ts && grep -q "__SW_MANIFEST" app/sw.ts && for f in public/icons/icon-192.png public/icons/icon-512.png public/apple-touch-icon.png; do test -s $f || { echo "missing/empty $f"; exit 1; }; done && echo "pwa OK"</automated>
  </verify>
  <done>`manifest.json` is a valid standalone PWA manifest with 192/512 icons; `app/sw.ts` is the Serwist precache worker; valid placeholder PNG icons exist at all three sizes; no runtime image dependency added.</done>
</task>

<!-- ===================================================================== -->
<!-- WAVE 9 — OG IMAGE                                                      -->
<!-- ===================================================================== -->

<task type="auto">
  <name>Task 9.1: Placeholder OG image 1200×630 (FOUND-04)</name>
  <files>public/og-image.png</files>
  <action>
    Create `public/og-image.png` — a 1200×630 dark-background OG card so the
    metadata in Task 4.1 resolves and TikTok/Instagram link previews render
    (FOUND-04, UI-SPEC §7 "OG Image", success criterion 3). Final designed
    artwork is a content task (01-SKELETON.md "Out of Scope"); this placeholder
    must still look on-brand: solid `#0A0A0F` background with the gold (`#D4A843`)
    "Mag'Beads" wordmark centered (Playfair-style if a font is available; plain
    gold text otherwise).

    Generate it with whatever image tool is available (ImageMagick `convert`,
    a one-shot `npx --yes sharp-cli`, or a small Node script) WITHOUT adding a
    runtime dependency. At minimum produce a valid 1200×630 PNG with the dark
    background and gold brand text. This is the same file referenced as the hero
    background placeholder in Task 5.1 and the OG/Twitter image in Task 4.1.
  </action>
  <verify>
    <automated>cd /home/user/magbead && test -s public/og-image.png && node -e "const fs=require('fs');const b=fs.readFileSync('public/og-image.png');if(b.slice(0,8).toString('hex')!=='89504e470d0a1a0a')throw new Error('not a PNG');const w=b.readUInt32BE(16),h=b.readUInt32BE(20);if(w!==1200||h!==630)throw new Error('dims '+w+'x'+h);console.log('og OK '+w+'x'+h)"</automated>
  </verify>
  <done>`public/og-image.png` is a valid 1200×630 PNG with a dark background and gold Mag'Beads wordmark, referenced by both the OG metadata and the hero background.</done>
</task>

<!-- ===================================================================== -->
<!-- WAVE 10 — GITHUB PAGES (next.config + Actions + CNAME)                 -->
<!-- ===================================================================== -->

<task type="auto">
  <name>Task 10.1: next.config.ts — static export + Serwist + GitHub Pages (FOUND-01, FOUND-07, APP-05)</name>
  <files>next.config.ts</files>
  <action>
    Write `next.config.ts` combining static export (for GitHub Pages) with the
    Serwist PWA wrapper, per RESEARCH.md §4 + §7.

    1. Base config object (`NextConfig`):
       - `output: 'export'` (REQUIRED for GitHub Pages static files — RESEARCH.md §4;
         the "never use export" guidance applies only after the Phase 4 Cloudflare
         migration, where there are API routes. For Phases 1–3 export is correct.)
       - `trailingSlash: true`
       - `images: { unoptimized: true }` (GitHub Pages cannot run the Next image
         optimizer — RESEARCH.md §4; images are pre-processed to WebP from Phase 2).
       - NO `basePath`/`assetPrefix` because the site uses the custom apex domain
         `magbeads.com.ng` (Task 10.3 CNAME). Leave a commented-out
         `basePath:'/magbead'` + `assetPrefix:'/magbead/'` block with a note: enable
         ONLY if deploying to `username.github.io/magbead` instead of a custom domain.

    2. Wrap with Serwist (RESEARCH.md §7): import `withSerwist from '@serwist/next'`,
       call `withSerwist({ swSrc:'app/sw.ts', swDest:'public/sw.js',
       disable: process.env.NODE_ENV === 'development' })` and export
       `withPWA(nextConfig)`.

    Confirm `npm run build` produces an `out/` directory (static export output)
    and that the build does not error on the Serwist + export combination.
  </action>
  <verify>
    <automated>cd /home/user/magbead && grep -q "output: *'export'" next.config.ts && grep -q "unoptimized: *true" next.config.ts && grep -q "trailingSlash" next.config.ts && grep -q "@serwist/next" next.config.ts && grep -q "swSrc: *'app/sw.ts'" next.config.ts && npm run build && test -d out && test -f out/index.html && echo "build+export OK"</automated>
  </verify>
  <done>`next.config.ts` sets output:'export' + trailingSlash + images.unoptimized and wraps the config with Serwist; `npm run build` succeeds and produces `out/index.html`.</done>
</task>

<task type="auto">
  <name>Task 10.2: GitHub Actions deploy workflow (FOUND-01)</name>
  <files>.github/workflows/deploy.yml</files>
  <action>
    Create `.github/workflows/deploy.yml` per RESEARCH.md §4 — build the static
    site and publish to GitHub Pages.

    Use the RESEARCH.md §4 workflow verbatim with one correction: the `build` job
    must upload the `out/` directory (the static export output) — confirm the
    `upload-pages-artifact` step has `path: ./out` (RESEARCH.md §4 already does).
    Structure:
      - name: "Deploy to GitHub Pages"
      - on: push to `main` + `workflow_dispatch`
      - permissions: `contents:read`, `pages:write`, `id-token:write`
      - concurrency group "pages", `cancel-in-progress:false`
      - build job (ubuntu-latest): `actions/checkout@v4`,
        `actions/setup-node@v4` (node 20, npm cache), `npm ci`, `npm run build`,
        `actions/upload-pages-artifact@v3` with `path: ./out`
      - deploy job: needs build, environment github-pages, `actions/deploy-pages@v4`

    Note for the executor: the workflow only runs on the `main` branch. The current
    working branch is `claude/skill-installation-89xBv`; deployment happens once this
    work merges to `main` (or via manual `workflow_dispatch`). Do not change the
    trigger branch — `main` is the deploy branch per RESEARCH.md.
  </action>
  <verify>
    <automated>cd /home/user/magbead && test -f .github/workflows/deploy.yml && grep -q "upload-pages-artifact" .github/workflows/deploy.yml && grep -q "deploy-pages@v4" .github/workflows/deploy.yml && grep -q "path: ./out" .github/workflows/deploy.yml && grep -q "pages: write" .github/workflows/deploy.yml && grep -q "id-token: write" .github/workflows/deploy.yml && echo "workflow OK"</automated>
  </verify>
  <done>`.github/workflows/deploy.yml` builds with npm ci + npm run build, uploads ./out, and deploys to GitHub Pages with the correct pages/id-token permissions on push to main.</done>
</task>

<task type="auto">
  <name>Task 10.3: CNAME + .nojekyll for custom domain (FOUND-01)</name>
  <files>public/CNAME</files>
  <action>
    1. Create `public/CNAME` containing exactly one line: `magbeads.com.ng`
       (no protocol, no trailing slash). Next.js copies `public/` into `out/`,
       so the CNAME ships with the static export and GitHub Pages picks it up to
       bind the custom apex domain (RESEARCH.md §15).
    2. Create `public/.nojekyll` (empty file) so GitHub Pages does not run Jekyll
       over the Next.js output (Jekyll ignores `_next/` directories, which would
       break asset loading). This is a critical-but-easy-to-miss GitHub Pages
       requirement for Next static exports.

    Note in the SUMMARY: if the custom domain is not yet configured at execution
    time, the site is still reachable at the default `*.github.io` URL — but with a
    custom apex domain and no basePath, the default github.io URL would 404 on
    assets. The user_setup checkpoint (Task 11.2) covers the DNS/Pages-source
    decision: either configure `magbeads.com.ng` DNS, or delete `public/CNAME` and
    enable the commented basePath in next.config.ts for a `*.github.io/magbead` URL.
  </action>
  <verify>
    <automated>cd /home/user/magbead && test -f public/CNAME && grep -q "magbeads.com.ng" public/CNAME && test -f public/.nojekyll && echo "cname OK"</automated>
  </verify>
  <done>`public/CNAME` contains `magbeads.com.ng` and `public/.nojekyll` exists, both of which ship into `out/` on build.</done>
</task>

<!-- ===================================================================== -->
<!-- WAVE 11 — POLISH + BUILD GATE + DEPLOY CHECKPOINTS                     -->
<!-- ===================================================================== -->

<task type="auto">
  <name>Task 11.1: Polish pass + clean build gate (FOUND-03, FOUND-07, APP-06)</name>
  <files>app/globals.css, app/layout.tsx</files>
  <action>
    Final polish and a clean production-build gate.

    1. Body bottom padding so content is never hidden behind the fixed bottom nav:
       on `<main>` (in app/layout.tsx) add bottom padding that clears the nav on
       mobile only — `pb-[calc(56px+env(safe-area-inset-bottom))] lg:pb-0`. (The
       hero is 100dvh and self-contained, but stub/footer content needs the clearance.)
    2. Confirm the global resets from Task 1.4 are present and effective: hidden
       scrollbars (APP-06), dark `color-scheme`, gold focus ring, no white flash
       (html/body background `#0A0A0F`).
    3. Run the production build and lint as the quality gate. Inspect the built
       homepage HTML in `out/` and confirm OG tags are present in the RAW static
       HTML (FOUND-04) — they must be in `out/index.html`, proving server/static
       rendering (TikTok crawler reads raw HTML, RESEARCH.md §8).
    4. Sanity-check the initial page weight budget (FOUND-07, <300KB): the
       homepage `out/index.html` plus its first-load JS chunks should be modest;
       note the `npm run build` "First Load JS" figure in the SUMMARY. No product
       images ship in Phase 1, so the budget is comfortably met (RESEARCH.md §14
       estimates ~130–145KB).
  </action>
  <verify>
    <automated>cd /home/user/magbead && npm run build && test -f out/index.html && grep -qi 'property="og:title"' out/index.html && grep -qi 'property="og:image"' out/index.html && grep -qi 'name="twitter:card"' out/index.html && grep -q "scrollbar-width" app/globals.css && grep -q 'pb-\[calc' app/layout.tsx && echo "polish+gate OK"</automated>
  </verify>
  <done>Production build is clean; `out/index.html` contains og:title, og:image, and twitter:card in raw static HTML (FOUND-04); scrollbars hidden globally; `<main>` clears the bottom nav on mobile; First Load JS noted in SUMMARY and within the &lt;300KB budget (FOUND-07).</done>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <name>Task 11.2: Verify the live site on a real mobile phone (all success criteria)</name>
  <what-built>
    The full Walking Skeleton is built and statically exported. The GitHub Actions
    workflow (Task 10.2) deploys `out/` to GitHub Pages on push to `main`. This
    checkpoint verifies the four Phase 1 success criteria against the LIVE deployed
    URL on an actual phone — automated checks proved the build; only a human with a
    phone can confirm the live mobile experience and the real WhatsApp chat opening.
  </what-built>
  <how-to-verify>
    Prerequisite (one-time GitHub setup — see this plan's `user_setup`):
      1. In the repo: Settings → Pages → Build and deployment → Source = "GitHub Actions".
      2. Custom domain: either (a) configure DNS for `magbeads.com.ng` and set it as
         the Pages custom domain, OR (b) delete `public/CNAME` and enable the
         commented `basePath`/`assetPrefix` in `next.config.ts`, then redeploy to the
         `*.github.io/magbead` URL.
      3. Merge this branch to `main` (or trigger the workflow via Actions →
         "Deploy to GitHub Pages" → Run workflow) and wait for the green deploy.

    Then on a real phone (target 390px-class device):
      1. Open the live URL. Confirm it loads in under ~3 seconds (success criterion 1).
      2. Confirm the hero shows "Mag'Beads", the tagline, and the gold/green
         "Order on WhatsApp" CTA ABOVE THE FOLD without scrolling (success criterion 4).
      3. Tap the floating green WhatsApp button — confirm it opens the real
         Mag'Beads WhatsApp chat (success criterion 2). Repeat from /gallery,
         /about, /order, /pay to confirm it appears on EVERY page (FOUND-06).
      4. Tap each bottom-nav item (Home/Shop/About/Order) — confirm routing works,
         the gold active indicator moves, and page transitions animate.
      5. Paste the live URL into a TikTok/Instagram DM (or use
         https://www.opengraph.xyz/ ) and confirm a branded OG preview card with
         title, description, and the dark/gold image appears (success criterion 3).
      6. Use the browser "Add to Home Screen" option and confirm the Mag'Beads
         icon installs (APP-05).
  </how-to-verify>
  <resume-signal>Type "approved" once all four success criteria pass on a real phone, or describe what failed.</resume-signal>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| npm/registry → build | Third-party packages are pulled and executed during build (supply-chain surface) |
| GitHub Actions → GitHub Pages | CI builds the artifact and publishes it with `pages:write` + `id-token:write` |
| browser → external (wa.me, tiktok, instagram) | Outbound links open third-party origins in a new tab |

> Phase 1 is a fully static site with NO server, NO API routes, NO database, NO
> user input, and NO secrets. The classic STRIDE surface (injection, auth, data
> tampering at runtime) is minimal. The meaningful surfaces are supply chain and
> the deploy pipeline.

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-01-SC | Tampering | npm installs (Task 1.1, 1.3) | mitigate | Blocking human legitimacy checkpoint (Task 1.2) before add-on installs; only RESEARCH-locked packages; forbidden packages (framer-motion/next-pwa/react-paystack) asserted absent in verify |
| T-01-01 | Tampering | Outbound `target="_blank"` links (FloatingWhatsApp, Footer socials) | mitigate | All external anchors use `rel="noopener noreferrer"` to block reverse-tabnabbing (specified in Tasks 3.1, 3.3, 6.1) |
| T-01-02 | Elevation of Privilege | GitHub Actions deploy workflow | mitigate | Least-privilege `permissions:` block (contents:read, pages:write, id-token:write only); pinned `@v4` actions; concurrency guard |
| T-01-03 | Information Disclosure | Client bundle / repo | accept | No secrets exist in Phase 1 — Paystack secret key is Phase 4 and explicitly server-side-only (no NEXT_PUBLIC_ prefix). Nothing sensitive to leak in a static export |
| T-01-04 | Denial of Service | GitHub Pages static hosting | accept | Static CDN-served files; GitHub Pages handles availability/scaling; out of scope to mitigate further |
| T-01-05 | Spoofing | Custom domain (magbeads.com.ng) | mitigate | GitHub Pages serves HTTPS with auto-provisioned TLS once the custom domain + DNS are configured (user_setup) |
</threat_model>

<verification>
Phase-level checks the executor runs before declaring the phase complete:

1. **Build + static export:** `npm run build` succeeds and produces `out/` with
   `index.html`, `gallery/index.html`, `about/index.html`, `order/index.html`,
   `pay/index.html` (FOUND-01).
2. **OG in raw HTML:** `out/index.html` contains `og:title`, `og:description`,
   `og:image`, and `twitter:card` meta tags (FOUND-04, success criterion 3).
3. **WhatsApp link integrity:** every WhatsApp link in the built output ends in
   `WUS4HFGE7PKBO1` (letter O) — grep `out/` for the link and assert no `WUS4HFGE7PKB01`.
4. **Floating button on every page:** the WhatsApp float renders in each route's
   built HTML / is mounted in the persistent layout (FOUND-06).
5. **Manifest + SW present in output:** `out/manifest.json` and `out/sw.js` exist
   (APP-05).
6. **CNAME + .nojekyll shipped:** `out/CNAME` and `out/.nojekyll` exist (FOUND-01).
7. **Touch targets:** spot-check that nav items and buttons carry `min-h-[44px]`
   / `min-height` ≥44px (FOUND-03).
8. **Page weight:** record `npm run build` First Load JS for `/`; confirm &lt;300KB
   (FOUND-07).
9. **Type + lint clean:** `npx tsc --noEmit` and `npm run lint` pass.
10. **Live verification:** Task 11.2 human checkpoint confirms all four success
    criteria on a real phone against the deployed URL.
</verification>

<success_criteria>
Phase 1 is complete when ALL are true:

- [ ] `npm run build` produces a static `out/` directory deployable to GitHub Pages (FOUND-01)
- [ ] Root layout renders header chrome (desktop nav + mobile bottom nav) and a footer with social links, CAC reg 3804623, and phone +234 703 239 1971 (FOUND-02)
- [ ] All interactive elements have ≥44px touch targets and the site is mobile-responsive (FOUND-03)
- [ ] `out/index.html` (and stub pages) contain server-rendered OG/Twitter meta tags (FOUND-04)
- [ ] Homepage hero shows brand name, tagline, hero image background, and a primary WhatsApp CTA above the fold at 390px (FOUND-05)
- [ ] A floating WhatsApp button is on every page and links to wa.me/message/WUS4HFGE7PKBO1 (FOUND-06)
- [ ] Initial homepage weight is under 300KB on mobile (FOUND-07)
- [ ] Bottom nav (Home/Shop/About/Order) with safe-area insets replaces a hamburger menu and is always visible on mobile (APP-01)
- [ ] Route changes animate via Motion v12 + gold top loading bar (APP-02)
- [ ] PWA manifest + service worker enable "Add to Home Screen" (APP-05)
- [ ] Lucide React icons are used consistently in nav, footer, badges, and CTAs (APP-08)
- [ ] Human checkpoint (Task 11.2) confirms all four Phase 1 success criteria on a real phone against the live URL
</success_criteria>

<source_audit>
## Multi-Source Coverage Audit

**GOAL (ROADMAP Phase 1):** "A real Mag'Beads URL is live on GitHub Pages — brand
name, nav, hero, floating WhatsApp button — ready for the TikTok bio."
→ COVERED by Tasks 1.1, 4.1 (chrome), 5.1 (hero), 3.3 (float), 10.1–10.3 + 11.2 (deploy).

**REQ (phase requirements):**

| Req | Covered by |
|-----|-----------|
| FOUND-01 | 1.1, 10.1, 10.2, 10.3, 11.2 |
| FOUND-02 | 2.1, 4.1, 6.1 |
| FOUND-03 | 1.4, 3.2, 3.3, 11.1 |
| FOUND-04 | 4.1, 9.1, 11.1, 11.2 |
| FOUND-05 | 3.1, 5.1 |
| FOUND-06 | 2.1, 3.3 |
| FOUND-07 | 10.1, 11.1 |
| APP-01 | 3.2, 11.1 |
| APP-02 | 3.3, 4.1, 4.2 |
| APP-05 | 4.1, 8.1, 10.1 |
| APP-08 | 3.1, 3.2, 6.1 |

**RESEARCH (RESEARCH.md):** scaffold (§1)→1.1; Tailwind v4 @theme (§2)→1.4; fonts
(§3)→4.1; GitHub Pages (§4)→10.1–10.3; toploader (§5)→4.1; Motion template (§6)→4.2;
PWA/serwist (§7)→8.1+10.1; OG meta (§8)→4.1+9.1; layout architecture (§9)→all routes;
BottomNav (§10)→3.2; FloatingWhatsApp (§11)→3.3; Hero (§12)→5.1; site config (§13)→2.1;
weight budget (§14)→11.1; deploy flow (§15)→10.x; pitfall checklist (§16)→honored
throughout. COVERED.

**CONTEXT (CONTEXT.md):** No `*-CONTEXT.md` exists in the phase directory; the
locked design decisions live in 01-UI-SPEC.md §13 ("Decisions Pre-Populated From
Upstream"), all of which are honored (dark canvas, bottom nav, gold loading bar,
Motion v12, Lucide, custom WhatsApp icon, PWA, 44px targets, safe-area insets,
100dvh, WhatsApp green CTA, gold luxury accent). COVERED.

**Exclusions (not gaps):** GALL-*, PERF-*, CONT-*, WA-*, PAY-* and APP-03/04/06(partial)/07
are scoped to Phases 2–4 per REQUIREMENTS.md traceability and 01-SKELETON.md
"Out of Scope". Skeleton shimmer, swipe gestures, bottom-sheets, snap scrolling,
real photography, and final designed icon/OG artwork are deferred content/feature
tasks per 01-SKELETON.md.

No unplanned in-scope items found.
</source_audit>

<output>
Create `.planning/phases/01-foundation/01-01-SUMMARY.md` when the plan completes.
The SKELETON.md architectural contract already exists at
`.planning/phases/01-foundation/01-SKELETON.md` — do not regenerate it; reference
it from the SUMMARY and note any deviations from its locked decisions.
</output>
