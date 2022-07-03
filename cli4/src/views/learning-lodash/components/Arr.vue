<script>
import chunk from "lodash/chunk";
import isArray from "lodash/isArray";
import drop from "lodash/drop";
import dropRight from "lodash/dropRight";

export default {
  name: 'Arr',
  props: {
    arr: Array,
  },
  mounted() {
    this.chunk_()
    this.isArray_()
    this.drop_()
    this.dropRight_()
  },
  methods: {
    // https://www.lodashjs.com/docs/lodash.chunk
    chunk_() {
      // 拆分区块
      console.log('---- 分割线 ----\n\n\n')
      console.log("chunk(['a', 'b', 'c', 'd'], 2):", chunk(['a', 'b', 'c', 'd'], 2))
      console.log("chunk(['a', 'b', 'c', 'd'], 3):", chunk(['a', 'b', 'c', 'd'], 3))
    },

    isArray_() {
      // 判断数组, 文档在"语言"目录
      console.log('---- 分割线 ----\n\n\n')
      console.log("isArray([1, 2, 3]):", isArray([1, 2, 3]))
      console.log("原生 Array.isArray([1, 2, 3]):", Array.isArray([1, 2, 3]))
    },

    drop_() {
      // 创建切片数组, 去除前面 n(不传参默认为1) 个元素
      // 可以看成是循环 arr.shift() 操作
      console.log('---- 分割线 ----\n\n\n')
      console.log("drop([1, 2, 3]):", drop([1, 2, 3]))
      console.log("drop(this.arr):", drop(this.arr))
      console.log("drop([1, 2, 3, 4, 5], 2):", drop([1, 2, 3, 4, 5], 2))
    },

    dropRight_() {
      // 创建切片数组, 去除尾部 n(不传参默认为1) 个元素
      // 可以看成是循环 arr.pop() 操作
      console.log('---- 分割线 ----\n\n\n')
      console.log("dropRight(this.arr, 2):", dropRight(this.arr, 2))
    },
  },
};
</script>

<template>
  <div>
  </div>
</template>

<style scoped lang="scss">
</style>
