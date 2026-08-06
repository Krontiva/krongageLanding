'use client';
import { useEffect, useState } from 'react';
import { CheckCircle } from '@phosphor-icons/react';

export default function HeroChatbot({ className }: { className?: string }) {
  const [state, setState] = useState({ cb1: false, cu1: false, ct1: false, cb2: false, cs1: false });

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const runSequence = () => {
      setState({ cb1: false, cu1: false, ct1: false, cb2: false, cs1: false });
      const steps: Array<[keyof typeof state, number]> = [
        ['cb1', 300], ['cu1', 900], ['ct1', 1500], ['cb2', 2400], ['cs1', 3100],
      ];
      steps.forEach(([key, delay]) => {
        timeouts.push(setTimeout(() => {
          setState(s => ({ ...s, [key]: true }));
          if (key === 'cb2') timeouts.push(setTimeout(() => setState(s => ({ ...s, ct1: false })), 50));
        }, delay));
      });
    };
    runSequence();
    const intervalId = setInterval(runSequence, 8000);

    return () => { clearInterval(intervalId); timeouts.forEach(clearTimeout); };
  }, []);

  return (
    <div className={`w-full h-full bg-[#0a1628] overflow-hidden flex items-center justify-center ${className ?? ''}`}>
      <div className="flex flex-col items-center justify-center gap-[10px] w-full h-full p-7">
        <div className={`w-full max-w-[340px] bg-white/[0.07] border border-white/10 rounded-[14px_14px_14px_4px] px-[14px] py-3 flex items-start gap-[10px] transition-[opacity,transform] duration-500 ${state.cb1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3'}`}>
          <div className="w-7 h-7 rounded-lg shrink-0 bg-[#0D47A1] flex items-center justify-center mt-px">
            <svg viewBox="0 0 24 24" className="w-[15px] h-[15px] fill-none stroke-white [stroke-width:1.8] [stroke-linecap:round] [stroke-linejoin:round]"><rect x="3" y="8" width="18" height="12" rx="3" /><path d="M8 8V6a4 4 0 018 0v2" /><circle cx="9" cy="14" r="1.5" fill="#fff" stroke="none" /><circle cx="15" cy="14" r="1.5" fill="#fff" stroke="none" /></svg>
          </div>
          <span className="text-xs text-white/85 leading-[1.6] font-medium">Hello! What can I help you with today?</span>
        </div>

        <div className={`w-full max-w-[340px] bg-white rounded-[14px_14px_4px_14px] py-[11px] pr-[14px] pl-[42px] text-xs text-[#0f172a] leading-[1.5] font-medium shadow-[0_2px_12px_rgba(0,0,0,0.25)] transition-[opacity,transform] duration-500 ${state.cu1 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-3'}`}>I want to confirm my appointment.</div>

        <div className={`w-full max-w-[340px] bg-white/[0.07] border border-white/10 rounded-[14px_14px_14px_4px] py-3 pr-4 pl-[42px] inline-flex gap-[5px] items-center transition-[opacity,transform] duration-[400ms] ${state.ct1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3'}`}>
          <span className="w-[7px] h-[7px] rounded-full bg-white/40 animate-[hcb-tdot_1.2s_ease_infinite]"></span>
          <span className="w-[7px] h-[7px] rounded-full bg-white/40 animate-[hcb-tdot_1.2s_ease_infinite] [animation-delay:0.2s]"></span>
          <span className="w-[7px] h-[7px] rounded-full bg-white/40 animate-[hcb-tdot_1.2s_ease_infinite] [animation-delay:0.4s]"></span>
        </div>

        <div className={`w-full max-w-[340px] bg-white/[0.07] border border-white/10 rounded-[14px_14px_14px_4px] px-[14px] py-3 flex items-start gap-[10px] transition-[opacity,transform] duration-500 ${state.cb2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3'}`}>
          <div className="w-7 h-7 rounded-lg shrink-0 bg-[#0D47A1] flex items-center justify-center mt-px">
            <svg viewBox="0 0 24 24" className="w-[15px] h-[15px] fill-none stroke-white [stroke-width:1.8] [stroke-linecap:round] [stroke-linejoin:round]"><rect x="3" y="8" width="18" height="12" rx="3" /><path d="M8 8V6a4 4 0 018 0v2" /><circle cx="9" cy="14" r="1.5" fill="#fff" stroke="none" /><circle cx="15" cy="14" r="1.5" fill="#fff" stroke="none" /></svg>
          </div>
          <span className="text-xs text-white/85 leading-[1.6] font-medium">Got it! <CheckCircle size={14} weight="duotone" color="#4ade80" className="inline -mt-0.5 mx-0.5" /> Appointment confirmed for <strong className="text-white">Friday 3:00 PM</strong>. You&apos;ll receive a reminder 24h before.</span>
        </div>

        <div className={`w-full max-w-[340px] bg-white/[0.06] border border-white/[0.09] rounded-[10px] px-[14px] py-[10px] flex items-center gap-[10px] transition-[opacity,transform] duration-500 ${state.cs1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <div className="w-2 h-2 rounded-full bg-[#22c55e] shrink-0 animate-[hcb-blink_1.5s_ease_infinite]"></div>
          <div>
            <div className="text-[11px] font-bold text-white/85">AI Copilot Active</div>
            <div className="text-[10px] text-white/40 mt-px">Avg. 1.8s response time</div>
          </div>
        </div>
      </div>
    </div>
  );
}
