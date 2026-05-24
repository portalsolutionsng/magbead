# Pitfalls Research — Magbead

**Domain:** Artisan jewelry portfolio + shop, Nigerian market, TikTok traffic
**Researched:** 2026-05-24
**Confidence:** HIGH (most verified via official docs and multiple sources)

---

## Performance Pitfalls

### Phone photos served raw, no optimization pipeline
- **Warning sign**: `<img>` tags used directly with local JPEGs/PNGs from phone, or `next/image` with `unoptimized={true}` set globally without a real alternative. Lighthouse performance score below 50 on mobile. Images over 500KB visible in Network tab.
- **Prevention**: Use `next/image` with Vercel's built-in image optimization (available when deployed to Vercel with standard Next.js build, NOT `output: 'export'`). Vercel optimizes on-demand — phone JPEGs get converted to WebP/AVIF and resized to screen width automatically. Set explicit `width` and `height` on every `<Image>` to prevent layout shift. Mark only the above-the-fold hero image with `priority`, not every gallery image.
- **Phase**: Phase 1 (gallery build) — establish the pattern from day one; retrofitting is painful

### Missing `sizes` prop causes oversized image downloads on mobile
- **Warning sign**: `next/image` renders at 100vw equivalent on a phone even though layout is 50% column. Network tab shows 1200px image downloaded on a 390px screen.
- **Prevention**: Always set `sizes` to match actual rendered width. For a full-width mobile gallery: `sizes="(max-width: 768px) 100vw, 50vw"`. This tells Next.js which srcset entry to pick.
- **Phase**: Phase 1

### Too many `priority` images stall First Contentful Paint
- **Warning sign**: Five or more `<Image priority>` tags on the gallery page. Browser is forced to fetch all of them before first paint.
- **Prevention**: `priority` on the single above-the-fold image only (hero/banner). All gallery thumbnails use lazy loading (default).
- **Phase**: Phase 1

### No performance budget for Nigerian 3G/4G reality
- **Warning sign**: Page weight over 1MB total. No Lighthouse mobile audit run on a throttled connection. Average Nigerian 4G speed is ~10-15 Mbps on MTN/Airtel but drops significantly with congestion. 3G is still widespread outside Port Harcourt.
- **Prevention**: Target under 300KB for initial page load (HTML + critical CSS + hero image). Run Lighthouse with "Slow 4G throttling" profile before each deployment. Keep total image weight per page under 2MB. Compress phone photos to 80-100KB thumbnails; full-size on demand only.
- **Phase**: Phase 1 (set the budget), Phase 2 (verify against real content)

---

## WhatsApp Integration Pitfalls

### Wrong phone number format in wa.me link
- **Warning sign**: Link opens WhatsApp with "invalid number" error, or opens a blank chat, or opens the number as-is without connecting.
- **Prevention**: Nigerian numbers must strip the leading `0` and prepend `234` (no `+`, no spaces, no dashes). Magbead's existing link `wa.me/message/WUS4HFGE7PKB01` is a direct message shortlink — this is actually valid and bypasses number format entirely. If switching to a standard number format: `https://wa.me/2348XXXXXXXXX`. Verify by clicking the link on a real phone before launch.
- **Phase**: Phase 1

### Pre-filled message text not URL-encoded
- **Warning sign**: `?text=I want to order a bead necklace` in the URL — spaces and special characters break the link silently on some Android browsers. Link opens WhatsApp but text field is empty or truncated.
- **Prevention**: Always URL-encode the pre-fill text. Spaces become `%20`, not `+`. Use `encodeURIComponent()` in JavaScript: `https://wa.me/2348XXXXXXXXX?text=${encodeURIComponent('Hi, I want to order...')}`. Test on Chrome Android and Safari iOS.
- **Phase**: Phase 1

### Pre-filled message requires user to still tap Send
- **Warning sign**: Customers complain orders aren't received even though they "clicked the button". The wa.me pre-fill only populates the text field — the user must press send themselves.
- **Prevention**: Design the CTA copy to say "Chat on WhatsApp" not "Order on WhatsApp" to set accurate expectations. Make the pre-filled message short and self-explanatory so users know what to do when WhatsApp opens.
- **Phase**: Phase 1 (copy decision)

