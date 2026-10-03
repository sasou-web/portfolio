import type { ComponentType, SVGProps } from 'react'
import { assets, currencies, profile, site } from '../data/portfolio'
import { useI18n } from '../i18n'
import { navigate, openExternal } from '../lib/router'
import { IconCollection, IconProfile, IconScroll, IconArrowLeft } from './Icons'
import { LangSwitch, Tip } from './ui'

/** Logo du client (le "L" de League par défaut, modifiable dans site.logo) */
export function ClientLogo({ size = 'md' }: { size?: 'md' | 'lg' }) {
  return (
    <span className={`client-logo client-logo--${size}`} aria-hidden>
      <img src={site.logo} alt="" draggable={false} />
    </span>
  )
}

function PlayButton({ active }: { active: boolean }) {
  const { t, ui } = useI18n()
  const label = t(site.playLabel)
  return (
    <div className={`play ${active ? 'is-active' : ''}`}>
      <button className="play__logo" onClick={() => navigate('accueil/apercu')} aria-label={ui.nav.home}>
        <ClientLogo />
      </button>
      <button
        className="play__btn"
        onClick={() => navigate(active ? 'accueil/apercu' : 'jouer')}
        aria-label={active ? ui.nav.back : label}
      >
        <span className="play__btn-border" />
        <span className="play__btn-bg" />
        <span className="play__btn-label">
          {active && <IconArrowLeft className="play__back" />}
          {label}
        </span>
      </button>
    </div>
  )
}

function TextTab({ id, label, current }: { id: string; label: string; current: string }) {
  const active = current === id
  return (
    <button
      className={`navtab navtab--text ${active ? 'is-active' : ''}`}
      onClick={() => navigate(id)}
      aria-current={active ? 'page' : undefined}
    >
      {label}
    </button>
  )
}

function IconTab({
  id, title, text, icon: Icon, current, href,
}: {
  id: string
  title: string
  text: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  current: string
  href?: string
}) {
  const active = current === id
  return (
    <Tip title={title} text={text}>
      <button
        className={`navtab navtab--icon ${active ? 'is-active' : ''}`}
        onClick={() => (href ? openExternal(href) : navigate(id))}
        aria-label={title}
        aria-current={active ? 'page' : undefined}
      >
        <Icon />
      </button>
    </Tip>
  )
}

export function Navbar({ section }: { section: string }) {
  const { t, ui } = useI18n()
  return (
    <header className="navbar">
      <PlayButton active={section === 'jouer'} />

      <nav className="navbar__tabs" aria-label={ui.nav.mainNav}>
        <TextTab id="accueil" label={ui.nav.home} current={section} />
        <TextTab id="parcours" label={ui.nav.career} current={section} />
        <span className="navbar__sep" />
        <IconTab id="profil" title={ui.nav.profileTitle} text={ui.nav.profileText} icon={IconProfile} current={section} />
        <IconTab id="collection" title={ui.nav.collectionTitle} text={ui.nav.collectionText} icon={IconCollection} current={section} />
        {profile.cvUrl && (
          <>
            <span className="navbar__sep" />
            <IconTab id="cv" title={ui.nav.cvTitle} text={ui.nav.cvText} icon={IconScroll} current={section} href={profile.cvUrl} />
          </>
        )}
      </nav>

      <div className="navbar__wallet">
        {currencies.map((c) => (
          <Tip key={c.kind} title={t(c.label)} text={t(c.hint)} placement="bottom">
            <div className={`currency currency--${c.kind}`}>
              <img src={c.kind === 'rp' ? assets.rpIcon : assets.beIcon} alt="" />
              <span>{t(c.value)}</span>
            </div>
          </Tip>
        ))}
      </div>

      <LangSwitch className="navbar__lang" />
    </header>
  )
}
