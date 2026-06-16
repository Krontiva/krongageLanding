'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const PLATFORM_OVERVIEW = [
  { label: 'Customer 360', href: '/platform/customer-data', desc: 'Know who your customer is regardless of the touch point or channel.', icon: '👥' },
  { label: 'Omnichannel Inbox', href: '/platform/omnichannel-inbox', desc: 'Send all messages from one place.', icon: '💬' },
];

const PLATFORM_CAPABILITIES = [
  { label: 'Campaign Management', href: '/platform/campaign-management', desc: 'Manage the customer journey for SMS, WhatsApp and email', icon: '📣' },
  { label: 'AI Automation', href: '/platform/ai-automation', desc: 'Automate the mundane communication flows', icon: '🤖' },
  { label: 'Social Media Management', href: '/platform/social-media', desc: 'All your social media channels in one place.', icon: '📱' },
  { label: 'Social Listening', href: '/platform/social-intelligence', desc: 'Monitor conversations across all social channels.', icon: '🎧' },
];

const PLATFORM_CHANNELS = [
  { label: 'Email', icon: '✉️', href: '/platform/channels/email' },
  { label: 'Web Messaging SMS/RCS WhatsApp', icon: '🌐', href: '/platform/channels/web' },
  { label: 'SMS/RCS', icon: '📲', href: '/platform/channels/sms' },
  { label: 'WhatsApp', icon: '💚', href: '/platform/channels/whatsapp' },
];

