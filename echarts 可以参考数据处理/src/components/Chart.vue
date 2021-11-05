<template>
  <div id="main" ref="main"></div>
</template>

<script>
// 解决刻度不对齐示例
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

// import {debounce} from "@/utils";
import debounce from 'lodash/debounce'

export default {
  name: 'Chart',
  props: ['fullScreenDiaglog', 'chartData', 'mark'],
  data() {
    this.myChart = null
    this.fullChart = null
    this.resizeHandler = null
    return {
      isFull: false, //false为非全屏，true为全屏
    }
  },
  watch: {
    chartData(newVal) {
      this.initChart(newVal)
    }
  },
  computed: {
    showDiaglog: {
      get() {
        return this.fullScreenDiaglog
      },
      set(val) {
        this.$emit('update:fullScreenDiaglog', val)
      }
    },
  },
  mounted() {
    this.resizeHandler = debounce(() => {
      if (this.myChart) this.myChart.resize()
      if (this.fullChart) this.fullChart.resize()
    },300, {
  'leading': false,
  'trailing': true
})
    // 图表自适应
    window.addEventListener('resize', this.resizeHandler)
  },
  methods: {
    initChart(chartData) {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(this.$refs.main)

      //计算最大值
      function calMax(arr) {
        arr = arr.flat(Infinity)
        //不让最高的值超过最上面的刻度  Math.ceil
        // Math.ceil 向上取整小数部分直接舍去，并向正数部分进1  2843.65  = 2844
        let integer = 0 < Math.max(...arr) ? Math.max(...arr) : 0
        integer = Number.isInteger(integer) ? Math.ceil(integer / 8.5) * 10 : +(integer / 8.5 * 10).toFixed(2)
        return integer
      }

      //计算最小值
      function calMin(arr) {
        arr = arr.flat(Infinity)
        // Math.floor 向下取整小数部分直接舍去  2843.65  = 2843
        let integer = 0 > Math.min(...arr) ? Math.min(...arr) : 0
        integer = Number.isInteger(integer) ? Math.ceil(integer / 8.5 ) * 10 : +(integer / 8.5 * 10).toFixed(2)
        return integer
      }

      let data = chartData.series
      let leftData = []
      let rightData = []
      let options = {
        ...chartData
      }
      if (chartData.series) {
        data.forEach(item => {
          // 左侧Y轴
          if (!item.yAxisIndex) {
            leftData.push(item.data)
          } else {
            // 右侧Y轴
            rightData.push(item.data)
          }
        })
        //  Min1放左侧Y轴的数据   Min2放右侧Y轴的数据  Max同理
        let Min1 = calMin(leftData),
          Max1 = calMax(leftData),
          Min2 = calMin(rightData),
          Max2 = calMax(rightData)
        console.log(Min1, Max1, Min2, Max2)
        // interval设置坐标轴分割间隔  / 10 代表显示多少个刻度
        chartData.yAxis[0].interval = (Max1 - Min1) / 5
        chartData.yAxis[0].min = Min1
        chartData.yAxis[0].max = Max1
        chartData.yAxis[1].interval = (Max2 - Min2) / 5
        chartData.yAxis[1].min = Min2
        chartData.yAxis[1].max = Max2
        options = {
          ...options,
          legend: {},
          // 防止90°出现文字不显示全问题
          grid: {
            // left: '10%',
            bottom: '20%'
          },
          toolbox: {
            show: true,
            showTitle: false,
            top: "-5px",
            itemSize: 20,
            feature: {
              // 自定义工具 只能以my开头
              myTool: {
                show: true,
                // title: self.isFull == true ? '取消全屏' : '全屏',
                title: '全屏',
                icon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAAC' +
                  'tWK6eAAAOrklEQVR4Xu2dW6icVxXH15pcoODtRaWBgtCLkngamr0nSatgL9C0asGiPajQoi9HUB' +
                  'QvTfqg0BT0oWm1oih4XpQWqjRKhaptA7YVtE0ye6ekxxStDQiFFPXFGxRymSVfmeBpes7Mt' +
                  '/esvb/L/g/k6ay19lr///rNfJk55xsmPKAAFFhXAYY2UAAKrK8AAMF2QIEpCgAQrAcUACDYASgQ' +
                  'pwBeQeJ0Q1YhCgCQQozGmHEKAJA43ZBViAIApBCjMWacAgAkTjdkFaIAACnEaIwZpwAAidMNWYUo' +
                  'AEAKMRpjxikAQOJ0Q1YhCgCQQozGmHEKAJA43ZBViAIApBCjMWacAgAkTjdkFaIAACnEaIwZpwAAi' +
                  'dMNWYUoAEAKMRpjxikAQOJ0Q1YhCgCQQozGmHEKAJA43ZBViAIApBCjMWacAtkAWVlZueT06dP7xu' +
                  'Pxjcx8RVy7SbO+LyKPD4fDx5Oe0vLio9HoZma+mYi+2LZWReSlwWBwaPPmzQcWFhZeydFfFkCOHTu2d' +
                  'TweP0JE23IMNc8ZzLzfGHPPPDW6muu9v1tE9neg/xODwWBxx44dL6buNQsgzrkKjttSD6NVX0TuGA6HD2' +
                  'nV60Kd0Wh0OzM/2IVeJz0etNYupu43FyCSehDt+sxsjTFeu24b63nvjYi4NvY2rSdrbfL9TX5ANaBzrouAP' +
                  'GCM+WrXliamX+/9d0TkKzG5TeYAkAbVZ+ZfGGM+0WAL2Y723v9cRD6e7UClgwCIkpCRZZ6x1l4XmdupNOfc00' +
                  'R0baeaJiIA0qBjzPxdY0znLjtiJPPePyAiX47JbTIHgDSoPjPfYIx5qsEWsh3tvb9eRH6b7UClgwCIkpARZYq5' +
                  'vDqvTRcvswBIxGZrpJT0Fu95vbr4Vi8A0dj2gBoisjwYDJZL+fzjQmkqSMbj8RIzLwXI1lgoAJkiffUrIYrOeBHx' +
                  '1tpXFWt2tpRz7mJmNkRU/VN5pPgVFgAy25pFa+3B2WGIaEoB51z1K0bVrxqpPwBIPUkBST2dskelhKMaBoDUtxSQ1Ncq' +
                  'S2RqOABIuI2AJFyzJBk54AAgcdYBkjjd1LJywQFA4i0DJPHazZWZEw4AMpdVBEjm0y84OzccACTYojclAJL5NaxVoQ' +
                  'k4igak+hBQ6YMlQFJrxeODtOCI8bzYt3knYlV/kK/xARMgid//qZlacBDRIjNvDX1SLBqQ6s4imgbgE3ddSrS9ibmj' +
                  'SvGAVJZqG6G7JmVWS+EJAAnYpQvvTZXCkIB2ELpKgVReAJCANVvr5m2pjAloq/jQlB4AkID1Wu/uhikNCmivyNDU2g' +
                  'OQgLWadvvP1EYFtFlMaA7NAUjAOs26P24OwwLa7XVoLq0BSMAazQIE724FiDlHaC44qhYBSIBRdQABJAGCRoTmhAO' +
                  'ABN6bty4ggCRi82uk5IYDgCQEBJDU2PiAkCbgACCJAQEkAQRMCW0KDgCSARBAMh8kTcIBQDIBAkjiIGkaDgCSERBAEgZJG' +
                  '+AAIJkBAST1IGkLHACkAUAAyXRI2gRH8YB4758VkavrPa8RhXwOMqtm2xZhVr85ft5GTUI/SWfm54wx16TWK9eXeP6AiD5f' +
                  'dxgRWRgOh3+sGz8rro0LMavnVD9vqxaj0ej9zLwSMPcPrbVfCIiPCs0CiPd+j4g8UbPDI9ba3TVja4e1dTFqD6AQ2HYNnHOH' +
                  'iWhXnVGZ+SZjzJN1YueJyQJI1eBoNNrHzPfOaPZf4/H4wzt37nx2nqHWy237gqSY+XzNLsx+9OjRawaDwW+I6O3TtBCRu4bD' +
                  '4YGUep2vnQ2Q6sAZJnlm/pYx5tGUg2styrlz567ZtWvXcyl71ap95MiRqzds2KDxpJP8DjHe+1tF5OtTvpskeQ+rdc8KSHVwd' +
                  'blFRNUllBGRsyJyajAYvGCMWdZaiFl1lCA5aK1dnHVWG37unKtun1R9T8c8j6yL6b1fGo/HVzLzFmbeWK0OER3OcVnVKCDzOKSZ' +
                  'qwFJjtvOaMzsAt9mX+PMrHBozKxVI/sriFbjGnXmhaQQQIqFo9qxogGp8f+iqRwWAEjRcACQyfpHvpJ05rvUI78DvXg4AMiq14cIS' +
                  'O631u7VuNRLXcM5dx8R3RlwDuCYiFX8JdbqpQmA5E+bNm360Pbt2/8esHSNhR4/fvxdZ86c+R0Rva9GE4BjlUgA5IKNmbwPXz3jXrr' +
                  'WMjHzKSK63RjzVI1la02I9/56InpIRLas09RJZt6b+nOo1ghSsxEAsoZQzrkKjgqSG4jobZOQE8x8UESWrbWv1tS3VWHOuYuZeUlEqs' +
                  '9Etk2a+zcR/ZaI9lprT7aq4RY0A0BmmOC9rz7QPNVVKNYbbwLLFmNM9QEcHusoAECwGlBgigIABOsBBQAIdgAKxCmAV5A43ZBViAIAp' +
                  'BCjMWacAgAkTjdkFaIAACnEaIwZpwAAidMNWYUoAEAKMRpjxikAQOJ0Q1YhCgCQQozGmHEKAJA43ZBViAIApBCjMWacAgAkTjdkFaIAA' +
                  ' CnEaIwZpwAAidMNWYUoAEAKMRpjxikAQOJ0Q1YhCgCQQozGmHEKAJA43ZBViAIApBCjMWacAgAkTjdkFaIAACnEaIwZpwAAidMNWYUoAEA' +
                  'KMRpjxikAQOJ0Q1YhCgCQQozGmHEKAJA43ZBViAIApBCjMWacAgAkTjdkFaIAACnEaIwZpwAAidMNWYUoAEAKMRpjxikAQOJ0Q1YhCgCQQo' +
                  'zGmHEKAJA43ZBViAIApBCjMWacAgAkTjdkFaIAACnEaIwZpwAAidMNWYUoAEBmGP38889ffu7cubG19mSfdsI5d+mGDRsGV1111V/6NJf2LA' +
                  'BkDUWr5SGi+4jog0T0zknIX4noMWvtl7RNyFnPOfc9IrqFiN4zOfcfRPR7ItrbtycBDV0ByAUqeu9vFZEKjgqStR4vW2sv1xA/dw3nXPVqcdk' +
                  '6555k5r3GmEdz99Xm8wDIKnecc7cR0SM1DDtkrd1TI641Ic65J4noxhoNLVprD9aIKyIEgExsDoDj9Qxm3m+MuacLW+K9v1tE9gf0CkgmYgEQI' +
                  'gqFY6LdS9ba9wYsXWOhzrk/E9EVgQ0AkuqJMFC03oVHwvG6DiJy3XA4fKbNooxGo2uZ+enIHouHpGhA5oFjcpl1uTHm5cjly5Lmvb9MROZ5K7doS' +
                  'IoFZF44qu2+6KKL3rpt27b/Ztn0yENOnDjxltdee+0/kenn04qFJDsgzrnqnZQriegDRHSGiE4x84vGmOU5TaydrgGHiCwPh8PP1T60wcDRaPQj' +
                  'Zl6as4WskHjvl0RkKxFtIaJNRPQHInrBWntozjmC0rMCMuPdFE9E37TW/jJogsBgDTgml1fWGFP13PqH996IiFNoNDkkzrmPEdE3iMis1W/udw+z' +
                  'ATIajW5n5gdnmPRPIrrJWntEwcw3ldCCg4iSL4r2/F2Y3Tm3i4ieIKJ3TJtfRO4YDocPaWu0JpA5Dgl8Bjtqra2EUn10YUFUB16jWNs1cM5VT4w76' +
                  '+jAzFlewbO8goReA2sP3/bFqLMQWjFt1SLwSbR6iz3L/wGzAOKcq65/17ymTH2d2daF0Fr4mDpt1CTi035vrbUx84fk5AJEgppS+jWONi5CiA4pY9u' +
                  'mTQQgZK1Nvr/JD6hMds5lB6RtC5By2WNrt0kjABLg4rxv5bXJ+ICxGwlti1YAJMD+eQBpi+EB4zYe2gbNAEjAGsQC0gajA8ZsVWjT2gGQgHWIAaRpgw' +
                  'PGa21okxoCkIC1CAWkSWMDxupEaFNaApCA9QgBpClDA8bpXGgTmgKQgDWpC0gTRgaM0enQ3NoCkIB1qQNIbgMD2u9NaE6NAUjA2swCJKdxAW33MjSX1' +
                  'gAkYH2mAZLLsIB2ex+aQ3MAErBG6wGSw6iANosKTa09AAlYp7UASW1QQHvFhqb0AIAErNWFgKQ0JqAthMbfQ2wt7d7wV5kAJGC9VgMCOAKEyxSawhMAE' +
                  'mDeeUBSGBHQBkKnKKDtDQAJWLcKEBF5seaNpGdV7twNFmYN1Jafa0LCzFsD7x9c9h9MhYq1ztIAjsQ0aUEyeVIMucF2uYAoeQo4lIScVUYLklnnXPjzY' +
                  'v/kNlSoNeIBh4KIISWagASAhDj0/1jAEafb3Fm5IQEg4ZYBjnDNVDNyQgJAwqwDHGF6JYvOBQkAqW8h4KivVZbIHJAAkHpWAo56OmWPSg0JAJltKeCYrV' +
                  'GjESkhASBTrK0+WNJyXkSeO3v27PHdu3f/Tatml+scPnz43Rs3btzOzFdrzaH0we8b2gEgWu7UrFPdMXwwGCx35Ytxao5VO6y6w/p4PF5S+Daq2mfOEwhA5lFvj' +
                  'lxm3m6MeWGOEp1L9d5fKSLHu9Q4AGnOrUPW2j3NHZ//ZOfck0RUfX9kZx4ApEGrmPkWY8yvGmwh29He+4+KyGPZDlQ6CIAoCRlTJtc3GMX0pp0T+g1g2ufH1g' +
                  'Mgscrp5D1jrb1Op1S7qzjnniaia9vd5Zu7AyANOsbMPzPGfKrBFrId7b3/qYh8MtuBSgcBECUhI8t821p7Z2Rup9Kcc/cT0dc61TQR/mCqScOY+SZjTPXOT' +
                  'u8f3vs9IlJ9P3mnHn16BfkxEX2mK+qLyF3D4fBAV/rV6HM0Gu1j5ns1amWq8RNr7WdTn5XlSzyPHTu2dTweP0JE21IPpFC/2N/vSvl7Uwq+rC5xYjAYLO7Ysa' +
                  'O6sUfSRxZAqglWVlYuOX369D4RuZmILk06VVzxh4noYWvtr+PS+5HlnPsIEX168q9tQ51k5sc3b958YGFh4ZUczWUDJMcwOAMKaCsAQLQVRb1eKQBAemUnhtF' +
                  'WAIBoK4p6vVIAgPTKTgyjrQAA0VYU9XqlAADplZ0YRlsBAKKtKOr1SgEA0is7MYy2AgBEW1HU65UCAKRXdmIYbQUAiLaiqNcrBQBIr+zEMNoKABBtRVGvVwoAkF' +
                  '7ZiWG0FQAg2oqiXq8UACC9shPDaCsAQLQVRb1eKQBAemUnhtFWAIBoK4p6vVIAgPTKTgyjrQAA0VYU9XqlAADplZ0YRlsBAKKtKOr1SgEA0is7MYy2Av8D6FQyM' +
                  'lW6258AAAAASUVORK5CYII=',
                onclick: (e) => {
                  // 显示对话框
                  // 是否显示全屏工具
                  this.showDiaglog = true
                  this.$nextTick(() => {
                    // e.getOption()获取配置对象
                    this.drawChart('fullScreen', e.getOption())
                  })
                },
              },
            },
            tooltip: { // 和 option.tooltip 的配置项相同
              show: true,
              formatter: function (param) {
                return '<div>' + param.title + '</div>'; // 自定义的 DOM 结构
              },
              backgroundColor: '#222',
              textStyle: {
                fontSize: 12,
              },
              extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);' // 自定义的 CSS 样式
            }
          }
        }
      }
      this.myChart.setOption(options, true)
    },
    // 全屏按钮函数
    drawChart(elementId, option) {
      let element = document.getElementById(elementId)
      this.fullChart = this.$echarts.init(element)
      /*this.charts.setOption(option, {
        notMerge: true  // 不跟之前 option 进行合并
      })*/
      this.fullChart.setOption(option, true)
      // 全屏后不显示工具
      this.fullChart.setOption({
        toolbox: {
          feature: {
            myTool: {
              show: false
            }
          }
        }
      })
      // 默认触发一次
      this.fullChart.resize()
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler)
  }
}
</script>

<style>
#main {
  height: 450px;
}

</style>
