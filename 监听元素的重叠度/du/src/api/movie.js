import axios from 'axios';

export async function getMovies(page, limit) {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const resp = await axios.get('/api/movies', {
        params: {
          page,
          size: limit,
        },
      });
      resolve(resp.data);
    }, 1500);
  });
}
