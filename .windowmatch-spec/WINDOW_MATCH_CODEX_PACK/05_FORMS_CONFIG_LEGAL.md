# Forms, configuration, PHP and legal requirements

## Configuration

Create `config/site-config.js` with one global `window.SITE_CONFIG` object. Make these values editable without touching page markup:

```js
window.SITE_CONFIG = {
  siteName: "Window Match",
  companyName: "Window Match, Inc.",
  corporateEmail: "hello@example.com",
  formRecipientEmail: "requests@example.com",
  address: {
    line1: "123 Example Street, Suite 200",
    cityStateZip: "Example City, ST 00000",
    country: "United States"
  },
  copyrightText: "© 2026 Window Match. All rights reserved.",
  aggregatorDisclosure: "Window Match is an independent aggregator and does not perform, supervise or guarantee contracting work. Providers are independent businesses. Availability varies by location.",
  advertiseCollaborate: {
    title: "Advertise & Collaborate",
    text: "Window professionals, suppliers and industry partners may contact us to discuss advertising, referral and collaboration opportunities. Participation is subject to review and does not imply endorsement, exclusivity or guaranteed lead volume. Please use the corporate email listed on this site and include your company name, service area, website and the type of collaboration you would like to explore."
  },
  successMessage: "Thank you! We have successfully received your request. Our team will review your information and get back to you shortly."
};
```

Render config-controlled text with JavaScript using `data-config` attributes. Provide meaningful HTML fallback text so key company details still exist if JS fails. Keep page-specific editorial content in HTML, not in config.

## Form behavior

All project request forms submit via `POST` to `handler.php`. Use `FormData` and progressive enhancement. Client-side validation improves UX but never replaces server validation.

Required:

- honeypot input hidden accessibly from humans;
- request timestamp and basic minimum-submit-time check;
- same-origin POST only;
- trim and sanitize all values;
- validate email with PHP `filter_var`;
- whitelist select values;
- sensible length limits;
- image upload optional, maximum 5 MB, JPG/PNG/WebP only, validate MIME using `finfo`, never trust extension;
- protect against header injection;
- JSON responses for fetch and safe HTML fallback for normal form submission;
- form button loading state without changing its width;
- inline field errors associated with `aria-describedby`;
- success container using `role="status"`; errors use `role="alert"`;
- preserve user input after a validation error;
- do not log personal form data in browser console.

No phone field.

## Email

Read the recipient from a server-side configuration value. Because browser JS can be downloaded by anyone, do not pretend an email in `site-config.js` is secret. Create a small clearly documented PHP configuration section in `handler.php`, or optionally support a server environment variable such as `WINDOW_MATCH_FORM_EMAIL`, falling back to the configured corporate address.

Email subject format:

`[Window Match] New {service} request — {ZIP code}`

Email body should contain all submitted values, submission time, source page and original filenames only when an upload passes validation. Do not expose internal server paths.

If PHP `mail()` is unavailable locally, return a clear server error; never display a false success. Document that production hosting must provide mail transport or that PHPMailer/SMTP may be configured later.

On actual successful handoff to the mail transport, show exactly:

> Thank you! We have successfully received your request. Our team will review your information and get back to you shortly.

## Privacy and consent

Consent label:

> I agree to the Privacy Policy and consent to having my project information shared with independent service providers that may be able to respond to my request.

It must be unchecked by default and required.

## Legal pages

Create well-structured, readable legal pages with last-updated date, table of contents and shared site shell. Do not claim attorney review.

Privacy Policy must cover:

- information submitted through forms and optional files;
- technical and cookie data;
- purpose of processing;
- sharing with independent providers and service vendors;
- retention and security limits;
- user choices/rights;
- children’s privacy;
- changes and corporate email contact.

Terms must cover:

- aggregator/referral role;
- no contracting relationship with Window Match;
- provider independence;
- no guarantee of match, contact, availability, estimate or outcome;
- user responsibility to verify licensing, insurance, references, scope and terms;
- acceptable use and accurate submissions;
- intellectual property;
- disclaimers, liability limits, indemnity, changes and contact.

Cookie Policy must cover:

- essential storage for preferences/security;
- no non-essential tracking by default;
- how users can change preferences;
- browser controls and updates.

Place the config-controlled **Advertise & Collaborate** block near the bottom of the homepage About section or footer-adjacent information area. It is not a ninth homepage section.

