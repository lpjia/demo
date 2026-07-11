// import {
//   reactive, toRefs, computed,
//   onMounted, onUpdated, onUnmounted
// } from "vue";

export default () => {
  const state = reactive({
    num: 1,
    type: '奇数',
    n: computed(() => state.num + 100),
  })

  let timer = null

  const autoPlay = () => {
    state.num++
    if (state.num > 5) state.num = 0
  }

  const play = () => {
    timer = setInterval(autoPlay, 1000)
  }

  // 挂载
  onMounted(() => {
    play()
  })
  onUpdated(() => {
    state.type = state.num % 2 === 0 ? '偶数' : '奇数'
  })

  // 销毁
  onUnmounted(() => {
    clearInterval(timer)
  })
  const stopTimer = () => {
    clearInterval(timer)
  }

  return {
    ...toRefs(state), // 直接解构, 会失去 vue 响应式渲染, 所以用 toRefs
    stopTimer
  }
}