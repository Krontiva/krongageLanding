'use client';
import { useState } from 'react';

const ACTIVITIES = [
  { id: 4, time: '1d ago', status: 'done', title: 'Ad set optimization complete', sub: 'ROAS: 4.5x · CPA: $8.40', metrics: [{ lbl: 'ROAS', val: '4.5x' }, { lbl: 'Daily Spend', val: '$2,000' }, { lbl: 'CPA', val: '$8.40' }] },
  { id: 5, time: '4h ago', status: 'done', title: 'Engagement report generated', sub: 'Reach: 150k · CTR: 3.1%', metrics: [{ lbl: 'Reach', val: '150k' }, { lbl: 'CTR', val: '3.1%' }, { lbl: 'Impressions', val: '4.8M' }] },
];

function iconCls(s: string) { return s === 'done' ? 'bg-[#0D47A1] text-white' : s === 'warn' ? 'bg-[#b45309] text-white' : 'bg-white/[0.12] text-white/40'; }
function iconChar(s: string) { return s === 'done' ? '✓' : s === 'warn' ? '!' : '◯'; }

const chipTagClass = "text-[10px] font-bold px-2 py-[3px] rounded-[5px] text-white";
const filterBtnBase = "px-[9px] py-1 rounded-[5px] text-[10px] font-bold cursor-pointer border-none transition-all";

