import { useState, useCallback } from 'react';

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
}

const initialFilters: FilterState = {
  search: '',
  range: 'month',
  dateRange: {
    start: '',
    end: '',
  },
  status: '',
  category: '',
  amountRange: {
    min: null,
    max: null,
  },
};

export const useFilters = () => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [showFilters, setShowFilters] = useState(false);
  const [q, setQ] = useState('');

  const updateFilter = useCallback(<K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const updateSearch = useCallback((search: string) => {
    updateFilter('search', search);
  }, [updateFilter]);

  const updateDateRange = useCallback((start: string, end: string) => {
    updateFilter('dateRange', { start, end });
  }, [updateFilter]);

  const updateStatus = useCallback((status: string) => {
    updateFilter('status', status);
  }, [updateFilter]);

  const updateCategory = useCallback((category: string) => {
    updateFilter('category', category);
  }, [updateFilter]);

  const updateAmountRange = useCallback((min: number | null, max: number | null) => {
    updateFilter('amountRange', { min, max });
  }, [updateFilter]);

  const setRange = useCallback((range: RangeKey) => {
    updateFilter('range', range);
  }, [updateFilter]);

  const toggleFilters = useCallback(() => {
    setShowFilters(prev => !prev);
  }, []);

  const setSearchQuery = useCallback((query: string) => {
    setQ(query);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  const hasActiveFilters = useCallback(() => {
    return (
      filters.search !== '' ||
      filters.dateRange.start !== '' ||
      filters.dateRange.end !== '' ||
      filters.status !== '' ||
      filters.category !== '' ||
      filters.amountRange.min !== null ||
      filters.amountRange.max !== null
    );
  }, [filters]);

  return {
    filters,
    range: filters.range,
    setRange,
    showFilters,
    toggleFilters,
    q,
    setQ: setSearchQuery,
    updateFilter,
    updateSearch,
    updateDateRange,
    updateStatus,
    updateCategory,
    updateAmountRange,
    clearFilters,
    hasActiveFilters,
  };
};
