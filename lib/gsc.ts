/**
 * Google Search Console — sunstonewoodsidehomes.com only.
 *
 * Property: Domain `sunstonewoodsidehomes.com` (preferred) or URL-prefix SITE_URL.
 * Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION (or GOOGLE_SITE_VERIFICATION) to the
 * token Google shows when you add this property — do not reuse the Las Vegas token.
 *
 * After verify → Sitemaps → submit GSC_SITEMAP_URL.
 */
import { SITE_URL } from '@/lib/site'

export const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() ||
  process.env.GOOGLE_SITE_VERIFICATION?.trim() ||
  ''

export const GSC_SITEMAP_URL = `${SITE_URL}/sitemap.xml`
export const GSC_PROPERTY_URL = SITE_URL
export const GSC_DOMAIN = 'sunstonewoodsidehomes.com'
