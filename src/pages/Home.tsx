import { useEffect, useState } from 'react'
import { Dialog, HexButton, SubNav } from '../components/ui'
import { heroSlides, homeCards, patchNotes } from '../data/portfolio'
import type { PatchNote } from '../data/types'
import { useI18n } from '../i18n'
import { follow, navigate } from '../lib/router'

const SLIDE_MS = 8000

function Overview() {
  const { t, ui } = useI18n()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const slide = heroSlides[index]

  useEffect(() => {
    if (paused || heroSlides.length < 2) return
    const timer = setTimeout(() => setIndex((i) => (i + 1) % heroSlides.length), SLIDE_MS)
    return () => clearTimeout(timer)
  }, [index, paused])

  return (
    <div className="home">
      <section
        className={`hero ${paused ? 'is-paused' : ''}`}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-roledescription={ui.home.carousel}
      >
        {heroSlides.map((s, i) => (
          <img
            key={s.image + i}
            className={`hero__img ${i === index ? 'is-active' : ''}`}
            src={s.image}
            alt=""
            style={{ objectPosition: s.imagePosition }}
          />
        ))}
        <div className="hero__shade" />

        <div className="hero__content" key={index}>
          <div className="hero__eyebrow">{t(slide.eyebrow)}</div>
          <h1 className="hero__title">{t(slide.title)}</h1>
          <p className="hero__desc">{t(slide.description)}</p>
          <div className="hero__actions">
            <HexButton size="lg" onClick={() => follow(slide.cta)}>{t(slide.cta.label)}</HexButton>
            {slide.secondary && (
              <button className="text-btn" onClick={() => follow(slide.secondary!)}>
                {t(slide.secondary.label)}
              </button>
            )}
          </div>
        </div>

        <div className="hero__pager">
          {heroSlides.map((s, i) => (
            <button
              key={i}
              className={`hero__pip ${i === index ? 'is-active' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={t(s.title)}
            >
              <span className="hero__pip-label">{t(s.eyebrow)}</span>
              <span className="hero__pip-bar">
                <i style={{ animationDuration: `${SLIDE_MS}ms` }} />
              </span>
            </button>
          ))}
        </div>
      </section>

      <aside className="home__side">
        {homeCards.map((c, i) => (
          <button key={i} className="home-card" onClick={() => follow(c)}>
            <img src={c.image} alt="" style={{ objectPosition: c.imagePosition }} />
            <span className="home-card__shade" />
            <span className="home-card__text">
              <span className="home-card__eyebrow">{t(c.eyebrow)}</span>
              <span className="home-card__title">{t(c.title)}</span>
            </span>
          </button>
        ))}
      </aside>
    </div>
  )
}

function PatchNotes() {
  const { t, ui } = useI18n()
  const [open, setOpen] = useState<PatchNote | null>(null)
  return (
    <>
      <div className="news-grid">
        {patchNotes.map((n, i) => (
          <button key={i} className={`news-card ${i === 0 ? 'news-card--featured' : ''}`} onClick={() => setOpen(n)}>
            <span className="news-card__media">
              <img src={n.image} alt="" style={{ objectPosition: n.imagePosition }} />
              <span className="news-card__version">{n.version}</span>
            </span>
            <span className="news-card__body">
              <span className="news-card__date">{t(n.date)}</span>
              <span className="news-card__title">{t(n.title)}</span>
              <span className="news-card__summary">{t(n.summary)}</span>
            </span>
          </button>
        ))}
      </div>

      <Dialog
        open={!!open}
        onClose={() => setOpen(null)}
        label={open ? t(open.title) : ''}
        wide
        actions={
          open?.href ? (
            <HexButton onClick={() => follow({ href: open.href })}>{ui.home.readMore}</HexButton>
          ) : (
            <HexButton onClick={() => setOpen(null)}>{ui.common.close}</HexButton>
          )
        }
      >
        {open && (
          <div className="patch">
            <img className="patch__img" src={open.image} alt="" style={{ objectPosition: open.imagePosition }} />
            <div className="label gold">{ui.home.patch(open.version, t(open.date))}</div>
            <h2 className="heading-1 patch__title">{t(open.title)}</h2>
            <p className="body-text">{t(open.summary)}</p>
            <div className="divider" style={{ margin: '1rem 0' }} />
            <ul className="patch__list">
              {open.items.map((it, i) => <li key={i}>{t(it)}</li>)}
            </ul>
          </div>
        )}
      </Dialog>
    </>
  )
}

export function HomePage({ sub }: { sub?: string }) {
  const { ui } = useI18n()
  const active = sub === 'notes' ? 'notes' : 'apercu'
  return (
    <div className="page page-enter">
      <SubNav
        items={[
          { id: 'apercu', label: ui.home.overview },
          { id: 'notes', label: ui.home.patchNotes },
        ]}
        active={active}
        onSelect={(id) => navigate(`accueil/${id}`)}
      />
      <div className={`page__content ${active === 'notes' ? 'scroll' : ''}`}>
        {active === 'apercu' ? <Overview /> : <PatchNotes />}
      </div>
    </div>
  )
}
