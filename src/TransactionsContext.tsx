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

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext<TransactionProps[]>([]);

export function TransactionsProvider({children}: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);
  
  function loadTrasactions() {
    api('transactions').then(({ data }) => setTransactions(data.transactions))
  }

  useEffect(() => {
    loadTrasactions()
  },[])

  return (
    <TransactionsContext.Provider value={transactions}>
      {children}
    </TransactionsContext.Provider>
  )
}