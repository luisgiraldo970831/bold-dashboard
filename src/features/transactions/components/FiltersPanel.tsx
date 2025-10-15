import { useFilters } from '@/stores/FiltersContext'
import { useState } from 'react'

interface FiltersPanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function FiltersPanel({ isOpen, onClose }: FiltersPanelProps) {
  const { state, setSalesTypes, toggleFilters } = useFilters()
  const [localSalesTypes, setLocalSalesTypes] = useState<string[]>(state.salesTypes)

  const handleCheckboxChange = (salesType: string, checked: boolean) => {
    if (checked) {
      setLocalSalesTypes(prev => [...prev, salesType])
    } else {
      setLocalSalesTypes(prev => prev.filter(type => type !== salesType))
    }
  }

  const handleApplyFilters = () => {
    setSalesTypes(localSalesTypes)
    toggleFilters() // Cerrar el modal
  }

  const handleClearAll = () => {
    setLocalSalesTypes([])
    setSalesTypes([])
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center sm:justify-end pt-16 sm:pt-20 px-4 sm:pr-4">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative z-10 bg-white rounded-lg shadow-lg border border-gray-200 w-full max-w-sm sm:w-80 p-4">
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
              checked={localSalesTypes.includes('TERMINAL')}
              onChange={(e) => handleCheckboxChange('TERMINAL', e.target.checked)}
              className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
            />
            <span className="text-sm text-gray-700">Cobro con datáfono</span>
          </label>
          
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={localSalesTypes.includes('PAYMENT_LINK')}
              onChange={(e) => handleCheckboxChange('PAYMENT_LINK', e.target.checked)}
              className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
            />
            <span className="text-sm text-gray-700">Cobro con link de pago</span>
          </label>
          
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={localSalesTypes.length === 0}
              onChange={(e) => e.target.checked ? handleClearAll() : null}
              className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
            />
            <span className="text-sm text-gray-700">Ver todos</span>
          </label>
        </div>
        
        <div className="flex gap-2 mt-6">
          <button 
            onClick={handleClearAll}
            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Limpiar
          </button>
          <button 
            onClick={handleApplyFilters}
            className="flex-1 bg-accent text-white py-2 px-4 rounded-lg font-medium hover:bg-accent-600 transition-colors"
          >
            Aplicar
          </button>
        </div>
      </div>
    </div>
  )
}