'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import type { Product } from '@/data/products';
import {
  CUSTOM_NAME_PRICE,
  SIZE_PRICING,
  getPriceForSize,
  parseInches,
  imgSrc,
  formatPrice,
} from '@/data/products';
import { siteConfig } from '@/data/site';

interface Props {
  product: Product | null;
  onClose: () => void;
}

export default function OrderModal({ product, onClose }: Props) {
  const [customerName, setCustomerName] = useState('');
  const [size, setSize] = useState('');
  const [wantsCustomName, setWantsCustomName] = useState(false);
  const [customName, setCustomName] = useState('');

  useEffect(() => {
    setCustomerName('');
    setSize('');
    setWantsCustomName(false);
    setCustomName('');
  }, [product?.id]);

  const handleClose = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    if (!product) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && handleClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [product, handleClose]);

  if (!product) return null;

  // ── Price calculation ──────────────────────────────────────────────────────
  const inches = parseInches(size);
  const sizedPrice = product.sizePricing && inches !== null ? getPriceForSize(inches) : null;
  const itemPrice = product.sizePricing
    ? sizedPrice                           // null = size not yet valid
    : product.price;
  const total =
    itemPrice !== null
      ? itemPrice + (wantsCustomName ? CUSTOM_NAME_PRICE : 0)
      : null;

  // Highlight the active pricing tier
  const activeTier =
    product.sizePricing && inches !== null
      ? SIZE_PRICING.find((t) => inches >= t.min && inches <= t.max) ?? null
      : null;

  const canOrder =
    customerName.trim().length > 0 &&
    (!product.sizePricing || sizedPrice !== null);

  // ── WhatsApp order ─────────────────────────────────────────────────────────
  function handleOrder() {
    const phone = siteConfig.phone.replace('+', '');
    const lines: string[] = [
      `Hi Mag'Beads! I'd like to place an order 🛍️`,
      '',
      `Product: ${product!.name} ${product!.num}`,
      `Item Price: ${formatPrice(itemPrice!)}`,
      `My Name: ${customerName.trim()}`,
    ];
    if (product!.needsSize && size.trim()) {
      lines.push(`Size: ${size.trim()}`);
    }
    if (wantsCustomName && customName.trim()) {
      lines.push(`Custom Name: ${customName.trim()} (+${formatPrice(CUSTOM_NAME_PRICE)})`);
    }
    lines.push('', `Total: ${formatPrice(total!)}`);
    const msg = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  }

  return (
    <div
      onClick={handleClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 300,
        backgroundColor: 'rgba(0,0,0,0.72)',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Order ${product.name}`}
    >
      {/* Bottom sheet */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#12121A',
          borderRadius: '20px 20px 0 0',
          padding: '0 20px',
          paddingBottom: 'calc(40px + env(safe-area-inset-bottom))',
          width: '100%', maxWidth: '480px',
          maxHeight: '92dvh', overflowY: 'auto',
          position: 'relative',
        }}
      >
        {/* Drag handle + close */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '14px 0 10px', position: 'relative',
        }}>
          <div style={{ width: '40px', height: '4px', borderRadius: '2px', backgroundColor: '#2A2A3A' }} />
          <button
            onClick={handleClose}
            aria-label="Close"
            style={{
              position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#A09890', fontSize: '26px', lineHeight: 1, padding: '4px 0',
            }}
          >×</button>
        </div>

        {/* Product summary */}
        <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '24px', marginTop: '8px' }}>
          {product.image ? (
            <Image
              src={imgSrc(product.image)}
              alt={product.name}
              width={72} height={72}
              style={{ objectFit: 'cover', borderRadius: '12px', flexShrink: 0 }}
            />
          ) : (
            <div style={{
              width: 72, height: 72, borderRadius: '12px', flexShrink: 0,
              backgroundColor: '#1A1A26', border: '1px dashed #2A2A3A',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px',
            }}>📷</div>
          )}
          <div>
            <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '12px', color: '#A09890', margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {product.category}
            </p>
            <p style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '17px', color: '#F5F0E8', fontWeight: 700, margin: '0 0 4px', lineHeight: 1.2 }}>
              {product.name} <span style={{ color: '#D4A843' }}>{product.num}</span>
            </p>
            {product.sizePricing ? (
              <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '13px', color: '#A09890', margin: 0 }}>
                Price based on size
              </p>
            ) : (
              <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '18px', color: '#D4A843', fontWeight: 700, margin: 0 }}>
                {formatPrice(product.price)}
              </p>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Your Name */}
          <div style={fieldWrap}>
            <label htmlFor="order-name" style={labelStyle}>Your Name *</label>
            <input
              id="order-name"
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter your name"
              autoComplete="name"
              style={inputStyle}
            />
          </div>

          {/* Size */}
          {product.needsSize && (
            <div style={fieldWrap}>
              <label htmlFor="order-size" style={labelStyle}>
                Size {product.sizePricing ? '*' : ''}
              </label>
              <input
                id="order-size"
                type="text"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder={product.sizePlaceholder}
                style={{
                  ...inputStyle,
                  borderColor: product.sizePricing && size && !sizedPrice ? '#8B2020' : '#2A2A3A',
                }}
              />
              {/* Out-of-range warning */}
              {product.sizePricing && size && !sizedPrice && (
                <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '12px', color: '#E05A5A', margin: 0 }}>
                  Size must be between 20 and 60 inches
                </p>
              )}
            </div>
          )}

          {/* Size pricing tiers — shown for waist beads */}
          {product.sizePricing && (
            <div style={{
              backgroundColor: '#0F0F1A',
              border: '1px solid #2A2A3A',
              borderRadius: '12px',
              padding: '12px 14px',
            }}>
              <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '11px', color: '#A09890', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Pricing Guide
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {SIZE_PRICING.map((tier) => {
                  const isActive = activeTier === tier;
                  return (
                    <div
                      key={tier.label}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '6px 10px',
                        borderRadius: '8px',
                        backgroundColor: isActive ? 'rgba(212,168,67,0.12)' : 'transparent',
                        border: isActive ? '1px solid rgba(212,168,67,0.3)' : '1px solid transparent',
                        transition: 'all 0.15s',
                      }}
                    >
                      <span style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '13px', color: isActive ? '#F5F0E8' : '#5A5450' }}>
                        {tier.label}
                      </span>
                      <span style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '13px', fontWeight: 700, color: isActive ? '#D4A843' : '#5A5450' }}>
                        {formatPrice(tier.price)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Custom Name checkbox */}
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', userSelect: 'none' }}>
            <input
              type="checkbox"
              checked={wantsCustomName}
              onChange={(e) => setWantsCustomName(e.target.checked)}
              style={{ width: '18px', height: '18px', accentColor: '#D4A843', cursor: 'pointer', flexShrink: 0 }}
            />
            <span style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '14px', color: '#F5F0E8' }}>
              Add Custom Name{' '}
              <span style={{ color: '#D4A843', fontWeight: 600 }}>(+{formatPrice(CUSTOM_NAME_PRICE)})</span>
            </span>
          </label>

          {wantsCustomName && (
            <div style={fieldWrap}>
              <label htmlFor="order-custom-name" style={labelStyle}>Custom Name</label>
              <input
                id="order-custom-name"
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="e.g. Precious"
                style={inputStyle}
                autoFocus
              />
            </div>
          )}

          {/* Total */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            borderTop: '1px solid #2A2A3A', paddingTop: '16px', marginTop: '4px',
          }}>
            <span style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '15px', color: '#A09890' }}>
              Total
            </span>
            <span style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '24px', fontWeight: 700, color: '#D4A843' }}>
              {total !== null ? formatPrice(total) : '—'}
            </span>
          </div>

          {/* ORDER button */}
          <button
            onClick={handleOrder}
            disabled={!canOrder}
            style={{
              width: '100%',
              backgroundColor: canOrder ? '#25D366' : '#1C2A1C',
              color: canOrder ? '#fff' : '#3A5A3A',
              border: 'none', borderRadius: '999px',
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '16px', fontWeight: 700,
              padding: '16px', cursor: canOrder ? 'pointer' : 'not-allowed',
              transition: 'background-color 0.15s, color 0.15s',
              letterSpacing: '0.04em',
            }}
          >
            ORDER VIA WHATSAPP
          </button>

          <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '11px', color: '#5A5450', textAlign: 'center', margin: 0 }}>
            More payment options coming soon
          </p>
        </div>
      </div>
    </div>
  );
}

const fieldWrap: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '6px' };
const labelStyle: React.CSSProperties = { fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '13px', color: '#A09890' };
const inputStyle: React.CSSProperties = {
  backgroundColor: '#1A1A26', border: '1px solid #2A2A3A', borderRadius: '10px',
  padding: '12px 14px', fontFamily: 'var(--font-inter), system-ui, sans-serif',
  fontSize: '15px', color: '#F5F0E8', outline: 'none', width: '100%', boxSizing: 'border-box',
};
