import { GET_CARTEIRAS, GET_CARTEIRA } from './types';
import axios from 'axios';

export const getCarteiras = () => async dispatch => {
  const res = await axios.get(
    `https://uce.intranet.bb.com.br/api-carteira/v1/carteira/`,
    {
      method: 'GET',
      headers: {
        'x-access-token': window.sessionStorage.token,
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }
  );

  dispatch({ type: GET_CARTEIRAS, payload: res.data.carteiras });
};

export const getCarteira = (gecex, carteira) => async dispatch => {
  const res = await axios.get(
    `https://uce.intranet.bb.com.br/api-carteira/v1/carteira/${gecex}/${carteira}`,
    {
      method: 'GET',
      headers: {
        'x-access-token': window.sessionStorage.token,
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }
  );

  dispatch({ type: GET_CARTEIRA, payload: res.data.carteira[0] });
};
