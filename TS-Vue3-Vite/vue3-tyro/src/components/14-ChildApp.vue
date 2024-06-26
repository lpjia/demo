<template>
  <div>

  </div>
</template>

<script setup lang='ts'>
import {
  onBeforeMount, onMounted,
  onBeforeUpdate, onUpdated,
  onBeforeUnmount, onUnmounted,
} from 'vue'

onBeforeMount(() => {
  console.log('%c挂载前----子组件', 'color: green')
})
onMounted(() => {
  console.log('%c挂载完毕----子组件', 'color: green')
})
onBeforeUpdate(() => {
  console.log('%c更新前----子组件', 'color: green')
})
onUpdated(() => {
  console.log('%c更新完毕----子组件', 'color: green')
})
onBeforeUnmount(() => {
  console.log('%c卸载前----子组件', 'color: green')
})
onUnmounted(() => {
  console.log('%c卸载完毕----子组件', 'color: green')
})
</script>

<style scoped lang="scss"></style>
