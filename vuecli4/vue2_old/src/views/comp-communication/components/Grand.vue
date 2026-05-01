<script>
import Grandson from './Grandson.vue';
export default {
  name: 'Grand',
  components: {
    Grandson
  },
  mounted() {
    // 为了测试嵌套3级组件, 隔代通信
    // 调祖先(根组件)的自定义事件 getGrandson 来传值
    // this.$listeners.getGrandson(this.$attrs.compDepthLevel)
  },
};
</script>

<template>
  <div>
    <!-- 这种隔代通信方式, 弊端是中间组件都必须绑定属性和事件, 代码侵入性大 -->
    <Grandson v-bind="$attrs" v-on="$listeners" />
  </div>
</template>