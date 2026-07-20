import { config } from 'dotenv';
import express from 'express';
import { fetchState, track } from './api/index.js';
import cors from 'cors';
config({ quiet: true });

const app = express({
  urlencoded: true,
});
app.use(cors());
app.get('/api/states', async (req, res) => {
  const states = await fetchState();
  res.json(states);
});
app.get('/api/track', (req, res) => {
  const icao24 = req.query.icao24;
  const pathes = track(icao24);
  res.json(pathes);
});

const PORT = 9527;

app.listen(PORT, () => {
  console.log(`server start on port ${PORT}`);
});
