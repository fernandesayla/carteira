import React, { Component } from 'react';

import './App.css';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import AppNavbar from './layout/AppNavbar';
import DrawerMenu from './layout/Drawer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CadastraCarteira from './layout/CadastraCarteira';
import Home from './layout/Home';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Carteira from './layout/Carteira';
import Solicitacoes from './layout/Solicitacoes';
import { autentica } from './api';
const styles = theme => ({
  root: {
    display: 'flex'
  },
  content: {
    flexGrow: 1,
    paddingTop: 90,
    padding: theme.spacing.unit * 3
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: 240,
      flexShrink: 0
    }
  }
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mobileOpen: false,
      user: { chave: 'F1522457' },
      token: '',
      autenticado: ''
    };
  }

  componentWillMount() {
    console.log(autentica());
  }
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    const { classes } = this.props;
    const { user, mobileOpen } = this.state;

    return (
      <div className={classes.root}>
        <Router>
          <MuiThemeProvider theme={theme}>
            <AppNavbar
              handleDrawerToggle={this.handleDrawerToggle}
              user={user}
              mobileOpen={mobileOpen}
            />
            <nav className={classes.drawer}>
              <DrawerMenu
                handleDrawerToggle={this.handleDrawerToggle}
                user={user}
                mobileOpen={mobileOpen}
              />
            </nav>
            <main className={classes.content}>
              <Switch>
                <Route exact path="/carteira" component={Home} />
                <Route
                  exact
                  path="/carteira/cadastrar"
                  component={CadastraCarteira}
                />
                <Route exact path="/carteira/lista" component={Carteira} />
                <Route
                  exact
                  path="/carteira/solicitacoes"
                  component={Solicitacoes}
                />
              </Switch>
            </main>
          </MuiThemeProvider>
        </Router>
      </div>
    );
  }
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1565c0',
      dark: '#0d47a1'
    },
    secondary: {
      main: '#FEDA19'
    }
  }
});

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
