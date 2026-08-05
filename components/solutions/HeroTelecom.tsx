'use client';
import { useState } from 'react';

const iconClass = "w-[18px] h-[18px] fill-none stroke-[#0D47A1] [stroke-width:1.8] [stroke-linecap:round] [stroke-linejoin:round]";

const FEATURES = [
  { icon: <svg viewBox="0 0 24 24" className={iconClass}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>, name: 'Personalised Offerings' },
  { icon: <svg viewBox="0 0 24 24" className={iconClass}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>, name: 'Predictive Analytics' },
  { icon: <svg viewBox="0 0 24 24" className={iconClass}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>, name: 'Omnichannel Engagement' },
  { icon: <svg viewBox="0 0 24 24" className={iconClass}><circle cx="12" cy="12" r="3" /><path d="M12 1v4m0 14v4M4.22 4.22l2.83 2.83m9.9 9.9l2.83 2.83M1 12h4m14 0h4M4.22 19.78l2.83-2.83m9.9-9.9l2.83-2.83" /></svg>, name: 'Improved Efficiency' },
];

export default function HeroTelecom({ className }: { className?: string }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className={`w-full h-full bg-[#EEF5FD] overflow-hidden flex items-center justify-center ${className ?? ''}`}>
      <div className="flex items-center justify-center w-full h-full p-8">
        <div className="w-full max-w-[340px]">
          <div className="bg-white rounded-[20px] shadow-[0_12px_48px_rgba(13,71,161,0.12),0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden">
            <div className="bg-[#f5f8ff] px-3.5 py-4 relative overflow-hidden">
              <div className="bg-white rounded-2xl px-3.5 py-4 shadow-[0_2px_12px_rgba(13,71,161,0.08)]">
                <div className="text-[13px] font-extrabold text-[#0D47A1] text-center mb-1.5">KronGage Customer Engagement for Telecom</div>
                <div className="text-[11px] text-[#64748b] text-center leading-[1.55] mb-3.5">Discover how KronGage helps telecom providers improve customer interaction and satisfaction.</div>

                <div className="grid grid-cols-2 gap-2">
                  {FEATURES.map((f, i) => (
                    <div
                      key={f.name}
                      className={`flex flex-col items-center justify-center px-2 py-3 rounded-[10px] border-[1.5px] bg-white cursor-pointer transition-all hover:border-[#0D47A1] hover:bg-[#EEF5FD] ${active === i ? 'border-[#0D47A1] bg-[#EEF5FD]' : 'border-[#dbeafe]'}`}
                      onClick={() => setActive(i)}
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#EEF5FD] flex items-center justify-center">{f.icon}</div>
                      <div className="text-[11px] font-extrabold text-[#0f172a] mt-1.5 text-center leading-[1.3]">{f.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
