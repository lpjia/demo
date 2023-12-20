<template>
  <div class="bg-deepskyblue-200 px-3 py-5 ring-2 ring-gray-500 rounded-lg">
    <div v-for="(item, i) in products" :key="i" class=" my-2 ">
      <a href="javascript:;" class="text-red-400 hover:bg-black hover:text-white px-2 py-1 rounded"
        @click="openProduct(item)">{{ item.name }}</a>
    </div>
    <div v-if="showProductInfo">
      <ProductInfo :item="product" />
    </div>
  </div>
</template>

<script>
// import ProductInfo from './ProductInfo.vue';
/* 在导入这个组件的时候, 这个模块还没解析完
那现在不导入, 等运行期间导入(运行期间一定解析完了), 在beforeCreate生命周期钩子导入
解析是在编译期间 */

export default {
  name: 'RelatedProduct',
  /* 这里其实就是个配置, 对象形式 */
  // components: {
  //   ProductInfo
  // },

  /* 另一种方案
  vue支持动态导入 import
  运行时发生的 */
  components: {
    ProductInfo: () => import('./ProductInfo.vue')
  },
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      product: null,
      showProductInfo: false
    };
  },
  // beforeCreate() {
  //   /* 用动态导入 require, 记得.default
  //   加入到vue配置中 */
  //   console.log("require('./ProductInfo.vue'):",
  //     require('./ProductInfo.vue')
  //   )
  //   this.$options.components.ProductInfo = require('./ProductInfo.vue').default
  //   /* 注意学习$option.xxx用法, 打印到控制台, 展开原型对象查看可用的属性和方法 */
  //   console.log('this:', this)
  //   console.log('this.$options.data():', this.$options.data())
  //   console.log('this.$options.props:', this.$options.props)
  //   console.log('this.$options.methods:', this.$options.methods)
  //   console.log('this.$options.name:', this.$options.name)
  // },
  methods: {
    openProduct(item) {
      this.showProductInfo = true
      this.product = item
    }
  },
};
</script>