# Project requirements and file structure

## Required pages

- `index.html` — eight-section homepage.
- `window-installation-replacement.html` — five-section service page.
- `window-repair.html` — five-section service page.
- `glass-seal-repair.html` — five-section service page.
- `privacy.html` — Privacy Policy.
- `terms.html` — Terms of Service.
- `cookie-policy.html` — Cookie Policy.

About, How It Works and Contact may be homepage anchors. Navigation from inner pages must link back to the correct homepage anchors.

## Required file tree

```text
/
├── index.html
├── window-installation-replacement.html
├── window-repair.html
├── glass-seal-repair.html
├── privacy.html
├── terms.html
├── cookie-policy.html
├── handler.php
├── favicon.svg
├── config/
│   └── site-config.js
├── css/
│   ├── base.css
│   ├── animations.css
│   ├── bundle.css
│   └── pages/
│       ├── home.css
│       ├── service.css
│       └── legal.css
├── js/
│   ├── main.js
│   └── animations.js
└── img/
    ├── common/
    ├── home/
    └── services/
```

`bundle.css` must import the relevant modular CSS files. Do not duplicate large style blocks in HTML.

## Shared page shell

- Semantic landmarks: `header`, `nav`, `main`, `section`, `footer`.
- Skip-to-content link.
- Sticky desktop header designed as a narrow transom/window frame.
- Full-screen mobile navigation with body scroll lock.
- Shared footer with company identity, page links, all service links, corporate email, address, legal links and aggregator disclosure.
- Cookie banner with Accept, Reject non-essential and Preferences actions. Essential-only behavior is acceptable because no analytics are required.
- No telephone number, telephone icon, `tel:` link or phone form input anywhere.

## Image requirements

Create or source **different realistic images for each page and subject**. Shared design does not mean shared imagery.

- Homepage: hero window wall, three service details, concern/detail image, preparation image, homeowner/interior image.
- Installation page: replacement exterior, worn opening/detail, six window-type examples.
- Repair page: sticking sash/hardware/frame damage and repair-related details.
- Glass page: fogged insulated glass, condensation, cracked glass and failed seal details.

Save final assets locally as WebP, normally 1400–2000 px wide for heroes and 700–1100 px for content. Aim for less than 250 KB per image where practical. Always set width, height, `aspect-ratio`, `object-fit`, descriptive `alt`, `loading="lazy"` below the fold and `fetchpriority="high"` only on the active hero.

Do not use futuristic renderings, stock-photo watermarks, repeated hero images or photos containing legible branding.

## Baseline quality

- Valid internal links and anchors.
- No placeholder text, lorem ipsum, empty cards or `href="#"`.
- No console errors.
- No horizontal scrolling at 360 px.
- All interactive elements work with keyboard and visible focus.
- Respect `prefers-reduced-motion`.
- Use progressive enhancement: the site and forms remain understandable without animation.

