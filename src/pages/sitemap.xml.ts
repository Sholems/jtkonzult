import { services } from '../data/services';
import { getAllPosts } from '../data/posts';

export async function GET({ site }: { site: URL }) {
  const buildDate = new Date().toISOString().slice(0, 10);
  const pages = ['/', '/about/', '/services/', '/contact/', '/blog/', ...services.map((service) => `/services/${service.slug}/`)];
  const entries = new Map<string, string | undefined>(pages.map((path) => [new URL(path, site).toString(), buildDate]));

  // Same post list the blog pages are built from, so every listed URL exists.
  for (const post of await getAllPosts()) {
    const modified = post.modified_gmt ? `${post.modified_gmt}Z` : post.modified || post.date;
    entries.set(new URL(`/blog/${post.slug}/`, site).toString(), modified ? new Date(modified).toISOString().slice(0, 10) : undefined);
  }

  const urls = [...entries].map(([loc, lastmod]) => `<url><loc>${loc}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
