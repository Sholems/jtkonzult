import cachedPosts from '../../cache/wp_posts.json';
import { localPosts } from './localPosts';

const CMS_POSTS_URL = 'https://cms.jtkonzult.com.ng/wp-json/wp/v2/posts?_embed&per_page=100';
const LEGACY_HIRING_SLUG = 'top-7-qualities-employers-look-for-when-hiring-in-nigeria-2025-guide';
const FALLBACK_IMAGE = { url: '/images/site/team-discussion.webp', width: 1920, height: 1080 };
const DEFAULT_DESCRIPTION = 'Read the latest article from J.T. Resources & Konzult Ltd.';

let allPosts: Promise<any[]> | undefined;

/**
 * Every blog post: hand-written local posts first, then CMS posts.
 * Falls back to the checked-in CMS cache so a CMS outage cannot drop posts from a build.
 * Memoised so the blog index, article pages and sitemap always agree on one list.
 */
export function getAllPosts(): Promise<any[]> {
  allPosts ??= (async () => {
    let remotePosts = cachedPosts as any[];
    try {
      const response = await fetch(CMS_POSTS_URL, { signal: AbortSignal.timeout(8000) });
      if (response.ok) remotePosts = await response.json();
    } catch {
      // Keep the cached CMS posts.
    }
    return [...localPosts, ...remotePosts.filter((post) => !localPosts.some((local) => local.slug === post.slug))];
  })();
  return allPosts;
}

const entities: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', hellip: '…', ndash: '–', mdash: '—', lsquo: '‘', rsquo: '’', ldquo: '“', rdquo: '”' };

function toPlainText(html = '') {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&([a-z]+);/gi, (match, name) => entities[name.toLowerCase()] ?? match)
    .replace(/\s+/g, ' ')
    .trim();
}

export function formatPostDate(date?: string) {
  return date ? new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '';
}

export function truncate(text: string, length = 160) {
  return text.length > length ? `${text.slice(0, length - 1).trimEnd()}…` : text;
}

/** Display-ready fields for a local or CMS post. */
export function summarisePost(post: any) {
  const legacyHiringPost = post.slug === LEGACY_HIRING_SLUG;
  const rawTitle = toPlainText(post.title?.rendered) || 'Untitled';
  const title = legacyHiringPost ? rawTitle.replace(' (2025 Guide)', ' (Updated Guide)') : rawTitle;
  const description = legacyHiringPost
    ? 'Discover the communication, teamwork, digital and problem-solving qualities Nigerian employers value when evaluating candidates.'
    : post.seoDescription || toPlainText(post.excerpt?.rendered).replace(/\s*\[…\]$/, '…') || DEFAULT_DESCRIPTION;
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  const image = legacyHiringPost || !media?.source_url
    ? FALLBACK_IMAGE
    : { url: media.source_url as string, width: media.media_details?.width ?? 1672, height: media.media_details?.height ?? 941 };
  const extension = image.url.split('?')[0].split('.').pop()?.toLowerCase();
  const imageType = media?.mime_type && image !== FALLBACK_IMAGE ? media.mime_type : extension === 'jpg' || extension === 'jpeg' ? 'image/jpeg' : `image/${extension}`;

  return {
    slug: post.slug as string,
    url: `/blog/${post.slug}/`,
    title,
    seoTitle: legacyHiringPost ? 'Top Hiring Qualities Nigerian Employers Value' : (post.seoTitle || `${title} — J.T. Resources & Konzult Ltd`),
    description,
    image: { ...image, type: imageType },
    category: post._embedded?.['wp:term']?.[0]?.[0]?.name || '',
    date: post.date as string | undefined,
    modified: (post.modified || post.date) as string | undefined,
    displayDate: formatPostDate(post.date),
    readingTime: post.readingTime || `${Math.max(1, Math.ceil(toPlainText(post.content?.rendered).split(' ').length / 220))} min read`
  };
}
