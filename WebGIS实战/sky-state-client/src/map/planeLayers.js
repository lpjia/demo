import { Feature } from 'ol';
import VectorLayer from 'ol/layer/WebGLVector';
import VectorSource from 'ol/source/Vector';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import planeIcon from '../assets/plane.svg';
import { fetchState } from '../api';

async function createFeatures() {
  const states = await fetchState();
  const features = states.map(
    (state) =>
      new Feature({
        geometry: new Point(fromLonLat([state.lon, state.lat])),
        ...state,
        isHovered: 0,
        isSelected: 0,
      }),
  );
  return features;
}

async function createPlanes() {
  const features = await createFeatures();
  const source = new VectorSource({
    features,
  });
  const normalStyle = {
    'icon-src': planeIcon,
    'icon-width': 32,
    'icon-height': 32,
    'icon-anchor': [0.5, 0.5],
    'icon-rotate-with-view': true,
    'icon-rotation': ['get', 'heading'],
  };
  const activeStyle = {
    ...normalStyle,
    'icon-color': '#f40',
  };
  const planesLayer = new VectorLayer({
    source,
    style: normalStyle,
    name: 'planes',
  });
  const activePlaneLayer = new VectorLayer({
    source,
    style: [
      {
        filter: ['>', ['+', ['get', 'isHovered'], ['get', 'isSelected']], 0],
        style: activeStyle,
      },
    ],
    name: 'activePlanes',
  });
  return [planesLayer, activePlaneLayer];
}

function createPath() {
  const layer = new VectorLayer({
    source: new VectorSource({
      features: [],
    }),
    style: {
      'stroke-color': '#f40',
      'stroke-width': 2,
    },
    name: 'path',
  });
  return [layer];
}

export async function createPlaneLayers() {
  const planesLayers = await createPlanes();
  const pathLayers = createPath();
  return [...planesLayers, ...pathLayers];
}
