import type { APIRoute } from 'astro';
import { getPosts } from '../lib/content';
import { site } from '../config';
const escape = (text: string) => text.replace(/[<>&"']/g, char => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[char]!);
export const GET: APIRoute = async ({ site: url }) => {
  const posts = await getPosts();
  const items = posts.map(post => `<item><title>${escape(post.data.title)}</title><link>${new URL(`/blog/${post.id}/`, url)}</link><guid>${new URL(`/blog/${post.id}/`, url)}</guid><description>${escape(post.data.summary)}</description><pubDate>${post.data.date.toUTCString()}</pubDate></item>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Armando — Notebook</title><link>${url}</link><description>${escape(site.description)}</description><language>en</language>${items}</channel></rss>`, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
