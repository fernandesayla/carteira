import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar, Typography, Avatar, IconButton } from '@material-ui/core';
import logo from '../../assets/images/bancodobrasil.png';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
const styles = theme => ({
  title: {
    flexGrow: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  }
});

const AppNavbar = props => {
  const { classes } = props;
  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          /* onClick={this.handleDrawerToggle}*/
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <img style={{ margin: 8 }} src={logo} alt="BB" />
        <Typography variant="h4" color="inherit" className={classes.title}>
          Gestão de Carteiras
        </Typography>
        <Avatar
          alt="{this.props.user.chave}"
          src={
            'https://humanograma.intranet.bb.com.br/avatar/' + props.user.chave
          }
        />
      </Toolbar>
    </AppBar>
  );
};

AppNavbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppNavbar);
