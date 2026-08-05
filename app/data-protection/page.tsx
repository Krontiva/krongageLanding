import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Data Protection – KronGage',
  description: 'KronGage – Unified Customer Engagement Platform',
};

export default function Page() {
  return (
    <main className="flex-1 max-w-[800px] mx-auto px-6 pt-32 pb-20 w-full">
      <div className="mb-12">
        <h1 className="text-[42px] font-extrabold text-[#0D47A1] mb-[10px] max-[640px]:text-[30px]">Data Protection</h1>
        <p className="text-sm text-[#94a3b8]">Last updated: May 2025</p>
      </div>
      <div>
        <p className="text-[15px] leading-[1.8] text-[#475569] mb-4">At Krontiva, protecting your data is not just a compliance obligation; it is central to how we build and operate KronGage. This page outlines our data protection practices, certifications, and your rights as a data subject.</p>

        <h2 className="text-[22px] font-extrabold text-[#0D47A1] mt-9 mb-3">Our Certifications</h2>
        <div className="grid grid-cols-3 gap-4 my-6 max-[640px]:grid-cols-2">
          <div className="bg-[#EEF5FD] rounded-xl p-5 text-center">
            <div className="text-[28px] mb-2">🛡️</div>
            <strong className="block text-sm font-extrabold text-[#0D47A1] mb-1">SOC 2 Type II</strong>
            <span className="text-xs text-[#64748b]">Audited security controls</span>
          </div>
          <div className="bg-[#EEF5FD] rounded-xl p-5 text-center">
            <div className="text-[28px] mb-2">🏥</div>
            <strong className="block text-sm font-extrabold text-[#0D47A1] mb-1">HIPAA Compatible</strong>
            <span className="text-xs text-[#64748b]">Healthcare data ready</span>
          </div>
          <div className="bg-[#EEF5FD] rounded-xl p-5 text-center">
            <div className="text-[28px] mb-2">🔐</div>
            <strong className="block text-sm font-extrabold text-[#0D47A1] mb-1">AES-256 Encryption</strong>
            <span className="text-xs text-[#64748b]">Data at rest and in transit</span>
          </div>
        </div>

        <h2 className="text-[22px] font-extrabold text-[#0D47A1] mt-9 mb-3">How We Protect Your Data</h2>
        <p className="text-[15px] leading-[1.8] text-[#475569] mb-4">KronGage employs multiple layers of security to safeguard customer data:</p>
        <ul className="pl-6 mb-4 list-disc">
          <li className="text-[15px] leading-[1.8] text-[#475569] mb-[6px]"><strong>Encryption:</strong> All data is encrypted in transit using TLS 1.3 and at rest using AES-256.</li>
          <li className="text-[15px] leading-[1.8] text-[#475569] mb-[6px]"><strong>Access controls:</strong> Role-based access control (RBAC) ensures employees only access data necessary for their role.</li>
          <li className="text-[15px] leading-[1.8] text-[#475569] mb-[6px]"><strong>Audit logging:</strong> Every data access and modification is logged with tamper-evident audit trails.</li>
          <li className="text-[15px] leading-[1.8] text-[#475569] mb-[6px]"><strong>Regular penetration testing:</strong> We engage independent security firms to conduct annual penetration tests.</li>
          <li className="text-[15px] leading-[1.8] text-[#475569] mb-[6px]"><strong>Vulnerability management:</strong> We continuously scan for and patch known vulnerabilities.</li>
        </ul>

        <h2 className="text-[22px] font-extrabold text-[#0D47A1] mt-9 mb-3">Data Residency</h2>
        <p className="text-[15px] leading-[1.8] text-[#475569] mb-4">KronGage supports regional data residency options. Enterprise customers can select their preferred data region at the time of onboarding. We currently support data hosting in the EU, UK, and Africa regions.</p>

        <h2 className="text-[22px] font-extrabold text-[#0D47A1] mt-9 mb-3">GDPR Compliance</h2>
        <p className="text-[15px] leading-[1.8] text-[#475569] mb-4">For customers operating in the European Economic Area (EEA) or United Kingdom, Krontiva acts as a Data Processor on your behalf. We provide a Data Processing Agreement (DPA) that governs how we handle personal data. Contact us to request a copy of our DPA.</p>

        <h2 className="text-[22px] font-extrabold text-[#0D47A1] mt-9 mb-3">Data Breach Response</h2>
        <p className="text-[15px] leading-[1.8] text-[#475569] mb-4">In the event of a data breach affecting your information, Krontiva will notify affected customers without undue delay and within 72 hours of becoming aware of the breach, consistent with GDPR requirements.</p>

        <h2 className="text-[22px] font-extrabold text-[#0D47A1] mt-9 mb-3">Sub-processors</h2>
        <p className="text-[15px] leading-[1.8] text-[#475569] mb-4">We use a limited number of vetted sub-processors to deliver our services. A full list of our sub-processors is available upon request. All sub-processors are bound by data protection obligations no less stringent than our own.</p>

        <h2 className="text-[22px] font-extrabold text-[#0D47A1] mt-9 mb-3">Contact Our Data Protection Team</h2>
        <p className="text-[15px] leading-[1.8] text-[#475569] mb-4">For data protection enquiries, please contact our Data Protection Officer at <strong>dpo@krontiva.africa</strong> or via our <a href="/contact/" className="text-[#0D47A1] font-bold">Contact page</a>.</p>
      </div>
    </main>
  );
}
