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
  ['About Krontiva', '/about'],
  ['Contact Us', '/contact'],
  ['Blog', '/blog'],
  ['Privacy Policy', '/privacy-policy'],
  ['Terms of Service', '/terms-of-service'],
  ['Data Protection', '/data-protection'],
  ['Sitemap', '/sitemap'],
];

const footerLinkClass = "text-[#94a3b8] no-underline text-sm transition-colors hover:text-white";
const bottomLinkClass = "text-[#475569] no-underline text-[13px] transition-colors hover:text-[#94a3b8]";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white">
      <div className="max-w-[1200px] mx-auto px-8 pt-16 pb-10">

        {/* Main grid */}
        <div className="grid grid-cols-4 gap-10 mb-14 max-[768px]:grid-cols-2 max-[480px]:grid-cols-1">

          {/* Brand column */}
          <div className="max-[768px]:col-span-2 max-[480px]:col-span-1">
            <div className="text-2xl font-extrabold text-[#60a5fa] mb-3 tracking-[-0.02em]">
              KronGage
            </div>
            <p className="text-[13px] text-[#64748b] leading-[1.6] mb-[6px]">
              Enterprise AI Customer Engagement — World-Class Platform
            </p>
            <p className="text-xs text-[#475569] leading-[1.7]">
              Developed by Krontiva.<br />
              Delivering world-class enterprise solutions globally.<br />
              Certified Meta WhatsApp Technology Provider.
            </p>

            {/* Meta badge */}
            <div className="mt-5 inline-flex items-center gap-[10px] bg-[#1e293b] rounded-[10px] px-[14px] py-[10px]">
              <div className="bg-[#1877F2] rounded-full w-7 h-7 flex items-center justify-center shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <div>
                <div className="text-[11px] font-bold text-white">Certified Meta</div>
                <div className="text-[10px] text-[#94a3b8]">WhatsApp Business Partner</div>
              </div>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#64748b] mb-5">Platform</h4>
            <ul className="list-none flex flex-col gap-3">
              {PLATFORM_LINKS.map(([label, href]) => (
                <li key={href}><Link href={href} className={footerLinkClass}>{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#64748b] mb-5">Solutions</h4>
            <ul className="list-none flex flex-col gap-3">
              {SOLUTIONS_LINKS.map(([label, href]) => (
                <li key={href}><Link href={href} className={footerLinkClass}>{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#64748b] mb-5">Company</h4>
            <ul className="list-none flex flex-col gap-3">
              {COMPANY_LINKS.map(([label, href]) => (
                <li key={href}><Link href={href} className={footerLinkClass}>{label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#1e293b] pt-7 flex flex-wrap items-center justify-between gap-3">
          <span className="text-[13px] text-[#475569]">
            © {new Date().getFullYear()} Krontiva. KronGage is a product of Krontiva Ltd. All Rights Reserved.
          </span>
          <div className="flex gap-6 flex-wrap">
            <Link href="/privacy-policy" className={bottomLinkClass}>Privacy Policy</Link>
            <Link href="/terms-of-service" className={bottomLinkClass}>Terms of Service</Link>
            <Link href="/data-protection" className={bottomLinkClass}>Data Protection</Link>
            <Link href="/sitemap" className={bottomLinkClass}>Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
