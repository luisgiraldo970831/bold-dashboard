import { useEffect, useRef } from 'react'

export function useOnClickOutside<T extends HTMLElement>(
  isOpen: boolean,
  onClose: () => void
) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    if (!isOpen) return
    const handle = (e: MouseEvent) => {
      const el = ref.current
      if (el && !el.contains(e.target as Node)) onClose()
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('mousedown', handle)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', handle)
      document.removeEventListener('keydown', onKey)
    }
  }, [isOpen, onClose])

  return ref
}
