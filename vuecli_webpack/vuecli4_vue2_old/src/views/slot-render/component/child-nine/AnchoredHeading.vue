<script>
export default {
  name: 'AnchoredHeading',
  props: {
    level: {
      type: Number,
      required: true
    }
  },
  render(h) {
    // 想要实现的 dom 节点
    `<div>
      <h1>
        <slot></slot>
      </h1>
    </div>`;
    // <slot></slot> 在 jsx 用 this.$scopedSlots.default() 来写

    // 这里用 h() 最合适
    return h('div',
      [
        h('h' + this.level,
          this.$scopedSlots.default()
        ),
        // h('el-divider')
      ]
    )

    // 用 template 可能考虑会这样写, 判断到底用哪个 h 标签
    // 过于啰嗦
    /*
    <template>
      <h1 v-if="level === 1">
        <slot></slot>
      </h1>
      <h2 v-else-if="level === 2">
        <slot></slot>
      </h2>
      <h3 v-else-if="level === 3">
        <slot></slot>
      </h3>
      <h4 v-else-if="level === 4">
        <slot></slot>
      </h4>
      <h5 v-else-if="level === 5">
        <slot></slot>
      </h5>
      <h6 v-else-if="level === 6">
        <slot></slot>
      </h6>
    </template>
    */

    // 你可能会用 jsx 这样写
    // 但是 jsx 不支持 v-if 等指令
    /*
    <div>
      <h1 vIf={this.level === 1}>
        {this.$scopedSlots.default()}
      </h1>
      <h2 vElseIf={this.level === 2}>
        {this.$scopedSlots.default()}
      </h2>
    </div>
    */

    // 想用 v-html 把 dom 节点弄出来, 结果 <slot> 没有起到插槽的作用, 反而直接渲染了
    // <h> 标签算是渲染对了
    // <div domPropsInnerHTML={`<h${this.level}><slot></slot></h${this.level}>`} />

    // 想把 <slot> 正确渲染, 却渲染出 [object Object] 文本
    // <div domPropsInnerHTML={`<h${this.level}>${this.$scopedSlots.default()}</h${this.level}>`} />

  }
};
</script>
