'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ChatCircle, ChartBar, BellRinging, CheckCircle, Globe, Lightning, HandWaving,
  FileText, Trash, PencilSimple, Gear, DeviceMobile, Lightbulb, Brain, Megaphone,
  Warning, Circle, FacebookLogo, type Icon,
} from '@phosphor-icons/react';

const COUNTER_TARGETS: Record<string, number> = {
  profiles: 14, ai: 3, workflows: 0, docs: 2, team: 3, tokens: 0,
  accounts: 2, agents: 6, inboxes: 6, conversations: 18,
};
const FLASH_KEYS = ['profiles', 'ai', 'workflows', 'docs', 'team', 'tokens'];
const MENTION_BAR_DATA = [40, 55, 38, 62, 70, 48, 80, 90, 75, 85, 95, 88];
const AUTO_VIEWS = ['dash', 'inbox', 'social-pub', 'campaigns', 'social', 'customers', 'knowledge', 'settings', 'usage'];
const HOURS = ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
const TOASTS: { icon: Icon; title: string; sub: string }[] = [
  { icon: ChatCircle, title: 'New conversation', sub: '@customer_42 started a chat on WhatsApp' },
  { icon: ChartBar, title: 'Sentiment updated', sub: 'Brand health rose to 81% (+2%)' },
  { icon: BellRinging, title: '3 new mentions', sub: 'Twitter · just now' },
  { icon: CheckCircle, title: 'Workflow complete', sub: 'Email welcome sequence finished' },
  { icon: Globe, title: 'Follower spike', sub: '+48 new followers this hour' },
  { icon: Lightning, title: 'AI response sent', sub: 'Agent handled query automatically' },
];

interface ToastItem { id: number; icon: Icon; title: string; sub: string; shown: boolean; leaving: boolean; }

// ── shared Tailwind class fragments (mirror the former CSS classes) ──
const kdViewBase = "absolute inset-0 overflow-y-auto overflow-x-hidden px-[18px] pt-[18px] pb-3.5 transition-[opacity,transform] duration-[280ms] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-[#e2e8f0] [&::-webkit-scrollbar-thumb]:rounded-sm";
const kdViewActive = "opacity-100 translate-y-0 pointer-events-auto";
const kdViewInactive = "opacity-0 translate-y-1.5 pointer-events-none";

const kdNbBase = "w-full h-9 rounded-[9px] flex items-center justify-center cursor-pointer transition-all duration-[180ms] border-none bg-transparent [&_svg]:w-[17px] [&_svg]:h-[17px] [&_svg]:shrink-0";
const kdNbActive = "bg-[#EEF5FD] text-[#0D47A1]";
const kdNbInactive = "text-[#94a3b8] hover:bg-[#f1f5f9] hover:text-[#475569]";

const statCardBase = "bg-white border border-[#f1f5f9] rounded-[10px] px-[9px] py-[11px] transition-[box-shadow,border-color,background,transform] duration-[220ms] hover:border-[#93c5fd] hover:-translate-y-[3px] hover:bg-[#fafcff]";
const statCardFlash = "border-[#93c5fd] bg-[#eff6ff]";

const siTabBase = "px-[9px] py-[3px] rounded-md text-[10px] font-bold border border-[#e2e8f0] bg-white text-[#64748b] cursor-pointer transition-all duration-150";
const siTabActive = "bg-[#0D47A1] text-white border-[#0D47A1]";

const kdViewDotBase = "h-1.5 rounded-[10px] bg-[#cbd5e1] transition-[background,width] duration-[350ms] ease-[cubic-bezier(.4,0,.2,1)] cursor-pointer w-1.5";
const kdViewDotActive = "bg-[#0D47A1] w-[22px]";

