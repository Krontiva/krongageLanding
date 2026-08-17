'use client';
import { FileText, Cloud, LinkSimple, SquaresFour } from '@phosphor-icons/react';

const CARDS = [
  { icon: FileText, title: 'PDFs', desc: 'Search chunks for documentation data…', prog: 62 },
  { icon: Cloud, title: 'Cloud Docs', desc: 'Search chunks for cloud new data…', prog: 45 },
  { icon: Cloud, title: 'Cloud Docs', desc: 'Search chunks for cloud new data…', prog: 78 },
  { icon: LinkSimple, title: 'Web Links', desc: 'Search chunks for data front data…', prog: 34 },
  { icon: LinkSimple, title: 'Web Links', desc: 'Search chunks for data front data…', prog: 55 },
  { icon: LinkSimple, title: 'Web Links', desc: 'Search chunks for data front data…', prog: 89 },
];

const CHUNKS = [
  { badge: 'bg-[#EEF5FD] text-[#0D47A1]', badgeText: 'From chunk', title: 'New from Chunk', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { badge: 'bg-[#f0fdf4] text-[#15803d]', badgeText: 'Developed', title: 'Developed it', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { badge: 'bg-[#EEF5FD] text-[#0D47A1]', badgeText: 'From chunk', title: 'New from Chunk', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { badge: 'bg-[#f0fdf4] text-[#15803d]', badgeText: 'Semantic', title: 'Chunk Analysis', desc: 'Sed do eiusmod tempor incididunt ut labore et dolore.' },
];

const CIRC = 2 * Math.PI * 15;

const hbtnClass = "px-[11px] py-[5px] rounded-md text-[11px] font-bold cursor-pointer border border-[#e2e8f0] bg-white text-[#475569] flex items-center gap-[5px] transition-all hover:border-[#93c5fd] hover:text-[#0D47A1]";

export default function KnowledgeBase({ className }: { className?: string }) {
  return (
    <div className={`w-full h-full overflow-hidden bg-[#f8fafc] ${className ?? ''}`}>
      <div className="flex flex-col w-full h-full overflow-hidden bg-white">
        <div className="flex-1 px-4 py-[14px] overflow-y-auto">
          <div className="flex items-center justify-between mb-[14px]">
            <span className="text-[15px] font-extrabold text-[#0f172a]">Knowledge Center</span>
            <div className="flex gap-2">
              <button className={`${hbtnClass} !gap-1`}><SquaresFour size={12} weight="duotone" />Tiny chunk</button>
              <button className="px-[11px] py-[5px] rounded-md text-[11px] font-bold cursor-pointer border border-[#0D47A1] bg-[#0D47A1] text-white flex items-center gap-[5px] transition-colors hover:bg-[#0a3a84]">+ Create chunk</button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-[10px]">
            {CARDS.map((c, i) => {
              const offset = CIRC * (1 - c.prog / 100);
              return (
                <div key={i} className="border border-[#f1f5f9] rounded-[10px] px-3 pt-3 pb-[10px] bg-white cursor-pointer transition-all relative overflow-hidden hover:border-[#93c5fd] hover:-translate-y-px">
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-9 h-9 bg-[#EEF5FD] rounded-lg flex items-center justify-center"><c.icon size={18} weight="duotone" color="#0D47A1" /></div>
                    <div className="relative w-9 h-9">
                      <svg width="36" height="36" viewBox="0 0 36 36" className="-rotate-90">
                        <circle className="fill-none stroke-[#f1f5f9] stroke-[3]" cx="18" cy="18" r="15" />
                        <circle className="fill-none stroke-[#0D47A1] stroke-[3] [stroke-linecap:round] transition-[stroke-dashoffset] duration-1000 ease-in-out" cx="18" cy="18" r="15" strokeDasharray={CIRC} strokeDashoffset={offset} />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-[9px] font-extrabold text-[#0D47A1]">{c.prog}%</div>
                    </div>
                  </div>
                  <div className="text-xs font-extrabold text-[#0f172a] mb-1">{c.title}</div>
                  <div className="text-[11px] text-[#64748b] leading-[1.45] mb-2">{c.desc}</div>
                  <div className="text-[11px] font-bold text-[#0D47A1]">Progress →</div>
                </div>
              );
            })}
          </div>

          <div className="mt-[14px]">
            <div className="text-[11px] font-bold uppercase tracking-[0.5px] text-[#94a3b8] mb-[10px]">Semantic Chunks</div>
            <div className="flex gap-[10px] overflow-x-auto pb-1">
              {CHUNKS.map((c, i) => (
                <div key={i} className="shrink-0 w-40 border border-[#f1f5f9] rounded-[10px] p-[10px] bg-white cursor-pointer transition-all hover:border-[#93c5fd]">
                  <span className={`text-[9px] font-bold px-[7px] py-0.5 rounded inline-block mb-[7px] ${c.badge}`}>{c.badgeText}</span>
                  <div className="text-[11px] font-extrabold text-[#0f172a] mb-[5px] leading-[1.3]">{c.title}</div>
                  <div className="text-[10px] text-[#64748b] leading-[1.45] mb-2">{c.desc}</div>
                  <button className="text-[10px] font-bold text-[#0D47A1] bg-[#EEF5FD] px-2 py-[3px] rounded border-none cursor-pointer">Learn More</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
