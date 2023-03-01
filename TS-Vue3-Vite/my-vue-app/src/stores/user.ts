import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";

export const useUserStore = defineStore('user', () => {
  const token = ref('123')
  const hehe = ref('456')
  const count = ref(0)
  const arr = ref([
    { name: '111' },
    { name: '222' },
    { name: '333' },
    { name: '444' },
    { name: '555' },
    { name: '666' },
  ])

  // computed(arr, () => {

  // })

  const setToken = () => {
    console.log('方法')
  }
  const getToken = () => {

  }
  // const changeArr = () => {
  //   arr.value.pop()
  // }

  // state

  return { token, hehe, count, arr, setToken, getToken }
}, {
  // persist: true
  persist: {
    afterRestore: (ctx) => {
      console.log(ctx)
      console.log(`刚刚恢复完 '${ctx.store.$id}'`)
    },
  }
})