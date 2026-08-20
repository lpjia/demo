<template>
  <app-child @zdy-handle="fn" class="fontColor"></app-child>
  <!-- class样式也透传到了子组件的根元素上 -->
</template>

<script setup lang='ts'>
import AppChild from './12-ChildApp.vue'

function fn(v: string, more: string) {
  console.log('子触发自定义事件', v, more)
}
</script>

<style scoped lang="scss">
.fontColor {
  color: red;
}
</style>
