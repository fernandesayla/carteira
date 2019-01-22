import React, { Component } from 'react';

import './App.css';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import AppNavbar from './layout/AppNavbar';
import DrawerMenu from './layout/Drawer';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import CadastraCarteira from './layout/CadastraCarteira';
import Home from './layout/Home';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Carteira from './layout/Carteira';
import Solicitacoes from './layout/Solicitacoes';
import { isUCE, autentica } from './auth';

const styles = theme => ({
  root: {
    display: 'flex'
  },
  content: {
    flexGrow: 1,
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing.unit * 25,
      paddingTop: 90
    },
    padding: theme.spacing.unit,
    paddingTop: 90
  }
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mobileOpen: false,
      user: {},
      token: '',
      autenticado: ''
    };
  }

  componentWillMount() {
    autentica()
      .then(response => {
        if (response.status > 350) {
          this.setState({ autenticado: false });
          /*   window.location =
          'https://login.intranet.bb.com.br/distAuth/UI/Login?goto=https://uce.intranet.bb.com.br/carteira/';*/
        }

        if (response.headers.get('x-access-token') != null) {
          window.sessionStorage.token = response.headers.get('x-access-token');
        }

        return response.json();
      })
      .then(data => {
        this.setState({ user: data.user[0] });

        this.setState({ autenticado: true });
      })

      .catch(function(err) {
        return false;
        /* window.location =
          'https://login.intranet.bb.com.br/distAuth/UI/Login?goto=https://uce.intranet.bb.com.br/carteira/';*/
      });
  }
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    const { classes } = this.props;
    const { user, mobileOpen } = this.state;

    return (
      <div className={classes.root}>
        <Router initialEntries={[`/carteira`]} initialIndex={0}>
          <MuiThemeProvider theme={theme}>
            <AppNavbar
              handleDrawerToggle={this.handleDrawerToggle}
              user={user}
              mobileOpen={mobileOpen}
            />
            <nav>
              <DrawerMenu
                handleDrawerToggle={this.handleDrawerToggle}
                user={user}
                mobileOpen={mobileOpen}
              />
            </nav>
            <main className={classes.content}>
              <Switch>
                <Route
                  exact
                  path="/carteira/"
                  render={() =>
                    user.prefixo ? (
                      <Redirect to={`/carteira/${user.prefixo}`} />
                    ) : null
                  }
                />
                <Route
                  exact
                  path="/carteira/:prefixo"
                  render={props =>
                    this.state.autenticado ? (
                      <Home user={user} {...props} />
                    ) : null
                  }
                />
                <Route
                  exact
                  path="/carteira/cadastrar"
                  component={isUCE(user) ? CadastraCarteira : null}
                />
                <Route
                  exact
                  path="/carteira/:gecex/:carteira"
                  component={Carteira}
                />
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
