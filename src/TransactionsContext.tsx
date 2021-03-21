import { createContext, ReactNode, useEffect, useState } from "react";

import { api } from "./services/api";

interface TransactionProps {
  id: number;
  title: string;
  amount: number;
  type: 'withdraw' | 'deposit';
  category: string;
  createdAt: string;
}

type TransactionInputProps = Omit<TransactionProps, 'id' | 'createdAt'>;

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: TransactionProps[];
  createTransaction: (transaction: TransactionInputProps) => void;
}

export const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export function TransactionsProvider({children}: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);
  
  function loadTrasactions() {
    api('transactions').then(({ data }) => setTransactions(data.transactions))
  }

  useEffect(() => {
    loadTrasactions()
  },[])

  function createTransaction(transaction: TransactionInputProps) {
    api.post('transaction', transaction) 
  }

  return (
    <TransactionsContext.Provider value={{transactions, createTransaction}}>
      {children}
    </TransactionsContext.Provider>
  )
}