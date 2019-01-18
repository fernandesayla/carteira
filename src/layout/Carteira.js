import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableClientes from '../components/TableClientes';
import ProfileCarteira from '../components/ProfileCarteira';
const styles = {};

class Carteira extends Component {
  state = {
    clientes: []
  };

  componentDidMount() {
    if (this.props.carteira)
      this.setState({
        clientes: [{ id: 1, nome: 'Verde' }, { id: 2, nome: 'Azul' }]
      });
  }

  render() {
    const { classes, carteira } = this.props;
    console.log(this.props);

    const { clientes } = this.state;
    return (
      <div>
        {carteira ? (
          <ProfileCarteira classes={classes} carteira={carteira} />
        ) : null}

        {clientes.length > 0 ? <TableClientes data={clientes} /> : null}
      </div>
    );
  }
}

Carteira.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Carteira);
