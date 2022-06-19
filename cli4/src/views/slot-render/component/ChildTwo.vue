<script>
export default {
  name: 'ChildTwo',
  data() {
    return {
      description: 'this is ChildTwo',
      id: 'xxoo',
      cls: true
    };
  },
  // 模版最后也是要编译成 render
  // 所以模版的 <slot> 和 name="slot_x" 在 render 就变成普通标签和属性
  // 处理的思路要变
  render(h) {
    console.log("🚀 ~ file: ChildTwo.vue ~ ")

    // this.$slots 访问静态插槽, 静态插槽就是不带参数的
    const { default: moren, slot_3, slot_4 } = this.$slots
    console.log('moren: ', moren)
    console.log('slot_4: ', slot_4)
    // 不属于静态插槽, 所以取不到值
    console.log('slot_3: ', slot_3)

    // https://cn.vuejs.org/v2/guide/render-function.html#%E6%8F%92%E6%A7%BD
    // https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1
    return h('section',
      // {}, // 没有绑定任何东西, 就可省略
      {
        // 普通的 HTML 属性
        attrs: {
          data: this.id,
          class: 'bg'
        },
        // :style
        style: {
          paddingTop: '3rem'
        },
        // :class
        class: {
          bd: this.cls
        }
      },
      [
        '先写一些文字',
        h('div',
          [
            this.description,
            // 通过 this.$slots 访问静态插槽的内容，每个插槽都是一个 VNode 数组
            // 也能通过作用域插槽取到静态插槽的内容, 如下面两行代码的注释, 执行效果一样
            h('h4', slot_4), // h('h4', this.$scopedSlots.slot_4()),
            h('h4', this.$scopedSlots.slot_4()),
            h('h3', moren), // h('h3', this.$scopedSlots.default({ id: this.id })),

            // 通过 this.$scopedSlots 访问作用域插槽，每个作用域插槽都是一个返回若干 VNode 的函数
            // 作用域插槽用法是 this.$scopedSlots.xxx(), 一定记得最后要调用函数
            // 作用域插槽的参数是传过去的数据
            h('h2', this.$scopedSlots.slot_3({ id: this.id })),
            h('h4',
              {
                domProps: { // 可当 v-html 使用
                  innerHTML: '<i>innerHTML 原&nbsp;&nbsp;&nbsp;&nbsp;生 js 的那个效果</i>'
                }
              }
            )
          ]
        ),
        h('p', '兄弟节点 p')
      ]
    )
  }
};
</script>

<style scoped lang="scss">
.bg {
  background: #e0dfdf;
}
.bd {
  border: 1px solid deepskyblue;
}
</style>
