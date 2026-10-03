import { useEffect, useMemo, useState } from 'react'
import { IconArrowLeft, IconExternal, IconLock, IconSearch, roleIcons } from '../components/Icons'
import { Dropdown, HexButton, SubNav, Tip } from '../components/ui'
import { projectRoles, projects } from '../data/portfolio'
import type { Project } from '../data/types'
import { useI18n } from '../i18n'
import { cd } from '../lib/assets'
import { follow, navigate } from '../lib/router'

type Show = 'all' | 'owned' | 'locked'
type Sort = 'alpha' | 'mastery' | 'year'

const roleById = Object.fromEntries(projectRoles.map((r) => [r.id, r]))

/* ─────────────────────────────── Grille ─────────────────────────────── */

function Grid() {
  const { lang, t, ui } = useI18n()
  const [role, setRole] = useState<string>('all')
  const [query, setQuery] = useState('')
  const [show, setShow] = useState<Show>('all')
  const [sort, setSort] = useState<Sort>('alpha')

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    return projects
      .filter((p) => role === 'all' || p.roles.includes(role))
      .filter((p) => show === 'all' || (show === 'owned' ? p.owned : !p.owned))
      .filter((p) => !q || (t(p.name) + ' ' + t(p.title)).toLowerCase().includes(q))
      .sort((a, b) => {
        if (a.owned !== b.owned) return a.owned ? -1 : 1
        if (sort === 'mastery') return b.mastery - a.mastery
        if (sort === 'year') return b.year.localeCompare(a.year)
        return t(a.name).localeCompare(t(b.name))
      })
  }, [role, query, show, sort, lang])

  return (
    <div className="collection">
      <div className="collection__toolbar">
        <div className="role-filter" role="group" aria-label={ui.collection.filter}>
          {[{ id: 'all', label: ui.common.all, icon: 'all' }, ...projectRoles].map((r) => {
            const Icon = roleIcons[r.icon]
            const label = t(r.label)
            return (
              <Tip key={r.id} title={label}>
                <button
                  className={`role-filter__btn ${role === r.id ? 'is-active' : ''}`}
                  onClick={() => setRole(r.id)}
                  aria-pressed={role === r.id}
                  aria-label={label}
                >
                  <Icon />
                </button>
              </Tip>
            )
          })}
        </div>

        <div className="search collection__search">
          <IconSearch />
          <input className="lol-input" placeholder={ui.collection.search} value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>

        <div className="collection__dropdowns">
          <Dropdown<Show>
            value={show}
            onChange={setShow}
            prefix={ui.collection.show}
            options={[
              { value: 'all', label: ui.common.all },
              { value: 'owned', label: ui.collection.showOwned },
              { value: 'locked', label: ui.collection.showLocked },
            ]}
          />
          <Dropdown<Sort>
            value={sort}
            onChange={setSort}
            prefix={ui.common.sort}
            options={[
              { value: 'alpha', label: ui.common.alphabetical },
              { value: 'mastery', label: ui.collection.sortMastery },
              { value: 'year', label: ui.collection.sortRecent },
            ]}
          />
        </div>
      </div>

      <div className="divider" />

      <div className="collection__grid scroll">
        {list.length === 0 && <p className="collection__empty body-text">{ui.collection.empty}</p>}
        <div className="champ-grid">
          {list.map((p) => (
            <button
              key={p.id}
              className={`champ ${p.owned ? '' : 'is-locked'}`}
              onClick={() => navigate(`collection/projets/${p.id}`)}
            >
              <span className="champ__portrait">
                <span className="champ__img">
                  <img src={p.thumbnail} alt="" loading="lazy" />
                </span>
                {p.owned && p.mastery > 0 && (
                  <img className="champ__crest" src={cd.masteryCrest(p.mastery)} alt="" />
                )}
                {!p.owned && (
                  <span className="champ__lock">
                    <IconLock />
                  </span>
                )}
              </span>
              <span className="champ__name">{t(p.name)}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────── Fiche d'un projet ─────────────────────────── */

function Detail({ project }: { project: Project }) {
  const { t, ui } = useI18n()
  const [skin, setSkin] = useState(0)
  const [ability, setAbility] = useState(0)
  const skins = project.skins.length ? project.skins : [{ name: ui.collection.classic, image: project.splash }]
  const current = project.abilities[ability]

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && navigate('collection/projets')
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="champion page-enter">
      <div className="champion__bg">
        {skins.map((s, i) => (
          <img
            key={s.image}
            className={i === skin ? 'is-active' : ''}
            src={s.image}
            alt=""
            style={{ objectPosition: project.splashPosition }}
          />
        ))}
      </div>
      <div className="champion__shade" />

      <button className="champion__back text-btn" onClick={() => navigate('collection/projets')}>
        <IconArrowLeft /> {ui.collection.back}
      </button>

      <div className="champion__info">
        <div className="champion__roles">
          {project.roles.map((r) => {
            const role = roleById[r]
            const Icon = roleIcons[role?.icon ?? 'all']
            return (
              <span key={r} className="champion__role">
                <Icon /> {role ? t(role.label) : r}
              </span>
            )
          })}
        </div>

        <div className="champion__heading">
          <img className="champion__logo" src={project.thumbnail} alt="" />
          <h1 className="champion__name">{t(project.name)}</h1>
        </div>
        <div className="champion__title">{t(project.title)}</div>

        <div className="champion__meta">
          <div>
            <span className="label">{ui.collection.difficulty}</span>
            <span className="champion__meta-row">
              <span className="difficulty">
                {[1, 2, 3].map((n) => <i key={n} className={n <= project.difficulty ? 'on' : ''} />)}
              </span>
              <span className="champion__meta-value">{ui.collection.difficultyLabels[project.difficulty]}</span>
            </span>
          </div>
          <div>
            <span className="label">{ui.common.year}</span>
            <span className="champion__meta-value">{project.year}</span>
          </div>
          {project.owned && project.mastery > 0 && (
            <div className="champion__meta-mastery">
              <img src={cd.masteryCrest(project.mastery)} alt="" />
              <span>
                <span className="label">{ui.common.mastery}</span>
                <span className="champion__meta-value">{ui.common.level(project.mastery)}</span>
              </span>
            </div>
          )}
        </div>

        {project.abilities.length > 0 && (
          <>
            <div className="label champion__section-label">{ui.collection.abilities}</div>
            <div className="abilities">
              {project.abilities.map((a, i) => (
                <button
                  key={a.key}
                  className={`ability ${i === ability ? 'is-active' : ''}`}
                  onClick={() => setAbility(i)}
                  onMouseEnter={() => setAbility(i)}
                  aria-label={`${a.key} — ${t(a.name)}`}
                >
                  <span className="ability__icon tech-icon">
                    <img src={a.icon} alt="" />
                  </span>
                  <span className="ability__key">{a.key}</span>
                </button>
              ))}
            </div>
            {current && (
              <div className="ability-desc" key={ability}>
                <div className="ability-desc__head">
                  <span className="ability-desc__name">{t(current.name)}</span>
                  <span className="ability-desc__key">{current.key === 'P' ? ui.collection.passive : current.key}</span>
                </div>
                <p>{t(current.description)}</p>
              </div>
            )}
          </>
        )}

        <div className="champion__lore scroll">
          {project.description.map((d, i) => <p key={i}>{t(d)}</p>)}
        </div>

        {project.links.length > 0 && (
          <div className="champion__links">
            {project.links.map((l, i) => (
              <HexButton key={i} onClick={() => follow(l)}>
                {t(l.label)} {l.href && <IconExternal />}
              </HexButton>
            ))}
          </div>
        )}
        {!project.owned && <div className="champion__locked label"><IconLock /> {ui.collection.comingSoon}</div>}
      </div>

      {skins.length > 1 && (
        <div className="skins">
          <div className="skins__name">{t(skins[skin].name)}</div>
          <div className="skins__strip">
            {skins.map((s, i) => (
              <button
                key={s.image}
                className={`skins__thumb ${i === skin ? 'is-active' : ''}`}
                onClick={() => setSkin(i)}
                aria-label={t(s.name)}
              >
                <img src={s.image} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function CollectionPage({ itemId }: { sub?: string; itemId?: string }) {
  const { ui } = useI18n()
  const project = itemId ? projects.find((p) => p.id === itemId) : undefined
  const owned = projects.filter((p) => p.owned).length
  const [count, rest] = ui.collection.published(owned, projects.length)

  if (project) {
    return (
      <div className="page">
        <Detail key={project.id} project={project} />
      </div>
    )
  }

  return (
    <div className="page page-enter">
      <SubNav
        items={[{ id: 'projets', label: ui.collection.projects }]}
        active="projets"
        onSelect={() => navigate('collection/projets')}
        right={
          <span className="label">
            <span className="gold">{count}</span>{rest}
          </span>
        }
      />
      <div className="page__content collection-wrap">
        <Grid />
      </div>
    </div>
  )
}
