import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs'
import { App } from './App';


createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelance site',
          amount: 4000,
          type: 'deposit',
          category: 'Dev',
          createdAt: new Date('2021-02-12 09:00:00')
        },
        {
          id: 2,
          title: 'Almoço',
          amount: 40,
          type: 'withdraw',
          category: 'Alimentação',
          createdAt: new Date('2021-02-12 12:00:00')
        },
        {
          id: 3,
          title: 'Salário',
          amount: 12000,
          type: 'deposit',
          category: 'Dev',
          createdAt: new Date('2021-03-01 09:00:00')
        },
        {
          id: 4,
          title: 'Aluguel',
          amount: 1000,
          type: 'withdraw',
          category: 'Moradia',
          createdAt: new Date('2021-03-10 12:00:00')
        }
      ]
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })

    this.post('transaction', (schema, request) => {
      const data = JSON.parse(request.requestBody)

      return schema.create('transaction', {...data, createdAt: new Date()})
    })
  }
})
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
