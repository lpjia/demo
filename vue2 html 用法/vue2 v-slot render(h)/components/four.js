// 局部注册
const blogPost2 = {
  render(h) {
    const header = this.$slots.header
    const body = this.$slots.default
    const footer = this.$slots.footer;
    // 和 hx-comp 组件写法类似, 这里用变量存了一下, 更清晰直观

    // 想要实现的 dom 节点
    ; `<div>
      <slot name="header"></slot>
      <slot name="main"></slot>
      <slot name="footer"></slot>
    </div>`;

    return h('div', [
      h('header', header),
      h('main', body),
      h('footer', footer),
    ])
  }
}

// 局部注册
const blogPost = {
  // 函数式组件写法, 比常规组件写法, 性能更好
  // https://cn.vuejs.org/v2/guide/render-function.html#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6
  functional: true,
  render(h, context) {
    const header = context.slots().header
    // const body = context.slots().default
    const body = context.children // 默认插槽, 和上一行注释的写法效果一样
    const footer = context.slots().footer
    // 和 hx-comp 组件写法类似, 这里用变量存了一下, 更清晰直观
    return h('div', [
      h('header', header),
      h('main', body),
      h('footer', footer),
    ])
  }
}