import Dashboard from './pages/Dashboard'
import { FiltersProvider } from './stores/FiltersContext'
import './App.css'

function App() {
  return (
    <FiltersProvider>
      <Dashboard />
    </FiltersProvider>
  )
}

export default App
