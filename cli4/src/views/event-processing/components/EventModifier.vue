<script>
import mixin from '../mixins/mixin'

export default {
  name: 'EventModifier', // 事件修饰符
  mixins: [mixin],
};
</script>

<template>
  <!-- 事件冒泡 事件委托 事件捕获 -->

  <!-- 冒泡还允许我们利用事件委托——这个概念依赖于这样一个事实，
  如果你想要在大量子元素中单击任何一个都可以运行一段代码，您可以将事件监听器设置在其父节点上，
  并让子节点上发生的事件冒泡到父节点上，而不是每个子节点单独设置事件监听器。 -->
  <!-- 一个很好的例子是一系列列表项，如果你想让每个列表项被点击时弹出一条信息，
  您可以将click单击事件监听器设置在父元素<ul>上，这样事件就会从列表项冒泡到其父元素<ul>上。 -->
  <!-- 比如 $('ul').on('click','li',callback) -->

  <div>
    <button @click.once="doSomething('this is doOnce')">doOnce</button>

    <p>----分割线----</p>
    <!-- 默认事件传播方向: 由内到外(由子到父传播), 也就是冒泡 -->
    <!-- 在现代浏览器中，默认情况下，所有事件处理程序都在冒泡阶段进行注册。 -->
    <section class="sec" @click="doSomething('this is grandpa')">
      <div class="div" @click="doSomething('this is parent')">
        <p @click="doSomething('this is grandson')">grandson</p>
      </div>
    </section>

    <p>----分割线----</p>
    <!-- 阻止单击事件继续传播 -->
    <!-- 这里事件是先从里面向外传播 -->
    <section class="sec_2" @click="doSomething('this is 阻止单击事件继续传播')">
      <button @click.stop="doSomething('this is @click.stop')">@click.stop</button>
      <button class="marginLB" @click="doSomething('this is @click')">@click</button>
    </section>

    <p>----分割线----</p>
    <!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
    <!-- 即事件不是从内部元素触发的 -->
    <section class="sec" @click.self="doSomething('this is @click.self')">
      <div class="div" @click="doSomething('this is 内部元素')">内部元素</div>
    </section>

    <p>----分割线----</p>
    <!-- 添加事件监听器时使用事件捕获模式 -->
    <!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
    <section class="sec" @click.capture="doSomething('this is @click.capture')">
      <div class="div" @click="doSomething('this is div')">
        <p @click="doSomething('this is 捕获最里级')">ppppp</p>
      </div>
    </section>

    <el-divider></el-divider>
  </div>
</template>

<style scoped lang="scss">
.sec_2 {
  border: 1px solid deepskyblue;
}
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
