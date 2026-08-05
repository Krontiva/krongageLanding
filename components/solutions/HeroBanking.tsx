const shieldClipPath = '[clip-path:polygon(50%_0%,100%_18%,100%_60%,50%_100%,0%_60%,0%_18%)]';

export default function HeroBanking({ className }: { className?: string }) {
  return (
    <div className={`w-full h-full bg-[#EEF5FD] overflow-hidden flex items-center justify-center ${className ?? ''}`}>
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="absolute rounded-full border-[1.5px] border-[#0D47A1]/25 pointer-events-none w-[240px] h-[240px] animate-[hb-ringExpand_3s_ease-out_infinite]"></div>
        <div className="absolute rounded-full border-[1.5px] border-[#0D47A1]/25 pointer-events-none w-[310px] h-[310px] animate-[hb-ringExpand_3s_ease-out_infinite] [animation-delay:0.8s]"></div>
        <div className="absolute rounded-full border-[1.5px] border-[#0D47A1]/25 pointer-events-none w-[380px] h-[380px] animate-[hb-ringExpand_3s_ease-out_infinite] [animation-delay:1.6s]"></div>

        <div className="relative flex items-center justify-center w-[180px] h-[200px]">
          <div className="absolute w-[200px] h-[220px] bg-[radial-gradient(ellipse_at_center,rgba(13,71,161,0.18),transparent_70%)] pointer-events-none"></div>
          <div className={`w-40 h-[180px] bg-[linear-gradient(160deg,#1565C0,#0D47A1)] ${shieldClipPath} flex items-center justify-center relative shadow-[0_20px_60px_rgba(13,71,161,0.45)] animate-[hb-shieldPulse_4s_ease-in-out_infinite]`}>
            <div className={`absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.15)_0%,transparent_60%)] ${shieldClipPath}`}></div>
            <div className="flex flex-col items-center gap-0.5 relative z-[2]">
              <svg viewBox="0 0 24 24" className="w-[52px] h-[52px] fill-none stroke-white [stroke-width:1.8] [stroke-linecap:round] [stroke-linejoin:round]">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
                <circle cx="12" cy="16" r="1.5" fill="#fff" stroke="none" />
              </svg>
              <span className="text-[10px] font-extrabold text-white/80 tracking-[1.5px] uppercase mt-1">Secured</span>
            </div>
          </div>
        </div>

        <div className="absolute bg-white rounded-2xl px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.1)] flex items-center gap-2.5 min-w-[150px] top-[14%] left-[4%] animate-[hb-floatCard_3.8s_ease-in-out_infinite]">
          <div className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 text-lg" style={{ background: '#eff6ff' }}>🛡️</div>
          <div>
            <div className="text-[17px] font-extrabold text-[#0D47A1] leading-none">99.2%</div>
            <div className="text-[10px] text-[#64748b] font-semibold mt-[3px]">Fraud Detection</div>
          </div>
          <div className="absolute -bottom-2 -right-2 w-5 h-5 rounded-full bg-[#22c55e] flex items-center justify-center text-[10px] text-white font-extrabold shadow-[0_2px_6px_rgba(34,197,94,0.4)]">✓</div>
        </div>

        <div className="absolute bg-white rounded-2xl px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.1)] flex items-center gap-2.5 min-w-[150px] top-[14%] right-[4%] animate-[hb-floatCard_4.2s_ease-in-out_infinite] [animation-delay:0.6s]">
          <div className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 text-lg" style={{ background: '#f0fdf4' }}>⚡</div>
          <div>
            <div className="text-[17px] font-extrabold text-[#0D47A1] leading-none">&lt;30s</div>
            <div className="text-[10px] text-[#64748b] font-semibold mt-[3px]">Alert Delivery</div>
          </div>
          <div className="absolute -bottom-2 -right-2 w-5 h-5 rounded-full bg-[#22c55e] flex items-center justify-center text-[10px] text-white font-extrabold shadow-[0_2px_6px_rgba(34,197,94,0.4)]">✓</div>
        </div>

        <div className="absolute bg-white rounded-2xl px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.1)] flex items-center gap-2.5 min-w-[150px] bottom-[16%] left-1/2 -translate-x-1/2 animate-[hb-floatCardCenter_4s_ease-in-out_infinite] [animation-delay:1.2s]">
          <div className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 text-lg" style={{ background: '#fefce8' }}>💰</div>
          <div>
            <div className="text-[17px] font-extrabold text-[#0D47A1] leading-none">$4.8M</div>
            <div className="text-[10px] text-[#64748b] font-semibold mt-[3px]">Fraud Prevented</div>
          </div>
          <div className="absolute -bottom-2 -right-2 w-5 h-5 rounded-full bg-[#22c55e] flex items-center justify-center text-[10px] text-white font-extrabold shadow-[0_2px_6px_rgba(34,197,94,0.4)]">✓</div>
        </div>
      </div>
    </div>
  );
}
