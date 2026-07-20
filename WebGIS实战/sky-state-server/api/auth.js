import axios from 'axios';

let token = '';
let lastTokenUpdateTime = 0;
const TOKEN_EXPIRE_TIME = 20 * 60 * 1000;

export async function getToken(useCache = true) {
  if (
    token &&
    useCache &&
    Date.now() - lastTokenUpdateTime < TOKEN_EXPIRE_TIME
  ) {
    return token;
  }
  const url = 'https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token';
  const { data } = await axios.post(
    url,
    {
      client_id: process.env.OPENSKY_CLIENT_ID,
      client_secret: process.env.OPENSKY_CLIENT_SECRET,
      grant_type: 'client_credentials',
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
  token = data.access_token;
  lastTokenUpdateTime = Date.now();
  return token;
}
