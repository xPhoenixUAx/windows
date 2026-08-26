<?php
declare(strict_types=1);

/**
 * Window Match project-request endpoint.
 *
 * Public defaults are configured in config/site-config.js.
 * Optional environment overrides:
 *   WINDOW_MATCH_FORM_EMAIL    Destination inbox.
 *   WINDOW_MATCH_FROM_EMAIL    Mailbox authorized by the hosting mail transport.
 *   WINDOW_MATCH_ALLOWED_HOST  Explicit host, for example windowmatch.example.
 *
 * PHP mail() must be backed by an operational SMTP/sendmail transport. A transport
 * failure returns HTTP 503 and never reports that a request was successfully sent.
 */

$configSource = file_get_contents(__DIR__ . '/config/site-config.js');
if (!is_string($configSource)) {
    throw new RuntimeException('The public site configuration could not be loaded.');
}
$configStart = strpos($configSource, '{');
$configEnd = strrpos($configSource, '}');
if ($configStart === false || $configEnd === false || $configEnd < $configStart) {
    throw new RuntimeException('The public site configuration is malformed.');
}
$siteConfig = json_decode(substr($configSource, $configStart, $configEnd - $configStart + 1), true);
if (!is_array($siteConfig)) {
    throw new RuntimeException('The public site configuration contains invalid JSON.');
}
$handlerConfig = is_array($siteConfig['handler'] ?? null) ? $siteConfig['handler'] : [];
$brandName = trim((string) ($siteConfig['brand'] ?? 'Website'));
$successMessage = 'Thank you. Your request has been received.';

header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store, max-age=0');

function wants_json(): bool
{
    $accept = (string) ($_SERVER['HTTP_ACCEPT'] ?? '');
    $requestedWith = (string) ($_SERVER['HTTP_X_REQUESTED_WITH'] ?? '');

    return str_contains($accept, 'application/json') || strtolower($requestedWith) === 'xmlhttprequest';
}

function safe_text(mixed $value, bool $allowNewlines = false): string
{
    if (!is_string($value)) {
        return '';
    }

    $value = strip_tags(trim($value));
    $pattern = $allowNewlines ? '/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u' : '/[\x00-\x1F\x7F]/u';
    $cleaned = preg_replace($pattern, '', $value);

    return is_string($cleaned) ? $cleaned : '';
}

