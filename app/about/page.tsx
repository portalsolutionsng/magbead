import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About — Mag'Beads",
  description: "Learn about Mag'Beads — CAC-registered bead jewelry from Port Harcourt, Nigeria since 2022.",
};

export default function AboutPage() {
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
        About Mag&apos;Beads
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
        Our story is coming soon.
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
