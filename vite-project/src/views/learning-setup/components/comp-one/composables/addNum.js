// import { reactive, toRefs, computed, watch } from "vue";

// 导出 fcn / 箭头函数, 都行
// export default function () {
export default () => {
  // 简单类型数据, 用 ref()
  const count = ref(0)

  // state 作为一个局部状态管理库
  // 针对非简单类型数据, 用 reactive()
  const state = reactive({
    num: 1,
    type: '奇数',
    dblNum: computed(
      () => state.num * 2
    ),
  })

  const changeNum = () => {
    count.value++
    state.num++ // 直接改变状态数据
    console.log('state.num:', state.num)
    if (state.num >= 5) {
      stop() // 停止监听
      state.type = 'num >=5 时, 停止监听'
    }
  }

  // 侦听单个数据源
  // 侦听一个 getter
  const stop = watch(
    () => state.num,
    (curr, old) => {
      console.log('curr:', curr)
      console.log('old:', old)
      state.type = curr % 2 === 0 ? '偶数' : '奇数'
    },
    // { deep: true } // 进入深层级模式
  )

  return {
    count,
    ...toRefs(state), // 直接解构, 会失去 vue 响应式渲染, 所以用 toRefs
    changeNum
  }
}