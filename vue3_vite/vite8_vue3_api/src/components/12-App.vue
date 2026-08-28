<template>
  <!-- class样式也透传到了子组件的根元素上 -->
  <app-child @zdy-handle="fn" class="fontColor"></app-child>
</template>

<script setup>
import AppChild from './12-ChildApp.vue';

function fn(v, more) {
  console.log('子 触发自定义事件:', v, more);
}
</script>

<style scoped>
.fontColor {
  color: red;
}
</style>
