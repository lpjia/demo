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
      // 不支持可选链情况下的替代方案
      console.log('---- 分割线 ----\n\n\n')
      const object = this.obj;

      console.log("_get(object, 'a[0].b.c'):", _get(object, 'a[0].b.c')) // => 3

      console.log("_get(object, ['a', '0', 'b', 'c']):", _get(object, ['a', '0', 'b', 'c'])) // => 3

      console.log("_get(object,'a.b.c.d'):",
        _get(object, 'a.b.c.d')
      )
      console.log("原生 可选链 object.a.b?.c?.d:",
        object.a.b?.c?.d
      )

      console.log("_get(object, 'a.b.c', 'default'):", _get(object, 'a.b.c', 'default')) // => 'default'
      // 可选链+空值合并运算符?? 效果等用于上边
      console.log("原生 object.a.b?.c?.d ?? 'default':",
        object.a.b?.c?.d ?? 'default'
      )

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
