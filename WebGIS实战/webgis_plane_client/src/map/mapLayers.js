import TileLayer from "ol/layer/WebGLTile";
import { XYZ } from "ol/source";

const token = '46c581cde0afb9dfbf55417a07bc5e78'

export function createMapLayers() {
  return [
    new TileLayer({
      source: new XYZ({
        url: `http://t0.tianditu.gov.cn/ter_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${token}`
      })
    }),
    new TileLayer({
      source: new XYZ({
        url: `http://t0.tianditu.gov.cn/cta_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cta&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${token}`
      })
    })
  ]
}