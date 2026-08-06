'use client';
import { User, Lock } from '@phosphor-icons/react';

const FACETS = [
  { cls: 'w-[90px] h-[90px] top-[10px] left-[30px] [clip-path:polygon(50%_0%,100%_50%,50%_100%,0%_50%)]', delay: '0s' },
  { cls: 'w-[70px] h-[70px] top-5 right-10 [clip-path:polygon(50%_0%,100%_50%,50%_100%,0%_50%)]', delay: '.5s' },
  { cls: 'w-[110px] h-[60px] top-[50px] left-[10px] [clip-path:polygon(25%_0%,75%_0%,100%_100%,0%_100%)]', delay: '.8s' },
  { cls: 'w-20 h-20 bottom-[30px] right-5 [clip-path:polygon(50%_0%,100%_50%,50%_100%,0%_50%)]', delay: '1.2s' },
  { cls: 'w-[60px] h-[100px] bottom-[10px] left-10 [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]', delay: '1.6s' },
];

const PARTICLES = [
  { top: '15%', left: '20%', delay: '0s' },
  { top: '25%', right: '18%', delay: '.7s', size: '3px' },
  { top: '70%', left: '14%', delay: '1.3s' },
  { top: '60%', right: '22%', delay: '2s', size: '3px' },
  { top: '80%', left: '40%', delay: '.4s' },
];

export default function SecurityDemo({ className }: { className?: string }) {
  return (
    <div className={`w-full h-full overflow-hidden bg-[linear-gradient(135deg,#0a1628_0%,#0d2150_50%,#0a1628_100%)] flex items-center justify-center ${className ?? ''}`}>
      <div className="flex w-full h-full items-center justify-center overflow-hidden">
        <div className="flex items-center justify-center relative w-full h-full">
          {PARTICLES.map((p, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-[#42a5f5]/60 pointer-events-none animate-[sd-float_4s_ease-in-out_infinite]"
              style={{ top: p.top, left: p.left, right: p.right, animationDelay: p.delay, width: p.size ?? '4px', height: p.size ?? '4px' }}
            ></div>
          ))}

          <div className="relative w-[280px] h-[320px] flex items-center justify-center">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,#1565C0,#0D47A1,#1976D2)] [clip-path:polygon(50%_0%,95%_25%,95%_75%,50%_100%,5%_75%,5%_25%)] z-[1]"></div>
            <div className="absolute inset-0 z-[2] overflow-hidden [clip-path:polygon(50%_0%,95%_25%,95%_75%,50%_100%,5%_75%,5%_25%)]">
              {FACETS.map((f, i) => (
                <div
                  key={i}
                  className={`absolute bg-white/[0.04] border border-white/[0.08] animate-[sd-facetPulse_3s_ease-in-out_infinite] ${f.cls}`}
                  style={{ animationDelay: f.delay }}
                ></div>
              ))}
            </div>

            <div className="relative z-10 w-[200px] h-[240px] bg-[linear-gradient(160deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04))] border border-white/15 rounded-[24px] backdrop-blur-[10px] overflow-hidden flex flex-col items-center justify-center">
              <div className="relative w-full h-[160px] flex items-center justify-center">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-[#42a5f5]/40 pointer-events-none animate-[sd-pulsering_2.5s_ease-out_infinite]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-[#42a5f5]/40 pointer-events-none animate-[sd-pulsering_2.5s_ease-out_infinite] [animation-delay:0.8s]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-[#42a5f5]/40 pointer-events-none animate-[sd-pulsering_2.5s_ease-out_infinite] [animation-delay:1.6s]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(13,71,161,0.3),transparent_70%)] pointer-events-none"></div>
                <div className="flex flex-col items-center relative z-[2]">
                  <div className="w-[72px] h-[72px] rounded-full bg-[linear-gradient(135deg,#42a5f5,#1565C0)] flex items-center justify-center shadow-[0_8px_32px_rgba(13,71,161,0.5)] mb-[6px]">
                    <User size={36} weight="duotone" color="#fff" />
                  </div>
                  <div className="text-[11px] font-bold text-white/80 mt-[6px]">Secure Session</div>
                  <div className="text-[10px] text-white/40">MFA · Active</div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-4 right-4 z-20 w-[52px] h-[52px] bg-[#0D47A1] rounded-2xl shadow-[0_8px_24px_rgba(13,71,161,0.6),0_2px_8px_rgba(0,0,0,0.3)] flex items-center justify-center animate-[sd-lockBounce_2s_ease-in-out_infinite]"><Lock size={24} weight="duotone" color="#fff" /></div>
          </div>
        </div>
      </div>
    </div>
  );
}
