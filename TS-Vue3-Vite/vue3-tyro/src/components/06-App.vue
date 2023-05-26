<script setup lang='ts'>
import { computed, reactive, ref } from 'vue';

const numList = reactive([
  { label: '10', isCheck: false },
  { label: '20', isCheck: true },
  { label: '30', isCheck: false },
  { label: '40', isCheck: false },
  { label: '50', isCheck: false },
])
/* 只实现了分项控制总的逻辑 */
// const checkAll = computed(() => numList.every((item) => item.isCheck))
/* 总控制分, 分也能控制总 */
const checkAll = computed({
  get() {
    return numList.every((item) => item.isCheck)
  },
  set(val) {
    /* for...of */
    // for (const item of numList) {
    //   item.isCheck = val
    // }
    /* forEach 练练这个 */
    numList.forEach(item => {
      item.isCheck = val
    })
  }
})
</script>

<template>
  <input type="checkbox" v-model="checkAll"> 全选/全不选
  <ul>
    <li v-for="item, i in numList" :key="i">
      <input type="checkbox" v-model="item.isCheck"> {{ item.label }}
    </li>
  </ul>
</template>

<style scoped lang="scss"></style>
