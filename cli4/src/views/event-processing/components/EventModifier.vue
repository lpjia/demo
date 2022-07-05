<script>
import mixin from '../mixins/mixin'

export default {
  name: 'EventModifier', // 事件修饰符
  mixins: [mixin],
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
  },
};
</script>

<template>
  <div>
    <button @click.once="doSomething('this is doOnce')">doOnce</button>
    <p>----分割线----</p>

    <!-- 阻止单击事件继续传播 -->
    <section @click="doSomething('this is 阻止单击事件继续传播')">
      <button @click.stop="doSomething('this is @click.stop')">@click.stop</button>
      <button class="marginLB" @click="doSomething('this is @click.stop')">@click</button>
    </section>
    <p>----分割线----</p>

    <!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
    <!-- 即事件不是从内部元素触发的 -->
    <section class="sec" @click.self="doSomething('this is @click.self')">
      <div class="div" @click="doSomething('this is 内部元素')">div</div>
    </section>
    <p>----分割线----</p>

    <!-- 添加事件监听器时使用事件捕获模式 -->
    <!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
    <section class="sec" @click.capture="doSomething('this is @click.capture')">
      <div class="div" @click="doSomething('this is div')">
        <p @click="doSomething('this is 捕获最里级')">ppppp</p>
      </div>
    </section>
    <!-- 未完待续 -->

    <el-divider></el-divider>
  </div>
</template>

<style scoped lang="scss">
.sec {
  width: 160px;
  height: 160px;
  background-color: deeppink;
  padding-top: 20px;
  box-sizing: border-box;
  .div {
    width: 80px;
    height: 80px;
    background-color: deepskyblue;
    padding-top: 10px;
    box-sizing: border-box;
    p {
      border: 1px solid #000;
      margin-top: 20px;
      box-sizing: border-box;
    }
  }
}
</style>
