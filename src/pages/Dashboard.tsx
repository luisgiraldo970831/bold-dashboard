import { useState } from 'react'
import RangeBar from '@/features/transactions/components/RangeBar'
import FiltersButton from '@/features/transactions/components/FiltersButton'
import FiltersPanel from '@/features/transactions/components/FiltersPanel'
import SearchBox from '@/features/transactions/components/SearchBox'
import SummaryCards from '@/features/transactions/components/SummaryCards'
import FilterChips from '@/features/transactions/components/FilterChips'
import bannerBold from '@/assets/banner-bold.png'

export default function Dashboard() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen)
  }
  return (
    <div className="min-h-screen w-full flex flex-col ">
      <div className="w-full py-4 px-0">
        <div className="w-full px-0 py-0">
        <img 
          src={bannerBold} 
          alt="Bold" 
          className="w-full h-full object-fill border-0"
        />
        </div>
      </div>
      
      <header className="sticky top-0 z-[var(--z-header)] bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-2 sm:px-4 py-2 sm:py-3">
          {/* Mobile Layout */}
          <div className="flex flex-col gap-3 sm:hidden">
            <div className="flex items-center justify-between">
              <div className="w-64">
                <div className="bg-gradient-to-r from-primary via-purple-600 to-accent rounded-t-lg p-2 text-white">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xs font-semibold">Total de ventas de hoy</h2>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-white rounded-b-lg p-2 border border-gray-200">
                  <p className="text-sm font-bold text-primary">$ 9'1233.950</p>
                  <p className="text-gray-500 text-xs">27 de Junio 2024</p>
                </div>
              </div>
              <FiltersButton isOpen={isFiltersOpen} onToggle={toggleFilters} />
            </div>
            <div className="flex justify-center">
              <RangeBar />
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:flex items-center justify-between">
            <div className="w-64 sm:w-72 md:w-80">
              <div className="bg-gradient-to-r from-primary via-purple-600 to-accent rounded-t-lg p-2 text-white">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-semibold">Total de ventas de hoy</h2>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="bg-white rounded-b-lg p-2 border border-gray-200">
                <p className="text-lg font-bold text-primary">$ 9'1233.950</p>
                <p className="text-gray-500 text-xs">27 de Junio 2024</p>
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
        <div className="mx-auto max-w-7xl px-4 py-4">

          <div className="bg-gradient-to-r from-primary via-purple-600 to-accent rounded-lg p-4 text-white mb-4">
            <h2 className="text-lg font-semibold mb-4">Tus ventas de junio</h2>
            <SearchBox />
            <FilterChips />
          </div>

          <section className="bg-white rounded-lg p-4 min-h-[400px] border border-gray-200">
            <div className="text-center py-20 text-gray-500">
              <p className="text-lg mb-2">No hay transacciones para mostrar</p>
              <p className="text-sm">Las transacciones aparecerán aquí cuando estén disponibles</p>
            </div>
          </section>
        </div>
      </main>
      
      <FiltersPanel isOpen={isFiltersOpen} onClose={() => setIsFiltersOpen(false)} />
    </div>
  )
}
