import React, { Component } from 'react';

import TableClientes from '../components/TableClientes';
import ProfileCarteira from '../components/ProfileCarteira';
import { Grid, Typography, Button, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

import {
  addSelectedClients,
  deleteSelectedClients,
  getSelectedClients
} from '../actions/clientesActions';
import { connect } from 'react-redux';
import TableClientesSelected from '../components/TableClientesSelected';

const styles = theme => ({});

class Solicitacoes extends Component {
  constructor() {
    super();
    this.state = {
      /* clientes: [{ id: 1, nome: 'Verde' }, { id: 2, nome: 'Azul' }],*/
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

  componentDidMount() {
    this.props.getSelectedClients();
  }
  removeCliente = () => {
    console.log('removeCliente em Solicitacoes');
  };
  render() {
    const { classes, selectedClients } = this.props;
    const { carteiras } = this.state;

    return (
      <div>
        <Typography variant="h4">Solicitações </Typography>
        <Typography variant="h6">Clientes </Typography>
        <Grid container spacing={8}>
          <Grid item lg={12}>
            {selectedClients.length > 0 ? (
              <TableClientesSelected
                data={selectedClients}
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

Solicitacoes.propTypes = {
  classes: PropTypes.object.isRequired,
  addSelectedClients: PropTypes.func.isRequired,
  deleteSelectedClients: PropTypes.func.isRequired,
  getSelectedClients: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  selectedClients: state.clientes.selectedClients
});

export default connect(
  mapStateToProps,
  { addSelectedClients, getSelectedClients, deleteSelectedClients }
)(withStyles(styles)(Solicitacoes));
