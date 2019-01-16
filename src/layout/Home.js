import React, { Component } from 'react';
import Dashboard from './Dashboard';
import TableCarteiras from '../components/TableCarteiras';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      carteiras: [
        {
          id: 1,
          gecex: 'ff',
          solicitacoes: 3,
          genin: 'Azul',
          qtd_clientes: '80'
        },
        {
          id: 2,
          gecex: 'ff',
          solicitacoes: 8,
          genin: 'Vermelho',
          qtd_clientes: '70'
        }
      ]
    };
  }
  render() {
    const { carteiras } = this.state;
    return (
      <div>
        <Dashboard dados={'dados'} />
        {carteiras.length > 0 ? <TableCarteiras data={carteiras} /> : null}
      </div>
    );
  }
}

export default Home;
