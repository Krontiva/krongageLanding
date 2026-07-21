'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

const INDUSTRIES = [
  { id: 'banking',    label: 'Banking & Finance',  h3: 'Compliant, Personalised Banking Engagement', p: "Deliver real-time transaction alerts, fraud notifications, and personalised financial guidance across WhatsApp, SMS, and email, all within a fully compliant, bank-grade platform.", href: '/solutions/banking', cta: 'Explore Banking Solutions →', iframe: '/assets/hero-banking.html' },
  { id: 'telecom',    label: 'Telecommunications', h3: 'Customer Retention at Telecom Scale',        p: "Reduce churn with proactive usage alerts, data bundle promotions, and AI-powered support. Manage millions of subscribers across every channel from one unified platform.",         href: '/solutions/telecom', cta: 'Explore Telecom Solutions →',  iframe: '/assets/hero-telecom.html' },
  { id: 'fmcg',       label: 'FMCG & Retail',      h3: 'Drive Sales Across Every Consumer Touchpoint', p: "Connect with consumers at the point of purchase, run loyalty campaigns, and gather real-time market intelligence, from urban retail chains to last-mile distribution networks.", href: '/solutions/fmcg',   cta: 'Explore FMCG & Retail →',    iframe: '/assets/hero-fmcg.html' },
  { id: 'healthcare', label: 'Healthcare',          h3: 'Patient Engagement That Improves Outcomes',  p: "Reduce no-shows with automated appointment reminders, support medication adherence, and securely deliver health information to patients across SMS, WhatsApp, and web.",       href: '/solutions/healthcare', cta: 'Explore Healthcare →',     iframe: '/assets/hero-healthcare.html' },
  { id: 'insurance',  label: 'Insurance',           h3: 'End-to-End Insurance Customer Journeys',    p: "Accelerate policy onboarding, automate renewal reminders, and guide claimants through every step of the process, reducing drop-offs and improving policyholder satisfaction.", href: '/solutions/insurance', cta: 'Explore Insurance →',    iframe: '/assets/hero-insurance.html' },
  { id: 'government', label: 'Government',          h3: 'Smart Government-to-Citizen Communications', p: "Keep citizens informed across SMS, WhatsApp, and web at every step of their service journey, from permit applications to tax deadlines, boosting digital self-service rates.", href: '/solutions/government', cta: 'Explore Government →',  iframe: '/assets/hero-government.html' },
];

const FEATURES = [
  { icon: '📥', title: 'Omnichannel Inbox',      desc: 'All channels, AI routing, one unified view' },
  { icon: '📣', title: 'Social Publishing',      desc: 'Multi-platform, bulk scheduling' },
  { icon: '🤖', title: 'AI Automation',          desc: 'Agents, RAG knowledge, smart flows' },
  { icon: '🗃️', title: 'Customer 360',           desc: 'Unified profiles, segmentation' },
  { icon: '📊', title: 'Campaign Management',    desc: 'Journey builder, A/B testing' },
  { icon: '📈', title: 'Analytics & BI',         desc: 'Dashboards, white-label reports' },
  { icon: '🔍', title: 'Social Intelligence',    desc: 'Sentiment tracking, brand monitoring' },
  { icon: '🛡️', title: 'Security & Compliance', desc: 'SOC 2, HIPAA, encryption, audit logs' },
];

