import React, { Component } from 'react';

import TableClientes from '../components/TableClientes';
import ProfileCarteira from '../components/ProfileCarteira';
import { Grid, Typography, Button } from '@material-ui/core';
class Solicitacoes extends Component {
  constructor() {
    super();
    this.state = {
      clientes: [{ id: 1, nome: 'Verde' }, { id: 2, nome: 'Azul' }],
      carteiras: [
        {
          id: 1,
          gecex: 'ff',
          solicitacoes: 3,
          genin: 'Azul',
          chave: 'F1522457',
          qtd_clientes: '80',
          segmento: 'Private',
          dt_create: '11/22/199',
          calc_infor: 8.9,
          clientes_novos_30: 8,
          cidades: 'SÃO PAULO ',
          bairros: 'BRÁS, JARDIM'
        },
        {
          id: 2,
          gecex: 'ff',
          solicitacoes: 3,
          genin: 'Azul',
          chave: 'F1522457',
          qtd_clientes: '80',
          segmento: 'Private',
          dt_create: '11/22/199',
          calc_infor: 8.9,
          clientes_novos_30: 8,
          cidades: 'CAMPINAS, SOROCABA',
          bairro: 'BRÁS, CENTRO'
        }
      ]
    };
  }
  removeCliente = () => {
    console.log('removeCliente em Solicitacoes');
  };
  render() {
    const { classes } = this.props;
    const { carteiras, clientes } = this.state;

    return (
      <div>
        <Typography variant="h4">Solicitações </Typography>
        <Typography variant="h6">Clientes </Typography>
        <Grid container spacing={8}>
          <Grid item lg={12}>
            {clientes.length > 0 ? (
              <TableClientes
                data={clientes}
                method={{ icon: 'delete', method: this.removeCliente }}
              />
            ) : null}
          </Grid>
          {carteiras.length > 0 ? (
            <Grid container spacing={8}>
              <Grid item lg={12}>
                <Typography variant="h6">Comparativo das Carteiras </Typography>
              </Grid>
              {carteiras.map(carteira => (
                <Grid item key={carteira.id} lg>
                  <ProfileCarteira classes={classes} carteira={carteira} />
                </Grid>
              ))}
            </Grid>
          ) : null}
          <Grid item lg={12}>
            <Button
              color="primary"
              fullWidth
              variant="contained"
              style={{ marginTop: '24px' }}
            >
              Confirmar Solicitações
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Solicitacoes;
