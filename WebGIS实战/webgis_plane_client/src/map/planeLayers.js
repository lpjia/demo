import { Feature } from "ol"
import { Point } from "ol/geom"
import VectorLayer from "ol/layer/WebGLVector"
import VectorSource from "ol/source/Vector"
import planeIcon from '../assets/plane.svg';
import { fromLonLat } from "ol/proj";
import { fetchState } from '../api';

async function createFeatures() {
  const states = await fetchState();
  console.log('states:', states)
  return states.map((state) => new Feature({
    geometry: new Point(fromLonLat([state.lon, state.lat])),
    ...state,
    isHovered: 0,
    isSelected: 0,
  }))
}


async function createPlanes() {
  const features = await createFeatures()

  const source = new VectorSource({
    features
  })

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
  })

  /* const planesLayer = new VectorLayer({
    source,
    style: [
      {
        filter: ['>', ['+', ['get', 'isHovered'], ['get', 'isSelected']], 0],
        style: activeStyle
      }, // 类似if...else...判断, 代码靠下, 和css样式生效规则一样
      {
        else: true,
        style: normalStyle
      }
    ],
    name: 'planes',
  }) */

  // 多加一层飞机层(这里是1个), 最保险, 保证在最上层
  const activePlaneLayer = new VectorLayer({
    source,
    style: [
      {
        filter: [
          '>',
          [
            '+',
            ['get', 'isHovered'],
            ['get', 'isSelected']
          ],
          0
        ],
        style: activeStyle
      }
    ],
    name: 'activePlane'
  })

  return [
    planesLayer,
    activePlaneLayer
  ]
}

function createPath() {
  const layer = new VectorLayer({
    source: new VectorSource({
      features: []
    }),
    style: {
      'stroke-color': '#f40', // 文档搜 flat 扁平一维
      'stroke-width': 2,
    },
    name: 'path'
  })

  return [layer]
}

export async function createPlaneLayers() {
  const planesLayers = await createPlanes();
  const pathLayers = createPath();
  return [...planesLayers, ...pathLayers];
}