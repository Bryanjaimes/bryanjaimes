import type { Metadata } from 'next';
import './globals.css';
import '../../public/hub/hub.css';

const description = 'Software engineering, machine learning, and curious experiments. Explore Bryan Jaimes’s projects, career work, and vibe lab.';
export const metadata: Metadata = {
  metadataBase: new URL('https://bryanjaimes.com'),
  title: { default: 'Bryan Jaimes | Engineer & Builder', template: '%s | Bryan Jaimes' },
  description,
  authors: [{ name: 'Bryan Jaimes' }],
  alternates: { canonical: '/' },
  openGraph: { title: 'Bryan Jaimes | Engineer & Builder', description, url: '/', siteName: 'Bryan Jaimes', type: 'website', locale: 'en_US', images: ['/opengraph-image'] },
  twitter: { card: 'summary_large_image', title: 'Bryan Jaimes | Engineer & Builder', description, images: ['/opengraph-image'] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
