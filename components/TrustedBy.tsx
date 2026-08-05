'use client';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

const DEFAULT_NAMES = [
  'NORTHBANK',
  'AIRWAVE TELECOM',
  'PRIMECARE HEALTH',
  'SURESHIELD INSURANCE',
  'FRESHMART RETAIL',
  'CIVIC GOV',
];

export function TrustedBy({
  label = 'Trusted by teams across Africa',
  names = DEFAULT_NAMES,
  delay = 0,
  className,
}: {
  label?: string;
  names?: string[];
  delay?: number;
  className?: string;
}) {
  return (
    <div className={cn('relative max-w-4xl mx-auto px-6 text-center', className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay }}
      >
        <p className="text-xs font-semibold text-[#94a3b8] mb-5">{label}</p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {names.map(name => (
            <span key={name} className="text-sm font-extrabold tracking-widest text-[#cbd5e1]">
              {name}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
