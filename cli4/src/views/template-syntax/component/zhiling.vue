<template>
  <div>
    <p v-if="seen">现在你看到我了</p>

    <!-- 在新空白页打开 -->
    <a :href="url" target="_blank">跳转第三方站点</a>
    <!-- _blank 无效, 在当前页打开了 -->
    <a target="_blank" href="javascript:;" class="marginLB" @click="toThirdSite">跳转第三方站点</a>
    <p>----分割线----</p>

    <section>
      <input ref="inputTest" type="text" :[attr]="val" @[event]="change_3" @focus="focus">
      <button class="marginLB" @click="change">change</button>
      <button class="marginLB" @click="change_2">change event</button>
    </section>
    <div>
      <input type="text" :[attr_2]="val_2" value="检查元素">
    </div>
    <p>----分割线----</p>

    <!-- .prevent 修饰符告诉 v-on 指令对于触发的事件调用 event.preventDefault() -->
    <form @submit.prevent="formSubmit">
      <input type="text" value="form-item">
      <button type="submit">表单提交</button>
    </form>
    <p>----分割线----</p>

    <div class="up_down">
      v-html 在绑定元素的 innerHTML 里, 渲染出 dom 节点
      <div class="txt" v-for="sensor in list" :key="sensor.key">
        <span v-html="sensor.name"></span>&nbsp;&nbsp;{{ sensor.amount }} 个
      </div>
    </div>
    <p>----分割线----</p>

    <p>网络调慢, 可以看出(在 vue-cli4 中看不出来, 因为需要经过构建后很不明显, 建议出现问题可用此指令解决)</p>
    <p v-cloak>{{ msg }}</p>
    <p>作为对比, 没加 v-cloak: {{ msg }}</p>

    <p>----分割线----</p>
    <el-divider></el-divider>

  </div>
</template>

<script>
export default {
  name: 'Zhiling',
  data() {
    return {
      seen: true,

      url: 'https://www.baidu.com', // 得加上 https

      attr: 'value',
      val: '输入的值',
      event: 'click',
      val_2: '某值',

      list: [
        { name: 'H<sub>2</sub>S&nbsp;传感器', amount: 13, key: '12' },
        { name: 'CO &nbsp;传感器', amount: 15, key: '1' },
        { name: 'CH<sub>4</sub>&nbsp;传感器', amount: 13, key: '13' },
        { name: 'O<sub>2</sub> &nbsp;&nbsp;传感器', amount: 15, key: '7' }
      ],

      msg: 'this is msg',
    }
  },
  computed: {
    // 动态参数表达式有一些语法约束，因为某些字符，如空格和引号，放在 HTML attribute 名里是无效的。
    // 变通的办法是使用没有空格或引号的表达式，或用计算属性替代这种复杂表达式。
    attr_2() {
      return `data-${this.attr}`
    }
  },
  methods: {
    toThirdSite() {
      window.location.href = this.url
    },

    // 清空值, 并禁用
    change() {
      this.attr = 'disabled'
      this.val = true
    },
    // 解除禁用
    change_2() {
      this.val = false
      this.event = 'dblclick'
      this.$nextTick(() => {
        this.$refs.inputTest.focus()
      })
    },
    // 打印事件名
    change_3() {
      console.log(`这是 ${this.event} 事件`)
    },

    focus() {
      console.log(`这是 focus 事件`)
    },

    formSubmit() {
      console.log(`阻止了表单默认事件`)
    },

  }
}
</script>
