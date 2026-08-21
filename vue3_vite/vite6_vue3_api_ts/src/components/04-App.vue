<template>
  <p>watch watchEffect computed 带参函数</p>
  <p>04-App</p>
  count: {{ count }}
  <button @click="clk">按钮</button>
  count2.num: {{ count2.num }}
  <hr>
  <button @click="stopWatchFn">按钮2</button>
  <hr>
  <button @click="speed--">-1</button>
  <span>速度: {{ speed }}</span>
  <button @click="speed++">+1</button>
  <hr>
  <div>
    <!-- 方法在 template 上必须要加()来调用, 否则会被vue视为变量
      编译为字符串源码
    -->
    <span>{{ fn(someValue) }}</span>
    <button @click="someValue++">按钮3</button>
  </div>
  <hr>
  <div>
    <p>计数器: {{ count4 }}</p>
    <button @click="count4++">增加 count4</button>
    <p>计算结果1: {{ fn2(2) }}</p>
    <p>计算结果2: {{ fn2(2) }}</p>
    <p>计算结果3: {{ fn2(3) }}</p>
    <p>计算次数: {{ computeCount4 }}</p>
  </div>
</template>

<script setup lang='ts'>
import { computed, reactive, ref, toRefs, watch, watchEffect } from 'vue';

const count = ref(10)

/* watch
一参是要监听的响应式数据
二参是数据更新时执行的回调, 是监听的一参数据发生变化时才运行二参
三参是配置项, {
  immediate?: Immediate; // 立即监听
  deep?: boolean; // 深度监听
}

返回值可以存成变量, 调用后停止监听, 例子是stopWatchFn

watch一参传的不是函数的话, 会在内部被转为函数, 也就是参数归一化, 例子是 watch(() => count.value, ... */
watch(count, (val, oldVal) => {
  console.log('count:', val, oldVal)
})



const count2 = reactive({
  num: 20
})

// /* 一参传非响应式数据会报错 */
// watch(count2.num, (val, oldVal) => {
//   console.log('count2.num:', val, oldVal)
// })

// /* 两种写法 */
// watch(toRefs(count2).num, (val, oldVal) => {
//   console.log(val, oldVal)
// })

// /* 第二种写法更简单 */
// watch(() => count2.num, (val, oldVal) => {
//   console.log('count2.num:', val, oldVal)
// })

// /* 也可以用数组类型 */
// watch([() => count2.num], (val, oldVal) => {
//   console.log('count2.num:', val, oldVal)
// })

// 通过方法改变watch监听的数据, 触发watch回调
const clk = () => {
  count.value++
  count2.num++
}


/* watch第二个参是函数, 什么时候会运行? */
const n = ref(0)
const m = ref(0)
const getN = () => {
  console.log('getN')
  return n.value + m.value
}
watch(
  () => getN(),
  (val, oldVal) => {
    console.log('二参函数运行:', val, oldVal)
  }
)
setTimeout(() => {
  n.value++ // 只有n的值变化时, 会打印'二参函数运行...'
  m.value-- // 当m的值也变化时, m+n的和不变, 这时候watch监听的一参函数, 本质上返回值没有变化, 所以也就不会运行二参函数, 但是依旧会重新运行一参函数和依赖的getN函数
}, 1000);




// watchEffect 会立即侦听
// 监听里面所有数据的变化
const stopWatchFn = watchEffect((onCleanup) => {
  count
  count2

  /* 下面2行代码打印了数据, 其实也是读到了响应式数据, 应该不需要上面2行代码
  但一般情况下, 是不打印, 直接读响应式数据, 也就是需要上面2行代码, 不需要下面2行打印 */
  console.log(count.value)
  console.log(count2.num)
})

const speed = ref(5)
/* watchEffect的异步问题async
watchEffect 只收集同步代码的依赖, 也就是说await之前的代码
watchEffect 仅会在其同步执行期间，才追踪依赖。在使用异步回调时，只有在第一个 await 正常工作前访问到的属性才会被追踪。 */
watchEffect(async () => {
  speed.value // 不想改动await那块的代码, 就在前面写一个响应式数据让vue依赖收集
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



const someValue = ref(0)
function fn(value: number) {
  console.log('方法在template上调用')
  return value * value
}



const count4 = ref(0)
const computeCount4 = ref(0)
function fn2(val: number) {
  console.log('fn2执行')
  return count4.value * val
}
// 使用watch监控计算属性的依赖变化，统计计算次数
watch(count4, () => {
  // 每次count4变化时，说明计算属性可能会被重新计算
  computeCount4.value++
})


/* 避免在计算属性内部修改响应式数据, 会触发无限递归 */
/* const computedValueWithParam = computed(() => {
  console.log('带参的计算属性')
  return (val: number) => {
    console.log('带参的计算属性', 222)
    computeCount4.value++  // 记录计算次数
    return count4.value * val
  }
}) */

</script>

<style scoped lang="scss">
span {
  margin: 0 10px;
}
</style>
