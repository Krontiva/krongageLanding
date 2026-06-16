'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const PLATFORM_LINKS = [
  { label: 'Platform Overview', href: '/platform', desc: 'The full KronGage platform' },
  { label: 'Customer Data', href: '/platform/customer-data', desc: 'Unified profiles & 360° view' },
  { label: 'Omnichannel Inbox', href: '/platform/omnichannel-inbox', desc: 'Every channel, one inbox' },
  { label: 'Campaign Management', href: '/platform/campaign-management', desc: 'Automated campaign flows' },
  { label: 'AI & Automation', href: '/platform/ai-automation', desc: 'Autonomous AI agents' },
  { label: 'Analytics', href: '/platform/analytics', desc: 'Real-time BI dashboards' },
  { label: 'Social Intelligence', href: '/platform/social-intelligence', desc: 'Listening & monitoring' },
  { label: 'Social Media', href: '/platform/social-media', desc: 'Publishing & scheduling' },
  { label: 'Security', href: '/platform/security', desc: 'Enterprise-grade compliance' },
];

const SOLUTIONS_LINKS = [
  { label: 'Telecommunications', href: '/solutions/telecom' },
  { label: 'Banking & Finance', href: '/solutions/banking' },
  { label: 'Healthcare', href: '/solutions/healthcare' },
  { label: 'FMCG & Retail', href: '/solutions/fmcg' },
  { label: 'Insurance', href: '/solutions/insurance' },
  { label: 'Government', href: '/solutions/government' },
];

export default function Nav() {
  const [open, setOpen] = useState<'platform' | 'solutions' | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav style={{ fontFamily: 'Manrope, system-ui, sans-serif' }} className="sticky top-0 z-50 bg-white border-b border-slate-100">
      <div className="flex items-center justify-between h-[68px] max-w-[1200px] mx-auto" style={{ paddingLeft: '32px', paddingRight: '32px' }}>
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image src="/Krongage-Logo.png" alt="KronGage" width={38} height={38} className="h-[38px] w-auto" />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 list-none text-[14px] font-semibold text-slate-500">
          <li><Link href="/" className="hover:text-slate-900 transition-colors">Home</Link></li>
          <li><Link href="/about" className="hover:text-slate-900 transition-colors">Why KronGage?</Link></li>

          {/* Platform mega */}
          <li className="relative"
            onMouseEnter={() => setOpen('platform')}
            onMouseLeave={() => setOpen(null)}>
            <button className="flex items-center gap-1 hover:text-slate-900 transition-colors cursor-pointer bg-transparent border-0 text-[14px] font-semibold text-slate-500">
              Platform <span className="text-xs">▾</span>
            </button>
            {open === 'platform' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[560px] bg-white rounded-2xl shadow-2xl border border-slate-100 p-5 grid grid-cols-3 gap-3">
                {PLATFORM_LINKS.map(l => (
                  <Link key={l.href} href={l.href}
                    className="rounded-xl p-3 hover:bg-slate-50 transition-colors">
                    <div className="text-[13px] font-700 text-slate-900 font-bold">{l.label}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{l.desc}</div>
                  </Link>
                ))}
              </div>
            )}
          </li>

          {/* Solutions mega */}
          <li className="relative"
            onMouseEnter={() => setOpen('solutions')}
            onMouseLeave={() => setOpen(null)}>
            <button className="flex items-center gap-1 hover:text-slate-900 transition-colors cursor-pointer bg-transparent border-0 text-[14px] font-semibold text-slate-500">
              Solutions <span className="text-xs">▾</span>
            </button>
            {open === 'solutions' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[280px] bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 flex flex-col gap-1">
                {SOLUTIONS_LINKS.map(l => (
                  <Link key={l.href} href={l.href}
                    className="text-[13px] font-semibold text-slate-700 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </li>
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/pricing" className="text-[14px] font-semibold text-[#0D47A1] hover:underline">Pricing</Link>
          <Link href="/contact"
            className="bg-[#0D47A1] text-white px-5 py-2.5 rounded-full text-[14px] font-bold hover:bg-[#0a3680] transition-colors">
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          <span className="w-5 h-0.5 bg-slate-700 block" />
          <span className="w-5 h-0.5 bg-slate-700 block" />
          <span className="w-5 h-0.5 bg-slate-700 block" />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 flex flex-col gap-3 text-[15px] font-semibold">
          <Link href="/" onClick={() => setMobileOpen(false)}>Home</Link>
          <Link href="/about" onClick={() => setMobileOpen(false)}>Why KronGage?</Link>
          <Link href="/platform" onClick={() => setMobileOpen(false)}>Platform</Link>
          <Link href="/solutions" onClick={() => setMobileOpen(false)}>Solutions</Link>
          <Link href="/pricing" onClick={() => setMobileOpen(false)}>Pricing</Link>
          <Link href="/contact"
            className="bg-[#0D47A1] text-white px-5 py-2.5 rounded-full text-center font-bold"
            onClick={() => setMobileOpen(false)}>
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
