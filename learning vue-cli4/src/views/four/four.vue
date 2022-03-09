<template>
  <div>
    <h3 class="up_down">{{ pageName }}</h3>
    <h3>组件通信</h3>
    <Child :send-child="sendChildData" zj="没有绑定的字符串数据" @getChildData="getChildData" />
    <p>{{ fromChildData }}</p>
  </div>
</template>

<script>
import Child from "./components/child.vue";

export default {
  name: 'four',
  components: {
    Child
  },
  props: {

  },
  data() {
    return {
      pageName: 'four.vue',
      sendChildData: '这是給子组件(child.vue)的数据',
      fromChildData: '',
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
    getChildData(data) {
      this.fromChildData = data
    },
  },
};
</script>

<style scoped lang="scss">
</style>
