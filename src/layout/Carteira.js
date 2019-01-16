import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableClientes from '../components/TableClientes';
import Grid from '@material-ui/core/Grid';
import { Typography, Avatar, Paper } from '@material-ui/core';

const styles = {
  cardProfileCarteira: {
    display: 'flex'
  },
  cardHeader: { background: '#1565c02e' },
  cardContent: {
    padding: 16,
    paddingTop: 36,
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  groupInformation: { display: 'flex', justifyContent: 'space-evenly' },
  cardLabel: { fontSize: 16, fontWeight: '500' },
  cardInformation: { fontSize: 16 },
  bigAvatar: {
    marginTop: 0,
    marginLeft: 24,
    bottom: -24,
    width: 100,
    height: 100
  }
};

class Carteira extends Component {
  state = {
    clientes: [],
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
        <Paper>
          <div className={classes.cardHeader}>
            <Avatar
              className={classes.bigAvatar}
              alt={carteira.chave}
              src={
                'https://humanograma.intranet.bb.com.br/avatar/' +
                carteira.chave
              }
            />
          </div>

          <div className={classes.cardContent}>
            <div className={classes.groupInformation}>
              <Typography className={classes.cardLabel}>Carteira:</Typography>

              <Typography className={classes.cardInformation}>
                {carteira.id}
              </Typography>
            </div>
            <div className={classes.groupInformation}>
              <Typography className={classes.cardLabel}>Genin:</Typography>

              <Typography className={classes.cardInformation}>
                {carteira.genin}
              </Typography>
            </div>
            <div className={classes.groupInformation}>
              <Typography className={classes.cardLabel}>Gecex:</Typography>

              <Typography className={classes.cardInformation}>
                {carteira.gecex}
              </Typography>
            </div>
            <div className={classes.groupInformation}>
              <Typography className={classes.cardLabel}>Segmento:</Typography>

              <Typography className={classes.cardInformation}>
                {carteira.segmento}
              </Typography>
            </div>
            <div className={classes.groupInformation}>
              <Typography className={classes.cardLabel}>
                Data Criação:
              </Typography>

              <Typography className={classes.cardInformation}>
                {carteira.dt_create}
              </Typography>
            </div>
            <div className={classes.groupInformation}>
              <Typography className={classes.cardLabel}>
                Quantidade de Clientes:
              </Typography>

              <Typography className={classes.cardInformation}>
                {carteira.dt_create}
              </Typography>
            </div>
            <div className={classes.groupInformation}>
              <Typography className={classes.cardLabel}>
                Novos Clientes 30 dias:
              </Typography>

              <Typography className={classes.cardInformation}>
                {carteira.clientes_novos_30}
              </Typography>
            </div>
            <div className={classes.groupInformation}>
              <Typography className={classes.cardLabel}>
                Informativo:
              </Typography>

              <Typography className={classes.cardInformation}>
                {carteira.calc_infor}
              </Typography>
            </div>
          </div>
        </Paper>
        <Grid />

        {clientes ? <TableClientes data={clientes} /> : null}
      </div>
    );
  }
}

Carteira.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Carteira);
