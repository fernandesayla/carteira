import React, { Component } from 'react';
import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Paper,
  Typography
} from '@material-ui/core';
import Dashboard from './Dashboard';

import TableCarteiras from '../components/TableCarteiras';
import {
  getGecex,
  getSegmentos,
  getSituacao,
  getGeninsPorUor,
  getTodosGenins,
  getTodasCarteiras
} from '../api';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  form: { diplay: 'flex', alignContent: 'space-between' },
  formControl: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
  filters: { padding: 16 }
});

class Home extends Component {
  constructor() {
    super();
    this.state = {
      gecex: 'todas',
      genin: 'todas',
      genins: [],
      geninsInicio: [],
      dependencias: [],

      carteirasInicio: [],
      carteiras: [
        {
          id: 1,
          gecex: 1690,
          solicitacoes: 3,
          genin: 'F0169948',
          qtd_clientes: '80'
        },
        {
          id: 2,
          gecex: 4794,
          solicitacoes: 8,
          genin: 'F0169948',
          qtd_clientes: '70'
        },
        {
          id: 3,
          gecex: 4794,
          solicitacoes: 8,
          genin: 'F0720631',
          qtd_clientes: '70'
        }
      ]
    };
  }

  componentWillMount() {
    getGecex()
      .then(response => response.json())
      .then(data => {
        this.setState({ dependencias: data.dependencias[0] });
      })
      .catch(function(err) {
        console.error(err);
      });

    getTodosGenins()
      .then(response => response.json())
      .then(data => {
        this.setState({ genin: 'todas' });
        this.setState({ genins: data.genins[0] });
        this.setState({ geninsInicio: data.genins[0] });
      })
      .catch(function(err) {
        console.error(err);
      });

    getTodasCarteiras()
      .then(response => response.json())
      .then(data => {
        this.setState({ carteirasInicio: data.carteiras });
        this.setState({ carteiras: data.carteiras });
      })
      .catch(function(err) {
        console.error(err);
      });
  }
  handleChangeGecex = input => e => {
    if (e.target.value.prefixo)
      this.filterCarteira(input, e.target.value.prefixo);
    else this.filterCarteira('todos', e.target.value.prefixo);
    this.setState({ genin: 'todas' });
    this.setState({ [input]: e.target.value });
    if (e.target.value == 'todas') {
      this.setState({ genins: this.state.geninsInicio });

      return;
    }

    this.filtraGenin(e.target.value.prefixo);
  };

  handleChangeGenin = input => e => {
    //  if ((input, e.target.value.chave))
    this.filterCarteira(input, e.target.value.chave);

    this.setState({ [input]: e.target.value });
  };

  filtraGenin = prefixo => {
    const { geninsInicio } = this.state;
    let filtrada = geninsInicio;
    filtrada = geninsInicio.filter(item => item.prefixo == prefixo);
    this.setState({ genins: filtrada });
  };

  filterCarteira = (tipo, key) => {
    const { carteirasInicio, carteiras } = this.state;
    let filtrada = carteirasInicio;

    switch (tipo) {
      case 'gecex':
        filtrada = carteirasInicio.filter(item => item.gecex == key);
        break;
      case 'genin':
        filtrada = carteirasInicio.filter(item => item.genin == key);
        break;
      default:
        filtrada = carteirasInicio;
    }

    this.setState({ carteiras: filtrada });
  };

  render() {
    const { classes } = this.props;
    const { carteiras, gecex, dependencias, genin, genins } = this.state;
    return (
      <div>
        <Paper className={classes.filters}>
          <Typography variant="h6">Filtros</Typography>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel htmlFor="gecex-simple" shrink={true}>
              Gecex
            </InputLabel>
            <Select
              value={gecex}
              onChange={this.handleChangeGecex('gecex')}
              inputProps={{
                name: 'gecex',
                id: 'gecex-simple'
              }}
            >
              <MenuItem value={'todas'}>Todas as Gecex</MenuItem>
              {dependencias.map(dep => (
                <MenuItem key={dep.prefixo} value={dep}>
                  {dep.prefixo + ' - ' + dep.nome_reduzido}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth className={classes.formControl}>
            <InputLabel htmlFor="genin-simple" shrink={true}>
              Genin
            </InputLabel>
            <Select
              value={genin}
              onChange={this.handleChangeGenin('genin')}
              inputProps={{
                name: 'genin',
                id: 'genin-simple'
              }}
            >
              <MenuItem value={'todas'}>Todos os Genins</MenuItem>
              {genins.map(genin => (
                <MenuItem key={genin.chave} value={genin}>
                  {genin.chave + ' - ' + genin.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>
        <Dashboard dados={'dados'} />
        {carteiras.length > 0 ? <TableCarteiras data={carteiras} /> : null}
      </div>
    );
  }
}

export default withStyles(styles)(Home);
