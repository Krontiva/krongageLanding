import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Banking &amp; Finance — KronGage',
  description: 'KronGage – Unified Customer Engagement Platform',
};

export default function Page() {
  return (
    <>
      <style>{`

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Manrope', sans-serif; color: #1e293b; background: #f8fafc; min-height: 100vh; display: flex; flex-direction: column; }
    a { text-decoration: none; color: inherit; }
    nav { display: flex; align-items: center; justify-content: space-between; padding: 0 60px; height: 68px; background: #fff; border-bottom: 1px solid #f1f5f9; position: sticky; top: 0; z-index: 100; }
    .nav-logo img { height: 38px; width: auto; }
    .nav-links { display: flex; align-items: center; gap: 36px; list-style: none; font-size: 14px; font-weight: 600; }
    .nav-links li a { color: #475569; transition: color .2s; }
    .nav-links li a:hover { color: #0D47A1; }
    .btn-nav { background: #0D47A1; color: #fff; padding: 10px 22px; border-radius: 50px; font-size: 14px; font-weight: 700; }
    .nav-toggle { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px; }
    .nav-toggle span { display: block; width: 22px; height: 2px; background: #0f172a; border-radius: 2px; }
    .mobile-menu { display: none; flex-direction: column; background: #fff; border-top: 1px solid #f1f5f9; padding: 16px 24px 24px; gap: 4px; }
    .mobile-menu.open { display: flex; }
    .mobile-menu a { padding: 11px 0; font-size: 16px; font-weight: 600; color: #475569; border-bottom: 1px solid #f1f5f9; }
    .mobile-menu .btn-nav-mobile { margin-top: 12px; background: #0D47A1; color: #fff; padding: 13px 20px; border-radius: 50px; font-weight: 700; text-align: center; border-bottom: none; }
    footer { background: #0f172a; color: #94a3b8; padding: 24px 60px; margin-top: auto; }
    footer {
      background: #0f172a;
      color: #94a3b8;
      padding: 60px 60px 30px;
    }
    .footer-top {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 48px;
      margin-bottom: 48px;
    }
    .footer-brand .logo {
      font-size: 22px;
      font-weight: 800;
      color: #38bdf8;
      margin-bottom: 14px;
    }
    .footer-brand p {
      font-size: 13px;
      line-height: 1.7;
      color: #64748b;
      margin-bottom: 16px;
    }
    .footer-brand .dev-credit {
      font-size: 12px;
      color: #475569;
      margin-bottom: 20px;
    }
    .badge-meta {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 8px;
      padding: 10px 14px;
      font-size: 11px;
      font-weight: 600;
      color: #94a3b8;
    }
    .badge-meta .meta-icon {
      width: 28px;
      height: 28px;
      background: #0D47A1;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 14px;
      font-weight: 800;
    }
    .footer-col h4 {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #e2e8f0;
      margin-bottom: 18px;
    }
    .footer-col ul { list-style: none; }
    .footer-col ul li { margin-bottom: 10px; font-size: 13px; }
    .footer-col ul li a { color: #64748b; transition: color .2s; }
    .footer-col ul li a:hover { color: #38bdf8; }
    .footer-bottom {
      border-top: 1px solid #1e293b;
      padding-top: 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
    }
    .footer-bottom p { font-size: 12px; color: #475569; }
    .footer-legal { display: flex; gap: 20px; flex-wrap: wrap; }
    .footer-legal a { font-size: 12px; color: #475569; transition: color .2s; }
    .footer-legal a:hover { color: #38bdf8; }

    .hero { background: linear-gradient(135deg, #EEF5FD 0%, #f8fafc 100%); padding: 60px 60px 60px; }

    .hero-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; max-width: 1200px; margin: 0 auto; }
    .hero-visual { border-radius: 20px; overflow: hidden; height: 420px; box-shadow: 0 20px 60px rgba(13,71,161,.15); flex-shrink: 0; }
    .hero-visual iframe { width: 100%; height: 100%; border: none; display: block; }
    @media (max-width: 900px) { .hero-layout { grid-template-columns: 1fr; } .hero-visual { height: 320px; } }

    .breadcrumb { font-size: 13px; color: #64748b; font-weight: 500; margin-bottom: 20px; }
    .breadcrumb a { color: #0D47A1; }
    .breadcrumb span { margin: 0 6px; }
    .hero h1 { font-size: 48px; font-weight: 800; color: #0D47A1; line-height: 1.15; max-width: 720px; margin-bottom: 20px; }
    .hero p { font-size: 18px; color: #475569; max-width: 600px; line-height: 1.7; margin-bottom: 36px; }
    .hero-btns { display: flex; gap: 16px; flex-wrap: wrap; }
    .btn-primary { background: #0D47A1; color: #fff; padding: 14px 30px; border-radius: 50px; font-size: 15px; font-weight: 700; transition: background .2s; }
    .btn-primary:hover { background: #0a3a87; }
    .btn-outline { border: 2px solid #0D47A1; color: #0D47A1; padding: 12px 28px; border-radius: 50px; font-size: 15px; font-weight: 700; transition: all .2s; }
    .btn-outline:hover { background: #0D47A1; color: #fff; }

    .use-cases { background: #fff; padding: 64px 60px 48px; }
    .section-label { font-size: 12px; font-weight: 700; color: #0D47A1; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 12px; }
    .section-heading { font-size: 36px; font-weight: 800; color: #0f172a; max-width: 560px; line-height: 1.2; margin-bottom: 32px; }
    .use-case-list { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 0; }
    .use-case-item { display: flex; align-items: flex-start; gap: 16px; background: #f8fafc; border-radius: 14px; padding: 24px; border: 1px solid #e2e8f0; }
    .use-case-icon { width: 44px; height: 44px; background: #EEF5FD; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
    .use-case-item h3 { font-size: 15px; font-weight: 700; color: #0f172a; margin-bottom: 6px; }
    .use-case-item p { font-size: 13px; color: #64748b; line-height: 1.6; }

    .features { background: #f8fafc; padding: 80px 60px; }
    .cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
    .card { background: #fff; border-radius: 16px; padding: 32px 28px; border: 1px solid #e2e8f0; }
    .card-icon { width: 52px; height: 52px; background: #EEF5FD; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; margin-bottom: 18px; }
    .card h3 { font-size: 17px; font-weight: 700; color: #0f172a; margin-bottom: 10px; }
    .card p { font-size: 14px; color: #64748b; line-height: 1.65; }

    .stats { background: #EEF5FD; padding: 60px; }
    .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; text-align: center; max-width: 900px; margin: 0 auto; }
    .stat-num { font-size: 42px; font-weight: 800; color: #0D47A1; line-height: 1; margin-bottom: 8px; }
    .stat-label { font-size: 14px; color: #475569; font-weight: 600; }

    .cta-section { background: linear-gradient(197deg, #04204B 6%, #0D47A1 63%); padding: 80px 60px; text-align: center; }
    .cta-section h2 { font-size: 38px; font-weight: 800; color: #fff; margin-bottom: 16px; }
    .cta-section p { font-size: 17px; color: #bfdbfe; max-width: 500px; margin: 0 auto 36px; line-height: 1.6; }
    .btn-white { background: #fff; color: #0D47A1; padding: 14px 32px; border-radius: 50px; font-size: 15px; font-weight: 700; transition: opacity .2s; }
    .btn-white:hover { opacity: .9; }

    /* ── NAV ENHANCEMENTS ── */
    .nav-links li { position: relative; }
    .nav-links li > a { display: flex; align-items: center; gap: 4px; padding: 8px 0; }
    .nav-links li > a:hover { color: #0D47A1; }
    .btn-nav { background: #0D47A1 !important; border-radius: 50px !important; }
    .nav-links li.has-mega > a::after {
      content: ''; display: inline-block; width: 0; height: 0;
      border-left: 4px solid transparent; border-right: 4px solid transparent;
      border-top: 5px solid currentColor; margin-left: 2px; transition: transform .2s;
    }
    .nav-links li.has-mega.is-open > a::after { transform: rotate(180deg); }
    .mega-menu {
      display: none; position: fixed; top: 68px; left: 0; width: 100vw;
      background: #fff; border-top: 2px solid #0D47A1;
      box-shadow: 0 20px 60px rgba(0,0,0,.12); z-index: 199; padding: 36px 60px 40px;
    }
    .nav-links li.has-mega.is-open .mega-menu { display: block; }
    .mega-inner { display: grid; max-width: 1100px; margin: 0 auto; gap: 48px; }
    .mega-inner.cols-3 { grid-template-columns: 1.6fr 1fr 1fr; }
    .mega-inner.cols-2b { grid-template-columns: 1fr 1.4fr; }
    .mega-col-title { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; color: #94a3b8; margin-bottom: 18px; }
    .mega-brand-head { font-size: 18px; font-weight: 800; color: #0f172a; margin-bottom: 8px; }
    .mega-brand-sub { font-size: 13px; color: #64748b; line-height: 1.6; margin-bottom: 14px; }
    .mega-brand-link { font-size: 13px; font-weight: 700; color: #0D47A1; }
    .mega-feature-row { display: flex; align-items: flex-start; gap: 12px; padding: 10px 0; border-bottom: 1px solid #f1f5f9; }
    .mega-feature-row:last-child { border-bottom: none; }
    .mega-feat-icon { width: 34px; height: 34px; background: #EEF5FD; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 16px; }
    .mega-feat-text strong { display: block; font-size: 13px; font-weight: 700; color: #0f172a; margin-bottom: 2px; }
    .mega-feat-text span { font-size: 12px; color: #64748b; }
    .mega-channel-row { display: flex; align-items: center; gap: 10px; padding: 8px 0; font-size: 13px; font-weight: 600; color: #374151; border-bottom: 1px solid #f8fafc; }
    .mega-channel-row:last-child { border-bottom: none; }
    .mega-channel-icon { width: 28px; height: 28px; background: #EEF5FD; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 14px; color: #0D47A1; }
    .mega-view-all { font-size: 13px; font-weight: 700; color: #0D47A1; margin-top: 4px; display: inline-block; }
    .mega-how-card { background: #EEF5FD; border-radius: 10px; padding: 14px; margin-top: 16px; display: flex; gap: 12px; align-items: flex-start; }
    .mega-how-icon { width: 38px; height: 38px; background: #0D47A1; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
    .mega-how-text strong { font-size: 13px; font-weight: 800; color: #0f172a; display: block; margin-bottom: 4px; }
    .mega-how-text span { font-size: 12px; color: #64748b; line-height: 1.5; }
    .mega-industry-list { list-style: none; }
    .mega-industry-list li { display: flex; align-items: center; gap: 10px; padding: 9px 0; font-size: 13px; font-weight: 600; color: #374151; border-bottom: 1px solid #f8fafc; }
    .mega-industry-list li:last-child { border-bottom: none; }
    .mega-ind-icon { width: 28px; height: 28px; background: #EEF5FD; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 13px; color: #0D47A1; }
    .mega-use-row { display: flex; align-items: center; gap: 10px; padding: 9px 0; font-size: 13px; font-weight: 600; color: #374151; border-bottom: 1px solid #f8fafc; }
    .mega-use-row:last-child { border-bottom: none; }
    .mega-article-title { font-size: 14px; font-weight: 800; color: #0f172a; margin-bottom: 8px; line-height: 1.4; }
    .mega-article-sub { font-size: 12px; color: #64748b; line-height: 1.6; }

    @media (max-width: 900px) { .cards { grid-template-columns: repeat(2, 1fr); } .stats-grid { grid-template-columns: repeat(2, 1fr); } .use-case-list { grid-template-columns: 1fr; } }
    @media (max-width: 640px) {
      nav { padding: 0 20px; height: 56px; }
      .nav-links { display: none; } .btn-nav { display: none; } .nav-toggle { display: flex; }
      .hero { padding: 48px 20px 56px; } .hero h1 { font-size: 32px; }
      .use-cases { padding: 48px 20px; } .features { padding: 56px 20px; } .section-heading { font-size: 26px; }
      .cards { grid-template-columns: 1fr; }
      .stats { padding: 48px 20px; } .stats-grid { grid-template-columns: repeat(2, 1fr); }
      .cta-section { padding: 56px 20px; } .cta-section h2 { font-size: 26px; }
      footer { padding: 40px 20px 20px; }
      .footer-top { grid-template-columns: 1fr; gap: 28px; }
      .footer-brand { grid-column: auto; }
      .footer-bottom { flex-direction: column; align-items: flex-start; gap: 16px; }
    }

    /* ── Extended Solution Page Sections ── */
    .challenge-section { background: #f8fafc; padding: 72px 60px; text-align: center; border-top: 1px solid #e2e8f0; }
    .challenge-section h2 { font-size: 28px; font-weight: 800; color: #0f172a; margin-bottom: 20px; }
    .challenge-section p { font-size: 16px; color: #475569; line-height: 1.75; max-width: 760px; margin: 0 auto; }

    .opp-section { background: #fff; padding: 72px 60px; text-align: center; }
    .opp-section h2 { font-size: 26px; font-weight: 800; color: #0D47A1; margin-bottom: 40px; }
    .opp-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; max-width: 900px; margin: 0 auto; }
    .opp-stat { background: #EEF5FD; border-radius: 14px; padding: 28px 24px; text-align: left; }
    .opp-stat-num { font-size: 36px; font-weight: 800; color: #0D47A1; margin-bottom: 8px; }
    .opp-stat-lbl { font-size: 13px; color: #475569; line-height: 1.55; }

    .service-intro { background: #fff; padding: 56px 60px 36px; text-align: center; border-top: 1px solid #f1f5f9; }
    .service-intro h2 { font-size: 26px; font-weight: 800; color: #0D47A1; margin-bottom: 16px; }
    .service-intro p { font-size: 16px; color: #475569; line-height: 1.7; max-width: 760px; margin: 0 auto; }

    .feat-blocks { background: #fff; padding: 0 60px 80px; }
    .feat-block { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; padding: 56px 0; border-top: 1px solid #f1f5f9; max-width: 1080px; margin: 0 auto; }
    .feat-block.solo { grid-template-columns: 1fr; max-width: 600px; }
    .feat-visual-iframe { border-radius: 20px; overflow: hidden; height: 300px; box-shadow: 0 20px 60px rgba(13,71,161,.1); background: #f0f4f9; }
    .feat-visual-iframe iframe { width: 100%; height: 100%; border: none; display: block; }
    .feat-title { font-size: 20px; font-weight: 800; color: #0D47A1; margin-bottom: 14px; line-height: 1.3; }
    .feat-body { font-size: 15px; color: #475569; line-height: 1.7; margin-bottom: 24px; }
    .feat-btn { display: inline-block; background: #0D47A1; color: #fff; padding: 12px 28px; border-radius: 50px; font-size: 14px; font-weight: 700; transition: background .2s; }
    .feat-btn:hover { background: #0a3a87; }

    .feat-widget { background: #fff; border-radius: 16px; box-shadow: 0 8px 32px rgba(13,71,161,.14); overflow: hidden; max-width: 280px; }
    .fw-head { background: #0D47A1; padding: 12px 16px; display: flex; align-items: center; gap: 10px; }
    .fw-head-logo { width: 24px; height: 24px; background: rgba(255,255,255,.2); border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #fff; }
    .fw-head-title { font-size: 12px; font-weight: 700; color: #fff; }
    .fw-channels { display: flex; gap: 6px; padding: 12px 16px; border-bottom: 1px solid #f1f5f9; }
    .fw-ch { width: 28px; height: 28px; border-radius: 7px; background: #EEF5FD; display: flex; align-items: center; justify-content: center; font-size: 13px; }
    .fw-convs { padding: 10px 14px; }
    .fw-conv { display: flex; align-items: center; gap: 9px; padding: 7px 0; border-bottom: 1px solid #f8fafc; }
    .fw-conv:last-child { border-bottom: none; }
    .fw-av { width: 26px; height: 26px; border-radius: 50%; flex-shrink: 0; font-size: 9px; font-weight: 800; color: #fff; display: flex; align-items: center; justify-content: center; }
    .fw-conv-name { font-size: 11px; font-weight: 700; color: #0f172a; }
    .fw-conv-text { font-size: 10px; color: #94a3b8; margin-top: 1px; }
    .fw-footer { background: #f8fafc; padding: 9px 14px; display: flex; align-items: center; gap: 6px; }
    .fw-live-dot { width: 7px; height: 7px; border-radius: 50%; background: #22c55e; flex-shrink: 0; }
    .fw-live-txt { font-size: 10px; font-weight: 700; color: #16a34a; }
    .fw-agents { display: flex; margin-left: auto; }
    .fw-agent-av { width: 22px; height: 22px; border-radius: 50%; border: 2px solid #fff; margin-left: -5px; font-size: 8px; font-weight: 800; color: #fff; display: flex; align-items: center; justify-content: center; }

    .ai-feat-visual { display: flex; align-items: center; justify-content: center; position: relative; height: 240px; }
    .ai-feat-circle { width: 180px; height: 180px; border-radius: 50%; background: linear-gradient(145deg,#c8dff5,#a8c8e8); position: relative; overflow: hidden; display: flex; align-items: flex-end; justify-content: center; box-shadow: 0 8px 32px rgba(13,71,161,.18); }
    .ai-feat-fi { position: absolute; width: 32px; height: 32px; border-radius: 8px; background: #0D47A1; display: flex; align-items: center; justify-content: center; font-size: 14px; box-shadow: 0 4px 12px rgba(13,71,161,.3); }
    .ai-feat-fi.tl { top: 24px; left: 0; }
    .ai-feat-fi.tr { top: 24px; right: 0; }
    .ai-feat-fi.br { bottom: 54px; right: -4px; }

    .cta-dark { background: #0f1f3d; padding: 100px 60px; text-align: center; }
    .cta-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.12); border-radius: 50px; padding: 6px 16px; font-size: 11px; font-weight: 700; color: rgba(255,255,255,.5); margin-bottom: 28px; letter-spacing: .8px; text-transform: uppercase; }
    .cta-dark h2 { font-size: 44px; font-weight: 800; color: #fff; margin-bottom: 18px; line-height: 1.15; max-width: 760px; margin-left: auto; margin-right: auto; }
    .cta-dark > p { font-size: 17px; color: rgba(255,255,255,.55); max-width: 580px; margin: 0 auto 44px; line-height: 1.65; }
    .cta-dark-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin-bottom: 52px; }
    .btn-dark-outline { border: 2px solid rgba(255,255,255,.35); color: #fff; padding: 14px 30px; border-radius: 50px; font-size: 15px; font-weight: 700; display: inline-flex; align-items: center; gap: 8px; transition: all .2s; }
    .btn-dark-outline:hover { border-color: #fff; background: rgba(255,255,255,.07); }
    .btn-dark-ghost { border: 2px solid rgba(255,255,255,.15); color: rgba(255,255,255,.6); padding: 14px 30px; border-radius: 50px; font-size: 15px; font-weight: 700; display: inline-flex; align-items: center; gap: 8px; transition: all .2s; }
    .btn-dark-ghost:hover { border-color: rgba(255,255,255,.3); }
    .trust-row { display: flex; gap: 32px; justify-content: center; flex-wrap: wrap; }
    .trust-item { display: flex; align-items: center; gap: 7px; font-size: 12px; color: rgba(255,255,255,.35); font-weight: 600; }

    @media (max-width: 900px) {
      .opp-stats { grid-template-columns: 1fr; max-width: 420px; }
      .feat-block { grid-template-columns: 1fr; gap: 32px; }
      .challenge-section,.opp-section,.service-intro { padding: 48px 20px; }
      .feat-blocks { padding: 0 20px 56px; }
      .cta-dark { padding: 72px 20px; }
      .cta-dark h2 { font-size: 30px; }
      .trust-row { gap: 16px; }
    }

  
      `}</style>
<main>
  <section className="hero">
  <div className="hero-layout">
    <div className="hero-text">
      <div className="breadcrumb"><a href="/solutions/">Solutions</a><span>›</span>Banking &amp; Finance</div>
      <h1>Transform How Banks Connect with Customers Across Every Global Channel</h1>
      <p>KronGage delivers unified customer engagement for banks and financial institutions, combining omnichannel communication, AI-powered automation, and enterprise-grade compliance in one intelligent platform.</p>
      <div className="hero-btns"><a href="/contact/" className="btn-primary">Schedule A Demo</a></div>
    </div>
    <div className="hero-visual">
      <iframe src="/assets/hero-banking.html" loading="lazy" title="Interactive demo"></iframe>
    </div>
  </div>
  </section>

  <section className="challenge-section">
    <h2>The Modern Banking Challenge</h2>
    <p>Customers don't see a bank's internal complexities; they only see the friction when a global transfer or a simple enquiry takes too long. KronGage creates a single, intelligent flow for customer engagement, allowing staff to provide immediate, personalised support.</p>
  </section>

  <section className="opp-section">
    <h2>The Banking Customer Engagement Opportunity</h2>
    <div className="opp-stats"><div className="opp-stat"><div className="opp-stat-num">3.5x</div><div className="opp-stat-lbl">higher retention rates when banks deliver true omnichannel experiences</div></div><div className="opp-stat"><div className="opp-stat-num">40%</div><div className="opp-stat-lbl">reduction in contact centre costs through AI-driven automation</div></div><div className="opp-stat"><div className="opp-stat-num">25%</div><div className="opp-stat-lbl">increase in cross-sell revenue with unified customer data</div></div></div>
  </section>

  <section className="service-intro">
    <h2>KronGage for Financial Services</h2>
    <p>Growth shouldn't come at the cost of the customer experience. KronGage unifies engagement tools so financial institutions can scale into new markets without losing the personal touch that built their brand in the first place.</p>
  </section>

  <section className="feat-blocks">
  <div className="feat-block">
    <div>
      <h3 className="feat-title">Omnichannel Global Banking Service</h3>
      <p className="feat-body">Manage all customer conversations from a single platform, regardless of geographical location or preferred channel.</p>
      <a href="/contact/" className="feat-btn">Learn more</a>
    </div>
    <div><div className="feat-widget">
  <div className="fw-head">
    <div className="fw-head-logo">⚡</div>
    <span className="fw-head-title">Multichannel messaging</span>
  </div>
  <div className="fw-channels">
    <div className="fw-ch">💬</div><div className="fw-ch">📧</div><div className="fw-ch">📱</div><div className="fw-ch">🌐</div><div className="fw-ch">📲</div>
  </div>
  <div className="fw-convs">
    <div className="fw-conv"><div className="fw-av" style={{background:"#0D47A1"}}>AM</div><div><div className="fw-conv-name">Ama Serwah</div><div className="fw-conv-text">Hi, I need help with my account</div></div></div>
    <div className="fw-conv"><div className="fw-av" style={{background:"#7c3aed"}}>KM</div><div><div className="fw-conv-name">Kofi Mensah</div><div className="fw-conv-text">When will my order arrive?</div></div></div>
    <div className="fw-conv"><div className="fw-av" style={{background:"#0891b2"}}>PN</div><div><div className="fw-conv-name">Priya Nair</div><div className="fw-conv-text">Can I reschedule my appointment?</div></div></div>
  </div>
  <div className="fw-footer">
    <div className="fw-live-dot"></div><span className="fw-live-txt">Live agent</span>
    <div className="fw-agents">
      <div className="fw-agent-av" style={{background:"#0D47A1"}}>JO</div>
      <div className="fw-agent-av" style={{background:"#16a34a"}}>AM</div>
      <div className="fw-agent-av" style={{background:"#dc2626"}}>KP</div>
    </div>
  </div>
</div></div>
  </div>
  <div className="feat-block">
    <div className="feat-visual-iframe">
      <iframe src="/assets/ai-telecom-support.html" loading="lazy" title="AI-Powered Support demo"></iframe>
    </div>
    <div>
      <h3 className="feat-title">AI-Powered Banking Support</h3>
      <p className="feat-body">Deploy AI that handles routine enquiries while empowering agents with intelligent assistance for complex global interactions.</p>
      <a href="/contact/" className="feat-btn">Learn more</a>
    </div>
  </div>
  <div className="feat-block">
    <div>
    <h3 className="feat-title">Customer 360 &amp; Predictive Intelligence</h3>
      <p className="feat-body">Break down data silos and gain a unified view of each customer's relationship with their bank across all regions.</p>
      <a href="/contact/" className="feat-btn">Contact Us</a>
    </div>

    <div className="feat-visual-iframe">
      <iframe src="/assets/customer-360.html" loading="lazy" title="Customer 360 demo"></iframe>
    </div>
  </div>
  </section>

  <section className="cta-dark">
    <div className="cta-badge">⊕ Enterprise Demo</div>
    <h2>Transform Customer Engagement In Your Bank Today</h2>
    <p>Request an enterprise demo and see how KronGage can replace 5-7 tools with a single, unified platform built for modern organisations.</p>
    <div className="cta-dark-btns">
      <a href="/contact/" className="btn-dark-outline">Request a Demo →</a>
      <a href="/platform/" className="btn-dark-ghost">⊕ Explore the Platform</a>
    </div>
    <div className="trust-row">
      <div className="trust-item">⊘ No commitment required</div>
      <div className="trust-item">🛡 Enterprise-grade security</div>
      <div className="trust-item">★ World-Class Platform</div>
      <div className="trust-item">⚡ Live demo in 24 hours</div>
    </div>
  </section>
</main>
    </>
  );
}
