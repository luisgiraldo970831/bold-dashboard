import { useFilters } from '@/stores/FiltersContext'
import { useCallback } from 'react'

export default function SearchBox() {
  const { state, setQ } = useFilters()

  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (e) => setQ(e.target.value),
    [setQ]
  )

  return (
    <input
      value={state.q}
      onChange={onChange}
      className="w-full rounded-md border-0 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-white/50 text-gray-900 placeholder-gray-500"
      placeholder="Buscar"
      aria-label="Buscar"
    />
  )
}
