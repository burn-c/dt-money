import { useContext } from 'react'

import { Container } from './styles'

import { TransactionsContext } from '../../TransactionsContext';
import { formatNumberToCurrencyBRL } from '../../helpers/formatters';

export function TransactionsTable() {
  const { transactions } = useContext(TransactionsContext);

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
