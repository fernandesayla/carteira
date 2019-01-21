export const getCarteira = (gecex, carteira) => {
  return fetch(
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
};

export const getCarteirasPorGecex = gecex => {
  return fetch(
    `https://uce.intranet.bb.com.br/api-carteira/v1/carteira/${gecex}`,
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

export const getClientes = (gecex, carteira) => {
  return fetch(
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
};

export const getGecexPorGecex = gecex => {
  return fetch(
    `https://uce.intranet.bb.com.br/api-uce/v1/dependencias/genin/${gecex}`,
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

export const getGecex = gecex => {
  return fetch(
    `https://uce.intranet.bb.com.br/api-uce/v1/dependencias/genin/${gecex}`,
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

export const getTodasCarteiras = () => {
  return fetch(`https://uce.intranet.bb.com.br/api-carteira/v1/carteira/`, {
    method: 'GET',
    headers: {
      'x-access-token': window.sessionStorage.token,
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  });
};

export const getTodosGenins = () => {
  return fetch(`https://uce.intranet.bb.com.br/api-uce/v1/genins/`, {
    method: 'GET',
    headers: {
      'x-access-token': window.sessionStorage.token,
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  });
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
