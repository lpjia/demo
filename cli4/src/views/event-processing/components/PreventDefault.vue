<script>
import mixin from '../mixins/mixin'

export default {
  name: 'PreventDefault', // 阻止事件默认行为
  mixins: [mixin],
  mounted() {
    this.init()
  },
  methods: {
    init() {
      document.querySelector("#id-checkbox").addEventListener("click", function (event) {
        document.getElementById("output-box").innerHTML += "Sorry! <code>preventDefault()</code> won't let you check this!<br>";
        // https://developer.mozilla.org/zh-CN/docs/Web/API/Event/preventDefault
        event.preventDefault(); // 阻止默认勾选行为
      }, false);
    },

    clk(e) {
      console.log(e)
    }
  },
};
</script>

<template>
  <div class="compRoot">
    <section @click="doSomething('this is 阻止单击事件继续传播')">
      <input type="checkbox" ref="cb" @click="clk">
      <!-- 修饰符可以串联 -->
      <input type="checkbox" @click.stop.prevent="clk">
    </section>
    <p>----分割线----</p>

    <p>Please click on the checkbox control.</p>
    <form>
      <label for="id-checkbox">Checkbox:</label>
      <input type="checkbox" id="id-checkbox" />
    </form>
    <div id="output-box"></div>

  </div>
</template>

<style scoped lang="scss">
.compRoot {
  max-height: 200px;
  overflow-y: auto;
}
</style>
