let config = {
  type: 'map',
  map: '410000',
  roam: true,
  zoom: 1.2,
  labelColor: "#fff",
  areaColor: {
    type: 'radial',
    x: 0.5, y: 0.5, r: 0.5,
    colorStops: [
      { offset: 0, color: '#2398ad' },
      { offset: 1, color: '#022f4c' }
    ],
    global: false // 缺省为 false
  },
}
  // , cityCodeObj = {}
  , chart = null
  , loadTopLayerUrl = ''
  , loadBtmLayerUrl = ''


loadTopLayerUrl = `map/provice/${config.map}.json`
loadBtmLayerUrl = `map/provice/_${config.map}.json`



new Vue({
  el: '#app',
  data() {
    return {
      cityArr: areaList.cities,
      selectVal: ''
    }
  },
  mounted() {
    loadMapJson()
  },
  methods: {
    selectChange(val) {
      console.log('val: ', val)
      loadTopLayerUrl = `map/city/${val}.json`
      loadBtmLayerUrl = `map/city/_${val}.json`
      loadMapJson()
    }
  }
})



async function loadMapJson() {
  let promiseArr = [axios.get(loadTopLayerUrl), axios.get(loadBtmLayerUrl)]
    , resArr = await Promise.all(promiseArr)
    , mapJson = resArr[0].data
    , _mapJson = resArr[1].data
  echarts.registerMap(`${config.map}`, mapJson);
  echarts.registerMap(`_${config.map}`, _mapJson);

  if (chart) chart.dispose()
  chart = echarts.init(document.getElementById('mapDiv'));
  chart.setOption({
    geo: {
      type: config.type,
      map: `_${config.map}`,
      roam: false,
      zoom: config.zoom,

      itemStyle: {
        borderWidth: 0,

        areaColor: config.areaColor,

        shadowColor: '#2273e2',
        shadowBlur: 1,
        shadowOffsetX: 0,
        shadowOffsetY: 10,
      },
      emphasis: {
        label: {
          show: false
        },
        itemStyle: {
          areaColor: config.areaColor,
        }
      }
    },
    series: [
      {
        type: config.type,
        map: config.map,
        roam: true,
        zoom: config.zoom,
        /* label: {
          color: config.labelColor,
        }, */
        itemStyle: {
          areaColor: 'transparent',
          borderWidth: 1,
          borderColor: '#0ff2ff',
        },
        emphasis: {
          itemStyle: {
            areaColor: '#2da5bc',
            // areaColor: '#00cdff',
          },
          label: {
            color: config.labelColor,
          }
        },
        /* select: {
          label: {
            show: false
          },
          itemStyle: {
            areaColor: '#188da3',
          },
        }, */
        markPoint: {
          symbol: 'image://img/point.svg',
          symbolSize: [70, 50],
          symbolOffset: [0, '-50%'],
          label: {
            show: true,
            offset: [10, -10],
            color: '#fff',
            formatter: '{c} 条'
          },
          data: []
          /* data: [
            {
              coord: [cityCenterList[6].coordX, cityCenterList[6].coordY],
              value: +cityCenterList[6].level * 10,
            },
            {
              coord: [cityCenterList[3].coordX, cityCenterList[3].coordY],
              value: +cityCenterList[6].level * 10,
            },
          ] */
        },
        data: []
        /* data: [
          {
            name: cityCenterList[3].name,
            itemStyle: {
              areaColor: '#2da5bc'
            }
          },
          {
            name: cityCenterList[6].name,
            itemStyle: {
              areaColor: '#2da5bc'
            }
          }
        ] */
      }
    ]
  });

  let r = await axios.get('mock/data.json')
    , res = r.data
    // 遍历城市数据, 比对本地城市数据, 合并坐标
    , result = res.map(item => {
      for (let i of cityCenterList) {
        if (item.cityName === i.name) {
          return { ...item, ...i }
        }
      }
    })
    , seriesData = []
    , seriesMarkPointData = []

  result.map(item => {
    seriesData.push({
      name: item.name,
      itemStyle: {
        areaColor: '#2da5bc'
      },
      label: {
        show: true,
        color: config.labelColor,
      }
    })
    seriesMarkPointData.push({
      coord: [item.coordX, item.coordY],
      value: item.tunnelCount
    })
  })

  chart.setOption({
    series: [
      {
        data: seriesData,
        markPoint: {
          data: seriesMarkPointData
        }
      }
    ]
  })


  chart.on("mouseover", params => {
    console.log(params.data)
    if (params.data == undefined) {
      chart.dispatchAction({
        type: 'downplay'
      });
    }
  });


  // 缩放
  chart.on('georoam', function (params) {
    let option = chart.getOption(); //获得option对象
    if (params.zoom != null && params.zoom != undefined) { //捕捉到缩放时
      option.geo[0].zoom = option.series[0].zoom; //下层geo的缩放等级跟着上层的geo一起改变
      option.geo[0].center = option.series[0].center; //下层的geo的中心位置随着上层geo一起改变
    } else { //捕捉到拖曳时
      option.geo[0].center = option.series[0].center; //下层的geo的中心位置随着上层geo一起改变
    }
    chart.dispatchAction({ //上下层同时缩放
      type: 'restore'
    })
    chart.setOption(option); //设置option
  });

}





