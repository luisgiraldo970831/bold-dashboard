interface FiltersPanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function FiltersPanel({ isOpen, onClose }: FiltersPanelProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-end pt-20 pr-4">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative z-10 bg-white rounded-lg shadow-lg border border-gray-200 w-80 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Filtrar</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
            />
            <span className="text-sm text-gray-700">Cobro con datáfono</span>
          </label>
          
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
            />
            <span className="text-sm text-gray-700">Cobro con link de pago</span>
          </label>
          
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
            />
            <span className="text-sm text-gray-700">Ver todos</span>
          </label>
        </div>
        
        <button className="w-full mt-6 bg-accent text-white py-2 px-4 rounded-lg font-medium hover:bg-accent-600 transition-colors">
          Aplicar
        </button>
      </div>
    </div>
  )
}