import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar } from '@material-ui/core';
import PropTypes from 'prop-types';
import logo from '../assets/images/bancodobrasil.png';
import { withStyles } from '@material-ui/core/styles';
import {
  Drawer,
  List,
  ListItem,
  Hidden,
  ListItemText
} from '@material-ui/core';
import { Link } from 'react-router-dom';
const drawerWidth = 240;

const styles = theme => ({
  title: {
    flexGrow: 1
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  drawerPaper: {
    width: drawerWidth,
    paddingTop: 70
  }
});

class DrawerMenu extends React.Component {
  render() {
    const { classes, mobileOpen, handleDrawerToggle } = this.props;

    const drawer = (
      <div>
        <List>
          <Link to="/carteira" className="nav-link">
            <ListItem button>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
          <Link to="/carteira/cadastrar" className="nav-link">
            <ListItem button>
              <ListItemText primary="Cadastrar" />
            </ListItem>
          </Link>
        </List>
      </div>
    );

    return (
      <div>
        <Hidden smUp implementation="css">
          <Drawer
            container={this.props.container}
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <AppBar className={classes.appBar}>
              <Toolbar>
                <img style={{ margin: 8 }} src={logo} alt="BB" />
              </Toolbar>
            </AppBar>
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            <AppBar className={classes.appBar}>
              <Toolbar>
                <img style={{ margin: 8 }} src={logo} alt="BB" />
              </Toolbar>
            </AppBar>
            {drawer}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

DrawerMenu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DrawerMenu);
