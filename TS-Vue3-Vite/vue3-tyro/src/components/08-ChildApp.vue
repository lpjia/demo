<script setup lang='ts'>
import { ref } from "vue";

const num = ref(30)
</script>

<template>
  <div>
    这是子组件
  </div>
  <slot name="slot_2" title="哈哈" :mynum="num"></slot>
  <slot></slot>
  <slot name="slot_1"></slot>
</template>

<style scoped lang="scss"></style>
