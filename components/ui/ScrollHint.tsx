'use client';

import { motion, useReducedMotion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export default function ScrollHint() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 lg:hidden"
      animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden="true"
    >
      <ChevronDown size={24} style={{ color: '#5A5450' }} strokeWidth={1.5} />
    </motion.div>
  );
}
