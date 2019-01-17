import React from 'react';
import { Typography, Avatar, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  cardProfileCarteira: {
    display: 'flex',
    flexDirection: 'column'
  },
  cardHeader: { background: '#1565c02e' },
  cardContent: {
    padding: 16,
    paddingTop: 36,
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'column'
  },
  parentGroupInformation: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: 36
  },
  groupInformation: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    flexGrow: 1,
    marginRight: 26
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: '500',
    flexGrow: 1,
    borderBottom: '1px solid #e0e0e0'
  },
  cardInformation: {
    fontSize: 16,
    flexGrow: 1,
    borderBottom: '1px solid #e0e0e0'
  },
  bigAvatar: {
    marginTop: 0,
    marginLeft: 24,
    bottom: -24,
    width: 100,
    height: 100
  }
};

const ProfileCarteira = props => {
  const { carteira, classes } = props;
  return (
    <Paper>
      <div className={classes.cardHeader}>
        <Avatar
          className={classes.bigAvatar}
          alt={carteira.chave}
          src={
            'https://humanograma.intranet.bb.com.br/avatar/' + carteira.chave
          }
        />
      </div>

      <div className={classes.cardContent}>
        <div className={classes.parentGroupInformation}>
          <div className={classes.groupInformation}>
            <Typography className={classes.cardLabel}>Gecex</Typography>
            <Typography className={classes.cardInformation}>
              {carteira.gecex}
            </Typography>
          </div>
          <div className={classes.groupInformation}>
            <Typography className={classes.cardLabel}>Carteira</Typography>
            <Typography className={classes.cardInformation}>
              {carteira.id}
            </Typography>
          </div>
          <div className={classes.groupInformation}>
            <Typography className={classes.cardLabel}>Genin</Typography>
            <Typography className={classes.cardInformation}>
              {carteira.genin}
            </Typography>
          </div>

          <div className={classes.groupInformation}>
            <Typography className={classes.cardLabel}>Data Criação</Typography>
            <Typography className={classes.cardInformation}>
              {carteira.dt_create}
            </Typography>
          </div>
        </div>

        <div className={classes.parentGroupInformation}>
          <div className={classes.groupInformation}>
            <Typography className={classes.cardLabel}>Segmento</Typography>

            <Typography className={classes.cardInformation}>
              {carteira.segmento}
            </Typography>
          </div>

          <div className={classes.groupInformation}>
            <Typography className={classes.cardLabel}>
              Quantidade de Clientes
            </Typography>

            <Typography className={classes.cardInformation}>
              {carteira.dt_create}
            </Typography>
          </div>
          <div className={classes.groupInformation}>
            <Typography className={classes.cardLabel}>
              Novos Clientes 30 dias
            </Typography>

            <Typography className={classes.cardInformation}>
              {carteira.clientes_novos_30}
            </Typography>
          </div>
          <div className={classes.groupInformation}>
            <Typography className={classes.cardLabel}>Informativo</Typography>

            <Typography className={classes.cardInformation}>
              {carteira.calc_infor}
            </Typography>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default withStyles(styles)(ProfileCarteira);
