import { fromLonLat } from 'ol/proj';
import { track } from '../api';
import Feature from 'ol/Feature';
import LineString from 'ol/geom/LineString';

function attachMoveEvent(map) {
  let lastHoveredFeature = null;
  const container = map.getTargetElement(); // 获取地图容器
  map.on('pointermove', (e) => {
    if (e.dragging) {
      // 如果当前是拖动地图行为，则不处理
      return;
    }
    // 移除掉之前的 hover 状态
    if (lastHoveredFeature) {
      // 将其 isHovered 设为 0
      lastHoveredFeature.set('isHovered', 0);
      lastHoveredFeature = null;
    }
    // 得到当前鼠标位置的 feature
    const features = map.getFeaturesAtPixel(e.pixel, {
      layerFilter: (layer) => layer.get('name') === 'planes', // 层的筛选, 只拿某一层, 这个name属性是自定义的
      hitTolerance: 3, // 鼠标点击位置的误差容忍范围
    });
    const hoveredFeature = features[0];
    if (hoveredFeature) {
      // 设置当前Feature的isHovered为1
      hoveredFeature.set('isHovered', 1);
      // 更改容器样式的鼠标为小手
      container.style.cursor = 'pointer';
      lastHoveredFeature = hoveredFeature;
    } else {
      // 更改容器样式的鼠标为默认
      container.style.cursor = 'default';
    }
  });
}

function attachClickEvent(map) {
  let lastClickedFeature = null;
  map.on('click', (e) => {
    if (e.dragging) {
      return;
    }
    if (lastClickedFeature) {
      lastClickedFeature.set('isSelected', 0);
      lastClickedFeature = null;
      removePath();
    }
    const features = map.getFeaturesAtPixel(e.pixel, {
      layerFilter: (layer) => layer.get('name') === 'planes',
      hitTolerance: 3,
    });
    const clickedFeature = features[0];
    if (clickedFeature) {
      addPath(clickedFeature);
      clickedFeature.set('isSelected', 1);
      lastClickedFeature = clickedFeature;
      // 重设中心点
      const center = clickedFeature.getGeometry().getCoordinates();
      // 加动画效果
      map.getView().animate(
        {
          center,
          duration: 500,
        },
        {
          zoom: 12,
          duration: 500,
        },
      );
    }
  });

  const pathLayer = map
    .getLayers()
    .getArray()
    .find((layer) => layer.get('name') === 'path');

  async function addPath(planeFeature) {
    const icao24 = planeFeature.get('icao24');
    const curPoint = planeFeature.getGeometry().getCoordinates();
    let path = await track(icao24);
    path = path.map(({ lon, lat }) => fromLonLat([lon, lat]));
    pathLayer.getSource().addFeature(
      new Feature({
        geometry: new LineString([...path, curPoint]),
        icao24,
      }),
    );
  }

  function removePath() {
    pathLayer.getSource().clear();
  }
}

// 处理无缝拖动地图带来的问题
function attachMoveEndEvent(map) {
  map.on('moveend', () => {
    const view = map.getView();
    const center = view.getCenter();
    const extent = view.getProjection().getExtent(); // 地图坐标范围

    const worldWidth = extent[2] - extent[0];
    const x = center[0]; // 只处理横向
    view.setCenter([
      ((((x - extent[0]) % worldWidth) + worldWidth) % worldWidth) + extent[0],
      center[1],
    ]);
  });
}

export function attachEvents(map) {
  attachMoveEvent(map);
  attachClickEvent(map);
  attachMoveEndEvent(map);
}
