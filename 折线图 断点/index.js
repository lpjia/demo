let dom = document.querySelector('#chart')

let myChart = echarts.init(dom)

let option = {
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['一', '二', '三', '四', '五', '六', '日']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, null, 135, 147, 260],
      type: 'line'
    }
  ]
};

myChart.setOption(option)