axios.get(`map/provice/${config.map}.json`).then(res => {
  let mapJson = res.data
  // console.log('res: ', res)
  echarts.registerMap(`${config.map}`, mapJson); // 注册地图



  let chart2 = echarts.init(document.getElementById('mapDiv2'));
  chart2.setOption({
    geo: {
      type: config.type,
      map: config.map,
      roam: config.roam || true,
      zoom: config.zoom,
      itemStyle: {
        borderColor: '#0ba6b9',
        borderWidth: 6,
        // 这里加阴影, 作为底图
        shadowColor: '#000',
        shadowOffsetX: 0,
        shadowOffsetY: 10,
      },
      emphasis: {
        label: {
          show: false,
        },
        itemStyle: {
          areaColor: '#2da5bc',
        },
      }
    },
    series: [{
      type: config.type,
      map: config.map,
      roam: config.roam || true,
      zoom: config.zoom,
      label: {
        color: config.labelColor,
      },
      itemStyle: {
        borderWidth: 1,
        borderColor: '#0ba6b9',
        areaColor: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: 'red' },
            { offset: 1, color: 'blue' }
          ],
          global: false // 缺省为 false
        },
      },
      emphasis: {
        itemStyle: {
          areaColor: '#2da5bc',
        },
        label: {
          color: config.labelColor,
        }
      }
    }]
  });



  let chart3 = echarts.init(document.getElementById('mapDiv3'));
  chart3.setOption({
    geo: {
      type: config.type,
      map: config.map,
      roam: config.roam || true,
      zoom: config.zoom,
      itemStyle: {
        borderColor: '#0ba6b9',
        borderWidth: 6,
        // 这里加阴影, 作为底图
        // shadowColor: '#4392ea',
        shadowColor: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: 'red' },
            { offset: 1, color: 'blue' }
          ],
          global: false // 缺省为 false
        },
        shadowOffsetX: 0,
        shadowOffsetY: 10,
      },
      emphasis: {
        label: {
          show: false,
        },
        itemStyle: {
          areaColor: '#2da5bc',
        },
      }
    },
    series: [{
      type: config.type,
      map: config.map,
      roam: config.roam || true,
      zoom: config.zoom,
      label: {
        color: config.labelColor,
      },
      itemStyle: {
        borderWidth: 1,
        borderColor: '#0ba6b9',
        areaColor: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [{
            offset: 0, color: '#24a0fa'
          }, {
            offset: 1, color: '#15072a'
          }],
          global: false // 缺省为 false
        },
      },
      emphasis: {
        // itemStyle: {
        //   areaColor: '#2da5bc',
        // },
        // label: {
        //   color: config.labelColor,
        // }

        show: false,
        areaColor: null,
      }
    }]
  });

});