const ORBIT_CHIPS = [
  { bg: '#0A66C2', svg: <svg viewBox="0 0 32 32" fill="white" style={{width:34,height:34}}><path d="M7 5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zm-2 7h4v15H5V12zm6.5 0H15v2.05c.7-1.3 2.3-2.45 4.5-2.45C23.5 11.6 26 14 26 18.5V27h-4v-8c0-2.1-.8-3.5-2.7-3.5-1.5 0-2.4 1-2.8 2-.14.35-.2.84-.2 1.33V27h-4V12z"/></svg> },
  { bg: '#fff',     svg: <svg viewBox="0 0 32 32" fill="none" style={{width:34,height:34}}><rect x="4" y="8" width="24" height="16" rx="1.5" fill="#F2F2F2"/><path d="M4 8l12 9 12-9" stroke="#EA4335" strokeWidth="2"/><path d="M4 8v16l7-8z" fill="#34A853"/><path d="M28 8v16l-7-8z" fill="#FBBC04"/><path d="M4 24l7-8 5 4 5-4 7 8z" fill="#EA4335"/></svg> },
  { bg: '#000',     svg: <svg viewBox="0 0 32 32" fill="white" style={{width:34,height:34}}><path d="M17.75 14.77L25.3 6h-1.8l-6.57 7.63L11.62 6H6l7.93 11.55L6 26h1.8l6.93-8.05L20.38 26H26l-8.25-11.23zm-2.45 2.85l-.8-1.15-6.38-9.12h2.75l5.16 7.38.8 1.14 6.69 9.57h-2.75l-5.47-7.82z"/></svg> },
  { bg: 'radial-gradient(circle at 30% 107%,#fdf497 0%,#fdf497 5%,#fd5949 45%,#d6249f 60%,#285AEB 90%)', svg: <svg viewBox="0 0 32 32" fill="white" style={{width:34,height:34}}><path d="M16 4c-3.26 0-3.67.014-4.947.072-1.277.058-2.148.261-2.913.558a5.88 5.88 0 00-2.126 1.384A5.88 5.88 0 004.63 8.14c-.297.765-.5 1.636-.558 2.913C4.014 12.33 4 12.74 4 16s.014 3.67.072 4.947c.058 1.277.261 2.148.558 2.913a5.88 5.88 0 001.384 2.126 5.88 5.88 0 002.126 1.384c.765.297 1.636.5 2.913.558C11.33 27.986 11.74 28 16 28s3.67-.014 4.947-.072c1.277-.058 2.148-.261 2.913-.558a5.88 5.88 0 002.126-1.384 5.88 5.88 0 001.384-2.126c.297-.765.5-1.636.558-2.913.058-1.277.072-1.687.072-4.947s-.014-3.67-.072-4.947c-.058-1.277-.261-2.148-.558-2.913a5.88 5.88 0 00-1.384-2.126A5.88 5.88 0 0023.86 4.63c-.765-.297-1.636-.5-2.913-.558C19.67 4.014 19.26 4 16 4zm0 2.162c3.204 0 3.584.012 4.85.07 1.17.053 1.805.249 2.228.413.56.218.96.478 1.38.898.42.42.68.82.898 1.38.164.423.36 1.058.413 2.228.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.053 1.17-.249 1.805-.413 2.228-.218.56-.478.96-.898 1.38-.42.42-.82.68-1.38.898-.423.164-1.058.36-2.228.413-1.265.058-1.645.07-4.85.07s-3.585-.012-4.85-.07c-1.17-.053-1.805-.249-2.228-.413a3.71 3.71 0 01-1.38-.898 3.71 3.71 0 01-.898-1.38c-.164-.423-.36-1.058-.413-2.228C6.174 19.584 6.162 19.204 6.162 16s.012-3.584.07-4.85c.053-1.17.249-1.805.413-2.228.218-.56.478-.96.898-1.38.42-.42.82-.68 1.38-.898.423-.164 1.058-.36 2.228-.413 1.266-.058 1.646-.07 4.85-.07zM16 10.838a5.162 5.162 0 100 10.324 5.162 5.162 0 000-10.324zM16 19a3 3 0 110-6 3 3 0 010 6zm5.338-9.87a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z"/></svg> },
  { bg: '#1877F2',  svg: <svg viewBox="0 0 32 32" fill="white" style={{width:34,height:34}}><path d="M29 16C29 8.82 23.18 3 16 3S3 8.82 3 16c0 6.63 4.86 12.13 11.21 13.08V19.84h-3.37V16h3.37v-2.93c0-3.33 1.98-5.16 5.01-5.16 1.45 0 2.97.26 2.97.26v3.27h-1.67c-1.65 0-2.16 1.02-2.16 2.07V16h3.68l-.59 3.84h-3.09v9.24C24.14 28.13 29 22.63 29 16z"/></svg> },
  { bg: 'linear-gradient(135deg,#0099FF 0%,#A033FF 100%)', svg: <svg viewBox="0 0 32 32" fill="white" style={{width:34,height:34}}><path d="M16 3C8.82 3 3 8.46 3 15.19c0 3.79 1.87 7.16 4.8 9.38V29l4.37-2.4A13.3 13.3 0 0016 27.38c7.18 0 13-5.46 13-12.19C29 8.46 23.18 3 16 3zm1.29 16.41l-3.3-3.52-6.45 3.52 7.1-7.54 3.38 3.52 6.36-3.52-7.09 7.54z"/></svg> },
  { bg: '#010101',  svg: <svg viewBox="0 0 32 32" fill="none" style={{width:34,height:34}}><path d="M22.5 6.5a5.5 5.5 0 01-4.5-5h-3.5v14l-.01 6.9a3.2 3.2 0 01-3.19 2.6 3.2 3.2 0 01-3.2-3.2 3.2 3.2 0 013.2-3.2c.32 0 .62.05.9.13V15.1a7.2 7.2 0 00-.9-.06 6.8 6.8 0 00-6.8 6.8A6.8 6.8 0 0011.3 28.62a6.8 6.8 0 006.7-6.8V14a9.1 9.1 0 005.5 1.85v-3.6a5.52 5.52 0 01-1-.18z" fill="white"/></svg> },
  { bg: '#25D366',  svg: <svg viewBox="0 0 32 32" fill="none" style={{width:34,height:34}}><path d="M16 3C8.82 3 3 8.82 3 16c0 2.45.66 4.74 1.8 6.72L3 29l6.52-1.71A13 13 0 0016 29c7.18 0 13-5.82 13-13S23.18 3 16 3z" fill="white"/><path d="M21.8 19.1c-.28-.14-1.66-.82-1.92-.91-.25-.1-.44-.14-.63.14-.19.28-.73.91-.9 1.1-.16.19-.33.21-.61.07-.28-.14-1.19-.44-2.27-1.4-.84-.75-1.4-1.67-1.57-1.95-.16-.28-.02-.43.12-.57.12-.12.28-.33.42-.49.14-.16.19-.28.28-.47.09-.19.05-.35-.02-.49-.07-.14-.63-1.53-.87-2.1-.23-.55-.47-.47-.63-.48h-.54c-.19 0-.49.07-.75.35-.26.28-.97.95-.97 2.32s.99 2.7 1.13 2.89c.14.19 1.96 3 4.76 4.2.67.29 1.19.46 1.6.59.67.22 1.28.19 1.76.11.54-.08 1.66-.68 1.9-1.33.23-.65.23-1.21.16-1.33-.07-.11-.26-.18-.54-.32z" fill="#25D366"/></svg> },
  { bg: '#2AABEE',  svg: <svg viewBox="0 0 32 32" fill="none" style={{width:34,height:34}}><path d="M28.1 5.3L3.6 14.9c-1.6.65-1.59 1.55-.29 1.95l6.32 1.97 14.6-9.2c.68-.42 1.31-.19.8.26L11.8 19.3l-.45 6.54c.66 0 .95-.3 1.31-.65l3.16-3.07 6.57 4.86c1.21.67 2.08.32 2.38-1.13l4.3-20.33c.44-1.76-.66-2.56-1.17-2.27z" fill="white"/></svg> },
];

