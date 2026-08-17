'use client';
import { useEffect, useRef, useState } from 'react';
import { Fingerprint } from '@phosphor-icons/react';

const POLICYHOLDERS = [
  {
    name: 'Sarah Chen',
    initials: 'SC',
    color: '#0D47A1',
    tier: 'Churn Risk: Low',
    tierColor: '#0D47A1',
    since: 'Policyholder since 2018',
    scores: [
      { label: 'Claims Frequency', val: 22, color: '#22c55e' },
      { label: 'Renewal Likelihood', val: 91, color: '#3b82f6' },
      { label: 'Cross-Sell Score', val: 64, color: '#a855f7' },
      { label: 'Loyalty Index', val: 88, color: '#f97316' },
    ],
  },
  {
    name: 'Marcus Webb',
    initials: 'MW',
    color: '#ea580c',
    tier: 'Renewal Risk: High',
    tierColor: '#c2410c',
    since: 'Policyholder since 2021',
    scores: [
      { label: 'Claims Frequency', val: 58, color: '#22c55e' },
      { label: 'Renewal Likelihood', val: 34, color: '#3b82f6' },
      { label: 'Cross-Sell Score', val: 41, color: '#a855f7' },
      { label: 'Loyalty Index', val: 39, color: '#f97316' },
    ],
  },
  {
    name: 'Aisha Okafor',
    initials: 'AO',
    color: '#7c3aed',
    tier: 'Expansion: Peak',
    tierColor: '#6d28d9',
    since: 'Policyholder since 2016',
    scores: [
      { label: 'Claims Frequency', val: 12, color: '#22c55e' },
      { label: 'Renewal Likelihood', val: 96, color: '#3b82f6' },
      { label: 'Cross-Sell Score', val: 89, color: '#a855f7' },
      { label: 'Loyalty Index', val: 93, color: '#f97316' },
    ],
  },
];

export default function InsuranceIdentity360({ className }: { className?: string }) {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);
  const [barsOn, setBarsOn] = useState(false);
  const autoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const restartAuto = () => {
    if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    autoTimerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % POLICYHOLDERS.length);
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

  const c = POLICYHOLDERS[current];

  return (
    <div className={`w-full h-full bg-[#EEF5FD] overflow-hidden flex items-center justify-center ${className ?? ''}`}>
      <div className="flex items-center justify-center w-full h-full p-8">
        <div className="w-full max-w-[420px] bg-white rounded-[20px] overflow-hidden">
          <div className="bg-[linear-gradient(135deg,#0D47A1,#1565C0)] px-5 py-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-[10px] bg-white/[0.18] flex items-center justify-center shrink-0"><Fingerprint size={20} weight="duotone" color="#fff" /></div>
            <div>
              <div className="text-sm font-extrabold text-white">Policyholder Identity</div>
              <div className="text-[11px] text-white/65 mt-0.5">Powered by KronGage</div>
            </div>
          </div>

          <div className={`px-5 pt-5 pb-4 transition-opacity duration-250 ${fading ? 'opacity-0' : 'opacity-100'}`}>
            <div className="flex items-center gap-3.5 mb-5">
              <div className="relative shrink-0">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-extrabold text-white transition-[background] duration-500" style={{ background: `linear-gradient(135deg, ${c.color}cc, ${c.color})` }}>{c.initials}</div>
                <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#22c55e] border-2 border-white"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[15px] font-extrabold text-[#0f172a] leading-tight">{c.name}</div>
                <div className="flex items-center gap-2 flex-wrap mt-1.5">
                  <span className="text-[10px] font-bold px-2.5 py-[3px] rounded-full text-white whitespace-nowrap" style={{ background: c.tierColor }}>{c.tier}</span>
                  <span className="text-[11px] text-[#64748b] font-medium whitespace-nowrap">{c.since}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-3.5">
              {c.scores.map(s => (
                <div key={s.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-[0.5px] text-[#94a3b8]">{s.label}</span>
                    <span className="text-[11px] font-extrabold text-[#0f172a]">{s.val}</span>
                  </div>
                  <div className="h-[5px] bg-[#f1f5f9] rounded-[3px] overflow-hidden">
                    <div className="h-full rounded-[3px] transition-[width] duration-1000 ease-[cubic-bezier(.4,0,.2,1)]" style={{ width: barsOn ? `${s.val}%` : '0%', background: s.color }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-1.5 pb-4">
            {POLICYHOLDERS.map((p, i) => (
              <div
                key={p.name}
                className={`h-1.5 rounded-[10px] cursor-pointer transition-[background,width] duration-300 ease-[cubic-bezier(.4,0,.2,1)] ${i === current ? 'bg-[#0D47A1] w-5' : 'bg-[#cbd5e1] w-1.5'}`}
                onClick={() => goTo(i)}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
