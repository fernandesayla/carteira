import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { Grid, Card } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CardIcon from '../components/CardIcon';
import { DoneAll, Schedule, Phone } from '@material-ui/icons';

const styles = theme => ({
  cardCategory: {
    margin: 0,
    fontSize: '18px',
    padding: 10,
    paddingLeft: 0
  },
  cardTitle: {
    paddingRight: '10px',
    paddingBottom: '10px'
  },
  grupo: { marginTop: 20 },
  card: {
    overflow: 'inherit',
    textAlign: 'right'
  }
});

class Dashboard extends Component {
  render() {
    const { classes, dados } = this.props;

    return (
      <Fragment>
        <Grid container spacing={8}>
          <Grid item xs={12} md={4} lg>
            <div className={classes.grupo}>
              <CardIcon bgColor="#FF6F00" Icon={Schedule} />
              <Card className={classes.card}>
                <Typography className={classes.cardCategory}>
                  Total de Gecex
                </Typography>
                <Typography variant="h4" className={classes.cardTitle}>
                  {dados.gecex}
                </Typography>
              </Card>
            </div>
          </Grid>

          <Grid item xs={12} md={4} lg>
            <div className={classes.grupo}>
              <CardIcon bgColor="#43A047" Icon={DoneAll} />
              <Card className={classes.card}>
                <Typography className={classes.cardCategory}>
                  Total de Carteiras
                </Typography>
                <Typography variant="h4" className={classes.cardTitle}>
                  {dados.carteiras}
                </Typography>
              </Card>
            </div>
          </Grid>

          <Grid item xs={12} md={4} lg>
            <div className={classes.grupo}>
              <CardIcon bgColor="#6a1b9a" Icon={Phone} />

              <Card className={classes.card}>
                <Typography className={classes.cardCategory}>
                  Total de Clientes
                </Typography>
                <Typography variant="h4" className={classes.cardTitle}>
                  {dados.clientes}
                </Typography>
              </Card>
            </div>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Dashboard);
