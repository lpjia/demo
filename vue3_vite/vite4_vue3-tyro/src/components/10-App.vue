<template>
  <div>

  </div>
</template>

<script setup lang='ts'>
import { onMounted } from 'vue';

// 类型增强
onMounted(() => {
  console.log(globalVar, globalArrItem, globalFn())
})
</script>

<style scoped lang="scss"></style>
