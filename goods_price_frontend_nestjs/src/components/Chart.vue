<template>
  <v-chart class="chart" :option="option" :autoresize="{ throttle: 1000 }" />
</template>

<script setup lang="ts">
import type { ChartD } from '@/view/Query.vue'


import VChart, { THEME_KEY } from "vue-echarts";
import { ref, provide } from "vue";
provide(THEME_KEY, "light"); // light(默认值) dark

/* 以上3个和其他间隔开, 自动导入工具生成后的代码不包括它们 */


import { use } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { TooltipComponent, GridComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { ComposeOption } from 'echarts/core'
import type { LineSeriesOption } from 'echarts/charts'
import type { TooltipComponentOption, GridComponentOption } from 'echarts/components'
import { formatDatesByYear } from '@/utils/tool';


use([TooltipComponent, GridComponent, LineChart, CanvasRenderer])

type EChartsOption = ComposeOption<TooltipComponentOption | GridComponentOption | LineSeriesOption>

interface Props {
  data: ChartD[]
}
const props = defineProps<Props>()
const xData = ref(props.data.map(item => item.buyTime)) // 年月日 补全日期的数据
const xDisplayData = ref(formatDatesByYear(xData.value)) // 只保留每年首个日期的年的数据

const option = ref<EChartsOption>(
  {
    grid: {
      bottom: 40
    },
    tooltip: {
      trigger: 'axis',
      enterable: true,
      /* formatter: (params: any) => {
        // 对应数据源是二维数组
        const c = params[0].color
        const t = params[0].value[0]
        const v = params[0].value[1]
        const u = params[0].value[2]
        const html = `${t}<br>
      <span style="color:${c}"'>●</span>
      <span style="color:red;"">${v}</span> ${u}}<br>
      <div data-detail="yes" data-val="${params[0].value}">查看详情</div>`
        return html
      } */
      formatter: (params: any) => {
        const c = params[0].color;
        const t = params[0].name;
        const v = params[0].value;
        const u = params[0].data.unitName;
        const pricePer = params[0].data.pricePer;

        // 没值就不显示
        const pricePerHtml = pricePer? 
          `<span style='color:${c};'>●</span>
          <span style='color:${c};'>${pricePer}</span><br>`
          : '';

        const html = `${t}<br>
          <span style='color:${c};'>●</span>
          <span style='color:red;'>${v}</span> ${u}<br>
          ${pricePerHtml}
          <div data-val='${v}'>查看详情</div>`;
        return html;
      }
    },
    xAxis: {
      type: 'category',
      // data: [],
      // data: [11, 22, 33, 44, 55, 66, 77],
      data: xData.value,
      axisLabel: {
        interval: 0,
        rotate: 40,
        formatter: (value: string, index: number) => { // 显示月日
          // console.log(value, index, 222)
          const xDisplay = xDisplayData.value[index]
          let year = ''
            , monthDay = ''
          if (xDisplay.length === 10) {
            year = xDisplay.substring(0, 4)
            monthDay = xDisplay.substring(5)
          }
          else {
            monthDay = xDisplay
          }
          return `${year} \n${monthDay}`
        }
      },
      axisTick: {
        alignWithLabel: true
      },
      axisLine: {
        symbol: ['none', 'arrow']
      },
      splitArea: {
        show: true,
      }
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: props.data,
        type: 'line',
        label: {
          show: true,
          formatter: (param: any) => {
            // console.log(param, 111)
            return `${param.data.value}\n${param.data.unitName}`
          },
          color: 'red'
        },
        lineStyle: {
          color: 'deepskyblue'//折线的颜色
        },
        itemStyle: {
          color: 'deepskyblue' //圆的颜色 
        },
      }
    ]
  }
);





// -----------------------------------------------------

// const ins = ref<InstanceType<typeof VChart>>()
// function test2(params: unknown) {
//   console.log('test2')
//   console.log('params:', params)
//   // console.log('ins:', ins)
// }

// ins.value?.on('click', (params: any) => {
//   console.log('on clk params:', params)
// })

// ins.value?.dispatchAction({
//   type: 'showTip',
//   // 屏幕上的 x 坐标
//   x: 100,
//   // 屏幕上的 y 坐标
//   y: 100,
//   // 本次显示 tooltip 的位置。只在本次 action 中生效。
//   // 缺省则使用 option 中定义的 tooltip 位置。
// })


</script>

<style scoped>
.chart {
  height: 400px;
}
</style>