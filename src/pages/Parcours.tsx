import { useEffect, useState } from 'react'
import { IconChevronDown } from '../components/Icons'
import { HexButton, SubNav, Tip } from '../components/ui'
import { education, experiences } from '../data/portfolio'
import type { MatchEntry } from '../data/types'
import { useI18n } from '../i18n'
import { follow, navigate } from '../lib/router'

const ITEM_SLOTS = 6
const pageLoadedAt = Date.now()

/** Chrono "en file d'attente" comme dans le client (depuis l'arrivée sur le site) */
function QueueTimer() {
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])
  const s = Math.floor((now - pageLoadedAt) / 1000)
  return <>{`${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`}</>
}

function MatchRow({ e, defaultOpen }: { e: MatchEntry; defaultOpen: boolean }) {
  const { t, ui } = useI18n()
  const [open, setOpen] = useState(defaultOpen)
  const slots = Array.from({ length: ITEM_SLOTS }, (_, i) => e.items[i])
  const isQueue = e.result === 'queue'

  return (
    <article className={`match match--${e.result} ${open ? 'is-open' : ''}`}>
      <button className="match__row" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span className="match__champ">
          <img src={e.logo} alt="" />
        </span>

        <span className="match__result">
          <span className="match__outcome">{t(e.resultLabel)}</span>
          <span className="match__mode">{t(e.mode)}</span>
        </span>

        <span className="match__role">
          <span className="match__role-title">{t(e.role)}</span>
          <span className="match__org">{t(e.org)} · {t(e.location)}</span>
        </span>

        <span className="match__kda">
          {isQueue ? (
            <>
              <b className="match__timer"><QueueTimer /></b>
              <small>{ui.career.queueTimer}</small>
            </>
          ) : (
            <>
              <b>{e.kda ?? t(e.duration ?? e.period)}</b>
              {e.kdaLabel && <small>{t(e.kdaLabel)}</small>}
            </>
          )}
        </span>

        <span className="match__items">
          {slots.map((it, i) =>
            it ? (
              <Tip key={i} title={it.name}>
                <span className="match__item tech-icon">
                  <img src={it.icon} alt={it.name} />
                </span>
              </Tip>
            ) : (
              <span key={i} className="match__item match__item--empty" />
            ),
          )}
        </span>

        <span className="match__date">
          <span>{t(e.period)}</span>
          {e.duration && <span className="match__duration">{t(e.duration)}</span>}
        </span>

        <IconChevronDown className="match__chevron" />
      </button>

      {open && (
        <div className="match__details">
          <div>
            <ul className="match__desc">
              {e.description.map((d, i) => <li key={i}>{t(d)}</li>)}
            </ul>
            {e.cta && (
              <div className="match__cta">
                <HexButton size="sm" onClick={() => follow(e.cta!)}>{t(e.cta.label)}</HexButton>
              </div>
            )}
          </div>
          <div className="match__stats">
            {e.stats.map((s, i) => (
              <div key={i} className="match__stat">
                <span className="label">{t(s.label)}</span>
                <span className="match__stat-value">{t(s.value)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}

function Donut({ entries }: { entries: MatchEntry[] }) {
  const { ui } = useI18n()
  const total = entries.length || 1
  const counts = {
    victory: entries.filter((e) => e.result === 'victory').length,
    ongoing: entries.filter((e) => e.result === 'ongoing').length,
    defeat: entries.filter((e) => e.result === 'defeat').length,
  }
  const r = 40
  const c = 2 * Math.PI * r
  let offset = 0
  const arcs = (['victory', 'ongoing', 'defeat'] as const).map((k) => {
    const len = (counts[k] / total) * c
    const arc = { k, len, offset }
    offset += len
    return arc
  })
  const ratio = Math.round(((counts.victory + counts.ongoing) / total) * 100)
  return (
    <div className="donut">
      <div className="donut__ring">
        <svg viewBox="0 0 100 100" aria-hidden>
          <circle cx="50" cy="50" r={r} fill="none" stroke="#1e2328" strokeWidth="8" />
          {arcs.map((a) =>
            a.len > 0 ? (
              <circle
                key={a.k}
                className={`donut__arc donut__arc--${a.k}`}
                cx="50"
                cy="50"
                r={r}
                fill="none"
                strokeWidth="8"
                strokeDasharray={`${a.len} ${c - a.len}`}
                strokeDashoffset={-a.offset}
                transform="rotate(-90 50 50)"
              />
            ) : null,
          )}
        </svg>
        <div className="donut__center">
          <b>{ratio}%</b>
          <span>{ui.career.success}</span>
        </div>
      </div>
      <div className="donut__legend">
        <span className="donut__key donut__key--victory">{counts.victory} {ui.career.win}</span>
        <span className="donut__key donut__key--ongoing">{counts.ongoing} {ui.career.ongoing}</span>
        <span className="donut__key donut__key--defeat">{counts.defeat} {ui.career.loss}</span>
      </div>
    </div>
  )
}

export function ParcoursPage({ sub }: { sub?: string }) {
  const { t, ui } = useI18n()
  const active = sub === 'formation' ? 'formation' : 'experiences'
  const entries = active === 'formation' ? education : experiences
  const played = entries.filter((e) => e.result !== 'queue')

  return (
    <div className="page page-enter">
      <SubNav
        items={[
          { id: 'experiences', label: ui.career.experience },
          { id: 'formation', label: ui.career.education },
        ]}
        active={active}
        onSelect={(id) => navigate(`parcours/${id}`)}
        right={<span className="label">{ui.career.games(played.length)}</span>}
      />
      <div className="page__content history">
        <div className="history__list scroll" key={active}>
          <div className="history__heading">
            <span className="label">{active === 'formation' ? ui.career.educationHistory : ui.career.history}</span>
            <span className="label history__heading-right">{ui.career.clickForDetails}</span>
          </div>
          {entries.map((e, i) => (
            <MatchRow key={i} e={e} defaultOpen={i === 0} />
          ))}
        </div>

        <aside className="history__summary frame">
          <div className="panel-title">
            <span className="heading-3">{ui.career.summary}</span>
            <span className="label">{ui.career.lastN(played.length)}</span>
          </div>
          <Donut entries={played} />
          <div className="divider" style={{ margin: '1rem 0' }} />
          <div className="label" style={{ marginBottom: '0.625rem' }}>{ui.career.teams}</div>
          <ul className="history__orgs">
            {played.map((e, i) => (
              <li key={i}>
                <img src={e.logo} alt="" />
                <span>
                  <b>{t(e.org)}</b>
                  <small>{t(e.duration ?? e.period)}</small>
                </span>
                <em className={`history__tag history__tag--${e.result}`}>{t(e.resultLabel)}</em>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  )
}
