import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Travel',
  description: 'Places explored by Bryan Jaimes.',
  alternates: { canonical: '/travel' },
};

export default function TravelLayout({ children }: { children: React.ReactNode }) {
  return children;
}
