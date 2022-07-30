<script>
export default {
  name: 'Grandson',
  inject: ['foo'],
  mounted() {
    // 调祖先组件的自定义事件来传值
    this.$listeners.getGrandson(this.$attrs.compDepthLevel)
  },
};
</script>

<template>
  <div>
    <p>Grandson 组件数据: $attrs 传递: {{ $attrs.dataNum }} {{ $attrs.compDepthLevel }}</p>
    <p>provide/inject 传递: {{ foo }}</p>
  </div>
</template>