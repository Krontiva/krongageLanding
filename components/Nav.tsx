'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Inline Material Design SVG icon
function Icon({ path, size = 18, color = '#0D47A1' }: { path: string; size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ flexShrink: 0 }}>
      <path d={path} />
    </svg>
  );
}

// Material icon paths
const ICONS = {
  peopleAlt:  'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
  forum:      'M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z',
  campaign:   'M18 11v2h4v-2h-4zm-2 6.61c.96.71 2.21 1.65 3.2 2.39.4-.53.8-1.07 1.2-1.61-.99-.74-2.24-1.68-3.2-2.4-.4.54-.8 1.08-1.2 1.62zM20.4 5.6c-.4-.53-.8-1.07-1.2-1.6-.99.74-2.24 1.68-3.2 2.4.4.53.8 1.07 1.2 1.6.96-.72 2.21-1.65 3.2-2.4zM4 9c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h1v4h2v-4h1l5 3V6L8 9H4zm11.5 3c0-1.33-.58-2.53-1.5-3.35v6.69c.92-.81 1.5-2.01 1.5-3.34z',
  autoAwesome:'M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z',
  phoneIphone:'M15.5 1h-8C6.12 1 5 2.12 5 3.5v17C5 21.88 6.12 23 7.5 23h8c1.38 0 2.5-1.12 2.5-2.5v-17C18 2.12 16.88 1 15.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5S10.67 19 11.5 19s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4H7V4h9v14z',
  graphicEq:  'M7 18h2V6H7v12zm4 4h2V2h-2v20zm-8-8h2v-4H3v4zm12 4h2V6h-2v12zm4-8v4h2v-4h-2z',
  email:      'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
  language:   'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.91-4.33-3.56zm2.95-8H5.08c.96-1.65 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z',
  sms:        'M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z',
  chat:       'M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z',
  lock:       'M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z',
  barChart:   'M4 9h4v11H4zm6-5h4v16h-4zm6 8h4v8h-4z',
  apps:       'M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z',
};

const PLATFORM_OVERVIEW = [
  { label: 'Customer 360',     href: '/platform/customer-data',      desc: 'Know who your customer is regardless of the touch point or channel.', icon: 'peopleAlt' as const },
  { label: 'Omnichannel Inbox',href: '/platform/omnichannel-inbox',   desc: 'Send all messages from one place.',                                   icon: 'forum' as const },
];

const PLATFORM_CAPABILITIES = [
  { label: 'Campaign Management',     href: '/platform/campaign-management', desc: 'Manage the customer journey for SMS, WhatsApp and email', icon: 'campaign' as const },
  { label: 'AI Automation',           href: '/platform/ai-automation',       desc: 'Automate the mundane communication flows',              icon: 'autoAwesome' as const },
  { label: 'Social Media Management', href: '/platform/social-media',        desc: 'All your social media channels in one place.',          icon: 'phoneIphone' as const },
  { label: 'Social Listening',        href: '/platform/social-intelligence',  desc: 'Monitor conversations across all social channels.',     icon: 'graphicEq' as const },
];

const PLATFORM_CHANNELS = [
  { label: 'Email',      icon: 'email' as const,    href: '/platform/channels/email' },
  { label: 'Web Messaging', icon: 'language' as const, href: '/platform/channels/web' },
  { label: 'SMS / RCS',  icon: 'sms' as const,      href: '/platform/channels/sms' },
  { label: 'WhatsApp',   icon: 'chat' as const,     href: '/platform/channels/whatsapp' },
];

const SOLUTIONS_INDUSTRIES = [
  { label: 'Banking & Finance',         href: '/solutions/banking' },
  { label: 'Telecommunications',        href: '/solutions/telecom' },
  { label: 'FMCG & Retail',             href: '/solutions/fmcg' },
  { label: 'Healthcare',                href: '/solutions/healthcare' },
  { label: 'Insurance',                 href: '/solutions/insurance' },
  { label: 'Government & Public Sector',href: '/solutions/government' },
];

