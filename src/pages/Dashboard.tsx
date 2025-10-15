import { useState } from 'react'
import RangeBar from '@/features/transactions/components/RangeBar'
import FiltersButton from '@/features/transactions/components/FiltersButton'
import FiltersPanel from '@/features/transactions/components/FiltersPanel'
import SearchBox from '@/features/transactions/components/SearchBox'
import FilterChips from '@/features/transactions/components/FilterChips'
import TransactionsTable from '@/features/transactions/components/TransactionsTable'
import { useTransactions } from '@/hooks/useTransactions'
import { formatCurrency } from '@/services/transactionsApi'
import bannerBold from '@/assets/banner-bold.png'

export default function Dashboard() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const { 
    filteredTransactions, 
    stats, 
    isLoading, 
    error,
    refreshTransactions 
  } = useTransactions()

  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen)
  }
  return (
    <div className="min-h-screen w-full flex flex-col">
      <div className="w-full py-2 sm:py-4 px-0">
        <div className="w-full px-0 py-0">
        <img 
          src={bannerBold} 
          alt="Bold" 
          className="w-full h-auto object-contain border-0"
        />
        </div>
      </div>
      
      <header className="sticky top-0 z-[var(--z-header)] bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-2 sm:px-4 py-2 sm:py-3">
          {/* Mobile Layout */}
          <div className="flex flex-col gap-3 sm:hidden">
            <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="bg-gradient-to-r from-primary via-purple-600 to-accent rounded-t-lg p-2 text-white">
                    <div className="flex items-center gap-2">
                      <h2 className="text-xs font-semibold">Total de ventas</h2>
                      <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="bg-white rounded-b-lg p-2 border border-gray-200">
                    <p className="text-sm font-bold text-primary truncate">
                      {isLoading ? '...' : formatCurrency(stats.totalAmount)}
                    </p>
                    <p className="text-gray-500 text-xs">{stats.totalTransactions} transacciones</p>
                  </div>
                </div>
              <div className="flex-shrink-0">
                <FiltersButton isOpen={isFiltersOpen} onToggle={toggleFilters} />
              </div>
            </div>
            <div className="flex justify-center px-2">
              <RangeBar />
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:flex items-center justify-between">
                <div className="w-64 sm:w-72 md:w-80">
                  <div className="bg-gradient-to-r from-primary via-purple-600 to-accent rounded-t-lg p-2 text-white">
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm font-semibold">Total de ventas</h2>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="bg-white rounded-b-lg p-2 border border-gray-200">
                    <p className="text-lg font-bold text-primary">
                      {isLoading ? '...' : formatCurrency(stats.totalAmount)}
                    </p>
                    <p className="text-gray-500 text-xs">{stats.totalTransactions} transacciones</p>
                  </div>
                </div>
            <div className="flex-1 flex items-center justify-center px-4 sm:px-8">
              <RangeBar />
            </div>
            <div className="flex items-center gap-2">
              <FiltersButton isOpen={isFiltersOpen} onToggle={toggleFilters} />
            </div>
          </div>
        </div>
      </header>

          <main className="flex-1 bg-gray-50">
            <div className="mx-auto max-w-7xl px-2 sm:px-4 py-4">

              <div className="bg-gradient-to-r from-primary via-purple-600 to-accent rounded-lg p-4 text-white mb-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Transacciones</h2>
                  <button
                    onClick={refreshTransactions}
                    disabled={isLoading}
                    className="px-3 py-1 bg-white/20 rounded-md text-sm hover:bg-white/30 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? 'Actualizando...' : 'Actualizar'}
                  </button>
                </div>
                <SearchBox />
                <FilterChips />
              </div>

              {/* Tabla de transacciones */}
              <TransactionsTable 
                transactions={filteredTransactions}
                isLoading={isLoading}
                error={error}
              />
            </div>
          </main>
      
      <FiltersPanel isOpen={isFiltersOpen} onClose={() => setIsFiltersOpen(false)} />
    </div>
  )
}