export default function DashboardDemo({ className }: { className?: string }) {
  const [activeView, setActiveView] = useState('dash');
  const [siTab, setSiTab] = useState(0);
  const [counts, setCounts] = useState<Record<string, number>>(() =>
    Object.fromEntries(Object.keys(COUNTER_TARGETS).map(k => [k, 0]))
  );
  const [flashingCard, setFlashingCard] = useState<string | null>(null);
  const [liveCount, setLiveCount] = useState(301);
  const [gaugeRevealed, setGaugeRevealed] = useState(false);
  const [socialRevealed, setSocialRevealed] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const autoIdxRef = useRef(0);
  const autoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const socialInitedRef = useRef(false);
  const riverRafRef = useRef<number | null>(null);
  const toastIdxRef = useRef(0);
  const toastIdRef = useRef(0);

  const startAutoSwitch = useCallback(() => {
    if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    autoTimerRef.current = setInterval(() => {
      autoIdxRef.current = (autoIdxRef.current + 1) % AUTO_VIEWS.length;
      setActiveView(AUTO_VIEWS[autoIdxRef.current]);
    }, 9000);
  }, []);

  useEffect(() => {
    startAutoSwitch();
    return () => { if (autoTimerRef.current) clearInterval(autoTimerRef.current); };
  }, [startAutoSwitch]);

  const handleNavClick = useCallback((view: string) => {
    setActiveView(view);
    startAutoSwitch();
  }, [startAutoSwitch]);

  // Animated counters (0 -> target) on mount
  useEffect(() => {
    const rafIds: number[] = [];
    const timeoutId = setTimeout(() => {
      Object.entries(COUNTER_TARGETS).forEach(([key, target]) => {
        const duration = 1000 + Math.random() * 400;
        const start = performance.now();
        function tick(now: number) {
          const p = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setCounts(c => ({ ...c, [key]: Math.round(ease * target) }));
          if (p < 1) rafIds.push(requestAnimationFrame(tick));
        }
        rafIds.push(requestAnimationFrame(tick));
      });
    }, 200);
    return () => { clearTimeout(timeoutId); rafIds.forEach(cancelAnimationFrame); };
  }, []);

  // Gauge reveal
  useEffect(() => {
    const t = setTimeout(() => setGaugeRevealed(true), 400);
    return () => clearTimeout(t);
  }, []);

  // Live count nudger
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCount(v => {
        let nv = v + Math.floor(Math.random() * 7) - 2;
        if (nv < 280) nv = 295;
        return nv;
      });
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Random stat-card flash + counter nudge
  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const interval = setInterval(() => {
      const key = FLASH_KEYS[Math.floor(Math.random() * FLASH_KEYS.length)];
      const target = COUNTER_TARGETS[key];
      if (target === 0) return;
      let applied = false;
      setCounts(c => {
        const newVal = c[key] + (Math.random() > 0.5 ? 1 : -1);
        if (newVal < 0) return c;
        applied = true;
        return { ...c, [key]: newVal };
      });
      if (!applied) return;
      setFlashingCard(key);
      timeouts.push(setTimeout(() => setFlashingCard(f => (f === key ? null : f)), 600));
    }, 4500);
    return () => { clearInterval(interval); timeouts.forEach(clearTimeout); };
  }, []);

  // Social Intelligence: river canvas + platform bar reveal (first visit only, persists forever after)
  useEffect(() => {
    if (activeView !== 'social' || socialInitedRef.current) return;
    socialInitedRef.current = true;

    const canvas = canvasRef.current;
    if (canvas) {
      const W = canvas.parentElement?.clientWidth || 500;
      canvas.width = W;
      canvas.height = 90;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const layers = [
          { color: 'rgba(34,197,94,0.72)', base: 0.55, amp: 0.15 },
          { color: 'rgba(148,163,184,0.65)', base: 0.22, amp: 0.08 },
          { color: 'rgba(245,158,11,0.70)', base: 0.13, amp: 0.06 },
          { color: 'rgba(239,68,68,0.65)', base: 0.07, amp: 0.04 },
        ];
        const pts = 60;
        const noise = (x: number, freq: number, phase: number) =>
          Math.sin(x * freq + phase) * 0.5 +
          Math.sin(x * freq * 1.7 + phase * 1.3) * 0.3 +
          Math.sin(x * freq * 0.5 + phase * 0.7) * 0.2;

        const drawRiver = (t: number) => {
          ctx.clearRect(0, 0, W, 90);
          const H = 90;
          let bottom = new Float32Array(pts + 1);
          layers.forEach((layer, li) => {
            const top = new Float32Array(pts + 1);
            for (let i = 0; i <= pts; i++) {
              const x = i / pts;
              const wave = noise(x, 3.5, t * 0.4 + li * 1.2);
              top[i] = bottom[i] + (layer.base + wave * layer.amp) * H;
            }
            ctx.beginPath();
            ctx.moveTo(0, H - bottom[0]);
            for (let i = 1; i <= pts; i++) ctx.lineTo((i / pts) * W, H - top[i]);
            for (let i = pts; i >= 0; i--) ctx.lineTo((i / pts) * W, H - bottom[i]);
            ctx.closePath();
            ctx.fillStyle = layer.color;
            ctx.fill();
            for (let i = 0; i <= pts; i++) bottom[i] = top[i];
          });
        };

        let frame = 0;
        const animate = () => {
          frame++;
          drawRiver(frame * 0.018);
          riverRafRef.current = requestAnimationFrame(animate);
        };
        animate();
      }
    }

    const t = setTimeout(() => setSocialRevealed(true), 100);
    return () => clearTimeout(t);
  }, [activeView]);

  useEffect(() => () => { if (riverRafRef.current !== null) cancelAnimationFrame(riverRafRef.current); }, []);

  // Toast notifications
  const dismissToast = useCallback((id: number) => {
    setToasts(ts => ts.map(t => (t.id === id ? { ...t, leaving: true } : t)));
    setTimeout(() => setToasts(ts => ts.filter(t => t.id !== id)), 400);
  }, []);

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    function showToast() {
      const t = TOASTS[toastIdxRef.current % TOASTS.length];
      toastIdxRef.current++;
      const id = toastIdRef.current++;
      setToasts(ts => [...ts, { id, icon: t.icon, title: t.title, sub: t.sub, shown: false, leaving: false }]);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setToasts(ts => ts.map(x => (x.id === id ? { ...x, shown: true } : x)));
        });
      });
      timeouts.push(setTimeout(() => dismissToast(id), 4000));
    }
    timeouts.push(setTimeout(showToast, 1800));
    const interval = setInterval(showToast, 7000);
    return () => { timeouts.forEach(clearTimeout); clearInterval(interval); };
  }, [dismissToast]);

  const mentionBarMax = Math.max(...MENTION_BAR_DATA);

  return (
    <div className={`w-full h-full ${className ?? ''}`}>
      <div className="flex w-full h-full bg-[#f8fafc] overflow-hidden [font-family:'Manrope',sans-serif] text-xs text-[#0f172a] select-none relative box-border">

        {/* ── SIDEBAR ── */}
        <div className="w-[54px] bg-white border-r border-[#f1f5f9] flex flex-col items-center py-3.5 shrink-0">
          <div className="w-[34px] h-[34px] rounded-[9px] bg-[#0D47A1] flex items-center justify-center mb-4">
            <svg className="w-5 h-5" viewBox="0 0 32 32" fill="none"><path d="M16 4C9.37 4 4 9.37 4 16s5.37 12 12 12 12-5.37 12-12S22.63 4 16 4zm0 4a8 8 0 110 16A8 8 0 0116 8zm0 2a6 6 0 100 12A6 6 0 0016 10zm0 2a4 4 0 110 8 4 4 0 010-8z" fill="white"/></svg>
          </div>

          <div className="flex-1 flex flex-col gap-0.5 items-center w-full px-[7px]">
            <button className={`${kdNbBase} ${activeView === 'dash' ? kdNbActive : kdNbInactive}`} title="Dashboard" onClick={() => handleNavClick('dash')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            </button>
            <button className={`${kdNbBase} ${activeView === 'inbox' ? kdNbActive : kdNbInactive}`} title="Inbox" onClick={() => handleNavClick('inbox')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
            </button>
            <button className={`${kdNbBase} ${activeView === 'social-pub' ? kdNbActive : kdNbInactive}`} title="Social Publishing" onClick={() => handleNavClick('social-pub')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            </button>
            <button className={`${kdNbBase} ${activeView === 'campaigns' ? kdNbActive : kdNbInactive}`} title="Campaigns" onClick={() => handleNavClick('campaigns')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
            </button>
            <button className={`${kdNbBase} ${activeView === 'social' ? kdNbActive : kdNbInactive}`} title="Social Intelligence" onClick={() => handleNavClick('social')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/></svg>
            </button>
            <button className={`${kdNbBase} ${activeView === 'customers' ? kdNbActive : kdNbInactive}`} title="Customer 360" onClick={() => handleNavClick('customers')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
            </button>
            <button className={`${kdNbBase} ${activeView === 'knowledge' ? kdNbActive : kdNbInactive}`} title="Knowledge" onClick={() => handleNavClick('knowledge')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>
            </button>
            <button className={`${kdNbBase} ${activeView === 'usage' ? kdNbActive : kdNbInactive}`} title="Usage & Limits" onClick={() => handleNavClick('usage')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 017 4.5v0A2.5 2.5 0 014.5 7H4a2 2 0 00-2 2v0a2 2 0 002 2h.5A2.5 2.5 0 017 13.5v0A2.5 2.5 0 019.5 16H10v2a2 2 0 002 2v0a2 2 0 002-2v-2h.5a2.5 2.5 0 002.5-2.5v0a2.5 2.5 0 012.5-2.5H20a2 2 0 002-2v0a2 2 0 00-2-2h-.5A2.5 2.5 0 0117 4.5v0A2.5 2.5 0 0114.5 2H14a2 2 0 00-2 2v0a2 2 0 00-2-2h-.5z"/><circle cx="12" cy="10" r="2"/></svg>
            </button>
            <button className={`${kdNbBase} ${activeView === 'settings' ? kdNbActive : kdNbInactive}`} title="Settings" onClick={() => handleNavClick('settings')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
            </button>
          </div>

          <div className="flex flex-col items-center gap-2 px-[7px] w-full">
            <div className="w-10 h-9 rounded-[9px] flex items-center justify-center cursor-pointer text-[#94a3b8] bg-transparent hover:bg-[#f1f5f9] hover:text-[#475569] [&_svg]:w-[17px] [&_svg]:h-[17px]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
            <div className="w-10 h-9 rounded-[9px] flex items-center justify-center cursor-pointer text-[#94a3b8] bg-transparent hover:bg-[#f1f5f9] hover:text-[#475569] [&_svg]:w-[17px] [&_svg]:h-[17px]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <div className="w-[30px] h-[30px] rounded-full bg-[linear-gradient(135deg,#7C3AED,#0D47A1)] flex items-center justify-center text-[10px] font-extrabold text-white relative cursor-pointer mt-1 after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-2 after:h-2 after:rounded-full after:bg-[#22c55e] after:border-[1.5px] after:border-white">PA</div>
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="flex-1 overflow-hidden relative">

          {/* ══ VIEW: DASHBOARD ══ */}
          <div className={`${kdViewBase} ${activeView === 'dash' ? kdViewActive : kdViewInactive}`}>

            <div className="flex items-start justify-between mb-3.5">
              <div>
                <h1 className="text-[17px] font-extrabold flex items-center gap-1.5">Good afternoon, Platform <HandWaving size={17} weight="duotone" /></h1>
                <div className="text-[11px] text-[#64748b] mt-0.5">Here&apos;s your <span className="text-[#0D47A1] font-bold">KronGage</span> overview for Krontiva Internal</div>
              </div>
              <div className="flex gap-1.5 items-center mt-[3px]">
                <div className="flex items-center gap-1 px-[9px] py-[3px] rounded-full text-[10px] font-bold bg-[#eef2ff] text-[#4f46e5]">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>
                  Professional
                </div>
                <div className="flex items-center gap-1 px-[9px] py-[3px] rounded-full text-[10px] font-bold bg-[#fff7ed] text-[#ea580c]"><Warning size={11} weight="duotone" />5/6 services up</div>
              </div>
            </div>

            <div className="grid grid-cols-6 gap-[7px] mb-2.5">
              <div className={`${statCardBase} ${flashingCard === 'profiles' ? statCardFlash : ''}`}>
                <div className="w-[26px] h-[26px] rounded-[7px] flex items-center justify-center mb-[7px] text-[13px] bg-[#fce7f3]"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></div>
                <div className="text-xl font-extrabold leading-none mb-[3px]">{counts.profiles}</div>
                <div className="text-[9.5px] text-[#64748b] font-semibold leading-[1.3]">Customer Profiles</div>
                <div className="text-[9px] text-[#22c55e] font-bold mt-[3px]">13 active 7d</div>
              </div>
              <div className={`${statCardBase} ${flashingCard === 'ai' ? statCardFlash : ''}`}>
                <div className="w-[26px] h-[26px] rounded-[7px] flex items-center justify-center mb-[7px] text-[13px] bg-[#ede9fe]"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></div>
                <div className="text-xl font-extrabold leading-none mb-[3px]">{counts.ai}</div>
                <div className="text-[9.5px] text-[#64748b] font-semibold leading-[1.3]">AI Requests</div>
              </div>
              <div className={`${statCardBase} ${flashingCard === 'workflows' ? statCardFlash : ''}`}>
                <div className="w-[26px] h-[26px] rounded-[7px] flex items-center justify-center mb-[7px] text-[13px] bg-[#fef3c7]"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div>
                <div className="text-xl font-extrabold leading-none mb-[3px]">{counts.workflows}</div>
                <div className="text-[9.5px] text-[#64748b] font-semibold leading-[1.3]">Active Workflows</div>
              </div>
              <div className={`${statCardBase} ${flashingCard === 'docs' ? statCardFlash : ''}`}>
                <div className="w-[26px] h-[26px] rounded-[7px] flex items-center justify-center mb-[7px] text-[13px] bg-[#dbeafe]"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg></div>
                <div className="text-xl font-extrabold leading-none mb-[3px]">{counts.docs}</div>
                <div className="text-[9.5px] text-[#64748b] font-semibold leading-[1.3]">Knowledge Docs</div>
                <div className="text-[9px] text-[#22c55e] font-bold mt-[3px]">2 collections</div>
              </div>
              <div className={`${statCardBase} ${flashingCard === 'team' ? statCardFlash : ''}`}>
                <div className="w-[26px] h-[26px] rounded-[7px] flex items-center justify-center mb-[7px] text-[13px] bg-[#d1fae5]"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg></div>
                <div className="text-xl font-extrabold leading-none mb-[3px]">{counts.team}</div>
                <div className="text-[9.5px] text-[#64748b] font-semibold leading-[1.3]">Team Members</div>
              </div>
              <div className={`${statCardBase} ${flashingCard === 'tokens' ? statCardFlash : ''}`}>
                <div className="w-[26px] h-[26px] rounded-[7px] flex items-center justify-center mb-[7px] text-[13px] bg-[#e0f2fe]"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg></div>
                <div className="text-xl font-extrabold leading-none mb-[3px]">{counts.tokens}</div>
                <div className="text-[9.5px] text-[#64748b] font-semibold leading-[1.3]">AI Token Budget</div>
                <div className="text-[9px] text-[#94a3b8] font-bold mt-[3px]">0% of 50.0M</div>
              </div>
            </div>

            <div className="text-[9px] font-extrabold uppercase tracking-[1px] text-[#94a3b8] mb-[7px] flex items-center justify-between">KronChat Platform <span className="text-[#0D47A1] text-[9px] font-bold normal-case tracking-normal cursor-pointer">Live metrics</span></div>
            <div className="bg-white border border-[#f1f5f9] rounded-[10px] px-3.5 py-3 mb-2.5">
              <div className="grid grid-cols-4">
                <div className="text-center py-1.5 border-r border-[#f1f5f9] last:border-r-0 rounded-lg transition-[background,transform] duration-200 cursor-default hover:bg-[#f0f7ff] hover:scale-[1.04]">
                  <div className="text-[22px] font-extrabold">{counts.accounts}</div>
                  <div className="text-[10px] text-[#64748b] mt-0.5">Accounts</div>
                </div>
                <div className="text-center py-1.5 border-r border-[#f1f5f9] last:border-r-0 rounded-lg transition-[background,transform] duration-200 cursor-default hover:bg-[#f0f7ff] hover:scale-[1.04]">
                  <div className="text-[22px] font-extrabold">{counts.agents}</div>
                  <div className="text-[10px] text-[#64748b] mt-0.5">Agents</div>
                </div>
                <div className="text-center py-1.5 border-r border-[#f1f5f9] last:border-r-0 rounded-lg transition-[background,transform] duration-200 cursor-default hover:bg-[#f0f7ff] hover:scale-[1.04]">
                  <div className="text-[22px] font-extrabold">{counts.inboxes}</div>
                  <div className="text-[10px] text-[#64748b] mt-0.5">Inboxes</div>
                </div>
                <div className="text-center py-1.5 border-r border-[#f1f5f9] last:border-r-0 rounded-lg transition-[background,transform] duration-200 cursor-default hover:bg-[#f0f7ff] hover:scale-[1.04]">
                  <div className="text-[22px] font-extrabold">{counts.conversations}</div>
                  <div className="text-[10px] text-[#64748b] mt-0.5">Conversations</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-[1.15fr_1fr_1fr] gap-2">
              <div className="bg-white border border-[#f1f5f9] rounded-[10px] p-3 transition-[box-shadow,border-color,transform] duration-[220ms] hover:border-[#bfdbfe] hover:-translate-y-0.5">
                <div className="text-[9px] font-extrabold uppercase tracking-[1px] text-[#94a3b8] mb-2 flex items-center justify-between">AI USAGE <span className="text-[#0D47A1] text-[9px] font-bold normal-case tracking-normal cursor-pointer">View all ↗</span></div>
                <div className="flex items-center justify-between py-1 border-b border-[#f8fafc] last:border-b-0 text-[11px] text-[#374151]"><span>AI Requests</span><span className="text-[10px] text-[#94a3b8]">3/100.0K</span></div>
                <div className="flex items-center justify-between py-1 border-b border-[#f8fafc] last:border-b-0 text-[11px] text-[#374151]"><span>AI Token Budget</span><span className="text-[10px] text-[#94a3b8]">0/50.0M</span></div>
                <div className="flex items-center justify-between py-1 border-b border-[#f8fafc] last:border-b-0 text-[11px] text-[#374151]"><span>KronChat Messages</span><span className="text-[10px] text-[#94a3b8]">0/50.0K</span></div>
                <div className="flex items-center justify-between py-1 border-b border-[#f8fafc] last:border-b-0 text-[11px] text-[#374151]"><span>Socials AI</span><span className="text-[10px] text-[#94a3b8]">0/20.0K</span></div>
                <div className="flex items-center justify-between py-1 border-b border-[#f8fafc] last:border-b-0 text-[11px] text-[#374151]"><span>Embeddings</span><span className="text-[10px] text-[#94a3b8]">0/1.0M</span></div>
                <div className="flex items-center justify-between py-1 border-b border-[#f8fafc] last:border-b-0 text-[11px] text-[#374151]"><span>Storage (MB)</span><span className="text-[10px] text-[#94a3b8]">0/10.0K</span></div>
              </div>

              <div className="bg-white border border-[#f1f5f9] rounded-[10px] p-3 transition-[box-shadow,border-color,transform] duration-[220ms] hover:border-[#bfdbfe] hover:-translate-y-0.5">
                <div className="text-[9px] font-extrabold uppercase tracking-[1px] text-[#94a3b8] mb-2 flex items-center justify-between">RECENT ACTIVITY <span className="text-[#0D47A1] text-[9px] font-bold normal-case tracking-normal cursor-pointer">AI Studio ↗</span></div>
                <div className="flex flex-col items-center justify-center h-[84px] gap-[5px]">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                  <p className="text-[10.5px] text-[#94a3b8]">No recent activity</p>
                  <span className="text-[10.5px] text-[#0D47A1] font-bold cursor-pointer">Create a workflow →</span>
                </div>
              </div>

              <div className="bg-white border border-[#f1f5f9] rounded-[10px] p-3 transition-[box-shadow,border-color,transform] duration-[220ms] hover:border-[#bfdbfe] hover:-translate-y-0.5">
                <div className="text-[9px] font-extrabold uppercase tracking-[1px] text-[#94a3b8] mb-2 flex items-center justify-between">INSIGHTS <span className="text-[#0D47A1] text-[9px] font-bold normal-case tracking-normal cursor-pointer">Customer 360 ↗</span></div>
                <div className="text-[9px] font-extrabold uppercase tracking-[1px] text-[#94a3b8] mt-1.5 mb-[5px]">CUSTOMERS</div>
                <div className="grid grid-cols-2 gap-[5px]">
                  <div className="bg-[#f8fafc] rounded-[7px] p-[7px] text-center"><div className="text-[17px] font-extrabold">13</div><div className="text-[9px] text-[#94a3b8] mt-px">Active (7d)</div></div>
                  <div className="bg-[#f8fafc] rounded-[7px] p-[7px] text-center"><div className="text-[17px] font-extrabold">14</div><div className="text-[9px] text-[#94a3b8] mt-px">Active (30d)</div></div>
                </div>
                <div className="text-[9px] font-extrabold uppercase tracking-[1px] text-[#94a3b8] mt-1.5 mb-[5px]">KNOWLEDGE BASE</div>
                <div className="grid grid-cols-3 gap-1 mt-1.5">
                  <div className="bg-[#f8fafc] rounded-[7px] p-[5px] text-center"><div className="text-[13px] font-extrabold">2</div><div className="text-[9px] text-[#94a3b8]">Documents</div></div>
                  <div className="bg-[#f8fafc] rounded-[7px] p-[5px] text-center"><div className="text-[13px] font-extrabold">229</div><div className="text-[9px] text-[#94a3b8]">Chunks</div></div>
                  <div className="bg-[#f8fafc] rounded-[7px] p-[5px] text-center"><div className="text-[13px] font-extrabold">79</div><div className="text-[9px] text-[#94a3b8]">Entities</div></div>
                </div>
              </div>
            </div>
          </div>{/* /view-dash */}

          {/* ══ VIEW: SOCIAL INTELLIGENCE ══ */}
          <div className={`${kdViewBase} ${activeView === 'social' ? kdViewActive : kdViewInactive}`}>

            <div className="flex items-start justify-between mb-3">
              <div>
                <h2 className="text-[15px] font-extrabold">Social Intelligence</h2>
                <p className="text-[10.5px] text-[#64748b] mt-0.5">Real-time brand monitoring across 9 platforms</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-[3px]">
                  <button className={`${siTabBase} ${siTab === 0 ? siTabActive : ''}`} onClick={() => setSiTab(0)}>24h</button>
                  <button className={`${siTabBase} ${siTab === 1 ? siTabActive : ''}`} onClick={() => setSiTab(1)}>7d</button>
                  <button className={`${siTabBase} ${siTab === 2 ? siTabActive : ''}`} onClick={() => setSiTab(2)}>30d</button>
                </div>
                <div className="flex items-center gap-[5px] text-[10px] font-bold text-[#22c55e]"><div className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-[pulse-dot_2s_ease-in-out_infinite]" /> All layers healthy</div>
              </div>
            </div>

            <div className="grid grid-cols-[90px_1fr_100px_1fr_140px] gap-[7px] mb-2.5">
              <div className="bg-white border border-[#f1f5f9] rounded-[10px] px-3 py-2.5 transition-[box-shadow,border-color,transform] duration-[220ms] hover:border-[#93c5fd] hover:-translate-y-0.5 text-center flex flex-col items-center justify-center">
                <div className="flex items-center gap-[5px]">
                  <div className="text-xl font-extrabold">{liveCount}</div>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e] -mt-0.5 animate-[pulse-dot_1.5s_ease-in-out_infinite]" />
                </div>
                <div className="text-[8.5px] font-extrabold uppercase tracking-[1px] text-[#94a3b8] mt-[5px] mb-0">LIVE THIS HOUR</div>
              </div>

              <div className="bg-white border border-[#f1f5f9] rounded-[10px] px-3 py-2.5 transition-[box-shadow,border-color,transform] duration-[220ms] hover:border-[#93c5fd] hover:-translate-y-0.5">
                <div className="text-[8.5px] font-extrabold uppercase tracking-[1px] text-[#94a3b8] mb-[5px]">24H MENTIONS</div>
                <div className="text-xl font-extrabold">5.3K</div>
                <svg width="100%" height="30" className="mt-1">
                  <g>
                    {MENTION_BAR_DATA.map((v, i) => {
                      const bw = 8, gap = 5;
                      const h = (v / mentionBarMax) * 24;
                      return <rect key={i} x={i * (bw + gap)} y={28 - h} width={bw} height={h} rx={2} fill="#0D47A1" opacity={i === MENTION_BAR_DATA.length - 1 ? 1 : 0.35} />;
                    })}
                  </g>
                </svg>
              </div>

              <div className="bg-white border border-[#f1f5f9] rounded-[10px] px-3 py-2.5 transition-[box-shadow,border-color,transform] duration-[220ms] hover:border-[#93c5fd] hover:-translate-y-0.5 flex flex-col items-center justify-center">
                <div className="relative w-[72px] h-10">
                  <svg viewBox="0 0 100 56" width="100%" height="100%">
                    <path d="M 12 50 A 38 38 0 0 1 88 50" fill="none" stroke="#e2e8f0" strokeWidth="7" strokeLinecap="round"/>
                    <path
                      className="transition-[stroke-dashoffset] duration-[1.2s] ease-[cubic-bezier(.4,0,.2,1)]"
                      d="M 12 50 A 38 38 0 0 1 88 50" fill="none" stroke="#22c55e" strokeWidth="7" strokeLinecap="round"
                      strokeDasharray="119.4" strokeDashoffset={gaugeRevealed ? 25.1 : 119.4}
                    />
                    <text x="50" y="48" textAnchor="middle" fontSize="14" fontWeight="800" fill="#0f172a" fontFamily="Manrope,sans-serif">79%</text>
                  </svg>
                </div>
                <div className="text-[8.5px] font-extrabold uppercase tracking-[1px] text-[#94a3b8] mt-[3px]">Brand Health</div>
              </div>

              <div className="bg-white border border-[#f1f5f9] rounded-[10px] px-3 py-2.5 transition-[box-shadow,border-color,transform] duration-[220ms] hover:border-[#93c5fd] hover:-translate-y-0.5">
                <div className="text-[8.5px] font-extrabold uppercase tracking-[1px] text-[#94a3b8] mb-[5px]">TOP PLATFORM</div>
                <div className="flex items-center gap-[5px] mt-0.5">
                  <svg width="16" height="16" viewBox="0 0 32 32" fill="#000"><path d="M17.75 14.77L25.3 6h-1.8l-6.57 7.63L11.62 6H6l7.93 11.55L6 26h1.8l6.93-8.05L20.38 26H26l-8.25-11.23zm-2.45 2.85l-.8-1.15-6.38-9.12h2.75l5.16 7.38.8 1.14 6.69 9.57h-2.75l-5.47-7.82z"/></svg>
                  <span className="text-[18px] font-extrabold">2.5K</span>
                </div>
                <div className="text-[9.5px] text-[#64748b] mt-0.5">Twitter · +0.42</div>
                <div className="flex gap-[3px] mt-[5px]">
                  <div className="w-[18px] h-[18px] rounded-[4px] flex items-center justify-center bg-[#ff0000]"><svg width="10" height="10" viewBox="0 0 32 32" fill="white"><path d="M26.7 8.8s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C19.2 4.5 16 4.5 16 4.5s-3.2 0-6.5.2c-.6.1-1.9.1-3 1.3-.9.8-1.2 2.8-1.2 2.8S5 11.1 5 13.4v2.1c0 2.3.3 4.6.3 4.6s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.2 1.2C11.9 24.2 16 24.3 16 24.3s3.2 0 6.5-.3c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.3-2.3.3-4.6v-2.1c0-2.3-.3-4.6-.3-4.4zM13.5 19.1V12l8.1 3.6-8.1 3.5z"/></svg></div>
                  <div className="w-[18px] h-[18px] rounded-[4px] flex items-center justify-center bg-[#1877F2]"><svg width="10" height="10" viewBox="0 0 32 32" fill="white"><path d="M29 16C29 8.82 23.18 3 16 3S3 8.82 3 16c0 6.63 4.86 12.13 11.21 13.08V19.84h-3.37V16h3.37v-2.93c0-3.33 1.98-5.16 5.01-5.16 1.45 0 2.97.26 2.97.26v3.27h-1.67c-1.65 0-2.16 1.02-2.16 2.07V16h3.68l-.59 3.84h-3.09v9.24C24.14 28.13 29 22.63 29 16z"/></svg></div>
                  <div className="w-[18px] h-[18px] rounded-[4px] flex items-center justify-center bg-[#000]"><svg width="10" height="10" viewBox="0 0 32 32" fill="white"><path d="M17.75 14.77L25.3 6h-1.8l-6.57 7.63L11.62 6H6l7.93 11.55L6 26h1.8l6.93-8.05L20.38 26H26l-8.25-11.23zm-2.45 2.85l-.8-1.15-6.38-9.12h2.75l5.16 7.38.8 1.14 6.69 9.57h-2.75l-5.47-7.82z"/></svg></div>
                </div>
              </div>

              <div className="bg-white border border-[#f1f5f9] rounded-[10px] px-3 py-2.5 transition-[box-shadow,border-color,transform] duration-[220ms] hover:border-[#93c5fd] hover:-translate-y-0.5">
                <div className="text-[8.5px] font-extrabold uppercase tracking-[1px] text-[#94a3b8] mb-[7px]">SENTIMENT SPLIT</div>
                <div className="flex items-center gap-[5px] mb-[3px] text-[10px] font-semibold"><div className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#22c55e]" />Positive<span className="ml-auto text-[#64748b] text-[10px] font-bold">61%</span></div>
                <div className="flex items-center gap-[5px] mb-[3px] text-[10px] font-semibold"><div className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#94a3b8]" />Neutral<span className="ml-auto text-[#64748b] text-[10px] font-bold">27%</span></div>
                <div className="flex items-center gap-[5px] mb-[3px] text-[10px] font-semibold"><div className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#ef4444]" />Negative<span className="ml-auto text-[#64748b] text-[10px] font-bold">7%</span></div>
                <div className="flex items-center gap-[5px] mb-[3px] text-[10px] font-semibold"><div className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#f59e0b]" />Mixed<span className="ml-auto text-[#64748b] text-[10px] font-bold">6%</span></div>
              </div>
            </div>

            <div className="grid grid-cols-[1fr_175px] gap-2 mb-2">
              <div className="bg-white border border-[#f1f5f9] rounded-[10px] p-3 overflow-hidden transition-[box-shadow,border-color] duration-[220ms] hover:border-[#bfdbfe]">
                <div className="text-[11px] font-extrabold mb-[5px]">Sentiment River</div>
                <div className="flex gap-2.5 mb-2">
                  <div className="flex items-center gap-1 text-[9px] text-[#64748b]"><div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />Positive</div>
                  <div className="flex items-center gap-1 text-[9px] text-[#64748b]"><div className="w-1.5 h-1.5 rounded-full bg-[#94a3b8]" />Neutral</div>
                  <div className="flex items-center gap-1 text-[9px] text-[#64748b]"><div className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />Mixed</div>
                  <div className="flex items-center gap-1 text-[9px] text-[#64748b]"><div className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />Negative</div>
                </div>
                <div className="overflow-hidden rounded-md">
                  <canvas ref={canvasRef} height="90" className="w-full block" />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[8.5px] text-[#94a3b8]">06:00</span>
                  <span className="text-[8.5px] text-[#94a3b8]">09:00</span>
                  <span className="text-[8.5px] text-[#94a3b8]">12:00</span>
                  <span className="text-[8.5px] text-[#94a3b8]">15:00</span>
                  <span className="text-[8.5px] text-[#94a3b8]">18:00</span>
                </div>
              </div>

              <div className="bg-white border border-[#f1f5f9] rounded-[10px] p-3 transition-[box-shadow,border-color] duration-[220ms] hover:border-[#bfdbfe]">
                <div className="text-[11px] font-extrabold mb-2.5">Platform Activity</div>
                <div className="flex items-center gap-1.5 mb-[9px] last:mb-0 rounded-md px-1 transition-colors duration-200 hover:bg-[#f0f7ff]">
                  <div className="w-5 h-5 rounded-[5px] flex items-center justify-center shrink-0 bg-[#000]">
                    <svg width="11" height="11" viewBox="0 0 32 32" fill="white"><path d="M17.75 14.77L25.3 6h-1.8l-6.57 7.63L11.62 6H6l7.93 11.55L6 26h1.8l6.93-8.05L20.38 26H26l-8.25-11.23zm-2.45 2.85l-.8-1.15-6.38-9.12h2.75l5.16 7.38.8 1.14 6.69 9.57h-2.75l-5.47-7.82z"/></svg>
                  </div>
                  <div className="text-[10.5px] font-bold w-[52px] shrink-0">Twitter</div>
                  <div className="flex-1 h-1 bg-[#f1f5f9] rounded-sm overflow-hidden"><div className="h-full rounded-sm bg-[#0D47A1] transition-[width] duration-[1.2s] ease-[cubic-bezier(.4,0,.2,1)]" style={{ width: socialRevealed ? '96%' : '0%' }} /></div>
                  <div className="text-[10px] font-bold w-8 text-right">2473</div>
                  <div className="text-[9px] font-bold text-[#22c55e] w-7 text-right">+0.42</div>
                </div>
                <div className="flex items-center gap-1.5 mb-[9px] last:mb-0 rounded-md px-1 transition-colors duration-200 hover:bg-[#f0f7ff]">
                  <div className="w-5 h-5 rounded-[5px] flex items-center justify-center shrink-0 bg-[#1877F2]">
                    <svg width="11" height="11" viewBox="0 0 32 32" fill="white"><path d="M29 16C29 8.82 23.18 3 16 3S3 8.82 3 16c0 6.63 4.86 12.13 11.21 13.08V19.84h-3.37V16h3.37v-2.93c0-3.33 1.98-5.16 5.01-5.16 1.45 0 2.97.26 2.97.26v3.27h-1.67c-1.65 0-2.16 1.02-2.16 2.07V16h3.68l-.59 3.84h-3.09v9.24C24.14 28.13 29 22.63 29 16z"/></svg>
                  </div>
                  <div className="text-[10.5px] font-bold w-[52px] shrink-0">Facebook</div>
                  <div className="flex-1 h-1 bg-[#f1f5f9] rounded-sm overflow-hidden"><div className="h-full rounded-sm bg-[#1877F2] transition-[width] duration-[1.2s] ease-[cubic-bezier(.4,0,.2,1)]" style={{ width: socialRevealed ? '15%' : '0%' }} /></div>
                  <div className="text-[10px] font-bold w-8 text-right">392</div>
                  <div className="text-[9px] font-bold text-[#22c55e] w-7 text-right">+0.73</div>
                </div>
                <div className="flex items-center gap-1.5 mb-[9px] last:mb-0 rounded-md px-1 transition-colors duration-200 hover:bg-[#f0f7ff]">
                  <div className="w-5 h-5 rounded-[5px] flex items-center justify-center shrink-0 bg-[#ff0000]">
                    <svg width="11" height="11" viewBox="0 0 32 32" fill="white"><path d="M26.7 8.8s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C19.2 4.5 16 4.5 16 4.5s-3.2 0-6.5.2c-.6.1-1.9.1-3 1.3-.9.8-1.2 2.8-1.2 2.8S5 11.1 5 13.4v2.1c0 2.3.3 4.6.3 4.6s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.2 1.2C11.9 24.2 16 24.3 16 24.3s3.2 0 6.5-.3c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.3-2.3.3-4.6v-2.1c0-2.3-.3-4.6-.3-4.4zM13.5 19.1V12l8.1 3.6-8.1 3.5z"/></svg>
                  </div>
                  <div className="text-[10.5px] font-bold w-[52px] shrink-0">Youtube</div>
                  <div className="flex-1 h-1 bg-[#f1f5f9] rounded-sm overflow-hidden"><div className="h-full rounded-sm bg-[#ff0000] transition-[width] duration-[1.2s] ease-[cubic-bezier(.4,0,.2,1)]" style={{ width: socialRevealed ? '2%' : '0%' }} /></div>
                  <div className="text-[10px] font-bold w-8 text-right">52</div>
                  <div className="text-[9px] font-bold text-[#22c55e] w-7 text-right">+0.23</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white border border-[#f1f5f9] rounded-[10px] p-[11px]">
                <div className="text-[11px] font-extrabold mb-2">Trending Topics</div>
                <div className="flex gap-[5px] py-1 border-b border-[#f8fafc] last:border-b-0 items-start rounded-md pl-1 transition-colors duration-200 hover:bg-[#f0f7ff]">
                  <div className="text-[10px] text-[#94a3b8] font-bold w-3 shrink-0 pt-px">1</div>
                  <div className="text-[9.5px] text-[#374151] flex-1 leading-[1.4]">krongage_beta OR server00m1234 OR #GhanaTech OR #krognage121 OR #kronGee</div>
                  <div className="text-[10px] font-bold text-[#64748b] shrink-0 ml-1">1371</div>
                </div>
                <div className="flex gap-[5px] py-1 border-b border-[#f8fafc] last:border-b-0 items-start rounded-md pl-1 transition-colors duration-200 hover:bg-[#f0f7ff]">
                  <div className="text-[10px] text-[#94a3b8] font-bold w-3 shrink-0 pt-px">2</div>
                  <div className="text-[9.5px] text-[#374151] flex-1 leading-[1.4]">krongage_beta OR #GhanaTech OR #OpenSource OR #krognage121</div>
                  <div className="text-[10px] font-bold text-[#64748b] shrink-0 ml-1">795</div>
                </div>
                <div className="flex gap-[5px] py-1 border-b border-[#f8fafc] last:border-b-0 items-start rounded-md pl-1 transition-colors duration-200 hover:bg-[#f0f7ff]">
                  <div className="text-[10px] text-[#94a3b8] font-bold w-3 shrink-0 pt-px">3</div>
                  <div className="text-[9.5px] text-[#374151] flex-1 leading-[1.4]">krontiva_test OR krongage_beta OR server00m1234 OR #opensource</div>
                  <div className="text-[10px] font-bold text-[#64748b] shrink-0 ml-1">296</div>
                </div>
                <div className="flex gap-[5px] py-1 border-b border-[#f8fafc] last:border-b-0 items-start rounded-md pl-1 transition-colors duration-200 hover:bg-[#f0f7ff]">
                  <div className="text-[10px] text-[#94a3b8] font-bold w-3 shrink-0 pt-px">4</div>
                  <div className="text-[9.5px] text-[#374151] flex-1 leading-[1.4]">server room</div>
                  <div className="text-[10px] font-bold text-[#64748b] shrink-0 ml-1">74</div>
                </div>
              </div>

              <div className="bg-white border border-[#f1f5f9] rounded-[10px] p-[11px]">
                <div className="text-[11px] font-extrabold mb-2">Top Voices</div>
                <div className="flex items-center gap-[7px] py-[5px] border-b border-[#f8fafc] last:border-b-0 rounded-md pl-1 transition-colors duration-200 hover:bg-[#f0f7ff]">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-extrabold text-white shrink-0 bg-[#1877F2]">D</div>
                  <div><div className="text-[10.5px] font-bold">@Delika</div><div className="text-[9px] text-[#0D47A1] font-bold">148 mentions</div></div>
                  <div className="w-4 h-4 rounded-[4px] flex items-center justify-center ml-auto shrink-0 bg-[#1877F2]"><svg width="9" height="9" viewBox="0 0 32 32" fill="white"><path d="M29 16C29 8.82 23.18 3 16 3S3 8.82 3 16c0 6.63 4.86 12.13 11.21 13.08V19.84h-3.37V16h3.37v-2.93c0-3.33 1.98-5.16 5.01-5.16 1.45 0 2.97.26 2.97.26v3.27h-1.67c-1.65 0-2.16 1.02-2.16 2.07V16h3.68l-.59 3.84h-3.09v9.24C24.14 28.13 29 22.63 29 16z"/></svg></div>
                </div>
                <div className="flex items-center gap-[7px] py-[5px] border-b border-[#f8fafc] last:border-b-0 rounded-md pl-1 transition-colors duration-200 hover:bg-[#f0f7ff]">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-extrabold text-white shrink-0 bg-[#ff0000]">T</div>
                  <div><div className="text-[10.5px] font-bold">@Terminal Archives</div><div className="text-[9px] text-[#0D47A1] font-bold">4 mentions</div></div>
                  <div className="w-4 h-4 rounded-[4px] flex items-center justify-center ml-auto shrink-0 bg-[#ff0000]"><svg width="9" height="9" viewBox="0 0 32 32" fill="white"><path d="M26.7 8.8s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C19.2 4.5 16 4.5 16 4.5s-3.2 0-6.5.2c-.6.1-1.9.1-3 1.3-.9.8-1.2 2.8-1.2 2.8S5 11.1 5 13.4v2.1c0 2.3.3 4.6.3 4.6s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.2 1.2C11.9 24.2 16 24.3 16 24.3s3.2 0 6.5-.3c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.3-2.3.3-4.6v-2.1c0-2.3-.3-4.6-.3-4.4zM13.5 19.1V12l8.1 3.6-8.1 3.5z"/></svg></div>
                </div>
                <div className="flex items-center gap-[7px] py-[5px] border-b border-[#f8fafc] last:border-b-0 rounded-md pl-1 transition-colors duration-200 hover:bg-[#f0f7ff]">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-extrabold text-white shrink-0 bg-[#ff0000]">W</div>
                  <div><div className="text-[10.5px] font-bold">@Wolf Software Systems</div><div className="text-[9px] text-[#0D47A1] font-bold">4 mentions</div></div>
                  <div className="w-4 h-4 rounded-[4px] flex items-center justify-center ml-auto shrink-0 bg-[#ff0000]"><svg width="9" height="9" viewBox="0 0 32 32" fill="white"><path d="M26.7 8.8s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C19.2 4.5 16 4.5 16 4.5s-3.2 0-6.5.2c-.6.1-1.9.1-3 1.3-.9.8-1.2 2.8-1.2 2.8S5 11.1 5 13.4v2.1c0 2.3.3 4.6.3 4.6s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.2 1.2C11.9 24.2 16 24.3 16 24.3s3.2 0 6.5-.3c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.3-2.3.3-4.6v-2.1c0-2.3-.3-4.6-.3-4.4zM13.5 19.1V12l8.1 3.6-8.1 3.5z"/></svg></div>
                </div>
                <div className="flex items-center gap-[7px] py-[5px] border-b border-[#f8fafc] last:border-b-0 rounded-md pl-1 transition-colors duration-200 hover:bg-[#f0f7ff]">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-extrabold text-white shrink-0 bg-[#7c3aed]">C</div>
                  <div><div className="text-[10.5px] font-bold">@Cinematic Rebuild</div><div className="text-[9px] text-[#0D47A1] font-bold">4 mentions</div></div>
                  <div className="w-4 h-4 rounded-[4px] flex items-center justify-center ml-auto shrink-0 bg-[#ff0000]"><svg width="9" height="9" viewBox="0 0 32 32" fill="white"><path d="M26.7 8.8s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C19.2 4.5 16 4.5 16 4.5s-3.2 0-6.5.2c-.6.1-1.9.1-3 1.3-.9.8-1.2 2.8-1.2 2.8S5 11.1 5 13.4v2.1c0 2.3.3 4.6.3 4.6s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.2 1.2C11.9 24.2 16 24.3 16 24.3s3.2 0 6.5-.3c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.3-2.3.3-4.6v-2.1c0-2.3-.3-4.6-.3-4.4zM13.5 19.1V12l8.1 3.6-8.1 3.5z"/></svg></div>
                </div>
              </div>
            </div>

          </div>{/* /view-social */}

          {/* ══ VIEW: INBOX ══ */}
          <div className={`${kdViewBase} ${activeView === 'inbox' ? kdViewActive : kdViewInactive}`}>
            <div className="flex h-full overflow-hidden">
              <div className="w-[230px] shrink-0 border-r border-[#f1f5f9] flex flex-col overflow-hidden">
                <div className="px-3 pt-2.5 text-[13px] font-extrabold flex items-center gap-2">Conversations <span className="text-[10px] font-medium text-[#94a3b8]">Open</span></div>
                <div className="flex px-2 pt-1.5 border-b border-[#f1f5f9] overflow-x-auto">
                  <div className="text-[10px] font-semibold text-[#64748b] px-2 py-1 cursor-pointer border-b-2 border-transparent whitespace-nowrap shrink-0 text-[#0D47A1] border-b-[#0D47A1]">Mine</div>
                  <div className="text-[10px] font-semibold text-[#64748b] px-2 py-1 cursor-pointer border-b-2 border-transparent whitespace-nowrap shrink-0">Unassigned</div>
                  <div className="text-[10px] font-semibold text-[#64748b] px-2 py-1 cursor-pointer border-b-2 border-transparent whitespace-nowrap shrink-0">Resolved</div>
                  <div className="text-[10px] font-semibold text-[#64748b] px-2 py-1 cursor-pointer border-b-2 border-transparent whitespace-nowrap shrink-0">Pending</div>
                  <div className="text-[10px] font-semibold text-[#64748b] px-2 py-1 cursor-pointer border-b-2 border-transparent whitespace-nowrap shrink-0">All</div>
                </div>
                <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar-thumb]:bg-[#e2e8f0]">
                  <div className="flex gap-2 px-2.5 py-[9px] border-b border-[#f8fafc] cursor-pointer transition-colors duration-150 hover:bg-[#f8fafc]">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-extrabold text-white shrink-0 mt-px bg-[#059669]">DL</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[9px] text-[#64748b] mb-px flex items-center gap-[3px]"><Circle size={7} weight="fill" color="#22c55e" />Krongage whatsapp</div>
                      <div className="flex justify-between items-baseline gap-1"><span className="text-[11px] font-bold text-[#0f172a]">Dibe Laba</span><span className="text-[9px] text-[#94a3b8] shrink-0">11d · 9d</span></div>
                      <div className="text-[10px] text-[#64748b] whitespace-nowrap overflow-hidden text-ellipsis mt-px">↩ oh sorry i didnt see this early</div>
                      <div className="text-[9px] font-bold text-[#ef4444] mt-0.5 flex items-center gap-[3px]"><Circle size={7} weight="fill" color="#ef4444" />11d 3h</div>
                    </div>
                  </div>
                  <div className="flex gap-2 px-2.5 py-[9px] border-b border-[#f8fafc] cursor-pointer transition-colors duration-150 hover:bg-[#f8fafc]">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-extrabold text-white shrink-0 mt-px bg-[#f59e0b]">D</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[9px] text-[#64748b] mb-px flex items-center gap-[3px]"><Globe size={9} weight="duotone" />krongage web</div>
                      <div className="flex justify-between items-baseline gap-1"><span className="text-[11px] font-bold text-[#0f172a]">Dry-Paper-223</span><span className="text-[9px] text-[#94a3b8] shrink-0">11d · 11d</span></div>
                      <div className="text-[10px] text-[#64748b] whitespace-nowrap overflow-hidden text-ellipsis mt-px">↩ Got it — I&apos;ve handed your request over to our hu…</div>
                    </div>
                  </div>
                  <div className="flex gap-2 px-2.5 py-[9px] border-b border-[#f8fafc] cursor-pointer transition-colors duration-150 hover:bg-[#f8fafc]">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-extrabold text-white shrink-0 mt-px bg-[#7c3aed]">RR</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[9px] text-[#64748b] mb-px flex items-center gap-[3px]"><FacebookLogo size={9} weight="duotone" />Delika Facebook</div>
                      <div className="flex justify-between items-baseline gap-1"><span className="text-[11px] font-bold text-[#0f172a]">Ronald Reigns</span><span className="text-[9px] text-[#94a3b8] shrink-0">2mo · 20d</span></div>
                      <div className="text-[10px] text-[#64748b] whitespace-nowrap overflow-hidden text-ellipsis mt-px">I&apos;m good</div>
                      <div className="inline-block text-[8px] font-bold px-[5px] py-px rounded-[3px] bg-[#fee2e2] text-[#dc2626] mt-0.5">support-case</div>
                    </div>
                  </div>
                  <div className="flex gap-2 px-2.5 py-[9px] border-b border-[#f8fafc] cursor-pointer transition-colors duration-150 hover:bg-[#f8fafc]">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-extrabold text-white shrink-0 mt-px bg-[#0D47A1]">D</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[9px] text-[#64748b] mb-px flex items-center gap-[3px]"><Globe size={9} weight="duotone" />krongage web</div>
                      <div className="flex justify-between items-baseline gap-1"><span className="text-[11px] font-bold text-[#0f172a]">Divine-Bird-176</span><span className="text-[9px] text-[#94a3b8] shrink-0">2mo · 2mo</span></div>
                      <div className="text-[10px] text-[#64748b] whitespace-nowrap overflow-hidden text-ellipsis mt-px">↩ Test message from KronGage</div>
                    </div>
                  </div>
                  <div className="flex gap-2 px-2.5 py-[9px] border-b border-[#f8fafc] cursor-pointer transition-colors duration-150 hover:bg-[#f8fafc]">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-extrabold text-white shrink-0 mt-px bg-[#64748b]">N</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[9px] text-[#64748b] mb-px flex items-center gap-[3px]"><Circle size={7} weight="fill" color="#22c55e" />Krongage whatsapp</div>
                      <div className="flex justify-between items-baseline gap-1"><span className="text-[11px] font-bold text-[#0f172a]">NY</span><span className="text-[9px] text-[#94a3b8] shrink-0">2mo · 2mo</span></div>
                      <div className="text-[10px] text-[#64748b] whitespace-nowrap overflow-hidden text-ellipsis mt-px">↩ hi</div>
                      <div className="text-[9px] font-bold text-[#ef4444] mt-0.5 flex items-center gap-[3px]"><Circle size={7} weight="fill" color="#ef4444" />4d 2h</div>
                    </div>
                  </div>
                  <div className="flex gap-2 px-2.5 py-[9px] border-b border-[#f8fafc] cursor-pointer transition-colors duration-150 hover:bg-[#f8fafc]">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-extrabold text-white shrink-0 mt-px bg-[#10b981]">C</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[9px] text-[#64748b] mb-px flex items-center gap-[3px]"><Globe size={9} weight="duotone" />krongage web</div>
                      <div className="flex justify-between items-baseline gap-1"><span className="text-[11px] font-bold text-[#0f172a]">Cold-Forest-180</span><span className="text-[9px] text-[#94a3b8] shrink-0">2mo · 2mo</span></div>
                      <div className="text-[10px] text-[#64748b] whitespace-nowrap overflow-hidden text-ellipsis mt-px">yes sit</div>
                    </div>
                  </div>
                  <div className="flex gap-2 px-2.5 py-[9px] border-b border-[#f8fafc] cursor-pointer transition-colors duration-150 hover:bg-[#f8fafc]">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-extrabold text-white shrink-0 mt-px bg-[#e11d48]">F</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[9px] text-[#64748b] mb-px flex items-center gap-[3px]"><Globe size={9} weight="duotone" />krongage web</div>
                      <div className="flex justify-between items-baseline gap-1"><span className="text-[11px] font-bold text-[#0f172a]">Floral-Cloud-18</span><span className="text-[9px] text-[#94a3b8] shrink-0">2mo · 2mo</span></div>
                      <div className="text-[10px] text-[#64748b] whitespace-nowrap overflow-hidden text-ellipsis mt-px">Get notified by email</div>
                    </div>
                  </div>
                  <div className="flex gap-2 px-2.5 py-[9px] border-b border-[#f8fafc] cursor-pointer transition-colors duration-150 hover:bg-[#f8fafc]">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-extrabold text-white shrink-0 mt-px bg-[#6366f1]">D</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[9px] text-[#64748b] mb-px flex items-center gap-[3px]"><Globe size={9} weight="duotone" />krongage web</div>
                      <div className="flex justify-between items-baseline gap-1"><span className="text-[11px] font-bold text-[#0f172a]">Divine-Violet-566</span><span className="text-[9px] text-[#94a3b8] shrink-0">2mo · 2mo</span></div>
                      <div className="text-[10px] text-[#64748b] whitespace-nowrap overflow-hidden text-ellipsis mt-px">Get notified by email</div>
                    </div>
                  </div>
                  <div className="flex gap-2 px-2.5 py-[9px] border-b border-[#f8fafc] cursor-pointer transition-colors duration-150 hover:bg-[#f8fafc]">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-extrabold text-white shrink-0 mt-px bg-[#0891b2]">W</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[9px] text-[#64748b] mb-px flex items-center gap-[3px]"><Globe size={9} weight="duotone" />krongage web</div>
                      <div className="flex justify-between items-baseline gap-1"><span className="text-[11px] font-bold text-[#0f172a]">White-Darkness-922</span><span className="text-[9px] text-[#94a3b8] shrink-0">2mo · 2mo</span></div>
                      <div className="text-[10px] text-[#64748b] whitespace-nowrap overflow-hidden text-ellipsis mt-px">Get notified by email</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center gap-2.5 p-6">
                <svg width="72" height="60" viewBox="0 0 72 60" fill="none"><ellipse cx="36" cy="30" rx="30" ry="24" fill="#EEF5FD"/><circle cx="36" cy="28" r="10" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5"/><circle cx="36" cy="28" r="4" fill="#3b82f6" opacity=".5"/><circle cx="44" cy="36" r="2" fill="#93c5fd"/><circle cx="50" cy="30" r="1.5" fill="#bfdbfe"/></svg>
                <p className="text-[13px] font-semibold text-[#374151] text-center">Please select a conversation<br/>from left pane</p>
                <div className="text-[11px] text-[#94a3b8] flex items-center gap-1.5"><span className="bg-[#f1f5f9] rounded-[4px] px-[5px] py-px text-[10px] text-[#374151] font-mono border border-[#e2e8f0]">⌘</span><span className="bg-[#f1f5f9] rounded-[4px] px-[5px] py-px text-[10px] text-[#374151] font-mono border border-[#e2e8f0]">K</span><span className="text-[11px] text-[#94a3b8]">to open command menu</span></div>
                <div className="text-[11px] text-[#94a3b8] flex items-center gap-1.5"><span className="bg-[#f1f5f9] rounded-[4px] px-[5px] py-px text-[10px] text-[#374151] font-mono border border-[#e2e8f0]">⌘</span><span className="bg-[#f1f5f9] rounded-[4px] px-[5px] py-px text-[10px] text-[#374151] font-mono border border-[#e2e8f0]">/</span><span className="text-[11px] text-[#94a3b8]">to view keyboard shortcuts</span></div>
              </div>
            </div>
          </div>{/* /view-inbox */}

          {/* ══ VIEW: SOCIAL PUBLISHING ══ */}
          <div className={`${kdViewBase} ${activeView === 'social-pub' ? kdViewActive : kdViewInactive}`}>
            <div className="flex h-full overflow-hidden">
              <div className="w-[130px] shrink-0 border-r border-[#f1f5f9] py-2 overflow-y-auto">
                <div className="flex items-center gap-[7px] px-3 py-[7px] text-[10.5px] font-semibold text-[#475569] cursor-pointer hover:bg-[#f8fafc] text-[#0D47A1]">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>Analytics
                </div>
                <div className="flex items-center gap-[7px] px-3 py-[7px] text-[10.5px] font-semibold text-[#475569] cursor-pointer hover:bg-[#f8fafc]">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>Calendar
                </div>
                <div className="flex items-center gap-[7px] px-3 py-[7px] text-[10.5px] font-semibold text-[#475569] cursor-pointer hover:bg-[#f8fafc]">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>Channels
                </div>
                <div className="flex items-center gap-[7px] px-3 py-[7px] text-[10.5px] font-semibold text-[#475569] cursor-pointer hover:bg-[#f8fafc]">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>Media
                </div>
                <div className="flex items-center gap-[7px] px-3 py-[7px] text-[10.5px] font-semibold text-[#475569] cursor-pointer hover:bg-[#f8fafc]">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>Settings
                </div>
              </div>
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="px-3.5 py-2 text-[15px] font-extrabold border-b border-[#f1f5f9] flex items-center justify-between">
                  <span>Launches</span>
                  <button className="bg-[#0D47A1] text-white border-none rounded-md px-2.5 py-[5px] text-[10px] font-bold cursor-pointer">+ Create Post</button>
                </div>
                <div className="bg-[#fef2f2] border border-[#fecaca] rounded-md px-2.5 py-1.5 text-[10px] text-[#dc2626] flex items-center gap-1.5 mx-3 mt-2 shrink-0"><Warning size={12} weight="duotone" />1 channel needs attention</div>
                <div className="text-[#374151] text-[10px] mt-[3px] pl-4 pr-2.5">kofi_amoah <span className="ml-auto text-[9px] text-[#94a3b8] float-right">Token expired <span className="bg-white border border-[#e2e8f0] rounded-[4px] px-1.5 py-0.5 text-[#374151] font-bold ml-1">Reconnect</span></span></div>
                <div className="flex items-center gap-1.5 px-3 py-2 border-b border-[#f1f5f9] shrink-0">
                  <span className="w-[22px] h-[22px] border border-[#e2e8f0] rounded-[5px] bg-white flex items-center justify-center cursor-pointer text-[11px] text-[#374151]">‹</span>
                  <span className="text-[11px] font-semibold text-[#0f172a]">05/11/2026 – 05/17/2026</span>
                  <span className="w-[22px] h-[22px] border border-[#e2e8f0] rounded-[5px] bg-white flex items-center justify-center cursor-pointer text-[11px] text-[#374151]">›</span>
                  <span className="text-[10px] font-semibold border border-[#e2e8f0] rounded-[5px] px-2 py-0.5 bg-white cursor-pointer text-[#374151]">Today</span>
                  <div className="flex gap-0.5 ml-auto">
                    <span className="px-2 py-[3px] text-[10px] font-semibold text-[#64748b] border border-[#e2e8f0] bg-white rounded-[4px] cursor-pointer">Day</span>
                    <span className="px-2 py-[3px] text-[10px] font-semibold border rounded-[4px] cursor-pointer bg-[#0D47A1] text-white border-[#0D47A1]">Week</span>
                    <span className="px-2 py-[3px] text-[10px] font-semibold text-[#64748b] border border-[#e2e8f0] bg-white rounded-[4px] cursor-pointer">Month</span>
                  </div>
                </div>
                <div className="flex flex-1 overflow-hidden">
                  <div className="w-[150px] shrink-0 border-r border-[#f1f5f9] flex flex-col overflow-hidden">
                    <div className="flex items-center justify-between px-2.5 py-2 border-b border-[#f1f5f9]">
                      <span className="text-[11px] font-extrabold">Channels</span>
                      <span className="text-[13px] text-[#94a3b8] cursor-pointer">‹</span>
                    </div>
                    <div className="bg-white border border-[#e2e8f0] rounded-md px-2.5 py-[5px] text-[10px] font-bold cursor-pointer text-[#374151] mx-2 mt-2 mb-1.5 text-center">Add Channel</div>
                    <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar-thumb]:bg-[#e2e8f0]">
                      <div className="flex items-center gap-[7px] px-2.5 py-1.5 cursor-pointer hover:bg-[#f8fafc]"><div className="w-[22px] h-[22px] rounded-full shrink-0 flex items-center justify-center text-[8px] font-extrabold text-white bg-[#e1306c]">D</div><span className="text-[10px] font-semibold text-[#374151] flex-1 whitespace-nowrap overflow-hidden text-ellipsis">Delika</span><span className="text-xs text-[#94a3b8]">⋮</span></div>
                      <div className="flex items-center gap-[7px] px-2.5 py-1.5 cursor-pointer hover:bg-[#f8fafc]"><div className="w-[22px] h-[22px] rounded-full shrink-0 flex items-center justify-center text-[8px] font-extrabold bg-[#e2e8f0] text-[#374151]">S</div><span className="text-[10px] font-semibold text-[#374151] flex-1 whitespace-nowrap overflow-hidden text-ellipsis">Server Room</span><span className="text-xs text-[#94a3b8]">⋮</span></div>
                      <div className="flex items-center gap-[7px] px-2.5 py-1.5 cursor-pointer hover:bg-[#f8fafc]"><div className="w-[22px] h-[22px] rounded-full shrink-0 flex items-center justify-center text-[8px] font-extrabold text-white bg-[#0077b5]">S</div><span className="text-[10px] font-semibold text-[#374151] flex-1 whitespace-nowrap overflow-hidden text-ellipsis">Server Room</span><span className="text-xs text-[#94a3b8]">⋮</span></div>
                      <div className="flex items-center gap-[7px] px-2.5 py-1.5 cursor-pointer hover:bg-[#f8fafc]"><div className="w-[22px] h-[22px] rounded-full shrink-0 flex items-center justify-center text-[8px] font-extrabold text-white bg-[#0077b5]">K</div><span className="text-[10px] font-semibold text-[#374151] flex-1 whitespace-nowrap overflow-hidden text-ellipsis">Kofi Amoah</span><span className="text-xs text-[#94a3b8]">⋮</span></div>
                      <div className="flex items-center gap-[7px] px-2.5 py-1.5 cursor-pointer hover:bg-[#f8fafc]"><div className="w-[22px] h-[22px] rounded-full shrink-0 flex items-center justify-center text-[8px] font-extrabold text-white bg-[#0077b5]">N</div><span className="text-[10px] font-semibold text-[#374151] flex-1 whitespace-nowrap overflow-hidden text-ellipsis">Nana Yaw Darko</span><span className="text-xs text-[#94a3b8]">⋮</span></div>
                      <div className="flex items-center gap-[7px] px-2.5 py-1.5 cursor-pointer hover:bg-[#f8fafc]"><div className="w-[22px] h-[22px] rounded-full shrink-0 flex items-center justify-center text-[8px] font-extrabold text-white bg-[#0077b5]">E</div><span className="text-[10px] font-semibold text-[#374151] flex-1 whitespace-nowrap overflow-hidden text-ellipsis">Emmanuel Asante</span><span className="text-xs text-[#94a3b8]">⋮</span></div>
                      <div className="flex items-center gap-[7px] px-2.5 py-1.5 cursor-pointer hover:bg-[#f8fafc]"><div className="w-[22px] h-[22px] rounded-full shrink-0 flex items-center justify-center text-[8px] font-extrabold text-white bg-[#0077b5]">S</div><span className="text-[10px] font-semibold text-[#374151] flex-1 whitespace-nowrap overflow-hidden text-ellipsis">Samuel Kweku A. Mensah…</span><span className="text-xs text-[#94a3b8]">⋮</span></div>
                      <div className="flex items-center gap-[7px] px-2.5 py-1.5 cursor-pointer hover:bg-[#f8fafc]"><div className="w-[22px] h-[22px] rounded-full shrink-0 flex items-center justify-center text-[8px] font-extrabold text-white bg-[#0077b5]">A</div><span className="text-[10px] font-semibold text-[#374151] flex-1 whitespace-nowrap overflow-hidden text-ellipsis">Akua Boateng</span><span className="text-xs text-[#94a3b8]">⋮</span></div>
                      <div className="flex items-center gap-[7px] px-2.5 py-1.5 cursor-pointer hover:bg-[#f8fafc]"><div className="w-[22px] h-[22px] rounded-full shrink-0 flex items-center justify-center text-[8px] font-extrabold bg-[#e2e8f0] text-[#374151]">A</div><span className="text-[10px] font-semibold text-[#374151] flex-1 whitespace-nowrap overflow-hidden text-ellipsis">Akosua Enyonam Ble…</span><span className="text-xs text-[#94a3b8]">⋮</span></div>
                      <div className="flex items-center gap-[7px] px-2.5 py-1.5 cursor-pointer hover:bg-[#f8fafc]"><div className="w-[22px] h-[22px] rounded-full shrink-0 flex items-center justify-center text-[8px] font-extrabold text-white bg-[#e60023]">k</div><span className="text-[10px] font-semibold text-[#374151] flex-1 whitespace-nowrap overflow-hidden text-ellipsis">kofi_amoah</span><span className="text-xs text-[#94a3b8]">⋮</span></div>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="grid grid-cols-[36px_repeat(7,1fr)] border-b border-[#f1f5f9] shrink-0">
                      <div></div>
                      <div className="text-center px-0.5 py-[5px] border-l border-[#f1f5f9]"><div className="text-[9px] text-[#94a3b8] font-semibold">Monday</div><div className="text-xs font-bold text-[#0f172a]">05/11/2026</div></div>
                      <div className="text-center px-0.5 py-[5px] border-l border-[#f1f5f9]"><div className="text-[9px] text-[#94a3b8] font-semibold">Tuesday</div><div className="text-xs font-bold text-[#0f172a]">05/12/2026</div></div>
                      <div className="text-center px-0.5 py-[5px] border-l border-[#f1f5f9]"><div className="text-[9px] text-[#94a3b8] font-semibold">Wednesday</div><div className="text-xs font-bold text-[#0f172a]">05/13/2026</div></div>
                      <div className="text-center px-0.5 py-[5px] border-l border-[#f1f5f9]"><div className="text-[9px] text-[#94a3b8] font-semibold">Thursday</div><div className="text-xs font-bold text-[#0f172a]">05/14/2026</div></div>
                      <div className="text-center px-0.5 py-[5px] border-l border-[#f1f5f9]"><div className="text-[9px] text-[#94a3b8] font-semibold">Friday</div><div className="text-xs font-bold text-[#0D47A1]">• 05/15/2026</div></div>
                      <div className="text-center px-0.5 py-[5px] border-l border-[#f1f5f9]"><div className="text-[9px] text-[#94a3b8] font-semibold">Saturday</div><div className="text-xs font-bold text-[#0f172a]">05/16/2026</div></div>
                      <div className="text-center px-0.5 py-[5px] border-l border-[#f1f5f9]"><div className="text-[9px] text-[#94a3b8] font-semibold">Sunday</div><div className="text-xs font-bold text-[#0f172a]">05/17/2026</div></div>
                    </div>
                    <div className="flex-1 overflow-y-auto grid grid-cols-[36px_repeat(7,1fr)] [&::-webkit-scrollbar]:w-[3px]">
                      <div className="flex flex-col">
                        {HOURS.map(h => <div key={h} className="h-[30px] text-[8px] text-[#94a3b8] px-1 py-0.5 border-b border-[#f8fafc] text-right leading-none flex items-start justify-end">{h}</div>)}
                      </div>
                      {[0, 1, 2, 3, 4, 5, 6].map(day => (
                        <div key={day} className={`border-l border-[#f1f5f9] ${day === 4 ? 'bg-[#fafcff]' : ''}`}>
                          {Array.from({ length: 24 }).map((_, i) => <div key={i} className="h-[30px] border-b border-[#f8fafc]" />)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>{/* /view-social-pub */}

          {/* ══ VIEW: CAMPAIGNS ══ */}
          <div className={`${kdViewBase} ${activeView === 'campaigns' ? kdViewActive : kdViewInactive}`}>
            <div className="flex h-full overflow-hidden">
              <div className="w-[155px] shrink-0 border-r border-[#f1f5f9] py-2 overflow-y-auto">
                <div className="flex items-center gap-[7px] px-3 py-1.5 text-[10.5px] font-semibold text-[#475569] cursor-pointer hover:bg-[#f8fafc]">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>Reporting
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-auto"><polyline points="9 18 15 12 9 6"/></svg>
                </div>
                <div className="text-[10px] font-bold text-[#374151] px-3 pt-[7px] pb-1 flex items-center justify-between cursor-pointer">
                  <span className="flex items-center gap-1.5">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91"/></svg>Messaging
                  </span>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
                <div className="flex items-center gap-[7px] pt-1.5 pb-1.5 pr-3 pl-5 text-[10.5px] font-semibold cursor-pointer hover:bg-[#f8fafc] hover:text-[#0D47A1] text-[#0D47A1] font-bold">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>Journeys
                </div>
                <div className="flex items-center gap-[7px] pt-1.5 pb-1.5 pr-3 pl-5 text-[10.5px] font-semibold text-[#475569] cursor-pointer hover:bg-[#f8fafc] hover:text-[#0D47A1]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/></svg>Message Templates
                </div>
                <div className="flex items-center gap-[7px] pt-1.5 pb-1.5 pr-3 pl-5 text-[10.5px] font-semibold text-[#475569] cursor-pointer hover:bg-[#f8fafc] hover:text-[#0D47A1]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 17H2a3 3 0 000 6h20a3 3 0 000-6z"/><path d="M5 17V5a2 2 0 012-2h10a2 2 0 012 2v12"/></svg>Broadcasts
                </div>
                <div className="flex items-center gap-[7px] px-3 py-1.5 text-[10.5px] font-semibold text-[#475569] cursor-pointer hover:bg-[#f8fafc] mt-1">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>Audience
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-auto"><polyline points="9 18 15 12 9 6"/></svg>
                </div>
                <div className="flex items-center gap-[7px] px-3 py-1.5 text-[10.5px] font-semibold text-[#475569] cursor-pointer hover:bg-[#f8fafc]">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>Settings
                </div>
              </div>
              <div className="flex-1 px-[18px] py-3.5 overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-base font-extrabold text-[#0f172a]">Journeys</span>
                  <button className="bg-[#0D47A1] text-white border-none rounded-md px-3.5 py-[7px] text-[11px] font-bold cursor-pointer">+ New Journey</button>
                </div>
                <div className="grid grid-cols-[1fr_180px_220px_36px] border-b border-[#f1f5f9]">
                  <div className="text-[10px] font-bold text-[#64748b] text-left px-3 py-2 flex items-center gap-1">Name <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></div>
                  <div className="text-[10px] font-bold text-[#64748b] text-left px-3 py-2 flex items-center gap-1">Status <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></div>
                  <div className="text-[10px] font-bold text-[#64748b] text-left px-3 py-2 flex items-center gap-1">Created At <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></div>
                  <div className="text-[10px] font-bold text-[#64748b] text-left px-3 py-2 flex items-center gap-1"></div>
                </div>
                <div className="group grid grid-cols-[1fr_180px_220px_36px] border-b border-[#f8fafc] cursor-pointer transition-colors duration-150">
                  <div className="px-3 py-3 text-[11px] text-[#374151] flex items-center group-hover:bg-[#f8fafc]"><span className="font-semibold text-[#0f172a] flex items-center gap-[5px]">Test <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#94a3b8]"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></span></div>
                  <div className="px-3 py-3 text-[11px] text-[#374151] flex items-center group-hover:bg-[#f8fafc]"><span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-[10px] bg-[#f1f5f9] text-[#64748b]">Not Started</span></div>
                  <div className="px-3 py-3 text-[11px] text-[#374151] flex items-center group-hover:bg-[#f8fafc] text-[#64748b]">about 1 month ago</div>
                  <div className="px-3 py-3 text-[11px] text-[#374151] flex items-center group-hover:bg-[#f8fafc]"><span className="text-base text-[#94a3b8] cursor-pointer">⋮</span></div>
                </div>
                <div className="group grid grid-cols-[1fr_180px_220px_36px] border-b border-[#f8fafc] cursor-pointer transition-colors duration-150">
                  <div className="px-3 py-3 text-[11px] text-[#374151] flex items-center group-hover:bg-[#f8fafc]"><span className="font-semibold text-[#0f172a] flex items-center gap-[5px]">sms test <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#94a3b8]"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></span></div>
                  <div className="px-3 py-3 text-[11px] text-[#374151] flex items-center group-hover:bg-[#f8fafc]"><span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-[10px] bg-[#dcfce7] text-[#16a34a]">● Running</span></div>
                  <div className="px-3 py-3 text-[11px] text-[#374151] flex items-center group-hover:bg-[#f8fafc] text-[#64748b]">22 days ago</div>
                  <div className="px-3 py-3 text-[11px] text-[#374151] flex items-center group-hover:bg-[#f8fafc]"><span className="text-base text-[#94a3b8] cursor-pointer">⋮</span></div>
                </div>
                <div className="group grid grid-cols-[1fr_180px_220px_36px] border-b border-[#f8fafc] cursor-pointer transition-colors duration-150">
                  <div className="px-3 py-3 text-[11px] text-[#374151] flex items-center group-hover:bg-[#f8fafc]"><span className="font-semibold text-[#0f172a] flex items-center gap-[5px]">Friday Journey Test <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#94a3b8]"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></span></div>
                  <div className="px-3 py-3 text-[11px] text-[#374151] flex items-center group-hover:bg-[#f8fafc]"><span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-[10px] bg-[#dcfce7] text-[#16a34a]">● Running</span></div>
                  <div className="px-3 py-3 text-[11px] text-[#374151] flex items-center group-hover:bg-[#f8fafc] text-[#64748b]">21 days ago</div>
                  <div className="px-3 py-3 text-[11px] text-[#374151] flex items-center group-hover:bg-[#f8fafc]"><span className="text-base text-[#94a3b8] cursor-pointer">⋮</span></div>
                </div>
                <div className="flex items-center gap-1.5 mt-3.5">
                  <button className="text-[10px] border border-[#e2e8f0] rounded-[5px] px-2 py-1 bg-white text-[#94a3b8] cursor-pointer">«« First</button>
                  <button className="text-[10px] border border-[#e2e8f0] rounded-[5px] px-2 py-1 bg-white text-[#94a3b8] cursor-pointer">‹ Previous</button>
                  <button className="text-[10px] border border-[#e2e8f0] rounded-[5px] px-2 py-1 bg-white text-[#94a3b8] cursor-pointer">Next ›</button>
                  <button className="text-[10px] border border-[#e2e8f0] rounded-[5px] px-2 py-1 bg-white text-[#94a3b8] cursor-pointer">Last »»</button>
                  <span className="ml-auto text-[10px] text-[#94a3b8]">Page 1 of 1</span>
                </div>
              </div>
            </div>
          </div>{/* /view-campaigns */}

          {/* ══ VIEW: CUSTOMER 360 ══ */}
          <div className={`${kdViewBase} ${activeView === 'customers' ? kdViewActive : kdViewInactive}`}>
            <div className="flex h-full overflow-hidden">
              <div className="w-[195px] shrink-0 border-r border-[#f1f5f9] flex flex-col overflow-hidden">
                <div className="px-2.5 pt-2 pb-1.5 text-xs font-extrabold flex items-center justify-between border-b border-[#f1f5f9]">
                  <span className="flex items-center gap-1.5"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg> Customer 360</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold">16</span>
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-[#16a34a]"><span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] animate-[pulse-dot_2s_ease-in-out_infinite]" />Live</span>
                    <span className="text-[10px] text-[#64748b] cursor-pointer flex items-center gap-[3px] border border-[#e2e8f0] rounded-[4px] px-1.5 py-0.5">↻ Sync</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 border-b border-[#f1f5f9]">
                  <div className="text-center px-0.5 py-1.5 border-r border-[#f1f5f9] last:border-r-0"><div className="text-[8px] text-[#64748b] font-semibold">Active 7d</div><div className="text-sm font-extrabold text-[#0D47A1]">0</div></div>
                  <div className="text-center px-0.5 py-1.5 border-r border-[#f1f5f9] last:border-r-0"><div className="text-[8px] text-[#64748b] font-semibold">Avg Score</div><div className="text-sm font-extrabold text-[#0D47A1]">0</div></div>
                  <div className="text-center px-0.5 py-1.5 border-r border-[#f1f5f9] last:border-r-0"><div className="text-[8px] text-[#64748b] font-semibold">Active 30d</div><div className="text-sm font-extrabold text-[#0D47A1]">6</div></div>
                </div>
                <div className="px-2 py-1.5 border-b border-[#f1f5f9]"><input className="w-full bg-[#f8fafc] border border-[#f1f5f9] rounded-md px-2 py-1 text-[10px] text-[#374151] outline-none" placeholder="Search profiles…" /></div>
                <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar-thumb]:bg-[#e2e8f0]">
                  <div className="flex items-center gap-[7px] px-2.5 py-[7px] border-b border-[#f8fafc] cursor-pointer transition-colors duration-150 hover:bg-[#f8fafc] bg-[#f0f7ff] border-l-2 border-l-[#0D47A1]">
                    <div className="w-[26px] h-[26px] rounded-full flex items-center justify-center text-[9px] font-extrabold text-white shrink-0 bg-[#0D47A1]">KU</div>
                    <div className="flex-1 min-w-0"><div className="flex items-center gap-1"><span className="text-[11px] font-bold text-[#0f172a]">Asante</span> <span className="inline-block text-[8px] font-semibold px-[5px] py-px rounded-[3px] bg-[#ede9fe] text-[#7c3aed]">Opportunity</span></div></div>
                    <div className="text-right shrink-0"><div className="text-[10px] font-extrabold text-[#0D47A1]">73</div><div className="text-[8px] text-[#94a3b8]">22 days ago</div></div>
                  </div>
                  <div className="flex items-center gap-[7px] px-2.5 py-[7px] border-b border-[#f8fafc] cursor-pointer transition-colors duration-150 hover:bg-[#f8fafc]">
                    <div className="w-[26px] h-[26px] rounded-full flex items-center justify-center text-[9px] font-extrabold text-white shrink-0 bg-[#e11d48]">RO</div>
                    <div className="flex-1 min-w-0"><div className="flex items-center gap-1"><span className="text-[11px] font-bold text-[#0f172a]">Ronald</span> <span className="inline-block text-[8px] font-semibold px-[5px] py-px rounded-[3px] bg-[#dcfce7] text-[#16a34a]">Customer</span></div></div>
                    <div className="text-right shrink-0"><div className="text-[10px] font-extrabold text-[#0D47A1]">73</div><div className="text-[8px] text-[#94a3b8]">22 days ago</div></div>
                  </div>
                  <div className="flex items-center gap-[7px] px-2.5 py-[7px] border-b border-[#f8fafc] cursor-pointer transition-colors duration-150 hover:bg-[#f8fafc]">
                    <div className="w-[26px] h-[26px] rounded-full flex items-center justify-center text-[9px] font-extrabold text-white shrink-0 bg-[#7c3aed]">JA</div>
                    <div className="flex-1 min-w-0"><div className="flex items-center gap-1"><span className="text-[11px] font-bold text-[#0f172a]">jane</span> <span className="inline-block text-[8px] font-semibold px-[5px] py-px rounded-[3px] bg-[#ede9fe] text-[#7c3aed]">Opportunity</span></div></div>
                    <div className="text-right shrink-0"><div className="text-[10px] font-extrabold text-[#0D47A1]">73</div><div className="text-[8px] text-[#94a3b8]">24 days ago</div></div>
                  </div>
                  <div className="flex items-center gap-[7px] px-2.5 py-[7px] border-b border-[#f8fafc] cursor-pointer transition-colors duration-150 hover:bg-[#f8fafc]">
                    <div className="w-[26px] h-[26px] rounded-full flex items-center justify-center text-[9px] font-extrabold text-white shrink-0 bg-[#059669]">LY</div>
                    <div className="flex-1 min-w-0"><div className="flex items-center gap-1"><span className="text-[11px] font-bold text-[#0f172a]">lyncrisella</span> <span className="inline-block text-[8px] font-semibold px-[5px] py-px rounded-[3px] bg-[#fef3c7] text-[#d97706]">Lead</span></div></div>
                    <div className="text-right shrink-0"><div className="text-[10px] font-extrabold text-[#ef4444]">21</div><div className="text-[8px] text-[#94a3b8]">25 days ago</div></div>
                  </div>
                  <div className="flex items-center gap-[7px] px-2.5 py-[7px] border-b border-[#f8fafc] cursor-pointer transition-colors duration-150 hover:bg-[#f8fafc]">
                    <div className="w-[26px] h-[26px] rounded-full flex items-center justify-center text-[9px] font-extrabold text-white shrink-0 bg-[#1e293b]">KT</div>
                    <div className="flex-1 min-w-0"><div className="flex items-center gap-1"><span className="text-[11px] font-bold text-[#0f172a]">Kweku Tawiah</span> <span className="inline-block text-[8px] font-semibold px-[5px] py-px rounded-[3px] bg-[#fef3c7] text-[#d97706]">Lead</span></div></div>
                    <div className="text-right shrink-0"><div className="text-[10px] font-extrabold text-[#ef4444]">21</div><div className="text-[8px] text-[#94a3b8]">29 days ago</div></div>
                  </div>
                  <div className="flex items-center gap-[7px] px-2.5 py-[7px] border-b border-[#f8fafc] cursor-pointer transition-colors duration-150 hover:bg-[#f8fafc]">
                    <div className="w-[26px] h-[26px] rounded-full flex items-center justify-center text-[9px] font-extrabold text-white shrink-0 bg-[#0891b2]">NT</div>
                    <div className="flex-1 min-w-0"><div className="flex items-center gap-1"><span className="text-[9.5px] font-bold text-[#0f172a]">Narhnarh Tetteh…</span> <span className="inline-block text-[8px] font-semibold px-[5px] py-px rounded-[3px] bg-[#fef3c7] text-[#d97706]">Lead</span></div></div>
                    <div className="text-right shrink-0"><div className="text-[10px] font-extrabold text-[#ef4444]">13</div><div className="text-[8px] text-[#94a3b8]">1 month ago</div></div>
                  </div>
                  <div className="flex items-center gap-[7px] px-2.5 py-[7px] border-b border-[#f8fafc] cursor-pointer transition-colors duration-150 hover:bg-[#f8fafc]">
                    <div className="w-[26px] h-[26px] rounded-full flex items-center justify-center text-[9px] font-extrabold text-white shrink-0 bg-[#d97706]">NY</div>
                    <div className="flex-1 min-w-0"><div className="flex items-center gap-1"><span className="text-[11px] font-bold text-[#0f172a]">NY</span> <span className="inline-block text-[8px] font-semibold px-[5px] py-px rounded-[3px] bg-[#fef3c7] text-[#d97706]">Lead</span></div></div>
                    <div className="text-right shrink-0"><div className="text-[10px] font-extrabold text-[#ef4444]">13</div><div className="text-[8px] text-[#94a3b8]">1 month ago</div></div>
                  </div>
                  <div className="flex items-center gap-[7px] px-2.5 py-[7px] border-b border-[#f8fafc] cursor-pointer transition-colors duration-150 hover:bg-[#f8fafc]">
                    <div className="w-[26px] h-[26px] rounded-full flex items-center justify-center text-[9px] font-extrabold text-white shrink-0 bg-[#6366f1]">AS</div>
                    <div className="flex-1 min-w-0"><div className="flex items-center gap-1"><span className="text-[11px] font-bold text-[#0f172a]">Adwoa_Serwaa</span> <span className="inline-block text-[8px] font-semibold px-[5px] py-px rounded-[3px] bg-[#fef3c7] text-[#d97706]">Lead</span></div></div>
                    <div className="text-right shrink-0"><div className="text-[10px] font-extrabold text-[#ef4444]">13</div><div className="text-[8px] text-[#94a3b8]">1 month ago</div></div>
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto px-4 py-3.5 [&::-webkit-scrollbar]:w-[3px]">
                <div className="flex items-start justify-between mb-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center text-[13px] font-extrabold text-white bg-[#0D47A1] shrink-0">AS</div>
                    <div>
                      <div className="text-lg font-extrabold text-[#0f172a]">Asante</div>
                      <div className="text-[10px] text-[#94a3b8]">— —</div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button className="text-[10px] font-semibold border border-[#e2e8f0] bg-white rounded-md px-[9px] py-1 cursor-pointer text-[#374151] inline-flex items-center gap-1"><PencilSimple size={11} weight="duotone" />Edit</button>
                    <button className="text-[10px] font-semibold border border-[#e2e8f0] bg-white rounded-md px-[9px] py-1 cursor-pointer text-[#374151]">⊕ Merge</button>
                    <button className="text-[10px] font-semibold border border-[#e2e8f0] bg-white rounded-md px-[9px] py-1 cursor-pointer text-[#374151]">↓ Export ∨</button>
                  </div>
                </div>
                <div className="flex gap-[5px] mt-[5px] flex-wrap">
                  <span className="text-[10px] font-semibold px-2.5 py-[3px] rounded-md border border-[#e2e8f0] bg-white text-[#374151] cursor-pointer">Opportunity</span>
                  <span className="text-[10px] font-semibold px-2.5 py-[3px] rounded-md border border-[#e2e8f0] bg-white text-[#374151] cursor-pointer">Individual</span>
                  <span className="text-[10px] font-semibold px-2.5 py-[3px] rounded-md border cursor-pointer bg-[#0D47A1] text-white border-[#0D47A1]">Score: 73</span>
                </div>

                <div className="text-[9px] font-extrabold uppercase tracking-[1px] text-[#94a3b8] mt-3 mb-1.5">INTELLIGENCE SCORES</div>
                <div className="grid grid-cols-4 gap-1.5 mb-3">
                  <div className="bg-white border border-[#f1f5f9] rounded-lg p-2">
                    <div className="text-[9px] text-[#64748b] mb-1 flex items-center gap-[3px]">↗ Engagement</div>
                    <div className="text-base font-extrabold text-[#0f172a] mb-1">73</div>
                    <div className="h-1 rounded-sm overflow-hidden bg-[#f1f5f9]"><div className="h-full rounded-sm transition-[width] duration-1000 ease-linear w-[73%] bg-[#0D47A1]" /></div>
                  </div>
                  <div className="bg-white border border-[#f1f5f9] rounded-lg p-2">
                    <div className="text-[9px] text-[#64748b] mb-1 flex items-center gap-[3px]">◎ Lead Score</div>
                    <div className="text-base font-extrabold text-[#0f172a] mb-1">85</div>
                    <div className="h-1 rounded-sm overflow-hidden bg-[#f1f5f9]"><div className="h-full rounded-sm transition-[width] duration-1000 ease-linear w-[85%] bg-[#16a34a]" /></div>
                  </div>
                  <div className="bg-white border border-[#f1f5f9] rounded-lg p-2">
                    <div className="text-[9px] text-[#64748b] mb-1 flex items-center gap-[3px]">○ Health</div>
                    <div className="text-base font-extrabold text-[#0f172a] mb-1">73</div>
                    <div className="h-1 rounded-sm overflow-hidden bg-[#f1f5f9]"><div className="h-full rounded-sm transition-[width] duration-1000 ease-linear w-[73%] bg-[#0D47A1]" /></div>
                  </div>
                  <div className="bg-white border border-[#f1f5f9] rounded-lg p-2">
                    <div className="text-[9px] text-[#64748b] mb-1 flex items-center gap-[3px]"><Warning size={9} weight="duotone" />Churn Risk</div>
                    <div className="text-base font-extrabold text-[#0f172a] mb-1">27</div>
                    <div className="h-1 rounded-sm overflow-hidden bg-[#f1f5f9]"><div className="h-full rounded-sm transition-[width] duration-1000 ease-linear w-[27%] bg-[#f59e0b]" /></div>
                  </div>
                </div>

                <div className="text-[9px] font-extrabold uppercase tracking-[1px] text-[#94a3b8] mt-3 mb-1.5">CHANNEL PRESENCE</div>
                <div className="flex gap-1.5 mb-3">
                  <span className="text-[10px] font-semibold px-[11px] py-1 rounded-md border border-[#e2e8f0] bg-white text-[#374151] flex items-center gap-[5px]"><Circle size={8} weight="fill" color="#22c55e" />Whatsapp</span>
                  <span className="text-[10px] font-semibold px-[11px] py-1 rounded-md border border-[#e2e8f0] bg-white text-[#374151] flex items-center gap-[5px]"><Globe size={10} weight="duotone" />Web</span>
                  <span className="text-[10px] font-semibold px-[11px] py-1 rounded-md border border-[#e2e8f0] bg-white text-[#374151] flex items-center gap-[5px]"><Gear size={10} weight="duotone" />Api</span>
                </div>

                <div className="grid grid-cols-3 gap-1.5 mb-3">
                  <div className="bg-white border border-[#f1f5f9] rounded-lg px-2.5 py-2"><div className="text-[8px] text-[#94a3b8] font-semibold uppercase tracking-[.5px] mb-[3px]">Lifecycle Stage</div><div className="text-xs font-bold text-[#0f172a]">Opportunity</div></div>
                  <div className="bg-white border border-[#f1f5f9] rounded-lg px-2.5 py-2"><div className="text-[8px] text-[#94a3b8] font-semibold uppercase tracking-[.5px] mb-[3px]">Interactions</div><div className="text-xs font-bold text-[#0f172a]">9</div></div>
                  <div className="bg-white border border-[#f1f5f9] rounded-lg px-2.5 py-2"><div className="text-[8px] text-[#94a3b8] font-semibold uppercase tracking-[.5px] mb-[3px]">Last Seen</div><div className="text-xs font-bold text-[#0f172a]">22 days ago</div></div>
                </div>

                <div className="flex items-center justify-between bg-white border border-[#f1f5f9] rounded-lg px-3 py-2 mb-3 text-[11px] text-[#374151]">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>
                  <span className="flex-1 ml-1.5 text-[11px] font-semibold">Support Cases <span className="text-[#94a3b8] font-normal">6 total</span></span>
                  <span className="text-[9px] font-bold text-[#ef4444] bg-[#fee2e2] px-[7px] py-0.5 rounded-[10px]">● 4 open</span>
                  <span className="text-[10px] font-bold text-[#0D47A1] cursor-pointer ml-2">View Cases</span>
                </div>

                <div className="text-[9px] font-extrabold uppercase tracking-[1px] text-[#94a3b8] mt-3 mb-1.5">RECENT ACTIVITY</div>
                <div className="flex items-start gap-2 py-2 border-b border-[#f8fafc]">
                  <div className="w-3.5 h-3.5 border border-[#e2e8f0] rounded-[3px] shrink-0 mt-px" />
                  <div className="flex-1"><div className="text-[11px] font-semibold text-[#374151]">Conversation #132</div><div className="text-[10px] text-[#94a3b8] mt-px">Krongage whatsapp — resolved</div></div>
                  <div className="text-[9px] text-[#94a3b8] shrink-0">4d ago ↗</div>
                </div>
                <div className="flex items-start gap-2 py-2 border-b border-[#f8fafc]">
                  <div className="w-3.5 h-3.5 border border-[#e2e8f0] rounded-[3px] shrink-0 mt-px" />
                  <div className="flex-1"><div className="text-[11px] font-semibold text-[#374151]">Conversation #1</div><div className="text-[10px] text-[#94a3b8] mt-px">krongage web — resolved</div></div>
                  <div className="text-[9px] text-[#94a3b8] shrink-0">15d ago ↗</div>
                </div>
                <div className="flex items-start gap-2 py-2 border-b border-[#f8fafc]">
                  <div className="w-3.5 h-3.5 border border-[#e2e8f0] rounded-[3px] shrink-0 mt-px" />
                  <div className="flex-1"><div className="text-[11px] font-semibold text-[#374151]">Conversation #2</div><div className="text-[10px] text-[#94a3b8] mt-px">Support Cases — resolved</div></div>
                  <div className="text-[9px] text-[#94a3b8] shrink-0">15d ago ↗</div>
                </div>
                <div className="flex items-start gap-2 py-2 border-b border-[#f8fafc]">
                  <div className="w-3.5 h-3.5 border border-[#e2e8f0] rounded-[3px] shrink-0 mt-px" />
                  <div className="flex-1"><div className="text-[11px] font-semibold text-[#374151]">Conversation #131</div><div className="text-[10px] text-[#94a3b8] mt-px">Krongage whatsapp — resolved</div></div>
                  <div className="text-[9px] text-[#94a3b8] shrink-0">16d ago ↗</div>
                </div>
                <div className="flex items-start gap-2 py-2 border-b border-[#f8fafc]">
                  <div className="w-3.5 h-3.5 border border-[#e2e8f0] rounded-[3px] shrink-0 mt-px" />
                  <div className="flex-1"><div className="text-[11px] font-semibold text-[#374151]">Conversation #127 — resolved</div><div className="text-[10px] text-[#94a3b8] mt-px">via whatsapp</div></div>
                  <div className="text-[9px] text-[#94a3b8] shrink-0">22d ago ↗</div>
                </div>
              </div>
            </div>
          </div>{/* /view-customers */}

          {/* ══ VIEW: KNOWLEDGE ══ */}
          <div className={`${kdViewBase} ${activeView === 'knowledge' ? kdViewActive : kdViewInactive}`}>
            <div className="flex h-full overflow-hidden">
              <div className="w-[130px] shrink-0 border-r border-[#f1f5f9] flex flex-col overflow-hidden">
                <div className="px-3 pt-2 pb-2.5 border-b border-[#f1f5f9]">
                  <div className="text-xs font-extrabold text-[#0f172a]">Knowledge</div>
                  <div className="text-[9px] text-[#94a3b8] mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">Knowledge base &amp; RAG — pgvect…</div>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 text-[10.5px] font-semibold text-[#475569] cursor-pointer hover:bg-[#f8fafc]">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>Chat
                </div>
                <div className="flex items-center gap-2 px-3 py-2 text-[10.5px] font-semibold cursor-pointer bg-[#EEF5FD] text-[#0D47A1] border-r-2 border-r-[#0D47A1]">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>Documents
                </div>
                <div className="flex items-center gap-2 px-3 py-2 text-[10.5px] font-semibold text-[#475569] cursor-pointer hover:bg-[#f8fafc]">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>Entities
                </div>
                <div className="flex items-center gap-2 px-3 py-2 text-[10.5px] font-semibold text-[#475569] cursor-pointer hover:bg-[#f8fafc]">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>Guidelines
                </div>
              </div>
              <div className="w-[190px] shrink-0 border-r border-[#f1f5f9] flex flex-col overflow-hidden">
                <div className="flex items-center justify-between px-3 py-2 border-b border-[#f1f5f9]">
                  <span className="text-xs font-extrabold">Documents</span>
                  <button className="bg-[#0D47A1] text-white border-none rounded-md px-2.5 py-1 text-[9px] font-bold cursor-pointer flex items-center gap-[3px]">↑ Upload</button>
                </div>
                <div className="px-2.5 py-1.5 border-b border-[#f1f5f9]">
                  <select className="w-full border border-[#e2e8f0] rounded-md px-1.5 py-1 text-[10px] bg-white text-[#374151]"><option>Fidelity Bank (2)</option></select>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <div className="flex items-center gap-2 px-3 py-2.5 border-b border-[#f8fafc] cursor-pointer transition-colors duration-150 hover:bg-[#f8fafc] bg-[#f0f7ff]">
                    <div className="text-xl shrink-0 text-[#2563eb]"><FileText size={20} weight="duotone" /></div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-bold text-[#0f172a]">FAQ.pdf</div>
                      <div className="text-[9px] text-[#94a3b8] mt-0.5">34.2 MB · 36d ago</div>
                      <div className="inline-block text-[8px] font-bold px-1.5 py-px rounded-[3px] bg-[#dcfce7] text-[#16a34a] mt-[3px]">ready</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2.5 border-b border-[#f8fafc] cursor-pointer transition-colors duration-150 hover:bg-[#f8fafc]">
                    <div className="text-xl shrink-0 text-[#2563eb]"><FileText size={20} weight="duotone" /></div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-bold text-[#0f172a]">prb-report.pdf</div>
                      <div className="text-[9px] text-[#94a3b8] mt-0.5">620.9 KB · 36d ago</div>
                      <div className="inline-block text-[8px] font-bold px-1.5 py-px rounded-[3px] bg-[#dcfce7] text-[#16a34a] mt-[3px]">ready</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto px-3.5 py-3 [&::-webkit-scrollbar]:w-[3px]">
                <div className="flex items-start justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="text-[28px] text-[#2563eb]"><FileText size={28} weight="duotone" /></div>
                    <div>
                      <div className="text-sm font-extrabold text-[#0f172a]">FAQ.pdf</div>
                      <div className="text-[10px] text-[#64748b] mt-0.5">34.2 MB · application/pdf · Apr 9, 2026, 11:57 AM</div>
                    </div>
                  </div>
                  <div className="flex gap-[5px]">
                    <button className="text-[9px] font-semibold border border-[#e2e8f0] bg-white rounded-[5px] px-2 py-1 cursor-pointer text-[#374151] flex items-center gap-[3px]">↓ Download</button>
                    <button className="text-[9px] font-semibold border border-[#e2e8f0] bg-white rounded-[5px] px-2 py-1 cursor-pointer text-[#374151] flex items-center gap-[3px]">↻ Re-extract entities</button>
                    <button className="text-[9px] font-semibold border rounded-[5px] px-2 py-1 cursor-pointer flex items-center gap-[3px] text-[#dc2626] border-[#fecaca] bg-white"><Trash size={11} weight="duotone" />Delete</button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[10px] text-[#94a3b8] my-2.5 py-1.5 border-t border-b border-[#f1f5f9]">
                  <span><strong>DOCUMENT CONTENT (4 CHUNKS)</strong></span>
                  <span>1122 total tokens</span>
                </div>
                <div className="bg-white border border-[#f1f5f9] rounded-lg mb-2 overflow-hidden">
                  <div className="flex items-center justify-between px-2.5 py-[5px] bg-[#f8fafc] border-b border-[#f1f5f9]"><span className="text-[9px] font-bold text-[#64748b]">Chunk 1</span><span className="text-[9px] text-[#94a3b8]">547 tokens</span></div>
                  <div className="px-2.5 py-2 text-[9.5px] text-[#374151] leading-[1.65] [font-family:'Menlo','Courier_New',monospace] whitespace-pre-wrap max-h-[110px] overflow-hidden">Believe with us.
FAQs
1. What is the Fidelity Green Leding Fund?
This is a dedicated concessionary green financing product developed by Fidelity Bank Ghana LTD (FBGL) to meet the unique financing needs of businesses in the green economy including climate friendly businesses.
2. What are green economy or climate businesses?
These are businesses whose operational models and methods contribute to reduce environmental harm, promote sustainability, and support inclusive economic growth.</div>
                </div>
                <div className="bg-white border border-[#f1f5f9] rounded-lg mb-2 overflow-hidden">
                  <div className="flex items-center justify-between px-2.5 py-[5px] bg-[#f8fafc] border-b border-[#f1f5f9]"><span className="text-[9px] font-bold text-[#64748b]">Chunk 2</span><span className="text-[9px] text-[#94a3b8]">515 tokens</span></div>
                  <div className="px-2.5 py-2 text-[9.5px] text-[#374151] leading-[1.65] [font-family:'Menlo','Courier_New',monospace] whitespace-pre-wrap max-h-[110px] overflow-hidden">[GLF?]
All businesses that are aligned to the Ghana Green Finance Taxonomy (2024) Phase 1 as well as SDG 7, SDG 9 and SDG 13. They include:
9. How does a customer apply for Green Lending Fund?
Customer submit their green business funding proposal for the GLF through the Relationship Managers or Officers in the usual procedure for Corporate Banking (CIB) or Business Banking or SME loan.</div>
                </div>
                <div className="bg-white border border-[#f1f5f9] rounded-lg mb-2 overflow-hidden">
                  <div className="flex items-center justify-between px-2.5 py-[5px] bg-[#f8fafc] border-b border-[#f1f5f9]"><span className="text-[9px] font-bold text-[#64748b]">Chunk 3</span><span className="text-[9px] text-[#94a3b8]">95 tokens</span></div>
                  <div className="px-2.5 py-2 text-[9.5px] text-[#374151] leading-[1.65] [font-family:'Menlo','Courier_New',monospace] whitespace-pre-wrap max-h-[110px] overflow-hidden">[GLF? &gt; GLF.]
11. Which Department in the Bank provides back-end support, drives and coordinates GLF?</div>
                </div>
                <div className="bg-white border border-[#f1f5f9] rounded-lg mb-2 overflow-hidden">
                  <div className="flex items-center justify-between px-2.5 py-[5px] bg-[#f8fafc] border-b border-[#f1f5f9]"><span className="text-[9px] font-bold text-[#64748b]">Chunk 4</span><span className="text-[9px] text-[#94a3b8]">65 tokens</span></div>
                  <div className="px-2.5 py-2 text-[9.5px] text-[#374151] leading-[1.65] [font-family:'Menlo','Courier_New',monospace] whitespace-pre-wrap max-h-[110px] overflow-hidden">The Partnerships, Sustainability and CSR department drives and coordinates the Green Lending Fund across all business segments and provides back-end support.</div>
                </div>
              </div>
            </div>
          </div>{/* /view-knowledge */}

          {/* ══ VIEW: SETTINGS ══ */}
          <div className={`${kdViewBase} ${activeView === 'settings' ? kdViewActive : kdViewInactive}`}>
            <div className="flex h-full overflow-hidden">
              <div className="w-40 shrink-0 border-r border-[#f1f5f9] py-2 overflow-y-auto">
                <div className="flex items-center gap-[7px] px-3 pt-2 pb-2.5 text-xs font-extrabold text-[#0f172a]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>Settings
                </div>
                <div className="flex items-center gap-[7px] px-3 py-[7px] text-[10.5px] font-semibold text-[#475569] cursor-pointer hover:bg-[#f8fafc]"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>General</div>
                <div className="flex items-center gap-[7px] px-3 py-[7px] text-[10.5px] font-semibold text-[#475569] cursor-pointer hover:bg-[#f8fafc]"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>Team</div>
                <div className="flex items-center gap-[7px] px-3 py-[7px] text-[10.5px] font-semibold text-[#475569] cursor-pointer hover:bg-[#f8fafc]"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>Billing</div>
                <div className="flex items-center gap-[7px] px-3 py-[7px] text-[10.5px] font-semibold text-[#475569] cursor-pointer hover:bg-[#f8fafc]"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>Security</div>
                <div className="flex items-center gap-[7px] px-3 py-[7px] text-[10.5px] font-semibold text-[#475569] cursor-pointer hover:bg-[#f8fafc] flex-wrap"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>Social Publishing API Keys</div>
                <div className="flex items-center gap-[7px] px-3 py-[7px] text-[10.5px] font-bold cursor-pointer text-[#0D47A1] bg-[#EEF5FD]"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>Social Channel Access</div>
                <div className="flex items-center gap-[7px] px-3 py-[7px] text-[10.5px] font-semibold text-[#475569] cursor-pointer hover:bg-[#f8fafc] flex-wrap"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3z"/></svg>Social Listening API Keys</div>
                <div className="flex items-center gap-[7px] px-3 py-[7px] text-[10.5px] font-semibold text-[#475569] cursor-pointer hover:bg-[#f8fafc]"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>KronChat Social Apps</div>
                <div className="flex items-center gap-[7px] px-3 py-[7px] text-[10.5px] font-semibold text-[#475569] cursor-pointer hover:bg-[#f8fafc]"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>KronCard <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-auto"><polyline points="9 18 15 12 9 6"/></svg></div>
                <div className="flex items-center gap-[7px] px-3 py-[7px] text-[10.5px] font-semibold text-[#475569] cursor-pointer hover:bg-[#f8fafc]"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>My Profile</div>
              </div>
              <div className="flex-1 px-7 py-5 overflow-y-auto">
                <div className="text-[17px] font-extrabold text-[#0f172a] mb-1.5">Social Channel Access</div>
                <div className="text-[11px] text-[#64748b] leading-[1.6] mb-5 max-w-[600px]">Control which team members can post from each connected social account. By default every Social Manager can access every channel. Restricting a channel limits it to only the users you assign — admins always have full access.</div>
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="flex items-center gap-2.5 bg-white border border-[#f1f5f9] rounded-xl px-3.5 py-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-[13px] font-extrabold text-white shrink-0 bg-[#1e293b]">S</div>
                    <div className="flex-1"><div className="text-xs font-bold text-[#0f172a]">Server Room</div><div className="text-[10px] text-[#94a3b8]">X</div></div>
                    <div className="text-[10px] font-bold text-[#d97706] bg-[#fef3c7] px-2 py-[3px] rounded-full flex items-center gap-1 whitespace-nowrap"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>5 users</div>
                  </div>
                  <div className="flex items-center gap-2.5 bg-white border border-[#f1f5f9] rounded-xl px-3.5 py-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-[13px] font-extrabold text-white shrink-0 bg-[#0077b5]">S</div>
                    <div className="flex-1"><div className="text-xs font-bold text-[#0f172a]">Server Room</div><div className="text-[10px] text-[#94a3b8]">Linkedin</div></div>
                    <div className="text-[10px] font-bold text-[#d97706] bg-[#fef3c7] px-2 py-[3px] rounded-full flex items-center gap-1 whitespace-nowrap"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>2 users</div>
                  </div>
                  <div className="flex items-center gap-2.5 bg-white border border-[#f1f5f9] rounded-xl px-3.5 py-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-[13px] font-extrabold text-white shrink-0 bg-[#e1306c]">D</div>
                    <div className="flex-1"><div className="text-xs font-bold text-[#0f172a]">Delika</div><div className="text-[10px] text-[#94a3b8]">Facebook</div></div>
                    <div className="text-[10px] font-bold text-[#d97706] bg-[#fef3c7] px-2 py-[3px] rounded-full flex items-center gap-1 whitespace-nowrap"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>2 users</div>
                  </div>
                  <div className="flex items-center gap-2.5 bg-white border border-[#f1f5f9] rounded-xl px-3.5 py-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-[11px] font-extrabold text-[#374151] shrink-0 bg-[#e2e8f0]">s00</div>
                    <div className="flex-1"><div className="text-xs font-bold text-[#0f172a]">server00m1234</div><div className="text-[10px] text-[#94a3b8]">Threads</div></div>
                    <div className="text-[10px] font-bold text-[#d97706] bg-[#fef3c7] px-2 py-[3px] rounded-full flex items-center gap-1 whitespace-nowrap"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>1 user</div>
                  </div>
                  <div className="flex items-center gap-2.5 bg-white border border-[#f1f5f9] rounded-xl px-3.5 py-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-[11px] font-bold text-[#374151] shrink-0 bg-[#e2e8f0]">Serv</div>
                    <div className="flex-1"><div className="text-xs font-bold text-[#0f172a]">Server Room</div><div className="text-[10px] text-[#94a3b8]">Instagram-Standalone</div></div>
                    <div className="text-[10px] font-semibold text-[#64748b] flex items-center gap-1 whitespace-nowrap"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>Open to all</div>
                  </div>
                  <div className="flex items-center gap-2.5 bg-white border border-[#f1f5f9] rounded-xl px-3.5 py-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-[13px] font-extrabold text-white shrink-0 bg-[#059669]">r</div>
                    <div className="flex-1"><div className="text-xs font-bold text-[#0f172a]">rather not say</div><div className="text-[10px] text-[#94a3b8]">Youtube</div></div>
                    <div className="text-[10px] font-semibold text-[#64748b] flex items-center gap-1 whitespace-nowrap"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>Open to all</div>
                  </div>
                  <div className="flex items-center gap-2.5 bg-white border border-[#f1f5f9] rounded-xl px-3.5 py-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-[11px] font-bold text-[#374151] shrink-0 bg-[#e2e8f0]">kjud</div>
                    <div className="flex-1"><div className="text-xs font-bold text-[#0f172a]">kofi_amoah</div><div className="text-[10px] text-[#94a3b8]">Pinterest</div></div>
                    <div className="text-[10px] font-semibold text-[#64748b] flex items-center gap-1 whitespace-nowrap"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>Open to all</div>
                  </div>
                  <div className="flex items-center gap-2.5 bg-white border border-[#f1f5f9] rounded-xl px-3.5 py-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-[11px] font-bold text-white shrink-0 bg-[#0077b5]">Kofi</div>
                    <div className="flex-1"><div className="text-xs font-bold text-[#0f172a]">Kofi Amoah</div><div className="text-[10px] text-[#94a3b8]">Linkedin</div></div>
                    <div className="text-[10px] font-bold text-[#d97706] bg-[#fef3c7] px-2 py-[3px] rounded-full flex items-center gap-1 whitespace-nowrap"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>2 users</div>
                  </div>
                  <div className="flex items-center gap-2.5 bg-white border border-[#f1f5f9] rounded-xl px-3.5 py-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-[11px] font-bold text-white shrink-0 bg-[#0077b5]">Nan</div>
                    <div className="flex-1"><div className="text-xs font-bold text-[#0f172a]">Nana Yaw Darko</div><div className="text-[10px] text-[#94a3b8]">Linkedin</div></div>
                    <div className="text-[10px] font-bold text-[#d97706] bg-[#fef3c7] px-2 py-[3px] rounded-full flex items-center gap-1 whitespace-nowrap"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>2 users</div>
                  </div>
                  <div className="flex items-center gap-2.5 bg-white border border-[#f1f5f9] rounded-xl px-3.5 py-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-[11px] font-bold text-white shrink-0 bg-[#0077b5]">Emm</div>
                    <div className="flex-1"><div className="text-xs font-bold text-[#0f172a]">Emmanuel Asante</div><div className="text-[10px] text-[#94a3b8]">Linkedin</div></div>
                    <div className="text-[10px] font-semibold text-[#64748b] flex items-center gap-1 whitespace-nowrap"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>Open to all</div>
                  </div>
                  <div className="flex items-center gap-2.5 bg-white border border-[#f1f5f9] rounded-xl px-3.5 py-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-[11px] font-bold text-white shrink-0 bg-[#0077b5]">Sam</div>
                    <div className="flex-1"><div className="text-xs font-bold text-[#0f172a]">Samuel Kweku A. Mensah</div><div className="text-[10px] text-[#94a3b8]">Linkedin</div></div>
                    <div className="text-[10px] font-bold text-[#d97706] bg-[#fef3c7] px-2 py-[3px] rounded-full flex items-center gap-1 whitespace-nowrap"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>4 users</div>
                  </div>
                  <div className="flex items-center gap-2.5 bg-white border border-[#f1f5f9] rounded-xl px-3.5 py-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-[11px] font-bold text-white shrink-0 bg-[#0077b5]">Mick</div>
                    <div className="flex-1"><div className="text-xs font-bold text-[#0f172a]">Akua Boateng</div><div className="text-[10px] text-[#94a3b8]">Linkedin</div></div>
                    <div className="text-[10px] font-semibold text-[#64748b] flex items-center gap-1 whitespace-nowrap"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>Open to all</div>
                  </div>
                  <div className="flex items-center gap-2.5 bg-white border border-[#f1f5f9] rounded-xl px-3.5 py-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-[11px] font-bold text-white shrink-0 bg-[#0077b5]">Zabe</div>
                    <div className="flex-1"><div className="text-xs font-bold text-[#0f172a]">Akosua Enyonam Blebo</div><div className="text-[10px] text-[#94a3b8]">Linkedin</div></div>
                    <div className="text-[10px] font-semibold text-[#64748b] flex items-center gap-1 whitespace-nowrap"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>Open to all</div>
                  </div>
                </div>
              </div>
            </div>
          </div>{/* /view-settings */}

          {/* ══ VIEW: USAGE & LIMITS ══ */}
          <div className={`${kdViewBase} ${activeView === 'usage' ? kdViewActive : kdViewInactive}`}>
            <div className="flex h-full overflow-hidden">
              <div className="w-[145px] shrink-0 border-r border-[#f1f5f9] py-2 overflow-y-auto">
                <div className="flex items-center gap-[7px] px-3 py-[7px] text-[10.5px] font-bold cursor-pointer text-[#0D47A1] bg-[#EEF5FD]"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>Overview</div>
                <div className="flex items-center gap-[7px] px-3 py-[7px] text-[10.5px] font-semibold text-[#475569] cursor-pointer hover:bg-[#f8fafc]"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>Usage</div>
                <div className="flex items-center gap-[7px] px-3 py-[7px] text-[10.5px] font-semibold text-[#475569] cursor-pointer hover:bg-[#f8fafc]"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>Plans</div>
                <div className="flex items-center gap-[7px] px-3 py-[7px] text-[10.5px] font-semibold text-[#475569] cursor-pointer hover:bg-[#f8fafc]"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>Alerts</div>
                <div className="flex items-center gap-[7px] px-3 py-[7px] text-[10.5px] font-semibold text-[#475569] cursor-pointer hover:bg-[#f8fafc]"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>Notifications</div>
                <div className="flex items-center gap-[7px] px-3 py-[7px] text-[10.5px] font-semibold text-[#475569] cursor-pointer hover:bg-[#f8fafc]"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>AI Settings</div>
              </div>
              <div className="flex-1 px-5 py-4 overflow-y-auto">
                <div className="flex items-center gap-2.5 mb-1">
                  <div className="w-7 h-7 rounded-full bg-[linear-gradient(135deg,#7c3aed,#0D47A1)] flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.5 2A2.5 2.5 0 017 4.5v0A2.5 2.5 0 014.5 7H4a2 2 0 00-2 2"/></svg>
                  </div>
                  <span className="text-base font-extrabold text-[#0f172a]">Usage &amp; Limits</span>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-[#16a34a] bg-[#dcfce7] px-2 py-0.5 rounded-full"><span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] inline-block" />Live</span>
                </div>
                <div className="text-[11px] text-[#64748b] mb-4">Service usage metering, plan limits &amp; access controls across your workspace</div>

                <div className="grid grid-cols-3 gap-2 mb-3.5">
                  <div className="bg-white border border-[#f1f5f9] rounded-[10px] px-3.5 py-3">
                    <div className="text-[9px] font-bold uppercase tracking-[1px] text-[#94a3b8] mb-1.5">AI Requests (Month)</div>
                    <div className="text-lg font-extrabold text-[#0f172a]">194</div>
                  </div>
                  <div className="bg-white border border-[#f1f5f9] rounded-[10px] px-3.5 py-3">
                    <div className="text-[9px] font-bold uppercase tracking-[1px] text-[#94a3b8] mb-1.5">Services Active</div>
                    <div className="text-lg font-extrabold text-[#0f172a]">4 <span className="text-xs font-medium text-[#94a3b8]">of 5</span></div>
                  </div>
                  <div className="bg-white border border-[#f1f5f9] rounded-[10px] px-3.5 py-3">
                    <div className="text-[9px] font-bold uppercase tracking-[1px] text-[#94a3b8] mb-1.5">Usage Health</div>
                    <div className="text-lg font-extrabold text-[#16a34a]">Healthy</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-2.5">
                  <div className="bg-white border border-[#f1f5f9] rounded-[10px] px-4 py-3.5">
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="text-lg text-[#0D47A1]"><ChatCircle size={19} weight="duotone" /></span>
                      <div><div className="text-xs font-extrabold text-[#0f172a]">KronChat</div><div className="text-[10px] text-[#64748b]">AI-powered customer conversations</div></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-[#64748b] mb-1"><span>Month</span><span className="font-semibold text-[#0f172a]">13 / 50.0K</span></div>
                    <div className="h-1 bg-[#f1f5f9] rounded-sm overflow-hidden mb-[3px]"><div className="h-full w-[0.03%] bg-[#0D47A1] rounded-sm" /></div>
                    <div className="text-[9px] text-[#94a3b8] text-right">0.0%</div>
                  </div>
                  <div className="bg-white border border-[#f1f5f9] rounded-[10px] px-4 py-3.5">
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="text-lg text-[#0D47A1]"><DeviceMobile size={19} weight="duotone" /></span>
                      <div><div className="text-xs font-extrabold text-[#0f172a]">Socials</div><div className="text-[10px] text-[#64748b]">AI content generation &amp; copilot</div></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-[#64748b] mb-1"><span>Month</span><span className="font-semibold text-[#0f172a]">62 / 20.0K</span></div>
                    <div className="h-1 bg-[#f1f5f9] rounded-sm overflow-hidden mb-[3px]"><div className="h-full w-[0.3%] bg-[#0D47A1] rounded-sm" /></div>
                    <div className="text-[9px] text-[#94a3b8] text-right">0.3%</div>
                  </div>
                  <div className="bg-white border border-[#f1f5f9] rounded-[10px] px-4 py-3.5">
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="text-lg text-[#0D47A1]"><Lightbulb size={19} weight="duotone" /></span>
                      <div><div className="text-xs font-extrabold text-[#0f172a]">Listening</div><div className="text-[10px] text-[#64748b]">Brand monitoring &amp; sentiment AI</div></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-[#64748b] mb-1"><span>Month</span><span className="font-semibold text-[#0f172a]">13 / 50.0K</span></div>
                    <div className="h-1 bg-[#f1f5f9] rounded-sm overflow-hidden mb-[3px]"><div className="h-full w-[0.03%] bg-[#0D47A1] rounded-sm" /></div>
                    <div className="text-[9px] text-[#94a3b8] text-right">0.0%</div>
                  </div>
                  <div className="bg-white border border-[#f1f5f9] rounded-[10px] px-4 py-3.5">
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="text-lg text-[#0D47A1]"><Brain size={19} weight="duotone" /></span>
                      <div><div className="text-xs font-extrabold text-[#0f172a]">Knowledge</div><div className="text-[10px] text-[#64748b]">RAG chat &amp; knowledge queries</div></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-[#64748b] mb-1"><span>Day</span><span className="font-semibold text-[#0f172a]">4 / 5.0K</span></div>
                    <div className="h-1 bg-[#f1f5f9] rounded-sm overflow-hidden mb-[3px]"><div className="h-full w-[0.1%] bg-[#0D47A1] rounded-sm" /></div>
                    <div className="text-[9px] text-[#94a3b8] text-right">0.1%</div>
                  </div>
                </div>

                <div className="bg-white border border-[#f1f5f9] rounded-[10px] px-4 py-3.5 mb-3">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="text-lg text-[#0D47A1]"><Megaphone size={19} weight="duotone" /></span>
                    <div><div className="text-xs font-extrabold text-[#0f172a]">Campaigns</div><div className="text-[10px] text-[#64748b]">AI campaign content &amp; scheduling</div></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-[#64748b] mb-1"><span>Month</span><span className="font-semibold text-[#0f172a]">0 / 10.0K</span></div>
                  <div className="h-1 bg-[#f1f5f9] rounded-sm overflow-hidden mb-[3px]"><div className="h-full w-[0%] bg-[#0D47A1] rounded-sm" /></div>
                  <div className="text-[9px] text-[#94a3b8] text-right">0.0%</div>
                </div>

                <div className="bg-white border border-[#f1f5f9] rounded-[10px] px-4 py-3.5">
                  <div className="text-[9px] font-bold uppercase tracking-[1px] text-[#94a3b8] mb-3">Platform AI Totals</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="border border-[#f1f5f9] rounded-lg px-3 py-2.5">
                      <div className="flex items-center gap-1.5 mb-1"><span className="text-[11px] text-[#0D47A1]"><Lightning size={11} weight="duotone" /></span><span className="text-[10px] font-bold text-[#374151]">AI Requests (Daily Rate)</span><span className="text-[9px] text-[#94a3b8] ml-auto">Day</span></div>
                      <div className="text-lg font-extrabold text-[#0f172a]">53</div>
                      <div className="text-[9px] text-[#64748b] mb-1">of 10.0K</div>
                      <div className="h-[3px] bg-[#f1f5f9] rounded-sm overflow-hidden"><div className="h-full w-[0.5%] bg-[#0D47A1] rounded-sm" /></div>
                    </div>
                    <div className="border border-[#f1f5f9] rounded-lg px-3 py-2.5">
                      <div className="flex items-center gap-1.5 mb-1"><span className="text-[11px] text-[#0D47A1]"><Lightning size={11} weight="duotone" /></span><span className="text-[10px] font-bold text-[#374151]">AI Requests</span><span className="text-[9px] text-[#94a3b8] ml-auto">Month</span></div>
                      <div className="text-lg font-extrabold text-[#0f172a]">194</div>
                      <div className="text-[9px] text-[#64748b] mb-1">of 100.0K</div>
                      <div className="h-[3px] bg-[#f1f5f9] rounded-sm overflow-hidden"><div className="h-full w-[0.2%] bg-[#0D47A1] rounded-sm" /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>{/* /view-usage */}

        </div>{/* /kd-main */}

        {/* View indicator dots */}
        <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 flex gap-1.5 z-50 items-center">
          {AUTO_VIEWS.map(v => (
            <div
              key={v}
              className={`${kdViewDotBase} ${activeView === v ? kdViewDotActive : ''}`}
              onClick={() => handleNavClick(v)}
            />
          ))}
        </div>

        {/* Toast notifications */}
        {toasts.map(t => (
          <div
            key={t.id}
            onClick={() => dismissToast(t.id)}
            className={`absolute bottom-[18px] right-[18px] bg-white border border-[#e2e8f0] border-l-[3px] border-l-[#0D47A1] rounded-[10px] px-3.5 py-2.5 flex items-center gap-2.5 z-[999] min-w-[210px] max-w-[270px] cursor-pointer transition-[transform,opacity] duration-[360ms] ease-[cubic-bezier(.34,1.56,.64,1)] ${t.leaving || !t.shown ? 'translate-x-[calc(100%+24px)] opacity-0' : 'translate-x-0 opacity-100'}`}
          >
            <span className="shrink-0 text-[#0D47A1]"><t.icon size={18} weight="duotone" /></span>
            <div className="flex-1">
              <div className="text-[11px] font-extrabold text-[#0f172a] mb-0.5">{t.title}</div>
              <div className="text-[10px] text-[#64748b] leading-[1.4]">{t.sub}</div>
            </div>
            <span
              className="ml-auto text-sm text-[#94a3b8] shrink-0 pl-1.5"
              onClick={(e) => { e.stopPropagation(); dismissToast(t.id); }}
            >×</span>
          </div>
        ))}

      </div>{/* /kd */}
    </div>
  );
}
