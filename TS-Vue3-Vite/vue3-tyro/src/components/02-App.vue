<template>
  <div>
    <button @click="clk">{{ count }}</button>
    <button @click="clk2">{{ obj.num }}</button>
    <button @click="clk3">{{ cNum.val }}</button>
    <button @click="clk4">{{ state.foo }}</button>
    <hr>
    <button @click="clk5">{{ num }}</button>
    <span>{{ fooRef }}</span>
    <hr>
    <ChildApp :count="count2" />
    <button @click="count2++">add</button>
  </div>
</template>

<script setup lang='ts'>
import { ref, reactive, toRefs, toRef } from 'vue'
import ChildApp from "./02-ChildApp.vue";

// ref 简单数据
const count = ref(0)
const clk = () => {
  count.value++
  console.log(count)
}


// reactive 复杂数据
const obj = reactive({
  num: 100
})
const clk2 = () => {
  obj.num++
  console.log(obj)
}


// ref复杂数据时, 得记得写.value
const cNum = ref({
  val: 200
})
const clk3 = () => {
  cNum.value.val++
  console.log(cNum)
}


// toRefs解构reactive对象而保持响应式
// 解构出的数据还需要.value的形式来操作
const { num } = toRefs(obj)
// const { num } = obj // 直接解构则失去了响应式
const clk5 = () => {
  num.value++ // 继续和obj.num保持响应式
  console.log(num)
}


// 作为对比, toRef()怎么用
const state = reactive({
  foo: 1,
  bar: 2
})
const fooRef = toRef(state, 'foo')
const clk4 = () => {
  // 都保持响应式
  fooRef.value++
  // state.foo++
}


// 最后一次谈响应式
const count2 = ref(0)
/* 响应式描述的是
函数与数据的关联, 不是数据与数据的关联
哪个函数与哪个数据的关联
1. 被监控的函数
    vue2 Watcher    vue3 effect
    上面是源码里的, 不清楚源码则看下面列举
    render, 也可以说模板
    computed回调
    watchEffect
    watch
2. 函数运行期间用到了响应式数据
    ref   reactive
    computed是ref, props是reactive
    响应式数据一定是对象类型, 原始类型不可能成为响应式数据, 原生js做不到的, vue也做不到
3. 响应式数据变化会导致函数重新运行 */

</script>

<style scoped lang="scss">
button,
span {
  background-color: deeppink;
  color: #fff;
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
