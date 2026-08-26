# Window Match final QA checklist

Verified locally on August 25, 2026 against all supplied package specifications and all four reference images.

## Content and business model

- [x] The homepage contains exactly eight substantial `main > section` elements.
- [x] Each of the three service pages contains exactly five substantial `main > section` elements.
- [x] Service layouts are consistent while copy, metadata, hero images, supporting images and selected services are page-specific.
- [x] No telephone controls, telephone links, telephone fields or forbidden contractor-role claims are present.
- [x] Provider independence, variable availability and the absence of contracting guarantees are disclosed clearly.
- [x] No fabricated ratings, review counts, licenses, awards, prices or promised outcomes are used.
- [x] Privacy Policy, Terms of Service and Cookie Policy are complete.
- [x] No placeholder copy, lorem ipsum, empty links or unfinished sections remain.

## Visual direction

- [x] All four reference images were inspected before implementation.
- [x] Warm ivory, parchment, dark bronze, aged brass and restrained terracotta are used without blue interface treatments or gradients.
- [x] Typography is broad and readable; substantive body text is at least 16 pixels.
- [x] No numbered visual sections, decorative arrows, pill buttons, glassmorphism or repeated rounded-card layouts are used.
- [x] The shared header, homepage hero and all three service-page heroes use dark-bronze architectural frames, warm inset panels, narrow mullions and restrained brass detailing aligned with the supplied references.
- [x] Six original transparent raster assets depict actual aged-brass sash hardware, an architectural window, a repair wrench, an insulated-glass sample, a project clipboard and an engraved brass rosette.
- [x] Four additional original photographic material assets supply grainy garden-shadow frosted glass, a luminous garden transom, authentic patinated bronze and a genuinely transparent engraved brass CTA nameplate.
- [x] Decorative interface hardware and contextual pictograms are actual generated PNG images; no CSS-drawn latch, decorative square fallback, SVG icon sprite or SVG favicon is referenced by any page.
- [x] The homepage uses more than four clearly distinct section compositions.
- [x] Four original page-specific hero photographs and one original branded social image were generated.
- [x] Five additional original editorial photographs were generated for project preparation, residential atmosphere, installation details, repair hardware and insulated-glass seals.
- [x] Editorial photo pairs, page-specific close-up insets, practical captions and contextual project markers enrich every marketing section without inventing claims or guarantees.
- [x] The About section preserves the requested original full-width residential-window background, accessible dark overlay, gentle vanilla-JavaScript parallax and content-rich two-column comparison grid without reintroducing small inset photographs.
- [x] Marketing sections include practical photo guidance, expanded preparation details, project-specific service descriptions, contextual option summaries and an example project brief.
- [x] The homepage and each service page contain 15 substantive project-specific photographs, complemented by 34–42 generated contextual raster pictograms and genuine brass hardware images.
- [x] All 44 local WebP assets are below 300 KB; the largest optimized asset is the full-width generated About background at 296,816 bytes.
- [x] All seven transparent generated PNG assets retain a genuine alpha channel; contextual icons and sash hardware are approximately 24–77 KB each, and the richly detailed transparent brass nameplate is approximately 169 KB.
- [x] The three generated frosted-glass, garden-transom and patinated-bronze JPEG textures are individually optimized to approximately 72–201 KB.

## Responsive layouts

- [x] Every page was inspected at 1440, 1280, 1024, 902, 900, 768, 430, 390 and 360 pixels.
- [x] The exact 1280-pixel breakpoint was independently rechecked on all seven pages.
- [x] All 23 marketing sections remain within the viewport below the sticky header across 24 desktop viewport/breakpoint combinations, including 720-pixel-tall screens and a 1280 × 680 stress check.
- [x] All seven pages were rechecked at 360, 390, 430, 768, 900, 902, 1024, 1280 and 1440 pixels: 63 combinations without layout overflow, duplicate IDs, missing images or oversized desktop marketing sections.
- [x] No horizontal document overflow was found at any required viewport.
- [x] No clipped homepage or service-page headings or paragraphs remain.
- [x] Forms collapse to one comfortable column on narrow screens.
- [x] Images declare dimensions, retain stable aspect ratios and remain appropriately cropped.
- [x] Mobile navigation opens and closes, remains scrollable, locks body scrolling without a layout shift, traps keyboard focus, closes on Escape and returns focus to its trigger.
- [x] The desktop Services dropdown and mobile Services accordion expose all three relevant service links; the current service is correctly identified.
- [x] The wordmark and project action remain on one line across the tested desktop header widths.
- [x] The homepage service-pane group retains no outer border while the editorial photo markers remain contained within each pane.
- [x] Navigation, cookie choices, action buttons and footer links have accessible touch-target dimensions.

## Forms, configuration and delivery

- [x] The sole homepage request form submits to the shared `handler.php` endpoint using progressive enhancement.
- [x] Full name, email, ZIP code, service, property, window count, details and consent are checked by client and server.
- [x] A honeypot, minimum submit time, same-origin request checks, field limits and strict select whitelists are enforced.
- [x] Every service page contains its own original contextual CTA banner and links to `index.html#contact`; no service-page form remains.
- [x] Accessible field errors use `aria-invalid`, associated descriptions, alert messaging and first-error focus.
- [x] Consent starts unchecked; entered values remain available after validation errors.
- [x] JSON success is shown only after a real successful handoff to the configured mail transport.
- [x] Ordinary HTML form submission also succeeds when JavaScript is unavailable.
- [x] A genuine WebP attachment and a genuine 2.97 MB PNG attachment were accepted by a local test SMTP server.
- [x] Spoofed image content and files over 5 MB were rejected.
- [x] GET requests returned HTTP 405; cross-origin submissions returned HTTP 403; honeypot, timing and invalid-field cases returned HTTP 422.
- [x] Missing mail transport returned HTTP 503 without claiming a false success.
- [x] Company identity, footer description, corporate email, copyright, aggregator disclosure and success message are config-controlled.
- [x] The PHP recipient and sender are server-side configurable and documented independently from public JavaScript.
- [x] No form information is logged to the browser console.

## Accessibility and performance

- [x] Every page has a visible-on-focus skip link, semantic landmarks and exactly one H1.
- [x] Headings follow a logical structure, with labeled form inputs and announced status/error messages.
- [x] Keyboard focus is visibly outlined, and the full mobile menu focus cycle was verified.
- [x] Checked foreground/background combinations meet WCAG AA normal-text contrast; muted copy on ivory is approximately 4.72:1 and success messaging is approximately 4.57:1.
- [x] Reduced-motion media queries remove nonessential animations and JavaScript avoids initializing them when reduced motion is preferred.
- [x] All nondecorative below-fold images are lazy-loaded, and only the active page hero receives high image fetch priority.
- [x] All local page links, cross-page anchors, stylesheets, scripts, image references and legal links resolve.
- [x] PHP and all JavaScript files pass syntax checks.
- [x] No browser console errors or missing image assets were observed.

## Deployment limitation

- [x] Static-only and Cloudflare Worker-only hosting were not presented as compatible with the required PHP endpoint.
- [x] The project is documented for PHP-capable hosting with the shared configuration endpoint and a real production mail transport.
- [x] The local SMTP test server accepted test messages without forwarding them to an external recipient.
