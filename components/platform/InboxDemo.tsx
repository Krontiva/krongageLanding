'use client';
import { useEffect, useRef, useState } from 'react';

const CONVS = [
  { id: 1, name: 'Sarah J.', ch: 'WhatsApp', prev: 'Hey was you can thing tom…', color: '#0D47A1', init: 'SJ', unread: 1 },
  { id: 2, name: 'Mike T.', ch: 'Webchat', prev: 'We want you sending to hi…', color: '#7c3aed', init: 'MT', unread: 0 },
  { id: 3, name: 'Alice K.', ch: 'Webchat', prev: 'Thank you for logging to…', color: '#059669', init: 'AK', unread: 1 },
  { id: 4, name: 'Alice K.', ch: 'Email', prev: 'We want you to have come…', color: '#059669', init: 'AK', unread: 0 },
  { id: 5, name: 'Mike T.', ch: 'Webchat', prev: 'We have you sending to hi…', color: '#7c3aed', init: 'MT', unread: 0 },
  { id: 6, name: 'Alice K.', ch: 'Email', prev: 'Thank you for about cust…', color: '#059669', init: 'AK', unread: 0 },
  { id: 7, name: 'Sarah J.', ch: 'Email', prev: 'We have sending from…', color: '#0D47A1', init: 'SJ', unread: 0 },
  { id: 8, name: 'Mike T.', ch: 'Webchat', prev: 'Thank you for about custo…', color: '#7c3aed', init: 'MT', unread: 0 },
  { id: 9, name: 'Alice K.', ch: 'Webchat', prev: 'Hello, thats apo that your i…', color: '#059669', init: 'AK', unread: 0 },
];

type Msg = { t: 'label' | 'sys' | 'them' | 'us'; text: string };

const THREADS: Record<number, Msg[]> = {
  1: [
    { t: 'label', text: 'Sarah J. via WhatsApp' },
    { t: 'them', text: 'Hello, friend — can you write something for the cost at an online store?' },
    { t: 'sys', text: 'What did you command?' },
    { t: 'them', text: 'Are you able to help with the customer campaign this week?' },
    { t: 'sys', text: '9:09 PM' },
    { t: 'them', text: 'Hi, please never also go without updating your customers.' },
    { t: 'sys', text: 'What type in has writing?' },
    { t: 'us', text: "You'll need to solve our best tracking. Let me pull up the details right now." },
  ],
  2: [
    { t: 'them', text: 'Hi, I need help with my account settings.' },
    { t: 'us', text: 'Of course! What seems to be the issue?' },
    { t: 'them', text: 'I cannot find the data export feature.' },
    { t: 'us', text: "It's under Settings → Data → Export. Let me walk you through it step by step." },
    { t: 'them', text: 'Found it, thank you so much!' },
  ],
  3: [
    { t: 'them', text: 'Thank you for the quick resolution yesterday!' },
    { t: 'us', text: 'Happy to help! Is there anything else we can assist with today?' },
    { t: 'them', text: 'Actually yes — can I upgrade my plan online?' },
    { t: 'us', text: 'Absolutely, head to Billing → Upgrade Plan. Shall I send you the direct link?' },
  ],
};

function badgeCls(ch: string) { return ch === 'WhatsApp' ? 'bg-[#dcfce7] text-[#16a34a]' : ch === 'Email' ? 'bg-[#fef3c7] text-[#b45309]' : 'bg-[#dbeafe] text-[#1d4ed8]'; }

