import { useMemo, useState } from 'react'
import { SummonerAvatar } from '../components/SocialPanel'
import { Dropdown, HexButton, SubNav, Tip } from '../components/ui'
import { achievements, profile, profileStats, skills } from '../data/portfolio'
import { useI18n } from '../i18n'
import { cd, type RankTier } from '../lib/assets'
import { navigate, openExternal } from '../lib/router'

const tierOrder: RankTier[] = [
  'iron', 'bronze', 'silver', 'gold', 'platinum', 'emerald', 'diamond', 'master', 'grandmaster', 'challenger',
]

const byTier = <T extends { tier: RankTier }>(list: T[]) =>
  [...list].sort((a, b) => tierOrder.indexOf(b.tier) - tierOrder.indexOf(a.tier))

/* ─────────────────────────────── Aperçu ─────────────────────────────── */

function Overview() {
  const { t, ui } = useI18n()
  const topSkills = [...skills].sort((a, b) => b.points - a.points).slice(0, 3)
  const topAchievements = byTier(achievements).slice(0, 3)

  return (
    <div className="profile">
      <section className="profile__identity">
        <div className="banner">
          <span className="banner__rod" />
          <div className="banner__flag">
            <SummonerAvatar size="lg" progress={0.72} />
            <Tip title={t(profile.rank.label)} text={t(profile.rank.detail)}>
              <img className="banner__crest" src={cd.rankMini(profile.rank.tier)} alt="" />
            </Tip>
          </div>
        </div>

        <div className="profile__who">
          <h1 className="profile__name">
            {profile.name} <span>#{profile.tag}</span>
          </h1>
          <div className="profile__title">{t(profile.title)}</div>
          <div className={`profile__status social__status--${profile.status}`}>
            <i className={`status-dot status-dot--${profile.status}`} />
            {t(profile.statusMessage)}
          </div>
          <div className="profile__location label">{t(profile.location)}</div>
          <div className="profile__actions">
            <HexButton size="sm" onClick={() => navigate('jouer')}>{ui.common.contactMe}</HexButton>
            {profile.cvUrl && <HexButton size="sm" onClick={() => openExternal(profile.cvUrl!)}>{ui.profile.cv}</HexButton>}
          </div>
          {profile.languages.length > 0 && (
            <div className="profile__langs" aria-label={ui.profile.languages}>
              {profile.languages.map((l, i) => (
                <span key={i} className="langs__item">
                  {t(l.name)} <b>{t(l.level)}</b>
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="profile__panels">
        <div className={`profile__top ${profile.lookingFor?.length ? '' : 'is-single'}`}>
          <div className="frame frame--glass profile__about">
            <div className="panel-title">
              <span className="heading-3">{ui.profile.about}</span>
              <Tip title={ui.common.level(profile.level)} text={t(profile.levelHint)}>
                <span className="label">{ui.common.level(profile.level)}</span>
              </Tip>
            </div>
            <div className="profile__bio scroll">
              {profile.bio.map((p, i) => (
                <p key={i} className="body-text">{t(p)}</p>
              ))}
            </div>
          </div>

          {profile.lookingFor && profile.lookingFor.length > 0 && (
            <div className="frame frame--glass seeking">
              <div className="panel-title">
                <span className="heading-3">{ui.profile.lookingFor}</span>
                <span className="seeking__pulse" aria-hidden />
              </div>
              <dl className="seeking__list">
                {profile.lookingFor.map((row, i) => (
                  <div key={i} className="seeking__row">
                    <dt>{t(row.label)}</dt>
                    <dd>{t(row.value)}</dd>
                  </div>
                ))}
              </dl>
              <div className="seeking__actions">
                <HexButton size="sm" block onClick={() => navigate('jouer')}>{ui.common.contactMe}</HexButton>
                {profile.cvUrl && (
                  <HexButton size="sm" block onClick={() => openExternal(profile.cvUrl!)}>{ui.profile.cv}</HexButton>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="profile__stats">
          {profileStats.map((s, i) => (
            <div key={i} className="stat frame frame--glass">
              <span className="stat__value">{s.value}</span>
              <span className="stat__label">{t(s.label)}</span>
            </div>
          ))}
        </div>

        <div className="profile__widgets">
          <button className="widget frame frame--glass" onClick={() => navigate('parcours/experiences')}>
            <span className="widget__title label">{ui.profile.ranked}</span>
            <span className="widget__emblem">
              <img src={cd.rankEmblem(profile.rank.tier)} alt="" />
            </span>
            <span className="widget__big">{t(profile.rank.label)}</span>
            <span className="widget__small">{t(profile.rank.queue)}</span>
            <span className="widget__small gold">{t(profile.rank.detail)}</span>
          </button>

          <button className="widget frame frame--glass" onClick={() => navigate('profil/maitrise')}>
            <span className="widget__title label">{ui.profile.mastery}</span>
            <span className="widget__mastery">
              {topSkills.map((s, i) => (
                <span key={i} className={`widget__champ widget__champ--${i}`}>
                  <span className="widget__champ-icon tech-icon"><img src={s.icon} alt="" /></span>
                  <img className="widget__champ-crest" src={cd.masteryCrest(s.level)} alt="" />
                  <span className="widget__champ-name">{t(s.name)}</span>
                </span>
              ))}
            </span>
            <span className="widget__small">{ui.profile.totalScore(skills.reduce((a, s) => a + s.level, 0))}</span>
          </button>

          <button className="widget frame frame--glass" onClick={() => navigate('profil/defis')}>
            <span className="widget__title label">{ui.profile.challenges}</span>
            <span className="widget__tokens">
              {topAchievements.map((a, i) => (
                <Tip key={i} title={t(a.name)} text={t(a.description)}>
                  <span className="token">
                    <img src={cd.challengeCrystal(a.tier)} alt="" />
                  </span>
                </Tip>
              ))}
            </span>
            <span className="widget__big">{ui.profile.nChallenges(achievements.length)}</span>
            <span className="widget__small">{ui.profile.achievements}</span>
          </button>
        </div>
      </section>
    </div>
  )
}

/* ─────────────────────────────── Maîtrise ─────────────────────────────── */

type SortKey = 'points' | 'level' | 'name'

function Mastery() {
  const { lang, t, ui, num } = useI18n()
  const ALL = '__all__'
  const categories = Array.from(new Set(skills.map((s) => t(s.category))))
  const [cat, setCat] = useState(ALL)
  const [sort, setSort] = useState<SortKey>('points')

  const list = useMemo(() => {
    const l = skills.filter((s) => cat === ALL || t(s.category) === cat)
    return l.sort((a, b) =>
      sort === 'name' ? t(a.name).localeCompare(t(b.name)) : sort === 'level' ? b.level - a.level : b.points - a.points,
    )
  }, [cat, sort, lang])

  const total = skills.reduce((a, s) => a + s.level, 0)

  return (
    <div className="mastery">
      <div className="mastery__header frame frame--glass">
        <img className="mastery__header-crest" src={cd.masteryCrest(10)} alt="" />
        <div>
          <div className="label">{ui.profile.masteryScore}</div>
          <div className="mastery__score">{total}</div>
        </div>
        <div className="mastery__header-sep" />
        <div>
          <div className="label">{ui.profile.skillsCount}</div>
          <div className="mastery__score">{skills.length}</div>
        </div>
        <div className="mastery__header-sep" />
        <div>
          <div className="label">{ui.profile.totalPoints}</div>
          <div className="mastery__score">{num(skills.reduce((a, s) => a + s.points, 0))}</div>
        </div>
        <div className="mastery__filters">
          <Dropdown
            value={cat}
            onChange={setCat}
            prefix={ui.common.category}
            options={[{ value: ALL, label: ui.common.allF }, ...categories.map((c) => ({ value: c, label: c }))]}
          />
          <Dropdown<SortKey>
            value={sort}
            onChange={setSort}
            prefix={ui.common.sort}
            options={[
              { value: 'points', label: ui.common.points },
              { value: 'level', label: ui.common.levelWord },
              { value: 'name', label: ui.common.alphabetical },
            ]}
          />
        </div>
      </div>

      <div className="mastery__grid">
        {list.map((s, i) => (
          <div key={i} className={`mastery-card ${s.level >= 10 ? 'is-max' : ''}`}>
            <img className="mastery-card__crest" src={cd.masteryCrest(s.level)} alt="" />
            <span className="mastery-card__icon tech-icon">
              <img src={s.icon} alt="" />
            </span>
            <span className="mastery-card__name">{t(s.name)}</span>
            <span className="mastery-card__cat">{t(s.category)}</span>
            <span className="mastery-card__level">{ui.common.level(s.level)}</span>
            <span className="mastery-card__bar">
              <i style={{ width: `${s.level * 10}%` }} />
            </span>
            <span className="mastery-card__pts">
              {num(s.points)} {ui.profile.pts} · {t(s.detail)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ──────────────────────────────── Défis ──────────────────────────────── */

function Challenges() {
  const { t, ui } = useI18n()
  const sorted = byTier(achievements)
  const best = sorted[0]
  return (
    <div className="challenges">
      <div className="challenges__header frame frame--glass">
        {best && <img src={cd.challengeCrystal(best.tier)} alt="" className="challenges__crystal" />}
        <div>
          <div className="label">{ui.profile.challengeLevel}</div>
          <div className="mastery__score">{best ? ui.profile.tiers[best.tier] : '—'}</div>
        </div>
        <div className="mastery__header-sep" />
        <div>
          <div className="label">{ui.profile.challengesDone}</div>
          <div className="mastery__score">{achievements.length}</div>
        </div>
      </div>

      <div className="challenges__grid">
        {sorted.map((a, i) => (
          <div key={i} className={`challenge tier--${a.tier}`}>
            <img className="challenge__crystal" src={cd.challengeCrystal(a.tier)} alt="" />
            <div className="challenge__body">
              <div className="challenge__top">
                <span className="challenge__name">{t(a.name)}</span>
                <span className="challenge__tier">{ui.profile.tiers[a.tier]}</span>
              </div>
              <p className="challenge__desc">{t(a.description)}</p>
              <div className="challenge__meta">
                <span>{t(a.category)}</span>
                {a.date && <span>{a.date}</span>}
                <b>{t(a.value)}</b>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ProfilePage({ sub }: { sub?: string }) {
  const { ui } = useI18n()
  const active = sub === 'maitrise' || sub === 'defis' ? sub : 'apercu'
  return (
    <div className="page page-enter profile-page">
      <div className="profile-page__bg">
        <img src={profile.background} alt="" style={{ objectPosition: profile.backgroundPosition }} />
      </div>
      <SubNav
        items={[
          { id: 'apercu', label: ui.profile.overview },
          { id: 'maitrise', label: ui.profile.mastery },
          { id: 'defis', label: ui.profile.challenges },
        ]}
        active={active}
        onSelect={(id) => navigate(`profil/${id}`)}
      />
      <div className={`page__content scroll ${active === 'apercu' ? 'is-fit' : ''}`} key={active}>
        {active === 'apercu' && <Overview />}
        {active === 'maitrise' && <Mastery />}
        {active === 'defis' && <Challenges />}
      </div>
    </div>
  )
}
