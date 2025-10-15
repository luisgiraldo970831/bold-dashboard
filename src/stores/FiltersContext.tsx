import { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { AppliedFilters } from '@/types/api';

export type RangeKey = 'today' | 'week' | 'month';

export interface FilterState {
  search: string;
  range: RangeKey;
  dateRange: {
    start: string;
    end: string;
  };
  status: string;
  category: string;
  amountRange: {
    min: number | null;
    max: number | null;
  };
  showFilters: boolean;
  q: string;
  tooltipOpen: boolean;
  channels: string[];
  salesTypes: string[];
}

// Acciones del reducer
type FilterAction =
  | { type: 'SET_RANGE'; payload: RangeKey }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_DATE_RANGE'; payload: { start: string; end: string } }
  | { type: 'SET_STATUS'; payload: string }
  | { type: 'SET_CATEGORY'; payload: string }
  | { type: 'SET_AMOUNT_RANGE'; payload: { min: number | null; max: number | null } }
  | { type: 'TOGGLE_FILTERS' }
  | { type: 'SET_Q'; payload: string }
  | { type: 'SET_TOOLTIP_OPEN'; payload: boolean }
  | { type: 'SET_CHANNELS'; payload: string[] }
  | { type: 'SET_SALES_TYPES'; payload: string[] }
  | { type: 'CLEAR_FILTERS' }
  | { type: 'UPDATE_FILTER'; payload: { key: keyof FilterState; value: any } };

const STORAGE_KEY = 'bold-dashboard-filters';

// Función para cargar filtros desde localStorage
const loadFiltersFromStorage = (): FilterState => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Validar que los datos sean válidos
      if (parsed && typeof parsed === 'object') {
        const loadedState = {
          ...initialFilters,
          ...parsed,
          showFilters: false, // Siempre empezar con el modal cerrado
          tooltipOpen: false, // Siempre empezar con el tooltip cerrado
        };
        
        // Asegurar que el dateRange esté calculado correctamente
        if (!loadedState.dateRange.start || !loadedState.dateRange.end) {
          loadedState.dateRange = getInitialDateRange(loadedState.range);
        }
        
        return loadedState;
      }
    }
  } catch (error) {
    console.warn('Error loading filters from localStorage:', error);
  }
  return initialFilters;
};

// Función para guardar filtros en localStorage
const saveFiltersToStorage = (filters: FilterState) => {
  try {
    // No guardar estados de UI que no queremos persistir
    const { showFilters, tooltipOpen, ...filtersToSave } = filters;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtersToSave));
  } catch (error) {
    console.warn('Error saving filters to localStorage:', error);
  }
};

// Función para calcular el rango de fechas inicial
const getInitialDateRange = (range: RangeKey = 'month') => {
  const now = new Date();
  let startDate: Date;
  const endDate: Date = now;
  
  switch (range) {
    case 'today':
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    case 'week':
      startDate = new Date(now);
      startDate.setDate(now.getDate() - 7);
      break;
    case 'month':
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    default:
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  }
  
  return {
    start: startDate.toISOString(),
    end: endDate.toISOString(),
  };
};

const initialFilters: FilterState = {
  search: '',
  range: 'month',
  dateRange: getInitialDateRange('month'),
  status: '',
  category: '',
  amountRange: {
    min: null,
    max: null,
  },
  showFilters: false,
  q: '',
  tooltipOpen: false,
  channels: [],
  salesTypes: [],
};

// Reducer para manejar el estado
function filtersReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case 'SET_RANGE':
      const now = new Date();
      let startDate: Date;
      const endDate: Date = now;
      
      switch (action.payload) {
        case 'today':
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          break;
        case 'week':
          startDate = new Date(now);
          startDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        default:
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      }
      
      return {
        ...state,
        range: action.payload,
        dateRange: {
          start: startDate.toISOString(),
          end: endDate.toISOString(),
        },
      };

    case 'SET_SEARCH':
      return { ...state, search: action.payload };

    case 'SET_DATE_RANGE':
      return { ...state, dateRange: action.payload };

    case 'SET_STATUS':
      return { ...state, status: action.payload };

    case 'SET_CATEGORY':
      return { ...state, category: action.payload };

    case 'SET_AMOUNT_RANGE':
      return { ...state, amountRange: action.payload };

    case 'TOGGLE_FILTERS':
      return { ...state, showFilters: !state.showFilters };

    case 'SET_Q':
      return { ...state, q: action.payload };

    case 'SET_TOOLTIP_OPEN':
      return { ...state, tooltipOpen: action.payload };

    case 'SET_CHANNELS':
      return { ...state, channels: action.payload };

    case 'SET_SALES_TYPES':
      return { ...state, salesTypes: action.payload };

    case 'CLEAR_FILTERS':
      return {
        ...initialFilters,
        showFilters: state.showFilters, // Mantener el estado del modal
      };

    case 'UPDATE_FILTER':
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };

    default:
      return state;
  }
}

