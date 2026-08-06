'use client';
import { useEffect, useState } from 'react';
import { Robot, User, ArrowUp, Star } from '@phosphor-icons/react';

const bubble = 'px-[13px] py-[9px] rounded-xl text-[11px] font-semibold leading-[1.45] transition-[opacity,transform] duration-300 ease-in-out';
const hidden = 'opacity-0 translate-y-1';
const shown = 'opacity-100 translate-y-0';

export default function AiHandoffScene({ className }: { className?: string }) {
  const [state, setState] = useState({ b1: false, t1: false, b2: false, b3: false, human: false });

  useEffect(() => {
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const seq: Array<() => void> = [
      () => setState(s => ({ ...s, b1: true })),
      () => setState(s => ({ ...s, t1: true })),
      () => setState(s => ({ ...s, t1: false, b2: true })),
      () => setState(s => ({ ...s, b3: true })),
      () => setState(s => ({ ...s, human: true })),
    ];
    let i = 0;
    const next = () => {
      if (cancelled) return;
      if (i < seq.length) {
        seq[i](); i++;
        timeoutId = setTimeout(next, i === 1 ? 900 : 1100);
      } else {
        timeoutId = setTimeout(() => {
          if (cancelled) return;
          i = 0;
          setState({ b1: false, t1: false, b2: false, b3: false, human: false });
          timeoutId = setTimeout(next, 600);
        }, 3000);
      }
    };
    timeoutId = setTimeout(next, 400);

    return () => { cancelled = true; clearTimeout(timeoutId); };
  }, []);

  return (
    <div className={`w-full h-full overflow-hidden ${className ?? ''}`}>
      <div className="[font-family:'Segoe_UI',system-ui,sans-serif] bg-[linear-gradient(135deg,#0a1628_0%,#0d2240_60%,#0D47A1_100%)] w-full h-full overflow-hidden flex items-center justify-center">
        <div className="w-full h-full grid grid-cols-[1fr_80px_1fr] items-center px-9 py-6 gap-0 relative">
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[length:40px_40px]" />

          <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-4 flex flex-col gap-[10px] relative z-[1]">
            <div className="flex items-center gap-[10px] mb-1">
              <div className="w-[34px] h-[34px] rounded-full shrink-0 flex items-center justify-center text-[17px] font-black bg-[linear-gradient(135deg,#0D47A1,#1e88e5)] text-white"><Robot size={17} weight="duotone" color="#fff" /></div>
              <div>
                <div className="text-[11px] font-extrabold uppercase tracking-[1px] text-[#60a5fa]">KronGage AI</div>
                <div className="text-[9px] text-white/35 font-semibold">Autonomous Support Agent</div>
              </div>
            </div>
            <div className={`${bubble} bg-[#1d4ed8]/35 border border-[#60a5fa]/20 text-white/85 self-start ${state.b1 ? shown : hidden}`}>Hi Kwame, I can see your renewal is due in 14 days. Let me pull up your policy.</div>
            <div className={`flex items-center gap-1 px-3 py-2 bg-[#1d4ed8]/20 rounded-[10px] self-start transition-opacity duration-300 ${state.t1 ? 'opacity-100' : 'opacity-0'}`}>
              <span className="w-[5px] h-[5px] rounded-full bg-[#60a5fa] animate-[aihs-dot_1.2s_ease-in-out_infinite]" />
              <span className="w-[5px] h-[5px] rounded-full bg-[#60a5fa] animate-[aihs-dot_1.2s_ease-in-out_infinite] [animation-delay:0.2s]" />
              <span className="w-[5px] h-[5px] rounded-full bg-[#60a5fa] animate-[aihs-dot_1.2s_ease-in-out_infinite] [animation-delay:0.4s]" />
            </div>
            <div className={`${bubble} bg-[#1d4ed8]/35 border border-[#60a5fa]/20 text-white/85 self-start ${state.b2 ? shown : hidden}`}>Your Premium Gold policy expires Jun 30. Would you like to renew with the same coverage?</div>
            <div className={`${bubble} bg-[#14b8a6]/15 border border-[#14b8a6]/30 text-[#5eead4] text-[10px] text-center ${state.b3 ? shown : hidden}`}><span className="inline-flex items-center gap-1.5"><ArrowUp size={12} weight="duotone" />Escalating — billing dispute detected</span></div>
          </div>

          <div className="flex flex-col items-center gap-2 relative z-[1]">
            <div className="text-lg text-white/40 animate-[aihs-pulse_1.5s_ease-in-out_infinite]">→</div>
            <div className="w-full h-px bg-[linear-gradient(90deg,rgba(96,165,250,0.3),rgba(251,191,36,0.3))] relative">
              <div className="w-2 h-2 rounded-full bg-white absolute top-1/2 -translate-y-1/2 shadow-[0_0_10px_#fff] animate-[aihs-travel_2.2s_ease-in-out_infinite]" />
            </div>
            <div className="bg-white/[0.07] border border-white/[0.12] rounded-full px-[10px] py-[5px] text-[8px] font-extrabold text-white/50 uppercase tracking-[0.6px] text-center whitespace-nowrap">Seamless handoff</div>
          </div>

          <div className={`bg-white/[0.04] border border-white/[0.08] rounded-2xl p-4 flex flex-col gap-[10px] relative z-[1] transition-opacity duration-[800ms] ease-in-out ${state.human ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-center gap-[10px] mb-1">
              <div className="w-[34px] h-[34px] rounded-full shrink-0 flex items-center justify-center text-[17px] font-black bg-[linear-gradient(135deg,#d97706,#f59e0b)] text-white"><User size={17} weight="duotone" color="#fff" /></div>
              <div>
                <div className="text-[11px] font-extrabold uppercase tracking-[1px] text-[#fbbf24]">Abena Asante</div>
                <div className="text-[9px] text-white/35 font-semibold">Senior Account Manager</div>
              </div>
            </div>
            <div className="inline-flex items-center gap-[5px] bg-[#22c55e]/[0.12] border border-[#22c55e]/25 rounded-full px-[9px] py-[3px] text-[9px] font-bold text-[#4ade80] w-fit">
              <div className="w-[5px] h-[5px] rounded-full bg-[#22c55e] animate-[aihs-blink_1s_ease-in-out_infinite]" />Live — took over from AI
            </div>
            <div className="bg-[#f59e0b]/[0.12] border border-[#f59e0b]/25 rounded-xl px-[13px] py-[9px] text-[11px] font-semibold text-white/85 leading-[1.45]">Hi Kwame! I&apos;ve reviewed your account. I&apos;d like to offer you our loyalty discount — 15% off for renewing today.</div>
            <div className="flex items-center gap-[6px] mt-0.5">
              <span className="flex items-center gap-0.5 text-[#fbbf24]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} weight="fill" color="#fbbf24" />
                ))}
              </span>
              <span className="text-[9px] text-white/40 font-semibold">4.9 · 2,847 interactions this month</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
