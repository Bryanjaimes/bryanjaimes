import Script from 'next/script';
import { homeHtml } from '@/lib/hub-render.mjs';

export default function Home() {
  // The shared renderer escapes curated content and also powers the local preview.
  return <>
    <div dangerouslySetInnerHTML={{ __html: homeHtml() }} />
    <Script src="/hub/hub.js" strategy="afterInteractive" />
  </>;
}
