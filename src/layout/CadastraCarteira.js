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

import { getGecex, getSegmentos, getSituacao, getGeninsPorUor } from '../api';
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
      genin: {},
      segmento: {},
      situacao: {},

      dependencias: [],
      genins: [],
      segmentos: [],
      situacoes: [],
      errors: {}
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

    getSegmentos()
      .then(response => response.json())
      .then(data => {
        this.setState({ segmentos: data.segmentos });
      })
      .catch(function(err) {
        console.error(err);
      });

    getSituacao()
      .then(response => response.json())
      .then(data => {
        console.log(data.situacoes[0]);

        this.setState({ situacoes: data.situacoes });
      })
      .catch(function(err) {
        console.error(err);
      });
  }

  handleChangeGecex = input => e => {
    this.setState({ [input]: e.target.value });

    getGeninsPorUor(e.target.value.uor)
      .then(response => response.json())
      .then(data => {
        this.setState({ genins: data.genins[0] });
      })
      .catch(function(err) {
        console.error(err);
      });
  };

  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    const { dependencias, segmentos, situacoes, genins } = this.state;
    const { nome, descricao, gecex, segmento, situacao, genin } = this.state;
    return (
      <div>
        <form className={classes.form}>
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
              onChange={this.handleChange('genin')}
              inputProps={{
                name: 'genin',
                id: 'genin-simple'
              }}
            >
              {genins.map(genin => (
                <MenuItem key={genin.chave} value={genin}>
                  {genin.chave + ' - ' + genin.nome}
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
              {segmentos.map(segmento => (
                <MenuItem key={segmento.id} value={segmento}>
                  {segmento.descricao}
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
              {situacoes.map(situacao => (
                <MenuItem key={situacao.id} value={situacao}>
                  {situacao.descricao}
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
