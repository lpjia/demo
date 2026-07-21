import { fetchState } from '../api';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';

let lastUpdateTime = 0; // 上一次更新的时间
let lastRemoteUpdateTime = Date.now(); // 上一次远程更新的时间
const REMOTE_UPDATE_INTERVAL = 15000; // 远程更新时间间隔
let remoteState = null;

// 根据地图缩放级别获取更新时间间隔, 控制更新频率
function getInterval(zoom) {
  zoom = Math.floor(zoom);
  return [, 5000, 4000, 3000, 2000, 1000, 500, 100, 50][zoom] || 16;
}

export function update(map) {
  requestAnimationFrame(() => {
    update(map);
  });
  const now = Date.now();
  // 更新逻辑
  if (now - lastRemoteUpdateTime >= REMOTE_UPDATE_INTERVAL) {
    lastRemoteUpdateTime = now;
    fetchState().then((state) => {
      remoteState = state;
    });
  }
  const zoom = map.getView().getZoom();
  const interval = getInterval(zoom);

  // 每一次渲染帧都要处理更新逻辑, 但要不要更新还需要判断
  if (now - lastUpdateTime >= interval) {
    // 执行更新操作
    updateLayers(map);
    lastUpdateTime = now;
  }
}

function updateLayers(map) {
  if (remoteState) {
    // 处理远程数据: 某个时间点，飞机的高度、位置、方向、速度
    applyRemoteState(map);
  }
  // 更新数据处理
  updatePlaneLayers(map);
  updatePathLayers(map);
}

function applyRemoteState(map) {
  console.log('update');
  const layers = map.getLayers().getArray();
  const airplaneSource = layers
    .find((layer) => layer.get('name') === 'planes')
    .getSource();
  const planeFeatures = airplaneSource.getFeatures();
  const remoteStatesMap = remoteState.reduce((map, state) => {
    map.set(state.icao24, state);
    return map;
  }, new Map());
  // 使用远程数据更新
  for (const feature of planeFeatures) {
    const icao24 = feature.get('icao24');
    const newState = remoteStatesMap.get(icao24);
    if (newState) {
      feature.set('icao24', newState.icao24);
      feature.set('lon', newState.lon);
      feature.set('lat', newState.lat);
      feature.set('heading', newState.heading);
      feature.set('velocity', newState.velocity);
      feature.set('timePosition', newState.timePosition);
      feature.set('altitude', newState.altitude);
      remoteStatesMap.delete(icao24);
    } else {
      airplaneSource.removeFeature(feature);
    }
  }
  for (const [_, newState] of remoteStatesMap) {
    const feature = new Feature({
      geometry: new Point(fromLonLat([newState.lon, newState.lat])),
      ...newState,
      isHovered: 0,
      isSelected: 0,
    });
    airplaneSource.addFeature(feature);
  }
  remoteState = null;
}

function updatePlaneLayers(map) {
  // 获取所有飞机的Feature
  const layers = map.getLayers().getArray();
  const planesLayer = layers.find((layer) => layer.get('name') === 'planes');
  const source = planesLayer.getSource();
  const features = source.getFeatures();
  for (const feature of features) {
    const lon = feature.get('lon'); // 经度
    const lat = feature.get('lat'); // 纬度
    const velocity = feature.get('velocity'); // 速度(m/s)
    const heading = feature.get('heading'); // 方向(弧度)
    const timePosition = feature.get('timePosition'); // 位置记录时间(ms)
    if (!velocity || !heading) {
      continue;
    }
    const [x, y] = fromLonLat([lon, lat]); // 转换为地图坐标
    const t = (Date.now() - timePosition) / 1000; // 经过的时间
    const d = velocity * t; // 移动的距离
    const newPoint = [x + d * Math.sin(heading), y + d * Math.cos(heading)];
    feature.getGeometry().setCoordinates(newPoint);
  }
}

function updatePathLayers(map) {
  // 更新路径图层
  const layers = map.getLayers().getArray();
  const pathLayer = layers.find((layer) => layer.get('name') === 'path');
  const planeLayer = layers.find((layer) => layer.get('name') === 'planes');
  const source = pathLayer.getSource();
  const features = source.getFeatures();
  for (const feature of features) {
    const pathPoints = feature.getGeometry().getCoordinates();
    const icao24 = feature.get('icao24');
    const planeFeature = planeLayer
      .getSource()
      .getFeatures()
      .find((f) => f.get('icao24') === icao24);
    if (!planeFeature) {
      continue;
    }
    const curPoint = planeFeature.getGeometry().getCoordinates();
    pathPoints[pathPoints.length - 1] = curPoint;
    feature.getGeometry().setCoordinates([...pathPoints]);
  }
}
