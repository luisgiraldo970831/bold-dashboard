export default function SummaryCards() {
  return (
    <div className="mb-6">
      <div className="bg-gradient-to-r from-primary via-purple-600 to-accent rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-lg font-semibold">Total de ventas de Junio</h2>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-3xl font-bold mb-1">$394.561.894</p>
            <p className="text-white/80">Junio, 2024</p>
          </div>
        </div>
      </div>
    </div>
  )
}
