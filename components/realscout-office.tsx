'use client'

import { createElement, useEffect, type HTMLAttributes } from 'react'

import { DeferredRender } from '@/components/deferred-render'
import { REALSCOUT_AGENT_ID } from '@/lib/site'

const REALSCOUT_SCRIPT_ID = 'realscout-web-components'
const REALSCOUT_SCRIPT_SRC =
  'https://em.realscout.com/widgets/realscout-web-components.umd.js'

function ensureRealScoutScript() {
  if (typeof document === 'undefined') return
  if (document.getElementById(REALSCOUT_SCRIPT_ID)) return

  const script = document.createElement('script')
  script.id = REALSCOUT_SCRIPT_ID
  script.src = REALSCOUT_SCRIPT_SRC
  script.type = 'module'
  script.async = true
  document.body.appendChild(script)
}

/**
 * RealScout office-listings carousel. Place immediately below every page hero.
 * Script loads only when this section mounts (deferred until near viewport).
 */
export function RealScoutOffice() {
  useEffect(() => {
    ensureRealScoutScript()
  }, [])

  return (
    <section
      aria-label="Office listings carousel from Dr. Jan Duffy"
      className="min-w-0 w-full"
    >
      <div className="mb-3">
        <p className="eyebrow">Live office listings</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Scroll the RealScout carousel for current homes from Dr. Jan Duffy’s
          office.
        </p>
      </div>
      {createElement('realscout-office-listings', {
        'agent-encoded-id': REALSCOUT_AGENT_ID,
        'sort-order': 'NEWEST',
        'listing-status': 'For Sale',
      } as HTMLAttributes<HTMLElement>)}
    </section>
  )
}

/** Standard band that sits directly under a page hero on every route. */
export function RealScoutAfterHero() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <DeferredRender
        rootMargin="400px"
        fallback={
          <div
            className="min-h-[12rem] w-full"
            aria-hidden
            data-realscout-placeholder
          />
        }
      >
        <RealScoutOffice />
      </DeferredRender>
    </div>
  )
}
