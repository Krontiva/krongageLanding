import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Platform – KronGage',
  description: 'KronGage – Unified Customer Engagement Platform',
};

export default function Page() {
  return (
    <>
      <style>{`

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Manrope', sans-serif; color: #1e293b; background: #fff; }
    a { text-decoration: none; color: inherit; }

    /* NAV */
    nav { display: flex; align-items: center; justify-content: space-between; padding: 0 60px; height: 68px; background: #fff; border-bottom: 1px solid #f1f5f9; position: sticky; top: 0; z-index: 100; }
    .nav-logo { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 18px; color: #1e293b; }
    .nav-logo svg { width: 28px; height: 28px; }
    .nav-links { display: flex; align-items: center; gap: 32px; list-style: none; font-size: 14px; font-weight: 600; }
    .nav-links li a { color: #475569; transition: color .2s; }
    .nav-links li a:hover { color: #0D47A1; }
    .nav-links .active a { color: #0D47A1; }
    .btn-nav { background: #0D47A1; color: #fff; padding: 10px 22px; border-radius: 50px; font-size: 14px; font-weight: 700; }
    .nav-toggle { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px; }
    .nav-toggle span { display: block; width: 22px; height: 2px; background: #0f172a; border-radius: 2px; }
    .mobile-menu { display: none; flex-direction: column; background: #fff; border-top: 1px solid #f1f5f9; padding: 16px 24px 24px; gap: 4px; }
    .mobile-menu.open { display: flex; }
    .mobile-menu a { padding: 11px 0; font-size: 16px; font-weight: 600; color: #475569; border-bottom: 1px solid #f1f5f9; }
    .mobile-menu a:last-child { border-bottom: none; }
    .mobile-menu .btn-nav-mobile { margin-top: 12px; background: #0D47A1; color: #fff; padding: 13px 20px; border-radius: 50px; font-weight: 700; text-align: center; border-bottom: none; }

    /* Mega menu */
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

    /* HERO */
    .hero { background: #eff6ff; padding: 80px 60px; text-align: center; }
    .hero h1 { font-size: 48px; font-weight: 800; color: #0D47A1; max-width: 760px; margin: 0 auto 20px; line-height: 1.1; letter-spacing: -1px; }
    .hero p { font-size: 17px; color: #475569; max-width: 680px; margin: 0 auto 36px; line-height: 1.7; }
    .hero-buttons { display: flex; justify-content: center; gap: 16px; flex-wrap: wrap; }
    .btn-primary { display: inline-flex; align-items: center; gap: 8px; background: #0D47A1; color: #fff; padding: 13px 28px; border-radius: 50px; font-size: 15px; font-weight: 600; transition: background .2s; }
    .btn-primary:hover { background: #0a3a84; }
    .btn-outline { display: inline-flex; align-items: center; gap: 8px; background: #fff; color: #0f172a; padding: 13px 28px; border-radius: 50px; font-size: 15px; font-weight: 600; border: 2px solid #e2e8f0; transition: border-color .2s; }
    .btn-outline:hover { border-color: #0f172a; }

    /* SCALE SECTION */
    .scale { padding: 72px 60px; text-align: center; }
    .scale h2 { font-size: 34px; font-weight: 800; color: #0D47A1; margin-bottom: 12px; }
    .scale p { font-size: 16px; color: #64748b; max-width: 580px; margin: 0 auto 48px; line-height: 1.6; }
    .scale-mockup { max-width: 900px; margin: 0 auto; background: #fff; border-radius: 16px; box-shadow: 0 16px 60px rgba(0,0,0,.1); overflow: hidden; }
    .mockup-bar { background: #1e293b; padding: 12px 20px; display: flex; gap: 6px; }
    .dot { width: 10px; height: 10px; border-radius: 50%; }
    .dot-r { background: #f87171; } .dot-y { background: #fbbf24; } .dot-g { background: #34d399; }
    .mockup-body { padding: 32px; display: grid; grid-template-columns: 200px 1fr; gap: 20px; height: 320px; }
    .mockup-sidebar-nav { background: #f8fafc; border-radius: 10px; padding: 16px; display: flex; flex-direction: column; gap: 10px; }
    .nav-item { height: 32px; background: #e2e8f0; border-radius: 6px; }
    .nav-item.active { background: #0D47A1; }
    .mockup-main-area { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: auto auto; gap: 16px; }
    .m-card { background: #f8fafc; border-radius: 10px; border: 1px solid #e2e8f0; padding: 16px; }
    .m-card .m-label { font-size: 10px; color: #94a3b8; text-transform: uppercase; margin-bottom: 8px; }
    .m-card .m-val { font-size: 28px; font-weight: 800; color: #0f172a; }
    .m-card.chart { grid-column: 1 / -1; display: flex; align-items: flex-end; gap: 8px; padding-bottom: 20px; }
    .bar { flex: 1; border-radius: 4px 4px 0 0; background: #0D47A1; opacity: .7; }

    /* FEATURE SECTIONS */
    .feature { padding: 72px 60px; max-width: 1200px; margin: 0 auto; display: flex; align-items: center; gap: 72px; }
    .feature.reverse { flex-direction: row-reverse; }
    .feature-text { flex: 1; }
    .feature-text .tag { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #0D47A1; margin-bottom: 12px; }
    .feature-text h2 { font-size: 30px; font-weight: 800; color: #0D47A1; margin-bottom: 14px; line-height: 1.25; }
    .feature-text p { font-size: 15px; color: #475569; line-height: 1.7; margin-bottom: 28px; }
    .feature-text ul { list-style: none; margin-bottom: 28px; display: flex; flex-direction: column; gap: 10px; }
    .feature-text ul li { display: flex; gap: 10px; font-size: 14px; color: #334155; }
    .feature-text ul li::before { content: '•'; color: #0D47A1; font-weight: 700; flex-shrink: 0; }
    .btn-blue { display: inline-block; background: #0D47A1; color: #fff; padding: 11px 22px; border-radius: 8px; font-size: 14px; font-weight: 600; transition: background .2s; }
    .btn-blue:hover { background: #0a3a84; }
    .btn-dark { display: inline-block; background: #0f172a; color: #fff; padding: 11px 22px; border-radius: 8px; font-size: 14px; font-weight: 600; transition: background .2s; }
    .btn-dark:hover { background: #1e293b; }
    .feature-visual { flex: 1; flex-shrink: 0; }
    .feature-iframe-wrap { border-radius: 20px; overflow: hidden; height: 420px; box-shadow: 0 16px 56px rgba(13,71,161,.15); }
    .feature-iframe-wrap iframe { width: 100%; height: 100%; border: none; display: block; }
    .feature-divider { background: #f8fafc; height: 1px; margin: 0 60px; }

    /* DARK CTA */
    .dark-cta { background: #0f172a; padding: 80px 60px; text-align: center; }
    .dark-cta h2 { font-size: 42px; font-weight: 800; color: #fff; max-width: 600px; margin: 0 auto 16px; line-height: 1.15; }
    .dark-cta p { font-size: 16px; color: #64748b; max-width: 500px; margin: 0 auto 40px; line-height: 1.7; }
    .cta-buttons { display: flex; justify-content: center; gap: 16px; flex-wrap: wrap; }
    .btn-white { background: #fff; color: #0f172a; padding: 13px 28px; border-radius: 50px; font-size: 15px; font-weight: 600; display: inline-flex; align-items: center; gap: 8px; }
    .btn-white:hover { opacity: .9; }
    .btn-outline-white { background: transparent; color: #fff; padding: 13px 28px; border-radius: 50px; font-size: 15px; font-weight: 600; border: 2px solid rgba(255,255,255,.25); display: inline-flex; align-items: center; gap: 8px; }
    .btn-outline-white:hover { border-color: rgba(255,255,255,.6); }

    /* FOOTER */
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

    /* RESPONSIVE */
    @media (max-width: 1024px) {
      nav { padding: 0 32px; }
      .hero { padding: 60px 32px; }
      .hero h1 { font-size: 38px; }
      .scale { padding: 56px 32px; }
      .feature { padding: 56px 32px; gap: 48px; }
      footer { padding: 48px 32px 24px; }
      .footer-top { grid-template-columns: 1fr 1fr; gap: 36px; }
      .footer-brand { grid-column: 1 / -1; }
    }
    @media (max-width: 640px) {
      nav { padding: 0 20px; height: 56px; }
      .nav-links, .btn-nav { display: none; }
      .nav-toggle { display: flex; }
      .hero { padding: 48px 20px; }
      .hero h1 { font-size: 28px; }
      .scale { padding: 40px 20px; }
      .mockup-body { grid-template-columns: 1fr; height: auto; }
      .mockup-sidebar-nav { display: none; }
      .feature, .feature.reverse { flex-direction: column; padding: 40px 20px; gap: 32px; }
      .feature-divider { margin: 0 20px; }
      .dark-cta { padding: 48px 20px; }
      .dark-cta h2 { font-size: 28px; }
      footer { padding: 40px 20px 20px; }
      .footer-top { grid-template-columns: 1fr; gap: 28px; }
      .footer-brand { grid-column: auto; }
      .footer-bottom { flex-direction: column; align-items: flex-start; gap: 16px; }
    }
  
      `}</style>
{/* HERO */}
<div className="hero">
  <h1>The Complete Customer Engagement Platform for Modern Businesses</h1>
  <p>Multiple integrated modules. One powerful platform. Deliver exceptional customer experiences across every channel with AI-powered automation, unified data, and enterprise-grade security.</p>
  <div className="hero-buttons">
    <a href="/contact/" className="btn-primary">Request a Demo →</a>
    <a href="#features" className="btn-outline">⊕ Explore the Platform</a>
  </div>
</div>

<div id="features"></div>

{/* OMNICHANNEL INBOX */}
<div className="feature-divider"></div>
<section className="feature">
  <div className="feature-text">
    <div className="tag">Omnichannel Inbox</div>
    <h2>Every Conversation. Every Channel. One Workspace.</h2>
    <p>The command centre of KronGage. Manage all customer conversations across 15+ channels in a single, intelligent interface. Agents never need to switch between tools: every interaction is visible, searchable, and contextually enriched.</p>
    <a href="/platform/omnichannel-inbox/" className="btn-blue">Learn More</a>
  </div>
  <div className="feature-visual">
    <div className="feature-iframe-wrap">
      <iframe src="/assets/inbox-demo.html" loading="lazy" title="Omnichannel Inbox demo"></iframe>
    </div>
  </div>
</section>

{/* SOCIAL PUBLISHING */}
<div className="feature-divider"></div>
<section className="feature reverse">
  <div className="feature-text">
    <div className="tag">Social Media Publishing</div>
    <h2>Enterprise Social Media Management That Actually Works</h2>
    <p>Plan, create, schedule, and publish social content across all major platforms from one intuitive interface. Get the power of enterprise platforms with the simplicity and affordability designed for African businesses.</p>
    <a href="/contact/" className="btn-blue">Learn More</a>
  </div>
  <div className="feature-visual">
    <div className="feature-iframe-wrap">
      <iframe src="/assets/social-publishing.html" loading="lazy" title="Social Media Publishing demo"></iframe>
    </div>
  </div>
</section>

{/* SOCIAL LISTENING */}
<div className="feature-divider"></div>
<section className="feature">
  <div className="feature-text">
    <div className="tag">Social Listening &amp; Monitoring</div>
    <h2>Know What They're Saying Before It's Too Late</h2>
    <p>Monitor brand activity across multiple platforms in real time. Track mentions, analyse sentiment, benchmark competitors, and respond proactively to emerging conversations, all from one powerful dashboard.</p>
    <a href="/contact/" className="btn-dark">Contact Us</a>
  </div>
  <div className="feature-visual">
    <div className="feature-iframe-wrap">
      <iframe src="/assets/social-media-mgmt.html" loading="lazy" title="Social Listening & Monitoring demo"></iframe>
    </div>
  </div>
</section>

{/* KNOWLEDGE MANAGEMENT */}
<div className="feature-divider"></div>
<section className="feature reverse">
  <div className="feature-text">
    <div className="tag">Knowledge Management &amp; RAG</div>
    <h2>Smart Answers. Instantly.</h2>
    <p>Power both customer self-service and agent-assisted support with an AI-driven knowledge base. Retrieval-Augmented Generation (RAG) technology ensures every answer is contextually relevant, accurate, and drawn from the most current information.</p>
    <a href="/contact/" className="btn-dark">Contact Us</a>
  </div>
  <div className="feature-visual">
    <div className="feature-iframe-wrap">
      <iframe src="/assets/knowledge-base.html" loading="lazy" title="Knowledge Management & RAG demo"></iframe>
    </div>
  </div>
</section>

{/* SECURITY */}
<div className="feature-divider"></div>
<section className="feature">
  <div className="feature-text">
    <div className="tag">Security &amp; Compliance</div>
    <h2>Enterprise-Grade Security, Built In</h2>
    <p>Manage complex teams, enforce security policies, and maintain compliance with enterprise-grade controls designed for agencies managing multiple client accounts and for organisations with distributed teams.</p>
    <p style={{fontWeight:"700",color:"#0f172a",marginTop:"20px",marginBottom:"12px",fontSize:"14px"}}>Enterprise Authentication &amp; Security</p>
    <ul>
      <li>Single Sign-On (SSO) with OIDC and OAuth 2.0 support</li>
      <li>Field-level encryption for personally identifiable information (PII)</li>
      <li>Multi-factor authentication (MFA) with TOTP and SMS options</li>
      <li>Session management and automatic timeout controls</li>
      <li>Flexible role-based access control</li>
    </ul>
    <a href="/contact/" className="btn-dark">Contact Us</a>
  </div>
  <div className="feature-visual">
    <div className="feature-iframe-wrap">
      <iframe src="/assets/security-demo.html" loading="lazy" title="Security & Compliance demo"></iframe>
    </div>
  </div>
</section>

{/* AI & AUTOMATION */}
<div className="feature-divider"></div>
<section className="feature reverse">
  <div className="feature-text">
    <div className="tag">AI &amp; Automation</div>
    <h2>Automate Conversations. Delight Customers.</h2>
    <p>Deploy intelligent AI copilots and chatbots that handle routine queries instantly, escalate complex issues seamlessly, and learn from every interaction, freeing teams to focus on what matters most.</p>
    <a href="/platform/ai-automation/" className="btn-blue">Learn More</a>
  </div>
  <div className="feature-visual">
    <div className="feature-iframe-wrap">
      <iframe src="/assets/hero-chatbot.html" loading="lazy" title="AI & Automation demo"></iframe>
    </div>
  </div>
</section>

{/* CUSTOMER 360 */}
<div className="feature-divider"></div>
<section className="feature">
  <div className="feature-text">
    <div className="tag">Customer 360</div>
    <h2>A Complete View of Every Customer</h2>
    <p>Unify customer data from every touchpoint into a single, real-time profile. Understand behaviour, predict needs, and personalise every interaction, all from one powerful data platform.</p>
    <a href="/platform/customer-data/" className="btn-blue">Learn More</a>
  </div>
  <div className="feature-visual">
    <div className="feature-iframe-wrap">
      <iframe src="/assets/customer-360.html" loading="lazy" title="Customer 360 demo"></iframe>
    </div>
  </div>
</section>

{/* CAMPAIGN MANAGEMENT */}
<div className="feature-divider"></div>
<section className="feature reverse">
  <div className="feature-text">
    <div className="tag">Campaign Management</div>
    <h2>Run Smarter Campaigns Across Every Channel</h2>
    <p>Plan, execute, and optimise multi-channel campaigns from a single workspace. Track performance in real time, collaborate across teams, and drive measurable results across email, SMS, social, and more.</p>
    <a href="/platform/campaign-management/" className="btn-blue">Learn More</a>
  </div>
  <div className="feature-visual">
    <div className="feature-iframe-wrap">
      <iframe src="/assets/campaign-management.html" loading="lazy" title="Campaign Management demo"></iframe>
    </div>
  </div>
</section>

{/* DARK CTA */}
<section className="dark-cta">
  <h2>Transform Customer Engagement Today</h2>
  <p>Request an enterprise demo and see how KronGage can replace 5-7 tools with a single, unified platform built for modern organisations.</p>
  <div className="cta-buttons">
    <a href="/contact/" className="btn-white">Request a Demo →</a>
  </div>
</section>

{/* FOOTER */}
    </>
  );
}
