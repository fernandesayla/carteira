import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import ProfileCarteira from '../../components/ProfileCarteira';
import {
  Grid,
  Typography,
  Button,
  withStyles,
  TextField,
  AppBar,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import PropTypes from 'prop-types';

import {
  addSelectedClients,
  deleteSelectedClients,
  getSelectedClients
} from '../../actions/clientesActions';
import { getGecex, getCarteiras } from '../../actions/carteiraActions';

import { connect } from 'react-redux';
import TableClientesSelected from './TableClientesSelected';

const styles = theme => ({});

class Solicitacoes extends React.Component {
  constructor() {
    super();
    this.state = {
      motivacao: '',
      value: 1,
      gecex: {},
      /* clientes: [{ id: 1, nome: 'Verde' }, { id: 2, nome: 'Azul' }],*/
      carteiras: [
        {
          id: 1,
          gecex: 'ff',
          solicitacoes: 3,
          genin: 'Azul',
          chave: 'F1522457',
          qtd_clientes: '80',
          segmento: 'Private',
          dt_create: '11/22/199',
          calc_infor: 8.9,
          clientes_novos_30: 8,
          cidades: 'SÃO PAULO ',
          bairros: 'BRÁS, JARDIM'
        },
        {
          id: 2,
          gecex: 'ff',
          solicitacoes: 3,
          genin: 'Azul',
          chave: 'F1522457',
          qtd_clientes: '80',
          segmento: 'Private',
          dt_create: '11/22/199',
          calc_infor: 8.9,
          clientes_novos_30: 8,
          cidades: 'CAMPINAS, SOROCABA',
          bairro: 'BRÁS, CENTRO'
        }
      ]
    };
  }
  handleChangeGecex = input => e => {
    console.log(e.target.value.prefixo);
    this.setState({ [input]: e.target.value });
    /* if (e.target.value.prefixo) {
      this.props.history.push(`${this.props.path}/${e.target.value.prefixo}`);
      this.filterCarteira(input, e.target.value.prefixo);
    } else {
      this.filterCarteira('todos', e.target.value.prefixo);
      this.props.history.push(`${this.props.path}/9958`);
    }
    this.setState({ genin: 'todas' });
    this.setState({ [input]: e.target.value });
    if (e.target.value == 'todas') {
      this.setState({ genins: this.state.geninsInicio });
      return;
    }
    this.filtraGenin(e.target.value.prefixo);*/
  };

  componentDidMount() {
    this.props.getSelectedClients();

    this.props.getGecex(9958);
  }

  handleTabChange = (event, value) => {
    this.setState({ value });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  removeCliente = () => {
    console.log('removeCliente em Solicitacoes');
  };
  render() {
    const { classes, selectedClients, gecexs } = this.props;
    const { carteiras, value, gecex } = this.state;

    return (
      <div>
        <Typography variant="h4">Solicitações </Typography>
        <AppBar position="static">
          <Tabs
            value={this.state.value}
            indicatorColor="primary"
            onChange={this.handleTabChange}
          >
            <Tab label="Movimentar e Adicionar Clientes" />
            <Tab label="Informações da Carteira" />
          </Tabs>
        </AppBar>

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
            {gecexs.map(dep => (
              <MenuItem key={dep.prefixo} value={dep}>
                {dep.prefixo + ' - ' + dep.nome_reduzido}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Grid container spacing={0}>
          {value === 0 && (
            <Grid container spacing={0}>
              <Typography variant="h6">Clientes </Typography>

              <Grid item lg={12}>
                {selectedClients.length > 0 ? (
                  <div>
                    <TableClientesSelected
                      data={selectedClients}
                      method={{ icon: 'delete', method: this.removeCliente }}
                    />
                  </div>
                ) : null}
              </Grid>
            </Grid>
          )}
          {value === 1 && (
            <div>
              <Typography variant="h6">Carteira </Typography>
            </div>
          )}
          {/** COmparativo de carteiras */}
          {carteiras.length > 0 ? (
            <Grid container spacing={8}>
              <Grid item lg={12}>
                <Typography variant="h6">Comparativo das Carteiras </Typography>
              </Grid>
              {carteiras.map(carteira => (
                <Grid item key={carteira.id} lg>
                  <ProfileCarteira classes={classes} carteira={carteira} />
                </Grid>
              ))}
            </Grid>
          ) : null}

          <Grid item lg={12}>
            <TextField
              id="standard-multiline-static"
              label="Motivação"
              placeholder="Explique os motivos para a solicitação."
              multiline
              rows="10"
              fullWidth
              className={classes.textField}
              margin="normal"
              value={this.state.motivacao}
              onChange={this.handleChange('motivacao')}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
          <Grid item lg={12}>
            <Button
              color="primary"
              fullWidth
              variant="contained"
              style={{ marginTop: '24px' }}
            >
              Confirmar Solicitações
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Solicitacoes.propTypes = {
  classes: PropTypes.object.isRequired,
  addSelectedClients: PropTypes.func.isRequired,
  deleteSelectedClients: PropTypes.func.isRequired,
  getSelectedClients: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  selectedClients: state.clientes.selectedClients,
  gecexs: state.carteira.gecexs
});

export default connect(
  mapStateToProps,
  { addSelectedClients, getSelectedClients, deleteSelectedClients, getGecex }
)(withStyles(styles)(Solicitacoes));
