<template>
  <div>
    <Chazhi />
    <Zhiling />
    <SuoXie />
  </div>
</template>

<script>
import Chazhi from './component/ChaZhi.vue'
import Zhiling from './component/ZhiLing.vue'
import SuoXie from './component/SuoXie.vue'

export default {
  name: 'TemplateSyntax',
  components: {
    Chazhi,
    Zhiling,
    SuoXie,
  },
};
</script>

<style lang="scss" scope>
.el-divider {
  background-color: #000;
}
</style>
