<script>
import Computed from './components/Computed.vue';
import Watcher from './components/Watcher.vue';

export default {
  name: 'ComputedWatch',
  components: {
    Computed,
    Watcher,
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

<template>
  <div>
    <h3>计算属性</h3>
    <Computed />
    <el-divider></el-divider>

    <h3>watch</h3>
    <Watcher />
    <el-divider></el-divider>
  </div>
</template>

<style scoped lang="scss">
.el-divider {
  background-color: #000;
}
</style>
