import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableClientes from '../components/TableClientes';
import ProfileCarteira from '../components/ProfileCarteira';
import { getClientes, getCarteira } from '../api';
import { Paper, Typography } from '@material-ui/core';
import EmptyTable from '../components/EmptyTable';
const styles = { emptyTable: { padding: 36, marginTop: 16 } };

class Carteira extends Component {
  state = {
    clientes: [],
    carteira: {}
  };

  componentDidMount() {
    console.log(this.props);

    if (this.props.match.params.gecex && this.props.match.params.carteira) {
      getCarteira(
        this.props.match.params.gecex,
        this.props.match.params.carteira
      )
        .then(response => response.json())
        .then(data => {
          this.setState({ carteira: data.carteira[0] });
        })
        .catch(function(err) {
          console.error(err);
        });

      getClientes(
        this.props.match.params.gecex,
        this.props.match.params.carteira
      )
        .then(response => response.json())
        .then(data => {
          this.setState({ clientes: data.clientes[0] });
        })
        .catch(function(err) {
          console.error(err);
        });
    }
  }

  render() {
    const { classes } = this.props;

    const { clientes, carteira } = this.state;
    return (
      <div>
        {carteira ? (
          <ProfileCarteira classes={classes} carteira={carteira} />
        ) : null}

        {clientes.length > 0 ? (
          <TableClientes data={clientes} />
        ) : (
          <EmptyTable msg={'Não há clientes'} />
        )}
      </div>
    );
  }
}

Carteira.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Carteira);
