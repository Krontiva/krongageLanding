'use client';
import { useEffect, useState } from 'react';

const MESSAGES = [
  'Your permit is being reviewed. Expected: 2 business days.',
  'Tax filing due in 5 days. File now to avoid penalties.',
  'Your NHIS card renewal is ready for collection.',
];

const SERVICES = [
  { icon: '📋', title: 'Permit Application', sub: 'Business license renewal', badge: 'In Review', badgeClass: 'bg-[#0D47A1]' },
  { icon: '💳', title: 'Tax Filing', sub: 'Annual return 2024', badge: 'Due Soon', badgeClass: 'bg-[#ef4444]' },
];

export default function HeroGovernment({ className }: { className?: string }) {
  const [activeSvc, setActiveSvc] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFading(true);
      const timeoutId = setTimeout(() => {
        setMsgIndex(i => (i + 1) % MESSAGES.length);
        setFading(false);
      }, 380);
      return () => clearTimeout(timeoutId);
    }, 3500);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={`w-full h-full bg-[#EEF5FD] overflow-hidden flex items-center justify-center ${className ?? ''}`}>
      <div className="flex items-center justify-center w-full h-full p-6">
        <div className="w-full max-w-[340px] bg-white rounded-[18px] overflow-hidden shadow-[0_12px_48px_rgba(13,71,161,0.1),0_2px_8px_rgba(0,0,0,0.05)]">
          <div className="bg-[linear-gradient(135deg,#0D47A1,#0a3680)] px-[18px] py-4 flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center text-lg">🏛️</div>
            <div>
              <div className="text-white text-[13px] font-extrabold">CitizenConnect</div>
              <div className="text-white/60 text-[10px] mt-px">Powered by KronGage</div>
            </div>
          </div>

          <div className="bg-[#EEF5FD] px-4 py-2.5 flex items-center gap-2.5 border-b border-[#dbeafe]">
            <div className="w-8 h-8 rounded-full bg-[#0D47A1] flex items-center justify-center text-xs font-extrabold text-white shrink-0">JO</div>
            <div>
              <div className="text-xs font-extrabold text-[#0f172a]">John Owusu</div>
              <div className="text-[10px] text-[#64748b]">ID: GH-2024-00847</div>
            </div>
            <div className="text-[10px] font-bold bg-[#dcfce7] text-[#16a34a] px-[7px] py-0.5 rounded-[5px] ml-auto flex items-center gap-[3px]">✓ Verified</div>
          </div>

          <div className="p-3">
            <div className="text-[10px] font-bold uppercase tracking-[0.5px] text-[#94a3b8] mb-2">Government Services</div>
            {SERVICES.map((s, i) => (
              <div
                key={s.title}
                className={`flex items-center gap-2.5 px-[11px] py-2.5 rounded-[10px] bg-[#f8fafc] border mb-[7px] last:mb-0 cursor-pointer transition-all hover:border-[#0D47A1] hover:bg-[#EEF5FD] ${activeSvc === i ? 'border-[#0D47A1] bg-[#EEF5FD]' : 'border-[#f1f5f9]'}`}
                onClick={() => setActiveSvc(i)}
              >
                <div className="w-8 h-8 rounded-lg bg-[#EEF5FD] flex items-center justify-center text-base shrink-0">{s.icon}</div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-[#0f172a]">{s.title}</div>
                  <div className="text-[10px] text-[#64748b] mt-px">{s.sub}</div>
                </div>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded text-white whitespace-nowrap ${s.badgeClass}`}>{s.badge}</span>
              </div>
            ))}
          </div>

          <div className="px-3 pb-3 mt-2.5">
            <div className="bg-[#0f1f3d] rounded-[10px] px-3.5 py-[11px] flex gap-2.5 items-center min-h-11">
              <div className="w-2 h-2 rounded-full bg-[#4ade80] shrink-0 animate-[hg-blink_1.5s_ease_infinite]"></div>
              <div className={`text-[11px] text-white/85 leading-[1.4] transition-[opacity,transform] duration-[350ms] ease-in-out ${fading ? 'opacity-0 -translate-y-1' : 'opacity-100 translate-y-0'}`}>{MESSAGES[msgIndex]}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
