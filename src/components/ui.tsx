import {
  useCallback, useEffect, useId, useLayoutEffect, useRef, useState,
  type ButtonHTMLAttributes, type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { setLang, useI18n } from '../i18n'
import { contactIcons, IconChevronDown, IconClose } from './Icons'

/* ─────────────────────────── Bouton hextech ─────────────────────────── */

type HexButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: 'sm' | 'md' | 'lg'
  block?: boolean
}

export function HexButton({ size = 'md', block, className = '', onClick, children, ...rest }: HexButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  return (
    <button
      ref={ref}
      className={`lol-btn ${size !== 'md' ? `lol-btn--${size}` : ''} ${block ? 'lol-btn--block' : ''} ${className}`}
      onClick={(e) => {
        const el = ref.current
        if (el) {
          el.classList.remove('is-clicked')
          void el.offsetWidth // relance l'animation
          el.classList.add('is-clicked')
        }
        onClick?.(e)
      }}
      {...rest}
    >
      {children}
    </button>
  )
}

/* ──────────────── Bouton magique à bas incurvé (Accepter) ──────────────── */

type MagicButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'find' | 'accept'
}

export function MagicButton({ variant = 'find', className = '', children, ...rest }: MagicButtonProps) {
  const id = useId().replace(/:/g, '')
  // Forme : bord supérieur droit, flancs légèrement inclinés, bas en arc de cercle
  const d = 'M1.5 1.5 H198.5 L192 34 Q100 58 8 34 Z'
  return (
    <button className={`magic-btn magic-btn--${variant} ${className}`} {...rest}>
      <svg className="magic-btn__shape" viewBox="0 0 200 50" preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id={`mb-fill-${id}`} x1="0" y1="0" x2="0" y2="1">
            {variant === 'find' ? (
              <>
                <stop offset="0" stopColor="#0f5e72" />
                <stop offset="0.55" stopColor="#0a3d4f" />
                <stop offset="1" stopColor="#06222e" />
              </>
            ) : (
              <>
                <stop offset="0" stopColor="#1e2328" />
                <stop offset="1" stopColor="#141a1f" />
              </>
            )}
          </linearGradient>
          <linearGradient id={`mb-hover-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1b8ba3" />
            <stop offset="0.6" stopColor="#0d5a6e" />
            <stop offset="1" stopColor="#073140" />
          </linearGradient>
          <linearGradient id={`mb-stroke-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0ac8b9" />
            <stop offset="1" stopColor="#005a82" />
          </linearGradient>
          <radialGradient id={`mb-shine-${id}`} cx="0.5" cy="0" r="0.8">
            <stop offset="0" stopColor="#cdfafa" stopOpacity="0.35" />
            <stop offset="1" stopColor="#cdfafa" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path d={d} fill={`url(#mb-fill-${id})`} />
        <path className="magic-btn__fill-hover" d={d} fill={`url(#mb-hover-${id})`} />
        <path d={d} fill={`url(#mb-shine-${id})`} />
        <path
          d={d}
          fill="none"
          stroke={`url(#mb-stroke-${id})`}
          strokeWidth="2.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span>{children}</span>
    </button>
  )
}

/* ───────────────────────────── Fermer (X) ───────────────────────────── */

export function CloseButton({ onClick, label = 'Fermer', className = '' }: { onClick: () => void; label?: string; className?: string }) {
  return (
    <button className={`close-btn ${className}`} onClick={onClick} aria-label={label}>
      <span className="close-btn__inner">
        <IconClose />
      </span>
    </button>
  )
}

/* ──────────────────────────── Boîte de dialogue ──────────────────────────── */

export function Dialog({
  open, onClose, children, wide, actions, label,
}: {
  open: boolean
  onClose: () => void
  children: ReactNode
  wide?: boolean
  actions?: ReactNode
  label: string
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null
  return createPortal(
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`dialog ${wide ? 'dialog--wide' : ''}`} role="dialog" aria-modal="true" aria-label={label}>
        <CloseButton className="dialog__close" onClick={onClose} />
        <div className="dialog__body scroll">{children}</div>
        {actions && <div className="dialog__actions">{actions}</div>}
      </div>
    </div>,
    document.body,
  )
}

/* ─────────────────────────────── Info-bulle ─────────────────────────────── */

export function Tip({
  title, text, children, placement = 'bottom', className = '',
}: {
  title?: ReactNode
  text?: ReactNode
  children: ReactNode
  placement?: 'bottom' | 'top' | 'left' | 'right'
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const tipRef = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)
  const [pos, setPos] = useState({ x: -9999, y: -9999 })

  useLayoutEffect(() => {
    if (!show || !ref.current || !tipRef.current) return
    const r = ref.current.getBoundingClientRect()
    const t = tipRef.current.getBoundingClientRect()
    const gap = 8
    let x = r.left + r.width / 2 - t.width / 2
    let y = r.bottom + gap
    if (placement === 'top') y = r.top - t.height - gap
    if (placement === 'left') { x = r.left - t.width - gap; y = r.top + r.height / 2 - t.height / 2 }
    if (placement === 'right') { x = r.right + gap; y = r.top + r.height / 2 - t.height / 2 }
    x = Math.max(6, Math.min(window.innerWidth - t.width - 6, x))
    y = Math.max(6, Math.min(window.innerHeight - t.height - 6, y))
    setPos({ x, y })
  }, [show, placement])

  if (!title && !text) return <>{children}</>
  return (
    <span
      ref={ref}
      className={`tip-anchor ${className}`}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => { setShow(false); setPos({ x: -9999, y: -9999 }) }}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      {children}
      {show &&
        createPortal(
          <div ref={tipRef} className="tooltip" style={{ left: pos.x, top: pos.y }} role="tooltip">
            {title && <div className="tooltip__title">{title}</div>}
            {text && <div className="tooltip__text">{text}</div>}
          </div>,
          document.body,
        )}
    </span>
  )
}

