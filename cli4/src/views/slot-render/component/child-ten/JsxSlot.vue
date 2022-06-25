<script>
export default {
  name: 'JsxSlot',
  props: {
    level: {
      type: Number,
      required: true
    }
  },
  render(h) {
    console.log('this.level:', this.level);

    // 想要实现的 dom 节点
    `<div>
      <h1>
        <slot></slot>
      </h1>
    </div>`;

    // this.$slots.default 也可以用, 但是不推荐, 推荐用作用域插槽写法

    // return (
    //   <div>
    //     {this.level === 2 ? <h1>{this.$slots.default}</h1> :
    //       <h2>{this.$scopedSlots.default()}</h2>}
    //     <el-divider></el-divider>
    //   </div>
    // )

    // 你可能会用 jsx 这样写
    // 虽然能实现需求, 但是过于繁琐
    /*
    return (
      <div>
        {
          this.level === 1 ? <h1>{this.$slots.default}</h1> :
            this.level === 2 ? <h2>{this.$slots.default}</h2> :
              this.level === 3 ? <h3>{this.$slots.default}</h3> :
                this.level === 4 ? <h4>{this.$slots.default}</h4> :
                  this.level === 5 ? <h5>{this.$slots.default}</h5> :
                    <h6>{this.$slots.default}</h6>
        }
        <el-divider></el-divider>
      </div>
    )
    */


    // 作用域插槽
    return (
      <section>
        {this.$scopedSlots.person({ name: 'xj', age: 29 })}
        <el-divider></el-divider>
      </section>
    )
  }
};
</script>
