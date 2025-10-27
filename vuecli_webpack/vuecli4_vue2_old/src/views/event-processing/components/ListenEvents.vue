<script>
export default {
  name: 'ListenEvents', // 监听事件
  data() {
    return {
      counter: 0
    };
  },
  methods: {
    greet: function (event) {
      // `event` 是原生 DOM 事件
      if (event) {
        console.log('event.target.tagName: ', event.target.tagName)
        console.log('event.type: ', event.type)
        console.log('event: ', event)
      }
    },
    say: function (message, e) {
      console.log(message)
      if (e) console.log(e.target.innerHTML) // target.innerText
    },
  },
};
</script>

<template>
  <div>
    <button v-on:click="counter += 1">Add 1</button> The button above has been clicked {{ counter }} times.
    <button class="marginLB" @click="greet">@click="greet" 没有加(), 声明方法时, 默认第一个形参是 event, 缩写 e</button>

    <section>
      <button @click="say('hi')">Say hi</button>
      <button class="marginLB" @click="say('what')">Say what</button>
      <button class="marginLB" @click="say('haha', $event)">Say $event 是原生 dom 事件</button>
    </section>

    <el-divider></el-divider>
  </div>
</template>

<style scoped lang="scss">
</style>
