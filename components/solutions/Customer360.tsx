'use client';
import { useEffect, useRef, useState } from 'react';

const CUSTOMERS = [
  {
    name: 'Helen Drew',
    initials: 'HD',
    color: '#1565C0',
    tier: 'Highly Valued Customer',
    tierColor: '#0D47A1',
    since: 'Member Since 2017',
    scores: [
      { label: 'Engagement', val: 92, color: '#4ade80' },
      { label: 'Loyalty', val: 87, color: '#60a5fa' },
      { label: 'NPS Score', val: 78, color: '#a78bfa' },
      { label: 'Spend Index', val: 94, color: '#fb923c' },
    ],
  },
  {
    name: 'Marcus Osei',
    initials: 'MO',
    color: '#7c3aed',
    tier: 'VIP Member',
    tierColor: '#6d28d9',
    since: 'Member Since 2015',
    scores: [
      { label: 'Engagement', val: 98, color: '#4ade80' },
      { label: 'Loyalty', val: 96, color: '#60a5fa' },
      { label: 'NPS Score', val: 95, color: '#a78bfa' },
      { label: 'Spend Index', val: 99, color: '#fb923c' },
    ],
  },
  {
    name: 'Priya Nair',
    initials: 'PN',
    color: '#059669',
    tier: 'Premium Customer',
    tierColor: '#047857',
    since: 'Member Since 2020',
    scores: [
      { label: 'Engagement', val: 74, color: '#4ade80' },
      { label: 'Loyalty', val: 68, color: '#60a5fa' },
      { label: 'NPS Score', val: 82, color: '#a78bfa' },
      { label: 'Spend Index', val: 71, color: '#fb923c' },
    ],
  },
  {
    name: 'James Thornton',
    initials: 'JT',
    color: '#b45309',
    tier: 'Standard Member',
    tierColor: '#92400e',
    since: 'Member Since 2022',
    scores: [
      { label: 'Engagement', val: 45, color: '#4ade80' },
      { label: 'Loyalty', val: 52, color: '#60a5fa' },
      { label: 'NPS Score', val: 60, color: '#a78bfa' },
      { label: 'Spend Index', val: 38, color: '#fb923c' },
    ],
  },
];

export default function Customer360({ className }: { className?: string }) {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);
  const [barsOn, setBarsOn] = useState(false);
  const autoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const restartAuto = () => {
    if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    autoTimerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % CUSTOMERS.length);
    }, 5000);
  };

  useEffect(() => {
    restartAuto();
    return () => { if (autoTimerRef.current) clearInterval(autoTimerRef.current); };
  }, []);

  useEffect(() => {
    setFading(true);
    setBarsOn(false);
    const fadeTimeout = setTimeout(() => setFading(false), 260);
    const barTimeout = setTimeout(() => setBarsOn(true), 320);
    return () => { clearTimeout(fadeTimeout); clearTimeout(barTimeout); };
  }, [current]);

  const goTo = (idx: number) => {
    if (idx === current) return;
    setCurrent(idx);
    restartAuto();
  };

  const c = CUSTOMERS[current];

  return (
    <div className={`w-full h-full bg-[#e8edf5] overflow-hidden flex items-center justify-center relative ${className ?? ''}`}>
      <div className="absolute rounded-full bg-[#0D47A1] pointer-events-none z-0 w-[260px] h-[260px] -top-[60px] -right-[60px] opacity-90 rounded-[40%_60%_60%_40%/50%_50%_50%_50%]"></div>
      <div className="absolute rounded-full bg-[#0D47A1] pointer-events-none z-0 w-[180px] h-[180px] -bottom-10 right-20 opacity-80"></div>

      <div className="relative z-10 bg-white rounded-[18px] shadow-[0_24px_80px_rgba(0,0,0,0.18),0_4px_16px_rgba(0,0,0,0.1)] w-[680px] max-w-full overflow-hidden">
        <div className="flex items-center justify-between px-5 pt-[14px] pb-3 bg-white">
          <span className="text-[15px] font-extrabold text-[#0f172a]">KronGage</span>
          <div className="flex gap-2">
            <div className="h-2 rounded-sm w-10 bg-[#e2e8f0]"></div>
            <div className="h-2 rounded-sm w-10 bg-[#e2e8f0]"></div>
            <div className="h-2 rounded-sm w-[50px] bg-[#0D47A1]"></div>
            <div className="h-2 rounded-sm w-8 bg-[#e2e8f0]"></div>
          </div>
        </div>

        <div className={`bg-[#0f172a] mx-3 mb-3 rounded-2xl px-6 pt-6 pb-5 text-white transition-opacity duration-250 ${fading ? 'opacity-0' : 'opacity-100'}`}>
          <div className="flex items-center gap-[18px] mb-[22px]">
            <div className="relative shrink-0">
              <div className="w-[76px] h-[76px] rounded-full border-[3px] border-white/15 overflow-hidden flex items-center justify-center text-[28px] font-black text-white transition-[background] duration-500" style={{ background: `linear-gradient(135deg, ${c.color}cc, ${c.color})` }}>{c.initials}</div>
              <div className="absolute bottom-[3px] right-[3px] w-3.5 h-3.5 rounded-full bg-[#4ade80] border-2 border-[#0f172a]"></div>
            </div>
            <div className="flex-1">
              <div className="text-[30px] font-extrabold text-white leading-[1.1] mb-2 tracking-[-0.5px]">{c.name}</div>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs font-bold px-[14px] py-1 rounded-full bg-[#0D47A1] text-white" style={{ background: c.tierColor }}>{c.tier}</span>
                <span className="text-[13px] text-white/55 font-medium">{c.since}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {c.scores.map(s => (
              <div key={s.label}>
                <div className="text-[9px] font-bold uppercase tracking-[0.5px] text-white/35 mb-[5px]">{s.label}</div>
                <div className="h-[5px] bg-white/10 rounded-[3px] overflow-hidden">
                  <div className="h-full rounded-[3px] transition-[width] duration-1000 ease-[cubic-bezier(.4,0,.2,1)]" style={{ width: barsOn ? `${s.val}%` : '0%', background: s.color }}></div>
                </div>
                <div className="text-[11px] font-bold text-white/70 mt-1">{s.val}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-1.5 pt-2.5 pb-0.5">
          {CUSTOMERS.map((cust, i) => (
            <div
              key={cust.name}
              className={`h-1.5 rounded-[10px] cursor-pointer transition-[background,width] duration-300 ease-[cubic-bezier(.4,0,.2,1)] ${i === current ? 'bg-[#0D47A1] w-5' : 'bg-[#cbd5e1] w-1.5'}`}
              onClick={() => goTo(i)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
