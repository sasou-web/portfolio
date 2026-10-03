import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { contactIcons } from '../components/Icons'
import { CloseButton, MagicButton, showToast } from '../components/ui'
import { contactModes } from '../data/portfolio'
import type { ContactMode } from '../data/types'
import { useI18n, type Lang, tr } from '../i18n'
import { navigate, openExternal } from '../lib/router'
import { playSfx } from '../lib/sfx'

const READY_SECONDS = 12

function buildHref(mode: ContactMode, option: number | undefined, lang: Lang) {
  const subject = option !== undefined ? mode.options?.[option]?.subject : undefined
  if (subject && mode.href.startsWith('mailto:')) {
    const sep = mode.href.includes('?') ? '&' : '?'
    return `${mode.href}${sep}subject=${encodeURIComponent(tr(subject, lang))}`
  }
  return mode.href
}

/** La fameuse popup "PARTIE TROUVÉE" */
function ReadyCheck({
  mode, optionLabel, onAccept, onDecline,
}: {
  mode: ContactMode
  optionLabel?: string
  onAccept: () => void
  onDecline: () => void
}) {
  const { t, ui } = useI18n()
  const [left, setLeft] = useState(READY_SECONDS)
  const [accepted, setAccepted] = useState(false)
  const Icon = contactIcons[mode.icon] ?? contactIcons.mail

  useEffect(() => {
    playSfx('readyIntro')
  }, [])

  useEffect(() => {
    if (accepted) return
    if (left <= 0) {
      playSfx('readyDeclined')
      onDecline()
      return
    }
    const timer = setTimeout(() => setLeft((l) => l - 1), 1000)
    return () => clearTimeout(timer)
  }, [left, accepted, onDecline])

  const r = 54
  const c = 2 * Math.PI * r
  const progress = left / READY_SECONDS

  return createPortal(
    <div className="ready-backdrop">
      <div className={`ready ${accepted ? 'is-accepted' : ''}`} role="alertdialog" aria-label={ui.play.found}>
        <div className="ready__ring">
          <svg viewBox="0 0 120 120" aria-hidden>
            <defs>
              <linearGradient id="ready-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#f0e6d2" />
                <stop offset="1" stopColor="#c89b3c" />
              </linearGradient>
            </defs>
            <circle cx="60" cy="60" r={r} fill="none" stroke="#1e2328" strokeWidth="4" />
            <circle
              cx="60"
              cy="60"
              r={r}
              fill="none"
              stroke={accepted ? '#0ac8b9' : 'url(#ready-grad)'}
              strokeWidth="4"
              strokeDasharray={`${c * (accepted ? 1 : progress)} ${c}`}
              transform="rotate(-90 60 60)"
              style={{ transition: 'stroke-dasharray 1s linear' }}
            />
          </svg>
          <span className="ready__icon">
            <Icon />
          </span>
        </div>
        <div className="ready__title">{accepted ? ui.play.accepted : ui.play.found}</div>
        <div className="ready__mode">
          {t(mode.name)}
          {optionLabel ? ` · ${optionLabel}` : ''}
        </div>
        <div className="ready__actions">
          <MagicButton
            variant="accept"
            className="ready__accept"
            disabled={accepted}
            onClick={() => {
              setAccepted(true)
              setTimeout(() => playSfx('readyAccepted'), 150)
              setTimeout(onAccept, 900)
            }}
          >
            {ui.play.accept}
          </MagicButton>
          {!accepted && (
            <button className="text-btn ready__decline" onClick={onDecline}>
              {ui.play.decline}
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}

export function PlayPage() {
  const { lang, t, ui } = useI18n()
  const [selected, setSelected] = useState(0)
  const [option, setOption] = useState(0)
  const [ready, setReady] = useState(false)
  const mode = contactModes[selected]

  const accept = () => {
    setReady(false)
    const href = buildHref(mode, mode.options?.length ? option : undefined, lang)
    if (href.startsWith('mailto:')) {
      // Sans logiciel de messagerie, mailto: ne fait rien : on copie aussi l'adresse
      const email = href.slice(7).split('?')[0]
      navigator.clipboard?.writeText(email).then(() => showToast(ui.play.copied(email)), () => {})
    }
    openExternal(href)
  }

  return (
    <div className="page play-screen page-enter">
      <div className="play-screen__bg">
        {contactModes.map((m, i) => (
          <img key={m.id} className={i === selected ? 'is-active' : ''} src={m.image} alt="" />
        ))}
      </div>
      <div className="play-screen__shade" />

      <div className="play-screen__top">
        <div className="play-screen__tabs">
          <span className="is-active">{ui.play.tab}</span>
        </div>
        <CloseButton onClick={() => navigate('accueil/apercu')} label={ui.common.close} />
      </div>

      <div className="play-screen__body">
        <div className="modes" role="radiogroup" aria-label={ui.play.modes}>
          {contactModes.map((m, i) => {
            const Icon = contactIcons[m.icon] ?? contactIcons.mail
            return (
              <button
                key={m.id}
                role="radio"
                aria-checked={i === selected}
                className={`mode ${i === selected ? 'is-selected' : ''}`}
                onClick={() => { setSelected(i); setOption(0) }}
              >
                <span className="mode__map">
                  <span className="mode__map-art" style={{ backgroundImage: `url(${m.image})` }} />
                  <span className="mode__map-icon">
                    <Icon />
                  </span>
                </span>
                <span className="mode__name">{t(m.name)}</span>
                <span className="mode__sub">{t(m.subtitle)}</span>
              </button>
            )
          })}
        </div>

        <div className="queues">
          <div className="queues__title label">{t(mode.name)}</div>
          {mode.options?.length ? (
            mode.options.map((o, i) => (
              <button
                key={i}
                className={`radio ${i === option ? 'is-checked' : ''}`}
                onClick={() => setOption(i)}
                role="radio"
                aria-checked={i === option}
              >
                <span className="radio__dot" />
                {t(o.label)}
              </button>
            ))
          ) : (
            <button className="radio is-checked" role="radio" aria-checked>
              <span className="radio__dot" />
              {t(mode.subtitle)}
            </button>
          )}
        </div>
      </div>

      <div className="play-screen__footer">
        <MagicButton variant="find" onClick={() => setReady(true)}>
          {ui.play.confirm}
        </MagicButton>
      </div>

      {ready && (
        <ReadyCheck
          mode={mode}
          optionLabel={mode.options?.[option] ? t(mode.options[option].label) : undefined}
          onDecline={() => setReady(false)}
          onAccept={accept}
        />
      )}
    </div>
  )
}
