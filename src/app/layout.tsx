import type { Metadata } from 'next';
import './globals.css';
import '../../public/hub/hub.css';

const description = 'Software engineering, machine learning, and curious experiments. Explore projects, career work, and vibe lab.';
export const metadata: Metadata = {
  metadataBase: new URL('https://bryanjaimes.com'),
  title: { default: 'Engineer & Builder', template: '%s' },
  description,
  alternates: { canonical: '/' },
  openGraph: { title: 'Engineer & Builder', description, url: '/', siteName: 'Engineer & Builder', type: 'website', locale: 'en_US', images: ['/opengraph-image'] },
  twitter: { card: 'summary_large_image', title: 'Engineer & Builder', description, images: ['/opengraph-image'] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
