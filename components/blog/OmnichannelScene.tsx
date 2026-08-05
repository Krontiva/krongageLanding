'use client';
import { useEffect, useRef } from 'react';

const pills = [
  { key: 'wa', icon: '🟢', label: 'WhatsApp', stat: '847 msgs', dur: '3.8s', del: '0s', iconBg: '#dcfce7', statBg: '#dcfce7', statColor: '#15803d' },
  { key: 'sms', icon: '💬', label: 'SMS / RCS', stat: '412 msgs', dur: '3.2s', del: '.5s', iconBg: '#dbeafe', statBg: '#dbeafe', statColor: '#1d4ed8' },
  { key: 'em', icon: '✉️', label: 'Email', stat: '1.2K msgs', dur: '4.1s', del: '1s', iconBg: '#f3f4f6', statBg: '#f3f4f6', statColor: '#374151' },
  { key: 'ig', icon: '📸', label: 'Instagram', stat: '238 msgs', dur: '3.6s', del: '1.5s', iconBg: '#fae8ff', statBg: '#fae8ff', statColor: '#7e22ce' },
  { key: 'fb', icon: '🔵', label: 'Facebook', stat: '193 msgs', dur: '3.9s', del: '2s', iconBg: '#dbeafe', statBg: '#dbeafe', statColor: '#1e40af' },
];

const conversations = [
  { name: 'Ama Kwansa', text: "My renewal notice didn't come through", ch: '🟢', av: 'AK', avBg: '#15803d', delay: '.1s' },
  { name: 'Kofi Owusu', text: 'Can I change my payment date?', ch: '✉️', av: 'KO', avBg: '#0D47A1', delay: '.25s' },
  { name: 'Priya Nair', text: 'When will my claim be processed?', ch: '💬', av: 'PN', avBg: '#7c3aed', delay: '.4s' },
];

