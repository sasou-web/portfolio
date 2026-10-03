import { useEffect, useState, type CSSProperties } from 'react'
import { ClientLogo, Navbar } from './components/Navbar'
import { SocialPanel } from './components/SocialPanel'
import { IconChevronRight, IconProfile } from './components/Icons'
import { Dialog, HexButton, ToastHost } from './components/ui'
import { KonamiEgg } from './components/KonamiEgg'
import { profile, site } from './data/portfolio'
import { setLang, useI18n, type Lang } from './i18n'
import { navigate, useRoute } from './lib/router'
import { playSfx, setSfxSettings, useSfxSettings } from './lib/sfx'
import { HomePage } from './pages/Home'
import { ParcoursPage } from './pages/Parcours'
import { ProfilePage } from './pages/Profile'
import { CollectionPage } from './pages/Collection'
import { PlayPage } from './pages/Play'

type DialogKind = 'help' | 'settings' | 'quit' | null

const DEFAULT_ROUTE = 'accueil/apercu'

const LANGS: { id: Lang; label: string }[] = [
  { id: 'fr', label: 'Français' },
  { id: 'en', label: 'English' },
]

function Boot({ onDone }: { onDone: () => void }) {
  const { ui } = useI18n()
  const [done, setDone] = useState(false)
  useEffect(() => {
    const t1 = setTimeout(() => setDone(true), 1500)
    const t2 = setTimeout(onDone, 2100)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onDone])
  return (
    <div className={`boot ${done ? 'is-done' : ''}`} aria-hidden={done}>
      <div className="boot__logo">
        <span className="boot__spinner" />
        <span className="boot__spinner boot__spinner--inner" />
        <ClientLogo size="lg" />
      </div>
      <div className="boot__bar"><i /></div>
      <div className="boot__text">{ui.boot}</div>
    </div>
  )
}

