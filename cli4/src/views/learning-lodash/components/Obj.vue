<script>
import _get from "lodash/get";

export default {
  name: 'Obj',
  props: {
    obj: Object
  },
  mounted() {
    this._getFn()
  },
  methods: {
    // https://www.lodashjs.com/docs/lodash.get
    _getFn() {
      console.log('---- 分割线 ----\n\n\n')
      const object = this.obj;

      console.log("_get(object, 'a[0].b.c'):", _get(object, 'a[0].b.c'))
      // => 3

      console.log("_get(object, ['a', '0', 'b', 'c']):", _get(object, ['a', '0', 'b', 'c']))
      // => 3

      console.log("_get(object, 'a.b.c', 'default'):", _get(object, 'a.b.c', 'default'))
      // => 'default'

    }
  },
};
</script>

<template>
  <div>
  </div>
</template>

<style scoped lang="scss">
</style>
