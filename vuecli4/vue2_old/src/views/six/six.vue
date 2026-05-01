<template>
  <div>
    <h4>six.vue</h4>
    <details>这是折叠内容</details>
  </div>
</template>

<script>
export default {
  name: 'six',
  mounted() {
    console.log('this.$route:', this.$route)
    console.log('this.$route.query:', this.$route.query)
    console.log('this.$route.params:', this.$route.params)
  },
  methods: {

  },
};
</script>

<style scoped lang="scss">
</style>
