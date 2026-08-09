# Deploying to Hostinger

The site builds to a folder of plain HTML/CSS/JS/images. The only moving part
is `contact.php`, which forwards the contact form to Resend so your API key
never reaches the browser.

## Build

```bash
npm install
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX npm run build
```

This runs three steps:

1. `prebuild` — generates responsive image variants into `public/_img/`
2. `build` — exports the static site into `out/`
3. `postbuild` — copies `.htaccess` and `contact.php` into `out/`

Everything you upload is in `out/`.

> Set `NEXT_PUBLIC_GTM_ID` to your real GTM container ID. If you omit it the
> site still builds, but Google Tag Manager is left out.

## Add your Resend API key

Open `out/contact.php` and replace the placeholder:

```php
const RESEND_API_KEY = 'PASTE_YOUR_RESEND_API_KEY_HERE';
```

with the key from <https://resend.com/api-keys> (it starts with `re_`).

Do this on the copy in `out/` each time you build, or keep a local copy of the
key and paste it after every deploy. **Never commit the real key to git.**

### Sender address

Out of the box the file sends from `onboarding@resend.dev`. That address only
delivers to the email your Resend account was registered with — good enough to
test, not for production.

To send to `yhpadwords@gmail.com` reliably, verify `nikkybawa.com` in Resend
(Domains → Add Domain, then add the DNS records to Hostinger), and change:

```php
const MAIL_FROM = 'Nikky Bawa Website <website@nikkybawa.com>';
```

Until the domain is verified, form submissions will fail with
"Email service rejected the message".

## Upload

1. hPanel → **File Manager** (or FTP), open `public_html`
2. Delete whatever is in there from a previous deploy
3. Upload **the contents of `out/`** — not the `out` folder itself

`public_html` should end up looking like:

```
public_html/
├── .htaccess
├── contact.php
├── index.html
├── 404.html
├── about/index.html
├── contact/index.html
├── portfolio/index.html
├── makeup/index.html          (and the other 8 service pages)
├── _next/static/...
├── _img/...
├── images/  portfolio/  service-images/  videos/
└── logo.avif
```

Zipping `out/` and using hPanel's **Import Website** is faster than uploading
file by file — the archive limit is 256 MB and the build is well under that.

> The File Manager hides dotfiles by default. Make sure `.htaccess` actually
> made it across — turn on hidden files if you don't see it.

## Check PHP

hPanel → **Advanced → PHP Configuration**. PHP 7.4 or newer is fine; `curl`
and `json` are enabled on Hostinger by default. Nothing else to configure.

## Verify

- Open `https://nikkybawa.com` — the hero image should load
- Visit `/about/`, `/portfolio/`, `/contact/`, `/makeup/`
- Hit a bad URL like `/nope/` and confirm the 404 page renders
- Submit the contact form and confirm the email arrives

If the form returns an error, check hPanel → **Advanced → Error Log**.
`contact.php` logs the exact reason Resend gave while showing the visitor only
a generic message.

## Redeploying

Rebuild, re-paste the API key into `out/contact.php`, re-upload. HTML is served
with `must-revalidate` so pages update immediately; hashed assets under
`_next/static` and the images are cached for a year, so returning visitors only
re-download what actually changed.
