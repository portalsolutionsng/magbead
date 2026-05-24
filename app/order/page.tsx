import type { Metadata } from 'next';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

export const metadata: Metadata = {
  title: "How to Order — Mag'Beads",
  description: "Order bead jewelry from Mag'Beads on WhatsApp. Nationwide delivery across Nigeria.",
};

export default function OrderPage() {
  return (
    <section
      className="flex min-h-[60dvh] flex-col items-center justify-center text-center px-4 gap-6"
      style={{ backgroundColor: '#0A0A0F' }}
    >
      <h1
        style={{
          fontFamily: 'var(--font-playfair), Georgia, serif',
          fontWeight: 700,
          fontSize: '40px',
          color: '#F5F0E8',
          lineHeight: 1.1,
        }}
      >
        How to Order
      </h1>
      <p
        style={{
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
          fontSize: '16px',
          color: '#A09890',
          lineHeight: 1.6,
        }}
      >
        Order steps coming soon. Tap the WhatsApp button to order now.
      </p>
      <p
        style={{
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
          fontSize: '13px',
          color: '#5A5450',
        }}
      >
        Coming soon
      </p>
      <WhatsAppButton />
    </section>
  );
}
