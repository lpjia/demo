import request from './request.js';

const pathMap = new Map();

function parse(state) {
  const lon = state[5];
  const lat = state[6];
  const heading = state[10];
  const icao24 = state[0];
  const velocity = state[9];
  const timePosition = state[3] * 1000;
  const altitude = state[13];
  return {
    icao24,
    lon,
    lat,
    heading: (heading * Math.PI) / 180,
    velocity,
    timePosition,
    altitude,
  };
}

export async function fetchState() {
  const resp = await request.get('/states/all');
  const states = resp.data.states
    .map(parse)
    .filter(
      (state) =>
        state.lon !== null &&
        state.lat !== null &&
        state.heading !== null &&
        state.velocity !== null
    );
  for (const s of states) {
    const path = pathMap.get(s.icao24) || [];
    const last = path[path.length - 1];
    if (last && last.timePosition === s.timePosition) {
      continue;
    }
    path.push({
      lon: s.lon,
      lat: s.lat,
      timePosition: s.timePosition,
    });
    pathMap.set(s.icao24, path);
  }
  return states;
}

export function track(icao24) {
  const path = pathMap.get(icao24) || [];
  return path.map((p) => ({
    lon: p.lon,
    lat: p.lat,
  }));
}
