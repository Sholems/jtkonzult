import { services } from '../data/services';
import { localPosts } from '../data/localPosts';

export async function GET({ site }: { site: URL }) {
  const paths = ['/', '/about/', '/services/', '/contact/', '/blog/', ...services.map((service) => `/services/${service.slug}/`), ...localPosts.map((post) => `/blog/${post.slug}/`)];
  const entries = new Map<string, string | undefined>();
  const localLastmod = new Date().toISOString().slice(0, 10);
  for (const path of paths) entries.set(new URL(path, site).toString(), localLastmod);

  try {
    const response = await fetch('https://cms.jtkonzult.com.ng/wp-json/wp/v2/posts?per_page=100&_fields=slug,modified_gmt', { signal: AbortSignal.timeout(8000) });
    if (response.ok) {
      const posts = await response.json();
      for (const post of posts) {
        const loc = new URL(`/blog/${post.slug}/`, site).toString();
        if (!entries.has(loc)) entries.set(loc, post.modified_gmt ? `${post.modified_gmt}Z` : undefined);
      }
    }
  } catch {
    // Core pages remain discoverable if the CMS is temporarily unavailable during a build.
  }

  const urls = [...entries].map(([loc, lastmod]) => `<url><loc>${loc}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
