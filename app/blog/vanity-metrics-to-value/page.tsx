import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'From Vanity Metrics to Value: What Your Customer Data Is Really Telling You – KronGage Blog',
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

    .article-hero { background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); padding: 72px 60px 80px; position: relative; overflow: hidden; }
    .article-hero-bg { position: absolute; inset: 0; width: 100%; height: 100%; border: none; pointer-events: none; opacity: 0.35; }
    .article-hero-inner { position: relative; z-index: 1; }
    .breadcrumb { font-size: 13px; color: rgba(255,255,255,.5); font-weight: 500; margin-bottom: 24px; }
    .breadcrumb a { color: #a5b4fc; }
    .breadcrumb span { margin: 0 6px; }
    .article-tag { display: inline-block; font-size: 11px; font-weight: 700; color: #a5b4fc; background: rgba(165,180,252,.1); border: 1px solid rgba(165,180,252,.25); padding: 4px 14px; border-radius: 20px; text-transform: uppercase; letter-spacing: .8px; margin-bottom: 20px; }
    .article-hero h1 { font-size: 46px; font-weight: 800; color: #fff; line-height: 1.12; max-width: 780px; margin-bottom: 20px; }
    .article-hero .lead { font-size: 19px; color: rgba(255,255,255,.75); max-width: 680px; line-height: 1.65; margin-bottom: 32px; }
    .article-meta { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
    .meta-author { display: flex; align-items: center; gap: 10px; }
    .meta-av { width: 40px; height: 40px; border-radius: 50%; background: rgba(255,255,255,.15); display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 800; color: #fff; }
    .meta-name { font-size: 14px; font-weight: 700; color: #fff; }
    .meta-role { font-size: 12px; color: rgba(255,255,255,.5); }
    .meta-divider { width: 1px; height: 36px; background: rgba(255,255,255,.15); }
    .meta-item { font-size: 13px; color: rgba(255,255,255,.55); font-weight: 600; }

    main { flex: 1; }
    .article-layout { display: grid; grid-template-columns: 1fr 280px; gap: 64px; max-width: 1100px; margin: 0 auto; padding: 64px 24px 80px; }
    .article-body h2 { font-size: 26px; font-weight: 800; color: #0f172a; margin: 44px 0 16px; line-height: 1.25; }
    .article-body h3 { font-size: 19px; font-weight: 700; color: #0f172a; margin: 28px 0 12px; }
    .article-body p { font-size: 16px; color: #374151; line-height: 1.85; margin-bottom: 20px; }
    .article-body ul, .article-body ol { padding-left: 24px; margin-bottom: 20px; }
    .article-body li { font-size: 16px; color: #374151; line-height: 1.8; margin-bottom: 10px; }
    .pull-quote { border-left: 4px solid #6d28d9; background: #f5f3ff; border-radius: 0 12px 12px 0; padding: 24px 28px; margin: 32px 0; }
    .pull-quote p { font-size: 18px; font-weight: 700; color: #6d28d9; line-height: 1.5; margin: 0; font-style: italic; }
    .metric-table { width: 100%; border-collapse: collapse; margin: 32px 0; border-radius: 14px; overflow: hidden; border: 1px solid #e2e8f0; }
    .metric-table th { background: #f8fafc; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: .8px; color: #64748b; padding: 14px 18px; text-align: left; border-bottom: 1px solid #e2e8f0; }
    .metric-table td { padding: 14px 18px; font-size: 14px; color: #374151; font-weight: 600; border-bottom: 1px solid #f1f5f9; }
    .metric-table tr:last-child td { border-bottom: none; }
    .metric-table tr:nth-child(even) td { background: #fafafa; }
    .badge { display: inline-block; font-size: 11px; font-weight: 700; padding: 3px 9px; border-radius: 20px; }
    .badge.red { background: #fee2e2; color: #dc2626; }
    .badge.green { background: #dcfce7; color: #16a34a; }
    .stat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 32px 0; }
    .stat-card { background: #fff; border-radius: 14px; padding: 24px; border: 1px solid #e2e8f0; text-align: center; }
    .stat-num { font-size: 36px; font-weight: 900; color: #6d28d9; line-height: 1; margin-bottom: 8px; }
    .stat-label { font-size: 13px; color: #64748b; font-weight: 600; line-height: 1.4; }
    .numbered-list { counter-reset: list; list-style: none; padding: 0; }
    .numbered-list li { counter-increment: list; display: flex; gap: 16px; padding: 18px 0; border-bottom: 1px solid #f1f5f9; }
    .numbered-list li:last-child { border-bottom: none; }
    .numbered-list li::before { content: counter(list); width: 28px; height: 28px; background: #6d28d9; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; flex-shrink: 0; margin-top: 2px; }
    .numbered-list li strong { display: block; font-size: 15px; font-weight: 800; color: #0f172a; margin-bottom: 4px; }
    .numbered-list li span { font-size: 14px; color: #64748b; line-height: 1.6; }
    .cta-box { background: linear-gradient(135deg, #1e1b4b, #6d28d9); border-radius: 20px; padding: 40px; text-align: center; margin-top: 48px; }
    .cta-box h3 { font-size: 24px; font-weight: 800; color: #fff; margin-bottom: 12px; }
    .cta-box p { font-size: 15px; color: rgba(255,255,255,.75); margin-bottom: 24px; line-height: 1.6; }
    .btn-cta { display: inline-block; background: #fff; color: #6d28d9; padding: 14px 32px; border-radius: 50px; font-size: 15px; font-weight: 700; }

    .article-sidebar { padding-top: 8px; }
    .sidebar-card { background: #fff; border-radius: 14px; padding: 20px; border: 1px solid #e2e8f0; margin-bottom: 20px; }
    .sidebar-card h4 { font-size: 13px; font-weight: 800; color: #0f172a; margin-bottom: 14px; padding-bottom: 12px; border-bottom: 1px solid #f1f5f9; text-transform: uppercase; letter-spacing: .8px; }
    .toc-item { display: flex; gap: 10px; align-items: flex-start; padding: 8px 0; border-bottom: 1px solid #f8fafc; font-size: 13px; color: #475569; font-weight: 600; cursor: pointer; transition: color .2s; }
    .toc-item:hover { color: #0D47A1; }
    .toc-item:last-child { border-bottom: none; }
    .toc-num { font-size: 10px; font-weight: 800; color: #6d28d9; background: #f5f3ff; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
    .related-post { padding: 12px 0; border-bottom: 1px solid #f1f5f9; }
    .related-post:last-child { border-bottom: none; }
    .related-tag { font-size: 10px; font-weight: 700; color: #0D47A1; text-transform: uppercase; letter-spacing: .5px; }
    .related-post h5 { font-size: 13px; font-weight: 700; color: #0f172a; margin-top: 4px; line-height: 1.35; }

    footer { background: #0f172a; color: #94a3b8; padding: 60px 60px 30px; }
    .footer-top { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; margin-bottom: 48px; }
    .footer-brand .logo { font-size: 22px; font-weight: 800; color: #38bdf8; margin-bottom: 14px; }
    .footer-brand p { font-size: 13px; line-height: 1.7; color: #64748b; margin-bottom: 16px; }
    .footer-col h4 { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #e2e8f0; margin-bottom: 18px; }
    .footer-col ul { list-style: none; }
    .footer-col ul li { margin-bottom: 10px; font-size: 13px; }
    .footer-col ul li a { color: #64748b; transition: color .2s; }
    .footer-col ul li a:hover { color: #38bdf8; }
    .footer-bottom { border-top: 1px solid #1e293b; padding-top: 24px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
    .footer-bottom p { font-size: 12px; color: #475569; }
    .footer-legal { display: flex; gap: 20px; }
    .footer-legal a { font-size: 12px; color: #475569; transition: color .2s; }
    .footer-legal a:hover { color: #38bdf8; }
    @media (max-width: 900px) { .article-layout { grid-template-columns: 1fr; } .stat-grid { grid-template-columns: 1fr 1fr; } .footer-top { grid-template-columns: 1fr 1fr; } }
    @media (max-width: 640px) { nav { padding: 0 20px; height: 56px; } .nav-links, .btn-nav { display: none; } .nav-toggle { display: flex; } .article-hero { padding: 48px 20px 56px; } .article-hero h1 { font-size: 30px; } footer { padding: 40px 20px 20px; } .footer-top { grid-template-columns: 1fr; } }
  
      `}</style>
<section className="article-hero">
  <iframe className="article-hero-bg" src="/assets/blog-vanity-metrics.html" title=""></iframe>
  <div className="article-hero-inner">
    <div className="breadcrumb"><a href="/blog/">Blog</a><span>›</span>Analytics</div>
    <div className="article-tag">Analytics</div>
    <h1>From Vanity Metrics to Value: What Your Customer Data Is Really Telling You</h1>
    <p className="lead">Your dashboard looks impressive. Your retention numbers say otherwise. The gap between them is where most customer strategies quietly fall apart.</p>
    <div className="article-meta">
      <div className="meta-author">
        <div className="meta-av">DB</div>
        <div>
          <div className="meta-name">KronGage Editorial</div>
          <div className="meta-role">Customer Engagement Intelligence</div>
        </div>
      </div>
      <div className="meta-divider"></div>
      <div className="meta-item">April 2025</div>
      <div className="meta-divider"></div>
      <div className="meta-item">7 min read</div>
    </div>
  </div>
</section>

<main>
<div className="article-layout">
  <article className="article-body">

    <p>There is a certain kind of meeting where someone puts up a slide with 2.4 million impressions, a 38% email open rate, and 12,000 new followers — and everyone nods. The numbers are big. The trend lines go up. The meeting ends.</p>

    <p>And three months later, churn is at 8%.</p>

    <p>This is the vanity metric trap, and it is far more expensive than most leadership teams realize. Not because these numbers are fake — they're real. But because they measure activity, not outcomes. They tell you what happened to your content, not what happened to your customers.</p>

    <p>The companies that are winning the retention game have figured out a different set of numbers to obsess over. Let me tell you what those are and why they're different.</p>

    <div className="stat-grid">
      <div className="stat-card"><div className="stat-num">67%</div><div className="stat-label">of companies cite "too much data, not enough insight" as their primary analytics challenge</div></div>
      <div className="stat-card"><div className="stat-num">5×</div><div className="stat-label">more expensive to acquire a new customer than to retain an existing one</div></div>
      <div className="stat-card"><div className="stat-num">1%</div><div className="stat-label">reduction in churn can increase company value by as much as 12% over five years</div></div>
    </div>

    <h2 id="vanity-problem">The Vanity Metric Problem, Precisely Defined</h2>

    <p>A vanity metric is any number that can go up while your business goes down. That's the test. Impressions can increase while revenue falls. Open rates can climb while churn accelerates. Follower counts can surge while NPS craters.</p>

    <p>These metrics feel good because they're responsive. You run a campaign, impressions jump. You A/B test a subject line, open rate ticks up. The feedback loop is short and satisfying. The problem is that the feedback loop has nothing to do with whether the customer stayed, bought again, or recommended you.</p>

    <div className="pull-quote">
      <p>"I've seen teams celebrate a 42% open rate while their monthly cohort retention dropped for the fifth consecutive month. The email performed. The business didn't. Nobody in the meeting connected those two facts."</p>
    </div>

    <h2 id="metrics-predict">The Metrics That Actually Predict What Happens Next</h2>

    <p>Here's a cleaner way to think about it: the metrics that matter are the ones with a proven causal link to the outcomes your business depends on. Retention. Expansion. Referral. That's the short list of things that drive sustainable revenue. Every metric worth tracking should trace back to one of those three.</p>

    <table className="metric-table">
      <thead>
        <tr><th>Vanity Metric</th><th>What You Track Instead</th><th>Why It's Better</th></tr>
      </thead>
      <tbody>
        <tr><td>Email open rate</td><td>Post-email conversion / action rate</td><td>Measures whether the email drove a behavior, not just a click</td></tr>
        <tr><td>Total followers</td><td>Engaged audience growth rate</td><td>Growth in people who actually respond, not just observe</td></tr>
        <tr><td>Monthly active users</td><td>Feature adoption depth &amp; session frequency trends</td><td>Distinguishes shallow engagement from sticky usage</td></tr>
        <tr><td>CSAT score</td><td>CSAT-to-renewal correlation by segment</td><td>Connects satisfaction to the business outcome it's supposed to predict</td></tr>
        <tr><td>Support tickets resolved</td><td>Repeat contact rate &amp; first-contact resolution</td><td>Measures whether the resolution actually held</td></tr>
      </tbody>
    </table>

    <h2 id="five-numbers">Five Numbers That Churn Prediction Actually Runs On</h2>

    <p>If I had to give a customer success leader one framework to start with, this would be it. These five metrics, tracked correctly, will tell you more about what's about to happen than any campaign dashboard.</p>

    <ol className="numbered-list">
      <li>
        <strong>Product engagement decay rate</strong>
        <span>How quickly is the customer's usage declining from their peak? A customer who logged in daily during month one and is now monthly is not a "monthly active user." They're a pre-churn signal. Track the slope, not the absolute number.</span>
      </li>
      <li>
        <strong>Support contact frequency change</strong>
        <span>Customers who suddenly start contacting support more than their historical average are often struggling with something. Customers who go silent after previously being active are often already gone in their head. Both patterns matter.</span>
      </li>
      <li>
        <strong>Net Revenue Retention (NRR)</strong>
        <span>This is the one number that forces honesty. NRR tells you whether your existing customers are collectively worth more or less than they were 12 months ago, accounting for churn, downgrades, upsells, and expansions. Anything above 100% means your base is growing without new sales. Below 100% means you're running to stand still.</span>
      </li>
      <li>
        <strong>Time-to-value by acquisition channel</strong>
        <span>Customers from different sources have radically different retention profiles. If you're not segmenting your retention data by acquisition channel, you're likely averaging away the insight that one channel delivers customers who stay for three years while another delivers customers who churn at six months.</span>
      </li>
      <li>
        <strong>Milestone completion rate in the first 30 days</strong>
        <span>Whatever the key actions are in your product's first month — the ones that correlate with long-term retention — track what percentage of new customers complete them. This is the leading indicator that tells you your retention story before the retention story is written.</span>
      </li>
    </ol>

    <h2 id="fragmented-data">What To Do When Your Data Is Fragmented</h2>

    <p>Here's the challenge most teams face: the data that would answer these questions lives in five different places. Product analytics in one tool. Support tickets in another. Campaign data in a third. CRM in a fourth. Nobody has joined them.</p>

    <p>So when churn spikes, nobody knows whether it's a product problem, a support problem, a messaging problem, or a segment problem. Everyone suspects it's someone else's problem. Post-mortems go in circles. Nothing systematic changes.</p>

    <p>The answer isn't more dashboards. It's a unified customer record — one profile per customer that aggregates every interaction, every support ticket, every campaign touch, every product session. Then you can actually run the correlations. Then you can see that customers who received fewer than three proactive check-ins in month two churned at 3× the rate of those who received more. Then you can do something about it before they're gone.</p>

    <h2 id="celebrate">Changing What You Celebrate</h2>

    <p>This is ultimately a leadership question as much as a technology one. The metrics you put on the weekly slide determine what behavior gets rewarded. If you're celebrating open rates, your team will optimize for open rates. If you're celebrating retention cohorts, your team will protect them.</p>

    <p>The shift isn't complicated to explain. It's just uncomfortable to make, because it means retiring some numbers that felt like wins. It means being honest that a 40% open rate on a campaign where 30% of those customers churned within 90 days is not, in fact, something to celebrate.</p>

    <p>But the teams that make that shift — that decide to measure outcomes rather than activity — are the ones who find they actually have something actionable to work with. The data stops being something you report and starts being something you use.</p>

    <p>That's a different kind of meeting entirely.</p>

    <div className="cta-box">
      <h3>See What Your Customer Data Is Really Saying</h3>
      <p>KronGage connects engagement, support, and campaign data into a single customer record — so you can run the correlations that actually predict churn.</p>
      <a href="/contact/" className="btn-cta">Book a Demo</a>
    </div>

  </article>

  <aside className="article-sidebar">
    <div className="sidebar-card">
      <h4>In This Article</h4>
      <a href="#vanity-problem" className="toc-item"><div className="toc-num">1</div>The Vanity Metric Problem</a>
      <a href="#metrics-predict" className="toc-item"><div className="toc-num">2</div>Metrics That Predict Outcomes</a>
      <a href="#five-numbers" className="toc-item"><div className="toc-num">3</div>Five Numbers Churn Runs On</a>
      <a href="#fragmented-data" className="toc-item"><div className="toc-num">4</div>When Your Data Is Fragmented</a>
      <a href="#celebrate" className="toc-item"><div className="toc-num">5</div>Changing What You Celebrate</a>
    </div>
    <div className="sidebar-card">
      <h4>Related Reading</h4>
      <div className="related-post">
        <div className="related-tag">Customer Success</div>
        <h5><a href="/blog/retention-gap/">The Retention Gap: Why Success Teams Struggle</a></h5>
      </div>
      <div className="related-post">
        <div className="related-tag">AI &amp; Automation</div>
        <h5><a href="/blog/ai-support-tier-1/">How AI Agents Are Replacing Tier-1 Support</a></h5>
      </div>
      <div className="related-post">
        <div className="related-tag">Omnichannel</div>
        <h5><a href="/blog/beyond-whatsapp/">Beyond WhatsApp: True Omnichannel in 2025</a></h5>
      </div>
    </div>
    <div className="sidebar-card" style={{background:"linear-gradient(135deg,#1e1b4b,#6d28d9)",borderColor:"transparent"}}>
      <h4 style={{color:"#a5b4fc",borderColor:"rgba(255,255,255,.1)"}}>Analytics Demo</h4>
      <p style={{fontSize:"13px",color:"rgba(255,255,255,.65)",lineHeight:"1.6",marginBottom:"16px"}}>See how KronGage's unified customer record surfaces the metrics that actually predict churn — before it happens.</p>
      <a href="/contact/" style={{display:"block",background:"#fff",color:"#6d28d9",textAlign:"center",padding:"11px",borderRadius:"50px",fontSize:"13px",fontWeight:"700"}}>Request Demo →</a>
    </div>
  </aside>
</div>
</main>
    </>
  );
}
