import { permanentRedirect } from 'next/navigation'

/**
 * Former service-area URLs (pre-Oct 2026). Permanent redirects so GSC
 * "Not found (404)" and "Page with redirect" can consolidate to live pages.
 */
const MOVED: Record<string, string> = {
  'capella-at-sunstone': '/communities/capella',
  'sunstone-master-plan': '/communities',
  sunstone: '/communities',
  capella: '/communities/capella',
  lyra: '/communities/lyra',
  axel: '/communities/axel',
  alia: '/communities/alia',
  trilogy: '/trilogy',
  'northwest-las-vegas': '/communities',
  'las-vegas': '/communities',
  '89143': '/communities',
}

export default async function ServiceAreaRedirect({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  permanentRedirect(MOVED[slug] ?? '/communities')
}
