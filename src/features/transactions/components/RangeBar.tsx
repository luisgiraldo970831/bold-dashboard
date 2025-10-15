import { useFilters } from '@/stores/FiltersContext'
import type { RangeKey } from '@/stores/FiltersContext'

const RANGES: { key: RangeKey; label: string }[] = [
  { key: 'today', label: 'Hoy' },
  { key: 'week', label: 'Esta semana' },
  { key: 'month', label: 'Septiembre' }
]

export default function RangeBar() {
  const { state, setRange } = useFilters()

  return (
    <div className="inline-flex rounded-md bg-gray-100 p-1 w-full max-w-sm sm:max-w-none">
      {RANGES.map(({ key, label }) => {
        const active = state.range === key
        return (
          <button
            key={key}
            onClick={() => setRange(key)}
            className={`flex-1 px-2 py-2 sm:px-4 sm:py-3 rounded-md text-xs sm:text-sm font-medium transition-colors duration-fast ease-bold
              ${active ? 'bg-white text-primary shadow-sm' : 'text-text hover:bg-white/70'}`}
            aria-pressed={active}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
