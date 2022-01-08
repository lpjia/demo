<template>
  <div>
    <img alt="Vue logo" src="@/assets/imgs/logo.png" style="width: 60px; height: 60px;">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <TestLodash />
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import TestLodash from '@/components/TestLodash.vue'
// import YAML from '@/utils/one.yaml'
// import YAML from '@/utils/two.yaml'
import YAML from '@/utils/three.yaml'
// import YAML from '@/utils/one.json'

export default {
  name: 'Home',
  components: {
    TestLodash,
    HelloWorld,
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
  },
  created() {
    console.log('YAML: ', YAML)
  },
  mounted() {
  },
  methods: {
  },
};
</script>

<style scoped lang="scss">
</style>
