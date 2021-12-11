<template>
  <div>
    <img alt="Vue logo" src="@/assets/logo.png" style="width: 60px; height: 60px;">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <TestLodash />
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import TestLodash from '@/components/TestLodash.vue'

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
  },
  mounted() {
  },
  methods: {
  },
};
</script>

<style scoped lang="scss">
</style>