export default function OmnichannelScene({ className }: { className?: string }) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const connSvgRef = useRef<SVGSVGElement>(null);
  const funnelRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    let cancelled = false;
    const rafIds: number[] = [];

    const drawLines = () => {
      const svg = connSvgRef.current;
      const scene = sceneRef.current;
      const funnel = funnelRef.current;
      const pillEls = pillRefs.current.filter(Boolean);
      if (!svg || !scene || !funnel) return;

      const sr = scene.getBoundingClientRect();
      const fr = funnel.getBoundingClientRect();
      const tx = fr.left + fr.width / 2 - sr.left;
      const ty = fr.top + fr.height / 2 - sr.top;

      svg.innerHTML = '';
      pillEls.forEach(pill => {
        const pr = pill.getBoundingClientRect();
        const px = pr.right - sr.left;
        const py = pr.top + pr.height / 2 - sr.top;
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', `${px}`); line.setAttribute('y1', `${py}`);
        line.setAttribute('x2', `${tx}`); line.setAttribute('y2', `${ty}`);
        line.setAttribute('stroke', 'rgba(13,71,161,0.1)');
        line.setAttribute('stroke-width', '1');
        line.setAttribute('stroke-dasharray', '4 4');
        svg.appendChild(line);

        const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        dot.setAttribute('r', '3');
        dot.setAttribute('fill', '#0D47A1');
        svg.appendChild(dot);

        let t = Math.random();
        const animate = () => {
          if (cancelled) return;
          t += 0.008;
          if (t > 1) t = 0;
          const cx = px + (tx - px) * t;
          const cy = py + (ty - py) * t;
          const op = t < 0.5 ? t * 2 : (1 - t) * 2;
          dot.setAttribute('cx', `${cx}`); dot.setAttribute('cy', `${cy}`);
          dot.setAttribute('opacity', `${op * 0.7}`);
          rafIds.push(requestAnimationFrame(animate));
        };
        rafIds.push(requestAnimationFrame(animate));
      });
    };

    const timeoutId = setTimeout(drawLines, 100);
    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
      rafIds.forEach(cancelAnimationFrame);
    };
  }, []);

  return (
    <div className={`w-full h-full overflow-hidden ${className ?? ''}`}>
      <div className="[font-family:'Segoe_UI',system-ui,sans-serif] bg-[#f0f4f9] w-full h-full overflow-hidden flex items-center justify-center">
        <div className="w-full h-full grid grid-cols-[1fr_60px_1fr] items-center px-8 py-5 relative" ref={sceneRef}>
          <svg className="absolute inset-0 pointer-events-none w-full h-full" ref={connSvgRef}></svg>

          <div className="flex flex-col gap-[9px] relative">
            {pills.map((p, i) => (
              <div
                key={p.key}
                className="flex items-center gap-[10px] pl-[9px] pr-[14px] py-2 rounded-full bg-white border border-[#e2e8f0] shadow-[0_2px_8px_rgba(0,0,0,0.06)] text-xs font-bold text-[#374151] whitespace-nowrap relative"
                style={{ animation: `oc-floatPill ${p.dur} ease-in-out infinite ${p.del}` }}
                ref={el => { if (el) pillRefs.current[i] = el; }}
              >
                <div className="w-[26px] h-[26px] rounded-full flex items-center justify-center text-sm shrink-0" style={{ background: p.iconBg }}>{p.icon}</div>
                {p.label}
                <span className="ml-auto text-[10px] font-bold px-[7px] py-0.5 rounded-full" style={{ background: p.statBg, color: p.statColor }}>{p.stat}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-[6px] relative" ref={funnelRef}>
            <div className="text-[8px] font-extrabold text-[#94a3b8] uppercase tracking-[0.8px] text-center">Unified</div>
            <svg className="w-12" viewBox="0 0 48 80" fill="none">
              <path d="M4 8 L44 8 L30 40 L30 68 L18 68 L18 40 Z" fill="rgba(13,71,161,.08)" stroke="#0D47A1" strokeWidth="1.5" strokeLinejoin="round" />
              <circle cx="24" cy="72" r="5" fill="#0D47A1" opacity=".7" />
            </svg>
            <div className="text-[8px] font-extrabold text-[#94a3b8] uppercase tracking-[0.8px] text-center">into one</div>
          </div>

          <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-[0_8px_32px_rgba(13,71,161,0.1)] overflow-hidden">
            <div className="bg-[#0D47A1] px-[14px] py-[10px] flex items-center gap-2">
              <div className="w-[22px] h-[22px] bg-white/20 rounded-md flex items-center justify-center text-[11px] text-white">⚡</div>
              <span className="text-[11px] font-bold text-white">Unified Inbox</span>
            </div>
            <div className="flex border-b border-[#f1f5f9] px-3">
              <div className="text-[10px] font-bold px-[10px] py-2 text-[#0D47A1] border-b-2 border-[#0D47A1]">All (2,890)</div>
              <div className="text-[10px] font-bold px-[10px] py-2 text-[#94a3b8] border-b-2 border-transparent">Mine</div>
              <div className="text-[10px] font-bold px-[10px] py-2 text-[#94a3b8] border-b-2 border-transparent">AI</div>
            </div>
            <div className="px-[10px] py-[6px] flex flex-col">
              {conversations.map(c => (
                <div
                  key={c.name}
                  className="flex items-center gap-[9px] py-[7px] border-b border-[#f8fafc] last:border-b-0 [animation:oc-slideIn_0.4s_ease_both]"
                  style={{ animationDelay: c.delay }}
                >
                  <div className="w-7 h-7 rounded-full shrink-0 text-[10px] font-extrabold text-white flex items-center justify-center" style={{ background: c.avBg }}>{c.av}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-bold text-[#0f172a]">{c.name}</div>
                    <div className="text-[9.5px] text-[#94a3b8] mt-px whitespace-nowrap overflow-hidden text-ellipsis">{c.text}</div>
                  </div>
                  <div className="text-[10px] w-5 h-5 rounded-full flex items-center justify-center bg-[#f8fafc] shrink-0">{c.ch}</div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-[5px] px-3 py-[6px] bg-[#EEF5FD] text-[9px] font-bold text-[#0D47A1] border-t border-[#dbeafe]">
              <div className="w-[6px] h-[6px] rounded-full bg-[#22c55e] animate-[oc-blink_1s_ease-in-out_infinite]" />
              All channels · one context · zero switching
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