export default function Nav() {
  const [open, setOpen] = useState<'platform' | 'solutions' | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <style>{`
        .nav-link { color: #475569; text-decoration: none; font-size: 14px; font-weight: 600; transition: color 0.15s; }
        .nav-link:hover { color: #0f172a; }
        .nav-dropdown-btn { background: none; border: none; cursor: pointer; font-family: Manrope, system-ui, sans-serif; font-size: 14px; font-weight: 600; color: #475569; display: flex; align-items: center; gap: 4px; transition: color 0.15s; padding: 0; }
        .nav-dropdown-btn:hover { color: #0f172a; }
        .mega-item { display: flex; align-items: flex-start; gap: 10px; padding: 10px; border-radius: 10px; text-decoration: none; transition: background 0.12s; }
        .mega-item:hover { background: #f8fafc; }
        .channel-item { display: flex; align-items: center; gap: 8px; padding: 7px 10px; border-radius: 8px; text-decoration: none; color: #334155; font-size: 13px; font-weight: 500; transition: background 0.12s; }
        .channel-item:hover { background: #f8fafc; }
        .solutions-item { display: block; padding: 8px 12px; border-radius: 8px; text-decoration: none; color: #334155; font-size: 14px; font-weight: 500; transition: background 0.12s; }
        .solutions-item:hover { background: #f8fafc; color: #0D47A1; }
        @media (min-width: 768px) { .nav-desktop { display: flex !important; } .nav-mobile-btn { display: none !important; } }
      `}</style>

      {/* display:block + padding:0 override page-level `nav { display:flex; padding:... }` CSS on inner pages */}
      <nav style={{ fontFamily: 'Manrope, system-ui, sans-serif', display: 'block', position: 'sticky', top: 0, zIndex: 50, background: '#fff', borderBottom: '1px solid #f1f5f9', padding: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px', maxWidth: '1200px', margin: '0 auto', paddingLeft: '32px', paddingRight: '32px' }}>

          {/* Logo */}
          <Link href="/" style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
            <Image src="/Krongage-Logo.png" alt="KronGage" width={38} height={38} style={{ height: '38px', width: 'auto' }} />
          </Link>

          {/* Desktop nav links */}
          <ul className="nav-desktop" style={{ display: 'none', alignItems: 'center', gap: '32px', listStyle: 'none', margin: 0, padding: 0 }}>
            <li><Link href="/" className="nav-link">Home</Link></li>
            <li><Link href="/platform" className="nav-link">Why KronGage?</Link></li>

            {/* Platform mega */}
            <li style={{ position: 'relative' }}
              onMouseEnter={() => setOpen('platform')}
              onMouseLeave={() => setOpen(null)}>
              <button className="nav-dropdown-btn">
                Platform <span style={{ fontSize: '10px' }}>{open === 'platform' ? '▲' : '▾'}</span>
              </button>
              {open === 'platform' && (
                <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', paddingTop: '8px', zIndex: 100 }}>
                <div style={{
                  width: '760px', background: '#fff', borderRadius: '16px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.12)', border: '1px solid #f1f5f9',
                  display: 'grid', gridTemplateColumns: '240px 1fr 190px',
                }}>
                  {/* Left: Overview */}
                  <div style={{ padding: '24px', borderRight: '1px solid #f1f5f9' }}>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>The KronGage Platform</div>
                    <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.6, marginBottom: '14px' }}>All your customer data, channels and engagement orchestration in one place.</p>
                    <Link href="/platform" style={{ fontSize: '13px', fontWeight: 700, color: '#0D47A1', textDecoration: 'none' }}>View the platform →</Link>
                    <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {PLATFORM_OVERVIEW.map(item => (
                        <a key={item.href} href={item.href} className="mega-item">
                          <div style={{ width: 32, height: 32, background: '#EEF5FD', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Icon path={ICONS[item.icon]} size={17} />
                          </div>
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{item.label}</div>
                            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px', lineHeight: 1.4 }}>{item.desc}</div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Middle: Featured Capabilities */}
                  <div style={{ padding: '24px', borderRight: '1px solid #f1f5f9' }}>
                    <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '14px' }}>Featured Capabilities</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {PLATFORM_CAPABILITIES.map(item => (
                        <a key={item.href} href={item.href} className="mega-item">
                          <div style={{ width: 32, height: 32, background: '#EEF5FD', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Icon path={ICONS[item.icon]} size={17} />
                          </div>
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{item.label}</div>
                            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px', lineHeight: 1.4 }}>{item.desc}</div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Right: Featured Channels */}
                  <div style={{ padding: '24px 16px' }}>
                    <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '14px' }}>Featured Channels</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      {PLATFORM_CHANNELS.map(ch => (
                        <a key={ch.href} href={ch.href} className="channel-item">
                          <Icon path={ICONS[ch.icon]} size={16} color="#475569" />
                          <span>{ch.label}</span>
                        </a>
                      ))}
                      <a href="/platform/channels" style={{ fontSize: '12px', fontWeight: 700, color: '#0D47A1', textDecoration: 'none', paddingLeft: '10px', paddingTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Icon path={ICONS.apps} size={14} /> View All Channels
                      </a>
                    </div>
                    <div style={{ marginTop: '14px', background: '#EEF5FD', borderRadius: '10px', padding: '12px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <div style={{ background: '#0D47A1', borderRadius: '8px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon path={ICONS.lock} size={16} color="#fff" />
                      </div>
                      <div>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>How it works?</div>
                        <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px', lineHeight: 1.4 }}>Understand how our omnichannel inbox works to keep message clutter at bay.</div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              )}
            </li>

            {/* Solutions mega */}
            <li style={{ position: 'relative' }}
              onMouseEnter={() => setOpen('solutions')}
              onMouseLeave={() => setOpen(null)}>
              <button className="nav-dropdown-btn">
                Solutions <span style={{ fontSize: '10px' }}>{open === 'solutions' ? '▲' : '▾'}</span>
              </button>
              {open === 'solutions' && (
                <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', paddingTop: '8px', zIndex: 100 }}>
                <div style={{
                  width: '520px', background: '#fff', borderRadius: '16px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.12)', border: '1px solid #f1f5f9',
                  display: 'grid', gridTemplateColumns: '210px 1fr',
                }}>
                  {/* Left: Industries */}
                  <div style={{ padding: '20px', borderRight: '1px solid #f1f5f9' }}>
                    <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '12px' }}>Industries</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      {SOLUTIONS_INDUSTRIES.map(item => (
                        <a key={item.href} href={item.href} className="solutions-item">{item.label}</a>
                      ))}
                    </div>
                  </div>

                  {/* Right: Feature highlight */}
                  <div style={{ padding: '20px' }}>
                    <div style={{ background: 'linear-gradient(135deg, #EEF5FD 0%, #dbeafe 100%)', borderRadius: '10px', height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                      <Icon path={ICONS.barChart} size={48} color="#0D47A1" />
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', lineHeight: 1.4, marginBottom: '6px' }}>
                      The Retention Gap: Why Success Teams Struggle
                    </div>
                    <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.5 }}>
                      In an era of endless options, &ldquo;customer success&rdquo; has become more than just a department — it&apos;s a survival strategy.
                    </p>
                  </div>
                </div>
                </div>
              )}
            </li>
          </ul>

          {/* Desktop CTA */}
          <div className="nav-desktop" style={{ display: 'none', alignItems: 'center', gap: '20px' }}>
            <a
              href={`${process.env.NEXT_PUBLIC_APP_URL || 'https://web.krongage.io'}/`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '14px', fontWeight: 600, color: '#0D47A1', textDecoration: 'none' }}
            >
              Log in
            </a>
            <Link
              href="/pricing"
              style={{
                background: '#0D47A1', color: '#fff', textDecoration: 'none',
                padding: '10px 20px', borderRadius: '50px', fontSize: '14px', fontWeight: 700,
              }}
            >
              Get Started
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="nav-mobile-btn"
            style={{ display: 'flex', flexDirection: 'column', gap: '5px', background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span style={{ width: '20px', height: '2px', background: '#475569', display: 'block' }} />
            <span style={{ width: '20px', height: '2px', background: '#475569', display: 'block' }} />
            <span style={{ width: '20px', height: '2px', background: '#475569', display: 'block' }} />
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div style={{ background: '#fff', borderTop: '1px solid #f1f5f9', padding: '16px 24px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link href="/" style={{ fontSize: '15px', fontWeight: 600, color: '#334155', textDecoration: 'none' }} onClick={() => setMobileOpen(false)}>Home</Link>
            <Link href="/platform" style={{ fontSize: '15px', fontWeight: 600, color: '#334155', textDecoration: 'none' }} onClick={() => setMobileOpen(false)}>Why KronGage?</Link>
            <Link href="/platform" style={{ fontSize: '15px', fontWeight: 600, color: '#334155', textDecoration: 'none' }} onClick={() => setMobileOpen(false)}>Platform</Link>
            <Link href="/solutions" style={{ fontSize: '15px', fontWeight: 600, color: '#334155', textDecoration: 'none' }} onClick={() => setMobileOpen(false)}>Solutions</Link>
            <Link href="/pricing" style={{ fontSize: '15px', fontWeight: 600, color: '#334155', textDecoration: 'none' }} onClick={() => setMobileOpen(false)}>Pricing</Link>
            <a href={`${process.env.NEXT_PUBLIC_APP_URL || 'https://web.krongage.io'}/`} target="_blank" rel="noopener noreferrer" style={{ fontSize: '15px', fontWeight: 600, color: '#0D47A1', textDecoration: 'none' }} onClick={() => setMobileOpen(false)}>Log in</a>
            <Link
              href="/pricing"
              style={{ background: '#0D47A1', color: '#fff', textDecoration: 'none', padding: '12px', borderRadius: '50px', textAlign: 'center', fontSize: '15px', fontWeight: 700, display: 'block' }}
              onClick={() => setMobileOpen(false)}
            >
              Get Started
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}
