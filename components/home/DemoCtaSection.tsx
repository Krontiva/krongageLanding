'use client';
import Link from 'next/link';
import { motion } from 'motion/react';
import DashboardDemo from '../DashboardDemo';
import { revealSection } from './variants';

export default function DemoCtaSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={revealSection}
      className="bg-[linear-gradient(197deg,#04204B_6%,#0D47A1_63%)] px-[60px] py-[90px] text-center max-[900px]:px-6 max-[900px]:py-[60px]"
    >
      <p className="text-[38px] font-extrabold text-white max-w-[700px] mx-auto mb-4 leading-[1.2]">
        What Would KronGage Look Like in Action?
      </p>
      <p className="text-base text-white/75 max-w-[620px] mx-auto mb-12 leading-[1.75]">
        Most enterprises don&apos;t realise how much their fragmented tools are costing them in revenue and trust until they see the alternative.
      </p>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-[920px] mx-auto mb-10 rounded-2xl overflow-hidden shadow-[0_16px_60px_rgba(0,0,0,0.35)] h-[610px]"
      >
        <DashboardDemo />
      </motion.div>
      <div className="flex justify-center gap-4 flex-wrap">
        <Link
          href="/contact"
          className="bg-white text-[#0D47A1] px-7 py-[13px] rounded-full text-[15px] font-bold border-2 border-white inline-flex items-center gap-2 hover:bg-transparent hover:text-white transition-colors"
        >
          Request a Demo →
        </Link>
        <Link
          href="/platform"
          className="bg-transparent text-white px-7 py-[13px] rounded-full text-[15px] font-bold border-2 border-white/50 inline-flex items-center gap-2 hover:border-white hover:bg-white/10 transition-colors"
        >
          ⊕ Explore the Platform
        </Link>
      </div>
    </motion.section>
  );
}
