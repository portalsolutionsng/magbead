import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Pay — Mag'Beads",
  description: "Payment page for Mag'Beads orders.",
};

export default function PayPage() {
  return (
    <section
      className="flex min-h-[60dvh] flex-col items-center justify-center text-center px-4"
      style={{ backgroundColor: '#0A0A0F' }}
    >
      <h1
        style={{
          fontFamily: 'var(--font-playfair), Georgia, serif',
          fontWeight: 700,
          fontSize: '40px',
          color: '#F5F0E8',
          lineHeight: 1.1,
          marginBottom: '16px',
        }}
      >
        Payment
      </h1>
      <p
        style={{
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
          fontSize: '16px',
          color: '#A09890',
          lineHeight: 1.6,
          marginBottom: '12px',
        }}
      >
        Payment activation pending — order on WhatsApp for now.
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
    </section>
  );
}
