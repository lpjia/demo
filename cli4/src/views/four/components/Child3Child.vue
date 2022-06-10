<template>
  <div>
    <section>子组件(child3.vue)的子组件(Child3Child.vue)</section>
    <button @click="visitChild3Data">访问父实例(child3.vue)的数据</button>
    <hr class="up_down">
    <button @click="sendData">$bus 发送数据</button>
  </div>
</template>

<script>
export default {
  name: 'Child3Child',
  data() {
    return {
      child3ChildData: '来自子组件(Child3Child.vue)的数据',
    };
  },
  inject: ['foo'],
  created() {
    console.log('Child3Child.vue 的 provide/inject 中的数据: ', this.foo)

    console.log('Child3Child.vue 的 $attrs: ', this.$attrs.compName) // 这里不和 props 一样把横线属性转成小驼峰
    console.log('Child3Child.vue 的 $attrs: ', this.$attrs.compDepthLevel) // 而是属性名写的什么就用什么

    console.log('Child3Child.vue 的 $listeners: ')
    // this.$listeners.eventJianting() // 报错, TypeError: this.$listeners.eventJianting is not a function
    this.$listeners.eventJt()
  },
  methods: {
    visitChild3Data() {
      console.log(this.$parent.child3Data)
    },
    sendData() {
      this.$bus.$emit('fromChild3Child', '来自 Child3Child.vue 通过 $bus 传来的数据')
    },
  },
};
</script>

<style scoped lang="scss">
</style>