### WhatsApp link opens browser instead of app on some Android devices
- **Warning sign**: Testers report the link opens m.whatsapp.com in browser instead of the installed app.
- **Prevention**: The `wa.me` domain is the official WhatsApp deep link — it should trigger the app. The direct message shortlink format (`wa.me/message/...`) that Magbead already uses is equally reliable. Ensure the link is a true `<a href>` tag, not a JavaScript `window.open()` call — mobile browsers block app switching from JS-initiated navigation on click for security reasons.
- **Phase**: Phase 1

---

## Paystack Pitfalls

### Secret key exposed client-side via NEXT_PUBLIC_ prefix
- **Warning sign**: `NEXT_PUBLIC_PAYSTACK_SECRET_KEY` in `.env.local`. Any variable with the `NEXT_PUBLIC_` prefix is bundled into the JavaScript sent to every browser visitor.
- **Prevention**: Never prefix the Paystack secret key with `NEXT_PUBLIC_`. Only the public key is safe for the browser: `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_...`. The secret key (`sk_live_...`) must live only in server-side code — a Next.js API Route or Route Handler. The API route calls Paystack's `/transaction/verify` and returns a result to the client.
- **Phase**: Phase 3 (Paystack integration phase) — must be enforced from the first line of code

### Test keys shipped to production (or live keys used during development)
- **Warning sign**: Paystack dashboard shows test transactions appearing in live mode, or vice versa. Payment page accepts card numbers but no money moves.
- **Prevention**: Use `pk_test_`/`sk_test_` in development and `pk_live_`/`sk_live_` in production. Set separate environment variables in Vercel's dashboard for Preview and Production environments. Never copy-paste keys between environments. Payment pages and invoices created in test mode are NOT visible in live mode — they must be recreated.
- **Phase**: Phase 3

### Paystack account not active — Inline/Popup will hard-fail
- **Warning sign**: Paystack popup initializes but closes immediately with no error shown to user. Console shows a Paystack API error about account not being activated.
- **Prevention**: The PROJECT.md explicitly notes that Paystack account is not yet verified. The Paystack page should be built and styled but gated behind a feature flag or simply not linked from the main navigation until the account is activated. Do not attempt to test with real card flows until live keys are available.
- **Phase**: Phase 3 — build the page, add a visible "Coming soon" state that can be toggled

### Webhook signature verification missing
- **Warning sign**: Webhook endpoint accepts any POST request without validating the `x-paystack-signature` header. Any bad actor can send fake payment confirmations.
- **Prevention**: Verify the HMAC SHA512 signature on every webhook event using the secret key. In test mode, webhooks retry hourly for 10 hours; in live mode they retry every 3 minutes for 4 attempts then hourly for 72 hours. Always return a 200 response quickly even if processing fails, then process asynchronously.
- **Phase**: Phase 3 (only relevant once webhooks are needed for order confirmation)

### Paystack webhook requires a public URL — localhost won't receive events
- **Warning sign**: Webhook events show as undelivered in Paystack dashboard during local development.
- **Prevention**: Use ngrok or Vercel preview deployments to expose a public URL during development and testing. Set the webhook URL in the Paystack dashboard to the preview URL, not localhost.
- **Phase**: Phase 3

---

## Vercel Free Tier Pitfalls

### Hobby plan prohibits commercial use — Paystack integration violates ToS
- **Warning sign**: Site accepts payments from visitors on a Hobby plan deployment.
- **Prevention**: This is the most critical hosting pitfall for this project. Vercel's Hobby plan explicitly bans "any method of requesting or processing payment from visitors" and defines any financial-gain activity as commercial use. The WhatsApp-only phase (no Paystack) is almost certainly fine as the site is not processing payments. Once Paystack activates, the project must upgrade to Vercel Pro ($20/month) or switch to a compatible free host (Netlify, Cloudflare Pages — which have no commercial use restriction on free plans). Plan this migration before Paystack goes live.
- **Phase**: Phase 3 — trigger the hosting decision before enabling Paystack

