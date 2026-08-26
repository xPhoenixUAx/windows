# Image sources and generation notes

All displayed imagery is stored inside `img/` as WebP. No page hotlinks its images. Supporting photographs were sourced from Unsplash image URLs and transformed by the image provider to WebP; the final local images were additionally optimized where appropriate. Review the current Unsplash license before using individual photographs commercially.

## Original generated images

Mode: built-in Codex image-generation tool, followed by local WebP optimization. The source PNGs remain outside the project; the project consumes these optimized files:

- `img/home/hero-window-wall-generated.webp`: homepage architectural hero.
- `img/services/installation-hero-generated.webp`: installation and replacement hero.
- `img/services/repair-hero-generated.webp`: window-repair sash and hardware hero.
- `img/services/glass-hero-generated.webp`: insulated-glass condensation and seal hero.
- `img/common/social-card.webp`: branded Open Graph and social sharing artwork.
- `img/home/project-materials-generated.webp`: original editorial project-notes, measuring-tape and hardware still life.
- `img/home/window-atmosphere-generated.webp`: original residential reading corner and bronze-window architectural photograph.
- `img/services/installation-detail-generated.webp`: original replacement-frame and residential-opening installation detail.
- `img/services/repair-detail-generated.webp`: original aged-brass latch, timber sash and operating-track repair detail.
- `img/services/glass-detail-generated.webp`: original insulated-glass spacer, trapped-moisture and glazing-seal detail.

### Homepage hero prompt

> Use case: photorealistic-natural. Asset type: homepage hero image for a premium independent residential window-project website. Primary request: a genuinely realistic editorial architectural photograph of a warm lived-in residential living room whose main subject is an expansive dark-bronze framed window wall looking into a lush private garden. Composition: wide landscape image, clear dominant architectural window opening, linen sofa partially visible, muted warm ivory plaster, real imperfect natural textures, welcoming ordinary upscale home, no people. Lighting: soft late-afternoon sunlight, authentic camera photograph, realistic lens depth, never CGI. Constraints: no text, no logos, no watermark, no blue, no futuristic architecture, no rendered/CGI appearance.

### Installation hero prompt

> Use case: photorealistic-natural. Asset type: hero photograph for a residential window installation and replacement service page. Primary request: authentic editorial photograph of the exterior of an attractive traditional residential home with newly replaced elegant bronze-framed casement and double-hung windows installed in warm white clapboard and aged red-brown brick, small flowering garden. Composition: landscape, medium-close architectural composition centered on three real window openings, warm muted foliage, human-scale ordinary home. Lighting: gentle natural golden daylight, true-to-life documentary photography. Constraints: no people, no text, no logos, no watermarks, no blue, no futuristic architecture, must look like an actual high-end camera photograph not a 3D render.

### Repair hero prompt

> Use case: photorealistic-natural. Asset type: hero photograph for a residential window repair page. Primary request: beautifully photographed real older double-hung residential timber sash window with a visibly worn painted wood frame, slightly sticking sash track, and authentic aged-brass latch and operating hardware in clear focus. Composition: landscape editorial architectural detail, genuine warm home interior, garden foliage softly visible through window, believable localized wear, the worn sash and hardware are the main subject. Lighting: soft natural side light, filmic documentary realism. Constraints: no people or tools, no text, no logos, no watermark, no blue, no futuristic design, no CGI.

### Glass and seal hero prompt

> Use case: photorealistic-natural. Asset type: hero photograph for a glass and seal repair residential website. Primary request: realistic close architectural photograph of a dark bronze residential insulated window showing believable subtle fogging and condensation visibly trapped BETWEEN the glass panes near one lower edge, with real warm wood trim and muted garden foliage behind. Composition: wide landscape, clear view of the glass, window seal perimeter and authentic condensation droplets, elegant editorial home photo while the failed-seal condition is unmistakable. Lighting: soft warm overcast daylight, natural real-camera depth of field. Constraints: no people, no text, no logos, no watermarks, no blue color cast, no artificial 3D render, no broken hazardous dramatic effects.

### Social card prompt

> Use case: ads-marketing. Create an original wide landscape social-preview card for an independent residential-window introductions website: sophisticated architectural editorial brand card with impeccable readable typography, realistic residential window, warm ivory and parchment, slender dark-bronze mullions, one aged-brass latch and soft garden foliage. Use broad neo-grotesk typography. Prominent exact title: “Window Match”. Exact supporting headline: “Every opening starts somewhere.” Palette: #f3eee3, #e8dfcf, #29251f, #9b7a42, #ad4f31. No blue, gradients, arrows, rounded cards, extra text, watermark or generic startup imagery.

### Supplemental project-materials prompt

> Use case: photorealistic-natural. Create an impeccably realistic warm architectural still-life on a pale limestone windowsill: an open completely blank cream paper notebook, a modest brass measuring tape, two slim aged-bronze window-hardware samples, a small clear insulated-glazing cross-section and soft linen cloth. Show a gently blurred garden beyond an adjacent bronze-framed residential window. Wide landscape composition; documentary interior photography; authentic ivory, terracotta, walnut and late-afternoon sunlight. No people, hands, text, branding, watermarks, blue, gradients or CGI.

