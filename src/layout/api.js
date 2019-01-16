export const getGecex = () => {
  return fetch(
    `https://uce.intranet.bb.com.br/api-uce/v1/dependencias/tipo/${87}`,
    {
      method: 'GET',
      headers: {
        'x-access-token': window.sessionStorage.token,
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }
  );
};

export const getGeninsPorUor = uor => {
  return fetch(`https://uce.intranet.bb.com.br/api-uce/v1/genins/uor/${uor}`, {
    method: 'GET',
    headers: {
      'x-access-token': window.sessionStorage.token,
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  });
};

export const getSegmentos = () => {
  return fetch(
    `https://uce.intranet.bb.com.br/api-carteira/v1/carteira/segmentos/`,
    {
      method: 'GET',
      headers: {
        'x-access-token': window.sessionStorage.token,
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }
  );
};

export const getSituacao = () => {
  return fetch(
    `https://uce.intranet.bb.com.br/api-carteira/v1/carteira/situacoes/`,
    {
      method: 'GET',
      headers: {
        'x-access-token': window.sessionStorage.token,
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }
  );
};
