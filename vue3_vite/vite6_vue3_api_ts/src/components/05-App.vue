<template>
  <p>父子组件通信 defineProps defineEmits</p>
  <p>05-App</p>
  <h3>父子组件传值 props emits 自定义属性和自定义方法</h3>
  {{ num }}
  <hr>
  <child-app :num="num" @zdy="changeNum"></child-app>
  <hr>
  <ChildApp2 :num2="num"></ChildApp2>
</template>

<script setup lang='ts'>
import { ref } from "vue";
import ChildApp from "./05-ChildApp.vue";
import ChildApp2 from "./05-ChildApp2.vue";

const num = ref(10)
const changeNum = (val: string) => {
  num.value++
  console.log(val)
}
</script>

<style scoped lang="scss"></style>
