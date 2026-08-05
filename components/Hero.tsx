'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const ORBIT_CHIPS = [
  { bg: '#0A66C2', svg: <svg viewBox="0 0 32 32" fill="white" width={34} height={34}><path d="M7 5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zm-2 7h4v15H5V12zm6.5 0H15v2.05c.7-1.3 2.3-2.45 4.5-2.45C23.5 11.6 26 14 26 18.5V27h-4v-8c0-2.1-.8-3.5-2.7-3.5-1.5 0-2.4 1-2.8 2-.14.35-.2.84-.2 1.33V27h-4V12z"/></svg> },
  { bg: '#fff',     svg: <svg viewBox="0 0 32 32" fill="none" width={34} height={34}><rect x="4" y="8" width="24" height="16" rx="1.5" fill="#F2F2F2"/><path d="M4 8l12 9 12-9" stroke="#EA4335" strokeWidth="2"/><path d="M4 8v16l7-8z" fill="#34A853"/><path d="M28 8v16l-7-8z" fill="#FBBC04"/><path d="M4 24l7-8 5 4 5-4 7 8z" fill="#EA4335"/></svg> },
  { bg: '#000',     svg: <svg viewBox="0 0 32 32" fill="white" width={34} height={34}><path d="M17.75 14.77L25.3 6h-1.8l-6.57 7.63L11.62 6H6l7.93 11.55L6 26h1.8l6.93-8.05L20.38 26H26l-8.25-11.23zm-2.45 2.85l-.8-1.15-6.38-9.12h2.75l5.16 7.38.8 1.14 6.69 9.57h-2.75l-5.47-7.82z"/></svg> },
  { bg: 'radial-gradient(circle at 30% 107%,#fdf497 0%,#fdf497 5%,#fd5949 45%,#d6249f 60%,#285AEB 90%)', svg: <svg viewBox="0 0 32 32" fill="white" width={34} height={34}><path d="M16 4c-3.26 0-3.67.014-4.947.072-1.277.058-2.148.261-2.913.558a5.88 5.88 0 00-2.126 1.384A5.88 5.88 0 004.63 8.14c-.297.765-.5 1.636-.558 2.913C4.014 12.33 4 12.74 4 16s.014 3.67.072 4.947c.058 1.277.261 2.148.558 2.913a5.88 5.88 0 001.384 2.126 5.88 5.88 0 002.126 1.384c.765.297 1.636.5 2.913.558C11.33 27.986 11.74 28 16 28s3.67-.014 4.947-.072c1.277-.058 2.148-.261 2.913-.558a5.88 5.88 0 002.126-1.384 5.88 5.88 0 001.384-2.126c.297-.765.5-1.636.558-2.913.058-1.277.072-1.687.072-4.947s-.014-3.67-.072-4.947c-.058-1.277-.261-2.148-.558-2.913a5.88 5.88 0 00-1.384-2.126A5.88 5.88 0 0023.86 4.63c-.765-.297-1.636-.5-2.913-.558C19.67 4.014 19.26 4 16 4zm0 2.162c3.204 0 3.584.012 4.85.07 1.17.053 1.805.249 2.228.413.56.218.96.478 1.38.898.42.42.68.82.898 1.38.164.423.36 1.058.413 2.228.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.053 1.17-.249 1.805-.413 2.228-.218.56-.478.96-.898 1.38-.42.42-.82.68-1.38.898-.423.164-1.058.36-2.228.413-1.265.058-1.645.07-4.85.07s-3.585-.012-4.85-.07c-1.17-.053-1.805-.249-2.228-.413a3.71 3.71 0 01-1.38-.898 3.71 3.71 0 01-.898-1.38c-.164-.423-.36-1.058-.413-2.228C6.174 19.584 6.162 19.204 6.162 16s.012-3.584.07-4.85c.053-1.17.249-1.805.413-2.228.218-.56.478-.96.898-1.38.42-.42.82-.68 1.38-.898.423-.164 1.058-.36 2.228-.413 1.266-.058 1.646-.07 4.85-.07zM16 10.838a5.162 5.162 0 100 10.324 5.162 5.162 0 000-10.324zM16 19a3 3 0 110-6 3 3 0 010 6zm5.338-9.87a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z"/></svg> },
  { bg: '#1877F2',  svg: <svg viewBox="0 0 32 32" fill="white" width={34} height={34}><path d="M29 16C29 8.82 23.18 3 16 3S3 8.82 3 16c0 6.63 4.86 12.13 11.21 13.08V19.84h-3.37V16h3.37v-2.93c0-3.33 1.98-5.16 5.01-5.16 1.45 0 2.97.26 2.97.26v3.27h-1.67c-1.65 0-2.16 1.02-2.16 2.07V16h3.68l-.59 3.84h-3.09v9.24C24.14 28.13 29 22.63 29 16z"/></svg> },
  { bg: 'linear-gradient(135deg,#0099FF 0%,#A033FF 100%)', svg: <svg viewBox="0 0 32 32" fill="white" width={34} height={34}><path d="M16 3C8.82 3 3 8.46 3 15.19c0 3.79 1.87 7.16 4.8 9.38V29l4.37-2.4A13.3 13.3 0 0016 27.38c7.18 0 13-5.46 13-12.19C29 8.46 23.18 3 16 3zm1.29 16.41l-3.3-3.52-6.45 3.52 7.1-7.54 3.38 3.52 6.36-3.52-7.09 7.54z"/></svg> },
  { bg: '#010101',  svg: <svg viewBox="0 0 32 32" fill="none" width={34} height={34}><path d="M22.5 6.5a5.5 5.5 0 01-4.5-5h-3.5v14l-.01 6.9a3.2 3.2 0 01-3.19 2.6 3.2 3.2 0 01-3.2-3.2 3.2 3.2 0 013.2-3.2c.32 0 .62.05.9.13V15.1a7.2 7.2 0 00-.9-.06 6.8 6.8 0 00-6.8 6.8A6.8 6.8 0 0011.3 28.62a6.8 6.8 0 006.7-6.8V14a9.1 9.1 0 005.5 1.85v-3.6a5.52 5.52 0 01-1-.18z" fill="white"/></svg> },
  { bg: '#25D366',  svg: <svg viewBox="0 0 32 32" fill="none" width={34} height={34}><path d="M16 3C8.82 3 3 8.82 3 16c0 2.45.66 4.74 1.8 6.72L3 29l6.52-1.71A13 13 0 0016 29c7.18 0 13-5.82 13-13S23.18 3 16 3z" fill="white"/><path d="M21.8 19.1c-.28-.14-1.66-.82-1.92-.91-.25-.1-.44-.14-.63.14-.19.28-.73.91-.9 1.1-.16.19-.33.21-.61.07-.28-.14-1.19-.44-2.27-1.4-.84-.75-1.4-1.67-1.57-1.95-.16-.28-.02-.43.12-.57.12-.12.28-.33.42-.49.14-.16.19-.28.28-.47.09-.19.05-.35-.02-.49-.07-.14-.63-1.53-.87-2.1-.23-.55-.47-.47-.63-.48h-.54c-.19 0-.49.07-.75.35-.26.28-.97.95-.97 2.32s.99 2.7 1.13 2.89c.14.19 1.96 3 4.76 4.2.67.29 1.19.46 1.6.59.67.22 1.28.19 1.76.11.54-.08 1.66-.68 1.9-1.33.23-.65.23-1.21.16-1.33-.07-.11-.26-.18-.54-.32z" fill="#25D366"/></svg> },
  { bg: '#2AABEE',  svg: <svg viewBox="0 0 32 32" fill="none" width={34} height={34}><path d="M28.1 5.3L3.6 14.9c-1.6.65-1.59 1.55-.29 1.95l6.32 1.97 14.6-9.2c.68-.42 1.31-.19.8.26L11.8 19.3l-.45 6.54c.66 0 .95-.3 1.31-.65l3.16-3.07 6.57 4.86c1.21.67 2.08.32 2.38-1.13l4.3-20.33c.44-1.76-.66-2.56-1.17-2.27z" fill="white"/></svg> },
];

