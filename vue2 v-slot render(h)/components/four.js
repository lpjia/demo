// 局部注册
const blogPost = {
  render(h) {
    const header = this.$slots.header
    const body = this.$slots.default
    const footer = this.$slots.footer
    // 和 hx-comp 组件写法类似, 这里用变量存了一下, 更清晰直观
    return h('div', [
      h('header', header),
      h('main', body),
      h('footer', footer),
    ])
  }
}