// Context
interface FiltersContextType {
  state: FilterState;
  // Acciones memoizadas
  setRange: (range: RangeKey) => void;
  setSearch: (search: string) => void;
  setDateRange: (start: string, end: string) => void;
  setStatus: (status: string) => void;
  setCategory: (category: string) => void;
  setAmountRange: (min: number | null, max: number | null) => void;
  toggleFilters: () => void;
  setQ: (query: string) => void;
  setTooltipOpen: (open: boolean) => void;
  setChannels: (channels: string[]) => void;
  setSalesTypes: (salesTypes: string[]) => void;
  clearFilters: () => void;
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  hasActiveFilters: () => boolean;
  getApiFilters: () => AppliedFilters;
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

// Provider
interface FiltersProviderProps {
  children: ReactNode;
}

export function FiltersProvider({ children }: FiltersProviderProps) {
  const [state, dispatch] = useReducer(filtersReducer, loadFiltersFromStorage());

  // Efecto para guardar filtros en localStorage cuando cambien
  useEffect(() => {
    saveFiltersToStorage(state);
  }, [state]);

  // Acciones memoizadas para evitar re-renders innecesarios
  const setRange = useCallback((range: RangeKey) => {
    dispatch({ type: 'SET_RANGE', payload: range });
  }, []);

  const setSearch = useCallback((search: string) => {
    dispatch({ type: 'SET_SEARCH', payload: search });
  }, []);

  const setDateRange = useCallback((start: string, end: string) => {
    dispatch({ type: 'SET_DATE_RANGE', payload: { start, end } });
  }, []);

  const setStatus = useCallback((status: string) => {
    dispatch({ type: 'SET_STATUS', payload: status });
  }, []);

  const setCategory = useCallback((category: string) => {
    dispatch({ type: 'SET_CATEGORY', payload: category });
  }, []);

  const setAmountRange = useCallback((min: number | null, max: number | null) => {
    dispatch({ type: 'SET_AMOUNT_RANGE', payload: { min, max } });
  }, []);

  const toggleFilters = useCallback(() => {
    dispatch({ type: 'TOGGLE_FILTERS' });
  }, []);

  const setQ = useCallback((query: string) => {
    dispatch({ type: 'SET_Q', payload: query });
  }, []);

  const setTooltipOpen = useCallback((open: boolean) => {
    dispatch({ type: 'SET_TOOLTIP_OPEN', payload: open });
  }, []);

  const setChannels = useCallback((channels: string[]) => {
    dispatch({ type: 'SET_CHANNELS', payload: channels });
  }, []);

  const setSalesTypes = useCallback((salesTypes: string[]) => {
    dispatch({ type: 'SET_SALES_TYPES', payload: salesTypes });
  }, []);

  const clearFilters = useCallback(() => {
    dispatch({ type: 'CLEAR_FILTERS' });
    // También limpiar localStorage
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const updateFilter = useCallback(<K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    dispatch({ type: 'UPDATE_FILTER', payload: { key, value } });
  }, []);

  const hasActiveFilters = useCallback(() => {
    return (
      state.search !== '' ||
      state.dateRange.start !== '' ||
      state.dateRange.end !== '' ||
      state.status !== '' ||
      state.category !== '' ||
      state.amountRange.min !== null ||
      state.amountRange.max !== null ||
      state.channels.length > 0 ||
      state.salesTypes.length > 0 ||
      state.q !== '' ||
      state.range !== 'month'
    );
  }, [state]);

  // Convertir filtros locales a formato de API
  const getApiFilters = useCallback((): AppliedFilters => {
    const apiFilters: AppliedFilters = {};
    
    // Rango de fechas
    if (state.dateRange.start && state.dateRange.end) {
      apiFilters.dateRange = {
        start: new Date(state.dateRange.start),
        end: new Date(state.dateRange.end),
      };
    }
    
    // Búsqueda
    if (state.q.trim()) {
      apiFilters.searchQuery = state.q.trim();
    }
    
    // Canales (métodos de pago)
    if (state.channels.length > 0) {
      apiFilters.paymentMethods = state.channels as any[];
    }
    
    // Tipos de venta
    if (state.salesTypes.length > 0) {
      apiFilters.salesTypes = state.salesTypes as any[];
    }
    
    // Rango de montos
    if (state.amountRange.min !== null || state.amountRange.max !== null) {
      apiFilters.amountRange = {
        min: state.amountRange.min || 0,
        max: state.amountRange.max || Number.MAX_SAFE_INTEGER,
      };
    }
    
    return apiFilters;
  }, [state]);

  const value: FiltersContextType = {
    state,
    setRange,
    setSearch,
    setDateRange,
    setStatus,
    setCategory,
    setAmountRange,
    toggleFilters,
    setQ,
    setTooltipOpen,
    setChannels,
    setSalesTypes,
    clearFilters,
    updateFilter,
    hasActiveFilters,
    getApiFilters,
  };

  return (
    <FiltersContext.Provider value={value}>
      {children}
    </FiltersContext.Provider>
  );
}

// Hook para usar el contexto
export function useFilters() {
  const context = useContext(FiltersContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FiltersProvider');
  }
  return context;
}

// Hook de conveniencia para acceder solo al estado
export function useFiltersState() {
  const { state } = useFilters();
  return state;
}

// Hook de conveniencia para acceder solo a las acciones
export function useFiltersActions() {
  const { 
    setRange, 
    setSearch, 
    setDateRange, 
    setStatus, 
    setCategory, 
    setAmountRange, 
    toggleFilters, 
    setQ, 
    setTooltipOpen, 
    setChannels, 
    clearFilters, 
    updateFilter, 
    hasActiveFilters, 
    getApiFilters 
  } = useFilters();
  
  return {
    setRange,
    setSearch,
    setDateRange,
    setStatus,
    setCategory,
    setAmountRange,
    toggleFilters,
    setQ,
    setTooltipOpen,
    setChannels,
    clearFilters,
    updateFilter,
    hasActiveFilters,
    getApiFilters,
  };
}
