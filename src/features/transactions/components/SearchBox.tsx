import { useFilters } from '@/stores/useFilters'
import { useCallback } from 'react'

export default function SearchBox() {
  const { q, setQ } = useFilters()

  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (e) => setQ(e.target.value),
    [setQ]
  )

  return (
    <input
      value={q}
      onChange={onChange}
      className="w-full rounded-md border border-gray-100 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-accent"
      placeholder="Buscar por cualquier campo…"
      aria-label="Buscar"
    />
  )
}
