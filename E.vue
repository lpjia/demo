<template>
  <div>
    <div id="main" ref="main"></div>
  </div>
</template>

<script>
function moneyFormat(money, num) {
  // 如果小于10则不进行转换
  if (money === 0) return money
  //去掉字符串中除数字、点号、负号外的其他字符
  // money=cusParseFloat((money+'').replace(/[^\d.-]/g,''))
  money = parseFloat((money + '').replace(/[^\d.-]/g, ''))
  if (num || num === 0) {
    money = money.toFixed(num)
  } else {
    money = money.toFixed(2)
  }
  const re = /^(-?\d+)(\d{3})(\.?\d*)/

  while (re.test(money)) {
    money = money.replace(re, '$1,$2$3')
  }
  return money
}
// import echars from '@/plugins/echars'
export default {
  name: 'E',
  data() {
    return {
      isFull: false, //false为非全屏，true为全屏
    }
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    let myChart = this.$echarts.init(this.$refs.main)
    let option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999',
          },
        },
      },
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },

      xAxis: [
        {
          type: 'category',
          data: ['20210320', '20210321', '20210323', '20210324', '20210325'],
          axisPointer: {
            type: 'shadow',
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          name: '左侧',
          splitNumber: 5,
          //  interval: (yRightMax - 0) / 5,
        },
        {
          type: 'value',
          name: '右侧',
          splitNumber: 5,
          max(val) {
            console.log(val)
          },
          //  interval: (yRightMax - 0) / 5,
        },
      ],
      series: [
        {
          name: '测试1',
          data: [1501, 501, 111, 701, 441],
          type: 'bar',
        },
        {
          name: '测试2',
          data: [1662, 502, 112, 702, 442],
          type: 'bar',
        },
        {
          name: '测试3',
          type: 'line',
          yAxisIndex: 1,
          data: [820, 932, 901, 934, 1290],
        },
        {
          name: '测试4',
          type: 'line',
          yAxisIndex: 1,
          data: [422, 333, 111, -1350, 600],
        },
        {
          name: '测试5',
          type: 'line',
          yAxisIndex: 1,
          data: [-1000, 552, 592, 1420, 200],
        },
      ],
    }
    //计算最大值
    function calMax(arr) {
      /*  let max = 0
      arr.forEach((el) => {
        el.forEach((el1) => {
          if (!(el1 === undefined || el1 === '')) {
            if (max < el1) {
              max = el1
            }
          }
        })
      }) */
      // let maxint = Math.ceil(max / 9.5) //不让最高的值超过最上面的刻度
      // let maxval = maxint * 10 //让显示的刻度是整数
      // return maxval
      // return max
      // console.log(max)
      // 第一种
      arr = arr.flat(Infinity)
      return 0 < Math.max(...arr.map((i) => i))
        ? Math.max(...arr.map((i) => i))
        : 0
      // 第二种 时间复杂度高
      /* return 0 < arr.flat(Infinity).sort((a, b) => b - a)[0]
        ? arr.flat(Infinity).sort((a, b) => b - a)[0]
        : 0 */
    }

    //计算最小值
    function calMin(arr) {
      /* let min = 0
      arr.forEach((el) => {
        el.forEach((el1) => {
          if (!(el1 === undefined || el1 === '')) {
            if (min > el1) {
              min = el1
            }
          }
        })
      })
      let minint = Math.floor(min / 10)
      let minval = minint * 10 //让显示的刻度是整数
      //  return minval
      return min
      */
      // 第一种
      arr = arr.flat(Infinity)
      return 0 > Math.min(...arr.map((i) => i))
        ? Math.min(...arr.map((i) => i))
        : 0

      // 这里判断是否有负数 第二种 时间复杂度高
      /* return 0 > arr.flat(Infinity).sort((a, b) => a - b)[0]
        ? arr.flat(Infinity).sort((a, b) => a - b)[0]
        : 0 */
    }
    let data = option.series
    //  Min1放左侧Y轴的数据   Min2放右侧Y轴的数据  Max同理
    var Min1 = calMin([data[0].data, data[1].data]),
      Min2 = calMin([data[2].data, data[3].data, data[4].data]),
      Max1 = calMax([data[0].data, data[1].data]),
      Max2 = calMax([data[2].data, data[3].data, data[4].data])

    option.yAxis[0].interval = (Max1 - Min1) / 5
    option.yAxis[0].min = Min1
    option.yAxis[0].max = Max1
    option.yAxis[1].interval = (Max2 - Min2) / 5
    option.yAxis[1].min = Min2
    option.yAxis[1].max = Max2
    // let yRightMax = rightList.sort((v1, v2) => v2 - v1)[0];
    myChart.setOption(option)
  },
}
</script>

<style>
#main {
  height: 800px;
}
</style>
