<script>
export default {
  name: 'Son',
  components: {
  },
  // 每次父级组件发生变更时，子组件中所有的 prop 都将会刷新为最新的值。
  // 注意在 JavaScript 中对象和数组是通过引用传入的，所以对于一个数组或对象类型的 prop 来说，在子组件中改变变更这个对象或数组本身将会影响到父组件的状态。
  props: {
    bindData: {
      required: true,
      type: Boolean
    },
    notBind: {
      required: true,
      type: String
    }
  },
  customOption: '自定义选项数据',
  data() {
    return {
      dataForData: '测试 vm.$data'
    };
  },
  computed: {
  },
  watch: {
    // 监听 props 的变化, 可以做些什么...
    bindData(val, oldVal) {
      console.log('bindData val:', val)
      // // 传给父
      // this.$emit('getSonData', `${this.bindData}+${this.notBind}`)
    }
  },
  created() {
  },
  mounted() {
    // 父传子的数据被子处理后又传给父
    // 不知符合什么业务场景
    this.$emit('getSonData', `${this.bindData}+${this.notBind}`)
  },
  methods: {
    log() {
      console.log(this.$parent)
    },
  },
};
</script>

<template>
  <div>
    <p>父→子的数据: {{ bindData }} and {{ notBind }}</p>
  </div>
</template>

<style scoped lang="scss">
</style>
