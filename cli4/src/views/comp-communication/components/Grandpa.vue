<script>
import Grand from './Grand.vue';
export default {
  name: 'Grandpa',
  components: {
    Grand
  },
  props: {
  },
  data() {
    return {
      // grandpaData: 100
    };
  },
  provide: {
    foo: 'bar'
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
    // getGrandson(data) {
    //   console.log("getGrandson:",
    //     data
    //   )
    // },
  },
};
</script>

<template>
  <div>
    <!-- <p>Grandpa 组件数据: {{ grandpaData }}</p> -->
    <!-- <Grand :dataNum="grandpaData" compDepthLevel="level-1" @getGrandson="getGrandson" /> -->
    <Grand v-bind="$attrs" v-on="$listeners" />
  </div>
</template>

<style scoped lang="scss">
</style>
