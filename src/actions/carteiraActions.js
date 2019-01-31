import { GET_CARTEIRAS, GET_CARTEIRA, GET_GECEX } from './types';
import axios from 'axios';

export const getCarteiras = gecex => async dispatch => {
  let url = `https://uce.intranet.bb.com.br/api-carteira/v1/carteira/`;

  if (gecex)
    url = `https://uce.intranet.bb.com.br/api-carteira/v1/carteira/${gecex}`;

  const res = await axios.get(url, {
    method: 'GET',
    headers: {
      'x-access-token': window.sessionStorage.token,
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  });

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

export const getGecex = gecex => async dispatch => {
  let url = `https://uce.intranet.bb.com.br/api-uce/v1/dependencias/genin/${gecex}`;
  if ([9958, 9514].includes(gecex))
    url = 'https://uce.intranet.bb.com.br/api-uce/v1/dependencias/genin/';

  const res = await axios.get(url, {
    method: 'GET',
    headers: {
      'x-access-token': window.sessionStorage.token,
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  });

  dispatch({ type: GET_GECEX, payload: res.data.dependencias[0] });
};
