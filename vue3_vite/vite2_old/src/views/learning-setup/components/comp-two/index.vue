<script>
import autoAddNum from './composables/autoAddNum.js'
import Child from './components/Child.vue'

export default {
  name: 'CompTwo',
  components: {
    Child
  },
  setup() {
    return {
      ...(autoAddNum()),
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
    <div class="inlineB marR">n: {{ n }}</div>
    <Child :msg="type" />(直接用 props 解构的数据)
  </h4>
  <button @click="stopTimer">stopTimer</button>
  <hr>
</template>