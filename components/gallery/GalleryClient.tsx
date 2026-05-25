'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Category } from '@/data/products';
import { CATEGORIES, getProductsByCategory, imgSrc, formatPrice } from '@/data/products';
import { siteConfig } from '@/data/site';
import OrderModal from '@/components/ui/OrderModal';
import type { Product } from '@/data/products';

const DESCRIPTIONS: Record<Category, string> = {
  'Waist Beads': 'Handcrafted waist beads for every occasion',
  'Necklaces':   'Statement necklaces crafted with care',
  'Bracelets':   'Beautiful bracelets for every wrist',
  'Anklets':     'Delicate anklets that move with you',
  'Earrings':    'Charming earrings to complete your look',
};

export default function GalleryClient() {
  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <>
      {CATEGORIES.map((category) => {
        const items = getProductsByCategory(category);
        if (!items.length) return null;

        return (
          <div key={category} style={{ marginBottom: '56px' }}>

            {/* Category header */}
            <div style={{
              display: 'flex', flexDirection: 'column', gap: '8px',
              marginBottom: '20px', paddingBottom: '16px',
              borderBottom: '1px solid #1A1A26',
            }}>
              <h2 style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontWeight: 600, fontSize: '28px', color: '#F5F0E8', margin: 0,
              }}>
                {category}
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
                    backgroundColor: '#25D366', color: '#fff',
                    fontFamily: 'var(--font-inter), system-ui, sans-serif',
                    fontSize: '14px', fontWeight: 600,
                    padding: '10px 20px', borderRadius: '999px',
                    textDecoration: 'none',
                  }}
                >
                  Order {category} on WhatsApp
                </a>
              </div>
            </div>

            {/* Product grid */}
            <div
              className="gallery-grid"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}
            >
              {items.map((product) => (
                <button
                  key={product.id}
                  onClick={() => setSelected(product)}
                  style={{
                    display: 'block', background: 'none', border: 'none',
                    padding: 0, cursor: 'pointer', textAlign: 'left',
                  }}
                  aria-label={`Order ${product.name}`}
                >
                  {/* Image with price badge */}
                  <div style={{ position: 'relative' }}>
                    <Image
                      src={imgSrc(product.image)}
                      alt={product.name}
                      width={400}
                      height={400}
                      style={{
                        objectFit: 'cover', borderRadius: '12px',
                        width: '100%', height: '200px', display: 'block',
                      }}
                    />
                    {/* Price badge */}
                    <div style={{
                      position: 'absolute', bottom: '8px', right: '8px',
                      backgroundColor: 'rgba(10, 10, 15, 0.85)',
                      border: '1px solid #D4A843',
                      borderRadius: '6px',
                      padding: '3px 8px',
                      fontFamily: 'var(--font-inter), system-ui, sans-serif',
                      fontSize: '12px', color: '#D4A843', fontWeight: 700,
                    }}>
                      {formatPrice(product.price)}
                    </div>
                  </div>

                  {/* Name below image */}
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
              ))}
            </div>
          </div>
        );
      })}

      {/* Order modal */}
      <OrderModal product={selected} onClose={() => setSelected(null)} />

      {/* Responsive 3-col on desktop */}
      <style>{`
        @media (min-width: 768px) {
          .gallery-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
    </>
  );
}
