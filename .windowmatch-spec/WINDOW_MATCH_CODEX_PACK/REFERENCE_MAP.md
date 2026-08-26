# Reference map and priority

## Files

- `references/01-header-hero.png` — approved desktop header and hero direction. Highest visual priority.
- `references/02-homepage-sections.png` — rhythm and composition for homepage sections 2–8 and footer.
- `references/03-service-page-shared.png` — shared five-section service-page system. Use the layout for all three services, but replace every service-specific image and text.
- `references/04-responsive-mobile.png` — mobile stacking, menu, form and touch-target guidance.

## Priority when sources differ

1. Written business, content, accessibility and technical requirements in the Markdown files.
2. Approved palette and composition in `01-header-hero.png`.
3. Layout ideas in the other reference images.
4. The coding agent’s implementation judgment.

Text rendered inside reference images is illustrative and may contain image-generation artifacts. Do not copy spelling errors, conflicting claims, phone-like data, addresses, dates, company suffixes or wording from the pixels. Use the exact content in `03_HOME_PAGE.md`, `04_SERVICE_PAGES.md` and config placeholders instead.

## Implementation simplification

The visual effect must be built with CSS Grid, borders, backgrounds and a few pseudo-elements. Do not recreate every photographed frame or piece of hardware. Use one outer frame, meaningful pane dividers and a small reusable latch component. The site should feel inspired by window architecture without becoming a literal simulation.

## Image-generation rule

If an image-generation capability is available, create realistic, page-specific residential window images based on the subject of each page. If it is not available, use appropriately licensed realistic photographs, download them locally and record their sources in `IMAGE_CREDITS.md`. In either case, convert delivery assets to WebP and do not hotlink.

