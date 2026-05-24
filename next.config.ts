import type { NextConfig } from 'next';
import withSerwist from '@serwist/next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  // basePath: '/magbead',      // Enable ONLY if deploying to username.github.io/magbead (no custom domain)
  // assetPrefix: '/magbead/',  // Enable ONLY if no custom domain
};

const withPWA = withSerwist({
  swSrc: 'app/sw.ts',
  swDest: 'public/sw.js',
  disable: process.env.NODE_ENV === 'development',
});

export default withPWA(nextConfig);
