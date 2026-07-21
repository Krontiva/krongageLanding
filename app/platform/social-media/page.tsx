import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Social Media Management — KronGage',
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

    .features { background: #fff; padding: 80px 60px; }
    .section-label { font-size: 12px; font-weight: 700; color: #0D47A1; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 12px; }
    .section-heading { font-size: 36px; font-weight: 800; color: #0f172a; max-width: 560px; line-height: 1.2; margin-bottom: 48px; }
    .cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
    .card { background: #f8fafc; border-radius: 16px; padding: 32px 28px; border: 1px solid #e2e8f0; }
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

    @media (max-width: 900px) { .cards { grid-template-columns: repeat(2, 1fr); } .stats-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 640px) {
      nav { padding: 0 20px; height: 56px; }
      .nav-links { display: none; } .btn-nav { display: none; } .nav-toggle { display: flex; }
      .hero { padding: 48px 20px 56px; } .hero h1 { font-size: 32px; }
      .features { padding: 56px 20px; } .section-heading { font-size: 26px; }
      .cards { grid-template-columns: 1fr; }
      .stats { padding: 48px 20px; } .stats-grid { grid-template-columns: repeat(2, 1fr); }
      .cta-section { padding: 56px 20px; } .cta-section h2 { font-size: 26px; }
      footer { padding: 40px 20px 20px; }
      .footer-top { grid-template-columns: 1fr; gap: 28px; }
      .footer-brand { grid-column: auto; }
      .footer-bottom { flex-direction: column; align-items: flex-start; gap: 16px; }
    }

    .business-impact { background: #fff; padding: 72px 60px 80px; }
    .bi-inner { max-width: 1200px; margin: 0 auto; }
    .bi-heading { font-size: 38px; font-weight: 800; color: #0D47A1; margin-bottom: 40px; }
    .bi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
    .bi-card { background: #EEF5FD; border-radius: 14px; padding: 28px 24px; border: 1px solid #dbeafe; }
    .bi-card-title { font-size: 15px; font-weight: 800; color: #0f172a; margin-bottom: 12px; line-height: 1.35; }
    .bi-card-desc { font-size: 13px; color: #475569; line-height: 1.65; }
    @media (max-width: 900px) { .bi-grid { grid-template-columns: repeat(2, 1fr); } .bi-heading { font-size: 28px; } }
    @media (max-width: 640px) { .bi-grid { grid-template-columns: 1fr; } .business-impact { padding: 48px 20px; } }

  
      `}</style>
<main>
  <section className="hero">
  <div className="hero-layout">
    <div className="hero-text">
      <div className="breadcrumb"><a href="/platform/">Platform</a><span>›</span>Social Media Management</div>
      <h1>Social Media Management</h1>
      <p>KronGage's Social Media Management module provides a comprehensive, enterprise-grade suite of tools for social media publishing, scheduling, content management, and performance analytics.</p>
      <div className="hero-btns"><a href="/contact/" className="btn-primary">Contact Us</a></div>
    </div>
    <div className="hero-visual">
      <iframe src="/assets/social-publishing.html" loading="lazy" title="Interactive demo"></iframe>
    </div>
  </div>
</section>

    <section className="business-impact">
    <div className="bi-inner">
      <h2 className="bi-heading">Business Impact</h2>
      <div className="bi-grid">
      <div className="bi-card">
        <h3 className="bi-card-title">Content Calendar</h3>
        <p className="bi-card-desc">Marketing teams can see scheduled, published, draft, and failed posts at a glance with color-coded platform indicators and status markers.</p>
      </div>
      <div className="bi-card">
        <h3 className="bi-card-title">Bulk Scheduling</h3>
        <p className="bi-card-desc">KronGage supports bulk scheduling via CSV upload with up to 500 posts per batch. Each CSV can include content, target platforms, scheduled date and time, media URLs, first comments, and hashtag groups.</p>
      </div>
      <div className="bi-card">
        <h3 className="bi-card-title">AI-Powered Content Optimisation</h3>
        <p className="bi-card-desc">AI analyses historical engagement data to recommend the best times to post for each platform and audience. Generate platform-optimised posts from topic briefs, product descriptions, or campaign themes.</p>
      </div>
      <div className="bi-card">
        <h3 className="bi-card-title">Analytics & Reporting</h3>
        <p className="bi-card-desc">Comprehensive social media analytics track performance across all connected platforms with unified metrics, cross-platform comparison, and trend analysis.</p>
      </div>
      </div>
    </div>
  </section>
</main>
    </>
  );
}