const TRUST_ITEMS = [
  'No credit card required',
  '14-day free trial',
  'Cancel anytime',
];

export default function Hero() {
  const orbitRef = useRef<HTMLDivElement>(null);
  const slotsRef = useRef<HTMLDivElement[]>([]);
  const angleRef = useRef(-Math.PI / 2);
  const lastRef = useRef<number | null>(null);
  const pausedRef = useRef(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const slots = slotsRef.current;
    const N = slots.length;
    const RADIUS = 182;
    const SPEED = (2 * Math.PI) / 20000;

    const step = (ts: number) => {
      if (lastRef.current !== null && !pausedRef.current) {
        angleRef.current += SPEED * (ts - lastRef.current);
      }
      lastRef.current = ts;
      slots.forEach((slot, i) => {
        if (!slot) return;
        const a = angleRef.current + (i * 2 * Math.PI) / N;
        slot.style.transform = `translate(${Math.cos(a) * RADIUS}px,${Math.sin(a) * RADIUS}px)`;
      });
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#f0f7ff] min-h-screen flex items-center">
      {/* Decorative background glow — purely visual, sits behind everything */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 -right-32 w-[560px] h-[560px] rounded-full bg-[#0D47A1]/[0.07] blur-3xl" />
        <div className="absolute -bottom-40 -left-24 w-[420px] h-[420px] rounded-full bg-[#0D47A1]/[0.05] blur-3xl" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
          {/* Left column — copy */}
          <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white border border-[#0D47A1]/10 shadow-[0_2px_8px_rgba(13,71,161,0.07)] text-[#0D47A1] text-xs font-bold px-4 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0D47A1]" />
              Unified Customer Engagement Platform
            </div>

            <h1 className="text-[40px] sm:text-[52px] font-extrabold leading-[1.1] text-[#0D47A1] tracking-[-1px] mb-5">
              Meet your customers wherever they are.
            </h1>

            <p className="text-base sm:text-lg leading-[1.75] text-[#475569] mb-9 mx-auto lg:mx-0">
              Technology should be the bridge to customers, not the barrier. KronGage transforms fragmented data into a single, intelligent conversation, allowing teams to move past the &apos;search&apos; and straight to the &apos;solution&apos;.
            </p>

            <div className="flex flex-wrap gap-3.5 justify-center lg:justify-start mb-7">
              <Button asChild size="lg" className="text-base font-semibold">
                <Link href="/contact">Request a Demo →</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base font-semibold">
                <Link href="/platform">Explore the Platform</Link>
              </Button>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2 justify-center lg:justify-start">
              {TRUST_ITEMS.map(item => (
                <span key={item} className="flex items-center gap-1.5 text-[13px] text-[#64748b] font-medium">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
                    <circle cx="8" cy="8" r="8" fill="#dcfce7" />
                    <path d="M4.5 8.2l2.2 2.2 4.3-4.6" stroke="#16a34a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Right column — orbiting channel visual */}
          <div className="hidden lg:flex justify-center">
            <div
              className="relative w-[440px] h-[440px] shrink-0"
              ref={orbitRef}
              onMouseEnter={() => { pausedRef.current = true; }}
              onMouseLeave={() => { pausedRef.current = false; }}
            >
              <div className="absolute inset-[26px] rounded-full border-[1.5px] border-dashed border-[#0D47A1]/15 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[116px] h-[116px] bg-white rounded-[30px] shadow-[0_8px_48px_rgba(13,71,161,0.22),0_2px_8px_rgba(0,0,0,0.07)] flex items-center justify-center z-10">
                <img src="/Krongage-Logo.png" alt="KronGage" className="w-20 h-20 object-contain" />
              </div>
              {ORBIT_CHIPS.map((chip, i) => (
                <div key={i} className="absolute top-1/2 left-1/2 w-16 h-16 -mt-8 -ml-8" ref={el => { if (el) slotsRef.current[i] = el; }}>
                  <div className="w-16 h-16 rounded-[18px] flex items-center justify-center shadow-[0_6px_22px_rgba(0,0,0,0.18)] transition-[transform,box-shadow] duration-[220ms] hover:scale-[1.13] hover:shadow-[0_12px_36px_rgba(0,0,0,0.26)]" style={{ background: chip.bg }}>{chip.svg}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
