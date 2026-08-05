'use client';
import { useState } from 'react';

const TABS = [
  { key: 'facebook', label: 'Facebook', dot: '#1877F2' },
  { key: 'instagram', label: 'Instagram', dot: '#e1306c' },
  { key: 'twitter', label: 'X', dot: '#000' },
  { key: 'whatsapp', label: 'WhatsApp', dot: '#25D366' },
] as const;

const DATA = {
  facebook: {
    sub: 'Facebook · All Pages',
    pos: 68, neu: 22, neg: 10,
    mentions: [
      { init: 'AK', color: '#7c3aed', name: '@amina.k', time: '2m ago', text: 'Just saw KronGage on my feed — this platform looks incredible! 🔥', sent: 'pos' },
      { init: 'TR', color: '#059669', name: '@t.rahman', time: '15m', text: 'When will the mobile app be available? Asking for a friend 😅', sent: 'neu' },
      { init: 'JD', color: '#b45309', name: '@j.duarte', time: '1h', text: 'Support took too long to respond today — frustrating experience.', sent: 'neg' },
    ],
  },
  instagram: {
    sub: 'Instagram · @krongage',
    pos: 81, neu: 14, neg: 5,
    mentions: [
      { init: 'LM', color: '#e1306c', name: '@lina.m', time: '5m', text: 'The new collection reels are everything ✨ Already shared!', sent: 'pos' },
      { init: 'PK', color: '#7c3aed', name: '@p.khan', time: '22m', text: 'Love the aesthetic but story links are broken on iOS 17?', sent: 'neu' },
      { init: 'SO', color: '#0D47A1', name: '@sara.ou', time: '2h', text: 'Another banger post from @krongage 🙌 Tag someone who needs this!', sent: 'pos' },
    ],
  },
  twitter: {
    sub: 'X (Twitter) · @krongage',
    pos: 74, neu: 18, neg: 8,
    mentions: [
      { init: 'MW', color: '#374151', name: '@m.wade', time: '1m', text: 'KronGage just dropped a 🔥 update — real-time social listening!', sent: 'pos' },
      { init: 'EL', color: '#7c3aed', name: '@elon.labs', time: '34m', text: 'Solid platform but the API pricing is steep for SMEs.', sent: 'neu' },
      { init: 'AB', color: '#059669', name: '@a.boateng', time: '3h', text: 'Impressed with the omnichannel capabilities. Switching from Zendesk.', sent: 'pos' },
    ],
  },
  whatsapp: {
    sub: 'WhatsApp Business · All Numbers',
    pos: 72, neu: 19, neg: 9,
    mentions: [
      { init: 'FN', color: '#25D366', name: '+44 7700 900111', time: '3m', text: 'Hi, I received my order but one item is missing from the package.', sent: 'neg' },
      { init: 'GH', color: '#059669', name: '+233 24 000 1234', time: '18m', text: 'Thank you for the quick delivery! Loved the packaging 😍', sent: 'pos' },
      { init: 'KO', color: '#0D47A1', name: '+1 415 555 0180', time: '1h', text: 'Can you confirm if the promo code SAVE20 is still active?', sent: 'neu' },
    ],
  },
} as const;

function sentLabel(s: string) { return s === 'pos' ? 'Positive' : s === 'neg' ? 'Negative' : 'Neutral'; }
function sentBadgeCls(s: string) { return s === 'pos' ? 'bg-[#dcfce7] text-[#16a34a]' : s === 'neg' ? 'bg-[#fee2e2] text-[#dc2626]' : 'bg-[#f1f5f9] text-[#64748b]'; }

