# Window Match

A finished seven-page, framework-free website for an independent residential-window project aggregator. The project uses semantic HTML, modular CSS, vanilla JavaScript and one PHP project-request endpoint. No build step, package installation, JavaScript framework or animation library is required.

## Pages

- `index.html`: the complete eight-section homepage.
- `window-installation-replacement.html`: the five-section installation and replacement page.
- `window-repair.html`: the five-section repair page.
- `glass-seal-repair.html`: the five-section glass and seal page.
- `privacy.html`, `terms.html` and `cookie-policy.html`: readable legal policies.

## Static visual preview

From the project directory:

```powershell
python -m http.server 8000
```

Open `http://127.0.0.1:8000/`. Static hosting can load `config/site-config.js` and display the configured branding, but it cannot execute `handler.php` or process a request. Use PHP-capable hosting for the working form.

## PHP-compatible preview

On a PHP installation:

```powershell
php -S 127.0.0.1:8765
```

Open `http://127.0.0.1:8765/`.

## Company and email configuration

Edit `config/site-config.js` to update the brand, legal company name, logo, contact email, page titles, disclaimer and the public email defaults used by `handler.php`. The wordmark, favicon, footer description, copyright, email subject and standard form messages are generated automatically.

The same PHP configuration file is served to the browser as JavaScript and included directly by the form handler, so client and server settings remain synchronized. It contains public configuration only; never place SMTP passwords, API keys or other secrets in it.

The `handler` section contains the default recipient, authorized sender, allowed host and subject prefix. Production environment variables can override those values without editing the deployed files:

```powershell
$env:WINDOW_MATCH_FORM_EMAIL = 'requests@your-domain.example'
$env:WINDOW_MATCH_FROM_EMAIL = 'no-reply@your-domain.example'
$env:WINDOW_MATCH_ALLOWED_HOST = 'www.your-domain.example'
```

`WINDOW_MATCH_ALLOWED_HOST` is optional. When used during local testing, include the port, for example `127.0.0.1:8765`.

The PHP endpoint validates same-origin POST requests, a honeypot, submission timing, field lengths, email, ZIP code, allowed select values and consent. JSON and ordinary HTML form responses are both supported.

### Mail transport is required

PHP `mail()` must have a working SMTP or sendmail transport. The local PHP environment does not include a real outbound mail service. If delivery is unavailable, the endpoint correctly returns HTTP 503 and does **not** display a false success. Production hosting must provide a working mail transport; authenticated SMTP or a later PHPMailer integration can also be configured separately.

The successful delivery path was verified against a local, non-forwarding SMTP test server. No request was sent to an external mailbox.

## Images and QA

All website imagery is stored locally as optimized WebP. Original generated artwork, its prompts and the supporting Unsplash photo identifiers are documented in `IMAGE_CREDITS.md`. The completed package checklist and responsive/security verification are documented in `QA_CHECKLIST.md`.

Cloudflare Worker-only or static-only hosting cannot execute PHP. Deploy this project to PHP-capable hosting if real form processing is required.
