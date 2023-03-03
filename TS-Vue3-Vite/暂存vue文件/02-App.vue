<script setup lang='ts'>
import { ref, reactive, toRefs, toRef } from 'vue'

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

</script>

<template>
  <div>
    <button @click="clk">{{ count }}</button>
    <button @click="clk2">{{ obj.num }}</button>
    <button @click="clk3">{{ cNum.val }}</button>
    <button @click="clk4">{{ state.foo }}</button>
    <hr>
    <span>{{ num }}</span>
    <span>{{ fooRef }}</span>
  </div>
</template>

<style scoped lang="scss">
button,
span {
  background-color: deeppink;
  color: #fff;
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