export default function SocialMediaMgmt({ className }: { className?: string }) {
  const [plat, setPlat] = useState<keyof typeof DATA>('facebook');
  const d = DATA[plat];

  return (
    <div className={`w-full h-full bg-[#EEF5FD] overflow-hidden ${className ?? ''}`}>
      <div className="flex flex-col w-full h-full overflow-hidden bg-white">
        <div className="px-4 py-3 border-b border-[#f1f5f9] shrink-0">
          <div className="text-sm font-extrabold text-[#0f172a]">Sentiment Analysis</div>
          <div className="text-[11px] text-[#94a3b8] mt-px">{d.sub}</div>
        </div>

        <div className="flex border-b border-[#f1f5f9] shrink-0 px-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TABS.map(t => (
            <div
              key={t.key}
              className={`px-[13px] py-[9px] text-xs font-bold cursor-pointer border-b-2 transition-all flex items-center gap-[6px] whitespace-nowrap shrink-0 hover:text-[#0D47A1] ${plat === t.key ? 'text-[#0D47A1] border-[#0D47A1]' : 'text-[#64748b] border-transparent'}`}
              onClick={() => setPlat(t.key)}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: t.dot }}></span>{t.label}
            </div>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-[14px] flex flex-col gap-3">
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-xl px-[10px] py-3 text-center bg-[#f0fdf4]">
              <div className="text-[22px] font-extrabold leading-none text-[#16a34a]">{d.pos}%</div>
              <div className="text-[10px] font-bold mt-1 uppercase tracking-[0.5px] text-[#16a34a]">Positive</div>
            </div>
            <div className="rounded-xl px-[10px] py-3 text-center bg-[#f8fafc]">
              <div className="text-[22px] font-extrabold leading-none text-[#475569]">{d.neu}%</div>
              <div className="text-[10px] font-bold mt-1 uppercase tracking-[0.5px] text-[#64748b]">Neutral</div>
            </div>
            <div className="rounded-xl px-[10px] py-3 text-center bg-[#fff1f2]">
              <div className="text-[22px] font-extrabold leading-none text-[#dc2626]">{d.neg}%</div>
              <div className="text-[10px] font-bold mt-1 uppercase tracking-[0.5px] text-[#dc2626]">Negative</div>
            </div>
          </div>

          <div className="bg-[#f8fafc] border border-[#f1f5f9] rounded-xl px-[14px] py-3">
            <div className="text-[10px] font-bold uppercase tracking-[0.5px] text-[#94a3b8] mb-[10px]">Sentiment Distribution</div>
            <div className="flex h-[10px] rounded-md overflow-hidden gap-0.5">
              <div className="h-full rounded-[3px] transition-[width] duration-500 ease-in-out bg-[#22c55e]" style={{ width: `${d.pos}%` }}></div>
              <div className="h-full rounded-[3px] transition-[width] duration-500 ease-in-out bg-[#94a3b8]" style={{ width: `${d.neu}%` }}></div>
              <div className="h-full rounded-[3px] transition-[width] duration-500 ease-in-out bg-[#f87171]" style={{ width: `${d.neg}%` }}></div>
            </div>
            <div className="flex gap-[14px] mt-2">
              <div className="flex items-center gap-[5px] text-[11px] text-[#64748b] font-semibold"><div className="w-2 h-2 rounded-full bg-[#22c55e]"></div>Positive</div>
              <div className="flex items-center gap-[5px] text-[11px] text-[#64748b] font-semibold"><div className="w-2 h-2 rounded-full bg-[#94a3b8]"></div>Neutral</div>
              <div className="flex items-center gap-[5px] text-[11px] text-[#64748b] font-semibold"><div className="w-2 h-2 rounded-full bg-[#f87171]"></div>Negative</div>
            </div>
          </div>

          <div className="bg-[#f8fafc] border border-[#f1f5f9] rounded-xl p-[13px]">
            <div className="text-[11px] font-bold uppercase tracking-[0.5px] text-[#64748b] mb-[10px]">Recent Mentions</div>
            {d.mentions.map(m => (
              <div key={m.name} className="flex items-start gap-[10px] py-2 border-b border-[#f1f5f9] last:border-b-0">
                <div className="w-[30px] h-[30px] rounded-full flex items-center justify-center text-[11px] font-extrabold text-white shrink-0" style={{ background: m.color }}>{m.init}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-[5px] mb-[3px]">
                    <span className="text-xs font-bold text-[#0f172a]">{m.name}</span>
                    <span className="text-[10px] text-[#94a3b8] ml-auto">{m.time}</span>
                  </div>
                  <div className="text-[11px] text-[#64748b] leading-[1.5]">{m.text}</div>
                  <span className={`text-[10px] font-bold px-[7px] py-0.5 rounded mt-1 inline-block ${sentBadgeCls(m.sent)}`}>{sentLabel(m.sent)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
