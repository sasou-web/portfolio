import { useState } from 'react'
import { friendGroups, profile, site } from '../data/portfolio'
import type { Friend } from '../data/types'
import { useI18n } from '../i18n'
import { navigate, openExternal } from '../lib/router'
import {
  IconAddFriend, IconBell, IconChat, IconChevronDown, IconChevronRight, IconClose, IconFolder,
  IconHelp, IconMinimize, IconSearch, IconSettings, IconSort,
} from './Icons'
import { Avatar, LangSwitch, Tip } from './ui'

/** Icône d'invocateur avec anneau d'XP et niveau */
export function SummonerAvatar({ size = 'sm', progress = 0.68 }: { size?: 'sm' | 'lg'; progress?: number }) {
  const r = 46
  const c = 2 * Math.PI * r
  return (
    <div className={`summoner summoner--${size}`}>
      <svg className="summoner__ring" viewBox="0 0 100 100" aria-hidden>
        <defs>
          <linearGradient id={`xp-${size}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f0e6d2" />
            <stop offset="0.5" stopColor="#c8aa6e" />
            <stop offset="1" stopColor="#785a28" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r={r} fill="none" stroke="#1e2328" strokeWidth="4" />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke={`url(#xp-${size})`}
          strokeWidth="4"
          strokeDasharray={`${c * progress} ${c}`}
          transform="rotate(-90 50 50)"
        />
      </svg>
      <img className="summoner__img" src={profile.avatar} alt={profile.name} />
      <span className="summoner__level">{profile.level}</span>
    </div>
  )
}

function FriendRow({ f }: { f: Friend }) {
  const { t, ui } = useI18n()
  const status = ui.status[f.status]
  return (
    <Tip title={f.name} text={`${status}${f.href ? ui.social.clickToOpen : ''}`} placement="left" className="friend-tip">
      <div
        className={`friend friend--${f.status} ${f.href ? 'is-link' : ''}`}
        onClick={() => f.href && openExternal(f.href)}
        role={f.href ? 'link' : undefined}
        tabIndex={f.href ? 0 : undefined}
        onKeyDown={(e) => f.href && e.key === 'Enter' && openExternal(f.href)}
      >
        <span className="friend__avatar">
          <Avatar src={f.avatar} alt="" />
        </span>
        <span className="friend__info">
          <span className="friend__name">{f.name}</span>
          <span className="friend__status">{t(f.activity) || status}</span>
        </span>
      </div>
    </Tip>
  )
}

export function SocialPanel({
  onHelp, onSettings, onMinimize, onClose,
}: {
  onHelp: () => void
  onSettings: () => void
  onMinimize: () => void
  onClose: () => void
}) {
  const { t, ui } = useI18n()
  const [collapsed, setCollapsed] = useState<Record<number, boolean>>(
    Object.fromEntries(friendGroups.map((g, i) => [i, !!g.collapsed])),
  )
  const [query, setQuery] = useState('')
  const [searching, setSearching] = useState(false)

  const q = query.trim().toLowerCase()

  return (
    <aside className="social" aria-label={ui.social.panel}>
      <div className="social__controls">
        <LangSwitch className="social__lang" />
        <Tip title={ui.social.help} text={ui.social.helpText}><button onClick={onHelp} aria-label={ui.social.help}><IconHelp /></button></Tip>
        <Tip title={ui.social.minimize} text={ui.social.minimizeText}><button onClick={onMinimize} aria-label={ui.social.minimize}><IconMinimize /></button></Tip>
        <Tip title={ui.social.settings}><button onClick={onSettings} aria-label={ui.social.settings}><IconSettings /></button></Tip>
        <Tip title={ui.social.quit}><button onClick={onClose} aria-label={ui.social.quit}><IconClose /></button></Tip>
      </div>

      <div className="social__identity">
        <button className="social__avatar-btn" onClick={() => navigate('profil/apercu')} aria-label={ui.social.viewProfile}>
          <SummonerAvatar />
        </button>
        <div className="social__details">
          <div className="social__name">{profile.name}</div>
          <div className={`social__status social__status--${profile.status}`}>
            <i className={`status-dot status-dot--${profile.status}`} />
            <span>{t(profile.statusMessage)}</span>
          </div>
        </div>
      </div>

      <div className="social__actions">
        {searching ? (
          <div className="search social__search">
            <IconSearch />
            <input
              autoFocus
              className="lol-input"
              placeholder={ui.social.searchPlaceholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onBlur={() => !query && setSearching(false)}
              onKeyDown={(e) => e.key === 'Escape' && (setQuery(''), setSearching(false))}
            />
          </div>
        ) : (
          <>
            <span className="social__header">{ui.social.header}</span>
            <Tip title={ui.social.contactMe}><button className="social__action" onClick={() => navigate('jouer')} aria-label={ui.social.contactMe}><IconAddFriend /></button></Tip>
            <Tip title={ui.social.projects}><button className="social__action" onClick={() => navigate('collection/projets')} aria-label={ui.social.projects}><IconFolder /></button></Tip>
            <Tip title={ui.social.career}><button className="social__action" onClick={() => navigate('parcours/experiences')} aria-label={ui.social.career}><IconSort /></button></Tip>
            <Tip title={ui.social.search}><button className="social__action" onClick={() => setSearching(true)} aria-label={ui.social.search}><IconSearch /></button></Tip>
          </>
        )}
      </div>

      <div className="social__roster scroll">
        {friendGroups.map((g, gi) => {
          const members = q ? g.members.filter((m) => (m.name + t(m.activity)).toLowerCase().includes(q)) : g.members
          if (q && members.length === 0) return null
          const online = g.members.filter((m) => m.status !== 'offline').length
          const isOpen = q ? true : !collapsed[gi]
          return (
            <section key={gi} className="group">
              <button
                className="group__header"
                onClick={() => setCollapsed((c) => ({ ...c, [gi]: !c[gi] }))}
                aria-expanded={isOpen}
              >
                {isOpen ? <IconChevronDown /> : <IconChevronRight />}
                <span>
                  {t(g.name)} ({online}/{g.members.length})
                </span>
              </button>
              {isOpen && (
                <div className="group__members">
                  {members.map((m) => (
                    <FriendRow key={m.name} f={m} />
                  ))}
                </div>
              )}
            </section>
          )
        })}
      </div>

      <div className="social__footer">
        <Tip title={ui.social.chat} text={ui.social.chatText} placement="top">
          <button onClick={() => navigate('jouer')} aria-label={ui.social.chat}><IconChat /></button>
        </Tip>
        <Tip title={ui.social.patchNotes} text={ui.social.patchNotesText} placement="top">
          <button onClick={() => navigate('accueil/notes')} aria-label={ui.social.patchNotes}><IconBell /></button>
        </Tip>
        <span className="social__version">{site.version}</span>
      </div>
    </aside>
  )
}
