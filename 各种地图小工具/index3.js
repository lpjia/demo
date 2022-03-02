import { debounce } from '../util/commonMethod.js'

let dom = document.querySelector('#showMsg')
let domInputLng = document.querySelector('#lng')
let domInputLat = document.querySelector('#lat')

// 清空输入框
document.querySelector('#clearLng').onclick = () => {
  domInputLng.value = ''
  domInputLng.focus()
}
document.querySelector('#clearLat').onclick = () => {
  domInputLat.value = ''
  domInputLat.focus()
}


var map = new AMap.Map('mapDiv4', {
  resizeEnable: true
});
AMap.plugin('AMap.ToolBar', function () {//异步加载插件
  var toolbar = new AMap.ToolBar();
  map.addControl(toolbar);
});
AMap.plugin('AMap.Geolocation', function () {
  var geolocation = new AMap.Geolocation({
    enableHighAccuracy: true,//是否使用高精度定位，默认:true
    timeout: 10000,          //超过10秒后停止定位，默认：5s
    position: 'RB',    //定位按钮的停靠位置
    offset: [10, 20], //定位按钮与设置的停靠位置的偏移量，默认：[10, 20]
    zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点
  });
  map.addControl(geolocation);
  geolocation.getCurrentPosition(function (status, result) {
    if (status == 'complete') {
      console.log('定位成功')
      // console.log('result.position:', result.position)
      dom.innerHTML = result.position
    } else {
      console.log('定位失败')
    }
  });
});



let addedMarker = []
let currentMarkerXY = null

const fangdou = debounce(() => {
  dom.innerHTML = currentMarkerXY
}, 500)

function setMapCenterPoint() {
  // 清除已有的标记点
  if (addedMarker && addedMarker.length) {
    let hasMarker = addedMarker.shift()
    map.remove(hasMarker);
  }

  let currentCenter = map.getCenter()

  let marker = new AMap.Marker({
    // position: new AMap.LngLat(116.39, 39.9),
    // position: [114, 35],
    position: currentCenter,
    draggable: true,
  });

  marker.on('dragging', e => {
    currentMarkerXY = e.lnglat
    fangdou()
  });

  map.add(marker);
  addedMarker.push(marker)
  dom.innerHTML = currentCenter
}
document.querySelector('#addCenter').onclick = setMapCenterPoint




document.querySelector('#addXY').onclick = setXY
function setXY() {
  if (addedMarker && addedMarker.length) {
    let hasMarker = addedMarker.shift()
    map.remove(hasMarker);
  }

  let pointXY = [domInputLng.value, domInputLat.value]

  let marker = new AMap.Marker({
    position: pointXY,
    draggable: true,
  });

  marker.on('dragging', e => {
    currentMarkerXY = e.lnglat
    fangdou()
  });

  map.add(marker);
  addedMarker.push(marker)
  dom.innerHTML = pointXY

  map.setZoomAndCenter(12, pointXY)
}