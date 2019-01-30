import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableClientes from '../components/TableClientes';
import ProfileCarteira from '../components/ProfileCarteira';
import { getClientes } from '../actions/clientesActions';
import { getCarteira } from '../actions/carteiraActions';
import { connect } from 'react-redux';

import EmptyTable from '../components/EmptyTable';
const styles = { emptyTable: { padding: 36, marginTop: 16 } };

class Carteira extends Component {
  componentDidMount() {
    const { gecex, carteira } = this.props.match.params;

    if (gecex && carteira) {
      this.props.getCarteira(gecex, carteira);
      this.props.getClientes(gecex, carteira);
    }
  }

  render() {
    const { classes, carteira, clientes } = this.props;

    return (
      <div>
        {carteira ? (
          <ProfileCarteira classes={classes} carteira={carteira} />
        ) : null}

        {clientes.length > 0 ? (
          <TableClientes data={clientes} {...this.props} />
        ) : (
          <EmptyTable msg={'Não há clientes'} />
        )}
      </div>
    );
  }
}

Carteira.propTypes = {
  classes: PropTypes.object.isRequired,
  getCarteira: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  carteira: state.carteira.carteira,
  clientes: state.clientes.clientes
});
export default connect(
  mapStateToProps,
  { getCarteira, getClientes }
)(withStyles(styles)(Carteira));
