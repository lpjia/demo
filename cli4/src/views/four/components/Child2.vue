<template>
  <div>
    <section>子组件(child2.vue)的数据: {{ child2Data }}</section>
  </div>
</template>

<script>
export default {
  name: 'Child2',
  data() {
    return {
      child2Data: '来自子组件(child2.vue)的数据',
    };
  },
  inject: ['foo'],
  created() {
    console.log('Child2.vue 的 provide/inject 中的数据: ', this.foo)
  },
  methods: {
    log() {
      console.log('父组件(four.vue)通过 ref 触发方法')
      this.child2Data = '数据变了'
    },
  },
};
</script>

<style scoped lang="scss">
</style>
