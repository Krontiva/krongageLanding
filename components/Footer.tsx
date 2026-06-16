import Link from 'next/link';

const PLATFORM_LINKS = [
  ['Omnichannel Inbox', '/platform/omnichannel-inbox'],
  ['Social Media Management', '/platform/social-media'],
  ['AI & Automation', '/platform/ai-automation'],
  ['Customer 360', '/platform/customer-data'],
  ['Campaign Management', '/platform/campaign-management'],
  ['Analytics & BI', '/platform/analytics'],
];

const SOLUTIONS_LINKS = [
  ['Banking & Finance', '/solutions/banking'],
  ['Telecommunications', '/solutions/telecom'],
  ['FMCG & Retail', '/solutions/fmcg'],
  ['Healthcare', '/solutions/healthcare'],
  ['Insurance', '/solutions/insurance'],
  ['Government', '/solutions/government'],
];

const COMPANY_LINKS = [
  ['About Krondiva', '/about'],
  ['Contact Us', '/contact'],
  ['Blog', '/blog'],
  ['Privacy Policy', '/privacy-policy'],
  ['Terms of Service', '/terms-of-service'],
  ['Data Protection', '/data-protection'],
  ['Sitemap', '/sitemap'],
];

export default function Footer() {
  return (
    <footer style={{ fontFamily: 'Manrope, system-ui, sans-serif', background: '#0f172a', color: '#fff' }}>
      <style>{`
        .ft-link { color: #94a3b8; text-decoration: none; font-size: 14px; transition: color 0.15s; }
        .ft-link:hover { color: #fff; }
        .ft-bottom-link { color: #475569; text-decoration: none; font-size: 13px; transition: color 0.15s; }
        .ft-bottom-link:hover { color: #94a3b8; }
        @media (max-width: 768px) { .ft-grid { grid-template-columns: 1fr 1fr !important; } .ft-brand { grid-column: span 2 !important; } }
        @media (max-width: 480px) { .ft-grid { grid-template-columns: 1fr !important; } .ft-brand { grid-column: span 1 !important; } }
      `}</style>
      <div style={{ maxWidth: '1200px', margin: '0 auto', paddingLeft: '32px', paddingRight: '32px', paddingTop: '64px', paddingBottom: '40px' }}>

        {/* Main grid */}
        <div className="ft-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '40px', marginBottom: '56px' }}>

          {/* Brand column */}
          <div className="ft-brand">
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#60a5fa', marginBottom: '12px', letterSpacing: '-0.02em' }}>
              KronGage
            </div>
            <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6, marginBottom: '6px' }}>
              Enterprise AI Customer Engagement — World-Class Platform
            </p>
            <p style={{ fontSize: '12px', color: '#475569', lineHeight: 1.7 }}>
              Developed by Krondiva.<br />
              Delivering world-class enterprise solutions globally.<br />
              Certified Meta WhatsApp Technology Provider.
            </p>

            {/* Meta badge */}
            <div style={{ marginTop: '20px', display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#1e293b', borderRadius: '10px', paddingLeft: '14px', paddingRight: '14px', paddingTop: '10px', paddingBottom: '10px' }}>
              <div style={{ background: '#1877F2', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#fff' }}>Certified Meta</div>
                <div style={{ fontSize: '10px', color: '#94a3b8' }}>WhatsApp Business Partner</div>
              </div>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#64748b', marginBottom: '20px' }}>Platform</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {PLATFORM_LINKS.map(([label, href]) => (
                <li key={href}><Link href={href} className="ft-link">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#64748b', marginBottom: '20px' }}>Solutions</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {SOLUTIONS_LINKS.map(([label, href]) => (
                <li key={href}><Link href={href} className="ft-link">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#64748b', marginBottom: '20px' }}>Company</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {COMPANY_LINKS.map(([label, href]) => (
                <li key={href}><Link href={href} className="ft-link">{label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid #1e293b', paddingTop: '28px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <span style={{ fontSize: '13px', color: '#475569' }}>
            © {new Date().getFullYear()} Krondiva. KronGage is a product of Krondiva Ltd. All Rights Reserved.
          </span>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <Link href="/privacy-policy" className="ft-bottom-link">Privacy Policy</Link>
            <Link href="/terms-of-service" className="ft-bottom-link">Terms of Service</Link>
            <Link href="/data-protection" className="ft-bottom-link">Data Protection</Link>
            <Link href="/sitemap" className="ft-bottom-link">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
