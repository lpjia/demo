<script>
import ChildEr from './components/child-er/ChildEr.vue';
import ChildSan from './components/child-san/ChildSan.vue';
import ChildYi from './components/child-yi/ChildYi.vue';
import ChildYiPlus from './components/child-yi/ChildYiPlus.vue';

export default {
  name: 'CustomEvent', // 自定义事件
  components: {
    ChildYi,
    ChildYiPlus,
    ChildEr,
    ChildSan
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

    <h3>v-model 本质上是语法糖</h3>
    <ChildEr />

    <h3>.sync 修饰符</h3>
    <p>需要对一个 prop 进行“双向绑定”, 常规情况 子直接修改 prop 会报错, 数据流向: 父→子</p>
    <p>加上 .sync, 则数据流向: 父→子(主动触发 update:xxx 修改父)→父→子(停)</p>
    <ChildSan />

  </div>
</template>
