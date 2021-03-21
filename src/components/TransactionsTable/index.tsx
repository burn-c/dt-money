import { Container } from './styles'

import { formatNumberToCurrencyBRL } from '../../helpers/formatters';
import { useTransactions } from '../../hooks/useTransactions';

export function TransactionsTable() {
  const { transactions } = useTransactions();

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
                    {formatNumberToCurrencyBRL(amount)}
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
