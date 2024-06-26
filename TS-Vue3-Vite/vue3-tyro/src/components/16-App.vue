<template>
  <div class="father">
    <h3>父组件</h3>
    <span>{{ fahterValue }}</span>
    <button @click="fahterValue++">按钮</button>
    <ChildApp :a="a" :b="b" :c="c" :d="d" />
  </div>
</template>

<script setup lang='ts'>
import { provide, ref } from 'vue';
import ChildApp from './16-ChildApp.vue'

const fahterValue = ref(0)
provide('fVal', fahterValue)

const a = ref(100)
const b = ref(200)
const c = ref(300)
const d = ref(400)
</script>

<style scoped lang="scss">
.father {
  background-color: rgb(193, 193, 193);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px;
  margin-top: 10px;
}
</style>