### 100GB bandwidth hard cap — site goes offline, no warning
- **Warning sign**: Month is nearly over and a TikTok video goes viral. No bandwidth monitoring configured.
- **Prevention**: Vercel Hobby hard-stops at 100GB — no throttling, no grace period, site goes down until next billing cycle. For a photo-heavy artisan site with large images, 100GB sounds large but a single viral TikTok sending 10K visits to image-heavy pages could burn through it. Mitigate by: aggressive image optimization (less bytes per visit), setting up a Vercel usage alert, and having a plan to upgrade to Pro if traffic spikes.
- **Phase**: Phase 1 (image optimization) and Phase 2 (usage monitoring setup)

### Serverless function cold starts affect Paystack API route response time
- **Warning sign**: First payment attempt after a period of inactivity takes 3-5+ seconds to respond. Users may think the payment failed and tap twice.
- **Prevention**: The Hobby plan has no cold start prevention (Pro gets Fluid Compute). For the Paystack API route, add a loading state to the payment button that remains active until the server responds. Keep the API route as lean as possible — no large imports, no database connections on cold boot. Consider pre-warming by calling the route on page load (without triggering payment) if latency is critical.
- **Phase**: Phase 3

### Hobby plan function timeout: 10 seconds default
- **Warning sign**: Paystack transaction verification takes longer than 10 seconds (network issue, slow Paystack response) and returns a timeout error silently.
- **Prevention**: Add explicit timeout handling in the API route. Return a user-friendly error if the Paystack call doesn't respond within 8 seconds. Log failures. The 10-second limit on Hobby is enough for Paystack under normal conditions, but Nigerian network latency to Paystack's servers (Lagos-based) should be tested.
- **Phase**: Phase 3

---

## Mobile UX Pitfalls

### iOS Safari bottom bar steals touch events from CTAs
- **Warning sign**: "Order on WhatsApp" button is fixed to the bottom of the screen. iOS testers report needing two taps to activate it — first tap wakes the Safari toolbar, second tap hits the button.
- **Prevention**: Keep fixed/sticky CTAs at least 60px above the bottom of the viewport on iOS, or use `padding-bottom: env(safe-area-inset-bottom)` to push content above the safe area. Alternatively, make the CTA part of scroll flow rather than fixed-position.
- **Phase**: Phase 1

### 100vh overflows under iOS Safari dynamic toolbar
- **Warning sign**: Full-height hero section is partially obscured by Safari's address bar. Layout looks correct in browser DevTools but broken on a real iPhone.
- **Prevention**: Replace `height: 100vh` with `height: 100dvh` (dynamic viewport height, supported in Safari 15.4+). For older Safari, use the fallback: `height: 100vh; height: 100dvh;`. Avoid `height: -webkit-fill-available` as it behaves inconsistently across iOS versions.
- **Phase**: Phase 1

### Gallery swipe conflicts with iOS Safari back gesture
- **Warning sign**: Users swiping horizontally through the gallery on iPhone accidentally trigger the browser's "go back" gesture and leave the site.
- **Prevention**: Use a gallery component with `touch-action: pan-y` on the track, allowing vertical scroll but capturing horizontal swipes before the browser sees them. Avoid full-screen swipeable galleries that span the full viewport width — they compete with the browser's edge swipe zone. Libraries like Swiper.js handle this correctly by default.
- **Phase**: Phase 2 (gallery interaction layer)

### Touch targets too small for bead detail taps
- **Warning sign**: Gallery thumbnails smaller than 44x44px. Filter/category buttons narrower than 44px. Apple HIG minimum is 44pt; Google recommends 48dp.
- **Prevention**: Minimum touch target of 44x44px for all interactive elements. For small visual elements (thumbnail image itself can be small), use padding or a larger invisible hit area via `::after` pseudo-element. Category filter chips need at least 44px height with horizontal padding.
- **Phase**: Phase 1 (design system) and Phase 2 (gallery)

### Pinch-to-zoom disabled on product images
- **Warning sign**: `<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">` — disabling zoom is a common copy-paste mistake. Bead jewelry buyers need to inspect fine detail.
- **Prevention**: Never set `user-scalable=no` or `maximum-scale=1`. Let the browser's native pinch-to-zoom work on product images. If a custom lightbox is added, ensure it supports pinch-to-zoom natively.
- **Phase**: Phase 1

