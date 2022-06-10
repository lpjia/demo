<template>
  <div>
    <button @click="visitRootData">访问跟实例(App.vue)的数据</button>&nbsp;&nbsp;&nbsp;&nbsp;
    <button @click="visitChild3ChildData">访问子实例(child3Child.vue)的数据</button>
    <Child3Child v-bind="$attrs" v-on="$listeners" />
  </div>
</template>

<script>
import Child3Child from "./Child3Child.vue";

export default {
  name: 'Child3',
  components: {
    Child3Child,
  },
  data() {
    return {
      child3Data: '来自子组件(child3.vue)的数据',
    };
  },
  inject: ['foo'],
  created() {
    console.log('Child3.vue 的 provide/inject 中的数据: ', this.foo)

    console.log('Child3.vue 的 $attrs: ', this.$attrs['comp-name'])
    console.log('Child3.vue 的 $attrs: ', this.$attrs['compDepthLevel'])

    console.log('Child3.vue 的 $listeners: ')
    this.$listeners['event-jianting']()
    this.$listeners['eventJt']()
  },
  methods: {
    visitChild3ChildData() {
      console.log(this.$children[0].child3ChildData)
    },
    visitRootData() {
      // 不知道找的是哪个, 用 vue 工具查看, 发现最外层有个 Root
      console.log(this.$root)
      console.log(this.$root.rootData)
      console.log(this.$root.layoutData)
      console.log(this.$root.pageName)
      console.log(this.$root.child3Data)
      console.log(this.$root.child3ChildData)
    },
  },
};
</script>

<style scoped lang="scss">
</style>
