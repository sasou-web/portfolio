import { useSyncExternalStore } from 'react'
import { ui } from './ui'

/**
 * Traductions FR / EN.
 *  - Dans les données : L('texte français', 'english text'), ou une simple chaîne si c'est pareil
 *  - Dans les composants : const { t, ui } = useI18n() puis t(texte) ou ui.cle
 * La langue est choisie dans cet ordre : ?lang=en dans l'URL, dernier choix du visiteur, langue du navigateur.
 */

export type Lang = 'fr' | 'en'
export type Text = string | { fr: string; en: string }

export const L = (fr: string, en: string): Text => ({ fr, en })

const STORAGE_KEY = 'portfolio-lang'

function initialLang(): Lang {
  const fromUrl = new URLSearchParams(window.location.search).get('lang')
  if (fromUrl === 'fr' || fromUrl === 'en') return fromUrl
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'fr' || stored === 'en') return stored
  return navigator.language?.toLowerCase().startsWith('fr') ? 'fr' : 'en'
}

let current: Lang = initialLang()
document.documentElement.lang = current
const listeners = new Set<() => void>()

export function setLang(lang: Lang) {
  current = lang
  localStorage.setItem(STORAGE_KEY, lang)
  document.documentElement.lang = lang
  // Garde un éventuel ?lang= de l'URL cohérent avec le choix (sinon un rechargement le réimposerait)
  const url = new URL(window.location.href)
  if (url.searchParams.has('lang')) {
    url.searchParams.set('lang', lang)
    window.history.replaceState(null, '', url)
  }
  listeners.forEach((l) => l())
}

export function tr(text: Text, lang: Lang = current): string {
  return typeof text === 'string' ? text : text[lang]
}

export function useI18n() {
  const lang = useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => listeners.delete(cb) },
    () => current,
  )
  return {
    lang,
    ui: ui[lang],
    t: (text: Text) => tr(text, lang),
    // Espace normale comme séparateur de milliers (l'espace fine insécable n'existe pas dans toutes les polices)
    num: (n: number) => n.toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-US').replace(/\s/g, ' '),
  }
}
