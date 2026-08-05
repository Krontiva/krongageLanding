'use client';
import { useEffect, useState } from 'react';

const cardClass = "w-full max-w-[340px] bg-white rounded-2xl shadow-[0_8px_32px_rgba(13,71,161,0.1),0_2px_8px_rgba(0,0,0,0.05)] transition-[opacity,transform] duration-500 ease-in-out";

export default function HeroFmcg({ className }: { className?: string }) {
  const [shown, setShown] = useState([false, false, false]);

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const runSequence = () => {
      setShown([false, false, false]);
      const delays = [300, 900, 1600];
      delays.forEach((delay, i) => timeouts.push(setTimeout(() => setShown(s => s.map((v, idx) => idx === i ? true : v)), delay)));
    };
    runSequence();
    const intervalId = setInterval(runSequence, 7000);

    return () => { clearInterval(intervalId); timeouts.forEach(clearTimeout); };
  }, []);

  return (
    <div className={`w-full h-full bg-[#EEF5FD] overflow-hidden flex items-center justify-center ${className ?? ''}`}>
      <div className="flex flex-col items-center justify-center gap-3 w-full h-full p-8">
        <div className={`${cardClass} ${shown[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div className="px-4 py-[14px] flex items-center gap-3">
            <div className="w-11 h-11 rounded-full shrink-0 bg-[linear-gradient(135deg,#0D47A1,#1976D2)] flex items-center justify-center text-base font-extrabold text-white">AK</div>
            <div className="flex-1">
              <div className="text-sm font-extrabold text-[#0f172a]">Akosua Koomson</div>
              <div className="text-[11px] text-[#64748b] mt-0.5">Loyal customer · 3 years</div>
              <div className="flex gap-1.5 mt-1.5 flex-wrap">
                <span className="text-[10px] font-bold px-[9px] py-[3px] rounded-full bg-[#EEF5FD] text-[#0D47A1] border border-[#dbeafe]">🛒 Groceries</span>
                <span className="text-[10px] font-bold px-[9px] py-[3px] rounded-full bg-[#EEF5FD] text-[#0D47A1] border border-[#dbeafe]">🥑 Fresh Produce</span>
                <span className="text-[10px] font-bold px-[9px] py-[3px] rounded-full bg-[#EEF5FD] text-[#0D47A1] border border-[#dbeafe]">Weekly Shopper</span>
              </div>
            </div>
          </div>
        </div>

        <div className={`${cardClass} ${shown[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div className="px-4 pt-3 pb-2 border-b border-[#f1f5f9]">
            <div className="text-[10px] font-bold uppercase tracking-[0.8px] text-[#94a3b8]">Recommended for you</div>
            <div className="text-[13px] font-extrabold text-[#0f172a] mt-0.5">Complete your weekly list, Akosua 🛍️</div>
          </div>
          <div className="grid grid-cols-2 gap-2 px-3 pt-2.5 pb-3">
            <div className="bg-[#f8fafc] rounded-[10px] p-2.5 flex flex-col items-center gap-1.5 border border-[#f1f5f9] cursor-pointer transition-colors hover:border-[#0D47A1] hover:bg-[#EEF5FD]">
              <div className="text-[28px]">🥑</div>
              <div className="text-[11px] font-bold text-[#0f172a] text-center">Hass Avocado</div>
              <div className="text-xs font-extrabold text-[#0D47A1]">GH₵ 12.00</div>
            </div>
            <div className="bg-[#f8fafc] rounded-[10px] p-2.5 flex flex-col items-center gap-1.5 border border-[#f1f5f9] cursor-pointer transition-colors hover:border-[#0D47A1] hover:bg-[#EEF5FD]">
              <div className="text-[28px]">🥛</div>
              <div className="text-[11px] font-bold text-[#0f172a] text-center">Cowbell Milk</div>
              <div className="text-xs font-extrabold text-[#0D47A1]">GH₵ 8.50</div>
            </div>
          </div>
          <div className="block w-[calc(100%-24px)] mx-3 mb-3 bg-[#0D47A1] text-white border-none rounded-lg py-[9px] text-xs font-bold cursor-pointer transition-colors text-center hover:bg-[#0a3680]">Add to Cart →</div>
        </div>

        <div className={`${cardClass} ${shown[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div className="px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-[10px] shrink-0 bg-[#25D366] flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            </div>
            <div className="flex-1">
              <div className="text-xs font-extrabold text-[#0f172a]">Message delivered via WhatsApp</div>
              <div className="text-[10px] text-[#64748b] mt-0.5">Akosua Koomson · Just now · ✓✓ Read</div>
            </div>
            <div className="w-2 h-2 rounded-full bg-[#22c55e] shrink-0 animate-[hf-blink_1.5s_ease-in-out_infinite]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
