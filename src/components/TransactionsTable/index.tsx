
import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { Container } from './styles'

interface TransactionProps {
  id: number;
  title: string;
  amount: number;
  type: 'withdraw' | 'deposit';
  category: string;
  createdAt: string;
}

export function TransactionsTable() {
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);
  
  function loadTrasactions() {
    api('transactions').then(({ data }) => setTransactions(data.transactions))
  }

  useEffect(() => {
    loadTrasactions()
  },[])

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map(({id, title, amount, category, createdAt, type}) => 
              (
                <tr key={id}>
                  <td>{title}</td>
                  <td className={type}>
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                      }).format(amount)
                    }
                  </td>
                  <td>{category}</td>
                  <td>
                    {new Intl.DateTimeFormat('pt-BR').format(new Date(createdAt))}
                  </td>
                </tr>
              )
            )
          }
        </tbody>
      </table>
    </Container>
  )
}
