import type { NextConfig } from 'next';
import withSerwist from '@serwist/next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: '/magbead',      // Remove when using custom domain (magbeads.com.ng)
  assetPrefix: '/magbead/',  // Remove when using custom domain (magbeads.com.ng)
};

const withPWA = withSerwist({
  swSrc: 'app/sw.ts',
  swDest: 'public/sw.js',
  disable: process.env.NODE_ENV === 'development',
});

export default withPWA(nextConfig);
