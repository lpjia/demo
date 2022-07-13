<script>
import ChildYi from './components/ChildYi.vue';
import ChildYiPlus from './components/ChildYiPlus.vue';
export default {
  name: 'CustomEvent', // 自定义事件
  components: {
    ChildYi,
    ChildYiPlus
  },
  props: {
  },
  data() {
    return {
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
    jiantingChildLifeCycle() {
      console.log('父监听到子组件的生命周期钩子后, 可以做些什么...')
    },
    jiantingChildLifeCycle_2() {
      console.log('父监听到子组件的 mounted 钩子后, 可以做些什么...')
    },
  }
};
</script>

<template>
  <div>
    <h3>监听子组件的生命钩子 ChildYi.vue</h3>
    <ChildYi @mounted="jiantingChildLifeCycle" />
    <p>----分割线----</p>
    <p>改进版 @hook:mounted 的优势是不改子组件的代码, 非侵入式</p>
    <ChildYiPlus @hook:mounted="jiantingChildLifeCycle_2" />
    <el-divider></el-divider>

    <!-- <h3>父子组件传参</h3>
    <p>ChildEr.vue (props 和 $emit 触发自定义事件)</p>
    <p>----分割线----</p> -->

  </div>
</template>

<style scoped lang="scss">
</style>
