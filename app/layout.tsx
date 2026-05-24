import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import { siteConfig } from '@/data/site';
import BottomNav from '@/components/layout/BottomNav';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';
import Footer from '@/components/layout/Footer';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const ogDescription =
  "Topnotch quality bead jewelry — waistbeads, bracelets, necklaces, anklets & more. Nationwide delivery across Nigeria. Order on WhatsApp.";

export const metadata: Metadata = {
  title: "Mag'Beads — Best Bead Plug in Port Harcourt",
  description: ogDescription,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: "Mag'Beads — Best Bead Plug in Port Harcourt",
    description: ogDescription,
    url: siteConfig.url,
    siteName: "Mag'Beads",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: "Mag'Beads jewelry",
      },
    ],
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mag'Beads — Best Bead Plug in Port Harcourt",
    description: ogDescription,
    images: ['/og-image.png'],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: "Mag'Beads",
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#D4A843',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body>
        <NextTopLoader
          color="#D4A843"
          height={3}
          showSpinner={false}
          crawl={true}
          easing="ease"
          speed={200}
        />
        <main className="min-h-[100dvh] pb-[calc(56px+env(safe-area-inset-bottom))] lg:pb-0">{children}</main>
        <Footer />
        <BottomNav />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
