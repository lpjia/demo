// import { arrToObj } from '../util/commonMethod.js'
// let cityCodeObj = arrToObj(areaList.cities, { k: 'name', v: 'name' })


new Vue({
  el: '#app',
  data() {
    return {
      map: null,
      cityArr: areaList.cities,
      selectVal: '',
      mapCenter: '',
    }
  },
  mounted() {
    this.baiduMapInit()
  },
  methods: {
    gaodeMapInit() {
      AMapLoader.load({
        key: 'd75c7f616a34e84f228e5f9fbd286996',
        version: '2.0',
        plugins: ['AMap.Scale', 'AMap.ToolBar']
      }).then(AMap => {
        let map = new AMap.Map('mapDiv2');
        map.addControl(new AMap.Scale())
        map.addControl(new AMap.ToolBar())
        map.add(new AMap.Marker({
          position: map.getCenter()
        }));
      }).catch((e) => {
        console.error('lp err: ', e);
      });
    },


    baiduMapInit() {
      let map = new BMapGL.Map("mapDiv")
        , point = new BMapGL.Point(116.331398, 39.897445)
      this.map = map
      map.centerAndZoom(point, 11);
      map.enableScrollWheelZoom(true);
    },


    selectChange(val) {
      this.map.clearOverlays()
      console.log('val: ', val)
      val != "" && this.map.centerAndZoom(val, 16)
      setTimeout(() => {
        let center = this.map.getCenter()
          , marker = new BMapGL.Marker(center)
          , x = center ? center.lng : ''
          , y = center ? center.lat : ''
        this.mapCenter = `( ${x}, ${y} )`
        this.map.addOverlay(marker)
      }, 500);
    }
  }
})


