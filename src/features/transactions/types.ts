// Tipos de dominio para el feature de transacciones

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  description: string;
  category: TransactionCategory;
  status: TransactionStatus;
  type: TransactionType;
  date: string;
  createdAt: string;
  updatedAt: string;
  metadata?: TransactionMetadata;
}

export type TransactionStatus = 
  | 'pending'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'refunded';

export type TransactionType = 
  | 'income'
  | 'expense'
  | 'transfer';

export interface TransactionCategory {
  id: string;
  name: string;
  color: string;
  icon?: string;
}

export interface TransactionMetadata {
  source?: string;
  reference?: string;
  tags?: string[];
  notes?: string;
  attachments?: string[];
}

export interface TransactionFilters {
  search?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  status?: TransactionStatus;
  type?: TransactionType;
  category?: string;
  amountRange?: {
    min: number;
    max: number;
  };
}

export interface TransactionSummary {
  totalIncome: number;
  totalExpenses: number;
  netAmount: number;
  transactionCount: number;
  period: {
    start: string;
    end: string;
  };
}

export interface CreateTransactionRequest {
  amount: number;
  currency: string;
  description: string;
  categoryId: string;
  type: TransactionType;
  date: string;
  metadata?: Partial<TransactionMetadata>;
}

export interface UpdateTransactionRequest extends Partial<CreateTransactionRequest> {
  id: string;
}

export interface TransactionResponse {
  transaction: Transaction;
  message?: string;
}

export interface TransactionListResponse {
  transactions: Transaction[];
  total: number;
  page: number;
  limit: number;
  summary?: TransactionSummary;
}
