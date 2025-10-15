// Tipos para la API de Bold
export interface Transaction {
  id: string;
  status: 'SUCCESSFUL' | 'REJECTED' | 'PENDING';
  paymentMethod: 'BANCOLOMBIA' | 'DAVIPLATA' | 'NEQUI' | 'CARD' | 'PSE';
  salesType: 'PAYMENT_LINK' | 'TERMINAL';
  createdAt: number; // timestamp en milisegundos
  transactionReference: number;
  amount: number;
  deduction?: number; // opcional, solo para algunas transacciones
  franchise?: 'VISA' | 'MASTERCARD'; // opcional, solo para transacciones con tarjeta
}

export interface ApiResponse {
  data: Transaction[];
}

// Tipos para filtros
export type PaymentMethod = Transaction['paymentMethod'];
export type SalesType = Transaction['salesType'];
export type TransactionStatus = Transaction['status'];

// Tipos para estadísticas
export interface TransactionStats {
  totalAmount: number;
  totalTransactions: number;
  successfulTransactions: number;
  rejectedTransactions: number;
  totalDeductions: number;
}

// Tipos para filtros aplicados
export interface AppliedFilters {
  dateRange?: {
    start: Date;
    end: Date;
  };
  paymentMethods?: PaymentMethod[];
  salesTypes?: SalesType[];
  statuses?: TransactionStatus[];
  amountRange?: {
    min: number;
    max: number;
  };
  searchQuery?: string;
}
