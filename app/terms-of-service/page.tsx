import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service – KronGage',
  description: 'KronGage – Unified Customer Engagement Platform',
};

export default function Page() {
  return (
    <main className="flex-1 max-w-[800px] mx-auto px-6 pt-32 pb-20 w-full">
      <div className="mb-12">
        <h1 className="text-[42px] font-extrabold text-[#0D47A1] mb-[10px] max-[640px]:text-[30px]">Terms of Service</h1>
        <p className="text-sm text-[#94a3b8]">Last updated: May 2025</p>
      </div>
      <div>
        <p className="text-[15px] leading-[1.8] text-[#475569] mb-4">These Terms of Service (&quot;Terms&quot;) govern your access to and use of the KronGage platform provided by Krontiva Ltd (&quot;Krontiva&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). By using KronGage, you agree to be bound by these Terms.</p>

        <h2 className="text-[22px] font-extrabold text-[#0D47A1] mt-9 mb-3">1. Acceptance of Terms</h2>
        <p className="text-[15px] leading-[1.8] text-[#475569] mb-4">By creating an account or accessing any part of the KronGage platform, you confirm that you are at least 18 years of age, have the authority to enter into these Terms on behalf of your organisation, and agree to comply with all applicable laws and regulations.</p>

        <h2 className="text-[22px] font-extrabold text-[#0D47A1] mt-9 mb-3">2. Licence and Permitted Use</h2>
        <p className="text-[15px] leading-[1.8] text-[#475569] mb-4">Subject to these Terms, Krontiva grants you a limited, non-exclusive, non-transferable licence to access and use the KronGage platform for your internal business purposes. You may not:</p>
        <ul className="pl-6 mb-4 list-disc">
          <li className="text-[15px] leading-[1.8] text-[#475569] mb-[6px]">Sub-licence, sell, resell, or commercially exploit the platform without written consent</li>
          <li className="text-[15px] leading-[1.8] text-[#475569] mb-[6px]">Reverse engineer, decompile, or attempt to extract source code</li>
          <li className="text-[15px] leading-[1.8] text-[#475569] mb-[6px]">Use the platform to send unsolicited communications or spam</li>
          <li className="text-[15px] leading-[1.8] text-[#475569] mb-[6px]">Violate any applicable laws or third-party rights</li>
        </ul>

        <h2 className="text-[22px] font-extrabold text-[#0D47A1] mt-9 mb-3">3. Account Responsibilities</h2>
        <p className="text-[15px] leading-[1.8] text-[#475569] mb-4">You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You must notify us immediately of any unauthorised access.</p>

        <h2 className="text-[22px] font-extrabold text-[#0D47A1] mt-9 mb-3">4. Service Availability</h2>
        <p className="text-[15px] leading-[1.8] text-[#475569] mb-4">We strive to provide 99.9% uptime. We reserve the right to perform scheduled maintenance, which we will communicate in advance wherever possible. We are not liable for any downtime beyond our reasonable control.</p>

        <h2 className="text-[22px] font-extrabold text-[#0D47A1] mt-9 mb-3">5. Payment and Billing</h2>
        <p className="text-[15px] leading-[1.8] text-[#475569] mb-4">Subscription fees are billed in advance. All fees are non-refundable unless otherwise stated. Krontiva reserves the right to update pricing with 30 days&apos; notice.</p>

        <h2 className="text-[22px] font-extrabold text-[#0D47A1] mt-9 mb-3">6. Intellectual Property</h2>
        <p className="text-[15px] leading-[1.8] text-[#475569] mb-4">All intellectual property rights in the KronGage platform remain the exclusive property of Krontiva Ltd. Your data remains your property; you grant us a limited licence to process it solely to deliver the service.</p>

        <h2 className="text-[22px] font-extrabold text-[#0D47A1] mt-9 mb-3">7. Limitation of Liability</h2>
        <p className="text-[15px] leading-[1.8] text-[#475569] mb-4">To the maximum extent permitted by law, Krontiva&apos;s aggregate liability shall not exceed the fees paid by you in the 12 months preceding the claim. We are not liable for indirect, incidental, or consequential damages.</p>

        <h2 className="text-[22px] font-extrabold text-[#0D47A1] mt-9 mb-3">8. Termination</h2>
        <p className="text-[15px] leading-[1.8] text-[#475569] mb-4">Either party may terminate the agreement with 30 days&apos; written notice. Krontiva may suspend or terminate your access immediately if you breach these Terms.</p>

        <h2 className="text-[22px] font-extrabold text-[#0D47A1] mt-9 mb-3">9. Governing Law</h2>
        <p className="text-[15px] leading-[1.8] text-[#475569] mb-4">These Terms are governed by the laws of England and Wales. Any disputes shall be resolved in the courts of England and Wales.</p>

        <h2 className="text-[22px] font-extrabold text-[#0D47A1] mt-9 mb-3">10. Contact</h2>
        <p className="text-[15px] leading-[1.8] text-[#475569] mb-4">Questions about these Terms? Contact us at <strong>legal@krontiva.africa</strong> or via our <a href="/contact/" className="text-[#0D47A1] font-bold">Contact page</a>.</p>
      </div>
    </main>
  );
}
