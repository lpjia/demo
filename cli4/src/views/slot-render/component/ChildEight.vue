<script>
import BaseLayout from './BaseLayout.vue'

// 无响应式
let inputAttrs_2 = {
  type: 'email',
  placeholder: 'Enter your email',
  value: ''
}

export default {
  name: 'ChildEight',
  data() {
    return { // 这里的数据才有响应式
      txt: '文本内容'
    }
  },
  methods: {
    clk_2() {
      this.txt = "改了改了"
    },
    clk_3() {
      // 非响应式数据, 只能用原生 js 写法
      document.querySelector('#input_1').value = '录入的信息'
      // inputAttrs.value = "录入的信息"
    },

    // 这些都无法实现响应式
    clk_4() {

      // inputAttrs_2.value = "录入的信息_2"

      //  this.$set(inputAttrs_2, 'value', '录入的信息_2')

      this.$nextTick(() => {
        console.log('!!!')
        this.$set(inputAttrs_2, 'value', '录入的信息_2')
      })
    },
  },
  render(h) {
    const title = '这是 title'

    // 无响应式
    let inputAttrs = {
      type: 'email',
      placeholder: 'Enter your email'
    }

    function clk() {
      document.querySelector('#input_3').value = '录入的信息'
    }

    // 用箭头函数可准确获取 this 指向
    // const clk_5 = () => {
    //   this.clk_2()
    // }

    return (
      <BaseLayout>
        <template slot="header">
          <h3>Here might be a page title 这可能是一个页面标题</h3>
        </template>
        <p>A paragraph for the main content. 一段主要内容</p>
        <p>And another one. 还有一个</p>
        <p>template 里没有指明具名插槽的, 按默认插槽处理, 这三行都是直接填坑到默认插槽</p>

        {/** 注释是这样写的 */}
        {/** 样式属性还是支持驼峰式写法的(对标原生 js 写法) */}
        {/** <i style="display: inline-block; marginBottom: 10px;" title={this.txt}>测试加入变量 <b>{this.txt}</b></i> */}
        <i class="inlineBlockMargin" title={title}>测试加入变量 <b>{this.txt}</b></i>
        <button class="inlineBlockMargin" vOn:click={this.clk_2}>改"变量"的值</button>

        <div>
          <input {...{ attrs: inputAttrs }} class="inlineBlockMargin" id="input_1" />
          <button class="inlineBlockMargin" vOn:click={this.clk_3}>vOn:click 点击录入</button>
        </div>

        <div>
          <input {...{ attrs: inputAttrs_2 }} class="inlineBlockMargin" id="input_2" />
          <button class="inlineBlockMargin" vOn:click={this.clk_4}>无法实现响应式</button>
        </div>

        <div>
          <input {...{ attrs: inputAttrs }} class="inlineBlockMargin" id="input_3" />
          <button class="inlineBlockMargin" onClick={clk}>onClick 普通函数 点击录入</button>
        </div>

        <template slot="footer">
          <p>Here's some contact info 这是一些联系信息</p>
        </template>
      </BaseLayout>
    )
  }
};
</script>

<style lang="scss" scoped>
.inlineBlockMargin {
  display: inline-block;
  margin-bottom: 10px;
  margin-left: 10px;
}
</style>