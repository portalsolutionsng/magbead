import type { Metadata } from 'next';
import Image from 'next/image';
import { siteConfig, basePath } from '@/data/site';

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
      { src: `${basePath}/images/waist-beads-pink-luxury.png`,          alt: 'Pink luxury waist beads with butterfly charms' },
      { src: `${basePath}/images/waist-beads-glow-queen.jpeg`,          alt: 'Glow-in-the-dark waist beads — I Am A Queen' },
      { src: `${basePath}/images/waist-beads-crystal-delicate.jpeg`,    alt: 'Crystal multi-strand delicate waist beads' },
      { src: `${basePath}/images/waist-beads-black-gold.jpeg`,          alt: 'Black and gold waist beads with butterfly charms' },
      { src: `${basePath}/images/waist-beads-pink-flowers.jpeg`,        alt: 'Pink waist beads with flower and butterfly charms' },
      { src: `${basePath}/images/waist-beads-yellow-green.jpeg`,        alt: 'Yellow-green waist beads with charms' },
      { src: `${basePath}/images/waist-beads-blue-hearts.jpeg`,         alt: 'Blue waist beads with heart charms' },
      { src: `${basePath}/images/waist-beads-multicolor.jpeg`,          alt: 'Multicolor waist beads in blue, pink and red' },
      { src: `${basePath}/images/waist-beads-crystal-gold-flatlay.jpeg`,alt: 'Crystal and gold waist beads collection flatlay' },
      { src: `${basePath}/images/waist-beads-pink-yellow-gift.jpeg`,    alt: 'Pink and yellow waist beads with gift packaging' },
    ],
  },
  {
    id: 'necklaces',
    title: 'Necklaces',
    description: 'Statement necklaces crafted with care',
    images: [
      { src: `${basePath}/images/necklace-pearl-classic.jpeg`,       alt: 'Classic pearl necklace on display bust' },
      { src: `${basePath}/images/necklace-pearl-classic-2.jpeg`,     alt: 'Pearl necklace — second view' },
      { src: `${basePath}/images/necklace-crystal-clear-heart.jpeg`, alt: 'Crystal choker with silver heart charm' },
      { src: `${basePath}/images/necklace-purple-smiley-rose.jpeg`,  alt: 'Purple crystal choker with smiley face and rose charm' },
      { src: `${basePath}/images/necklace-lava-stone-bust.jpeg`,     alt: 'Black lava stone necklace on display bust' },
    ],
  },
  {
    id: 'bracelets',
    title: 'Bracelets',
    description: 'Beautiful bracelets for every wrist',
    images: [
      { src: `${basePath}/images/bracelet-pearl-silver-flatlay.jpeg`,  alt: 'Pearl and silver bracelet collection flatlay' },
      { src: `${basePath}/images/bracelet-lava-black-stack.jpeg`,      alt: 'Black lava stone bracelet stack' },
      { src: `${basePath}/images/bracelet-lava-black-stack-2.jpeg`,    alt: 'Black lava stone bracelet stack — second view' },
    ],
  },
  {
    id: 'anklets',
    title: 'Anklets',
    description: 'Delicate anklets that move with you',
    images: [
      { src: `${basePath}/images/anklet-black-crystal-sparkle.jpeg`, alt: 'Black crystal multi-strand sparkle anklet' },
      { src: `${basePath}/images/anklet-red-gold-crystal.jpeg`,      alt: 'Red and gold crystal multi-strand anklet' },
    ],
  },
  {
    id: 'earrings',
    title: 'Earrings',
    description: 'Charming earrings to complete your look',
    images: [
      { src: `${basePath}/images/earrings-butterfly-pearl-card.jpeg`, alt: 'Gold butterfly earrings with pearl drops' },
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
