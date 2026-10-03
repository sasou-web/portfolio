import { useSyncExternalStore } from 'react'

/** Mini routeur basé sur le hash : #/collection/projets/mon-projet */

function getPath(): string {
  return window.location.hash.replace(/^#\/?/, '')
}

function subscribe(cb: () => void) {
  window.addEventListener('hashchange', cb)
  return () => window.removeEventListener('hashchange', cb)
}

export function navigate(to: string) {
  const next = '#/' + to.replace(/^\/+/, '')
  if (window.location.hash !== next) window.location.hash = next
}

export function useRoute(): string[] {
  const path = useSyncExternalStore(subscribe, getPath, () => '')
  return path.split('/').filter(Boolean).map(decodeURIComponent)
}

/** Ouvre un lien externe (ou mailto:) */
export function openExternal(href: string) {
  if (href.startsWith('mailto:') || href.startsWith('tel:')) {
    window.location.href = href
  } else {
    window.open(href, '_blank', 'noopener,noreferrer')
  }
}

/** Suit un lien interne (to) ou externe (href) */
export function follow(link: { to?: string; href?: string }) {
  if (link.to) navigate(link.to)
  else if (link.href) openExternal(link.href)
}
