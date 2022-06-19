<script>
// import { ref } from 'vue'
import showOrHide from './composables/showOrHide.js'
import changeFontColor from './composables/changeFontColor.js'

export default {
  name: 'SetupFcn',
  setup() {
    const { showDiv, show, hide } = showOrHide()
    const { fontColor, changeRed, changeYellow } = changeFontColor()
    // console.log('showDiv:', showDiv)

    return {
      showDiv,
      show,
      hide,

      fontColor,
      changeRed,
      changeYellow,
    }
  },
}
</script>

<template>
  <h4>SetupFcn</h4>
  <div>
    <!-- 功能一模板 -->
    <div>
      <button @click="show">显示</button>
      <button @click="hide">隐藏</button>
    </div>
    <div class="box" v-if="showDiv">一个被控制显隐的div</div>
  </div>
  <hr>
  <div>
    <!-- 功能二模板 -->
    <div>
      <button @click="changeRed">红色</button>
      <button @click="changeYellow">蓝色</button>
    </div>
    <div class="box" :style="`color:${fontColor}`">一个被控制字体颜色的的div</div>
  </div>
  <hr>
</template>

<style scoped>
.box {
  width: 200px;
  height: 200px;
  line-height: 200px;
  background-color: cornflowerblue;
  text-align: center;
  display: inline-block;
}
</style>