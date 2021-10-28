
let vue = new Vue({
  el: '#app',
  data: {
    msg: 'hello world!',

    value: '',
    options: [
      {
        label: 'num 1',
        value: 1,
      },
      {
        label: 'str 2',
        value: '2',
      },
    ]
  },
  computed: {
  },
  methods: {
    // 反转字符串
    reverseMsg() {
      this.msg = this.msg.split('').reverse().join('')
    },

    // 直接写法
    click() {
      ELEMENT.Message.info('这是普通提示!')
    },

    // 配置写法
    click2() {
      ELEMENT.Message({ message: '这是成功提示!', type: 'success' })
    },

    // 弹出框配置写法
    click3() {
      ELEMENT.MessageBox.confirm('确认退出吗?', '提示', {
      })
        .then(() => {
          ELEMENT.Message.success('点击了确定!')
        })
        .catch(() => {
          ELEMENT.Message.error('点击了取消!')
        })
    },

    // 改了些样式
    click4() {
      ELEMENT.MessageBox.confirm('确认退出吗?', '提示', {
        confirmButtonClass: 'el-button--warning',
        type: 'warning'
      })
    },

    // 居中且改 icon
    click5() {
      ELEMENT.MessageBox.confirm('确认退出吗?', '提示', {
        confirmButtonClass: 'el-button--warning',
        // type: 'warning',
        iconClass: 'el-icon-s-opportunity',
        center: true
      })
    },

    // alert
    click6() {
      ELEMENT.MessageBox.alert('确认退出吗?')
    },

    // 
    test(val) {
      console.log('val: ', val)
      console.log(typeof val)
    }
  }
})