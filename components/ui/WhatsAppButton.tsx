'use client';

import { motion, useReducedMotion } from 'motion/react';
import { siteConfig } from '@/data/site';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';

interface WhatsAppButtonProps {
  href?: string;
  label?: string;
  className?: string;
  fullWidth?: boolean;
}

export default function WhatsAppButton({
  href = siteConfig.whatsappLink,
  label = 'Order on WhatsApp',
  className = '',
  fullWidth = false,
}: WhatsAppButtonProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.1 }}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        backgroundColor: '#25D366',
        color: '#0A0A0F',
        fontFamily: 'var(--font-inter), system-ui, sans-serif',
        fontWeight: 600,
        fontSize: '16px',
        minHeight: '48px',
        padding: '12px 24px',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)',
        textDecoration: 'none',
        letterSpacing: '0.02em',
        width: fullWidth ? '100%' : 'auto',
        cursor: 'pointer',
      }}
    >
      <WhatsAppIcon size={20} />
      {label}
    </motion.a>
  );
}
