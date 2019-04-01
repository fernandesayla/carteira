export const isUCE = user => {
  return [9958, 9514].includes(user.prefixo);
};

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
  return fetch(
    `https://uce.intranet.bb.com.br/api-carteira/v1/autenticar/${getCookie(
      'BBSSOToken'
    )}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }
  );
};