export default function HomePage() {
  const [activeIndustry, setActiveIndustry] = useState('banking');
  const orbitRef = useRef<HTMLDivElement>(null);
  const slotsRef = useRef<HTMLDivElement[]>([]);
  const angleRef = useRef(-Math.PI / 2);
  const lastRef = useRef<number | null>(null);
  const pausedRef = useRef(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const slots = slotsRef.current;
    const N = slots.length;
    const RADIUS = 182;
    const SPEED = (2 * Math.PI) / 20000;

    const step = (ts: number) => {
      if (lastRef.current !== null && !pausedRef.current) {
        angleRef.current += SPEED * (ts - lastRef.current);
      }
      lastRef.current = ts;
      slots.forEach((slot, i) => {
        if (!slot) return;
        const a = angleRef.current + (i * 2 * Math.PI) / N;
        slot.style.transform = `translate(${Math.cos(a) * RADIUS}px,${Math.sin(a) * RADIUS}px)`;
      });
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const activeInd = INDUSTRIES.find(i => i.id === activeIndustry)!;

  return (
    <>
      <style>{`
        .hero-section{background:#f0f7ff}
        .hero{display:flex;align-items:center;justify-content:space-between;padding:80px 60px 90px;max-width:1200px;margin:0 auto;gap:56px}
        .hero-left{max-width:540px}
        .hero-left h1{font-size:52px;font-weight:800;line-height:1.1;color:#0D47A1;margin-bottom:20px;letter-spacing:-1px}
        .hero-left p{font-size:16px;line-height:1.75;color:#475569;margin-bottom:36px}
        .hero-buttons{display:flex;gap:14px;flex-wrap:wrap}
        .btn-primary{background:#0D47A1;color:#fff;padding:13px 28px;border-radius:50px;font-size:15px;font-weight:700}
        .btn-primary:hover{background:#0a3a84}
        .btn-outline{background:transparent;color:#0D47A1;padding:13px 28px;border-radius:50px;font-size:15px;font-weight:700;border:2px solid #0D47A1}
        .btn-outline:hover{background:#0D47A1;color:#fff}
        .orbit-wrap{position:relative;width:440px;height:440px;flex-shrink:0}
        .orbit-ring{position:absolute;inset:26px;border-radius:50%;border:1.5px dashed rgba(13,71,161,.15);pointer-events:none}
        .orbit-center-logo{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:116px;height:116px;background:#fff;border-radius:30px;box-shadow:0 8px 48px rgba(13,71,161,.22),0 2px 8px rgba(0,0,0,.07);display:flex;align-items:center;justify-content:center;z-index:10}
        .orbit-center-logo img{width:80px;height:80px;object-fit:contain}
        .orbit-icon-slot{position:absolute;top:50%;left:50%;width:64px;height:64px;margin:-32px 0 0 -32px}
        .orbit-chip{width:64px;height:64px;border-radius:18px;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 22px rgba(0,0,0,.18);transition:transform .22s,box-shadow .22s}
        .orbit-chip:hover{transform:scale(1.13);box-shadow:0 12px 36px rgba(0,0,0,.26)}
        .problem{position:relative;padding:90px 60px;overflow:hidden}
        .problem-bg{position:absolute;inset:0;background:url('/assets/tomanySection.jpg') center/cover no-repeat;opacity:.4;z-index:0}
        .problem-inner{display:flex;align-items:center;gap:80px;max-width:1200px;margin:0 auto;position:relative;z-index:1}
        .problem-mockup{flex-shrink:0;width:420px}
        .problem-text h2{font-size:42px;font-weight:800;line-height:1.2;color:#0D47A1;margin-bottom:20px;letter-spacing:-.5px}
        .problem-text p{font-size:16px;line-height:1.7;color:#1e293b}
        .platform-section{padding:90px 60px;max-width:1200px;margin:0 auto;display:flex;align-items:flex-start;gap:80px}
        .platform-left{max-width:360px;flex-shrink:0}
        .platform-left h2{font-size:42px;font-weight:800;line-height:1.15;color:#0D47A1;margin-bottom:20px;letter-spacing:-.5px}
        .platform-left p{font-size:15px;line-height:1.7;color:#475569;margin-bottom:32px}
        .btn-outline-blue{display:inline-block;background:transparent;color:#0D47A1;padding:12px 24px;border-radius:50px;font-size:14px;font-weight:700;border:2px solid #0D47A1}
        .btn-outline-blue:hover{background:#0D47A1;color:#fff}
        .feature-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;flex:1}
        .feature-card{background:#EEF5FD;border-radius:14px;padding:18px 16px;display:flex;align-items:flex-start;gap:14px;transition:box-shadow .2s,transform .2s}
        .feature-card:hover{box-shadow:0 6px 24px rgba(13,71,161,.12);transform:translateY(-2px)}
        .feature-icon{width:40px;height:40px;border-radius:10px;background:#0D47A1;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0}
        .feature-text h4{font-size:14px;font-weight:700;color:#0D47A1;margin-bottom:4px}
        .feature-text p{font-size:12px;color:#64748b;line-height:1.5}
        .industries-section{padding:90px 60px;background:#f8fafc}
        .industries-inner{max-width:1100px;margin:0 auto}
        .industries-header{text-align:center;margin-bottom:48px}
        .industries-header h2{font-size:42px;font-weight:800;color:#0D47A1;letter-spacing:-.5px;line-height:1.15;margin-bottom:14px}
        .industries-header p{font-size:16px;color:#64748b;line-height:1.7;max-width:560px;margin:0 auto}
        .ind-tabs{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-bottom:40px}
        .ind-tab{padding:10px 22px;border-radius:50px;font-size:14px;font-weight:600;border:2px solid #e2e8f0;color:#475569;background:#fff;cursor:pointer;transition:all .2s}
        .ind-tab:hover{border-color:#0D47A1;color:#0D47A1}
        .ind-tab.active{background:#0D47A1;border-color:#0D47A1;color:#fff}
        .ind-panel{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center}
        .ind-panel-text h3{font-size:30px;font-weight:800;color:#0D47A1;letter-spacing:-.3px;margin-bottom:14px}
        .ind-panel-text p{font-size:15px;color:#475569;line-height:1.75;margin-bottom:28px}
        .ind-iframe-wrap{border-radius:20px;overflow:hidden;height:420px;box-shadow:0 16px 56px rgba(13,71,161,.15)}
        .ind-iframe-wrap iframe{width:100%;height:100%;border:none;display:block}
        .dashboard-section{background:linear-gradient(197deg,#04204B 6%,#0D47A1 63%);padding:90px 60px;text-align:center}
        .demo-heading{font-size:38px;font-weight:800;color:#fff;max-width:700px;margin:0 auto 16px;line-height:1.2}
        .demo-sub{font-size:16px;color:rgba(255,255,255,.75);max-width:620px;margin:0 auto 48px;line-height:1.75}
        .demo-dashboard-wrap{max-width:920px;margin:0 auto 40px;border-radius:16px;overflow:hidden;box-shadow:0 16px 60px rgba(0,0,0,.35)}
        #demoDashboard{width:100%;height:610px;display:block;border:none;border-radius:16px}
        .dashboard-buttons{display:flex;justify-content:center;gap:16px;flex-wrap:wrap}
        .btn-demo{background:#fff;color:#0D47A1;padding:13px 28px;border-radius:50px;font-size:15px;font-weight:700;border:2px solid #fff;display:inline-flex;align-items:center;gap:8px}
        .btn-demo:hover{background:transparent;color:#fff}
        .btn-explore-hp{background:transparent;color:#fff;padding:13px 28px;border-radius:50px;font-size:15px;font-weight:700;border:2px solid rgba(255,255,255,.5);display:inline-flex;align-items:center;gap:8px}
        .btn-explore-hp:hover{border-color:#fff;background:rgba(255,255,255,.1)}
        @media(max-width:900px){
          .hero{flex-direction:column;padding:48px 24px;gap:32px;text-align:center}
          .hero-left{max-width:100%}
          .orbit-wrap{display:none}
          .problem{padding:56px 24px}
          .problem-inner{flex-direction:column;gap:32px}
          .problem-mockup{width:100%}
          .platform-section{flex-direction:column;padding:56px 24px;gap:36px}
          .platform-left{max-width:100%}
          .industries-section{padding:60px 24px}
          .ind-panel{grid-template-columns:1fr}
          .dashboard-section{padding:60px 24px}
        }
        @keyframes ft-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
        .ft-scene{display:grid;grid-template-columns:1fr 1fr;gap:12px;width:100%;align-items:start}
        .ft-col{display:flex;flex-direction:column;gap:12px}
        .fw{animation:ft-float var(--dur,3.8s) ease-in-out infinite var(--delay,0s)}
        .fw1{--dur:3.6s;--delay:0s}.fw2{--dur:4.1s;--delay:.7s}.fw3{--dur:3.9s;--delay:.35s}.fw4{--dur:4.3s;--delay:1.1s}
        .ft-card{background:#fff;border-radius:10px;box-shadow:0 4px 18px rgba(0,0,0,.1);overflow:hidden;position:relative}
        .ft-short{max-height:148px}
        .ft-short::after{content:'';position:absolute;bottom:0;left:0;right:0;height:44px;background:linear-gradient(to bottom,transparent,rgba(255,255,255,.96));pointer-events:none}
        .ft-bar{background:#f1f3f4;border-bottom:1px solid #e0e0e0;padding:5px 9px;display:flex;align-items:center;gap:7px}
        .ft-dots{display:flex;gap:4px}
        .ft-dot{width:7px;height:7px;border-radius:50%}
        .ft-url{flex:1;background:#fff;border:1px solid #dadce0;border-radius:20px;height:18px;display:flex;align-items:center;padding:0 7px;font-size:8.5px;color:#5f6368;gap:4px;overflow:hidden;white-space:nowrap}
        .ft-url-dot{width:5px;height:5px;border-radius:50%;flex-shrink:0}
        .ft-email-body{padding:9px 11px 11px}
        .ft-email-subject{font-size:9.5px;font-weight:800;color:#0f172a;margin-bottom:2px}
        .ft-email-from{font-size:8.5px;color:#64748b;margin-bottom:7px}
        .ft-email-rows{display:flex;flex-direction:column;gap:3px}
        .ft-email-row{display:flex;align-items:center;gap:5px;padding:3px 5px;border-radius:4px;background:#f8fafc}
        .ft-email-row.unread{background:#eff6ff}
        .ft-er-dot{width:5px;height:5px;border-radius:50%;background:#e2e8f0;flex-shrink:0}
        .ft-email-row.unread .ft-er-dot{background:#3b82f6}
        .ft-er-line{flex:1;height:5px;border-radius:3px;background:#e2e8f0}
        .ft-email-row.unread .ft-er-line{background:#bfdbfe}
        .ft-er-time{font-size:7.5px;color:#94a3b8}
        .ft-email-note{font-size:7.5px;color:#94a3b8;margin-top:7px;text-align:center;padding:3px 0;border-top:1px solid #f1f5f9}
        .ft-data-body{padding:9px 11px 11px}
        .ft-data-header{font-size:10px;font-weight:800;color:#0f172a;line-height:1.3;margin-bottom:3px}
        .ft-data-sub{font-size:8.5px;color:#64748b;margin-bottom:8px}
        .ft-dash{background:#1e293b;border-radius:5px;padding:7px;margin-bottom:7px}
        .ft-drow{display:flex;gap:4px;margin-bottom:3px}
        .ft-db{height:15px;border-radius:3px;flex:1;background:#334155}
        .ft-tools{display:flex;gap:4px;flex-wrap:wrap}
        .ft-tc{display:flex;align-items:center;gap:3px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:4px;padding:2px 5px;font-size:8px;font-weight:700;color:#374151}
        .ft-td{width:6px;height:6px;border-radius:2px}
        .ft-data-note{font-size:7.5px;color:#94a3b8;margin-top:6px;text-align:center;padding-top:5px;border-top:1px solid #f1f5f9}
        .ft-wa-header{background:#075E54;padding:7px 9px;display:flex;align-items:center;gap:6px}
        .ft-wa-av{width:20px;height:20px;border-radius:50%;background:#25D366;display:flex;align-items:center;justify-content:center;font-size:10px}
        .ft-wa-name{font-size:9.5px;font-weight:700;color:#fff}
        .ft-wa-status{font-size:7.5px;color:rgba(255,255,255,.7)}
        .ft-wa-msgs{padding:7px;background:#e5ddd5}
        .ft-wb{max-width:80%;border-radius:7px;padding:4px 6px;margin-bottom:3px;font-size:8.5px;line-height:1.4}
        .ft-wi{background:#fff;color:#0f172a;margin-right:auto;border-bottom-left-radius:2px}
        .ft-wo{background:#dcf8c6;color:#0f172a;margin-left:auto;border-bottom-right-radius:2px}
        .ft-wt{font-size:7px;color:#94a3b8;text-align:right}
        .ft-wa-footer{background:#f0f0f0;padding:4px 7px;display:flex;gap:4px;align-items:center}
        .ft-wa-input{flex:1;background:#fff;border-radius:20px;height:18px;font-size:8.5px;padding:0 6px;color:#94a3b8;display:flex;align-items:center}
        .ft-wa-send{width:18px;height:18px;border-radius:50%;background:#075E54;display:flex;align-items:center;justify-content:center;font-size:8px;color:#fff}
        .ft-wa-label{padding:6px 9px 9px}
        .ft-wa-lt{font-size:9.5px;font-weight:800;color:#0f172a}
        .ft-wa-ls{font-size:8px;color:#64748b;margin-top:2px}
        .ft-x-body{padding:9px 11px 11px}
        .ft-x-post{display:flex;gap:6px;margin-bottom:7px}
        .ft-x-av{width:24px;height:24px;border-radius:50%;background:#000;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:800}
        .ft-x-name{font-size:9px;font-weight:800;color:#0f172a}
        .ft-x-text{font-size:8.5px;color:#0f172a;line-height:1.5;margin-top:2px}
        .ft-badge{display:inline-flex;align-items:center;gap:4px;background:#fff;border:1px solid #e2e8f0;border-radius:20px;padding:3px 7px 3px 4px;font-size:8.5px;font-weight:700;color:#374151;margin:7px 9px 0}
        .ft-badge-dot{width:14px;height:14px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:8px}
      `}</style>

      {/* HERO */}
      <section className="hero-section">
        <div className="hero">
          <div className="hero-left">
            <h1>Meet your customers wherever they are.</h1>
            <p>Technology should be the bridge to customers, not the barrier. KronGage transforms fragmented data into a single, intelligent conversation, allowing teams to move past the &apos;search&apos; and straight to the &apos;solution&apos;.</p>
            <div className="hero-buttons">
              <Link href="/contact" className="btn-primary">Request a Demo</Link>
              <Link href="/platform" className="btn-outline">Explore the Platform</Link>
            </div>
          </div>
          <div
            className="orbit-wrap"
            ref={orbitRef}
            onMouseEnter={() => { pausedRef.current = true; }}
            onMouseLeave={() => { pausedRef.current = false; }}
          >
            <div className="orbit-ring" />
            <div className="orbit-center-logo">
              <img src="/Krongage-Logo.png" alt="KronGage" />
            </div>
            {ORBIT_CHIPS.map((chip, i) => (
              <div key={i} className="orbit-icon-slot" ref={el => { if (el) slotsRef.current[i] = el; }}>
                <div className="orbit-chip" style={{ background: chip.bg }}>{chip.svg}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="problem">
        <div className="problem-bg" />
        <div className="problem-inner">
          <div className="problem-mockup">
            <div className="ft-scene">
              <div className="ft-col">
                <div className="fw fw1"><div className="ft-card ft-short">
                  <div className="ft-bar"><div className="ft-dots"><div className="ft-dot" style={{background:'#ff5f57'}}/>
                  <div className="ft-dot" style={{background:'#febc2e'}}/><div className="ft-dot" style={{background:'#28c840'}}/></div>
                  <div className="ft-url"><div className="ft-url-dot" style={{background:'#EA4335'}}/>mail.google.com</div></div>
                  <div className="ft-email-body">
                    <div className="ft-email-subject">Email Welcome Series</div>
                    <div className="ft-email-from">Automated · 3 sequences</div>
                    <div className="ft-email-rows">
                      <div className="ft-email-row unread"><div className="ft-er-dot"/><div className="ft-er-line"/><div className="ft-er-time">9:41</div></div>
                      <div className="ft-email-row unread"><div className="ft-er-dot"/><div className="ft-er-line" style={{width:'65%'}}/><div className="ft-er-time">9:38</div></div>
                      <div className="ft-email-row"><div className="ft-er-dot"/><div className="ft-er-line"/><div className="ft-er-time">Tue</div></div>
                    </div>
                    <div className="ft-email-note">Separate login. No CRM sync.</div>
                  </div>
                </div></div>
                <div className="fw fw2"><div className="ft-card">
                  <div className="ft-bar"><div className="ft-dots"><div className="ft-dot" style={{background:'#ff5f57'}}/><div className="ft-dot" style={{background:'#febc2e'}}/><div className="ft-dot" style={{background:'#28c840'}}/></div>
                  <div className="ft-url"><div className="ft-url-dot" style={{background:'#4285f4'}}/>crm.dashboard.io</div></div>
                  <div className="ft-data-body">
                    <div className="ft-data-header">Your Fragmented<br/>Data Ecosystem</div>
                    <div className="ft-data-sub">Connects to nothing, confusing everything</div>
                    <div className="ft-dash">
                      <div className="ft-drow"><div className="ft-db" style={{background:'#3b82f6',flex:1.5}}/><div className="ft-db" style={{flex:.6}}/></div>
                      <div className="ft-drow"><div className="ft-db" style={{flex:.6}}/><div className="ft-db" style={{background:'#f59e0b',flex:1.5}}/><div className="ft-db"/></div>
                    </div>
                    <div className="ft-tools">
                      <div className="ft-tc"><div className="ft-td" style={{background:'#EA4335',borderRadius:'50%'}}/>Gmail</div>
                      <div className="ft-tc"><div className="ft-td" style={{background:'#4A154B'}}/>Slack</div>
                    </div>
                    <div className="ft-data-note">Multiple logins. Creates data silos.</div>
                  </div>
                </div></div>
              </div>
              <div className="ft-col">
                <div className="fw fw3"><div className="ft-card">
                  <div className="ft-badge"><div className="ft-badge-dot" style={{background:'#25D366'}}>🟢</div>A Meta Service</div>
                  <div className="ft-wa-header"><div className="ft-wa-av">💬</div><div><div className="ft-wa-name">Customer Support</div><div className="ft-wa-status">online</div></div></div>
                  <div className="ft-wa-msgs">
                    <div className="ft-wb ft-wi">Hi, I need help with my order</div>
                    <div className="ft-wb ft-wo">Of course! Let me check.</div>
                  </div>
                  <div className="ft-wa-footer"><div className="ft-wa-input">Message</div><div className="ft-wa-send">➤</div></div>
                  <div className="ft-wa-label"><div className="ft-wa-lt">Connected WhatsApp</div><div className="ft-wa-ls">Instant connection, but still disjointed data.</div></div>
                </div></div>
                <div className="fw fw4"><div className="ft-card ft-short">
                  <div className="ft-x-body">
                    <div className="ft-x-post"><div className="ft-x-av">R</div><div><div className="ft-x-name">Reku</div><div className="ft-x-text">Flash sale ends tonight ⚡ Don&apos;t miss out!</div></div></div>
                  </div>
                </div></div>
              </div>
            </div>
          </div>
          <div className="problem-text">
            <h2>Too many tools, not enough connection.</h2>
            <p>Most businesses are slowed down by a &apos;fragmented stack&apos;, using separate, disconnected tools for WhatsApp, social media, support, and analytics. The result? Missed conversations, duplicate effort, and a customer experience that feels anything but seamless.</p>
          </div>
        </div>
      </section>

      {/* PLATFORM FEATURES */}
      <section>
        <div className="platform-section">
          <div className="platform-left">
            <h2>One platform that thinks in systems, not silos.</h2>
            <p>KronGage was engineered to excel in demanding environments, where infrastructure varies, regulations shift, and customer behaviour is diverse. It&apos;s robust because it had to be.</p>
            <Link href="/platform" className="btn-outline-blue">View Full Platform</Link>
          </div>
          <div className="feature-grid">
            {FEATURES.map(f => (
              <div key={f.title} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <div className="feature-text">
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="industries-section">
        <div className="industries-inner">
          <div className="industries-header">
            <h2>Built for Your Industry</h2>
            <p>KronGage is engineered for the unique regulatory, operational, and customer engagement needs of Africa&apos;s most demanding sectors.</p>
          </div>
          <div className="ind-tabs">
            {INDUSTRIES.map(ind => (
              <button key={ind.id} className={`ind-tab${activeIndustry === ind.id ? ' active' : ''}`}
                onClick={() => setActiveIndustry(ind.id)}>
                {ind.label}
              </button>
            ))}
          </div>
          <div className="ind-panel">
            <div className="ind-panel-text">
              <h3>{activeInd.h3}</h3>
              <p>{activeInd.p}</p>
              <Link href={activeInd.href} style={{display:'inline-block',background:'#0D47A1',color:'#fff',padding:'13px 28px',borderRadius:'8px',fontSize:'14px',fontWeight:700}}>
                {activeInd.cta}
              </Link>
            </div>
            <div className="ind-iframe-wrap">
              <iframe src={activeInd.iframe} loading="lazy" title={activeInd.label} />
            </div>
          </div>
        </div>
      </section>

      {/* DEMO CTA */}
      <section className="dashboard-section">
        <p className="demo-heading">What Would KronGage Look Like in Action?</p>
        <p className="demo-sub">Most enterprises don&apos;t realise how much their fragmented tools are costing them in revenue and trust until they see the alternative.</p>
        <div className="demo-dashboard-wrap">
          <iframe src="/assets/dashboard-demo.html" id="demoDashboard" scrolling="no" title="KronGage Platform Preview" />
        </div>
        <div className="dashboard-buttons">
          <Link href="/contact" className="btn-demo">Request a Demo →</Link>
          <Link href="/platform" className="btn-explore-hp">⊕ Explore the Platform</Link>
        </div>
      </section>
    </>
  );
}
