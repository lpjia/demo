<script>
export default {
  name: 'UnidirectionalFlow', // 单向数据流
  components: {
  },
  props: ['initialCounter'],
  data() {
    return {
      counter: this.initialCounter
    };
  },
  computed: {
    // prop 以一种原始的值传入且需要进行处理, 可以使用计算属性, 结果也会随着 prop 更新
    computedCounter() {
      return this.initialCounter + 100
    }
  },
  watch: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
    subtract() {
      this.counter--
    },
  },
};
</script>

<template>
  <div>
    <button class="inlineB">count: {{ initialCounter }}</button>

    <!-- 这个 prop 用来传递一个初始值, 这个子组件接下来希望将其作为一个本地的 prop 数据来使用 -->
    <button class="inlineB marginLB">本地不随着变 counter: {{ counter }}</button>
    <button class="inlineB marginLB" @click="subtract">改变本地 counter</button>

    <button class="inlineB marginLB">本地计算属性 computedCounter: {{ computedCounter }}</button>
  </div>
</template>

<style scoped lang="scss">
</style>