/* ───────────────────────────── Liste déroulante ───────────────────────────── */

export function Dropdown<T extends string>({
  value, options, onChange, prefix,
}: {
  value: T
  options: { value: T; label: string }[]
  onChange: (v: T) => void
  prefix?: string
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const close = useCallback((e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
  }, [])

  useEffect(() => {
    if (!open) return
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open, close])

  const current = options.find((o) => o.value === value)
  return (
    <div className="dropdown" ref={ref}>
      <button className="dropdown__btn" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span>
          {prefix && <span className="prefix">{prefix} </span>}
          {current?.label}
        </span>
        <IconChevronDown />
      </button>
      {open && (
        <div className="dropdown__menu" role="listbox">
          {options.map((o) => (
            <button
              key={o.value}
              role="option"
              aria-selected={o.value === value}
              className={`dropdown__item ${o.value === value ? 'is-selected' : ''}`}
              onClick={() => { onChange(o.value); setOpen(false) }}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ────────────────────────── Sous-navigation de page ────────────────────────── */

export function SubNav({
  items, active, onSelect, right,
}: {
  items: { id: string; label: string }[]
  active: string
  onSelect: (id: string) => void
  right?: ReactNode
}) {
  return (
    <div className="subnav">
      <nav className="subnav__items">
        {items.map((it) => (
          <button
            key={it.id}
            className={`subnav__item ${it.id === active ? 'is-active' : ''}`}
            onClick={() => onSelect(it.id)}
            aria-current={it.id === active ? 'page' : undefined}
          >
            {it.label}
          </button>
        ))}
      </nav>
      {right && <div className="subnav__right">{right}</div>}
    </div>
  )
}

/* ─────────────── Avatar rond (image ou icône de réseau "icon:github") ─────────────── */

export function Avatar({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  if (src.startsWith('icon:')) {
    return <IconAvatar name={src.slice(5)} className={className} />
  }
  return <img className={className} src={src} alt={alt} loading="lazy" />
}

function IconAvatar({ name, className }: { name: string; className: string }) {
  const Icon = contactIcons[name] ?? contactIcons.mail
  return (
    <span className={`icon-avatar icon-avatar--${name} ${className}`}>
      <Icon />
    </span>
  )
}

/* ───────────────────────────── Langue FR / EN ───────────────────────────── */

export function LangSwitch({ className = '' }: { className?: string }) {
  const { lang } = useI18n()
  return (
    <div className={`lang-switch ${className}`} role="group" aria-label="Langue / Language">
      {(['fr', 'en'] as const).map((l) => (
        <button key={l} className={l === lang ? 'is-active' : ''} onClick={() => setLang(l)} aria-pressed={l === lang}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

/* ─────────────────────── Notifications (toasts du client) ─────────────────────── */

let pushToast: ((text: string) => void) | null = null

export function showToast(text: string) {
  pushToast?.(text)
}

export function ToastHost() {
  const [toasts, setToasts] = useState<{ id: number; text: string }[]>([])

  useEffect(() => {
    let next = 0
    pushToast = (text) => {
      const id = ++next
      setToasts((list) => [...list, { id, text }])
      window.setTimeout(() => setToasts((list) => list.filter((t) => t.id !== id)), 4500)
    }
    return () => { pushToast = null }
  }, [])

  return createPortal(
    <div className="toasts" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className="toast">{t.text}</div>
      ))}
    </div>,
    document.body,
  )
}
