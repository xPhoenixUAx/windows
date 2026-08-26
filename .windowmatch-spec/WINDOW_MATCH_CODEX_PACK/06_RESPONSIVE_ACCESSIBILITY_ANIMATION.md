# Responsive, accessibility and animation specification

Use `references/04-responsive-mobile.png` as behavioral guidance, not exact content.

## Breakpoints

- Large desktop: 1200–1440 px content behavior.
- Desktop/tablet: 1024–1199 px.
- Tablet: 768–1023 px.
- Mobile: 360–767 px.
- The layout must remain usable above 1440 px and must never break below 360 px.

Prefer intrinsic CSS with `minmax()`, `clamp()`, `auto-fit`, aspect ratios and container constraints. Media queries refine rather than rebuild everything.

## Header/mobile menu

- Desktop header converts to mobile at approximately 900 px if nav no longer fits.
- Menu button exposes `aria-expanded`, `aria-controls` and an accessible name.
- Opening moves focus into the menu; Escape closes; closing returns focus to the trigger.
- Trap keyboard focus while open.
- Lock body scrolling without causing horizontal layout shift.
- The panel itself can scroll on short screens.
- Links have a minimum 48 px tap height.

## Hero transformation

Do not squeeze the desktop grid into tiny columns.

At mobile:

1. compact header;
2. shallow panoramic image transom;
3. frosted headline/copy pane;
4. main image at 4:3 or 3:2;
5. three service rows separated by rules;
6. architectural CTA row.

Headline target: `clamp(3rem, 14vw, 4.4rem)` but reduce if it creates awkward one-word lines. Keep the first viewport informative without forcing the entire hero into 100vh.

## Section behavior

- Desktop asymmetric panes stack into clear mobile reading order.
- Do not use horizontal carousels for essential content.
- Concern/options grids become one or two columns depending on available width.
- Photographs retain stable aspect ratios to prevent layout shift.
- Forms become one field per row below 700 px.
- Footer groups stack with visible separators.
- Avoid sticky CTA bars on mobile because they compete with form and browser controls.

## Accessibility

- One unique H1 per page; headings follow a logical hierarchy.
- Add a visible skip link.
- Use native buttons/links/inputs, not clickable divs.
- Full keyboard navigation and visible `:focus-visible` state using terracotta plus a high-contrast offset.
- Normal text contrast at least 4.5:1.
- Every input has a persistent label; placeholders are examples only.
- Error/success states are not conveyed by color alone.
- Decorative latch elements use `aria-hidden="true"`.
- Alt text describes the actual relevant window condition; decorative imagery uses empty alt.
- Current navigation uses `aria-current="page"`.
- Accordions, if any, use buttons and correct expanded state. Avoid accordions when straightforward content is clearer.

## Animation specification

Allowed implementation: CSS transitions plus IntersectionObserver, or GSAP CDN.

- Initial header: 350–500 ms fade/translate.
- Hero photo pane: 800–1000 ms clipped reveal.
- Frosted copy: 650–850 ms rise/fade.
- Mullions: scale from 0 to 1 with transform origin matching the line.
- Below-fold sections: 500–700 ms, 18–28 px movement, stagger maximum 80 ms.
- Hover transitions: 180–260 ms.
- Never animate width/height for layout-critical elements; animate transform/opacity/clip-path.
- Do not hide core content before JavaScript loads. Add animation classes only after JS initialization.

Under reduced motion, remove transforms, clip animations, staggers and smooth scrolling; content appears immediately.

## Performance

- Initial page should not eagerly load below-fold images.
- Avoid videos and large canvas effects.
- Preload only the active page’s display font subset and hero image when justified.
- Use `font-display: swap`.
- Debounce expensive resize logic or avoid it through CSS.
- Target good Core Web Vitals and Lighthouse accessibility/performance scores of 90+ where hosting permits.

