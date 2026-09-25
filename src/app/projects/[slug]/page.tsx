import type { Metadata } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { projects } from '@/lib/portfolio.mjs';
import { projectHtml } from '@/lib/hub-render.mjs';

export function generateStaticParams() {
  return projects.map(project => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(project => project.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { title: `${project.title} | Bryan Jaimes`, description: project.description, url: `/projects/${project.slug}`, images: ['/opengraph-image'] },
    twitter: { card: 'summary_large_image', title: `${project.title} | Bryan Jaimes`, description: project.description, images: ['/opengraph-image'] },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find(project => project.slug === slug);
  if (!project) notFound();
  return <>
    <div dangerouslySetInnerHTML={{ __html: projectHtml(project) }} />
    <Script src="/hub/hub.js" strategy="afterInteractive" />
  </>;
}
