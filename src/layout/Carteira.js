import React, { Component } from 'react';

import TableClientes from '../components/TableClientes';
import Grid from '@material-ui/core/Grid';

class Carteira extends Component {
  constructor() {
    super();
    this.state = {
      carteira: {
        id: 1,
        gecex: 'ff',
        solicitacoes: 3,
        genin: 'Azul',
        qtd_clientes: '80'
      },
      clientes: []
    };
  }
  render() {
    const { carteira, clientes } = this.state;
    return (
      <div>
        <Grid>{carteira.id}</Grid>

        {clientes ? <TableClientes data={clientes} /> : null}
      </div>
    );
  }
}

export default Carteira;