### Supplemental residential-atmosphere prompt

> Use case: photorealistic-natural. Photograph an authentic lived-in residential reading corner with a broad dark-bronze framed window, softly folded natural linen curtains, a walnut windowsill, one ceramic vessel and long warm afternoon window shadows on textured ivory plaster. Keep the window opening, glazing and daylight unmistakably dominant, with garden foliage gently out of focus. Wide landscape, realistic editorial architectural photography. No people, hands, lettering, logos, watermarks, blue cast or CGI.

### Supplemental installation-detail prompt

> Use case: photorealistic-natural. Show a genuine bronze-painted aluminum casement window frame precisely seated within a natural unfinished residential wall opening, with an exposed narrow timber reveal, a small practical brass measuring tape resting on the sill and believable surrounding warm white plaster. Emphasize frame depth, square alignment, sill, surrounding trim and garden daylight. Tight landscape architectural detail in ivory, walnut, brass and terracotta. No people, hands, lettering, logos, watermarks, blue or CGI.

### Supplemental repair-detail prompt

> Use case: photorealistic-natural. Show an authentic older painted timber double-hung sash with a prominent worn aged-brass crescent latch, a slightly dusty sash track, subtly chipped ivory paint and realistic localized wear. Focus closely on the latch, meeting rail and movement channel, with warm indoor daylight and soft garden foliage beyond the glass. Wide landscape documentary photography. No people, hands, text, logos, watermarks, blue or artificial rendering.

### Supplemental glass-detail prompt

> Use case: photorealistic-natural. Photograph a true dark-bronze residential double-pane insulated glass corner and its slim perimeter spacer, with believable tiny moisture droplets and faint fog visibly trapped between the panes near the lower edge. Keep the warm walnut sill and linen interior softly out of focus, while the gasket, glazing layers and seal interface remain prominent. Wide landscape macro architectural documentary photograph in warm ivory, bronze and aged brass. No people, hands, writing, logos, watermarks, blue tint, shattered glass or CGI.

## Supporting Unsplash photographs

Each source identifier resolves at `https://images.unsplash.com/<identifier>`. Images are downloaded and served locally, never from the remote source at runtime.

| Local asset | Unsplash source identifier |
| --- | --- |
| `img/home/hero-window-wall.webp` | `photo-1600210492486-724fe5c67fb0` |
| `img/home/service-installation.webp` | `photo-1600607687939-ce8a6c25118c` |
| `img/home/service-repair.webp` | `photo-1616486338812-3dadae4b4ace` |
| `img/home/service-glass.webp` | `photo-1497366754035-f200968a6e72` |
| `img/home/concern-window.webp` | `photo-1494526585095-c41746248156` |
| `img/home/preparation-interior.webp` | `photo-1484154218962-a197022b5858` |
| `img/home/homeowner-interior.webp` | `photo-1513694203232-719a280e022f` |
| `img/services/installation-hero.webp` | `photo-1600566753190-17f0baa2a6c3` |
| `img/services/installation-opening.webp` | `photo-1505693416388-ac5ce068fe85` |
| `img/services/installation-double-hung.webp` | `photo-1600607687644-c7171b42498f` |
| `img/services/installation-casement.webp` | `photo-1600607688969-a5bfcd646154` |
| `img/services/installation-sliding.webp` | `photo-1618221195710-dd6b41faaea6` |
| `img/services/installation-picture.webp` | `photo-1600573472591-ee6b68d14c68` |
| `img/services/installation-bay.webp` | `photo-1600585154340-be6161a56a0c` |
| `img/services/installation-custom.webp` | `photo-1600607687920-4e2a09cf159d` |
| `img/services/repair-hero.webp` | `photo-1600566753086-00f18fb6b3ea` |
| `img/services/repair-hardware.webp` | `photo-1615873968403-89e068629265` |
| `img/services/repair-balances.webp` | `photo-1497366811353-6870744d04b2` |
| `img/services/repair-cranks.webp` | `photo-1524758631624-e2822e304c36` |
| `img/services/repair-locks.webp` | `photo-1616486029423-aaa4789e8c9a` |
| `img/services/repair-tracks.webp` | `photo-1615874694520-474822394e73` |
| `img/services/repair-wood.webp` | `photo-1615529328331-f8917597711f` |
| `img/services/repair-weatherstrip.webp` | `photo-1616047006789-b7af5afb8c20` |
| `img/services/glass-hero.webp` | `photo-1600210491892-03d54c0aaf87` |
| `img/services/glass-condensation.webp` | `photo-1507089947368-19c1da9775ae` |
| `img/services/glass-single-pane.webp` | `photo-1505693314120-0d443867891c` |
| `img/services/glass-insulated.webp` | `photo-1493809842364-78817add7ffb` |
| `img/services/glass-tempered.webp` | `photo-1502005229762-cf1b2da7c5d6` |
| `img/services/glass-decorative.webp` | `photo-1560448204-e02f11c3d0e2` |
| `img/services/glass-gasket.webp` | `photo-1600121848594-d8644e57abab` |
| `img/services/glass-assessment.webp` | `photo-1586023492125-27b2c045efd7` |
