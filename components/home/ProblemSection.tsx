'use client';
import { motion } from 'motion/react';
import FragmentedToolsMockup from '../FragmentedToolsMockup';
import { revealSection } from './variants';

export default function ProblemSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={revealSection}
      className="relative overflow-hidden px-[60px] py-[90px] max-[900px]:px-6 max-[900px]:py-14"
    >
      <div className="absolute inset-0 bg-[url('/assets/tomanySection.jpg')] bg-cover bg-center bg-no-repeat opacity-40 z-0" />
      <div className="flex items-center gap-20 max-w-[1200px] mx-auto relative z-[1] max-[900px]:flex-col max-[900px]:gap-8">
        <div className="shrink-0 w-[420px] max-[900px]:w-full">
          <FragmentedToolsMockup />
        </div>
        <div>
          <h2 className="text-[42px] font-extrabold leading-[1.2] text-[#0D47A1] mb-5 tracking-[-0.5px]">
            Too many tools, not enough connection.
          </h2>
          <p className="text-base leading-[1.7] text-[#1e293b]">
            Most businesses are slowed down by a &apos;fragmented stack&apos;, using separate, disconnected tools for WhatsApp, social media, support, and analytics. The result? Missed conversations, duplicate effort, and a customer experience that feels anything but seamless.
          </p>
        </div>
      </div>
    </motion.section>
  );
}
