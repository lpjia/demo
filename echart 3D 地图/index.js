let config = {
  type: 'map',
  map: 'henan',
  roam: false,
  zoom: 1.2,
  labelColor: "#fff",
}


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
    series: [{
      type: 'map3D',
      map: 'henan',
      roam: true,
      itemStyle: {
        color: '#147c93',
        borderWidth: 1,
        borderColor: '#0da6b9',
      },
      emphasis: {
        label: {
          color: config.labelColor,
        },
        itemStyle: {
          color: '#2da5bc',
        },
      }
    }]
  });
});