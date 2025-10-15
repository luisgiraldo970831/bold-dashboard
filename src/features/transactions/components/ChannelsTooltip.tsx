import { useMemo } from 'react'
import { useFilters } from '@/stores/FiltersContext'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'

const ALL = ['web', 'pos', 'app'] as const

function InfoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity=".12" />
      <circle cx="12" cy="7" r="1.2" fill="currentColor" />
      <rect x="11" y="10" width="2" height="8" rx="1" fill="currentColor" />
    </svg>
  )
}

export default function ChannelsTooltip() {
  const { state, setTooltipOpen: setOpen, setChannels } = useFilters()

  const ref = useOnClickOutside<HTMLDivElement>(state.tooltipOpen, () => setOpen(false))
  const setOrToggle = (v: string) => {
    const set = new Set(state.channels)
    if (set.has(v)) set.delete(v)
    else set.add(v)
    setChannels(Array.from(set))
  }
  const label = useMemo(() => (state.channels.length ? `Canales (${state.channels.length})` : 'Canales'), [state.channels])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!state.tooltipOpen)}
        className="inline-flex items-center gap-2 rounded-md border border-gray-100 bg-white px-3 py-2 text-sm shadow-sm hover:bg-gray-50"
        aria-haspopup="dialog"
        aria-expanded={state.tooltipOpen}
      >
        <InfoIcon className="text-primary" />
        <span>{label}</span>
      </button>

      {state.tooltipOpen && (
        <div
          role="dialog"
          aria-label="Filtrar por canales"
          className="absolute right-0 mt-2 w-56 rounded-md border border-gray-100 bg-white p-3 shadow-md z-[var(--z-tooltip)] animate-in fade-in slide-in-from-top-1"
          style={{ animationDuration: 'var(--t-medium)' }}
        >
          <p className="text-xs text-text/70 mb-2">Selecciona uno o más canales</p>
          <div className="grid gap-2">
            {ALL.map((c) => (
              <label key={c} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="accent-[var(--color-accent)]"
                  checked={state.channels.includes(c)}
                  onChange={() => setOrToggle(c)}
                />
                <span className="capitalize">{c}</span>
              </label>
            ))}
          </div>

          <div className="mt-3 flex justify-between">
            <button
              className="text-xs text-accent hover:underline"
              onClick={() => setChannels([])}
            >
              Limpiar
            </button>
            <button
              className="text-xs text-primary hover:underline"
              onClick={() => setOpen(false)}
            >
              Listo
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
