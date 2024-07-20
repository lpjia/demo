import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useTalkStore = defineStore(
  'talk',
  () => {
    const talkList = reactive([
      { id: '1001', title: '今天你有点怪, 哪里怪? 怪好看的!' },
      { id: '1002', title: '草莓、蓝莓、蔓越莓, 你想我了没?' },
      { id: '1003', title: '心里给你留了一块地, 我的死心塌地' },
    ])

    return { talkList }
  },
  {
    persist: true,
  }
)
