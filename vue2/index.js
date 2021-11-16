{/* <div>
  我是子组件
  <slot name="name">我是默认名称:{{ name }}</slot>
</div> */}

// 局部注册
const childOne = {
  data() {
    return {
      name: 'this is childOne'
    }
  },
  components: {
  },
  created() {
    console.log('子组件 child-one created()')
  },
  mounted() {
    console.log('子组件 child-one mounted()')
  },
  beforeDestroy() {
  },
  methods: {
  },
  template: `<div>
                我是子组件
                <slot childOne="name">我是默认名称:{{ name }}</slot>
              </div>`,
  // render(h) {
  //   return h('section', {
  //   },
  //   )
  // }
}



const vm = new Vue({
  el: '#app',
  data: {
    list: [
      { name: 'H<sub>2</sub>S&nbsp;传感器', amount: 13, key: '12' },
      { name: 'CO &nbsp;传感器', amount: 15, key: '1' },
      { name: 'CH<sub>4</sub>&nbsp;传感器', amount: 13, key: '13' },
      { name: 'O<sub>2</sub> &nbsp;&nbsp;传感器', amount: 15, key: '7' }
    ],
    msg: 'this is msg',
    counter: 0,
    enter: 'this is enter',
    arr: [
      { name: 'xm', age: 38 },
      { name: 'xj', age: 27 },
    ]
  },
  components: {
    'son': childOne,
  },
  computed: {
    longName() {
      return item => item.name + " is " + item.age
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    /**
     * 
     */
    init() {
    },


    greet: function (event) {
      console.log('Hello ' + this.msg + '!')
      // `event` 是原生 DOM 事件
      if (event) {
        console.log('event.target.tagName: ', event.target.tagName)
        console.log('event.type: ', event.type)
        console.log('event: ', event)
      }
    },
    doLog: function (message, event) {
      // 现在我们可以访问原生事件对象
      if (event) {
        event.preventDefault() // https://developer.mozilla.org/zh-CN/docs/Web/API/Event/preventDefault
        console.log('event: ', event)
      }
      console.log(message)
    },
    doSomething(msg) {
      console.log(msg)
    },
  }
})


// 禁止浏览器右键菜单
document.oncontextmenu = function (event) {
  event.preventDefault();
};