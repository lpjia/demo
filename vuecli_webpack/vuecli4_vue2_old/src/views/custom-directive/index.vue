<template>
  <div style="position: relative;">
    <!-- <div> -->
    <input v-focus:value="autoFocus">

    <!-- 自定义指令 值 参数 修饰符 表达式 -->
    <button class="marginLB" v-click:canshu.xiushifu="autoFocus" @click="log">自定义指令 注册局部指令 执行方法</button>

    <p class="inlineB marginLB" v-color="'red'">注册全局指令</p>

    <!-- 加一个修饰符, 来区分固定定位和绝对定位 -->
    <!-- <p v-pin:[direction].fixed="10">动态指令参数</p> -->
    <p v-pin:[direction].fixed="60">动态指令参数</p>

    <div v-obj="{ color: 'white', txt: 'hello!' }">对象字面量</div>

  </div>
</template>

<script>
import vFocus from './vFocus'
import vClick from './vClick'
import vObj from './vObj'
import vPin from './vPin'

export default {
  name: 'CustomDirective',
  directives: {
    focus: vFocus,
    click: vClick,
    obj: vObj,
    pin: vPin,
  },
  data() {
    return {
      autoFocus: '自动聚焦',
      direction: 'top',
    };
  },
  methods: {
    log() {
      console.log('log()')
    }
  },
};
</script>
