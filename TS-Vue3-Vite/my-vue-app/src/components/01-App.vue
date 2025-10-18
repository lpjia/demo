<template>
  <div>01-App</div>
  <div class="container">
    <span class="gen_node">满意度</span>
    <!-- 传统自定义属性和事件的做法 -->
    <AppChild :total="total" @zdy="getData" />
    <div class="rate">
      {{ val }}<span> / </span>{{ total }}
    </div>
  </div>
</template>

<script setup lang='ts'>
import AppChild from './01-AppChild.vue'
const val = ref(0)
const total = ref(10)

function getData(v: number) {
  val.value = v
  console.log(
    v, '父'
  )
}
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
