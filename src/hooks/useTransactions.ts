import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Transaction, TransactionStats } from '@/types/api';
import { TransactionsApiService, ApiError } from '@/services/transactionsApi';
import { useFilters } from '@/stores/FiltersContext';

interface UseTransactionsReturn {
  // Datos
  transactions: Transaction[];
  filteredTransactions: Transaction[];
  stats: TransactionStats;
  
  // Estados de carga
  isLoading: boolean;
  error: string | null;
  
  // Acciones
  refreshTransactions: () => Promise<void>;
  
  // Utilidades
  hasActiveFilters: boolean;
}

export const useTransactions = (): UseTransactionsReturn => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getApiFilters } = useFilters();

  // Función para cargar transacciones
  const loadTransactions = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const data = await TransactionsApiService.getTransactions();
      setTransactions(data);
    } catch (err) {
      const errorMessage = err instanceof ApiError 
        ? err.message 
        : 'Error al cargar las transacciones';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Cargar transacciones al montar el componente
  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  // Aplicar filtros a las transacciones
  const filteredTransactions = useMemo(() => {
    const apiFilters = getApiFilters();
    
    if (!apiFilters || Object.keys(apiFilters).length === 0) {
      return transactions;
    }

    return TransactionsApiService.filterTransactions(transactions, apiFilters);
  }, [transactions, getApiFilters]);

  // Calcular estadísticas
  const stats = useMemo((): TransactionStats => {
    const successful = filteredTransactions.filter(t => t.status === 'SUCCESSFUL');
    const rejected = filteredTransactions.filter(t => t.status === 'REJECTED');
    
    return {
      totalAmount: successful.reduce((sum, t) => sum + t.amount, 0),
      totalTransactions: filteredTransactions.length,
      successfulTransactions: successful.length,
      rejectedTransactions: rejected.length,
      totalDeductions: filteredTransactions.reduce((sum, t) => sum + (t.deduction || 0), 0),
    };
  }, [filteredTransactions]);

  // Verificar si hay filtros activos
  const hasActiveFilters = useMemo(() => {
    const apiFilters = getApiFilters();
    return Object.keys(apiFilters).length > 0 && Object.values(apiFilters).some(value => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      if (typeof value === 'object' && value !== null) {
        return Object.values(value).some(v => v !== null && v !== undefined && v !== '');
      }
      return value !== null && value !== undefined && value !== '';
    });
  }, [getApiFilters]);

  // Función para refrescar transacciones
  const refreshTransactions = useCallback(async () => {
    await loadTransactions();
  }, [loadTransactions]);

  return {
    transactions,
    filteredTransactions,
    stats,
    isLoading,
    error,
    refreshTransactions,
    hasActiveFilters,
  };
};
