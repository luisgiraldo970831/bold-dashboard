import { useFilters, type RangeKey } from '@/stores/useFilters'

const RANGES: { key: RangeKey; label: string }[] = [
  { key: 'today', label: 'Hoy' },
  { key: 'week', label: 'Esta semana' },
  { key: 'month', label: 'Mes' }
]

export default function RangeBar() {
  const { range, setRange } = useFilters()

  return (
    <div className="inline-flex rounded-md bg-gray-100 p-1">
      {RANGES.map(({ key, label }) => {
        const active = range === key
        return (
          <button
            key={key}
            onClick={() => setRange(key)}
            className={`px-8 py-3 rounded-md text-sm font-medium transition-colors duration-fast ease-bold min-w-[140px] sm:min-w-[160px] md:min-w-[180px] lg:min-w-[200px] xl:min-w-[220px]
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
