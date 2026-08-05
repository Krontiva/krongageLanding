import type { Metadata } from 'next';
import Customer360 from '../../../components/solutions/Customer360';

export const metadata: Metadata = {
  title: 'Customer 360 — KronGage',
  description: 'KronGage – Unified Customer Engagement Platform',
};

export default function Page() {
  return (
    <main>
      <section className="bg-[linear-gradient(135deg,#EEF5FD_0%,#f8fafc_100%)] px-[60px] pt-32 pb-[60px] max-[640px]:px-5 max-[640px]:pt-[116px] max-[640px]:pb-14">
        <div className="grid grid-cols-2 gap-12 items-center max-w-[1200px] mx-auto max-[900px]:grid-cols-1">
          <div>
            <div className="text-[13px] text-[#64748b] font-medium mb-5">
              <a href="/platform/" className="text-[#0D47A1]">Platform</a><span className="mx-[6px]">›</span>Customer 360
            </div>
            <h1 className="text-[48px] font-extrabold text-[#0D47A1] leading-[1.15] max-w-[720px] mb-5 max-[640px]:text-[32px]">Customer 360</h1>
            <p className="text-lg text-[#475569] max-w-[600px] leading-[1.7] mb-9">The KronGage Customer 360, a customer data platform (CDP), serves as the intelligence backbone of the entire platform, creating unified, actionable customer profiles from every interaction across all channels and touchpoints. Unlike siloed CRM systems, the CDP provides instantaneous, dynamic customer intelligence that powers personalisation, segmentation, and predictive engagement across the KronGage ecosystem.</p>
            <div className="flex gap-4 flex-wrap">
              <a href="/contact/" className="bg-[#0D47A1] text-white px-[30px] py-[14px] rounded-full text-[15px] font-bold transition-colors hover:bg-[#0a3a87]">Contact Us</a>
            </div>
          </div>
          <div className="rounded-[20px] overflow-hidden h-[420px] shadow-[0_20px_60px_rgba(13,71,161,0.15)] shrink-0 max-[900px]:h-[320px]">
            <Customer360 />
          </div>
        </div>
      </section>

      <section className="bg-white px-[60px] pt-[72px] pb-20 max-[640px]:px-5 max-[640px]:pb-12">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-[38px] font-extrabold text-[#0D47A1] mb-10 max-[900px]:text-[28px]">Business Impact</h2>
          <div className="grid grid-cols-4 gap-5 max-[900px]:grid-cols-2 max-[640px]:grid-cols-1">
            <div className="bg-[#EEF5FD] rounded-2xl p-6 border border-[#dbeafe]">
              <h3 className="text-[15px] font-extrabold text-[#0f172a] mb-3 leading-[1.35]">Identity Resolution</h3>
              <p className="text-[13px] text-[#475569] leading-[1.65]">At the core of the CDP is a sophisticated identity resolution engine that automatically merges customer data across disparate sources.</p>
            </div>
            <div className="bg-[#EEF5FD] rounded-2xl p-6 border border-[#dbeafe]">
              <h3 className="text-[15px] font-extrabold text-[#0f172a] mb-3 leading-[1.35]">360-Degree Customer Profiles</h3>
              <p className="text-[13px] text-[#475569] leading-[1.65]">Each unified profile contains a comprehensive view of the customer, including demographic information, contact details across all channels, complete interaction history, social media profiles, and engagement data.</p>
            </div>
            <div className="bg-[#EEF5FD] rounded-2xl p-6 border border-[#dbeafe]">
              <h3 className="text-[15px] font-extrabold text-[#0f172a] mb-3 leading-[1.35]">Business Intelligence &amp; Analytics</h3>
              <p className="text-[13px] text-[#475569] leading-[1.65]">KronGage&apos;s analytics suite provides comprehensive business intelligence across all platform modules, powered by a high-performance engine that can aggregate millions of data points in real time.</p>
            </div>
            <div className="bg-[#EEF5FD] rounded-2xl p-6 border border-[#dbeafe]">
              <h3 className="text-[15px] font-extrabold text-[#0f172a] mb-3 leading-[1.35]">Custom Report Builder</h3>
              <p className="text-[13px] text-[#475569] leading-[1.65]">Beyond pre-built dashboards, KronGage provides a powerful custom report builder that enables users to create tailored reports by selecting specific metrics, date ranges, filters, and visualisation types.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
