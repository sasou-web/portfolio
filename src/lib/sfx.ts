import { useSyncExternalStore } from 'react'

/**
 * Effets sonores du client LoL (fichiers .ogg servis par CommunityDragon).
 *
 * Les sons sont branchés automatiquement sur l'interface grâce aux sélecteurs CSS
 * de RULES (survol + clic). Pour un son ponctuel ailleurs : playSfx('readyIntro').
 * Les navigateurs bloquent l'audio tant que le visiteur n'a pas cliqué une première fois.
 */

const P = 'https://raw.communitydragon.org/latest/plugins'
const S = `${P}/rcp-fe-lol-static-assets/global/default/sounds`
const U = `${P}/rcp-fe-lol-uikit/global/default`

const SOUNDS = {
  buttonHover: `${S}/sfx-uikit-button-gold-hover.ogg`,
  buttonClick: `${S}/sfx-uikit-button-gold-click.ogg`,
  playHover: `${S}/sfx-nav-button-play-hover.ogg`,
  playClick: `${S}/sfx-nav-button-play-click.ogg`,
  back: `${S}/sfx-uikit-button-arrowback-click.ogg`,
  navClick: `${U}/sfx-nav-button-text-click.ogg`,
  genericHover: `${S}/sfx-uikit-button-generic-hover.ogg`,
  iconHover: `${U}/sfx-uikit-framed-icon-hover.ogg`,
  iconClick: `${S}/sfx-uikit-framed-icon-click.ogg`,
  textClick: `${S}/sfx-uikit-text-click-small.ogg`,
  smallClick: `${S}/sfx-uikit-generic-click-small.ogg`,
  gridHover: `${S}/sfx-uikit-grid-hover.ogg`,
  gridClick: `${S}/sfx-uikit-grid-click.ogg`,
  gridBigHover: `${S}/sfx-uikit-grid-big-hover.ogg`,
  gridBigClick: `${S}/sfx-uikit-grid-big-click.ogg`,
  circleHover: `${S}/sfx-uikit-button-circlegold-hover.ogg`,
  closeClick: `${S}/sfx-uikit-button-circlex-click.ogg`,
  dropdownClick: `${U}/sfx-uikit-dropdown-click.ogg`,
  dropdownSelect: `${U}/sfx-uikit-dropdown-select.ogg`,
  radioClick: `${U}/sfx-uikit-radio-click.ogg`,
  checkboxClick: `${U}/sfx-uikit-checkbox-click.ogg`,
  mapClick: `${P}/rcp-fe-lol-parties/global/default/sfx-gameselect-button-map-click.ogg`,
  confirmHover: `${P}/rcp-fe-lol-parties/global/default/sfx-gameselect-button-confirm-hover.ogg`,
  confirmClick: `${P}/rcp-fe-lol-parties/global/default/sfx-gameselect-button-confirm-click.ogg`,
  magicHover: `${S}/sfx-uikit-magic-button-hover.ogg`,
  readyIntro: `${S}/sfx-readycheck-intro.ogg`,
  acceptHover: `${S}/sfx-readycheck-accept-button-hover.ogg`,
  acceptClick: `${S}/sfx-readycheck-accept-button-click.ogg`,
  readyAccepted: `${S}/sfx-readycheck-outro-accepted.ogg`,
  declineClick: `${S}/sfx-readycheck-decline-button-click.ogg`,
  readyDeclined: `${S}/sfx-readycheck-outro-declined.ogg`,
  splashSwitch: `${P}/rcp-fe-lol-collections/global/default/audio/sfx-splash-switch.ogg`,
  summonerClick: `${P}/rcp-fe-lol-profiles/global/default/sfx-profile-summoner-big-click.ogg`,
  dialogOpen: `${S}/sfx-uikit-button-flyout-open-click.ogg`,
  secret: `${U}/sfx-vignette-celebration-intro.ogg`,
} as const

export type SoundName = keyof typeof SOUNDS

/** Quel son jouer sur quel élément. Le premier ancêtre qui correspond l'emporte. */
const RULES: { sel: string; hover?: SoundName; click?: SoundName }[] = [
  { sel: '.play.is-active .play__btn', hover: 'genericHover', click: 'back' },
  { sel: '.play__btn', hover: 'playHover', click: 'playClick' },
  { sel: '.play__logo', hover: 'iconHover', click: 'iconClick' },
  { sel: '.ready__accept', hover: 'acceptHover', click: 'acceptClick' },
  { sel: '.ready__decline', click: 'declineClick' },
  { sel: '.play-screen__footer .magic-btn', hover: 'confirmHover', click: 'confirmClick' },
  { sel: '.magic-btn', hover: 'magicHover', click: 'buttonClick' },
  { sel: '.mode', hover: 'gridHover', click: 'mapClick' },
  { sel: '.lol-btn', hover: 'buttonHover', click: 'buttonClick' },
  { sel: '.close-btn', hover: 'circleHover', click: 'closeClick' },
  { sel: '.champion__back', hover: 'genericHover', click: 'back' },
  { sel: '.navtab--text', hover: 'genericHover', click: 'navClick' },
  { sel: '.navtab--icon', hover: 'iconHover', click: 'iconClick' },
  { sel: '.subnav__item, .text-btn, .hero__pip', click: 'textClick' },
  { sel: '.home-card, .news-card, .widget', hover: 'gridBigHover', click: 'gridBigClick' },
  { sel: '.champ, .mastery-card, .match__row', hover: 'gridHover', click: 'gridClick' },
  { sel: '.skins__thumb', hover: 'gridHover', click: 'splashSwitch' },
  { sel: '.ability', hover: 'iconHover', click: 'iconClick' },
  { sel: '.role-filter__btn', hover: 'genericHover', click: 'smallClick' },
  { sel: '.dropdown__btn', click: 'dropdownClick' },
  { sel: '.dropdown__item', click: 'dropdownSelect' },
  { sel: '.radio', click: 'radioClick' },
  { sel: '.checkbox', click: 'checkboxClick' },
  { sel: '.social__avatar-btn', click: 'summonerClick' },
  { sel: '.lang-switch button', hover: 'genericHover', click: 'smallClick' },
  { sel: '.social__controls button', click: 'dialogOpen' },
  {
    sel: '.social__action, .social__footer button, .group__header, .friend.is-link, .social-reopen, .mobile-social-toggle',
    click: 'smallClick',
  },
]

