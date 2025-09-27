import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCounterStore = defineStore(
  'counter',
  () => {
    const count = ref(0)

    function add() {
      count.value++
    }

    /* 在 Setup Stores 中，您需要创建自己的 $reset() 方法, 来重置state */
    function $reset() {
      count.value = 0
    }

    return {
      count,
      add,
      $reset
    }
  },
  {
    persist: true,
  }
)