export default function InboxDemo({ className }: { className?: string }) {
  const [sel, setSel] = useState(1);
  const [extra, setExtra] = useState<Record<number, string[]>>({});
  const [input, setInput] = useState('');
  const areaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (areaRef.current) areaRef.current.scrollTop = areaRef.current.scrollHeight;
  }, [sel, extra]);

  const conv = CONVS.find(c => c.id === sel)!;
  const baseMsgs = THREADS[sel] || THREADS[1];
  const extraMsgs = extra[sel] || [];

  const sendMsg = () => {
    const txt = input.trim();
    if (!txt) return;
    setExtra(prev => ({ ...prev, [sel]: [...(prev[sel] || []), txt] }));
    setInput('');
  };

  return (
    <div className={`w-full h-full bg-[#f8fafc] overflow-hidden ${className ?? ''}`}>
      <div className="flex w-full h-full bg-white overflow-hidden">
        <div className="w-[208px] border-r border-[#f1f5f9] flex flex-col shrink-0">
          <div className="px-3 pt-[13px] pb-[10px] border-b border-[#f1f5f9] flex items-center justify-between">
            <span className="text-[15px] font-extrabold text-[#0f172a]">Inbox</span>
            <div className="flex gap-[5px]">
              <button className="w-[26px] h-[26px] rounded-md bg-[#f1f5f9] border-none cursor-pointer flex items-center justify-center text-[#64748b] text-[13px] transition-colors hover:bg-[#e2e8f0]" title="Refresh">↻</button>
              <button className="w-[26px] h-[26px] rounded-md bg-[#f1f5f9] border-none cursor-pointer flex items-center justify-center text-[#64748b] text-[13px] transition-colors hover:bg-[#e2e8f0]" title="New conversation">+</button>
            </div>
          </div>
          <div className="overflow-y-auto flex-1">
            {CONVS.map(c => (
              <div
                key={c.id}
                className={`flex items-start gap-2 px-[11px] py-[9px] cursor-pointer border-b border-[#f8fafc] transition-colors hover:bg-[#f8fafc] ${c.id === sel ? 'bg-[#EEF5FD]' : ''}`}
                onClick={() => setSel(c.id)}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-extrabold text-white shrink-0 mt-px" style={{ background: c.color }}>{c.init}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-bold text-[#0f172a]">{c.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className={`text-[9px] font-bold px-[5px] py-px rounded-[3px] shrink-0 whitespace-nowrap ${badgeCls(c.ch)}`}>{c.ch}</span>
                    <span className="text-[11px] text-[#64748b] whitespace-nowrap overflow-hidden text-ellipsis flex-1 min-w-0">{c.prev}</span>
                    {c.unread ? <span className="w-[15px] h-[15px] rounded-full bg-[#0D47A1] text-white text-[9px] font-bold flex items-center justify-center shrink-0">{c.unread}</span> : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col min-w-0 border-r border-[#f1f5f9]">
          <div className="px-[14px] py-[11px] border-b border-[#f1f5f9] flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[13px] font-extrabold text-[#0f172a]">{conv.name}</span>
              <span className="text-[11px] text-[#64748b]">Webchat / {conv.ch}</span>
            </div>
            <div className="flex gap-[6px] items-center">
              <button className="w-7 h-7 p-0 rounded-md text-[11px] font-semibold border border-[#e2e8f0] bg-white text-[#475569] cursor-pointer transition-all flex items-center justify-center" title="Call">📞</button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-[14px] flex flex-col gap-[10px] bg-[#f8fafc]" ref={areaRef}>
            {baseMsgs.map((m, i) => {
              if (m.t === 'label') return <div key={i} className="text-center text-[10px] text-[#94a3b8] py-0.5 font-semibold mb-0.5">{m.text}</div>;
              if (m.t === 'sys') return <div key={i} className="text-center text-[10px] text-[#94a3b8] py-0.5">{m.text}</div>;
              const isUs = m.t === 'us';
              return (
                <div key={i} className={`flex flex-col max-w-[74%] ${isUs ? 'self-end' : 'self-start'}`}>
                  <div className={`px-3 py-2 rounded-xl text-xs leading-[1.55] ${isUs ? 'bg-[#0D47A1] text-white rounded-br-[3px]' : 'bg-white border border-[#e2e8f0] text-[#1e293b] rounded-bl-[3px]'}`}>{m.text}</div>
                </div>
              );
            })}
            {extraMsgs.map((txt, i) => (
              <div key={`extra-${i}`} className="flex flex-col max-w-[74%] self-end">
                <div className="px-3 py-2 rounded-xl text-xs leading-[1.55] bg-[#0D47A1] text-white rounded-br-[3px]">{txt}</div>
              </div>
            ))}
            <div className="flex flex-col max-w-[74%] self-start">
              <div className="flex gap-[3px] items-center px-3 py-[9px] bg-white border border-[#e2e8f0] rounded-xl rounded-bl-[3px] w-fit">
                <span className="w-[5px] h-[5px] rounded-full bg-[#94a3b8] animate-[ibd-td_1.2s_infinite]"></span>
                <span className="w-[5px] h-[5px] rounded-full bg-[#94a3b8] animate-[ibd-td_1.2s_infinite] [animation-delay:0.2s]"></span>
                <span className="w-[5px] h-[5px] rounded-full bg-[#94a3b8] animate-[ibd-td_1.2s_infinite] [animation-delay:0.4s]"></span>
              </div>
            </div>
          </div>
          <div className="px-[14px] py-[10px] border-t border-[#f1f5f9] bg-white flex items-center gap-2">
            <input
              className="flex-1 border border-[#e2e8f0] rounded-[18px] px-[13px] py-[7px] text-xs text-[#475569] outline-none font-[inherit] bg-[#f8fafc] focus:border-[#93c5fd] focus:bg-white"
              placeholder="Type a message…"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') sendMsg(); }}
            />
            <button className="w-[30px] h-[30px] rounded-full bg-[#0D47A1] border-none cursor-pointer flex items-center justify-center text-white text-xs shrink-0 transition-colors hover:bg-[#0a3a84]" onClick={sendMsg}>➤</button>
          </div>
        </div>
      </div>
    </div>
  );
}
