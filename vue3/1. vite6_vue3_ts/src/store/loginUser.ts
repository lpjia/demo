import { defineStore } from 'pinia'
import { ref } from 'vue'

/* 在 Setup Store 中：
  ref() 就是 state 属性
  computed() 就是 getters
  function() 就是 actions
占位 */

export const useMainnnStore = defineStore(
  'main',
  () => {
    const someState = ref('hello pinia')

    /* 要让 pinia 正确识别 state，你必须在 setup store 中返回 state 的所有属性。 */
    return { someState }
  },
  {
    persist: true,
  },
)