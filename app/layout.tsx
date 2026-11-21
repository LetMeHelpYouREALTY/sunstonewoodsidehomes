import type { Metadata } from 'next'
import { Instrument_Serif, Manrope } from 'next/font/google'
import Script from 'next/script'
import { ThemeProvider } from 'next-themes'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { JsonLd } from '@/components/json-ld'
import SiteFooter from '@/components/site-footer'
import SiteHeader from '@/components/site-header'
import { entityGraphJsonLd } from '@/lib/structured-data'
import { GOOGLE_SITE_VERIFICATION } from '@/lib/gsc'
import {
  SITE_BRAND,
  SITE_LOGO,
  SITE_TAGLINE,
  SITE_URL,
} from '@/lib/site'

import './globals.css'

const bodyFont = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '600'],
  display: 'swap',
  // Let the LCP hero image win the first network slots on mobile.
  preload: false,
})

const headingFont = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: '400',
  display: 'swap',
  preload: false,
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Sunstone Woodside Homes | Capella Las Vegas 89143',
    template: '%s',
  },
  description: `Sunstone Woodside Homes by Dr. Jan Duffy — Capella at Sunstone single-story Woodside Homes in Las Vegas ZIP 89143.`,
  keywords: [
    'Sunstone Woodside Homes',
    'Sunstone Woodside Homes Las Vegas',
    'Capella at Sunstone',
    'Woodside Homes Las Vegas',
    'Sunstone Las Vegas 89143',
    'Capella Woodside Homes',
    'Dr. Jan Duffy',
  ],
  openGraph: {
    title: 'Sunstone Woodside Homes | Capella Las Vegas 89143',
    description: `Sunstone Woodside Homes — Capella at Sunstone and Sunstone master plan homes in ZIP 89143.`,
    url: SITE_URL,
    siteName: SITE_LOGO,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sunstone Woodside Homes | Capella Las Vegas 89143',
    description: `Sunstone Woodside Homes — Capella at Sunstone, Las Vegas 89143.`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  ...(GOOGLE_SITE_VERIFICATION
    ? { verification: { google: GOOGLE_SITE_VERIFICATION } }
    : {}),
  alternates: {
    canonical: '/',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1HCM0VVVP8"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1HCM0VVVP8');
          `}
        </Script>
        <JsonLd id="entity-graph-schema" data={entityGraphJsonLd} />
        {/*
          RealScout + widgetbe stay off the LCP critical path (mobile PSI:
          unused JS ~345 KiB, CloudFront listing photos ~665 KiB). Script
          mounts from RealScoutAfterHero once the carousel nears the viewport.
        */}
        {/*
          widgetbe: load only after first user gesture so it never contends
          with LCP element-render-delay on mobile lab / mid-tier devices.
        */}
        <Script id="widget-tracker" strategy="lazyOnload">
          {`
            (function () {
              var loaded = false;
              function loadWidgetBe() {
                if (loaded) return;
                loaded = true;
                window.removeEventListener('pointerdown', loadWidgetBe);
                window.removeEventListener('keydown', loadWidgetBe);
                window.removeEventListener('scroll', loadWidgetBe);
                (function(w,i,d,g,e,t){w["WidgetTrackerObject"]=g;(w[g]=w[g]||function()
                {(w[g].q=w[g].q||[]).push(arguments);}),(w[g].ds=1*new Date());(e="script"),
                (t=d.createElement(e)),(e=d.getElementsByTagName(e)[0]);t.async=1;t.src=i;
                e.parentNode.insertBefore(t,e);})
                (window,"https://widgetbe.com/agent",document,"widgetTracker");
                window.widgetTracker("create", "WT-XQHVYQWW");
                window.widgetTracker("send", "pageview");
              }
              window.addEventListener('pointerdown', loadWidgetBe, { once: true, passive: true });
              window.addEventListener('keydown', loadWidgetBe, { once: true });
              window.addEventListener('scroll', loadWidgetBe, { once: true, passive: true });
            })();
          `}
        </Script>
      </head>
      <body className={`${headingFont.variable} ${bodyFont.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}
