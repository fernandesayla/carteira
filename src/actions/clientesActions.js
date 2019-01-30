import {
  GET_CLIENTES,
  DELETE_SELECTED_CLIENTS,
  ADD_SELECTED_CLIENTS,
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

export const addSelectedClients = client => {
  return { type: ADD_SELECTED_CLIENTS, payload: client };
};

export const deleteSelectedClients = mci => {
  return { type: DELETE_SELECTED_CLIENTS, payload: mci };
};

export const getSelectedClients = () => {
  return { type: GET_SELECTED_CLIENTS };
};
