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

function getCookie(cname) {
  var name = cname + '=';
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}
class App extends Component {
  constructor(props) {
    super(props);
    this.autentica = this.autentica.bind(this);
    this.state = {
      mobileOpen: false,
      user: { chave: 'F1522457' },
      token: '',
      autenticado: ''
    };
  }

  componentWillMount() {
    this.autentica();
  }
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  autentica = () => {
    fetch(
      `https://uce.intranet.bb.com.br/api-timeline/v1/autenticar/${getCookie(
        'BBSSOToken'
      )}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      }
    )
      .then(response => {
        if (response.status > 350) {
          this.setState({ autenticado: false });
          window.location =
            'https://login.intranet.bb.com.br/distAuth/UI/Login?goto=https://uce.intranet.bb.com.br/carteira/';
        }

        if (response.headers.get('x-access-token') != null) {
          window.sessionStorage.token = response.headers.get('x-access-token');
          this.setState({ token: response.headers.get('x-access-token') });
        }

        return response.json();
      })
      .then(response => {
        this.setState({ user: response.user[0] });

        this.setState({ autenticado: true });
      })

      .catch(function(err) {
        /*  this.setState({ token: '' });
        this.setState({ autenticado: false });*/
        window.location =
          'https://login.intranet.bb.com.br/distAuth/UI/Login?goto=https://uce.intranet.bb.com.br/carteira/';
        console.error(err);
      });
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
