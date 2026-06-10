import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog – KronGage',
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
    .nav-links { display: flex; align-items: center; gap: 32px; list-style: none; font-size: 14px; font-weight: 600; }
    .nav-links li a { color: #475569; transition: color .2s; }
    .nav-links li a:hover { color: #0D47A1; }
    .btn-nav { background: #0D47A1; color: #fff; padding: 10px 22px; border-radius: 50px; font-size: 14px; font-weight: 700; }
    .nav-toggle { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px; }
    .nav-toggle span { display: block; width: 22px; height: 2px; background: #0f172a; border-radius: 2px; }
    .mobile-menu { display: none; flex-direction: column; background: #fff; border-top: 1px solid #f1f5f9; padding: 16px 24px 24px; gap: 4px; }
    .mobile-menu.open { display: flex; }
    .mobile-menu a { padding: 11px 0; font-size: 16px; font-weight: 600; color: #475569; border-bottom: 1px solid #f1f5f9; }
    .mobile-menu a:last-child { border-bottom: none; }
    .mobile-menu .btn-nav-mobile { margin-top: 12px; background: #0D47A1; color: #fff; padding: 13px 20px; border-radius: 50px; font-weight: 700; text-align: center; border-bottom: none; }
    .nav-links li { position: relative; }
    .nav-links li > a { display: flex; align-items: center; gap: 4px; padding: 8px 0; }
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
    .mega-feature-row { display: flex; align-items: flex-start; gap: 12px; padding: 10px 0; border-bottom: 1px solid #f1f5f9; text-decoration: none; color: inherit; }
    .mega-feature-row:last-child { border-bottom: none; }
    .mega-feat-icon { width: 34px; height: 34px; background: #EEF5FD; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 16px; }
    .mega-feat-text strong { display: block; font-size: 13px; font-weight: 700; color: #0f172a; margin-bottom: 2px; }
    .mega-feat-text span { font-size: 12px; color: #64748b; }
    .mega-channel-row { display: flex; align-items: center; gap: 10px; padding: 8px 0; font-size: 13px; font-weight: 600; color: #374151; border-bottom: 1px solid #f8fafc; text-decoration: none; }
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
    .mega-article-title { font-size: 14px; font-weight: 800; color: #0f172a; margin-bottom: 8px; line-height: 1.4; }
    .mega-article-sub { font-size: 12px; color: #64748b; line-height: 1.6; }
    main { flex: 1; max-width: 1100px; margin: 0 auto; padding: 60px 24px 80px; width: 100%; }
    .page-header { margin-bottom: 48px; }
    .page-label { font-size: 12px; font-weight: 700; color: #0D47A1; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 12px; }
    .page-header h1 { font-size: 44px; font-weight: 800; color: #0f172a; line-height: 1.15; margin-bottom: 14px; }
    .page-header p { font-size: 17px; color: #64748b; max-width: 560px; line-height: 1.7; }
    .blog-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 40px; }
    .blog-featured { background: #fff; border-radius: 20px; overflow: hidden; border: 1px solid #e2e8f0; transition: box-shadow .2s; }
    .blog-featured:hover { box-shadow: 0 12px 40px rgba(13,71,161,.1); }
    .blog-featured-img { width: 100%; height: 280px; overflow: hidden; position: relative; background: #0f172a; }
    .blog-featured-img iframe { width: 100%; height: 100%; border: none; display: block; pointer-events: none; }
    .blog-featured-img .img-overlay { position: absolute; inset: 0; z-index: 1; cursor: pointer; }
    .blog-featured-body { padding: 36px; }
    .blog-tag { display: inline-block; font-size: 11px; font-weight: 700; color: #0D47A1; background: #EEF5FD; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; letter-spacing: .8px; margin-bottom: 16px; }
    .blog-featured-body h2 { font-size: 28px; font-weight: 800; color: #0f172a; line-height: 1.2; margin-bottom: 14px; }
    .blog-featured-body p { font-size: 15px; color: #64748b; line-height: 1.7; margin-bottom: 24px; }
    .blog-meta { display: flex; align-items: center; gap: 16px; font-size: 13px; color: #94a3b8; font-weight: 600; }
    .blog-meta-dot { width: 4px; height: 4px; border-radius: 50%; background: #cbd5e1; }
    .read-more { display: inline-flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 700; color: #0D47A1; }
    .read-more:hover { gap: 12px; }
    .sidebar { display: flex; flex-direction: column; gap: 24px; }
    .sidebar-label { font-size: 12px; font-weight: 700; color: #94a3b8; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 4px; padding-bottom: 12px; border-bottom: 1px solid #f1f5f9; }
    .sidebar-post { background: #fff; border-radius: 14px; overflow: hidden; border: 1px solid #e2e8f0; transition: box-shadow .2s; }
    .sidebar-post:hover { box-shadow: 0 6px 24px rgba(13,71,161,.08); }
    .sidebar-thumb { width: 100%; height: 130px; overflow: hidden; position: relative; background: #f8fafc; border-bottom: 1px solid #f1f5f9; }
    .sidebar-thumb iframe { width: 100%; height: 100%; border: none; display: block; pointer-events: none; }
    .sidebar-post-body { padding: 16px 20px 20px; }
    .sidebar-post .blog-tag { margin-bottom: 10px; font-size: 10px; }
    .sidebar-post h3 { font-size: 15px; font-weight: 700; color: #0f172a; line-height: 1.35; margin-bottom: 8px; }
    .sidebar-post p { font-size: 13px; color: #64748b; line-height: 1.6; }
    .sidebar-post .blog-meta { margin-top: 12px; font-size: 12px; }
    footer { background: #0f172a; color: #94a3b8; padding: 60px 60px 30px; }
    .footer-top { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; margin-bottom: 48px; }
    .footer-brand .logo { font-size: 22px; font-weight: 800; color: #38bdf8; margin-bottom: 14px; }
    .footer-brand p { font-size: 13px; line-height: 1.7; color: #64748b; margin-bottom: 16px; }
    .footer-brand .dev-credit { font-size: 12px; color: #475569; margin-bottom: 20px; }
    .badge-meta { display: inline-flex; align-items: center; gap: 8px; background: #1e293b; border: 1px solid #334155; border-radius: 8px; padding: 10px 14px; font-size: 11px; font-weight: 600; color: #94a3b8; }
    .badge-meta .meta-icon { width: 28px; height: 28px; background: #0D47A1; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 14px; font-weight: 800; }
    .footer-col h4 { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #e2e8f0; margin-bottom: 18px; }
    .footer-col ul { list-style: none; }
    .footer-col ul li { margin-bottom: 10px; font-size: 13px; }
    .footer-col ul li a { color: #64748b; transition: color .2s; }
    .footer-col ul li a:hover { color: #38bdf8; }
    .footer-bottom { border-top: 1px solid #1e293b; padding-top: 24px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
    .footer-bottom p { font-size: 12px; color: #475569; }
    .footer-legal { display: flex; gap: 20px; flex-wrap: wrap; }
    .footer-legal a { font-size: 12px; color: #475569; transition: color .2s; }
    .footer-legal a:hover { color: #38bdf8; }
    @media (max-width: 900px) { .blog-grid { grid-template-columns: 1fr; } .footer-top { grid-template-columns: 1fr 1fr; } .footer-brand { grid-column: 1 / -1; } }
    @media (max-width: 640px) {
      nav { padding: 0 20px; height: 56px; }
      .nav-links, .btn-nav { display: none; }
      .nav-toggle { display: flex; }
      .page-header h1 { font-size: 30px; }
      footer { padding: 40px 20px 20px; }
      .footer-top { grid-template-columns: 1fr; }
      .footer-brand { grid-column: auto; }
      .footer-bottom { flex-direction: column; align-items: flex-start; }
    }
  
      `}</style>
<main>
  <div className="page-header">
    <div className="page-label">Insights &amp; Perspectives</div>
    <h1>The KronGage Blog</h1>
    <p>Strategies, research, and expert insights on customer engagement, retention, and AI-powered growth.</p>
  </div>

  <div className="blog-grid">
    {/* Featured article */}
    <a href="/blog/retention-gap/" className="blog-featured">
      <div className="blog-featured-img">
        <iframe src="../assets/blog-retention-gap.html" loading="lazy" title="The Retention Gap"></iframe>
        <div className="img-overlay"></div>
      </div>
      <div className="blog-featured-body">
        <span className="blog-tag">Customer Success</span>
        <h2>The Retention Gap: Why Success Teams Struggle</h2>
        <p>In an era of endless options, "customer success" has become more than just a department — it's a survival strategy. Yet despite record investment in CS tooling, most teams are losing the retention battle. Here's why.</p>
        <div className="blog-meta">
          <span>KronGage Editorial</span>
          <div className="blog-meta-dot"></div>
          <span>May 2025</span>
          <div className="blog-meta-dot"></div>
          <span>8 min read</span>
        </div>
        <br />
        <span className="read-more">Read article →</span>
      </div>
    </a>

    {/* Sidebar */}
    <div className="sidebar">
      <div className="sidebar-label">More from the Blog</div>

      <a href="/blog/ai-support-tier-1/" className="sidebar-post">
        <div className="sidebar-thumb">
          <iframe src="../assets/blog-ai-support.html" loading="lazy" title="AI Support"></iframe>
        </div>
        <div className="sidebar-post-body">
          <span className="blog-tag">AI &amp; Automation</span>
          <h3>How AI Agents Are Replacing Tier-1 Support — Without Losing the Human Touch</h3>
          <p>Most companies automate the wrong things first. Here's what the best operators figured out — and why the handoff is everything.</p>
          <div className="blog-meta">
            <span>June 2025</span>
            <div className="blog-meta-dot"></div>
            <span>7 min read</span>
          </div>
        </div>
      </a>

      <a href="/blog/beyond-whatsapp/" className="sidebar-post">
        <div className="sidebar-thumb">
          <iframe src="../assets/blog-omnichannel.html" loading="lazy" title="Beyond WhatsApp"></iframe>
        </div>
        <div className="sidebar-post-body">
          <span className="blog-tag">Omnichannel</span>
          <h3>Beyond WhatsApp: Building a True Omnichannel Experience in 2025</h3>
          <p>WhatsApp is just the start. Here's how leading brands are unifying every customer touchpoint under one intelligent inbox.</p>
          <div className="blog-meta">
            <span>May 2025</span>
            <div className="blog-meta-dot"></div>
            <span>6 min read</span>
          </div>
        </div>
      </a>

      <a href="/blog/vanity-metrics-to-value/" className="sidebar-post">
        <div className="sidebar-thumb">
          <iframe src="../assets/blog-vanity-metrics.html" loading="lazy" title="Vanity Metrics"></iframe>
        </div>
        <div className="sidebar-post-body">
          <span className="blog-tag">Analytics</span>
          <h3>From Vanity Metrics to Value: What Your Customer Data Is Really Telling You</h3>
          <p>Most dashboards show what happened. The best ones show what to do next. Here's how to close that gap.</p>
          <div className="blog-meta">
            <span>April 2025</span>
            <div className="blog-meta-dot"></div>
            <span>7 min read</span>
          </div>
        </div>
      </a>
    </div>
  </div>
</main>
    </>
  );
}
