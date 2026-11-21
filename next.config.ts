import type { NextConfig } from 'next'
import { withWorkflow } from 'workflow/next'

import { ALIAS_HOSTS, SITE_URL } from '@/lib/site'

const nextConfig: NextConfig = {
  // Compress output (gzip/brotli)
  compress: true,
  
  // Optimize images with modern formats
  images: {
    formats: ['image/avif', 'image/webp'],
    // Hero sources are ≤1920px; drop 2048/3840 so mobile srcsets stay lean.
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [70, 75],
  },
  
  async redirects() {
    const hostAliases = ALIAS_HOSTS.flatMap((host) => [
      {
        source: '/',
        has: [{ type: 'host' as const, value: host }],
        destination: SITE_URL,
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host' as const, value: host }],
        destination: `${SITE_URL}/:path*`,
        permanent: true,
      },
    ])

    // Legacy paths still in GSC coverage → live indexable URLs (308/permanent).
    const legacyPaths = [
      { source: '/capella', destination: '/communities/capella' },
      { source: '/capella-at-sunstone', destination: '/communities/capella' },
      { source: '/listings', destination: '/move-in-ready' },
      { source: '/homes', destination: '/move-in-ready' },
      { source: '/properties', destination: '/move-in-ready' },
      { source: '/search', destination: '/move-in-ready' },
      { source: '/idx', destination: '/move-in-ready' },
      { source: '/valuation', destination: '/sell' },
      { source: '/home-valuation', destination: '/sell' },
      { source: '/schedule', destination: '/touring' },
      { source: '/book', destination: '/touring' },
      { source: '/appointment', destination: '/touring' },
      { source: '/open-houses', destination: '/touring' },
      { source: '/blog', destination: '/market-report' },
      { source: '/news', destination: '/market-report' },
      { source: '/privacy', destination: '/contact' },
      { source: '/privacy-policy', destination: '/contact' },
      { source: '/terms', destination: '/contact' },
      {
        source: '/apple-touch-icon.png',
        destination: '/apple-icon.png',
      },
    ].map((r) => ({ ...r, permanent: true }))

    return [...hostAliases, ...legacyPaths]
  },

  // Performance headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
      {
        // Cache static assets
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif|woff|woff2|ttf|eot)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  
  // Reduce JavaScript bundle size
  // Note: SWC minification is enabled by default in Next.js 16
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
}

export default withWorkflow(nextConfig)
