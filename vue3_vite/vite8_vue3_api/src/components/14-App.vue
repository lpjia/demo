<template>
  <!-- 父 不同写法 -->
  <app-child @zdy-handle="(item, num) => fn(item, num)"></app-child>
</template>

<script setup>
import AppChild from './14-ChildApp.vue';

function fn(item, num) {
  console.log('子 触发自定义事件:', item, num);
}
</script>

<style scoped></style>
