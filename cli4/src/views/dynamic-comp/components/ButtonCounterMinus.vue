<template>
  <button v-on:click="count--" class="btn_gutter">&nbsp; You clicked me {{ count }} times. I\'m count--
    &nbsp;</button>
</template>

<script>
export default {
  name: 'ButtonCounterMinus',
  components: {

  },
  props: ['prop_count'],
  data() {
    return {
      count: 0
    };
  },
  computed: {

  },
  watch: {

  },
  created() {

  },
  mounted() {
    this.count = this.prop_count
  },
  methods: {

  },
};
</script>

<style scoped lang="scss">
</style>
