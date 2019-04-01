import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
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
import Carteiras from './layout/Carteiras';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Carteira from './layout/Carteira';
import Solicitacoes from './layout/solicitacoes/Solicitacoes';
import Validacoes from './layout/Validacoes';

import { isUCE, autentica } from './auth';
import { Typography } from '@material-ui/core';

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
      autenticado: '',
      message: '',
      messageType: ''
    };
  }

  componentWillMount() {
    const { message, messageType } = this.state;

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
      .catch(error => {
        this.setState({
          message:
            'Não foi possivel logar no servidor remoto, por favor, contatar UCE'
        });
        console.error('Error:', error);
        /*  this.setMessage();*/
        /* return message ? (
          <Alert message={message} messageType={messageType} />
        ) : null;
*/
        window.location =
          'https://login.intranet.bb.com.br/distAuth/UI/Login?goto=https://uce.intranet.bb.com.br/homolog-carteira/';
      });
  }

  setMessage = (message, messageType) => {
    this.setState({ message: message, messageType: 'error' });
  };
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    const { classes } = this.props;
    const { mobileOpen, message, messageType, user } = this.state;
    const path = '/homolog-carteira';
    /*  const path = '/carteira'; desmarcar para produção  */
    return (
      <Provider store={store}>
        <Router initialEntries={[path]} initialIndex={0}>
          <MuiThemeProvider theme={theme}>
            <div className={classes.root}>
              {message ? (
                <Typography variant="subtitle1">{message}</Typography>
              ) : null}
              <AppNavbar
                handleDrawerToggle={this.handleDrawerToggle}
                user={user}
                mobileOpen={mobileOpen}
              />
              <nav>
                <DrawerMenu
                  handleDrawerToggle={this.handleDrawerToggle}
                  user={user}
                  path={path}
                  mobileOpen={mobileOpen}
                />
              </nav>
              <main className={classes.content}>
                <Switch>
                  <Route
                    exact
                    path={`${path}/`}
                    render={() =>
                      user.prefixo ? (
                        <Redirect to={`${path}/${user.prefixo}`} />
                      ) : null
                    }
                  />
                  <Route
                    path={`${path}/solicitacoes`}
                    component={Solicitacoes}
                  />
                  <Route path={`${path}/validacoes`} component={Validacoes} />
                  <Route
                    path={`${path}/cadastrar`}
                    component={isUCE(user) ? CadastraCarteira : null}
                  />

                  <Route
                    exact
                    path={`${path}/:gecex/:carteira`}
                    component={Carteira}
                  />
                  <Route
                    exact
                    path={`${path}/:prefixo`}
                    render={props =>
                      this.state.autenticado ? (
                        <Carteiras user={user} path={path} {...props} />
                      ) : null
                    }
                  />
                </Switch>
              </main>
            </div>
          </MuiThemeProvider>
        </Router>
      </Provider>
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
