<template>
  <div>
    <el-form @submit.prevent="getProductByNameHandler">
      <el-row :gutter="10">
        <el-col :xs="12" :sm="12">
          <el-input v-model="productName" style="width: 100%;" :placeholder="formPlaceholder.input" clearable></el-input>
        </el-col>
        <el-col :xs="12" :sm="12">
          <button class="btn bg-blue-500 hover:bg-blue-600">查询</button>
        </el-col>
      </el-row>
    </el-form>
  </div>
  <div class="sm:my-2 md:my-6 lg:my-8 flex gap-2 flex-wrap btnGroup">
    <button v-for="product in productList" :key="product.id" @click="getProductPriceHistoryHandler(product)"
      class="btn bg-gray-500 hover:bg-gray-600">
      <!-- {{ '"' + product.productName + '"&nbsp;&nbsp;&nbsp;&nbsp;' + product.shopInfo.shopName }} -->
      {{ mo_ni_computedValueWithParams(product) + textOfShopAlive(product.shopInfo.isAlive) }} <!-- 值变了, 所以会重新调用 -->
    </button>
  </div>
  <p v-if="!productList.length" class="text-center">暂无数据</p>
  <p v-else class="text-center mb-2">总共 {{ productList.length }} 条</p>
  <div v-for="chart in chartContainerList" :key="chart.chartId" class="flex justify-center">
    <div class="wrap w-full">
      <h3>{{ displayChartTitle(chart.chartInfo) + textOfShopAlive(chart.chartInfo.isAlive) }}</h3>
      <Chart :data="chart.chartData" v-if="chart.show" />
      <ElDivider />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { getProductByName, getProductPriceHistory } from '@/api';
import Chart from '@/components/Chart.vue';
import { onUnmounted, ref, computed } from 'vue';
import type { PriceHistory, ProductTp } from '@/types/index'
import { formPlaceholder } from '@/utils/enum'
import dayjs from 'dayjs';



const productName = ref('') // 搜索栏
const productList = ref<ProductTp[]>([])

// export type ChartD = [string, number, string]
export type ChartD = {
  value: number;
  price: number;
  buyTime: string;
  unitName: string;
  spec: string;
  note: string;
}
interface ChartContainer {
  chartId: number;
  chartInfo: {
    productName: string
    shopName: string
    isAlive: string
  },
  chartData: ChartD[],
  show: boolean
}
/* 图表容器数组, 数组项代表着图表实例, 数组项顺序决定着图表实例的顺序 */
const chartContainerList = ref<ChartContainer[]>([])
/* 存点击后已展示的图表的id, 也就是productId */
const hadSeen = ref(new Set())

const getProductByNameHandler = () => {
  if (productName.value === '') {
    return false;
  }
  const d = {
    productName: productName.value
  }
  // 定义getProductByName函数的时候把参数类型定好, 调用时ts会自动推断
  getProductByName(d).then((res) => {
    productList.value = res as unknown as ProductTp[]

    resetChartList()
  })
}
// 避免在计算属性内部修改响应式数据, 会触发无限递归
function mo_ni_computedValueWithParams(product: ProductTp) {
  return '"' + product.productName + '" ' + product.shopInfo.shopName
}
function displayChartTitle(info: ChartContainer['chartInfo']) {
  return '"' + info.productName + '" ' + info.shopName
}


function textOfShopAlive(isAlive: string) {
  return isAlive === '0' ? '(倒闭了)' : ''
}

const priceHistory = ref<PriceHistory[]>([])
const getProductPriceHistoryHandler = async (product: ProductTp) => {
  const { id, productName, shopInfo: { shopName, isAlive } } = product
  try {
    if (!hadSeen.value.has(product.id)) {
      // 增加一个子组件
      chartContainerList.value.unshift({
        chartId: id,
        chartInfo: {
          productName,
          shopName,
          isAlive
        },
        chartData: [],
        show: false
      })
      hadSeen.value.add(id)
    }
    console.log('id:', id)
    priceHistory.value = await getProductPriceHistory(id) as unknown as PriceHistory[]

    for await (const chartContainer of chartContainerList.value) {
      if (chartContainer.chartId == id) {
        chartContainer.chartData.length = 0

        // 把当前找的排到最前面
        let index = chartContainerList.value.indexOf(chartContainer);
        if (index > -1) {
          chartContainerList.value.splice(index, 1);
          chartContainerList.value.unshift(chartContainer);
        }

        for await (const itemHistory of priceHistory.value) {
          const { price, buyTime, unitName, spec, note } = itemHistory
          const val = Number(price)
          const t = dayjs(buyTime).format('YYYY-MM-DD')
          chartContainer.chartData.push(
            {
              value: val,
              price: val,
              buyTime: t,
              unitName,
              spec,
              note,
            }
          )
          /* // buyTime price note spec unitName 
          chartContainer.chartData.push(
            [
              dayjs(itemHistory.buyTime).format('YYYY-MM-DD'),
              Number(itemHistory.price),
              itemHistory.unitName
            ]
          ) */
        }

        // 把值先准备好再跑子组件生命周期
        setTimeout(() => {
          chartContainer.show = true
        }, 50);

      }
    }



  } catch (error) {
    console.log('error:', error)
  }
}


const resetChartList = () => {
  chartContainerList.value.length = 0
  hadSeen.value.clear()
}


onUnmounted(() => {
  resetChartList()
})


/* const test = (e: MouseEvent) => {
  const t = e.target as HTMLElement
  // console.log(e.target)
  if (t.dataset.detail === 'yes') {
    // console.log('!!!')
    console.log(t.dataset.val)
    const arr = t.dataset.val?.split(',')
    console.log('分割成 arr:', arr)
  }
} */


</script>

<style scoped lang="scss">
.btn {
  --at-apply: text-white font-bold py-1 px-4 rounded shadow focus:outline-none focus:shadow-outline
}

h3 {
  font-size: 1.5rem;
  color: #333;
  text-align: center;
  margin: 0;
  padding: 10px 20px;
  background-color: #e0e0e0;
  border-radius: 10px;
  /* 阴影效果 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* 文本阴影效果 */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
}

@media screen and (max-width: 768px) {
  .btnGroup {
    margin: 0.5rem 0;
    max-height: 10rem;
    overflow: scroll;
  }

  h3 {
    font-size: 1rem;
  }
}
</style>
