import axios from 'axios';
import { getToken } from './auth.js';

const request = axios.create({
  baseURL: 'https://opensky-network.org/api',
});

request.interceptors.request.use(async (config) => {
  const token = await getToken();
  config.headers.set('Authorization', `Bearer ${token}`);
  return config;
});

export default request;
