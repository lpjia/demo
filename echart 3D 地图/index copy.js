axios.get('map/henan.json').then(res => {
  let chinaJson = res.data
  console.log('res: ', res)
  // echarts.registerMap('china', chinaJson); // 注册地图
  echarts.registerMap('henan', chinaJson); // 注册地图
  var chart = echarts.init(document.getElementById('mapDiv'));
  chart.setOption({
    tooltip: { // 提示框
      show: true,
      trigger: 'item',
      formatter: function (params) {
        return params.name;
      }
    },
    geo: {
      type: 'map',
      map: 'henan',
      // roam: true,
      // geoIndex: 1,
      itemStyle: {
        areaColor: '#023451',
        color: '#023451',
        borderWidth: 1,
        borderColor: '#fff',

        // shadowColor: '#000',
        shadowBlur: 1,
        shadowOffsetX: 10,
        shadowOffsetY: 16,
        // opacity: 1,
      },
    },
    series: [{
      type: 'map',
      map: 'henan',
      // roam: true,
      geoIndex: 1,
      itemStyle: {
        areaColor: '#023451',
        color: '#023451',
        borderWidth: 1,
        borderColor: '#fff',

        // // shadowColor: '#000',
        // shadowBlur: 1,
        // shadowOffsetX: 10,
        // shadowOffsetY: 16,
        // // opacity: 1,
      },
    }]
  });
});