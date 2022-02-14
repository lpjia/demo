<template>
  <h3>num: {{ num }}</h3>
  <button @click="changeNum">click</button>
  <span>&nbsp;&nbsp;{{ n }}</span>
  <span>&nbsp;&nbsp;{{ type }}</span>
  <hr />
  <h3>arr: {{ arr }}</h3>
  <button @click="changeArr">click</button>
  <p>{{ n2 }}</p>
  <p>{{ n3 }}</p>
  <hr />
</template>

<script>
import { reactive, ref, onMounted, unref, toRefs } from 'vue'

import addNum from './composables/addNum'
import complexTypeTest from './composables/complexTypeTest'


export default {
  name: 'one',
  setup() {

    return {
      // ...toRefs(addNum()),
      ...(addNum()), // 已经是普通对象了, 导入(子 js 导出)时已加上响应式
      ...(complexTypeTest()),
    }
  }
}
</script>

<style scoped>
</style>