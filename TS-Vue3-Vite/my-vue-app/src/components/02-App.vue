<template>
  <div>02-App</div>
  <div class="container">
    <span class="gen_node">满意度</span>
    <!-- v-model 语法 -->
    <AppChild v-model:val="val" :total="total" />
    <div class="rate">
      {{ val }}<span> / </span>{{ total }}
    </div>
  </div>
</template>

<script setup lang='ts'>
import AppChild from './02-AppChild.vue'
const val = ref(0)
const total = ref(10)
</script>

<style scoped lang="scss">
.container {
  display: flex;
  align-items: center;
  height: 40px;
}

.gen_node {
  color: deepskyblue;
  line-height: 40px;
  margin-right: 10px;
}
</style>
