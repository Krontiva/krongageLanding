const cbTw = 'bg-[#e0f2fe] text-[#0284c7]';
const cbIg = 'bg-[#fce7f3] text-[#be185d]';
const cbLi = 'bg-[#dbeafe] text-[#1d4ed8]';
const cbFb = 'bg-[#ede9fe] text-[#7c3aed]';

const CAL = [
  [
    { cls: cbTw, text: 'X · 9:00 AM' },
    { cls: cbLi, text: 'LinkedIn · 11:00' },
    { cls: cbTw, text: 'X · 4:00 PM' },
  ],
  [
    { cls: cbIg, text: 'IG · 10:00 AM' },
    { cls: cbFb, text: 'FB · 2:00 PM' },
  ],
  [
    { cls: cbLi, text: 'LinkedIn · 8:00' },
    { cls: cbIg, text: 'IG · 1:00 PM' },
    { cls: cbTw, text: 'X · 5:00 PM' },
    { cls: cbFb, text: 'FB · 7:00 PM' },
  ],
  [
    { cls: cbIg, text: 'IG · 9:00 AM' },
    { cls: cbTw, text: 'X · 3:00 PM' },
  ],
  [
    { cls: cbFb, text: 'FB · 10:00' },
    { cls: cbLi, text: 'LinkedIn · 12:00' },
    { cls: cbIg, text: 'IG · 4:00 PM' },
  ],
];

export default function SocialPublishing({ className }: { className?: string }) {
  return (
    <div className={`w-full h-full overflow-hidden bg-[#f0f4f8] ${className ?? ''}`}>
      <div className="flex w-full h-full overflow-hidden bg-white">
        <div className="flex-1 flex flex-col overflow-hidden min-w-0 bg-white">
          <div className="px-5 py-[14px] border-b border-[#f1f5f9] flex items-center justify-between shrink-0">
            <div>
              <div className="text-lg font-extrabold text-[#0f172a]">Social Publishing</div>
              <div className="text-xs text-[#94a3b8] mt-0.5">Content Calendar</div>
            </div>
            <button className="bg-[#0D47A1] text-white border-none rounded-lg px-[18px] py-[9px] text-[13px] font-bold cursor-pointer transition-colors flex items-center gap-[6px] hover:bg-[#0a3a84]">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="white"><path d="M8 1v14M1 8h14" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
              Create Post
            </button>
          </div>

          <div className="block overflow-y-auto">
            <div className="px-5 py-4">
              <div className="bg-[#f8fafc] border border-[#f1f5f9] rounded-[10px] px-[14px] py-3 mb-[14px] flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[11px] text-[#64748b] mb-0.5">Reach</span>
                  <span className="text-xl font-extrabold text-[#0D47A1] tracking-[-0.5px]">21,633</span>
                </div>
                <svg className="w-[90px] h-9" viewBox="0 0 90 36" preserveAspectRatio="none">
                  <polyline points="0,30 15,22 30,26 45,10 60,18 75,8 90,14" fill="none" stroke="#0D47A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="0,36 0,30 15,22 30,26 45,10 60,18 75,8 90,14 90,36" fill="rgba(13,71,161,.08)" stroke="none" />
                </svg>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="text-xs font-bold text-[#64748b] uppercase tracking-[0.5px] m-0">Content Calendar</div>
                <div className="text-[11px] font-bold text-[#94a3b8]">Week ∨</div>
              </div>

              <div className="border border-[#f1f5f9] rounded-[10px] overflow-hidden">
                <div className="grid grid-cols-5 bg-[#f8fafc] border-b border-[#f1f5f9]">
                  <div className="px-2 py-[7px] text-[11px] font-bold text-[#64748b] text-center">Mon</div>
                  <div className="px-2 py-[7px] text-[11px] font-bold text-[#64748b] text-center">Tue</div>
                  <div className="px-2 py-[7px] text-[11px] font-bold text-[#64748b] text-center">Wed</div>
                  <div className="px-2 py-[7px] text-[11px] font-bold text-[#64748b] text-center">Thu</div>
                  <div className="px-2 py-[7px] text-[11px] font-bold text-[#64748b] text-center">Fri</div>
                </div>
                <div className="grid grid-cols-5 min-h-[200px] gap-0">
                  {CAL.map((col, i) => (
                    <div key={i} className="border-r border-[#f8fafc] last:border-r-0 px-1 py-[6px] flex flex-col gap-1">
                      {col.map((b, j) => (
                        <div key={j} className={`rounded-[5px] px-[6px] py-1 text-[10px] font-semibold cursor-pointer transition-opacity relative hover:opacity-85 ${b.cls}`}>{b.text}</div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                <div className="flex items-center gap-1 text-[11px] font-semibold text-[#475569]"><div className="w-2 h-2 rounded-full bg-[#0284c7]"></div>X / Twitter</div>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-[#475569]"><div className="w-2 h-2 rounded-full bg-[#be185d]"></div>Instagram</div>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-[#475569]"><div className="w-2 h-2 rounded-full bg-[#1d4ed8]"></div>LinkedIn</div>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-[#475569]"><div className="w-2 h-2 rounded-full bg-[#7c3aed]"></div>Facebook</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
