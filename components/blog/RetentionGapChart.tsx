'use client';
import { useEffect, useRef } from 'react';

export default function RetentionGapChart({ className }: { className?: string }) {
  const gapGlowRef = useRef<SVGPathElement>(null);
  const gapFillRef = useRef<SVGPathElement>(null);
  const expGlowRef = useRef<SVGPathElement>(null);
  const expLineRef = useRef<SVGPathElement>(null);
  const actGlowRef = useRef<SVGPathElement>(null);
  const actLineRef = useRef<SVGPathElement>(null);
  const dotsExpRef = useRef<SVGGElement>(null);
  const dotsActRef = useRef<SVGGElement>(null);
  const labelExpRef = useRef<SVGGElement>(null);
  const labelActRef = useRef<SVGGElement>(null);
  const labelGapRef = useRef<SVGGElement>(null);
  const markerQ3Ref = useRef<SVGGElement>(null);

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const schedule = (fn: () => void, delay: number) => { timeouts.push(setTimeout(fn, delay)); };

    const fade = (el: SVGElement | null, to: string, duration: number, delay: number) => {
      if (!el) return;
      schedule(() => {
        el.style.transition = `opacity ${duration}ms ease`;
        el.style.opacity = to;
      }, delay);
    };

    const drawPath = (lineEl: SVGPathElement | null, glowEl: SVGPathElement | null, duration: number, delay: number) => {
      [lineEl, glowEl].forEach(el => {
        if (!el) return;
        const len = el.getTotalLength();
        el.style.strokeDasharray = `${len}`;
        el.style.strokeDashoffset = `${len}`;
        el.style.opacity = '1';
      });
      schedule(() => {
        [lineEl, glowEl].forEach(el => {
          if (!el) return;
          el.style.transition = `stroke-dashoffset ${duration}ms cubic-bezier(0.4,0,0.2,1)`;
          el.style.strokeDashoffset = '0';
        });
      }, delay);
    };

    const T = 300;
    drawPath(expLineRef.current, expGlowRef.current, 1800, T);
    drawPath(actLineRef.current, actGlowRef.current, 1800, T + 400);
    fade(gapGlowRef.current, '0.12', 1200, T + 1800);
    fade(gapFillRef.current, '1', 1200, T + 1800);
    fade(dotsExpRef.current, '1', 600, T + 1600);
    fade(dotsActRef.current, '1', 600, T + 1800);
    fade(labelExpRef.current, '1', 700, T + 2100);
    fade(labelActRef.current, '1', 700, T + 2300);
    fade(labelGapRef.current, '1', 700, T + 2500);
    fade(markerQ3Ref.current, '1', 600, T + 2700);

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className={`w-full h-full bg-[#080e1a] overflow-hidden ${className ?? ''}`}>
      <svg viewBox="0 0 900 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" className="block">
        <defs>
          <linearGradient id="rg-gapGrad" x1="0" y1="85" x2="0" y2="308" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.22" />
            <stop offset="55%" stopColor="#ef4444" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.01" />
          </linearGradient>
          <linearGradient id="rg-bgFade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#080e1a" stopOpacity="1" />
            <stop offset="8%" stopColor="#080e1a" stopOpacity="0" />
            <stop offset="92%" stopColor="#080e1a" stopOpacity="0" />
            <stop offset="100%" stopColor="#080e1a" stopOpacity="1" />
          </linearGradient>
          <filter id="rg-glowBlue" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="rg-glowOrange" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="rg-softGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="16" />
          </filter>
          <filter id="rg-dotGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
          </filter>
        </defs>

        <rect width="900" height="440" fill="#080e1a" />

        <line x1="90" y1="85" x2="860" y2="85" stroke="rgba(255,255,255,0.035)" strokeWidth="1" />
        <line x1="90" y1="148" x2="860" y2="148" stroke="rgba(255,255,255,0.035)" strokeWidth="1" />
        <line x1="90" y1="210" x2="860" y2="210" stroke="rgba(255,255,255,0.035)" strokeWidth="1" />
        <line x1="90" y1="273" x2="860" y2="273" stroke="rgba(255,255,255,0.035)" strokeWidth="1" />
        <line x1="90" y1="336" x2="860" y2="336" stroke="rgba(255,255,255,0.035)" strokeWidth="1" />

        <line x1="240" y1="65" x2="240" y2="370" stroke="rgba(255,255,255,0.022)" strokeWidth="1" />
        <line x1="390" y1="65" x2="390" y2="370" stroke="rgba(255,255,255,0.022)" strokeWidth="1" />
        <line x1="540" y1="65" x2="540" y2="370" stroke="rgba(255,255,255,0.022)" strokeWidth="1" />
        <line x1="690" y1="65" x2="690" y2="370" stroke="rgba(255,255,255,0.022)" strokeWidth="1" />
        <line x1="840" y1="65" x2="840" y2="370" stroke="rgba(255,255,255,0.022)" strokeWidth="1" />

        <line x1="90" y1="60" x2="90" y2="372" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
        <line x1="85" y1="368" x2="862" y2="368" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />

        <text x="78" y="89" textAnchor="end" fontSize="11" fill="rgba(255,255,255,0.22)" fontFamily="system-ui,sans-serif">80%</text>
        <text x="78" y="152" textAnchor="end" fontSize="11" fill="rgba(255,255,255,0.22)" fontFamily="system-ui,sans-serif">62%</text>
        <text x="78" y="214" textAnchor="end" fontSize="11" fill="rgba(255,255,255,0.22)" fontFamily="system-ui,sans-serif">45%</text>
        <text x="78" y="277" textAnchor="end" fontSize="11" fill="rgba(255,255,255,0.22)" fontFamily="system-ui,sans-serif">27%</text>

        <text x="90" y="388" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.18)" fontFamily="system-ui,sans-serif">Q1</text>
        <text x="240" y="388" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.18)" fontFamily="system-ui,sans-serif">Q2</text>
        <text x="390" y="388" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.18)" fontFamily="system-ui,sans-serif">Q3</text>
        <text x="540" y="388" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.18)" fontFamily="system-ui,sans-serif">Q4</text>
        <text x="690" y="388" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.18)" fontFamily="system-ui,sans-serif">Q5</text>
        <text x="840" y="388" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.18)" fontFamily="system-ui,sans-serif">Q6</text>

        <text transform="rotate(-90)" x="-215" y="26" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.18)" fontFamily="system-ui,sans-serif">Retention Rate</text>

        <text x="95" y="44" fontSize="12" fill="rgba(255,255,255,0.25)" fontFamily="system-ui,sans-serif" fontWeight={600} letterSpacing="0.8">Customer Retention Over Time</text>

        <path
          ref={gapGlowRef}
          opacity={0}
          d="M 90,315 C 155,308 200,298 240,292 C 305,284 348,280 390,278 C 460,280 505,285 540,292 C 608,302 652,310 690,316 C 748,320 798,320 840,320 L 840,85 C 798,88 748,93 690,103 C 652,110 608,122 540,138 C 505,148 460,162 390,175 C 348,183 305,198 240,218 C 200,230 155,250 90,275 Z"
          fill="#ef4444" filter="url(#rg-softGlow)"
        />
        <path
          ref={gapFillRef}
          className="animate-[rg-gapPulse_4s_ease-in-out_infinite]"
          opacity={0}
          d="M 90,315 C 155,308 200,298 240,292 C 305,284 348,280 390,278 C 460,280 505,285 540,292 C 608,302 652,310 690,316 C 748,320 798,320 840,320 L 840,85 C 798,88 748,93 690,103 C 652,110 608,122 540,138 C 505,148 460,162 390,175 C 348,183 305,198 240,218 C 200,230 155,250 90,275 Z"
          fill="url(#rg-gapGrad)"
        />

        <path
          ref={expGlowRef}
          opacity={0}
          d="M 90,275 C 155,252 200,234 240,218 C 305,198 348,183 390,172 C 460,156 505,142 540,130 C 608,112 652,100 690,92 C 748,84 798,84 840,82"
          fill="none" stroke="rgba(147,197,253,0.35)" strokeWidth="12" strokeLinecap="round"
          filter="url(#rg-glowBlue)"
        />
        <path
          ref={expLineRef}
          opacity={0}
          d="M 90,275 C 155,252 200,234 240,218 C 305,198 348,183 390,172 C 460,156 505,142 540,130 C 608,112 652,100 690,92 C 748,84 798,84 840,82"
          fill="none" stroke="#93c5fd" strokeWidth="2.5" strokeLinecap="round"
          strokeDasharray="6 8"
        />

        <path
          ref={actGlowRef}
          opacity={0}
          d="M 90,315 C 155,308 200,298 240,292 C 305,284 348,280 390,278 C 460,282 505,290 540,298 C 608,310 652,316 690,322 C 748,328 798,330 840,332"
          fill="none" stroke="rgba(251,146,60,0.4)" strokeWidth="12" strokeLinecap="round"
          filter="url(#rg-glowOrange)"
        />
        <path
          ref={actLineRef}
          opacity={0}
          d="M 90,315 C 155,308 200,298 240,292 C 305,284 348,280 390,278 C 460,282 505,290 540,298 C 608,310 652,316 690,322 C 748,328 798,330 840,332"
          fill="none" stroke="#fb923c" strokeWidth="3" strokeLinecap="round"
        />

        <g ref={dotsExpRef} opacity={0}>
          <circle cx="240" cy="218" r="3.5" fill="#93c5fd" filter="url(#rg-dotGlow)" />
          <circle cx="240" cy="218" r="3.5" fill="#93c5fd" />
          <circle cx="390" cy="172" r="3.5" fill="#93c5fd" filter="url(#rg-dotGlow)" />
          <circle cx="390" cy="172" r="3.5" fill="#93c5fd" />
          <circle cx="540" cy="130" r="3.5" fill="#93c5fd" filter="url(#rg-dotGlow)" />
          <circle cx="540" cy="130" r="3.5" fill="#93c5fd" />
          <circle cx="690" cy="92" r="3.5" fill="#93c5fd" filter="url(#rg-dotGlow)" />
          <circle cx="690" cy="92" r="3.5" fill="#93c5fd" />
          <circle cx="840" cy="82" r="3.5" fill="#93c5fd" filter="url(#rg-dotGlow)" />
          <circle cx="840" cy="82" r="3.5" fill="#93c5fd" />
        </g>

        <g ref={dotsActRef} opacity={0}>
          <circle cx="240" cy="292" r="3.5" fill="#fb923c" filter="url(#rg-dotGlow)" />
          <circle cx="240" cy="292" r="3.5" fill="#fb923c" />
          <circle cx="390" cy="278" r="3.5" fill="#fb923c" filter="url(#rg-dotGlow)" />
          <circle cx="390" cy="278" r="3.5" fill="#fb923c" />
          <circle cx="540" cy="298" r="3.5" fill="#fb923c" filter="url(#rg-dotGlow)" />
          <circle cx="540" cy="298" r="3.5" fill="#fb923c" />
          <circle cx="690" cy="322" r="3.5" fill="#fb923c" filter="url(#rg-dotGlow)" />
          <circle cx="690" cy="322" r="3.5" fill="#fb923c" />
          <circle cx="840" cy="332" r="3.5" fill="#fb923c" filter="url(#rg-dotGlow)" />
          <circle cx="840" cy="332" r="3.5" fill="#fb923c" />
        </g>

        <g ref={labelExpRef} opacity={0}>
          <rect x="732" y="64" width="96" height="24" rx="5" fill="rgba(147,197,253,0.1)" stroke="rgba(147,197,253,0.28)" strokeWidth="1" />
          <text x="780" y="80" textAnchor="middle" fontSize="11" fontWeight={700} fill="#93c5fd" fontFamily="system-ui,sans-serif">↗ Expected</text>
        </g>

        <g ref={labelActRef} opacity={0}>
          <rect x="732" y="318" width="96" height="24" rx="5" fill="rgba(251,146,60,0.1)" stroke="rgba(251,146,60,0.28)" strokeWidth="1" />
          <text x="780" y="334" textAnchor="middle" fontSize="11" fontWeight={700} fill="#fb923c" fontFamily="system-ui,sans-serif">↘ Actual</text>
        </g>

        <g ref={labelGapRef} opacity={0}>
          <line x1="624" y1="103" x2="624" y2="320" stroke="rgba(239,68,68,0.45)" strokeWidth="1.5" strokeDasharray="3 4" />
          <line x1="617" y1="103" x2="631" y2="103" stroke="rgba(239,68,68,0.7)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="617" y1="320" x2="631" y2="320" stroke="rgba(239,68,68,0.7)" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="635" y="196" width="70" height="34" rx="8" fill="rgba(239,68,68,0.14)" stroke="rgba(239,68,68,0.38)" strokeWidth="1" />
          <text x="670" y="210" textAnchor="middle" fontSize="10" fontWeight={800} fill="#fca5a5" fontFamily="system-ui,sans-serif" letterSpacing="0.6">THE GAP</text>
          <text x="670" y="223" textAnchor="middle" fontSize="10" fontWeight={600} fill="rgba(252,165,165,0.55)" fontFamily="system-ui,sans-serif">~250pp</text>
        </g>

        <g ref={markerQ3Ref} opacity={0}>
          <circle cx="390" cy="224" r="20" fill="rgba(239,68,68,0.06)" stroke="rgba(239,68,68,0.2)" strokeWidth="1" strokeDasharray="2 3" />
          <text x="390" y="260" textAnchor="middle" fontSize="9" fill="rgba(239,68,68,0.55)" fontFamily="system-ui,sans-serif" fontWeight={700}>diverges here</text>
        </g>

        <rect width="900" height="440" fill="url(#rg-bgFade)" pointerEvents="none" />
      </svg>
    </div>
  );
}
