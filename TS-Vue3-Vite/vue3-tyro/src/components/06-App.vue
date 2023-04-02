<script setup lang='ts'>
import { computed, reactive, ref } from 'vue';

const numList = reactive([
  { label: '10', checkVal: false },
  { label: '20', checkVal: true },
  { label: '30', checkVal: false },
  { label: '40', checkVal: false },
  { label: '50', checkVal: false },
])
/* 只实现了分项控制总的逻辑 */
// const checkAll = computed(() => numList.every((item) => item.checkVal))
/* 总控制分, 分也能控制总 */
const checkAll = computed({
  get() {
    return numList.every((item) => item.checkVal)
  },
  set(val) {
    /* for...of */
    // for (const item of numList) {
    //   item.checkVal = val
    // }
    /* forEach 练练这个 */
    numList.forEach(item => {
      item.checkVal = val
    })
  }
})
</script>

<template>
  <input type="checkbox" v-model="checkAll"> 全选/全不选
  <ul>
    <li v-for="(item, i) in numList" :key="i">
      <input type="checkbox" v-model="item.checkVal"> {{ item.label }}
    </li>
  </ul>
</template>

<style scoped lang="scss"></style>
