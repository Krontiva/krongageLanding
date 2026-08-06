'use client';
import { useEffect, useRef } from 'react';
import { Stethoscope, Broadcast, ChatCircle, CreditCard, ChartBar } from '@phosphor-icons/react';

export default function InsuranceIdentity360({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const rafIds: number[] = [];
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    let intervalId: ReturnType<typeof setInterval>;
    let cancelled = false;

    const PROFILES = [
      { initials: 'SC', name: 'Sarah Chen', color: '#0D47A1', pill: 'Churn Risk: Low', pillBg: 'rgba(13,71,161,.1)', pillBorder: 'rgba(13,71,161,.3)', pillTxt: '#0D47A1' },
      { initials: 'MW', name: 'Marcus Webb', color: '#ea580c', pill: 'Renewal Risk: High', pillBg: 'rgba(234,88,12,.1)', pillBorder: 'rgba(234,88,12,.35)', pillTxt: '#ea580c' },
      { initials: 'AO', name: 'Aisha Okafor', color: '#7c3aed', pill: 'Expansion: Peak', pillBg: 'rgba(124,58,237,.1)', pillBorder: 'rgba(124,58,237,.35)', pillTxt: '#7c3aed' },
    ];

    const CENTER = { x: 210, y: 152 };
    const NODE_POS = [
      { x: 303, y: 98 },
      { x: 303, y: 206 },
      { x: 210, y: 258 },
      { x: 117, y: 206 },
      { x: 117, y: 98 },
    ];

    let activePrf = 0, activeNode = 0, arcAngle = -90;
    let pulseR = 52, pulseDir = 1;

    function drawConnectors() {
      const g = root!.querySelector('#connectors');
      if (!g) return;
      g.innerHTML = '';
      NODE_POS.forEach(pos => {
        const dx = pos.x - CENTER.x, dy = pos.y - CENTER.y;
        const len = Math.sqrt(dx * dx + dy * dy);
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', String(CENTER.x + (dx / len) * 43));
        line.setAttribute('y1', String(CENTER.y + (dy / len) * 43));
        line.setAttribute('x2', String(pos.x - (dx / len) * 16));
        line.setAttribute('y2', String(pos.y - (dy / len) * 16));
        line.setAttribute('stroke', 'rgba(13,71,161,0.1)');
        line.setAttribute('stroke-width', '1.2');
        line.setAttribute('stroke-dasharray', '3 5');
        g.appendChild(line);
      });
    }

    function styleNode(i: number, active: boolean) {
      const p = PROFILES[activePrf];
      const el = root!.querySelector('#n' + i) as HTMLElement | null;
      if (!el) return;
      const icon = el.querySelector('.node-icon') as HTMLElement | null;
      if (active) {
        el.classList.add('active');
        el.style.background = p.color + '14';
        el.style.borderColor = p.color + '60';
        el.style.color = p.color;
        if (icon) icon.style.background = p.color + '18';
        el.style.boxShadow = `0 4px 18px ${p.color}22`;
      } else {
        el.classList.remove('active');
        el.style.background = '';
        el.style.borderColor = '';
        el.style.color = '';
        if (icon) icon.style.background = '';
        el.style.boxShadow = '';
      }
    }

    function setNode(i: number) {
      styleNode(activeNode, false);
      activeNode = i;
      styleNode(activeNode, true);
    }

    function applyProfile(idx: number) {
      const p = PROFILES[idx];
      const initialsEl = root!.querySelector('#cInitials');
      const nameEl = root!.querySelector('#cName');
      if (initialsEl) initialsEl.textContent = p.initials;
      if (nameEl) nameEl.textContent = p.name;

      const pill = root!.querySelector('#predPill') as HTMLElement | null;
      if (pill) {
        pill.textContent = p.pill;
        pill.style.background = p.pillBg;
        pill.style.borderColor = p.pillBorder;
        pill.style.color = p.pillTxt;
      }

      root!.querySelector('#ringArc')?.setAttribute('stroke', p.color);
      root!.querySelector('#pulseRing')?.setAttribute('stroke', p.color);
      root!.querySelector('#aura')?.setAttribute('stroke', p.color);

      styleNode(activeNode, true);
    }

    let dotIdx = 0;
    function fireDot() {
      if (cancelled) return;
      const p = PROFILES[activePrf];
      const pos = NODE_POS[dotIdx % NODE_POS.length];
      dotIdx++;
      const dx = pos.x - CENTER.x, dy = pos.y - CENTER.y;
      const len = Math.sqrt(dx * dx + dy * dy);
      const sx = CENTER.x + (dx / len) * 44, sy = CENTER.y + (dy / len) * 44;
      const ex = pos.x - (dx / len) * 18, ey = pos.y - (dy / len) * 18;

      const ns = 'http://www.w3.org/2000/svg';
      const glow = document.createElementNS(ns, 'circle');
      glow.setAttribute('r', '4'); glow.setAttribute('fill', p.color);
      glow.setAttribute('filter', 'url(#dotGlow)');
      const dot = document.createElementNS(ns, 'circle');
      dot.setAttribute('r', '2.5'); dot.setAttribute('fill', p.color);

      const g = root!.querySelector('#travelDots');
      if (!g) return;
      g.appendChild(glow); g.appendChild(dot);

      let t = 0;
      const step = () => {
        if (cancelled) return;
        t += 0.022;
        if (t > 1) {
          try { g.removeChild(glow); g.removeChild(dot); } catch { /* noop */ }
          timeouts.push(setTimeout(fireDot, 300));
          return;
        }
        const cx = sx + (ex - sx) * t, cy = sy + (ey - sy) * t;
        const op = t < 0.5 ? t * 2 : (1 - t) * 2;
        [glow, dot].forEach(el => { el.setAttribute('cx', String(cx)); el.setAttribute('cy', String(cy)); el.setAttribute('opacity', String(op)); });
        rafIds.push(requestAnimationFrame(step));
      };
      rafIds.push(requestAnimationFrame(step));
    }

    function spinArc() {
      if (cancelled) return;
      arcAngle += 0.35;
      root!.querySelector('#ringArc')?.setAttribute('transform', `rotate(${arcAngle},210,152)`);
      rafIds.push(requestAnimationFrame(spinArc));
    }

    function pulseFn() {
      if (cancelled) return;
      pulseR += 0.25 * pulseDir;
      if (pulseR > 60) pulseDir = -1;
      if (pulseR < 52) pulseDir = 1;
      const el = root!.querySelector('#pulseRing');
      if (el) {
        el.setAttribute('r', String(pulseR));
        el.setAttribute('opacity', (((pulseR - 52) / 8) * 0.3).toFixed(3));
      }
      rafIds.push(requestAnimationFrame(pulseFn));
    }

    function cycleProfile() {
      activePrf = (activePrf + 1) % PROFILES.length;
      applyProfile(activePrf);
    }

    root.querySelectorAll('.node').forEach(el => {
      el.addEventListener('click', () => setNode(parseInt(el.getAttribute('data-i') || '0', 10)));
    });

    drawConnectors();
    applyProfile(0);
    setNode(0);
    timeouts.push(setTimeout(fireDot, 600));
    spinArc();
    pulseFn();
    intervalId = setInterval(cycleProfile, 5000);

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
      rafIds.forEach(cancelAnimationFrame);
      clearInterval(intervalId);
    };
  }, []);

  const nodeClass = "absolute z-[15] flex items-center gap-[7px] py-1.5 pr-[11px] pl-[7px] rounded-full bg-white border border-[#e2e8f0] shadow-[0_2px_8px_rgba(0,0,0,0.07)] cursor-pointer whitespace-nowrap text-[11px] font-bold text-[#475569] -translate-x-1/2 -translate-y-1/2 transition-[background,border-color,color,box-shadow] duration-[250ms] hover:bg-[#f8fafc] hover:border-[#cbd5e1] hover:text-[#0f172a]";
  const nodeIconClass = "node-icon w-6 h-6 rounded-full flex items-center justify-center text-[13px] shrink-0 bg-[#EEF5FD] transition-colors duration-[250ms]";

  return (
    <div className={`w-full h-full bg-[#f0f4f9] overflow-hidden flex items-center justify-center ${className ?? ''}`}>
      <div className="relative w-[420px] h-[300px] shrink-0" ref={rootRef}>
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-[5]" id="orbitSvg" viewBox="0 0 420 420">
          <defs>
            <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="dotGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" />
            </filter>
            <filter id="auraBlur" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="10" />
            </filter>
          </defs>

          <circle cx="210" cy="152" r="108" fill="none" stroke="rgba(13,71,161,0.1)" strokeWidth="1" strokeDasharray="3 5" />

          <g id="connectors"></g>
          <g id="travelDots"></g>

          <circle id="aura" cx="210" cy="152" r="52" fill="none" strokeWidth="18" opacity="0.12" filter="url(#auraBlur)" />

          <circle cx="210" cy="152" r="52" fill="none" stroke="rgba(13,71,161,0.08)" strokeWidth="1.5" />

          <circle id="ringArc" cx="210" cy="152" r="52" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="195 131" transform="rotate(-90, 210, 152)" />

          <circle id="pulseRing" cx="210" cy="152" r="52" fill="none" strokeWidth="1.5" opacity="0" />
        </svg>

        <div
          className="absolute w-[82px] h-[82px] top-[111px] left-[169px] rounded-full bg-[linear-gradient(145deg,#12275c,#0D47A1)] shadow-[0_0_0_3px_#fff,0_8px_32px_rgba(13,71,161,0.28)] flex flex-col items-center justify-center z-20 cursor-pointer transition-shadow duration-[700ms] ease-in-out"
          id="centerNode"
        >
          <div className="text-[22px] font-black text-white leading-none mb-[3px] tracking-[-0.5px] transition-opacity duration-[400ms]" id="cInitials">SC</div>
          <div className="text-[7px] font-bold text-white/65 uppercase tracking-[0.8px] text-center max-w-16 leading-[1.2] transition-opacity duration-[400ms]" id="cName">Sarah Chen</div>
          <div className="absolute -bottom-[13px] left-1/2 -translate-x-1/2 px-2.5 py-[3px] rounded-full text-[9px] font-extrabold tracking-[0.3px] whitespace-nowrap border transition-[background,color,border-color] duration-[700ms] z-[5]" id="predPill">Churn Risk: Low</div>
        </div>

        <div className={nodeClass} id="n0" data-i="0" style={{ left: '303px', top: '98px', animation: 'i360-nodeFloat 4.4s ease-in-out infinite 0s' }}>
          <div className={nodeIconClass}><Stethoscope size={14} weight="duotone" color="#0D47A1" /></div>Claims
        </div>
        <div className={nodeClass} id="n1" data-i="1" style={{ left: '303px', top: '206px', animation: 'i360-nodeFloat 3.9s ease-in-out infinite 0.6s' }}>
          <div className={nodeIconClass}><Broadcast size={14} weight="duotone" color="#0D47A1" /></div>Telematics
        </div>
        <div className={nodeClass} id="n2" data-i="2" style={{ left: '210px', top: '258px', animation: 'i360-nodeFloat 4.2s ease-in-out infinite 1.2s' }}>
          <div className={nodeIconClass}><ChatCircle size={14} weight="duotone" color="#0D47A1" /></div>Support
        </div>
        <div className={nodeClass} id="n3" data-i="3" style={{ left: '117px', top: '206px', animation: 'i360-nodeFloat 4.6s ease-in-out infinite 1.8s' }}>
          <div className={nodeIconClass}><CreditCard size={14} weight="duotone" color="#0D47A1" /></div>Billing
        </div>
        <div className={nodeClass} id="n4" data-i="4" style={{ left: '117px', top: '98px', animation: 'i360-nodeFloat 4.3s ease-in-out infinite 2.4s' }}>
          <div className={nodeIconClass}><ChartBar size={14} weight="duotone" color="#0D47A1" /></div>Behavioral
        </div>
      </div>
    </div>
  );
}
