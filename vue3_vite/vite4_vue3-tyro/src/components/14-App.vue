<template>
  <div>
    父组件数据
  </div>
  <ChildApp />
</template>

<script setup lang='ts'>
import {
  onBeforeMount, onMounted,
  onBeforeUpdate, onUpdated,
  onBeforeUnmount, onUnmounted,
} from 'vue'
import ChildApp from "./14-ChildApp.vue";

/* 所有的生命周期钩子函数
都应该在组件的 setup() 阶段被同步调用

顺序:
setup 组合式, 代替了beforeCreate和created钩子
beforeCreate 创建前
created 创建完毕
挂载前
挂载完毕
等等 */
onBeforeMount(() => {
  console.log('%c挂载前----父组件', 'color:red')
})
onMounted(() => {
  console.log('%c挂载完毕----父组件', 'color:red')
})
onBeforeUpdate(() => {
  console.log('%c更新前----父组件', 'color:red')
})
onUpdated(() => {
  console.log('%c更新完毕----父组件', 'color:red')
})
onBeforeUnmount(() => {
  console.log('%c卸载前----父组件', 'color:red')
})
onUnmounted(() => {
  console.log('%c卸载完毕----父组件', 'color:red')
})
/* 父子组件挂载顺序
子先挂载完毕
父后挂载完毕 */
/* 推荐看云笔记上的"父组件和兄弟组件的生命周期" */

</script>

<style scoped lang="scss"></style>
