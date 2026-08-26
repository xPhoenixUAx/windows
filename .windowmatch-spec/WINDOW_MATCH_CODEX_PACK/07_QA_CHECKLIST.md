# Final QA checklist

The website is not finished until every relevant item passes.

## Content and business model

- [ ] Homepage has exactly eight substantial sections before the footer.
- [ ] All three service pages exist and contain five substantial sections.
- [ ] Shared service design is consistent, while copy and imagery are page-specific.
- [ ] No phone numbers, `tel:` links, phone icons or phone inputs exist.
- [ ] No language implies Window Match performs contracting work.
- [ ] Provider independence and variable availability are clearly disclosed.
- [ ] No fake ratings, review counts, licenses, awards, prices or guarantees.
- [ ] No placeholder text or broken English.
- [ ] Legal pages and Advertise & Collaborate content exist.

## Visual

- [ ] References were inspected before implementation.
- [ ] No blue appears in UI styles or imagery overlays.
- [ ] Typography is broad and readable, not ultra-condensed.
- [ ] No numbered sections or numbered service labels.
- [ ] No decorative arrow icons.
- [ ] No pill buttons, glassmorphism or repeated rounded cards.
- [ ] Header reads as a transom/window system and is not a generic navbar.
- [ ] At least four different section compositions are used on the homepage.
- [ ] Brass latch details remain restrained and do not become gimmicky.

## Responsive

- [ ] Tested at 1440, 1280, 1024, 768, 430, 390 and 360 px.
- [ ] No horizontal overflow at any width.
- [ ] No text clipping, orphaned controls or tiny service columns.
- [ ] Mobile menu opens/closes, scrolls, traps focus and locks body scroll.
- [ ] Forms stack cleanly and remain easy to complete.
- [ ] Images maintain aspect ratio and do not cause layout shift.

## Forms and configuration

- [ ] All forms post to `handler.php`.
- [ ] Client and server validation agree.
- [ ] Honeypot, timing check, whitelists and upload validation exist.
- [ ] No personal data is logged to browser console.
- [ ] Service-page form is preselected correctly.
- [ ] Error messages are accessible and preserve entered data.
- [ ] Loading state prevents duplicate submissions.
- [ ] Exact success message is used only after real successful processing.
- [ ] Company details, email, address, footer copy, disclosure, success message and Advertise & Collaborate block are config-controlled.
- [ ] Production mail transport limitation is documented honestly.

## Accessibility and performance

- [ ] Skip link and semantic landmarks exist.
- [ ] Heading hierarchy is valid.
- [ ] Keyboard navigation and visible focus pass.
- [ ] Labels, error associations, status announcements and consent work with assistive technology.
- [ ] Contrast is sufficient.
- [ ] Reduced-motion preference is respected.
- [ ] Below-fold images are lazy-loaded.
- [ ] No console errors or missing assets.
- [ ] Internal links, anchors and legal links work from every page.

## Final manual check

Open every page on desktop and mobile. Read the entire page as a homeowner. Confirm that the next action is clear, the aggregator role is honest and every section adds useful information rather than decorative filler.

