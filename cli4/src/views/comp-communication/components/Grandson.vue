<script>
export default {
  name: 'Grandson',
  components: {
  },
  props: {
  },
  data() {
    return {
    };
  },
  inject: ['foo'],
  computed: {
  },
  watch: {
  },
  created() {
  },
  mounted() {
    // 调用 Grandpa 的自定义事件来传值
    this.$listeners.getGrandson(this.$attrs.compDepthLevel)
  },
  methods: {
  },
};
</script>

<template>
  <div>
    <p>Grandson 组件数据: $attrs 传递 {{ $attrs.dataNum }} {{ $attrs.compDepthLevel }}</p>
    <p>provide/inject 传递 {{ foo }}</p>
  </div>
</template>

<style scoped lang="scss">
</style>
