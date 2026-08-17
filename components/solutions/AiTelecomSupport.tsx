'use client';
import { useEffect, useRef } from 'react';
import { Lightning, Clock, Broadcast } from '@phosphor-icons/react';

export default function AiTelecomSupport({ className }: { className?: string }) {
  const roamingRef = useRef<HTMLDivElement>(null);
  const db1Ref = useRef<HTMLDivElement>(null);
  const db2Ref = useRef<HTMLDivElement>(null);
  const db3Ref = useRef<HTMLDivElement>(null);
  const db4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const intervals: ReturnType<typeof setInterval>[] = [];

    function countUp(el: HTMLDivElement | null, target: number, duration: number) {
      if (!el) return;
      let start = 0;
      const step = target / (duration / 50);
      const t = setInterval(() => {
        start = Math.min(start + step, target);
        el.textContent = String(Math.floor(start));
        if (start >= target) clearInterval(t);
      }, 50);
      intervals.push(t);
    }

    timeouts.push(setTimeout(() => { countUp(roamingRef.current, 47, 1000); }, 400));

    timeouts.push(setTimeout(() => {
      if (db1Ref.current) db1Ref.current.style.width = '68%';
      if (db2Ref.current) db2Ref.current.style.width = '82%';
      if (db3Ref.current) db3Ref.current.style.width = '45%';
      if (db4Ref.current) db4Ref.current.style.width = '55%';
    }, 600));

    return () => { timeouts.forEach(clearTimeout); intervals.forEach(clearInterval); };
  }, []);

  return (
    <div className={`w-full h-full bg-[#EEF5FD] overflow-hidden flex items-center justify-center ${className ?? ''}`}>
      <div className="grid grid-cols-2 gap-[10px] w-[340px]">
        <div className="bg-white rounded-2xl px-[14px] py-3">
          <div className="w-[30px] h-[30px] rounded-lg bg-[#EEF5FD] flex items-center justify-center mb-2"><Lightning size={16} weight="duotone" color="#0D47A1" /></div>
          <div className="text-xl font-black text-[#0D47A1] leading-none">73%</div>
          <div className="text-[10px] text-[#64748b] font-semibold mt-[3px] leading-[1.35]">Tickets auto-resolved</div>
          <div className="inline-flex items-center gap-0.5 text-[9px] font-bold mt-[5px] px-1.5 py-0.5 rounded-[10px] bg-[#dcfce7] text-[#15803d]">↑ 18%</div>
        </div>
        <div className="bg-white rounded-2xl px-[14px] py-3">
          <div className="w-[30px] h-[30px] rounded-lg bg-[#EEF5FD] flex items-center justify-center mb-2"><Clock size={16} weight="duotone" color="#0D47A1" /></div>
          <div className="text-xl font-black text-[#0D47A1] leading-none">38s</div>
          <div className="text-[10px] text-[#64748b] font-semibold mt-[3px] leading-[1.35]">Avg AI resolution</div>
          <div className="inline-flex items-center gap-0.5 text-[9px] font-bold mt-[5px] px-1.5 py-0.5 rounded-[10px] bg-[#dcfce7] text-[#15803d]">↓ 4.2 min</div>
        </div>
        <div className="bg-white rounded-2xl px-[14px] py-3">
          <div className="w-[30px] h-[30px] rounded-lg bg-[#EEF5FD] flex items-center justify-center mb-2"><Broadcast size={16} weight="duotone" color="#0D47A1" /></div>
          <div className="text-xl font-black text-[#0D47A1] leading-none" ref={roamingRef}>0</div>
          <div className="text-[10px] text-[#64748b] font-semibold mt-[3px] leading-[1.35]">Roaming issues detected</div>
          <div className="inline-flex items-center gap-0.5 text-[9px] font-bold mt-[5px] px-1.5 py-0.5 rounded-[10px] bg-[#fff7ed] text-[#c2410c]">↑ 3 today</div>
        </div>
        <div className="bg-white rounded-2xl px-[14px] py-3">
          <div className="text-[10px] font-bold text-[#0f172a] mb-2">Issue Breakdown</div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] text-[#64748b]">Roaming</span>
            <div className="w-20 h-1 bg-[#f1f5f9] rounded-sm overflow-hidden"><div className="h-full rounded-sm transition-[width] duration-[1.5s] ease-[cubic-bezier(.4,0,.2,1)]" ref={db1Ref} style={{ width: '0%', background: '#0D47A1' }}></div></div>
          </div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] text-[#64748b]">Data</span>
            <div className="w-20 h-1 bg-[#f1f5f9] rounded-sm overflow-hidden"><div className="h-full rounded-sm transition-[width] duration-[1.5s] ease-[cubic-bezier(.4,0,.2,1)]" ref={db2Ref} style={{ width: '0%', background: '#42a5f5' }}></div></div>
          </div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] text-[#64748b]">Billing</span>
            <div className="w-20 h-1 bg-[#f1f5f9] rounded-sm overflow-hidden"><div className="h-full rounded-sm transition-[width] duration-[1.5s] ease-[cubic-bezier(.4,0,.2,1)]" ref={db3Ref} style={{ width: '0%', background: '#7c3aed' }}></div></div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#64748b]">Calls</span>
            <div className="w-20 h-1 bg-[#f1f5f9] rounded-sm overflow-hidden"><div className="h-full rounded-sm transition-[width] duration-[1.5s] ease-[cubic-bezier(.4,0,.2,1)]" ref={db4Ref} style={{ width: '0%', background: '#f97316' }}></div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
