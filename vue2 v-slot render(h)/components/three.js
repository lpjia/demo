// 局部注册
const hxComp = {
  props: {
    level: {
      type: Number,
      required: true,
    }
  },
  // template: '#hx-template' // 用模版
  // 用 render 重写, 代码明显比模版简洁多了
  render(h) {
    console.log('---- hx-comp ----')
    console.log('this.$slots: ', this.$slots)
    console.log('this.$slots.default: ', this.$slots.default)
    return h('h' + this.level, // 标签名称
      this.$slots.default // 子节点数组
    )
  }
}