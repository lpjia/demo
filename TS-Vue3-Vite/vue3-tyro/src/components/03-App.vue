<script setup lang='ts'>
import { ref, onMounted, nextTick } from 'vue'

// ref 获取标签, 变量名得和标签上的ref属性的值一致, 否则获取不到
const op = ref()

// 后执行
nextTick(() => {
  console.log('nextTick: ', op.value)
})

// console.log(op)
// console.log('setup: ', op.value) // undefined, 原因是生命周期钩子不对

onMounted(() => {
  console.log('onMounted: ', op.value)
})

// 比onMounted先执行
console.log(op)
console.log('setup: ', op.value) // undefined, 原因是生命周期钩子不对

// nextTick(() => {
//   console.log('nextTick: ', op.value)
// })

</script>

<template>
  <div>
    <p ref="op">这是p标签</p>
  </div>
</template>

<style scoped lang="scss">
p {
  color: deepskyblue;
}
</style>
