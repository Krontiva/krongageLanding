'use client';
import { useEffect, useRef, useState } from 'react';
import { ChartLineUp, CurrencyDollar, Lightning } from '@phosphor-icons/react';

export default function VanityMetricsScene({ className }: { className?: string }) {
  const sparkLineRef = useRef<SVGPathElement>(null);
  const sparkFillRef = useRef<SVGPathElement>(null);
  const [dimmed, setDimmed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const pts: [number, number][] = [
      [0, 30], [25, 26], [50, 22], [75, 19], [100, 15], [125, 12], [150, 9], [175, 7], [200, 4],
    ];
    const linePath = 'M' + pts.map(p => p.join(',')).join(' L');
    const fillPath = linePath + ' L200,36 L0,36 Z';

    const line = sparkLineRef.current;
    const fill = sparkFillRef.current;
    if (line && fill) {
      line.setAttribute('d', linePath);
      fill.setAttribute('d', fillPath);

      const len = line.getTotalLength();
      line.style.strokeDasharray = `${len}`;
      line.style.strokeDashoffset = `${len}`;
      line.style.transition = 'stroke-dashoffset 1.8s ease .5s';
      timeouts.push(setTimeout(() => { line.style.strokeDashoffset = '0'; }, 100));
    }

    const dimVanity = () => {
      if (cancelled) return;
      setDimmed(true);
      timeouts.push(setTimeout(() => {
        if (cancelled) return;
        setDimmed(false);
        timeouts.push(setTimeout(dimVanity, 2000));
      }, 3000));
    };
    timeouts.push(setTimeout(dimVanity, 1200));

    return () => { cancelled = true; timeouts.forEach(clearTimeout); };
  }, []);

  return (
    <div className={`w-full h-full overflow-hidden ${className ?? ''}`}>
      <div className="[font-family:'Segoe_UI',system-ui,sans-serif] bg-[#f8fafc] w-full h-full overflow-hidden flex items-center justify-center">
        <div className="w-full h-full grid grid-cols-[1fr_1px_1fr] gap-0 relative">
          <div className={`pl-7 pr-6 py-5 flex flex-col justify-center gap-3 relative transition-opacity duration-[800ms] ease-in-out ${dimmed ? 'opacity-[0.35]' : 'opacity-100'}`}>
            <div className="text-[10px] font-extrabold tracking-[1px] uppercase mb-1 text-[#94a3b8]">What you track</div>

            <div className="flex flex-col">
              <div className="text-[28px] font-black leading-none text-[#94a3b8]">2.4M</div>
              <div className="text-[10px] font-semibold text-[#cbd5e1] mt-[3px]">Monthly impressions</div>
              <div className="inline-block text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#fee2e2] text-[#dc2626] mt-[3px] self-start">No action signal</div>
            </div>
            <div className="flex flex-col">
              <div className="text-[28px] font-black leading-none text-[#94a3b8]">38%</div>
              <div className="text-[10px] font-semibold text-[#cbd5e1] mt-[3px]">Email open rate</div>
              <div className="inline-block text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#fee2e2] text-[#dc2626] mt-[3px] self-start">Alone, meaningless</div>
            </div>
            <div className="flex flex-col">
              <div className="text-[28px] font-black leading-none text-[#94a3b8]">12K</div>
              <div className="text-[10px] font-semibold text-[#cbd5e1] mt-[3px]">New followers</div>
              <div className="inline-block text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#fee2e2] text-[#dc2626] mt-[3px] self-start">Doesn&apos;t pay bills</div>
            </div>
          </div>

          <div className="bg-[#e2e8f0] h-[70%] self-center relative">
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#f8fafc] text-[#94a3b8] text-[10px] font-extrabold px-[6px] py-1 rounded-full border border-[#e2e8f0] whitespace-nowrap">vs</span>
          </div>

          <div className="pl-6 pr-7 py-5 flex flex-col justify-center gap-[10px] relative">
            <div className="absolute inset-2 rounded-[14px] bg-[linear-gradient(135deg,rgba(13,71,161,0.04),rgba(34,197,94,0.04))] border border-[#0D47A1]/[0.08] pointer-events-none" />
            <div className="text-[10px] font-extrabold tracking-[1px] uppercase mb-1 text-[#0D47A1] relative">What actually matters</div>

            <div className="flex items-center gap-3 relative">
              <div className="w-[34px] h-[34px] rounded-[10px] flex items-center justify-center text-base shrink-0" style={{ background: '#dcfce7' }}><ChartLineUp size={16} weight="duotone" color="#15803d" /></div>
              <div className="flex-1">
                <div className="text-[10px] font-bold text-[#64748b] mb-0.5">Net Revenue Retention</div>
                <div className="text-xl font-black leading-none" style={{ color: '#15803d' }}>112%</div>
                <div className="text-[10px] font-bold mt-0.5" style={{ color: '#15803d' }}>↑ +8pp vs last year</div>
              </div>
            </div>

            <div className="flex items-center gap-3 relative">
              <div className="w-[34px] h-[34px] rounded-[10px] flex items-center justify-center text-base shrink-0" style={{ background: '#dbeafe' }}><CurrencyDollar size={16} weight="duotone" color="#0D47A1" /></div>
              <div className="flex-1">
                <div className="text-[10px] font-bold text-[#64748b] mb-0.5">Customer Lifetime Value</div>
                <div className="text-xl font-black leading-none" style={{ color: '#0D47A1' }}>$840</div>
                <div className="text-[10px] font-bold mt-0.5" style={{ color: '#0D47A1' }}>↑ up from $590</div>
              </div>
            </div>

            <div className="flex items-center gap-3 relative">
              <div className="w-[34px] h-[34px] rounded-[10px] flex items-center justify-center text-base shrink-0" style={{ background: '#fef9c3' }}><Lightning size={16} weight="duotone" color="#d97706" /></div>
              <div className="flex-1">
                <div className="text-[10px] font-bold text-[#64748b] mb-0.5">Churn Rate</div>
                <div className="text-xl font-black leading-none" style={{ color: '#d97706' }}>2.1%</div>
                <div className="text-[10px] font-bold mt-0.5" style={{ color: '#d97706' }}>↓ down from 6.4%</div>
              </div>
            </div>

            <svg viewBox="0 0 200 36" className="w-full mt-1 relative">
              <defs>
                <linearGradient id="vm-sg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0D47A1" stopOpacity=".25" />
                  <stop offset="100%" stopColor="#0D47A1" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path ref={sparkFillRef} d="" fill="url(#vm-sg)" />
              <path ref={sparkLineRef} d="" fill="none" stroke="#0D47A1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
