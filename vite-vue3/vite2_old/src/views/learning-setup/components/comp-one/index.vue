<script>
// import { reactive, ref, onMounted, unref, toRefs } from 'vue'
// 这里的子文件夹命名值得借鉴
import addNum from './composables/addNum.js'
import complexTypeTest from './composables/complexTypeTest.js'

export default {
  name: 'CompOne',
  setup() {
    return {
      ...(addNum()), // 已经是普通对象了, 导入(子 js 导出)时已加上响应式
      ...(complexTypeTest()),
    }
  }
}
</script>

<template>
  <h3>
    <div class="inlineB marR">num: {{ num }}</div>
    <div class="inlineB marR">{{ type }}</div>
  </h3>
  <h4>
    <div class="inlineB marR">dblNum: {{ dblNum }}</div>
    <div class="inlineB">click 计数 count: {{ count }}</div>
  </h4>
  <button @click="changeNum">click</button>
  <hr />

  <h3>arr: {{ arr }}</h3>
  <button @click="changeArr">click</button>
  <p>{{ n2 }}</p>
  <p>{{ n3 }}</p>
  <hr />
</template>