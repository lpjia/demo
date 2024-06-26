<template>
  <h3>父子组件传值 props emits 自定义属性和自定义方法</h3>
  {{ num }}
  <hr>
  <child-app :num="num" @zdy="changeNum"></child-app>
</template>

<script setup lang='ts'>
import { ref } from "vue";
import ChildApp from "./05-ChildApp.vue";

const num = ref(10)
const changeNum = (val: string) => {
  num.value++
  console.log(val)
}
</script>

<style scoped lang="scss"></style>
