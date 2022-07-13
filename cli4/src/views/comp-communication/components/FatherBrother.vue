<script>
export default {
  name: 'FatherBrother',
  components: {
  },
  props: {
  },
  data() {
    return {
      bro: null,
      broGouzi: null,
    };
  },
  computed: {
  },
  watch: {
  },
  created() {
    this.$bus.$on('mountedToFatherBro', data => {
      this.broGouzi = data
    })
  },
  mounted() {
    this.$bus.$on('dataToFatherBro', data => {
      this.bro = data
    })
  },
  methods: {
  },
};
</script>

<template>
  <div>
    <p>父→父弟的数据: {{ bro }}</p>
    <p>父→父弟的数据(通过生命周期钩子传值): {{ broGouzi }}</p>
  </div>
</template>

<style scoped lang="scss">
</style>
