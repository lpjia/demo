new Vue({
  el: '#app',
  data: {
    msg: 'this is msg',
    counter: 0,
    enter: 'this is enter',
    arr: [
      { name: 'xm', age: 38 },
      { name: 'xj', age: 27 },
    ]
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