const SOLUTIONS_INDUSTRIES = [
  { label: 'Banking & Finance', href: '/solutions/banking' },
  { label: 'Telecommunications', href: '/solutions/telecom' },
  { label: 'FMCG & Retail', href: '/solutions/fmcg' },
  { label: 'Healthcare', href: '/solutions/healthcare' },
  { label: 'Insurance', href: '/solutions/insurance' },
  { label: 'Government & Public Sector', href: '/solutions/government' },
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
        .channel-item { display: flex; align-items: center; gap: 8px; padding-left: 10px; padding-right: 10px; padding-top: 7px; padding-bottom: 7px; border-radius: 8px; text-decoration: none; color: #334155; font-size: 13px; font-weight: 500; transition: background 0.12s; }
        .channel-item:hover { background: #f8fafc; }
        .solutions-item { display: block; padding-left: 12px; padding-right: 12px; padding-top: 8px; padding-bottom: 8px; border-radius: 8px; text-decoration: none; color: #334155; font-size: 14px; font-weight: 500; transition: background 0.12s; }
        .solutions-item:hover { background: #f8fafc; color: #0D47A1; }
        @media (min-width: 768px) { .nav-desktop { display: flex !important; } .nav-mobile-btn { display: none !important; } }
      `}</style>
      <nav style={{ fontFamily: 'Manrope, system-ui, sans-serif', position: 'sticky', top: 0, zIndex: 50, background: '#fff', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px', maxWidth: '1200px', margin: '0 auto', paddingLeft: '32px', paddingRight: '32px' }}>

          {/* Logo */}
          <Link href="/" style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
            <Image src="/Krongage-Logo.png" alt="KronGage" width={38} height={38} style={{ height: '38px', width: 'auto' }} />
          </Link>

          {/* Desktop nav links */}
          <ul className="nav-desktop" style={{ display: 'none', alignItems: 'center', gap: '32px', listStyle: 'none', margin: 0 }}>
            <li><Link href="/" className="nav-link">Home</Link></li>
            <li><Link href="/about" className="nav-link">Why KronGage?</Link></li>

            {/* Platform mega */}
            <li style={{ position: 'relative' }}
              onMouseEnter={() => setOpen('platform')}
              onMouseLeave={() => setOpen(null)}>
              <button className="nav-dropdown-btn">
                Platform <span style={{ fontSize: '10px' }}>{open === 'platform' ? '▲' : '▾'}</span>
              </button>
              {open === 'platform' && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)',
                  width: '760px', background: '#fff', borderRadius: '16px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.12)', border: '1px solid #f1f5f9',
                  display: 'grid', gridTemplateColumns: '240px 1fr 190px',
                }}>
                  {/* Left: Overview */}
                  <div style={{ paddingLeft: '24px', paddingRight: '24px', paddingTop: '24px', paddingBottom: '24px', borderRight: '1px solid #f1f5f9' }}>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>The KronGage Platform</div>
                    <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.6, marginBottom: '14px' }}>All your customer data, channels and engagement orchestration in one place.</p>
                    <Link href="/platform" style={{ fontSize: '13px', fontWeight: 700, color: '#0D47A1', textDecoration: 'none' }}>View the platform →</Link>
                    <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {PLATFORM_OVERVIEW.map(item => (
                        <a key={item.href} href={item.href} className="mega-item">
                          <span style={{ fontSize: '20px', flexShrink: 0 }}>{item.icon}</span>
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{item.label}</div>
                            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px', lineHeight: 1.4 }}>{item.desc}</div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Middle: Featured Capabilities */}
                  <div style={{ paddingLeft: '24px', paddingRight: '24px', paddingTop: '24px', paddingBottom: '24px', borderRight: '1px solid #f1f5f9' }}>
                    <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '14px' }}>Featured Capabilities</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {PLATFORM_CAPABILITIES.map(item => (
                        <a key={item.href} href={item.href} className="mega-item">
                          <span style={{ fontSize: '18px', flexShrink: 0 }}>{item.icon}</span>
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{item.label}</div>
                            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px', lineHeight: 1.4 }}>{item.desc}</div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Right: Featured Channels */}
                  <div style={{ paddingLeft: '16px', paddingRight: '16px', paddingTop: '24px', paddingBottom: '24px' }}>
                    <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '14px' }}>Featured Channels</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      {PLATFORM_CHANNELS.map(ch => (
                        <a key={ch.href} href={ch.href} className="channel-item">
                          <span style={{ fontSize: '15px' }}>{ch.icon}</span>
                          <span>{ch.label}</span>
                        </a>
                      ))}
                      <a href="/platform/channels" style={{ fontSize: '12px', fontWeight: 700, color: '#0D47A1', textDecoration: 'none', paddingLeft: '10px', paddingTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        ✳ View All Channels
                      </a>
                    </div>
                    <div style={{ marginTop: '14px', background: '#EEF5FD', borderRadius: '10px', paddingLeft: '12px', paddingRight: '12px', paddingTop: '12px', paddingBottom: '12px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <div style={{ background: '#0D47A1', borderRadius: '8px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ fontSize: '14px' }}>🔒</span>
                      </div>
                      <div>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>How it works?</div>
                        <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px', lineHeight: 1.4 }}>Understand how our omni channel inbox works to keep message clutter at bay.</div>
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
                <div style={{
                  position: 'absolute', top: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)',
                  width: '520px', background: '#fff', borderRadius: '16px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.12)', border: '1px solid #f1f5f9',
                  display: 'grid', gridTemplateColumns: '210px 1fr',
                }}>
                  {/* Left: Industries */}
                  <div style={{ paddingLeft: '20px', paddingRight: '20px', paddingTop: '20px', paddingBottom: '20px', borderRight: '1px solid #f1f5f9' }}>
                    <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '12px' }}>Industries</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      {SOLUTIONS_INDUSTRIES.map(item => (
                        <a key={item.href} href={item.href} className="solutions-item">{item.label}</a>
                      ))}
                    </div>
                  </div>

                  {/* Right: Feature highlight */}
                  <div style={{ paddingLeft: '20px', paddingRight: '20px', paddingTop: '20px', paddingBottom: '20px' }}>
                    <div style={{ background: 'linear-gradient(135deg, #EEF5FD 0%, #dbeafe 100%)', borderRadius: '10px', height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                      <span style={{ fontSize: '36px' }}>📊</span>
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', lineHeight: 1.4, marginBottom: '6px' }}>
                      The Retention Gap: Why Success Teams Struggle
                    </div>
                    <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.5 }}>
                      In an era of endless options, &ldquo;customer success&rdquo; has become more than just a department — it&apos;s a survival strategy.
                    </p>
                  </div>
                </div>
              )}
            </li>
          </ul>

          {/* Desktop CTA */}
          <div className="nav-desktop" style={{ display: 'none', alignItems: 'center', gap: '20px' }}>
            <a
              href="https://web.krongage.io/"
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
                paddingLeft: '20px', paddingRight: '20px', paddingTop: '10px', paddingBottom: '10px',
                borderRadius: '50px', fontSize: '14px', fontWeight: 700,
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
          <div style={{ background: '#fff', borderTop: '1px solid #f1f5f9', paddingLeft: '24px', paddingRight: '24px', paddingTop: '16px', paddingBottom: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link href="/" style={{ fontSize: '15px', fontWeight: 600, color: '#334155', textDecoration: 'none' }} onClick={() => setMobileOpen(false)}>Home</Link>
            <Link href="/about" style={{ fontSize: '15px', fontWeight: 600, color: '#334155', textDecoration: 'none' }} onClick={() => setMobileOpen(false)}>Why KronGage?</Link>
            <Link href="/platform" style={{ fontSize: '15px', fontWeight: 600, color: '#334155', textDecoration: 'none' }} onClick={() => setMobileOpen(false)}>Platform</Link>
            <Link href="/solutions" style={{ fontSize: '15px', fontWeight: 600, color: '#334155', textDecoration: 'none' }} onClick={() => setMobileOpen(false)}>Solutions</Link>
            <Link href="/pricing" style={{ fontSize: '15px', fontWeight: 600, color: '#334155', textDecoration: 'none' }} onClick={() => setMobileOpen(false)}>Pricing</Link>
            <a href="https://web.krongage.io/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '15px', fontWeight: 600, color: '#0D47A1', textDecoration: 'none' }} onClick={() => setMobileOpen(false)}>Log in</a>
            <Link
              href="/pricing"
              style={{ background: '#0D47A1', color: '#fff', textDecoration: 'none', paddingTop: '12px', paddingBottom: '12px', borderRadius: '50px', textAlign: 'center', fontSize: '15px', fontWeight: 700, display: 'block' }}
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
