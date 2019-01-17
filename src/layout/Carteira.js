import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableClientes from '../components/TableClientes';
import ProfileCarteira from '../components/ProfileCarteira';
const styles = {};

class Carteira extends Component {
  state = {
    clientes: [{ id: 1, nome: 'Verde' }, { id: 2, nome: 'Azul' }],
    carteira: {
      id: 1,
      gecex: 'ff',
      solicitacoes: 3,
      genin: 'Azul',
      chave: 'F1522457',
      qtd_clientes: '80',
      segmento: 'Private',
      dt_create: '11/22/199',
      calc_infor: 8.9,
      clientes_novos_30: 8
    }
  };

  render() {
    const { classes } = this.props;
    const { carteira, clientes } = this.state;
    return (
      <div>
        <ProfileCarteira classes={classes} carteira={carteira} />

        {clientes.length > 0 ? <TableClientes data={clientes} /> : null}
      </div>
    );
  }
}

Carteira.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Carteira);
