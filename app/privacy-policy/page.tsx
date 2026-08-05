import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy – KronGage',
  description: 'KronGage – Unified Customer Engagement Platform',
};

export default function Page() {
  return (
    <main className="flex-1 max-w-[800px] mx-auto px-6 pt-32 pb-20 w-full">
      <div className="mb-12">
        <h1 className="text-[42px] font-extrabold text-[#0D47A1] mb-[10px] max-[640px]:text-[30px]">Privacy Policy</h1>
        <p className="text-sm text-[#94a3b8]">Last updated: May 2025</p>
      </div>
      <div>
        <p className="text-[15px] leading-[1.8] text-[#475569] mb-4">Krontiva Ltd (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates the KronGage platform. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.</p>

        <h2 className="text-[22px] font-extrabold text-[#0D47A1] mt-9 mb-3">1. Information We Collect</h2>
        <h3 className="text-[17px] font-bold text-[#0D47A1] mt-6 mb-2">Information you provide directly</h3>
        <p className="text-[15px] leading-[1.8] text-[#475569] mb-4">We collect information that you provide when you register for an account, fill out a form, or communicate with us. This may include:</p>
        <ul className="pl-6 mb-4 list-disc">
          <li className="text-[15px] leading-[1.8] text-[#475569] mb-[6px]">Name, email address, phone number, and job title</li>
          <li className="text-[15px] leading-[1.8] text-[#475569] mb-[6px]">Company name and billing information</li>
          <li className="text-[15px] leading-[1.8] text-[#475569] mb-[6px]">Content you submit through the platform</li>
          <li className="text-[15px] leading-[1.8] text-[#475569] mb-[6px]">Customer data you upload or sync to KronGage</li>
        </ul>

        <h3 className="text-[17px] font-bold text-[#0D47A1] mt-6 mb-2">Information collected automatically</h3>
        <p className="text-[15px] leading-[1.8] text-[#475569] mb-4">When you use our platform, we automatically collect certain technical information including IP address, browser type, device identifiers, pages visited, and usage patterns.</p>

        <h2 className="text-[22px] font-extrabold text-[#0D47A1] mt-9 mb-3">2. How We Use Your Information</h2>
        <p className="text-[15px] leading-[1.8] text-[#475569] mb-4">We use the information we collect to provide, maintain, and improve our services, process transactions, send transactional and promotional communications, and comply with legal obligations.</p>

        <h2 className="text-[22px] font-extrabold text-[#0D47A1] mt-9 mb-3">3. Data Sharing</h2>
        <p className="text-[15px] leading-[1.8] text-[#475569] mb-4">We do not sell your personal data. We may share information with trusted third-party service providers who assist us in operating our platform, subject to confidentiality agreements. We may also disclose information when required by law or to protect our rights.</p>

        <h2 className="text-[22px] font-extrabold text-[#0D47A1] mt-9 mb-3">4. Data Retention</h2>
        <p className="text-[15px] leading-[1.8] text-[#475569] mb-4">We retain your personal data for as long as your account is active or as needed to provide our services. You may request deletion of your data at any time by contacting us.</p>

        <h2 className="text-[22px] font-extrabold text-[#0D47A1] mt-9 mb-3">5. Security</h2>
        <p className="text-[15px] leading-[1.8] text-[#475569] mb-4">We implement industry-standard security measures including encryption in transit and at rest, access controls, and regular security audits. KronGage maintains SOC 2 compliance and HIPAA-compliant data handling practices.</p>

        <h2 className="text-[22px] font-extrabold text-[#0D47A1] mt-9 mb-3">6. Your Rights</h2>
        <p className="text-[15px] leading-[1.8] text-[#475569] mb-4">Depending on your jurisdiction, you may have the right to access, correct, delete, or port your personal data. To exercise these rights, contact us at <strong>privacy@krontiva.africa</strong>.</p>

        <h2 className="text-[22px] font-extrabold text-[#0D47A1] mt-9 mb-3">7. Contact Us</h2>
        <p className="text-[15px] leading-[1.8] text-[#475569] mb-4">If you have questions about this Privacy Policy, please contact Krontiva Ltd at <strong>privacy@krontiva.africa</strong> or via our <a href="/contact/" className="text-[#0D47A1] font-bold">Contact page</a>.</p>
      </div>
    </main>
  );
}
