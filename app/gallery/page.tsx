import type { Metadata } from 'next';
import Image from 'next/image';
import { siteConfig } from '@/data/site';

export const metadata: Metadata = {
  title: "Shop — Mag'Beads",
  description: "Browse our full collection of bead jewelry — waistbeads, bracelets, necklaces, anklets and more.",
};

const categories = [
  {
    id: 'waist-beads',
    title: 'Waist Beads',
    description: 'Handcrafted waist beads for every occasion',
    images: [
      { src: '/images/A629F0B2-5706-4151-B349-4AE0C5B62B2E.png', alt: 'Pink waist beads with butterfly charms' },
      { src: '/images/IMG_1063.jpeg', alt: 'Glow-in-the-dark waist beads — I Am A Queen' },
      { src: '/images/IMG_8105.jpeg', alt: 'Crystal and gold waist beads collection' },
      { src: '/images/IMG_0979.jpeg', alt: 'Waist beads' },
      { src: '/images/IMG_1125.jpeg', alt: 'Waist beads' },
      { src: '/images/IMG_1134.jpeg', alt: 'Waist beads' },
      { src: '/images/IMG_1143.jpeg', alt: 'Waist beads' },
      { src: '/images/IMG_1161.jpeg', alt: 'Waist beads' },
    ],
  },
  {
    id: 'necklaces',
    title: 'Necklaces',
    description: 'Statement necklaces crafted with care',
    images: [
      { src: '/images/IMG_1168.jpeg', alt: 'Necklace' },
      { src: '/images/IMG_1176.jpeg', alt: 'Necklace' },
      { src: '/images/IMG_1181.jpeg', alt: 'Necklace' },
      { src: '/images/IMG_8125.jpeg', alt: 'Necklace' },
      { src: '/images/IMG_8164.jpeg', alt: 'Necklace' },
    ],
  },
  {
    id: 'bracelets',
    title: 'Bracelets',
    description: 'Beautiful bracelets for every wrist',
    images: [
      { src: '/images/IMG_1315.jpeg', alt: 'Pearl and silver bracelet collection' },
      { src: '/images/IMG_1280.jpeg', alt: 'Bracelet' },
      { src: '/images/IMG_1282.jpeg', alt: 'Bracelet' },
      { src: '/images/IMG_8167.jpeg', alt: 'Bracelet' },
    ],
  },
  {
    id: 'anklets',
    title: 'Anklets',
    description: 'Delicate anklets that move with you',
    images: [
      { src: '/images/IMG_1888.jpeg', alt: 'Anklet' },
      { src: '/images/IMG_1889.jpeg', alt: 'Anklet' },
      { src: '/images/IMG_1890.jpeg', alt: 'Anklet' },
      { src: '/images/IMG_1893.jpeg', alt: 'Anklet' },
      { src: '/images/58187631-f77e-4125-985c-227f21615e7a.jpeg', alt: 'Butterfly earrings with thank you card' },
    ],
  },
];

export default function GalleryPage() {
  return (
    <section
      style={{ backgroundColor: '#0A0A0F', minHeight: '60dvh', padding: '48px 16px' }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Page title */}
        <h1
          style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontWeight: 700,
            fontSize: '40px',
            color: '#F5F0E8',
            lineHeight: 1.1,
            marginBottom: '8px',
            textAlign: 'center',
          }}
        >
          Shop
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '16px',
            color: '#A09890',
            lineHeight: 1.6,
            marginBottom: '48px',
            textAlign: 'center',
          }}
        >
          Handcrafted bead jewelry — tap any item to order on WhatsApp
        </p>

        {/* Categories */}
        {categories.map((category) => (
          <div key={category.id} style={{ marginBottom: '56px' }}>
            {/* Category header */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                marginBottom: '20px',
                paddingBottom: '16px',
                borderBottom: '1px solid #1A1A26',
              }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontWeight: 600,
                  fontSize: '28px',
                  color: '#F5F0E8',
                  margin: 0,
                }}
              >
                {category.title}
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-inter), system-ui, sans-serif',
                  fontSize: '14px',
                  color: '#A09890',
                  margin: 0,
                }}
              >
                {category.description}
              </p>
              {/* WhatsApp CTA */}
              <div style={{ marginTop: '8px' }}>
                <a
                  href={siteConfig.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    backgroundColor: '#25D366',
                    color: '#fff',
                    fontFamily: 'var(--font-inter), system-ui, sans-serif',
                    fontSize: '14px',
                    fontWeight: 600,
                    padding: '10px 20px',
                    borderRadius: '999px',
                    textDecoration: 'none',
                  }}
                >
                  Order {category.title} on WhatsApp
                </a>
              </div>
            </div>

            {/* Image grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px',
              }}
              className="gallery-grid"
            >
              {category.images.map((item) => (
                <a
                  key={item.src}
                  href={siteConfig.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'block', textDecoration: 'none' }}
                  aria-label={`Order ${item.alt} on WhatsApp`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={400}
                    height={400}
                    style={{
                      objectFit: 'cover',
                      borderRadius: '12px',
                      width: '100%',
                      height: '200px',
                    }}
                  />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Responsive 3-col on desktop */}
      <style>{`
        @media (min-width: 768px) {
          .gallery-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
