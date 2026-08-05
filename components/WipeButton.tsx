'use client';
import Link from 'next/link';
import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

const MotionLink = motion.create(Link);

export function WipeButton({
  href,
  className,
  wipeClassName = 'bg-primary',
  textHoverClassName,
  children,
}: {
  href: string;
  className?: string;
  wipeClassName?: string;
  textHoverClassName?: string;
  children: ReactNode;
}) {
  return (
    <MotionLink
      href={href}
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileTap={{ scale: 0.97 }}
      className={cn(
        'group/button relative inline-flex h-11 items-center justify-center gap-1.5 overflow-hidden rounded-full border px-6 text-sm font-bold',
        className
      )}
    >
      <motion.span
        aria-hidden="true"
        className={cn('absolute inset-0 origin-left', wipeClassName)}
        variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      />
      <span className={cn('relative z-10 inline-flex items-center gap-1.5 transition-colors duration-300', textHoverClassName)}>
        {children}
      </span>
    </MotionLink>
  );
}
