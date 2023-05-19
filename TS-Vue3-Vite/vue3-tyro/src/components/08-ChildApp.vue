<template>
  <div>
    这是子组件
  </div>
  <slot name="slot_2" title="哈哈" :mynum="num"></slot> <!-- 调函数, 属性名为slot_2, 参数为{ title: "哈哈", mynum: num } -->
  <slot></slot> <!-- 调函数, 属性名为default -->
  <slot name="slot_1"></slot> <!-- 调函数, 属性名为slot_1 -->
</template>

<script setup lang='ts'>
import { ref } from "vue";

const num = ref(30)
</script>


