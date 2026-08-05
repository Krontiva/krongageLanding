import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact – KronGage',
  description: 'KronGage – Unified Customer Engagement Platform',
};

export default function Page() {
  return (
    <main className="flex-1">
      <div className="grid grid-cols-2 min-h-screen pt-[68px] bg-[linear-gradient(135deg,#0f172a_0%,#0D47A1_50%,#1565C0_75%,#0a2a6e_100%)] bg-[length:300%_300%] animate-[gradientShift_8s_ease_infinite] max-[900px]:grid-cols-1">
        <div className="flex flex-col justify-center px-[60px] py-20 text-white max-[900px]:px-8 max-[900px]:pt-[60px] max-[900px]:pb-10 max-[640px]:px-6 max-[640px]:pt-12 max-[640px]:pb-8">
          <h1 className="text-[48px] font-extrabold leading-[1.1] mb-6 tracking-[-1px] max-[900px]:text-[36px] max-[640px]:text-[30px]">
            Ready to grow?<br />Talk to our<br />sales team.
          </h1>
          <p className="text-base leading-[1.7] text-white/80 mb-9 max-w-[420px]">
            Join organisations of all sizes taking customer engagement to the next level. See how KronGage can increase lifetime value, simplify tech stacks, and boost brand loyalty.
          </p>
          <a
            href="mailto:support@krontiva.africa"
            className="inline-block bg-white/15 text-white border-[1.5px] border-white/35 px-7 py-[14px] rounded-full text-[15px] font-semibold transition-colors max-w-fit hover:bg-white/25"
          >
            Have a more general question?
          </a>
        </div>
        <div className="flex items-center justify-center px-[60px] py-[60px] pl-10 max-[900px]:px-8 max-[900px]:pt-10 max-[900px]:pb-[60px] max-[640px]:px-6 max-[640px]:pt-8 max-[640px]:pb-12">
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
