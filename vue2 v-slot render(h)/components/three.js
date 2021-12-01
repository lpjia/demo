// 局部注册
const hxComp = {
  data() {
    return {
      text: 'three.js'
    }
  },
  props: {
    level: {
      type: Number,
      required: true,
    }
  },
  // template: '#hx-template' // 用模版
  // 用 render 重写, 代码明显比模版简洁多了
  render(h) {
    // console.log('---- hx-comp ----');

    // 想要实现的 dom 节点
    ; `<hx>
      // <slot></slot> // 其实这行代码和下面一行代码对于作用域插槽一样执行
      <slot :text="text"></slot>
      <slot name="slot_5"></slot>
    </hx>`;

    return h('h' + this.level, // 标签名称
      [ // 子节点
        // this.$slots.default,
        this.$scopedSlots.default({ text: this.text }),
        this.$slots.slot_5
      ]
    )
  }
}