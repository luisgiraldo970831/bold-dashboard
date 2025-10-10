import { useFilters } from '@/stores/useFilters'

export default function FiltersButton() {
  const { showFilters: show, toggleFilters: toggle } = useFilters()
  return (
    <button
      onClick={toggle}
      className="px-3 py-2 rounded-md bg-primary text-white text-sm shadow-sm transition-colors duration-fast ease-bold hover:bg-[color:var(--primary-600)]"
      aria-expanded={show}
      aria-controls="filters-panel"
    >
      {show ? 'Ocultar filtros' : 'Filtrar'}
    </button>
  )
}
