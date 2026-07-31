import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sitemap – KronGage',
  description: 'KronGage – Unified Customer Engagement Platform',
};

export default function Page() {
  return (
    <>
      <style>{`
        main { flex: 1; max-width: 900px; margin: 0 auto; padding: 60px 24px 80px; width: 100%; }
        .page-header { margin-bottom: 48px; }
        .page-header h1 { font-size: 42px; font-weight: 800; color: #0D47A1; margin-bottom: 10px; }
        .page-header p { font-size: 15px; color: #64748b; }
        .sitemap-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
        .sitemap-group h2 { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #0D47A1; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid #EEF5FD; }
        .sitemap-group ul { list-style: none; padding: 0; margin: 0; }
        .sitemap-group ul li { margin-bottom: 10px; }
        .sitemap-group ul li a { font-size: 14px; font-weight: 600; color: #374151; display: flex; align-items: center; gap: 8px; transition: color .2s; text-decoration: none; }
        .sitemap-group ul li a:hover { color: #0D47A1; }
        .sitemap-group ul li a::before { content: '→'; font-size: 12px; color: #0D47A1; }
        @media (max-width: 768px) { .sitemap-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 640px) { .page-header h1 { font-size: 30px; } .sitemap-grid { grid-template-columns: 1fr; } }
      `}</style>

      <main>
        <div className="page-header">
          <h1>Sitemap</h1>
          <p>A complete overview of all pages on the KronGage website.</p>
        </div>

        <div className="sitemap-grid">
          <div className="sitemap-group">
            <h2>Main Pages</h2>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/platform">Why KronGage?</a></li>
              <li><a href="/platform">Platform</a></li>
              <li><a href="/solutions">Solutions</a></li>
              <li><a href="/pricing">Pricing</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/blog">Blog</a></li>
            </ul>
          </div>

          <div className="sitemap-group">
            <h2>Platform</h2>
            <ul>
              <li><a href="/platform/omnichannel-inbox">Omnichannel Inbox</a></li>
              <li><a href="/platform/social-media">Social Media Management</a></li>
              <li><a href="/platform/ai-automation">AI &amp; Automation</a></li>
              <li><a href="/platform/customer-data">Customer 360</a></li>
              <li><a href="/platform/campaign-management">Campaign Management</a></li>
              <li><a href="/platform/analytics">Analytics &amp; BI</a></li>
              <li><a href="/platform/social-intelligence">Social Intelligence</a></li>
              <li><a href="/platform/security">Security &amp; Compliance</a></li>
            </ul>
          </div>

          <div className="sitemap-group">
            <h2>Solutions</h2>
            <ul>
              <li><a href="/solutions/banking">Banking &amp; Finance</a></li>
              <li><a href="/solutions/telecom">Telecommunications</a></li>
              <li><a href="/solutions/fmcg">FMCG &amp; Retail</a></li>
              <li><a href="/solutions/healthcare">Healthcare</a></li>
              <li><a href="/solutions/insurance">Insurance</a></li>
              <li><a href="/solutions/government">Government &amp; Public Sector</a></li>
            </ul>
          </div>

          <div className="sitemap-group">
            <h2>Legal</h2>
            <ul>
              <li><a href="/privacy-policy">Privacy Policy</a></li>
              <li><a href="/terms-of-service">Terms of Service</a></li>
              <li><a href="/data-protection">Data Protection</a></li>
              <li><a href="/sitemap">Sitemap</a></li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
