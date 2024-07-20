<template>
  <div class="count">
    <h3>当前求和为: {{ sum }}</h3>
    <p>欢迎来到 {{ place }} , 双倍 {{ doubleSum }}</p>
    <!-- .number 转数字 -->
    <select v-model.number="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="increase">加</button>
    <button @click="decrease">减</button>
  </div>
</template>

<script setup lang='ts' name="Count">
import { useCountStore } from '@/store/count';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

// let sum = ref(1)
const countStore = useCountStore()
// console.log('countStore:', countStore)
const { sum, place, doubleSum } = storeToRefs(countStore) // 解构保持响应式
let n = ref(1)

const increase = () => {
  // sum.value += n.value

  // countStore.sum += n.value

  /* 批量更新数据用 $patch */
  // countStore.$patch({
  //   sum: n.value,
  //   place: 'xx联盟'
  // })

  countStore.add() // 用方法在仓库那边改数据
}
const decrease = () => {
  sum.value -= n.value
}
</script>

<style scoped lang="scss">
.count {
  background-color: skyblue;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px;
}
</style>