---

## Content / Phone Photography Pitfalls

### Inconsistent image aspect ratios break grid layout
- **Warning sign**: Gallery grid has jagged heights — some images landscape, some portrait, some square. The layout looks chaotic and amateur, not luxurious.
- **Prevention**: Before building the gallery, establish a single aspect ratio for all gallery cards (1:1 square is most robust for bead jewelry). Use CSS `aspect-ratio: 1/1` with `object-fit: cover` on the image. This crops to the ratio regardless of source image dimensions, creating a consistent grid. Communicate this constraint when the client submits photos.
- **Phase**: Phase 2 (gallery)

### Raw phone photos uploaded directly (EXIF data, massive file size)
- **Warning sign**: Image files in `/public` are 3-8MB. iPhone photos contain GPS location data in EXIF. Page load is slow.
- **Prevention**: Strip EXIF metadata and resize before committing images to the repo. Use `sharp` (available in Next.js build pipeline) or a free tool like Squoosh.app (web-based, no install needed) to resize to max 1920px wide and export as progressive JPEG at 80% quality. Target 100-200KB per image. This is a content pipeline step, not a code step.
- **Phase**: Phase 2 (content preparation sprint before gallery goes live)

### Dark, blurry, or yellow-tinted photos undermine a luxury brand
- **Warning sign**: Photos taken indoors under warm incandescent lights. No editing applied. Images look low-effort for a brand positioning itself as "Topnotch Quality, Luxury".
- **Prevention**: This is a client communication issue, not a code issue. Add a content brief to the project: photos should be taken near a window in natural daylight, on a neutral background (white fabric or dark fabric — both work for beads), with the phone camera in portrait or square mode. Basic editing in Snapseed (free Android/iOS) to adjust brightness and correct white balance takes 30 seconds per photo and makes an enormous difference. Document this as a handoff requirement.
- **Phase**: Phase 0 (before any gallery work) — set the expectation before receiving content

### No fallback for missing or broken images
- **Warning sign**: A product image file is renamed, moved, or deleted. The gallery shows a broken image icon with no graceful fallback.
- **Prevention**: Use `next/image`'s `onError` handler to swap to a placeholder image. Create a branded placeholder (Magbead logo on a neutral background) that shows when an image fails to load. This also protects against TikTok video thumbnails being used as product images (they often 403 when hotlinked).
- **Phase**: Phase 2

---

## SEO / OG Tag Pitfalls

### Missing Open Graph tags — TikTok bio link shows as plain URL, no preview card
- **Warning sign**: Sharing the site URL in a TikTok comment or DM shows the raw URL with no image, no title, no description. TikTok's crawler (TikTokSpider) reads OG tags from the raw HTML.
- **Prevention**: Every page needs at minimum: `og:title`, `og:description`, `og:image`, `og:url`. In Next.js App Router, use the `metadata` export in `layout.tsx` for site-wide defaults and override per page. The OG image must be an absolute HTTPS URL (not a relative path). Set it in `next.config.js` or generate it via `next/og`. Critical: TikTokSpider does NOT execute JavaScript — OG tags must be present in server-rendered HTML, not injected client-side.
- **Phase**: Phase 1 (site foundation — OG tags are a layout-level concern)

### OG image wrong dimensions — shows as small icon or crops badly
- **Warning sign**: OG image set to a 400x400 or 800x600 PNG. WhatsApp and TikTok crop or shrink it unpredictably.
- **Prevention**: OG image must be 1200x630px (standard 1.91:1 ratio). Use an absolute HTTPS URL. Set both `og:image:width` and `og:image:height` meta tags. PNG or JPG, under 5MB. Center the most important content — platforms crop from edges. Keep text large (40px+ equivalent) since the image is displayed small in link previews.
- **Phase**: Phase 1

### Client-side metadata injection not read by social crawlers
- **Warning sign**: Using `document.title = ...` or `useEffect(() => { /* set meta tags */ })` to set metadata. Works in browser, invisible to TikTok/WhatsApp crawlers.
- **Prevention**: In Next.js App Router, use the `export const metadata = { ... }` static export or `generateMetadata()` async function — both inject tags into the server-rendered HTML before it reaches any crawler. Never rely on client-side JavaScript to set OG tags.
- **Phase**: Phase 1

