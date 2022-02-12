const app = Vue.createApp({
  data() {
    return {
      arr: []
    }
  },
  created() {
    // 插入10W条数据
    const total = 100000
    // 一次插入的量, 如性能不好就减小这个值
    const once = 20
    // 渲染的总次数
    const totalOfLoop = total / once

    // 对渲染计数
    let countOfRender = 0
    let add = () => {
      // 优化性能, 插入不会造成回流
      for (let i = 0; i < once; i++) {
        this.arr.push(Math.floor(Math.random() * total))
      }
      countOfRender += 1
      loop()
    }
    let loop = () => {
      // https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame
      if (countOfRender < totalOfLoop) window.requestAnimationFrame(add)
    }
    loop()
  }
})
app.mount('#app')