function reply(int $status, bool $ok, string $message, array $errors = []): never
{
    global $brandName;

    http_response_code($status);

    if (wants_json()) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode([
            'ok' => $ok,
            'message' => $message,
            'errors' => $errors,
        ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        exit;
    }

    header('Content-Type: text/html; charset=utf-8');
    $safeBrand = htmlspecialchars($brandName !== '' ? $brandName : 'Website', ENT_QUOTES, 'UTF-8');
    $title = ($ok ? 'Request received | ' : 'Request could not be sent | ') . $safeBrand;
    $safeMessage = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');
    $source = safe_text($_POST['source_page'] ?? '/index.html');
    if ($source === '' || !str_starts_with($source, '/') || str_starts_with($source, '//')) {
        $source = '/index.html';
    }
    $safeSource = htmlspecialchars($source, ENT_QUOTES, 'UTF-8');

    echo '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>';
    echo $title . '</title><link rel="stylesheet" href="css/bundle.css"></head><body><main id="main-content" class="container" style="padding-block:100px;max-width:720px">';
    echo '<h1 class="section-title">' . ($ok ? 'Request received' : 'Please review your request') . '</h1>';
    echo '<p role="' . ($ok ? 'status' : 'alert') . '" style="margin-top:24px">' . $safeMessage . '</p>';

    if ($errors !== []) {
        echo '<ul style="margin-top:18px;padding-left:20px">';
        foreach ($errors as $error) {
            echo '<li>' . htmlspecialchars((string) $error, ENT_QUOTES, 'UTF-8') . '</li>';
        }
        echo '</ul>';
    }

    echo '<a class="architectural-link" href="' . $safeSource . '"><span class="link-label">Return to ' . $safeBrand . '</span><span class="latch" aria-hidden="true"></span></a>';
    echo '</main></body></html>';
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    reply(405, false, 'Only same-origin project request submissions are accepted.');
}

$declaredHost = getenv('WINDOW_MATCH_ALLOWED_HOST');
$configuredHost = trim((string) ($handlerConfig['allowedHost'] ?? ''));
$expectedHost = strtolower((string) ($declaredHost !== false && $declaredHost !== ''
    ? $declaredHost
    : ($configuredHost !== '' ? $configuredHost : ($_SERVER['HTTP_HOST'] ?? ''))));
$origin = (string) ($_SERVER['HTTP_ORIGIN'] ?? $_SERVER['HTTP_REFERER'] ?? '');
$fetchSite = strtolower((string) ($_SERVER['HTTP_SEC_FETCH_SITE'] ?? ''));
$originErrorBrand = safe_text($brandName);
$originError = 'Requests must be submitted from the ' . ($originErrorBrand !== '' ? $originErrorBrand : 'configured') . ' website.';

if ($origin !== '') {
    $parts = parse_url($origin);
    $originHost = strtolower((string) ($parts['host'] ?? ''));
    $originPort = isset($parts['port']) ? ':' . $parts['port'] : '';
    if ($originHost === '' || !hash_equals($expectedHost, $originHost . $originPort)) {
        reply(403, false, $originError);
    }
} elseif ($fetchSite !== 'same-origin') {
    reply(403, false, $originError);
}

if (safe_text($_POST['company_website'] ?? '') !== '') {
    reply(422, false, 'The request could not be processed.');
}

$startedAt = filter_var($_POST['form_started_at'] ?? null, FILTER_VALIDATE_INT);
$now = time();
// Static HTML remains usable without JavaScript: only the enhanced JSON flow
// requires a populated client timestamp. Same-origin and all other checks apply
// equally to the ordinary HTML form submission.
if (($startedAt === false && wants_json()) || ($startedAt !== false && ($startedAt > $now || ($now - $startedAt) < 3 || ($now - $startedAt) > 86_400))) {
    reply(422, false, 'Please take a moment to review your project details and submit again.');
}

$allowedServices = [
    'Window Installation & Replacement',
    'Window Repair',
    'Glass & Seal Repair',
    'Not sure',
];
$allowedProperties = [
    'Single-family home',
    'Townhouse',
    'Condominium',
    'Rental property',
    'Commercial property',
    'Other',
];
$allowedCounts = ['1', '2-5', '6-10', 'More than 10', 'Not sure'];

$fields = [
    'full_name' => safe_text($_POST['full_name'] ?? ''),
    'email' => safe_text($_POST['email'] ?? ''),
    'zip_code' => safe_text($_POST['zip_code'] ?? ''),
    'service_needed' => safe_text($_POST['service_needed'] ?? ''),
    'property_type' => safe_text($_POST['property_type'] ?? ''),
    'window_count' => safe_text($_POST['window_count'] ?? ''),
    'project_details' => safe_text($_POST['project_details'] ?? '', true),
    'source_page' => safe_text($_POST['source_page'] ?? ''),
];
$errors = [];

if (strlen($fields['full_name']) < 2 || strlen($fields['full_name']) > 120) {
    $errors['full_name'] = 'Enter your full name using no more than 120 characters.';
}
if (strlen($fields['email']) > 254 || filter_var($fields['email'], FILTER_VALIDATE_EMAIL) === false) {
    $errors['email'] = 'Enter a valid email address.';
}
if (preg_match('/^\d{5}$/D', $fields['zip_code']) !== 1) {
    $errors['zip_code'] = 'Enter a valid five-digit ZIP code.';
}
if (!in_array($fields['service_needed'], $allowedServices, true)) {
    $errors['service_needed'] = 'Choose one of the available window services.';
}
if (!in_array($fields['property_type'], $allowedProperties, true)) {
    $errors['property_type'] = 'Choose a valid property type.';
}
if (!in_array($fields['window_count'], $allowedCounts, true)) {
    $errors['window_count'] = 'Choose an approximate number of windows.';
}
if (strlen($fields['project_details']) < 15 || strlen($fields['project_details']) > 3000) {
    $errors['project_details'] = 'Describe the project in 15 to 3,000 characters.';
}
if (($_POST['consent'] ?? '') !== 'yes') {
    $errors['consent'] = 'Please agree to the Privacy Policy before submitting.';
}
if ($fields['source_page'] === '' || strlen($fields['source_page']) > 255 || !str_starts_with($fields['source_page'], '/') || str_starts_with($fields['source_page'], '//')) {
    $errors['source_page'] = 'The source page could not be verified.';
}

if ($errors !== []) {
    reply(422, false, 'Please review the highlighted fields and try again.', $errors);
}

$recipient = getenv('WINDOW_MATCH_FORM_EMAIL');
$recipient = $recipient !== false && $recipient !== ''
    ? trim($recipient)
    : trim((string) ($handlerConfig['recipient'] ?? ''));
$sender = getenv('WINDOW_MATCH_FROM_EMAIL');
$sender = $sender !== false && $sender !== ''
    ? trim($sender)
    : trim((string) ($handlerConfig['sender'] ?? ''));

if (filter_var($recipient, FILTER_VALIDATE_EMAIL) === false || filter_var($sender, FILTER_VALIDATE_EMAIL) === false) {
    reply(503, false, 'Project request email delivery has not been configured correctly.');
}

$safeBrandName = safe_text($brandName);
if ($safeBrandName === '') {
    $safeBrandName = 'Website';
}
$subjectPrefix = '[' . $safeBrandName . ']';

$plainBody = implode("\r\n", [
    $safeBrandName . ' project request',
    '',
    'Full name: ' . $fields['full_name'],
    'Email address: ' . $fields['email'],
    'ZIP code: ' . $fields['zip_code'],
    'Service needed: ' . $fields['service_needed'],
    'Property type: ' . $fields['property_type'],
    'Approximate number of windows: ' . $fields['window_count'],
    'Project details:',
    $fields['project_details'],
    '',
    'Consent to provider sharing: Yes',
    'Submitted at: ' . gmdate('Y-m-d H:i:s') . ' UTC',
    'Source page: ' . $fields['source_page'],
]);

$subject = $subjectPrefix . ' New ' . $fields['service_needed'] . ' request — ' . $fields['zip_code'];
$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
$headers = [
    'From: ' . $safeBrandName . ' <' . $sender . '>',
    'Reply-To: ' . $fields['email'],
    'MIME-Version: 1.0',
];

$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$message = $plainBody;

$delivered = @mail($recipient, $encodedSubject, $message, implode("\r\n", $headers));
if (!$delivered) {
    reply(503, false, 'Your request could not be delivered because email transport is unavailable. Please try again later or contact the corporate email address.');
}

reply(200, true, $successMessage);
