<script>
import chunk from "lodash/chunk";
import isArray from "lodash/isArray";
import drop from "lodash/drop";
import dropRight from "lodash/dropRight";
import nth from "lodash/nth";

export default {
  name: 'Arr',
  props: {
    arr: Array,
  },
  data() {
    return {
    }
  },
  mounted() {
    this.chunk_()
    this.isArray_()
    this.drop_()
    this.dropRight_()
    this.nth_()
  },
  methods: {
    // https://www.lodashjs.com/docs/lodash.chunk
    chunk_() {
      // 拆分区块
      console.log('---- 分割线 ----\n\n\n')
      console.log("chunk(['a', 'b', 'c', 'd'], 2):",
        chunk(['a', 'b', 'c', 'd'], 2))
      console.log("chunk(['a', 'b', 'c', 'd'], 3):",
        chunk(['a', 'b', 'c', 'd'], 3))
    },

    isArray_() {
      // 判断数组, 文档在"语言"目录
      console.log('---- 分割线 ----\n\n\n')
      console.log("isArray([1, 2, 3]):",
        isArray([1, 2, 3]))
      console.log("原生 Array.isArray([1, 2, 3]):",
        Array.isArray([1, 2, 3]))
    },

    drop_() {
      // 创建切片数组, 去除前面 n(不传参默认为1) 个元素
      // 可以看成是循环 arr.shift() 操作
      console.log('---- 分割线 ----\n\n\n')
      console.log("drop([1, 2, 3]):",
        drop([1, 2, 3]))
      const arr = this.arr
      console.log("drop(arr):",
        drop(arr))
      console.log("drop([1, 2, 3, 4, 5], 2):",
        drop([1, 2, 3, 4, 5], 2))
    },

    dropRight_() {
      // 创建切片数组, 去除尾部 n(不传参默认为1) 个元素
      // 可以看成是循环 arr.pop() 操作
      console.log('---- 分割线 ----\n\n\n')
      const arr = this.arr
      console.log("dropRight(arr, 2):",
        dropRight(arr, 2))
    },

    nth_() {
      // 获取array数组的第n个元素。如果n为负数，则返回从数组结尾开始的第n个元素
      // 根据索引来获取元素, 支持正序倒序, n(不传参默认为0)
      // 原生 at() 方法, 在数组 字符串 类数组都有
      console.log('---- 分割线 ----\n\n\n')
      const arr = this.arr
      console.log("nth(arr):",
        nth(arr))
      console.log("原生 arr.at():",
        arr.at())
      console.log("nth(arr,-2):",
        nth(arr, -2))
      console.log("原生 arr.at(-2):",
        arr.at(-2))

      // 对比之前查找元素的方法
      // 使用长度, 正序还好, 倒序比较麻烦
      console.log("arr[1]:",
        arr[1]
      )
      console.log("arr[arr.length - 2]:",
        arr[arr.length - 2]
      )

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
