import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:9527/api',
});

export async function fetchState() {
  const response = await api.get('/states');
  return response.data;
}

export async function track(icao24) {
  const response = await api.get(`/track`, {
    params: {
      icao24,
    },
  });
  return response.data;
}