export default function CampaignManagement({ className }: { className?: string }) {
  const [activeChip, setActiveChip] = useState(1);
  const [activeFilter, setActiveFilter] = useState<'all' | 'done' | 'pending'>('all');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const items = activeFilter === 'all' ? ACTIVITIES : activeFilter === 'done' ? ACTIVITIES.filter(a => a.status === 'done') : ACTIVITIES.filter(a => a.status !== 'done');

  return (
    <div className={`w-full h-full bg-[#EEF5FD] overflow-hidden flex items-center justify-center ${className ?? ''}`}>
      <div className="flex flex-col w-full max-w-[400px] h-full p-4 gap-[10px] overflow-hidden">
        <div className="flex gap-2 shrink-0">
          <div
            className={`flex-1 bg-white rounded-xl px-3 py-[10px] flex items-center gap-[10px] shadow-[0_2px_10px_rgba(0,0,0,0.06)] cursor-pointer transition-shadow border-[1.5px] hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] ${activeChip === 0 ? 'border-[#0D47A1]' : 'border-transparent'}`}
            onClick={() => setActiveChip(0)}
          >
            <div className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center text-[13px] font-extrabold text-white" style={{ background: 'linear-gradient(135deg,#7c3aed,#5b21b6)' }}>EM</div>
            <div className="min-w-0">
              <div className="text-xs font-extrabold text-[#0f172a] whitespace-nowrap overflow-hidden text-ellipsis">Efua Mensah</div>
              <div className="flex items-center gap-1 mt-0.5">
                <div className="w-[7px] h-[7px] rounded-full shrink-0 bg-[#94a3b8]"></div>
                <span className="text-[10px] text-[#64748b] font-semibold">Lead Strategist</span>
              </div>
            </div>
          </div>
          <div
            className={`flex-1 bg-white rounded-xl px-3 py-[10px] flex items-center gap-[10px] shadow-[0_2px_10px_rgba(0,0,0,0.06)] cursor-pointer transition-shadow border-[1.5px] hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] ${activeChip === 1 ? 'border-[#0D47A1]' : 'border-transparent'}`}
            onClick={() => setActiveChip(1)}
          >
            <div className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center text-[13px] font-extrabold text-white" style={{ background: 'linear-gradient(135deg,#0D47A1,#1565C0)' }}>KM</div>
            <div className="min-w-0">
              <div className="text-xs font-extrabold text-[#0f172a] whitespace-nowrap overflow-hidden text-ellipsis">Kofi Manu</div>
              <div className="flex items-center gap-1 mt-0.5">
                <div className="w-[7px] h-[7px] rounded-full shrink-0 bg-[#4ade80] shadow-[0_0_5px_rgba(74,222,128,0.6)]"></div>
                <span className="text-[10px] text-[#64748b] font-semibold">Campaign Mgr</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl px-[14px] py-3 shadow-[0_2px_10px_rgba(0,0,0,0.06)] shrink-0">
          <div className="text-[10px] font-bold uppercase tracking-[0.5px] text-[#94a3b8] mb-[5px]">Active Campaign</div>
          <div className="text-[13px] font-extrabold text-[#0f172a] mb-[10px]">Holiday &apos;24 — Q4 Launch</div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-semibold text-[#64748b]">Completion</span>
            <span className="text-[11px] font-bold text-[#0D47A1]">72%</span>
          </div>
          <div className="h-[6px] bg-[#EEF5FD] rounded-[3px] overflow-hidden mb-[10px]"><div className="h-full bg-[#0D47A1] rounded-[3px]" style={{ width: '72%' }}></div></div>
          <div className="flex gap-[6px] flex-wrap">
            <span className={`${chipTagClass} bg-[#1877F2]`}>Facebook</span>
            <span className={`${chipTagClass} bg-[#e1306c]`}>Instagram</span>
            <span className={`${chipTagClass} bg-[#059669]`}>Email</span>
            <span className={`${chipTagClass} bg-[#7c3aed]`}>SMS</span>
          </div>
        </div>

        <div className="shrink-0 bg-[#0f172a] rounded-2xl px-4 py-[14px]">
          <div className="flex items-center justify-between mb-[14px]">
            <span className="text-[13px] font-extrabold text-white">Activity</span>
            <div className="flex gap-[5px]">
              <button className={`${filterBtnBase} ${activeFilter === 'all' ? 'bg-[#0D47A1] text-white' : 'bg-white/[0.08] text-white/45'}`} onClick={() => setActiveFilter('all')}>All</button>
              <button className={`${filterBtnBase} ${activeFilter === 'done' ? 'bg-[#0D47A1] text-white' : 'bg-white/[0.08] text-white/45'}`} onClick={() => setActiveFilter('done')}>Done</button>
              <button className={`${filterBtnBase} ${activeFilter === 'pending' ? 'bg-[#0D47A1] text-white' : 'bg-white/[0.08] text-white/45'}`} onClick={() => setActiveFilter('pending')}>Pending</button>
            </div>
          </div>
          <div>
            {items.map((a, i) => (
              <div
                key={a.id}
                className={`flex gap-[10px] py-[9px] border-b border-white/5 last:border-b-0 cursor-pointer transition-colors rounded-[5px] hover:bg-white/[0.03] ${expandedId === a.id ? 'bg-[#0D47A1]/[0.15] pl-1' : ''}`}
                onClick={() => setExpandedId(expandedId === a.id ? null : a.id)}
              >
                <span className="text-[10px] text-white/30 font-semibold min-w-[44px] text-right shrink-0 pt-0.5">{a.time}</span>
                <div className="flex flex-col items-center shrink-0">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] shrink-0 ${iconCls(a.status)}`}>{iconChar(a.status)}</div>
                  {i !== items.length - 1 && <div className="w-px flex-1 bg-white/[0.07] mt-1 min-h-[16px]"></div>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-xs font-bold mb-0.5 ${a.status !== 'done' ? 'text-white/50' : 'text-white'}`}>{a.title}</div>
                  {a.sub && <div className="text-[11px] text-white/35 leading-[1.4]">{a.sub}</div>}
                  <div className={`mt-2 bg-white/5 rounded-[7px] px-[10px] py-2 ${expandedId === a.id ? 'block' : 'hidden'}`}>
                    <div className="flex gap-4 flex-wrap">
                      {a.metrics.map(m => (
                        <div key={m.lbl}><div className="text-[9px] text-white/30 font-bold uppercase tracking-[0.3px]">{m.lbl}</div><div className="text-[13px] font-extrabold text-[#60a5fa]">{m.val}</div></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
