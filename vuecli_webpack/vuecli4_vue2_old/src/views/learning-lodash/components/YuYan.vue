<script>
import cloneDeep from "lodash/cloneDeep";

export default {
  name: 'YuYan',
  props: {
    arr: Array,
  },
  data() {
    return {
      arr2: [],
      arr3: [],
    };
  },
  mounted() {
    this.cloneDeep_()
  },
  methods: {
    // https://www.lodashjs.com/docs/lodash.cloneDeep
    cloneDeep_() {
      // 深拷贝
      this.arr2 = cloneDeep(this.arr)
      this.arr3 = cloneDeep(this.arr)
      this.arr3.pop()
    },

  },
};
</script>

<template>
  <div>
    <ul v-for="item in arr2" :key="item.id">
      <li>{{ item }}</li>
    </ul>
    <p>----分割线----</p>
    <ul v-for="item in arr3" :key="item.id * 10">
      <li>{{ item }}</li>
    </ul>

  </div>
</template>

<style scoped lang="scss">
</style>
