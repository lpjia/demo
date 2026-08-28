<template>
  <div>
    <Child @zdy="fn" />
  </div>
</template>

<script setup>
import Child from './15-ChildApp.vue';

function fn(e) {
  console.log('父组件 e:', e) // undefined 没数据
}
</script>

<style scoped></style>
