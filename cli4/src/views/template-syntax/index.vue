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
  name: 'TemplateSyntax', // 模版语法
  components: {
    Chazhi,
    Zhiling,
    SuoXie,
  },
};
</script>