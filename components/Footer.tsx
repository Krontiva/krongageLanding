import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer style={{ fontFamily: 'Manrope, system-ui, sans-serif', background: '#0f172a', color: '#fff' }}>
      <div className="max-w-[1200px] mx-auto pt-16 pb-8" style={{ paddingLeft: '24px', paddingRight: '24px' }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Image src="/Krongage-Logo.png" alt="KronGage" width={36} height={36} className="mb-4 rounded-lg" />
            <p className="text-sm text-slate-400 leading-relaxed max-w-[220px]">
              The unified customer engagement platform for enterprise teams.
            </p>
          </div>
          {/* Platform */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Platform</h4>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-400">
              {[
                ['Customer Data', '/platform/customer-data'],
                ['Omnichannel Inbox', '/platform/omnichannel-inbox'],
                ['Campaign Management', '/platform/campaign-management'],
                ['AI & Automation', '/platform/ai-automation'],
                ['Analytics', '/platform/analytics'],
                ['Security', '/platform/security'],
              ].map(([label, href]) => (
                <li key={href}><Link href={href} className="hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
          {/* Solutions */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Solutions</h4>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-400">
              {[
                ['Telecommunications', '/solutions/telecom'],
                ['Banking & Finance', '/solutions/banking'],
                ['Healthcare', '/solutions/healthcare'],
                ['FMCG & Retail', '/solutions/fmcg'],
                ['Insurance', '/solutions/insurance'],
                ['Government', '/solutions/government'],
              ].map(([label, href]) => (
                <li key={href}><Link href={href} className="hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
          {/* Company */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Company</h4>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-400">
              {[
                ['About', '/about'],
                ['Blog', '/blog'],
                ['Pricing', '/pricing'],
                ['Contact Us', '/contact'],
                ['Privacy Policy', '/privacy-policy'],
                ['Terms of Service', '/terms-of-service'],
              ].map(([label, href]) => (
                <li key={href}><Link href={href} className="hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <span>© {new Date().getFullYear()} Krontiva Africa. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-slate-400 transition-colors">Privacy</Link>
            <Link href="/terms-of-service" className="hover:text-slate-400 transition-colors">Terms</Link>
            <Link href="/sitemap" className="hover:text-slate-400 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
