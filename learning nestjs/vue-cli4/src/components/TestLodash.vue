<template>
  <div>
    <ul v-for="(item, idx) in arr" :key="idx">
      <li>{{ item }}</li>
    </ul>
    <hr>
    <ul v-for="(item, idx) in arr2" :key="idx + 100">
      <li>{{ item }}</li>
    </ul>
    <hr>
    <p>{{ d }}</p>
  </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
import _get from "lodash/get";
// const cloneDeep = require('lodash/cloneDeep')


export default {
  name: 'TestLodash',
  components: {
  },
  props: {
  },
  data() {
    return {
      arr: [
        { name: 'xm', id: 1 },
        { name: 'xc', id: 11 },
        { name: 'xz', id: 111 },
      ],
      arr2: [],
      d: null
    };
  },
  computed: {
  },
  watch: {
  },
  created() {
  },
  mounted() {
    this.arr2 = cloneDeep(this.arr)
    // this.arr2 = this.arr
    this.arr.pop()


    const object = { 'a': [{ 'b': { 'c': 3 } }] };
    this.d = _get(object, 'a[0].b.c.d', 0);
  },
  methods: {
  },
};
</script>

<style scoped >
div {
  width: 300px;
}
</style>
