import {
  GET_CLIENTES,
  SET_SELECTED_CLIENTS,
  GET_SELECTED_CLIENTS
} from './types';
import axios from 'axios';

export const getClientes = (gecex, carteira) => async dispatch => {
  const res = await axios.get(
    `https://uce.intranet.bb.com.br/api-carteira/v1/carteira/clientes/${gecex}/${carteira}`,
    {
      method: 'GET',
      headers: {
        'x-access-token': window.sessionStorage.token,
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }
  );

  dispatch({ type: GET_CLIENTES, payload: res.data.clientes });
};

export const setSelectedClients = client => {
  return { type: SET_SELECTED_CLIENTS };
};

export const getSelectedClients = () => {
  return { type: GET_SELECTED_CLIENTS };
};
