interface FiltersButtonProps {
  isOpen: boolean
  onToggle: () => void
}

export default function FiltersButton({ isOpen, onToggle }: FiltersButtonProps) {
  const handleClick = () => {
    onToggle()
  }
  
  return (
    <button
      onClick={handleClick}
      className="px-3 py-2 rounded-md bg-primary text-white text-sm shadow-sm transition-colors duration-fast ease-bold hover:bg-[color:var(--primary-600)]"
      aria-expanded={isOpen}
      aria-controls="filters-panel"
    >
      {isOpen ? 'Ocultar filtros' : 'Filtrar'}
    </button>
  )
}