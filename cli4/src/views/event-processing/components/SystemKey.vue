<script>
import mixin from '../mixins/mixin'

export default {
  name: 'SystemKey', // 系统修饰键
  mixins: [mixin],
  mounted() {
    this.closeMenu()
  },
  methods: {
    closeMenu() {
      const el = this.$refs.mouseRight
      el.oncontextmenu = function (e) {
        e.preventDefault();
      };
    },
  },
};
</script>

<template>
  <div>
    <!-- 有 Ctrl 被按下的时候就触发 -->
    <button @click.ctrl="doSomething('this is doCtrl')" style="cursor: pointer;">Ctrl + Click</button>

    <!-- 有且只有 Ctrl 被按下的时候才触发 -->
    <button class="marginLB" @click.ctrl.exact="doSomething('this is doCtrlExact')">有且只有 Ctrl 被按下的时候才触发</button>

    <!-- 没有任何系统修饰符被按下的时候才触发 -->
    <button class="marginLB" @click.exact="doSomething('this is doExact')">没有任何系统修饰符被按下的时候才触发</button>

    <!-- 鼠标右键 -->
    <button class="marginLB" ref="mouseRight" @click.right="doSomething('this is doClickRight')">鼠标右键</button>

    <!-- 滚轮键 -->
    <button class="marginLB" @click.middle="doSomething('this is doClickMiddle')">滚轮键</button>
  </div>
</template>

<style scoped lang="scss">
</style>
