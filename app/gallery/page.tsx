import type { Metadata } from 'next';
import GalleryClient from '@/components/gallery/GalleryClient';

export const metadata: Metadata = {
  title: "Shop — Mag'Beads",
  description:
    "Browse our full collection of handcrafted bead jewelry — waist beads, bracelets, necklaces, anklets, earrings and more. Tap any item to order.",
};

export default function GalleryPage() {
  return (
    <section
      style={{ backgroundColor: '#0A0A0F', minHeight: '60dvh', padding: '48px 16px' }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <h1 style={{
          fontFamily: 'var(--font-playfair), Georgia, serif',
          fontWeight: 700, fontSize: '40px', color: '#F5F0E8',
          lineHeight: 1.1, marginBottom: '8px', textAlign: 'center',
        }}>
          Shop
        </h1>
        <p style={{
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
          fontSize: '16px', color: '#A09890', lineHeight: 1.6,
          marginBottom: '48px', textAlign: 'center',
        }}>
          Tap any item to see details and order
        </p>

        <GalleryClient />
      </div>
    </section>
  );
}
