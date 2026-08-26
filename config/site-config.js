/*
 * Main site settings. Keep this object as valid JSON.
 * Do not store passwords, API keys or SMTP credentials here.
 */
window.SITE_CONFIG = {
  "brand": "Window Match",
  "company": "Window Match, Inc.",
  "logo": "img/common/logo-window-match-mark-generated.png",
  "email": "hello@example.com",

  "pageTitles": {
    "index.html": "{brand} | Independent Local Window Project Introductions",
    "window-installation-replacement.html": "Window Installation & Replacement | {brand}",
    "window-repair.html": "Window Repair | {brand}",
    "glass-seal-repair.html": "Glass & Seal Repair | {brand}",
    "privacy.html": "Privacy Policy | {brand}",
    "terms.html": "Terms of Service | {brand}",
    "cookie-policy.html": "Cookie Policy | {brand}"
  },

  "disclaimer": "Disclaimer: This website is a free service that helps users connect with independent local service providers. The website owner and operator do not perform, supervise, direct, or guarantee any work. All contractors and service providers are independent businesses. This website does not warrant or guarantee estimates, availability, licensing status, workmanship, project outcomes, or services performed. Users are solely responsible for verifying that any provider they hire holds all licenses, insurance, permits, certifications, and other credentials required for the work. Any person depicted in a photograph or video is an actor or model unless expressly identified otherwise and is not necessarily a contractor or service provider available through this website.",

  "handler": {
    "recipient": "requests@example.com",
    "sender": "no-reply@example.com",
    "allowedHost": ""
  }
};
