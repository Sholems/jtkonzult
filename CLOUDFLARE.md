# Cloudflare Pages deployment

Use these project settings:

- Build command: `npm run build`
- Build output directory: `dist`
- Production domain: `jtkonzult.com.ng`

The static site, redirects, response headers, sitemap and robots file are emitted into `dist` during the build. The contact endpoint is implemented as a Pages Function at `functions/api/contact.ts`.

## Contact email configuration

Create these encrypted environment variables in the Cloudflare Pages project:

- `RESEND_API_KEY`: API key for the Resend account that will deliver contact enquiries.
- `CONTACT_FROM_EMAIL`: a verified sender, for example `Website <website@jtkonzult.com.ng>`.

The destination is `info@jtkonzult.com.ng`. Verify the sending domain in Resend before testing production submissions. If the variables are absent or delivery fails, the form displays the direct email address instead of reporting a false success.

## Turnstile bot protection

Create a Cloudflare Turnstile widget for `jtkonzult.com.ng`, then add these variables to the Pages project:

- `PUBLIC_TURNSTILE_SITE_KEY`: the public widget site key. This must be available during the production build.
- `TURNSTILE_SECRET`: the encrypted secret key used by the Pages Function.
- `TURNSTILE_HOSTNAMES`: comma-separated allowed hostnames, normally `jtkonzult.com.ng,www.jtkonzult.com.ng`.

The contact endpoint validates the token, hostname and `contact` action before it accepts an enquiry. Local development uses Cloudflare's documented test key; production fails closed when the widget configuration is missing.

## Cloudflare production settings

- Use Node.js 22 for the build environment.
- Enable Web Analytics in the Cloudflare dashboard after the first production deployment.
- Keep automatic HTTPS rewrites enabled and set SSL/TLS encryption mode to Full (strict).
- Test the contact form on the production hostname after the Turnstile and Resend variables are configured.

## Search setup after deployment

1. Confirm that `https://www.jtkonzult.com.ng/` permanently redirects to `https://jtkonzult.com.ng/`.
2. Add `https://jtkonzult.com.ng/sitemap.xml` to Google Search Console and Bing Webmaster Tools.
3. Validate the homepage Organization data and one service page with Google's Rich Results Test.
4. Request indexing for the homepage, Services page and the seven service pages.
