<script setup lang='ts'>
import { computed, reactive, ref, toRefs, watch, watchEffect } from 'vue';

const count = ref(10)

// watch
// 一参是要监听的响应式数据
// 二参是数据更新时执行的回调
watch(count, (val, oldVal) => {
  console.log('count:', val, oldVal)
})


const count2 = reactive({
  num: 20
})
// // 一参传非响应式数据会报错
// watch(count2.num, (val, oldVal) => {
//   console.log('count2.num:', val, oldVal)
// })
// // 两种写法
// watch(toRefs(count2).num, (val, oldVal) => {
//   console.log(val, oldVal)
// })
// // 第二种写法更简单
// watch(() => count2.num, (val, oldVal) => {
//   console.log('count2.num:', val, oldVal)
// })
// // 也可以用数组类型
// watch([() => count2.num], (val, oldVal) => {
//   console.log('count2.num:', val, oldVal)
// })

// 通过方法改变watch监听的数据, 触发watch回调
const clk = () => {
  count.value++
  count2.num++
}




// watchEffect 会立即侦听
// 监听里面所有数据的变化
const stopWatchFn = watchEffect((onCleanup) => {
  count
  count2
  console.log(count.value)
  console.log(count2.num)
})

const speed = ref(5)
// watchEffect的异步问题async
// watchEffect 只收集同步代码的依赖, 也就是说await之前的代码
// watchEffect 仅会在其同步执行期间，才追踪依赖。在使用异步回调时，只有在第一个 await 正常工作前访问到的属性才会被追踪。
watchEffect(async () => {
  speed.value // 不想改动await那块的代码, 就在前面写一个响应式数据让vue收集
  const url = "http://rap2api.taobao.org/app/mock/288967/api/random"
  const res = await (await fetch(url)).json(); // 或者有时候可以把await挪出来, 不必每次都重新fetch
  console.log(res)
})






// computed 只有get
const count3 = ref(10)
const plusOne = computed(() => count3.value * 1_000)
console.log(plusOne.value)
// computed 加上set
const plusOne2 = computed({
  get: () => count3.value * 1_000_000,
  set: (val) => {
    count3.value = val - 1
  }
})
plusOne2.value = 1_000
console.log(count3.value)
console.log(plusOne2.value)


</script>

<template>
  {{ count }}
  <button @click="clk">按钮</button>
  {{ count2.num }}
  <hr>
  <button @click="stopWatchFn">按钮2</button>
  <hr>
  <button @click="speed--">-1</button>
  <span>速度: {{ speed }}</span>
  <button @click="speed++">+1</button>
</template>

<style scoped lang="scss">
span {
  margin: 0 10px;
}
</style>
