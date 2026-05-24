import { Truck, Gift, BadgeCheck, Instagram, Music2, Phone } from 'lucide-react';
import { siteConfig } from '@/data/site';

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#12121A',
        padding: '32px 16px',
        paddingBottom: 'calc(env(safe-area-inset-bottom) + 80px)',
      }}
    >
      <div style={{ maxWidth: '768px', margin: '0 auto' }}>
        {/* Wordmark */}
        <p
          style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontWeight: 700,
            fontSize: '20px',
            color: '#F5F0E8',
            marginBottom: '12px',
          }}
        >
          MAG&apos;BEADS
        </p>

        {/* Footer tagline */}
        <p
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '13px',
            color: '#A09890',
            lineHeight: '1.6',
            marginBottom: '24px',
          }}
        >
          {siteConfig.footerTagline}
        </p>

        {/* Trust badges */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '24px',
          }}
        >
          {[
            { Icon: Truck, text: 'Nationwide Delivery' },
            { Icon: Gift, text: 'Free Gift with Every Order' },
            { Icon: BadgeCheck, text: `CAC Reg. No. ${siteConfig.cacNumber}` },
          ].map(({ Icon, text }) => (
            <div
              key={text}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#1A1A26',
                border: '1px solid #2A2A3A',
                borderRadius: '8px',
                padding: '8px 12px',
              }}
            >
              <Icon
                size={16}
                strokeWidth={1.5}
                style={{ color: '#D4A843', flexShrink: 0 }}
                aria-hidden="true"
              />
              <span
                style={{
                  fontFamily: 'var(--font-inter), system-ui, sans-serif',
                  fontSize: '13px',
                  color: '#A09890',
                }}
              >
                {text}
              </span>
            </div>
          ))}
        </div>

        {/* Social links */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '20px',
            flexWrap: 'wrap',
          }}
        >
          <a
            href={siteConfig.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#A09890',
              textDecoration: 'none',
              minHeight: '44px',
              minWidth: '44px',
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '13px',
            }}
            aria-label={`TikTok: ${siteConfig.tiktokHandle}`}
          >
            <Music2 size={20} strokeWidth={1.5} aria-hidden="true" />
            <span>{siteConfig.tiktokHandle}</span>
          </a>
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#A09890',
              textDecoration: 'none',
              minHeight: '44px',
              minWidth: '44px',
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '13px',
            }}
            aria-label={`Instagram: ${siteConfig.instagramHandle}`}
          >
            <Instagram size={20} strokeWidth={1.5} aria-hidden="true" />
            <span>{siteConfig.instagramHandle}</span>
          </a>
        </div>

        {/* Phone */}
        <a
          href={`tel:${siteConfig.phone}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#A09890',
            textDecoration: 'none',
            minHeight: '44px',
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '16px',
            marginBottom: '16px',
          }}
          aria-label={`Call ${siteConfig.phoneDisplay}`}
        >
          <Phone size={20} strokeWidth={1.5} aria-hidden="true" />
          <span>{siteConfig.phoneDisplay}</span>
        </a>

        {/* CAC reg line */}
        <p
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '13px',
            color: '#5A5450',
            marginTop: '8px',
            marginBottom: '8px',
          }}
        >
          {siteConfig.cacLine}
        </p>

        {/* Copyright */}
        <p
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '11px',
            color: '#5A5450',
          }}
        >
          &copy; 2024 Mag&apos;Beads. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