### WhatsApp link preview stale after site update
- **Warning sign**: WhatsApp shows old title/image for the site URL even after the site has been updated.
- **Prevention**: WhatsApp caches OG data aggressively. Use a unique URL per major content change if cache-busting is critical (e.g., `/home?v=2`). For initial launch, just get the tags right — cache staleness is a minor issue compared to missing tags entirely.
- **Phase**: Phase 2 (post-launch)

---

## Next.js Static Export Pitfalls

### Using `output: 'export'` breaks image optimization
- **Warning sign**: Next.js build error: "Image Optimization using Next.js' default loader is not compatible with `next export`". Or images build successfully but are never converted to WebP/AVIF — users download raw phone JPEGs.
- **Prevention**: Do NOT use `output: 'export'` if image optimization matters (it does). Deploy to Vercel with a standard `next build` — Vercel handles image optimization server-side via the `/_next/image` route. Static export removes this capability entirely. If GitHub Pages or Cloudflare Pages static hosting is required later, use `next-image-export-optimizer` package as a workaround, which pre-processes images at build time.
- **Phase**: Phase 1 — architecture decision before writing the first page

### `output: 'export'` breaks API Routes and Server Actions
- **Warning sign**: Paystack API route builds without error in development but 404s in the deployed static export. Or Server Actions throw "Server Actions require a server" build errors.
- **Prevention**: API Routes and Server Actions both require a running Node.js server. A static export generates only HTML/CSS/JS files — there is no server to handle `POST /api/paystack`. Sticking with Vercel's standard deployment (not static export) is the correct choice for this project, which needs a Paystack API route in Phase 3.
- **Phase**: Phase 1 — choosing `output: 'export'` now locks out Paystack integration later

### `output: 'export'` with dynamic routes requires `generateStaticParams`
- **Warning sign**: Dynamic gallery routes like `/product/[id]` cause a build error in static export: "Page `/product/[id]` is missing `generateStaticParams()`".
- **Prevention**: If static export is ever used for any reason, every dynamic route needs `generateStaticParams()` to enumerate all possible slugs at build time. This means every time a product is added, a rebuild and redeploy is required. No CMS + static export = manual rebuild on every content change.
- **Phase**: Not applicable if standard Vercel deployment is used (recommended)

---

## Phase Reference Summary

| Phase | Critical Pitfalls to Address |
|-------|------------------------------|
| Phase 0 (pre-build) | Phone photo quality brief to client, Vercel commercial use policy decision |
| Phase 1 (foundation) | OG tags in layout, `next/image` pattern, no `output: export`, iOS Safari 100dvh, touch targets |
| Phase 2 (gallery) | Consistent aspect ratios, image file prep (Squoosh), swipe vs back gesture, missing image fallback |
| Phase 3 (Paystack) | Upgrade to Vercel Pro before enabling, secret key server-side only, test vs live keys, account activation gate |
| Post-launch | Bandwidth monitoring, WhatsApp link testing on real devices, OG tag validation via shared link |

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Performance / image optimization | HIGH | Verified against Next.js official docs and multiple implementation guides |
| WhatsApp link format | HIGH | Official wa.me documentation and Nigerian country code (+234) format confirmed |
| Paystack pitfalls | HIGH | Verified against Paystack official developer docs; secret key exposure pattern confirmed by Next.js data security guide |
| Vercel Hobby commercial use | HIGH | Verified against official Vercel Terms of Service and Fair Use Guidelines — payment processing explicitly listed as commercial use |
| Vercel bandwidth hard cap | HIGH | Confirmed by Vercel community and multiple pricing breakdown sources |
| iOS Safari 100vh / bottom bar | HIGH | Known browser behavior, `100dvh` solution confirmed in Safari 15.4+ |
| `output: 'export'` limitations | HIGH | Documented in Next.js official static exports guide |
| OG/TikTok preview | MEDIUM | TikTokSpider OG behavior confirmed; exact TikTok crawler behavior changes occasionally |
| Phone photo quality | MEDIUM | Product photography best practices are well-established; specific impact on sales is anecdotal |
