<script>
export default {
  // 函数式组件写法, 比常规组件写法, 性能更好
  // https://cn.vuejs.org/v2/guide/render-function.html#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6

  // 将组件标记为 functional，这意味它无状态 (没有响应式数据)，也没有实例 (没有 this 上下文)。
  functional: true,
  // 为了弥补缺少的实例
  // 提供第二个参数作为上下文
  render(h, context) {
    console.log("🚀 ~ file: BlogPost.vue ~ ");
    // 想要实现的 dom 节点
    `<div>
      <slot name="header"></slot>
      <slot name="main"></slot>
      <slot name="footer"></slot>
    </div>`;

    const header = context.slots().header

    // children：VNode 子节点的数组
    const body = context.children // 默认插槽, 和下一行代码执行结果一样
    // const body = context.slots().default // 默认插槽
    // console.log("🚀 ~ file: BlogPost.vue ~ line 14 ~ render ~ body", body)

    // 两种写法, 为了统一, 推荐 scopedSlots
    // const footer = context.slots().footer
    const footer = context.scopedSlots.footer()
    // 和 hx-comp 组件写法类似, 这里用变量存了一下, 更清晰直观


    return h('div', [
      h('header', header),
      h('main', body),
      h('footer', footer),
      h('el-divider')
    ])
  }
}
</script>