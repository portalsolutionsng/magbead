import type { Metadata } from 'next';
import Image from 'next/image';
import { siteConfig } from '@/data/site';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

export const metadata: Metadata = {
  title: "About — Mag'Beads",
  description:
    "Mag'Beads is a Port Harcourt-based bead jewelry brand by LadyMagdo Oboho. Handcrafted necklaces, bracelets, waist beads and anklets. CAC-registered. Nationwide delivery.",
};

export default function AboutPage() {
  return (
    <section
      className="flex min-h-[60dvh] flex-col items-center px-4 py-16 text-center"
      style={{ backgroundColor: '#0A0A0F' }}
    >
      <div style={{ maxWidth: '600px', width: '100%' }}>

        {/* Cartoon illustration */}
        <div style={{ marginBottom: '24px' }}>
          <Image
            src="/images/owner-cartoon-lying.png"
            alt="LadyMagdo Oboho - Mag'Beads founder"
            width={400}
            height={267}
            style={{ borderRadius: '12px', maxWidth: '100%' }}
          />
        </div>

        {/* Heading */}
        <h1
          style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontWeight: 700,
            fontSize: '40px',
            color: '#F5F0E8',
            lineHeight: 1.1,
            marginBottom: '24px',
          }}
        >
          About Mag&apos;Beads
        </h1>

        {/* Owner studio photo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <Image
            src="/images/owner-studio-crafting.png"
            alt="LadyMagdo Oboho — owner of Mag'Beads in her studio"
            width={320}
            height={320}
            style={{ objectFit: 'cover', borderRadius: '16px', maxWidth: '320px', width: '100%' }}
          />
        </div>

        {/* Owner intro */}
        <p
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '16px',
            color: '#A09890',
            lineHeight: 1.7,
            marginBottom: '20px',
          }}
        >
          Mag&apos;Beads is owned by{' '}
          <span style={{ color: '#D4A843', fontWeight: 600 }}>LadyMagdo Oboho</span>
          {' '}— a beautiful bead maker based in Port Harcourt, Nigeria.
          Every piece is handcrafted with love, quality, and style.
        </p>

        {/* Products */}
        <p
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '16px',
            color: '#A09890',
            lineHeight: 1.7,
            marginBottom: '32px',
          }}
        >
          We specialize in{' '}
          <span style={{ color: '#F5F0E8' }}>necklaces, bracelets, waist beads</span>
          {' '}and{' '}
          <span style={{ color: '#F5F0E8' }}>anklets</span>
          {' '}— crafted for women who love luxury at affordable prices.
        </p>

        {/* Product tags */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            justifyContent: 'center',
            marginBottom: '40px',
          }}
        >
          {siteConfig.products.map((product) => (
            <span
              key={product}
              style={{
                backgroundColor: '#1A1A26',
                border: '1px solid #2A2A3A',
                borderRadius: '999px',
                padding: '6px 16px',
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '13px',
                color: '#D4A843',
              }}
            >
              {product}
            </span>
          ))}
        </div>

        {/* Social links */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '14px',
              color: '#A09890',
              textDecoration: 'none',
            }}
          >
            Business Instagram:{' '}
            <span style={{ color: '#D4A843' }}>{siteConfig.instagramHandle}</span>
          </a>
          <a
            href={siteConfig.ownerInstagram}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '14px',
              color: '#A09890',
              textDecoration: 'none',
            }}
          >
            Owner Instagram:{' '}
            <span style={{ color: '#D4A843' }}>{siteConfig.ownerInstagramHandle}</span>
          </a>
        </div>

        {/* CTA */}
        <WhatsAppButton label="Order on WhatsApp" fullWidth />

      </div>
    </section>
  );
}
