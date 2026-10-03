import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useI18n } from '../i18n'
import { playSfx } from '../lib/sfx'
import { HexButton } from './ui'

/** Easter egg : ↑ ↑ ↓ ↓ ← → ← → B A affiche une "émote débloquée" */
const CODE = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a']

export function KonamiEgg() {
  const { ui } = useI18n()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let keys: string[] = []
    const onKey = (e: KeyboardEvent) => {
      keys = [...keys, e.key.toLowerCase()].slice(-CODE.length)
      if (keys.join() === CODE.join()) {
        keys = []
        setOpen(true)
        playSfx('secret')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  if (!open) return null
  return createPortal(
    <div className="secret" onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}>
      <div className="secret__card" role="dialog" aria-modal="true" aria-label={ui.egg.eyebrow}>
        <span className="secret__rays" aria-hidden />
        <div className="secret__eyebrow">{ui.egg.eyebrow}</div>
        <div className="secret__title">{ui.egg.title}</div>
        <div className="secret__frame">
          <img src={`${import.meta.env.BASE_URL}easter-egg.png`} alt={ui.egg.alt} />
        </div>
        <div className="secret__name">{ui.egg.name}</div>
        <HexButton onClick={() => setOpen(false)}>{ui.egg.ok}</HexButton>
      </div>
    </div>,
    document.body,
  )
}
