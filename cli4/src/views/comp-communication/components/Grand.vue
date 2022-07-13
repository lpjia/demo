<script>
import Grandson from './Grandson.vue';
export default {
  name: 'Grand',
  components: {
    Grandson
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
    // 有效果
    // this.$listeners.getGrandson(this.$attrs.compDepthLevel)
  },
  methods: {
  },
};
</script>

<template>
  <div>
    <!--  -->
    <Grandson v-bind="$attrs" v-on="$listeners" />
  </div>
</template>

<style scoped lang="scss">
</style>
