'use client';

import { motion, useReducedMotion } from 'motion/react';

export default function Template({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? { opacity: 0 }
          : { opacity: 0, y: 12 }
      }
      animate={
        shouldReduceMotion
          ? { opacity: 1 }
          : { opacity: 1, y: 0 }
      }
      exit={
        shouldReduceMotion
          ? { opacity: 0 }
          : { opacity: 0, y: -8 }
      }
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
