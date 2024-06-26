<template>
  <div>
    这是子组件
  </div>
  <slot name="slot_2" title="哈哈" :mynum="num"></slot> <!-- 调函数, 属性名为slot_2, 参数为{ title: "哈哈", mynum: num } -->
  <slot></slot> <!-- 调函数, 属性名为default -->
  <slot name="slot_1"></slot> <!-- 调函数, 属性名为slot_1 -->
</template>

<script setup lang='ts'>
import { ref, useSlots } from "vue";

const num = ref(30)

/* useSlots 用在插槽组件, 而不是template组件 */
const slots = useSlots()
console.log('slots:', slots)
</script>

<style scoped lang="scss"></style>
