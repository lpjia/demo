<template>
  <div>
    <p>生命周期 ref绑定原生dom和vue组件, useTemplateRef是vue3.5+</p>
    <p>03-App</p>
    <!-- <p ref="op">这是p标签</p> -->
    <!-- <p ref="op2">这是p标签</p> -->
    <ChildApp ref="op2" />
  </div>
</template>

<script setup lang='ts'>
import { useTemplateRef, ref, onMounted, nextTick } from 'vue'
import ChildApp from "./03-ChildApp.vue";

/* 如果用于普通 DOM 元素，引用将是元素本身；如果用于子组件，引用将是子组件的实例 */


// /* ref 获取标签, 变量名得和标签上的ref属性的值一致, 否则获取不到 */
// const op = ref()

/* useTemplateRef是vue3.5+, 变量名不必与标签上的ref属性的值一致 */
const op = useTemplateRef('op2')

// /* 正确获取组件的类型 */
// const op = useTemplateRef<InstanceType<typeof ChildApp>>('op2')


// 后执行
nextTick(() => {
  console.log('nextTick: ', op.value)
})

// console.log(op)
// console.log('setup: ', op.value) // undefined, 原因是生命周期钩子不对

onMounted(() => {
  console.log('onMounted: ', op.value) // 因为 ref 本身是作为渲染函数的结果来创建的，必须等待组件挂载后才能对它进行访问
})

// 比onMounted先执行
console.log(op) // 取不到.value的值, 没多大用
console.log('setup: ', op.value) // undefined, 原因是生命周期钩子不对

// nextTick(() => {
//   console.log('nextTick: ', op.value)
// })

</script>

<style scoped lang="scss">
p {
  color: deepskyblue;
}
</style>
