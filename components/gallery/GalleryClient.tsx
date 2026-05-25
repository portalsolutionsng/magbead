'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Category, Product } from '@/data/products';
import { CATEGORIES, getProductsByCategory, imgSrc, formatPrice } from '@/data/products';
import { siteConfig } from '@/data/site';
import OrderModal from '@/components/ui/OrderModal';

const DESCRIPTIONS: Record<Category, string> = {
  'Luxury':      'Premium handcrafted pieces — our finest collection',
  'Waist Beads': 'Handcrafted waist beads for every occasion',
  'Necklaces':   'Statement necklaces crafted with care',
  'Bracelets':   'Beautiful bracelets for every wrist',
  'Anklets':     'Delicate anklets that move with you',
  'Earrings':    'Charming earrings to complete your look',
};

/** Styled placeholder for products with no photo yet */
function PlaceholderCard({ product, onClick }: { product: Product; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'block', background: 'none', border: 'none',
        padding: 0, cursor: 'pointer', textAlign: 'left', width: '100%',
      }}
      aria-label={`Order ${product.name} ${product.num}`}
    >
      {/* Placeholder image area */}
      <div style={{
        width: '100%', height: '200px',
        borderRadius: '12px',
        backgroundColor: '#1A1A26',
        border: '1px dashed #2A2A3A',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: '6px', position: 'relative',
      }}>
        <span style={{ fontSize: '28px' }}>📷</span>
        <span style={{
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
          fontSize: '11px', color: '#5A5450', textAlign: 'center',
          lineHeight: 1.4, padding: '0 8px',
        }}>
          Photo<br />Coming Soon
        </span>
        {/* Price badge */}
        <div style={{
          position: 'absolute', bottom: '8px', right: '8px',
          backgroundColor: 'rgba(10,10,15,0.9)',
          border: '1px solid #D4A843',
          borderRadius: '6px', padding: '3px 8px',
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
          fontSize: '12px', color: '#D4A843', fontWeight: 700,
        }}>
          {formatPrice(product.price)}
        </div>
      </div>
      {/* Name below */}
      <p style={{
        fontFamily: 'var(--font-inter), system-ui, sans-serif',
        fontSize: '12px', color: '#5A5450',
        margin: '6px 0 0', paddingLeft: '2px',
      }}>
        {product.name}{' '}
        <span style={{ color: '#3A3A4A' }}>{product.num}</span>
      </p>
    </button>
  );
}

/** Product card with real photo */
function PhotoCard({ product, onClick }: { product: Product; onClick: () => void }) {
  const isLuxury = product.category === 'Luxury';
  return (
    <button
      onClick={onClick}
      style={{
        display: 'block', background: 'none', border: 'none',
        padding: 0, cursor: 'pointer', textAlign: 'left', width: '100%',
      }}
      aria-label={`Order ${product.name} ${product.num}`}
    >
      <div style={{ position: 'relative' }}>
        <Image
          src={imgSrc(product.image!)}
          alt={`${product.name} ${product.num}`}
          width={400}
          height={400}
          style={{
            objectFit: 'cover', borderRadius: '12px',
            width: '100%', height: '200px', display: 'block',
            border: isLuxury ? '1px solid #D4A843' : 'none',
          }}
        />
        {/* Luxury badge */}
        {isLuxury && (
          <div style={{
            position: 'absolute', top: '8px', left: '8px',
            backgroundColor: '#D4A843', borderRadius: '4px',
            padding: '2px 8px',
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '10px', fontWeight: 700, color: '#0A0A0F',
            letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>
            ✦ Luxury
          </div>
        )}
        {/* Price badge */}
        <div style={{
          position: 'absolute', bottom: '8px', right: '8px',
          backgroundColor: 'rgba(10,10,15,0.85)',
          border: `1px solid ${isLuxury ? '#D4A843' : '#D4A843'}`,
          borderRadius: '6px', padding: '3px 8px',
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
          fontSize: '12px', color: '#D4A843', fontWeight: 700,
        }}>
          {formatPrice(product.price)}
        </div>
      </div>
      <p style={{
        fontFamily: 'var(--font-inter), system-ui, sans-serif',
        fontSize: '12px', color: '#A09890',
        margin: '6px 0 0', paddingLeft: '2px',
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
      }}>
        {product.name}{' '}
        <span style={{ color: '#D4A843' }}>{product.num}</span>
      </p>
    </button>
  );
}

export default function GalleryClient() {
  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <>
      {CATEGORIES.map((category) => {
        const items = getProductsByCategory(category);
        if (!items.length) return null;
        const isLuxury = category === 'Luxury';

        return (
          <div key={category} style={{ marginBottom: '56px' }}>

            {/* Category header */}
            <div style={{
              display: 'flex', flexDirection: 'column', gap: '8px',
              marginBottom: '20px', paddingBottom: '16px',
              borderBottom: `1px solid ${isLuxury ? '#3A2A00' : '#1A1A26'}`,
            }}>
              <h2 style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontWeight: 600, fontSize: '28px',
                color: isLuxury ? '#D4A843' : '#F5F0E8',
                margin: 0,
              }}>
                {isLuxury ? '✦ ' : ''}{category}
              </h2>
              <p style={{
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '14px', color: '#A09890', margin: 0,
              }}>
                {DESCRIPTIONS[category]}
              </p>
              <div style={{ marginTop: '8px' }}>
                <a
                  href={siteConfig.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    backgroundColor: isLuxury ? '#D4A843' : '#25D366',
                    color: isLuxury ? '#0A0A0F' : '#fff',
                    fontFamily: 'var(--font-inter), system-ui, sans-serif',
                    fontSize: '14px', fontWeight: 700,
                    padding: '10px 20px', borderRadius: '999px',
                    textDecoration: 'none',
                  }}
                >
                  Order {category === 'Luxury' ? 'Luxury Pieces' : category} on WhatsApp
                </a>
              </div>
            </div>

            {/* Product grid */}
            <div
              className="gallery-grid"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}
            >
              {items.map((product) =>
                product.image ? (
                  <PhotoCard
                    key={product.id}
                    product={product}
                    onClick={() => setSelected(product)}
                  />
                ) : (
                  <PlaceholderCard
                    key={product.id}
                    product={product}
                    onClick={() => setSelected(product)}
                  />
                )
              )}
            </div>
          </div>
        );
      })}

      <OrderModal product={selected} onClose={() => setSelected(null)} />

      <style>{`
        @media (min-width: 768px) {
          .gallery-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
    </>
  );
}
