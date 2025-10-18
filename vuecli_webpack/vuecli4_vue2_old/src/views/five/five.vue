<template>
  <div>
    <h4>five.vue</h4>
    <button @click="goTo">跳转新页面, 但是页面路径还得有 username</button>
  </div>
</template>

<script>
export default {
  name: 'five',
  mounted() {
    console.log('this.$route:', this.$route)
    console.log('this.$route.query:', this.$route.query)
    console.log('this.$route.params:', this.$route.params)
  },
  methods: {
    goTo() {
      this.$router.push({
        path: 'lpjia2/demo2'
      })
    },
  },
};
</script>

<style scoped lang="scss">
</style>
