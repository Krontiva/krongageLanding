'use client';
import { useEffect, useState } from 'react';
import { ShoppingCart, BellRinging, CheckCircle, Star, Checks } from '@phosphor-icons/react';

const STEPS = [
  { icon: ShoppingCart, title: 'Cart Abandoned', sub: '3 items left in cart · GH₵ 86.00' },
  { icon: BellRinging, title: 'Reminder Sent', sub: '10% off nudge via WhatsApp · Delivered', readReceipt: true },
  { icon: CheckCircle, title: 'Purchase Completed', sub: 'Checked out within the hour' },
  { icon: Star, title: 'Loyalty Points Earned', sub: '+120 points · Tier upgraded' },
];

export default function HeroFmcg({ className }: { className?: string }) {
  const [lit, setLit] = useState(STEPS.map(() => false));

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const runTimeline = () => {
      setLit(STEPS.map(() => false));
      const delays = [300, 1100, 1900, 2700];
      delays.forEach((delay, i) => timeouts.push(setTimeout(() => setLit(s => s.map((v, idx) => idx === i ? true : v)), delay)));
    };
    runTimeline();
    const intervalId = setInterval(runTimeline, 9000);

    return () => { clearInterval(intervalId); timeouts.forEach(clearTimeout); };
  }, []);

  return (
    <div className={`w-full h-full bg-[#EEF5FD] overflow-hidden flex items-center justify-center ${className ?? ''}`}>
      <div className="flex items-center justify-center w-full h-full p-8">
        <div className="w-full max-w-[340px] bg-white rounded-[20px] overflow-hidden">
          <div className="bg-[linear-gradient(135deg,#0D47A1,#1565C0)] px-5 py-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-[10px] bg-white/[0.18] flex items-center justify-center shrink-0"><ShoppingCart size={20} weight="duotone" color="#fff" /></div>
            <div>
              <div className="text-sm font-extrabold text-white">Shopper Engagement</div>
              <div className="text-[11px] text-white/65 mt-0.5">Powered by KronGage</div>
            </div>
          </div>

          <div className="px-5 py-3 flex items-center gap-2.5 border-b border-[#f1f5f9]">
            <div className="w-9 h-9 rounded-full shrink-0 bg-[linear-gradient(135deg,#0D47A1,#1976D2)] flex items-center justify-center text-[13px] font-extrabold text-white">AK</div>
            <div>
              <div className="text-[13px] font-extrabold text-[#0f172a]">Akosua Koomson</div>
              <div className="text-[11px] text-[#64748b] mt-px">Loyal customer · 3 years</div>
            </div>
            <span className="ml-auto text-[10px] font-bold bg-[#dbeafe] text-[#0D47A1] px-2 py-[3px] rounded-md whitespace-nowrap">VIP</span>
          </div>

          <div className="px-5 pt-4 pb-5 relative">
            {STEPS.map((s, i) => {
              const isLit = lit[i];
              const isLast = i === STEPS.length - 1;
              return (
                <div
                  key={s.title}
                  className={`flex items-start gap-3.5 relative pb-[22px] last:pb-0 transition-[opacity,transform] duration-[450ms] ease-in-out ${isLit ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2.5'}`}
                >
                  {!isLast && (
                    <div className={`absolute left-[15px] top-[34px] w-0.5 h-[calc(100%-34px)] transition-colors duration-[400ms] ease-in-out ${isLit ? 'bg-[#bbf7d0]' : 'bg-[#e2e8f0]'}`}></div>
                  )}
                  <div className={`w-8 h-8 rounded-full shrink-0 border-2 flex items-center justify-center transition-colors duration-[400ms] ease-in-out relative z-[1] ${isLit ? 'bg-[#f0fdf4] border-[#86efac]' : 'bg-[#f1f5f9] border-[#e2e8f0]'}`}>
                    <s.icon size={16} weight="duotone" color={isLit ? '#16a34a' : '#94a3b8'} />
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="text-[13px] font-extrabold text-[#0f172a] flex items-center gap-1.5">
                      {s.title}
                      <div className={`w-[18px] h-[18px] rounded-full bg-[#22c55e] shrink-0 flex items-center justify-center transition-[opacity,transform] duration-300 [transition-delay:150ms] ${isLit ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                        <CheckCircle size={10} weight="duotone" color="#fff" />
                      </div>
                    </div>
                    <div className="text-[11px] text-[#64748b] mt-[3px] leading-[1.5] inline-flex items-center gap-1">
                      {s.sub}
                      {'readReceipt' in s && s.readReceipt && <Checks size={12} weight="duotone" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
