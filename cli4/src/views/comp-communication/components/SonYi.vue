<script>
export default {
  name: 'SonYi',
  components: {
  },
  props: {
  },
  data() {
    return {
      msg: null
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
    fatherEmitSonYi(data) {
      console.log(data)
      this.msg = data

      console.log("this.$parent.$options.name:",
        this.$parent.$options.name
      )
    },
  },
};
</script>

<template>
  <div>
    <p>父触发子的事件, 还可以父传子值: {{ msg }}</p>
  </div>
</template>

<style scoped lang="scss">
</style>
