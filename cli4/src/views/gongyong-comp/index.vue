<script>
export default {
  name: 'GongyongComp',
  components: {
  },
  props: {
  },
  data() {
    return {
    };
  },
  computed: {
  },
  watch: {
    '$route': {
      immediate: true, // 必须有, 要不然监听不到
      handler(to, from) {
        // to 监听到的其他页面到此组件所在页面的跳转, to 就是此组件所在页面的路由
        // from 一直是 undefined
        console.log('to:', to)
        console.log('from:', from)
      }
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
  },
};
</script>

<template>
  <div>
    <div>{{ $route.path }}</div>
    <div>都是共用组件</div>
  </div>
</template>

<style scoped lang="scss">
</style>
