<?php
/**
 * Contact form -> email, via the Resend API.
 *
 * The site is a static export, so there is no Node server to hold the Resend
 * key. This runs on Hostinger's PHP instead: the browser POSTs here, and the
 * key stays server-side and never reaches the client.
 *
 * Upload to public_html/contact.php and set RESEND_API_KEY below.
 */

declare(strict_types=1);

// ─── Configuration ────────────────────────────────────────────────────────────

/** Resend API key (starts with "re_"). Keep this file out of any public repo. */
const RESEND_API_KEY = 'PASTE_YOUR_RESEND_API_KEY_HERE';

/** Where submissions are delivered. */
const MAIL_TO = ['yhpadwords@gmail.com'];

/**
 * Sender address. Until you verify a domain in Resend, "onboarding@resend.dev"
 * only delivers to the address your Resend account was created with. Once
 * nikkybawa.com is verified, change this to e.g. "website@nikkybawa.com".
 */
const MAIL_FROM = 'Nikky Bawa Website <onboarding@resend.dev>';

// ─── Boilerplate ──────────────────────────────────────────────────────────────

// Notices must never be printed: they would land in the response body ahead of
// the JSON and make it unparseable for the browser. Log them instead.
ini_set('display_errors', '0');
error_reporting(E_ALL);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

/** No `never` return type — keeps this file valid on PHP 7.4 and 8.0 hosts. */
function fail(int $status, string $message)
{
    http_response_code($status);
    echo json_encode(['error' => $message]);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    fail(405, 'Method not allowed');
}

$raw = file_get_contents('php://input');
if ($raw === false || $raw === '' || strlen($raw) > 50_000) {
    fail(400, 'Invalid request body');
}

$body = json_decode($raw, true);
if (!is_array($body)) {
    fail(400, 'Invalid JSON');
}

$field = static fn(string $k): string => trim((string) ($body[$k] ?? ''));

// Bots fill hidden fields that humans never see.
if ($field('company') !== '') {
    echo json_encode(['success' => true]);
    exit;
}

$name    = $field('name');
$email   = $field('email');
$phone   = $field('phone');
$message = $field('message');
$service = $field('service');
$date    = $field('date');
$time    = $field('time');
$isBooking = $field('inquiryType') === 'booking';

if ($name === '' || $email === '' || $phone === '') {
    fail(400, 'Missing required fields');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    fail(400, 'Invalid email address');
}
foreach ([$name => 120, $email => 200, $phone => 40, $message => 5000] as $value => $max) {
    if (mb_strlen((string) $value) > $max) {
        fail(400, 'Field too long');
    }
}

// Header-injection guard: newlines must never reach the subject or reply-to.
$oneLine = static fn(string $s): string => preg_replace('/[\r\n]+/', ' ', $s) ?? '';
$name  = $oneLine($name);
$email = $oneLine($email);

// ─── Build the email ──────────────────────────────────────────────────────────

/** Every interpolated value is escaped — the old Node route injected raw HTML. */
$e = static fn(string $s): string => htmlspecialchars($s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');

$subjectTitle = $isBooking ? 'New Appointment Request' : 'New Contact Inquiry';

$html = '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">'
    . '<h2 style="color: #B76E79; border-bottom: 2px solid #FDFBF9; padding-bottom: 10px;">' . $e($subjectTitle) . '</h2>'
    . '<p><strong>Name:</strong> ' . $e($name) . '</p>'
    . '<p><strong>Email:</strong> ' . $e($email) . '</p>'
    . '<p><strong>Phone:</strong> ' . $e($phone) . '</p>';

if ($isBooking) {
    $html .= '<h3 style="color: #666; margin-top: 20px;">Requested Details</h3>'
        . '<p><strong>Service:</strong> ' . $e($service !== '' ? $service : 'Not specified') . '</p>'
        . '<p><strong>Date:</strong> ' . $e($date !== '' ? $date : 'Not specified') . '</p>'
        . '<p><strong>Time:</strong> ' . $e($time !== '' ? $time : 'Not specified') . '</p>';
}

$html .= '<h3 style="color: #666; margin-top: 20px;">Message/Notes</h3>'
    . '<p style="background: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #B76E79;">'
    . ($message !== '' ? nl2br($e($message)) : '<em>No message provided.</em>')
    . '</p>'
    . '<p style="font-size: 12px; color: #999; margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px;">'
    . 'This message was sent from the Nikky Bawa Ladies Salon website contact form.</p>'
    . '</div>';

$payload = [
    'from'     => MAIL_FROM,
    'to'       => MAIL_TO,
    'subject'  => $subjectTitle . ' from ' . $name,
    'reply_to' => $email,
    'html'     => $html,
];

// ─── Send ─────────────────────────────────────────────────────────────────────

if (RESEND_API_KEY === 'PASTE_YOUR_RESEND_API_KEY_HERE') {
    error_log('contact.php: RESEND_API_KEY is not configured');
    fail(500, 'Email is not configured yet');
}

$ch = curl_init('https://api.resend.com/emails');
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 15,
    CURLOPT_HTTPHEADER     => [
        'Authorization: Bearer ' . RESEND_API_KEY,
        'Content-Type: application/json',
    ],
    CURLOPT_POSTFIELDS => json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
]);

$response = curl_exec($ch);
$status   = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
$curlErr  = curl_error($ch);
// curl_close() is a deprecated no-op since PHP 8.0 and emits a notice on 8.5+.

if ($response === false) {
    error_log('contact.php: curl failure: ' . $curlErr);
    fail(502, 'Could not reach the email service');
}

if ($status < 200 || $status >= 300) {
    // Log the provider's reason, but don't leak it to the browser.
    error_log('contact.php: Resend returned ' . $status . ': ' . $response);
    fail(502, 'Email service rejected the message');
}

echo json_encode(['success' => true]);
