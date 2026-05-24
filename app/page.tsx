import { siteConfig } from '@/data/site';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import ScrollHint from '@/components/ui/ScrollHint';

export default function Home() {
  return (
    <section
      className="relative flex min-h-[100dvh] flex-col items-center justify-center text-center px-4 lg:grid lg:grid-cols-2 lg:text-left lg:px-12"
      style={{
        backgroundColor: '#0A0A0F',
        backgroundImage: `linear-gradient(to bottom, rgba(10,10,15,0.3) 0%, rgba(10,10,15,0.85) 70%, #0A0A0F 100%), url('/images/A629F0B2-5706-4151-B349-4AE0C5B62B2E.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Content column */}
      <div className="flex flex-col items-center gap-4 lg:items-start lg:justify-center lg:h-full">
        <h1
          style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontWeight: 700,
            fontSize: '40px',
            color: '#F5F0E8',
            lineHeight: 1.1,
            letterSpacing: 'normal',
          }}
        >
          Mag&apos;Beads
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontWeight: 400,
            fontSize: '16px',
            color: '#A09890',
            lineHeight: 1.6,
          }}
        >
          {siteConfig.tagline}
        </p>

        <p
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontWeight: 400,
            fontSize: '13px',
            color: '#5A5450',
            lineHeight: 1.3,
          }}
        >
          {siteConfig.subTagline}
        </p>

        <div className="w-full mt-2 lg:w-auto">
          <WhatsAppButton fullWidth />
        </div>
      </div>

      {/* Scroll hint */}
      <ScrollHint />
    </section>
  );
}
