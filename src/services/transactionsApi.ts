import type { Transaction, ApiResponse } from '@/types/api';

const API_BASE_URL = 'https://bold-fe-api.vercel.app/api';

// Clase para manejar errores de API
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public statusText: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Servicio para manejar las llamadas a la API
export class TransactionsApiService {
  private static async fetchWithErrorHandling<T>(
    url: string,
    options?: RequestInit
  ): Promise<T> {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        throw new ApiError(
          `HTTP Error: ${response.status}`,
          response.status,
          response.statusText
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      // Manejar errores de red u otros errores
      throw new ApiError(
        'Error de conexión. Por favor, verifica tu conexión a internet.',
        0,
        'Network Error'
      );
    }
  }

  // Obtener todas las transacciones
  static async getTransactions(): Promise<Transaction[]> {
    const response = await this.fetchWithErrorHandling<ApiResponse>(API_BASE_URL);
    return response.data;
  }

  // Método para simular filtrado en el frontend (ya que la API no tiene filtros)
  static filterTransactions(
    transactions: Transaction[],
    filters: {
      dateRange?: { start: Date; end: Date };
      paymentMethods?: string[];
      salesTypes?: string[];
      statuses?: string[];
      amountRange?: { min: number; max: number };
      searchQuery?: string;
    }
  ): Transaction[] {
    return transactions.filter((transaction) => {
      // Filtro por rango de fechas
      if (filters.dateRange) {
        const transactionDate = new Date(transaction.createdAt);
        if (
          transactionDate < filters.dateRange.start ||
          transactionDate > filters.dateRange.end
        ) {
          return false;
        }
      }

      // Filtro por métodos de pago
      if (filters.paymentMethods && filters.paymentMethods.length > 0) {
        if (!filters.paymentMethods.includes(transaction.paymentMethod)) {
          return false;
        }
      }

      // Filtro por tipos de venta
      if (filters.salesTypes && filters.salesTypes.length > 0) {
        if (!filters.salesTypes.includes(transaction.salesType)) {
          return false;
        }
      }

      // Filtro por estados
      if (filters.statuses && filters.statuses.length > 0) {
        if (!filters.statuses.includes(transaction.status)) {
          return false;
        }
      }

      // Filtro por rango de montos
      if (filters.amountRange) {
        if (
          transaction.amount < filters.amountRange.min ||
          transaction.amount > filters.amountRange.max
        ) {
          return false;
        }
      }

      // Filtro por búsqueda (ID de transacción o referencia)
      if (filters.searchQuery) {
        const searchLower = filters.searchQuery.toLowerCase();
        const idMatch = transaction.id.toLowerCase().includes(searchLower);
        const refMatch = transaction.transactionReference
          .toString()
          .includes(searchLower);
        
        if (!idMatch && !refMatch) {
          return false;
        }
      }

      return true;
    });
  }
}

// Utilidades para formatear datos
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat('es-CO', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
};

export const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat('es-CO', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date);
};

export const formatPaymentMethod = (method: string): string => {
  const methodMap: Record<string, string> = {
    BANCOLOMBIA: 'Bancolombia',
    DAVIPLATA: 'Daviplata',
    NEQUI: 'Nequi',
    CARD: 'Tarjeta',
    PSE: 'PSE',
  };
  return methodMap[method] || method;
};

export const formatSalesType = (type: string): string => {
  const typeMap: Record<string, string> = {
    PAYMENT_LINK: 'Link de pago',
    TERMINAL: 'Datáfono',
  };
  return typeMap[type] || type;
};

export const getStatusColor = (status: string): string => {
  const colorMap: Record<string, string> = {
    SUCCESSFUL: 'text-green-600 bg-green-100',
    REJECTED: 'text-red-600 bg-red-100',
    PENDING: 'text-yellow-600 bg-yellow-100',
  };
  return colorMap[status] || 'text-gray-600 bg-gray-100';
};

export const getStatusText = (status: string): string => {
  const statusMap: Record<string, string> = {
    SUCCESSFUL: 'Cobro exitoso',
    REJECTED: 'Cobro no realizado',
    PENDING: 'Cobro pendiente',
  };
  return statusMap[status] || status;
};
