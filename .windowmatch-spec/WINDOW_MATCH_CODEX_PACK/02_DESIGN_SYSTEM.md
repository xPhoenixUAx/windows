# Design system

## Visual concept

Treat the browser viewport as an architectural opening. Header modules resemble transom panes; content blocks align like clear and frosted glass panes; thin dark rules behave like mullions; tiny brass details suggest latches. This metaphor must remain elegant and restrained.

The references establish direction, not pixel-perfect screenshots. Keep the unusual composition while improving real-world readability and responsiveness.

## CSS tokens

```css
:root {
  --ink: #29251f;
  --bronze: #2f2a22;
  --bronze-soft: #51483a;
  --ivory: #f3eee3;
  --paper: #e8dfcf;
  --paper-light: #faf7f0;
  --terracotta: #ad4f31;
  --terracotta-dark: #873a24;
  --brass: #9b7a42;
  --brass-light: #c2a46b;
  --line: rgba(47, 42, 34, 0.28);
  --text-muted: #6e665c;
  --success: #43634a;
  --error: #9b342d;
  --container: 1440px;
  --gutter: clamp(16px, 3vw, 48px);
  --section-space: clamp(72px, 9vw, 144px);
  --radius-small: 2px;
}
```

Do not introduce blue. Avoid heavy shadows. Use subtle paper grain only if implemented with lightweight CSS or a tiny local texture.

## Typography

Use locally hosted or Google Fonts with sensible fallbacks:

- Display/headings: `Manrope`, `Inter Tight` or `Archivo` at 600–700.
- Body/UI: `Inter`, `Manrope` or system sans at 400–600.

Do not use ultra-condensed industrial fonts. Keep body text at least 16 px desktop and mobile. Preferred measures: 55–72 characters. Suggested headline sizing:

```css
.display { font-size: clamp(3rem, 7vw, 7.5rem); line-height: .92; letter-spacing: -.055em; }
.section-title { font-size: clamp(2.25rem, 4.4vw, 5rem); line-height: .98; letter-spacing: -.045em; }
.service-title { font-size: clamp(2.6rem, 6vw, 6.5rem); line-height: .94; }
```

## Header

Desktop:

- 88–108 px tall, sticky, high z-index.
- One dark-bronze outer frame and subtle vertical dividers.
- Logo in the left pane, nav in the central glass pane, project action in the right pane.
- Active nav uses a 2 px terracotta tick or latch, not an underline spanning the item.
- Project action resembles a refined brass label/latch. It may be a rectangular metal tab, but not a generic filled button and not an arrow control.
- Sticky state may reduce height slightly and increase background opacity.

Mobile:

- 68–76 px bar with wordmark and custom `Menu` control using two fine lines plus a tiny brass latch motif.
- Open navigation fills the viewport below/including the header, scrolls vertically, locks body scroll and reveals links with a short stagger.
- Include the three services, Start a project and an aggregator support line.

## Buttons and links

- Primary form submit: muted terracotta rectangular control, 48–56 px height, 0–2 px radius, no icon.
- Architectural CTA: text paired with a small brass latch plate; on hover the latch shifts 4–6 px or rotates up to 8 degrees. Do not add an arrow.
- Text links: short terracotta underline that expands, no arrow glyph.
- Minimum touch target: 48 × 48 px.

## Pane system

Use `.frame-grid`, `.pane`, `.pane--clear`, `.pane--frosted`, `.mullion` utilities. The effect should come from grid tracks and 1–3 px borders, not dozens of nested divs.

- Desktop: 12-column grid where useful.
- Tablet: 8 columns.
- Mobile: content becomes one column; retain only the most meaningful dividers.
- Most sections should have square corners. Small 2 px radius is acceptable for inputs.
- Alternate clear photography, ivory surfaces and open whitespace.

## Motion

Motion must explain the window metaphor:

- hero panes reveal with `clip-path: inset()` or scale/translate lasting 700–1000 ms;
- thin mullions draw into place;
- headings rise 20–28 px with opacity;
- latch details move subtly on hover;
- below-fold sections reveal once with IntersectionObserver or GSAP.

No continuous parallax, bouncing arrows, cursor followers, page-wide smooth scrolling or Lenis. Disable nonessential motion under `prefers-reduced-motion: reduce`.

