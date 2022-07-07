<script>
import FixedCover from './components/FixedCover.vue';
import StickyPosition from './components/sticky-position/StickyPosition.vue';
export default {
  name: 'ElementPosition', // 元素定位
  components: {
    FixedCover,
    StickyPosition
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
    <FixedCover />
    <el-divider></el-divider>
    <StickyPosition />
  </div>
</template>

<style lang="scss" scoped>
</style>
