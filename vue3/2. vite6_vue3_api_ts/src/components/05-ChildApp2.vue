<template>
  <div>
    这是子组件"响应式 Props 解构"后num2的值: {{ num2 }}
  </div>
</template>

<script setup lang='ts'>
import { watchEffect } from "vue";

/* 响应式 Props 解构 */
const { num2 } = defineProps(['num2'])

watchEffect(() => {
  // 在 3.5 之前只运行一次
  // 在 3.5+ 中在 "num2" prop 变化时重新执行
  console.log('num2:', num2)
})

</script>

<style scoped lang="scss"></style>
