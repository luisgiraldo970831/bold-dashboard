import { useFilters } from '@/stores/useFilters'

export default function FilterChips() {
  const { channels, setChannels } = useFilters()

  const removeChannel = (channel: string) => {
    setChannels(channels.filter(c => c !== channel))
  }

  const clearAll = () => {
    setChannels([])
  }

  if (channels.length === 0) {
    return null
  }

  return (
    <div className="flex items-center gap-2 mt-4">
      <span className="text-sm text-white/80">Filtros activos:</span>
      {channels.map((channel) => (
        <div
          key={channel}
          className="inline-flex items-center gap-1 bg-white/20 text-white px-2 py-1 rounded-full text-xs font-medium"
        >
          <span className="capitalize">{channel}</span>
          <button
            onClick={() => removeChannel(channel)}
            className="ml-1 text-white hover:text-white/80"
          >
            ×
          </button>
        </div>
      ))}
      <button
        onClick={clearAll}
        className="text-xs text-white/80 hover:text-white underline"
      >
        Limpiar todo
      </button>
    </div>
  )
}
