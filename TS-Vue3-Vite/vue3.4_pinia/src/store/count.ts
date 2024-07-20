import { defineStore } from "pinia";
import { computed, ref } from "vue";

/* 在 Setup Store 中：
ref() 就是 state 属性
computed() 就是 getters
function() 就是 actions */

/* 定义仓库 */
export const useCountStore = defineStore(
  'count',
  () => { // setup是回调
    const sum = ref(1)
    const place = ref('德莱联盟')
    const doubleSum = computed(() => sum.value * 2)
    const add = () => {
      sum.value++
    }

    /* 最后得暴露出来才能用
    要让 pinia 正确识别 state，你必须在 setup store 中返回 state 的所有属性。 */
    return {
      sum, place, add,
      doubleSum
    }
  },
  {
    persist: true,
  }
)