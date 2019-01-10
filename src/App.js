import React, { Component } from 'react';

import './App.css';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import AppNavbar from './components/layout/AppNavbar';
import DrawerMenu from './components/layout/Drawer';

class App extends Component {
  state = {
    mobileOpen: false,
    user: { chave: 'F1522457' }
  };
  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render(props) {
    const { user, mobileOpen } = this.state;
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <AppNavbar
            handleDrawerToggle={this.handleDrawerToggle}
            user={user}
            mobileOpen={mobileOpen}
          />
          <DrawerMenu
            handleDrawerToggle={this.handleDrawerToggle}
            user={user}
            mobileOpen={mobileOpen}
          />
        </MuiThemeProvider>
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
export default App;
