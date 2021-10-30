import { debounce } from '../util/commonMethod.js'

/* 现在放到 globalComp.js
// 全局注册
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++" class="btn_gutter">You clicked me {{ count }} times.</button>'
}) */




// 局部注册
const buttonCounterMinus = {
  /**
   * 避免直接改变 prop，因为每当父组件重新渲染时，值都会被覆盖。 相反，根据道具的值使用数据或计算属性。
   */
  // props: ['count'],
  /**
   * 有点击事件改变 count 的值, 所以计算属性在这不能用, 因为 setter
   */
  props: ['prop_count'],
  data: function () {
    return {
      count: 0
    }
  },
  mounted() {
    this.count = this.prop_count
  },
  template: '<button v-on:click="count--" class="btn_gutter">You clicked me {{ count }} times.</button>'
}



// 局部注册
const lineChart = {
  data: function () {
    return {
      count: 100,

      chartInstance: null
    }
  },
  props: ['id'],
  components: {
    // 'button-counter-minus': buttonCounterMinus,
  },
  created() {
  },
  mounted() {
    this.initChart()
    this.resizeChart()
  },
  beforeDestroy() {
    this.$erd.removeAllListeners(document.querySelector('#' + this.id))
  },
  methods: {
    initChart() {
      // console.log('this.id: ', this.id)
      // console.log(document.querySelector('#' + this.id))

      let myChart = echarts.init(document.querySelector('#' + this.id))
      this.chartInstance = myChart
      myChart.setOption(option)
    },
    resizeChart() {
      /**
       * 先监听容器
       * 第二参直接传函数, 这里是防抖函数
       */
      this.$erd.listenTo(document.querySelector('#' + this.id), debounce(() => {
        if (this.chartInstance) {
          console.log('resize()')
          this.chartInstance.resize()
        }
      }, 500))
    },
  },
  /**
   * 这不能直接写标签的形式, 因为是 dom 模版, 没有 babel 工具
   */
  // template: `<div class="chartContainer" id="id"></div>`
  // template: `<div class="chartContainer">
  //   <button-counter-minus></button-counter-minus>
  // </div>`,

  /**
   * 因为得绑定动态的 id, 所以不能用 template
   */
  render(h) {
    // console.log(h)

    /**
     * 官网
     * https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1
     */
    return h('section', {
      /**
       * 这传 id, 无效
       */
      // props: {
      //  id: this.id
      // },

      /**
       * 普通的 html 属性
       */
      attrs: {
        class: 'chartContainer',
        id: this.id, // id, 因为是普通的 html 属性
      },
      // class: { // 下面这种写法也行
      //   chartContainer: false
      // }
    },
      /**
       * 第三个参数, 传标签内容/子标签
       */
      // this.id

      /**
       * 为了测试传入子组件的数据
       */
      // [
      //   h('button-counter-minus', {
      //     props: {
      //       // count: this.count // 不用, 子组件内的逻辑会改变 count
      //       prop_count: this.count // 用 props 传入子组件
      //     }
      //   }
      //   )
      // ]


      /**
       * 子标签
       */
      // [
      //   h('div', {
      //     attrs: {
      //       title: this.count
      //     },
      //   },
      //     this.id
      //   )
      // ]
    )
  }
}


/**
 * 引入直接用 elementResizeDetectorMaker()
 */
Vue.prototype.$erd = elementResizeDetectorMaker();


let vue = new Vue({
  el: '#app',
  // 局部注册, 唯一注意的是加s
  components: {
    'button-counter-minus': buttonCounterMinus,
    'line-chart': lineChart,
  },
  data: {
    isCollapse: false, // 是否收缩
    domList: [
      { id: 'domChart' },
      { id: 'domChart2' },
    ],
    // chartDomList: [],
    // chartInstanceArr: [],
  },
  computed: {
  },
  mounted() {
    // this.windowResize()
    // this.init()
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },

    init() {
      this.domList.forEach((item, idx) => {
        // this.chartInstanceArr[idx] = echarts.init(document.querySelector('#' + item.id))
        // this.chartInstanceArr[idx].setOption(option)

        // let myChart = echarts.init(document.querySelector('#' + item.id))
        // myChart.setOption(option)
      });
    },
    windowResize() {
      // 只能监听到浏览器窗口的宽高变化
      window.onresize = e => {
        console.log('window.onresize e: ', e)
      }
    },
  }
})