export default function App() {
  const { lang, t, ui } = useI18n()
  const route = useRoute()
  const section = route[0] ?? ''
  const [dialog, setDialog] = useState<DialogKind>(null)
  const [socialHidden, setSocialHidden] = useState(false)
  const [mobileSocial, setMobileSocial] = useState(false)
  const [quit, setQuit] = useState(false)
  const [booting, setBooting] = useState(() => site.intro && !sessionStorage.getItem('booted'))
  const sfx = useSfxSettings()

  // useRoute renvoie un nouveau tableau à chaque rendu : on dépend du chemin texte
  const path = route.join('/')
  useEffect(() => {
    if (!path) navigate(DEFAULT_ROUTE)
    setMobileSocial(false)
  }, [path])

  useEffect(() => {
    document.title = t(site.title)
  }, [lang])

  const finishBoot = () => {
    sessionStorage.setItem('booted', '1')
    setBooting(false)
  }

  let page = null
  switch (section) {
    case 'accueil':
      page = <HomePage sub={route[1]} />
      break
    case 'parcours':
      page = <ParcoursPage sub={route[1]} />
      break
    case 'profil':
      page = <ProfilePage sub={route[1]} />
      break
    case 'collection':
      page = <CollectionPage sub={route[1]} itemId={route[2]} />
      break
    case 'jouer':
      page = <PlayPage />
      break
    default:
      page = null
  }

  if (quit) {
    return (
      <div className="goodbye">
        <ClientLogo size="lg" />
        <p className="heading-1">{ui.goodbye.title}</p>
        <p className="body-text">{ui.goodbye.text(profile.fullName)}</p>
        <HexButton onClick={() => { setQuit(false); navigate(DEFAULT_ROUTE) }}>{ui.goodbye.restart}</HexButton>
      </div>
    )
  }

  const volume = Math.round(sfx.volume * 100)

  return (
    <>
      {booting && <Boot onDone={finishBoot} />}
      <KonamiEgg />
      <ToastHost />

      <div className={`client ${socialHidden ? 'is-social-hidden' : ''} ${mobileSocial ? 'is-social-open' : ''}`}>
        <Navbar section={section} />

        <main className="client__main" key={section}>
          {page}
        </main>

        <SocialPanel
          onHelp={() => setDialog('help')}
          onSettings={() => setDialog('settings')}
          onMinimize={() => (window.innerWidth <= 900 ? setMobileSocial(false) : setSocialHidden(true))}
          onClose={() => setDialog('quit')}
        />

        {socialHidden && (
          <button className="social-reopen" onClick={() => setSocialHidden(false)} aria-label={ui.social.show}>
            <IconChevronRight />
          </button>
        )}

        {mobileSocial ? (
          <div className="mobile-scrim" onClick={() => setMobileSocial(false)} />
        ) : (
          <button className="mobile-social-toggle" onClick={() => setMobileSocial(true)} aria-label={ui.social.panel}>
            <IconProfile />
          </button>
        )}
      </div>

      {/* ── Aide ── */}
      <Dialog open={dialog === 'help'} onClose={() => setDialog(null)} label={ui.social.help} wide>
        <h2 className="heading-2 dialog__title">{ui.help.title}</h2>
        <div className="divider-diamond" style={{ margin: '0 0 1.25rem' }} />
        <ul className="help-list">
          {ui.help.items.map(([title, text], i) => (
            <li key={title}>
              <b>{i === 0 ? t(site.playLabel) : title}</b> — {text}
            </li>
          ))}
        </ul>
        <p className="legal">{ui.legal}</p>
      </Dialog>

      {/* ── Paramètres ── */}
      <Dialog
        open={dialog === 'settings'}
        onClose={() => setDialog(null)}
        label={ui.social.settings}
        actions={<HexButton onClick={() => setDialog(null)}>{ui.settings.done}</HexButton>}
      >
        <h2 className="heading-2 dialog__title">{ui.settings.title}</h2>
        <div className="divider-diamond" style={{ margin: '0 0 1.25rem' }} />

        <div className="settings__section label" style={{ marginTop: 0 }}>{ui.settings.language}</div>
        <div className="settings__langs" role="radiogroup" aria-label={ui.settings.language}>
          {LANGS.map((l) => (
            <button
              key={l.id}
              className={`radio ${lang === l.id ? 'is-checked' : ''}`}
              role="radio"
              aria-checked={lang === l.id}
              onClick={() => setLang(l.id)}
            >
              <span className="radio__dot" />
              {l.label}
            </button>
          ))}
        </div>

        <div className="settings__section label">{ui.settings.sound}</div>
        <label className="checkbox">
          <input type="checkbox" checked={sfx.enabled} onChange={(e) => setSfxSettings({ enabled: e.target.checked })} />
          <span className="checkbox__box" />
          {ui.settings.enableSfx}
        </label>
        <div className={`slider ${sfx.enabled ? '' : 'is-disabled'}`}>
          <span className="slider__label">{ui.settings.volume}</span>
          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            disabled={!sfx.enabled}
            style={{ '--fill': `${volume}%` } as CSSProperties}
            onChange={(e) => setSfxSettings({ volume: Number(e.target.value) / 100 })}
            onPointerUp={() => playSfx('buttonClick')}
            onKeyUp={() => playSfx('buttonClick')}
            aria-label={ui.settings.volume}
          />
          <span className="slider__value">{volume}</span>
        </div>

        <div className="settings__section label">{ui.settings.interface}</div>
        <label className="checkbox">
          <input type="checkbox" checked={!socialHidden} onChange={(e) => setSocialHidden(!e.target.checked)} />
          <span className="checkbox__box" />
          {ui.settings.showSocial}
        </label>
        <div style={{ margin: '1rem 0 0.25rem' }}>
          <HexButton size="sm" onClick={() => { setDialog(null); sessionStorage.removeItem('booted'); setBooting(true) }}>
            {ui.settings.replayIntro}
          </HexButton>
        </div>
        <p className="legal">{ui.legal}</p>
      </Dialog>

      {/* ── Quitter ── */}
      <Dialog
        open={dialog === 'quit'}
        onClose={() => setDialog(null)}
        label={ui.social.quit}
        actions={
          <>
            <HexButton onClick={() => { setDialog(null); setQuit(true) }}>{ui.quitDialog.quit}</HexButton>
            <HexButton onClick={() => setDialog(null)}>{ui.quitDialog.cancel}</HexButton>
          </>
        }
      >
        <h2 className="heading-2 dialog__title">{ui.quitDialog.title}</h2>
        <p className="dialog__text">{ui.quitDialog.text}</p>
      </Dialog>
    </>
  )
}
