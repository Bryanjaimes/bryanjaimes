import { ImageResponse } from 'next/og';

export const alt = 'Bryan Jaimes — Software. AI. Experiments.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    <div style={{ background: 'linear-gradient(135deg, #030a1b, #143d77)', color: '#f7fbff', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '65px 75px' }}>
      <div style={{ display: 'flex', fontSize: 22, color: '#afd7ff' }}>SOFTWARE ENGINEER & BUILDER</div>
      <div style={{ display: 'flex', flexDirection: 'column', fontSize: 100, letterSpacing: -4, lineHeight: 1.1 }}>
        <span>Bryan Jaimes.</span><span style={{ color: '#afd7ff', fontSize: 43, letterSpacing: -1 }}>Software. AI. Experiments.</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 20, color: '#b1c5e1' }}><span>Projects · Playground · Career</span><span>bryanjaimes.com</span></div>
    </div>, size,
  );
}
