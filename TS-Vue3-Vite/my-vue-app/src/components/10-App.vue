<script setup lang='ts'>
import { onMounted } from 'vue';

// 类型增强
onMounted(() => {
  console.log(globalVar, globalArrItem, globalFn())
})
</script>

<template>
  <div>

  </div>
</template>

<style scoped lang="scss"></style>
