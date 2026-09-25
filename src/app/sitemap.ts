import type { MetadataRoute } from 'next';
import { projects } from '@/lib/portfolio.mjs';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/travel', ...projects.map(project => `/projects/${project.slug}`)]
    .map(path => ({ url: `https://bryanjaimes.com${path}` }));
}
