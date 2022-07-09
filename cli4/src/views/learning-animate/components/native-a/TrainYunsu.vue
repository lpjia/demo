<script>
export default {
  name: 'TrainYunsu',
  props: {
    cls: String
  },
  data() {
    return {
      left: 0
    };
  },
  methods: {
    clk() {
      this.left = '450px'
    }
  },
  render(h) {
    // 绑定一个动态 class 名(class 名由父组件提供), 再加一个普通 class
    // jsx
    return <img class={{ [this.cls]: true, train: true }}
      src="https://js.cx/clipart/train.gif"
      style={{ left: this.left }}
      onclick={this.clk} />

    // 最初

    // // jsx
    // return <img class="train" src="https://js.cx/clipart/train.gif" style={{ left: this.left }} onclick={this.clk} />

    // // dom 结构
    // <img class="train" src="https://js.cx/clipart/train.gif" onclick="this.style.left='450px'">

    // // h()
    // return h('img',
    //   {
    //     attrs: {
    //       class: 'train',
    //       src: 'https://js.cx/clipart/train.gif'
    //     },
    //     style: {
    //       left: this.left
    //     },
    //     on: {
    //       click: this.clk
    //     }
    //   }
    // )
  }
};
</script>

<style scoped lang="scss">
.train {
  position: relative;
  cursor: pointer;
  width: 177px;
  height: 160px;
  left: 0px;
  // transition: left 5s cubic-bezier(0, 0, 1, 1);
}
.yunsu {
  transition: left 5s cubic-bezier(0, 0, 1, 1);
}
.jiansu {
  transition: left 5s cubic-bezier(0, 0.5, 0.5, 1);
}
</style>
