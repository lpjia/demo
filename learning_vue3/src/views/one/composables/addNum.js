import { reactive, toRefs, computed, watch } from "vue";

export default () => {
  const state = reactive({
    num: 1,
    type: '奇数',
    n: computed(() => state.num + 100),
  })
  const changeNum = () => {
    state.num++
    console.log('state.num:', state.num)
    if (state.num >= 5) stop() // 停止监听
  }

  // 侦听单个数据源
  // 侦听一个 getter
  const stop = watch(() => state.num, (curr, old) => {
    console.log('curr:', curr)
    console.log('old:', old)
    state.type = curr % 2 === 0 ? '偶数' : '奇数'
  })

  return {
    ...toRefs(state), // 直接解构, 会失去 vue 响应式渲染, 所以用 toRefs
    changeNum
  }
}