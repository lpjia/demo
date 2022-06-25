<template>
  <div>
    <p v-if="seen">现在你看到我了</p>
    <hr>

    <!-- 在新空白页打开 -->
    <a :href="url" target="_blank">跳转第三方站点</a>
    <div></div>
    <!-- _blank 无效, 在当前页打开了 -->
    <a target="_blank" href="javascript:;" @click="toThirdSite">跳转第三方站点</a>
    <hr>

    <div>
      <input type="text" :[attr]="val" @[event]="change_3">
      <button @click="change">change</button>
      <button @click="change_2">change event</button>
    </div>
    <div>
      <input type="text" :[attr_2]="val">
    </div>
    <hr>

    <!-- .prevent 修饰符告诉 v-on 指令对于触发的事件调用 event.preventDefault() -->
    <form @submit.prevent="formSubmit">
      <input type="text" value="form-item">
      <button type="submit">表单提交</button>
    </form>
    <hr>
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
    },
    // 打印事件名
    change_3() {
      console.log(`这是 ${this.event} 事件`)
    },

    formSubmit() {
      console.log(`阻止了表单默认事件`)
    },

  }
}
</script>
