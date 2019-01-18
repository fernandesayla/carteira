function getCookie(cname) {
  var name = cname + '=';
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

export const autentica = () => {
  fetch(
    `https://uce.intranet.bb.com.br/api-timeline/v1/autenticar/${getCookie(
      'BBSSOToken'
    )}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }
  )
    .then(response => {
      if (response.status > 350) {
        this.setState({ autenticado: false });
        window.location =
          'https://login.intranet.bb.com.br/distAuth/UI/Login?goto=https://uce.intranet.bb.com.br/carteira/';
      }

      if (response.headers.get('x-access-token') != null) {
        window.sessionStorage.token = response.headers.get('x-access-token');
        this.setState({ token: response.headers.get('x-access-token') });
      }

      return response.json();
    })
    .then(response => {
      return response.user[0];
      /*  this.setState({ user:  });

      this.setState({ autenticado: true });*/
    })

    .catch(function(err) {
      return false;
      /*  this.setState({ token: '' });
      this.setState({ autenticado: false });*/
      window.location =
        'https://login.intranet.bb.com.br/distAuth/UI/Login?goto=https://uce.intranet.bb.com.br/carteira/';
    });
};

export const getGecex = () => {
  return fetch(
    `https://uce.intranet.bb.com.br/api-uce/v1/dependencias/genin/`,
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
  return fetch(
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
