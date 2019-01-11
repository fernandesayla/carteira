import React, { Component } from 'react';
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
  form: { diplay: 'flex', alignContent: 'space-between' },
  formControl: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  }
});

class CadastraCarteira extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      descricao: '',

      gecex: {},
      segmento: {},
      situacao: {},

      dependencias: [],
      segmentos: [],
      situacoes: [],
      errors: {}
    };
  }

  componentWillMount() {
    this.getGecex();
  }
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  getGecex = () => {
    fetch(
      `https://uce.intranet.bb.com.br/api-timeline/v1/dependencias/tipo/${87}`,
      {
        method: 'GET',
        headers: {
          'x-access-token': window.sessionStorage.token,
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        this.setState({ dependencias: data.dependencias[0] });
      })

      .catch(function(err) {
        console.error(err);
      });
  };

  getSegmento = () => {
    fetch(
      `https://uce.intranet.bb.com.br/api-timeline/v1/dependencias/tipo/${87}`,
      {
        method: 'GET',
        headers: {
          'x-access-token': window.sessionStorage.token,
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        this.setState({ dependencias: data.dependencias[0] });
      })

      .catch(function(err) {
        console.error(err);
      });
  };

  getSituacao = () => {
    fetch(
      `https://uce.intranet.bb.com.br/api-timeline/v1/dependencias/tipo/${87}`,
      {
        method: 'GET',
        headers: {
          'x-access-token': window.sessionStorage.token,
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        this.setState({ dependencias: data.dependencias[0] });
      })

      .catch(function(err) {
        console.error(err);
      });
  };
  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    const { dependencias, segmentos, situacoes } = this.state;
    const { nome, descricao, gecex, segmento, situacao } = this.state;
    return (
      <div>
        <form className={classes.form}>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel htmlFor="gecex-simple" shrink={true}>
              Gecex
            </InputLabel>
            <Select
              value={gecex}
              onChange={this.handleChange('gecex')}
              inputProps={{
                name: 'gecex',
                id: 'gecex-simple'
              }}
            >
              {dependencias.map(dep => (
                <MenuItem key={dep.prefixo} value={dep}>
                  {dep.prefixo + ' - ' + dep.nome_reduzido}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel htmlFor="segmento-simple" shrink={true}>
              Segmento
            </InputLabel>
            <Select
              value={segmento}
              onChange={this.handleChange('segmento')}
              inputProps={{
                name: 'segmento',
                id: 'segmento-simple'
              }}
            >
              {dependencias.map(dep => (
                <MenuItem key={dep.prefixo} value={dep}>
                  {dep.prefixo + ' - ' + dep.nome_reduzido}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth className={classes.formControl}>
            <InputLabel htmlFor="situacao-simple" shrink={true}>
              Situação
            </InputLabel>
            <Select
              value={situacao}
              onChange={this.handleChange('situacao')}
              inputProps={{
                name: 'situacao',
                id: 'situacao-simple'
              }}
            >
              {dependencias.map(dep => (
                <MenuItem key={dep.prefixo} value={dep}>
                  {dep.prefixo + ' - ' + dep.nome_reduzido}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            InputLabelProps={{
              shrink: true
            }}
            label="Nome"
            placeholder="Nome limitado a 150 caracteres"
            error={!errors['nome'] ? false : true}
            helperText={errors['nome']}
            margin="normal"
            fullWidth
            value={nome}
            onChange={this.handleChange('nome')}
          />
          <TextField
            InputLabelProps={{
              shrink: true
            }}
            label="Descrição"
            placeholder="Coloque aqui da descrição e principais regras para esta carteira"
            error={!errors['descricao'] ? false : true}
            helperText={errors['descricao']}
            margin="normal"
            fullWidth
            multiline
            rows={4}
            value={descricao}
            onChange={this.handleChange('descricao')}
          />
        </form>
      </div>
    );
  }
}

CadastraCarteira.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(CadastraCarteira);
