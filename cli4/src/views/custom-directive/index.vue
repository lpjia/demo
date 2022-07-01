<template>
  <div>
    <input v-focus :value="autoFocus">

    <!-- 自定义指令 值 参数 修饰符 表达式 -->
    <button class="marginLB" v-click:canshu.xiushifu="autoFocus" @click="log">自定义指令 注册局部指令 执行方法</button>

    <p class="inlineB marginLB" v-color="'red'">注册全局指令</p>
  </div>
</template>

<script>
import vFocus from './vFocus'
import vClick from './vClick'

export default {
  name: 'CustomDirective',
  components: {

  },
  props: {

  },
  directives: {
    focus: vFocus,
    click: vClick,
  },
  data() {
    return {
      autoFocus: '自动聚焦',
    };
  },
  computed: {

  },
  watch: {

  },
  created() {

  },
  mounted() {

  },
  methods: {
    log() {
      console.log('log()')
    }
  },
};
</script>

<style scoped lang="scss">
</style>
