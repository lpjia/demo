import 'ol/ol.css';
import { Map, View } from "ol";
import { fromLonLat } from 'ol/proj';
import { createMapLayers } from './mapLayers';
import { createPlaneLayers } from './planeLayers';
import { attachEvents } from './events';
import { update } from './update';

export async function initMap(container) {
  const map = new Map({
    target: container,
    layers: [],
    view: new View({
      center: fromLonLat([116.3912757, 39.906217]),
      zoom: 1,
      minZoom: 1,
      maxZoom: 13
    })
  })

  createMapLayers().forEach((layer) => {
    map.addLayer(layer)
  })

  const planeLayers = await createPlaneLayers()
  planeLayers.forEach((layer) => {
    map.addLayer(layer)
  })

  attachEvents(map)
  update(map);
}