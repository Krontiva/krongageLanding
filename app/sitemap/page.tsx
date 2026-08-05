import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sitemap – KronGage',
  description: 'KronGage – Unified Customer Engagement Platform',
};

const linkClass = "text-sm font-semibold text-[#374151] flex items-center gap-2 transition-colors hover:text-[#0D47A1] before:content-['→'] before:text-xs before:text-[#0D47A1]";

export default function Page() {
  return (
    <main className="flex-1 max-w-[900px] mx-auto px-6 pt-32 pb-20 w-full">
      <div className="mb-12">
        <h1 className="text-[42px] font-extrabold text-[#0D47A1] mb-[10px] max-[640px]:text-[30px]">Sitemap</h1>
        <p className="text-[15px] text-[#64748b]">A complete overview of all pages on the KronGage website.</p>
      </div>

      <div className="grid grid-cols-3 gap-8 max-[768px]:grid-cols-2 max-[640px]:grid-cols-1">
        <div>
          <h2 className="text-[13px] font-bold uppercase tracking-[1px] text-[#0D47A1] mb-4 pb-2 border-b-2 border-[#EEF5FD]">Main Pages</h2>
          <ul className="list-none p-0 m-0">
            <li className="mb-[10px]"><a href="/" className={linkClass}>Home</a></li>
            <li className="mb-[10px]"><a href="/platform" className={linkClass}>Why KronGage?</a></li>
            <li className="mb-[10px]"><a href="/platform" className={linkClass}>Platform</a></li>
            <li className="mb-[10px]"><a href="/solutions" className={linkClass}>Solutions</a></li>
            <li className="mb-[10px]"><a href="/pricing" className={linkClass}>Pricing</a></li>
            <li className="mb-[10px]"><a href="/contact" className={linkClass}>Contact</a></li>
            <li className="mb-[10px]"><a href="/blog" className={linkClass}>Blog</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-[13px] font-bold uppercase tracking-[1px] text-[#0D47A1] mb-4 pb-2 border-b-2 border-[#EEF5FD]">Platform</h2>
          <ul className="list-none p-0 m-0">
            <li className="mb-[10px]"><a href="/platform/omnichannel-inbox" className={linkClass}>Omnichannel Inbox</a></li>
            <li className="mb-[10px]"><a href="/platform/social-media" className={linkClass}>Social Media Management</a></li>
            <li className="mb-[10px]"><a href="/platform/ai-automation" className={linkClass}>AI &amp; Automation</a></li>
            <li className="mb-[10px]"><a href="/platform/customer-data" className={linkClass}>Customer 360</a></li>
            <li className="mb-[10px]"><a href="/platform/campaign-management" className={linkClass}>Campaign Management</a></li>
            <li className="mb-[10px]"><a href="/platform/analytics" className={linkClass}>Analytics &amp; BI</a></li>
            <li className="mb-[10px]"><a href="/platform/social-intelligence" className={linkClass}>Social Intelligence</a></li>
            <li className="mb-[10px]"><a href="/platform/security" className={linkClass}>Security &amp; Compliance</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-[13px] font-bold uppercase tracking-[1px] text-[#0D47A1] mb-4 pb-2 border-b-2 border-[#EEF5FD]">Solutions</h2>
          <ul className="list-none p-0 m-0">
            <li className="mb-[10px]"><a href="/solutions/banking" className={linkClass}>Banking &amp; Finance</a></li>
            <li className="mb-[10px]"><a href="/solutions/telecom" className={linkClass}>Telecommunications</a></li>
            <li className="mb-[10px]"><a href="/solutions/fmcg" className={linkClass}>FMCG &amp; Retail</a></li>
            <li className="mb-[10px]"><a href="/solutions/healthcare" className={linkClass}>Healthcare</a></li>
            <li className="mb-[10px]"><a href="/solutions/insurance" className={linkClass}>Insurance</a></li>
            <li className="mb-[10px]"><a href="/solutions/government" className={linkClass}>Government &amp; Public Sector</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-[13px] font-bold uppercase tracking-[1px] text-[#0D47A1] mb-4 pb-2 border-b-2 border-[#EEF5FD]">Legal</h2>
          <ul className="list-none p-0 m-0">
            <li className="mb-[10px]"><a href="/privacy-policy" className={linkClass}>Privacy Policy</a></li>
            <li className="mb-[10px]"><a href="/terms-of-service" className={linkClass}>Terms of Service</a></li>
            <li className="mb-[10px]"><a href="/data-protection" className={linkClass}>Data Protection</a></li>
            <li className="mb-[10px]"><a href="/sitemap" className={linkClass}>Sitemap</a></li>
          </ul>
        </div>
      </div>
    </main>
  );
}
