# Cloudflare Pages deployment

Use these project settings:

- Build command: `npm run build`
- Build output directory: `dist`
- Production domain: `jtkonzult.com.ng`

The static site, redirects, response headers, sitemap and robots file are emitted into `dist` during the build.

## Contact email configuration

The contact form posts by AJAX to FormSubmit and delivers enquiries to `info@jtkonzult.com.ng`. No Cloudflare email variables are required. After the first genuine submission, open the activation email sent by FormSubmit and approve the form. Once activated, FormSubmit can provide an endpoint alias that can replace the email-address endpoint in `src/pages/contact.astro`.

## Cloudflare production settings

- Use Node.js 22 for the build environment.
- Enable Web Analytics in the Cloudflare dashboard after the first production deployment.
- Keep automatic HTTPS rewrites enabled and set SSL/TLS encryption mode to Full (strict).
- Activate FormSubmit and test the contact form on the production hostname.

## Search setup after deployment

1. Confirm that `https://www.jtkonzult.com.ng/` permanently redirects to `https://jtkonzult.com.ng/`.
2. Add `https://jtkonzult.com.ng/sitemap.xml` to Google Search Console and Bing Webmaster Tools.
3. Validate the homepage Organization data and one service page with Google's Rich Results Test.
4. Request indexing for the homepage, Services page and the seven service pages.
