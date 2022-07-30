<script>
import UnidirectionalFlow from './components/UnidirectionalFlow.vue';
export default {
  name: 'LearningProp',
  components: {
    UnidirectionalFlow
  },
  props: {
  },
  data() {
    return {
      initialCounter: 0
    };
  },
  computed: {
  },
  watch: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
    add() {
      this.initialCounter++
    },
  },
};
</script>

<template>
  <div>
    <!-- 给子组件取一个名字, 一般根据需要实现的效果命名 -->
    <!-- 暂时想到的有: 测试prop的数据更新影响到子组件了吗 -->
    <!-- UnidirectionalFlow unidirectional-flow -->

    <h3>单向数据流</h3>
    <button @click="add">add</button>
    <!-- 子组件立即更新 prop 传的值 -->
    <UnidirectionalFlow :initialCounter="initialCounter" />

    <el-divider></el-divider>
  </div>
</template>

<style scoped lang="scss">
</style>