/* ─────────────────────────────── Réglages ─────────────────────────────── */

type Settings = { enabled: boolean; volume: number }

const STORAGE_KEY = 'portfolio-sfx'

function loadSettings(): Settings {
  try {
    const s = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '')
    return { enabled: s.enabled !== false, volume: typeof s.volume === 'number' ? s.volume : 0.6 }
  } catch {
    return { enabled: true, volume: 0.6 }
  }
}

let settings = loadSettings()
const listeners = new Set<() => void>()

export function setSfxSettings(patch: Partial<Settings>) {
  settings = { ...settings, ...patch }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  if (master) master.gain.value = settings.volume
  if (settings.enabled) unlock()
  listeners.forEach((l) => l())
}

export function useSfxSettings(): Settings {
  return useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => listeners.delete(cb) },
    () => settings,
  )
}

/* ─────────────────────────────── Moteur audio ─────────────────────────────── */

let ctx: AudioContext | null = null
let master: GainNode | null = null
const files = new Map<SoundName, Promise<ArrayBuffer | null>>()
const buffers = new Map<SoundName, AudioBuffer>()

function fetchAll() {
  for (const name of Object.keys(SOUNDS) as SoundName[]) {
    if (files.has(name)) continue
    files.set(
      name,
      fetch(SOUNDS[name]).then((r) => (r.ok ? r.arrayBuffer() : null)).catch(() => null),
    )
  }
}

function decodeAll() {
  if (!ctx) return
  fetchAll()
  for (const [name, file] of files) {
    if (buffers.has(name)) continue
    file.then((data) => {
      if (!data || !ctx || buffers.has(name)) return
      // slice() : decodeAudioData "consomme" le tampon qu'on lui donne
      ctx.decodeAudioData(data.slice(0)).then((b) => buffers.set(name, b)).catch(() => {})
    })
  }
}

/** Crée / réveille le contexte audio (doit être appelé pendant un geste de l'utilisateur) */
function unlock() {
  if (!settings.enabled) return
  if (!ctx) {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AC) return
    ctx = new AC()
    master = ctx.createGain()
    master.gain.value = settings.volume
    master.connect(ctx.destination)
    decodeAll()
  }
  if (ctx.state === 'suspended') void ctx.resume()
}

export function playSfx(name: SoundName) {
  if (!settings.enabled || !ctx || !master || ctx.state !== 'running') return
  const buffer = buffers.get(name)
  if (!buffer) return
  const src = ctx.createBufferSource()
  src.buffer = buffer
  src.connect(master)
  src.start()
}

/* ───────────────────────── Branchement sur l'interface ───────────────────────── */

function findRule(target: EventTarget | null) {
  let el = target instanceof Element ? target : null
  while (el && el !== document.body) {
    for (const rule of RULES) {
      if (el.matches(rule.sel)) {
        const disabled = el.matches(':disabled, [aria-disabled="true"]')
        return disabled ? null : { el, rule }
      }
    }
    el = el.parentElement
  }
  return null
}

let installed = false

export function installSfx() {
  if (installed) return
  installed = true

  // Les fichiers sont téléchargés un peu après le chargement pour ne pas ralentir l'arrivée sur le site
  window.setTimeout(() => settings.enabled && fetchAll(), 1500)

  window.addEventListener('pointerdown', unlock, true)
  window.addEventListener('keydown', unlock, true)

  let hovered: Element | null = null
  document.addEventListener(
    'pointerover',
    (e) => {
      if (e.pointerType === 'touch') return
      const hit = findRule(e.target)
      if (!hit) { hovered = null; return }
      if (hit.el === hovered) return
      hovered = hit.el
      if (hit.rule.hover) playSfx(hit.rule.hover)
    },
    true,
  )

  document.addEventListener(
    'click',
    (e) => {
      // Un clic sur un <label> déclenche un 2e clic sur sa case à cocher : on ne joue le son qu'une fois
      if (e.target instanceof HTMLInputElement && e.target.closest('label')) return
      const hit = findRule(e.target)
      if (hit?.rule.click) playSfx(hit.rule.click)
    },
    true,
  )
}
