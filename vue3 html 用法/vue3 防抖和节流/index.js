const app = Vue.createApp({
  methods: {

  }
})


app.component('save-button', {
  created() {
    // 用 Lodash 的防抖函数
    this.debouncedClick = _.debounce(this.click, 500)
  },
  unmounted() {
    // 移除组件时，取消定时器
    this.debouncedClick.cancel()
  },
  methods: {
    click() {
      // ... 响应点击 ...
      console.log('测试防抖')
      console.log('子组件的 click 事件')
    }
  },
  template: `
    <button @click="debouncedClick">
      Save
    </button>
  `
})


app.mount('#app')