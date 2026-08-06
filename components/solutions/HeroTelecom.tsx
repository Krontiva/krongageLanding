'use client';
import { useState } from 'react';
import { ChatCircle, ChartLineUp, Broadcast, Gear } from '@phosphor-icons/react';

const FEATURES = [
  { icon: <ChatCircle size={18} weight="duotone" color="#0D47A1" />, name: 'Personalised Offerings' },
  { icon: <ChartLineUp size={18} weight="duotone" color="#0D47A1" />, name: 'Predictive Analytics' },
  { icon: <Broadcast size={18} weight="duotone" color="#0D47A1" />, name: 'Omnichannel Engagement' },
  { icon: <Gear size={18} weight="duotone" color="#0D47A1" />, name: 'Improved Efficiency' },
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
