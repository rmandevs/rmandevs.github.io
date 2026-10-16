import type { APIRoute } from 'astro';
import { getPosts, getProjects } from '../lib/content';
export const GET: APIRoute = async ({ site }) => {
  const routes = ['/', '/blog/', ...(await getProjects()).map(item => `/projects/${item.id}/`), ...(await getPosts()).map(item => `/blog/${item.id}/`)];
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(route => `<url><loc>${new URL(route, site)}</loc></url>`).join('')}</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
