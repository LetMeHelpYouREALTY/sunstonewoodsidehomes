import Image from 'next/image'
import Link from 'next/link'

import { pageImages, type PageImageKey } from '@/lib/images'
import {
  CONTACT_PHONE,
  CONTACT_PHONE_LINK,
  SITE_BRAND,
  SITE_TAGLINE,
} from '@/lib/site'

type LuxuryHeroProps = {
  imageKey: PageImageKey
  /** Localized H1 — keep shorter than the brand lockup. */
  headline: string
  support: string
  primaryHref: string
  primaryLabel: string
  secondaryHref?: string
  secondaryLabel?: string
}

/**
 * Full-bleed first viewport: brand as the hero signal, one headline,
 * one support line, one CTA group, one edge-to-edge photo.
 */
export function LuxuryHero({
  imageKey,
  headline,
  support,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: LuxuryHeroProps) {
  const image = pageImages[imageKey]

  return (
    <section
      className="hero-luxury relative isolate min-h-[100svh] overflow-hidden text-[var(--hero-fg)]"
      // Inline critical box so the LCP <img> can paint before the 50KB CSS
      // bundle arrives (mobile PSI element-render-delay was ~2s).
      style={{
        position: 'relative',
        isolation: 'isolate',
        minHeight: '100svh',
        overflow: 'hidden',
        backgroundColor: '#121816',
        color: '#f3f2ef',
      }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        fetchPriority="high"
        decoding="sync"
        quality={70}
        sizes="100vw"
        className="hero-luxury-media object-cover"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      <div
        className="hero-luxury-veil absolute inset-0"
        aria-hidden
        style={{ position: 'absolute', inset: 0 }}
      />

      <div
        className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col justify-end px-4 pb-14 pt-28 sm:pb-20"
        style={{ position: 'relative', zIndex: 10, minHeight: '100svh' }}
      >
        <p className="hero-reveal hero-reveal-1 font-heading text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.95] tracking-[-0.02em]">
          {SITE_BRAND}
        </p>
        <p className="hero-reveal hero-reveal-2 mt-3 max-w-xl text-sm font-medium uppercase tracking-[0.22em] text-[var(--hero-muted)] sm:text-base">
          {SITE_TAGLINE}
        </p>
        <h1 className="hero-reveal hero-reveal-3 mt-8 max-w-2xl font-heading text-[clamp(1.5rem,3.2vw,2.25rem)] leading-snug text-[var(--hero-fg)]">
          {headline}
        </h1>
        <p className="hero-reveal hero-reveal-4 mt-4 max-w-xl text-base leading-relaxed text-[var(--hero-muted)] sm:text-lg">
          {support}
        </p>
        <div className="hero-reveal hero-reveal-5 mt-8 flex flex-wrap items-center gap-3">
          {primaryHref.startsWith('http') ? (
            <a
              className="btn"
              href={primaryHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              {primaryLabel}
            </a>
          ) : (
            <Link className="btn" href={primaryHref}>
              {primaryLabel}
            </Link>
          )}
          {secondaryHref && secondaryLabel ? (
            <Link className="btn-line btn-line-on-dark" href={secondaryHref}>
              {secondaryLabel}
            </Link>
          ) : null}
          <a className="btn-line btn-line-on-dark" href={CONTACT_PHONE_LINK}>
            Call {CONTACT_PHONE}
          </a>
        </div>
        <p className="hero-reveal hero-reveal-6 source-line mt-6 max-w-xl text-[var(--hero-muted)]">
          {image.caption}
        </p>
      </div>
    </section>
  )
}
