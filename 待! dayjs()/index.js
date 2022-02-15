// 差

new Vue({
  el: '#app',
  data: {
  },
  computed: {
    msg() {
      return new Date()
    },
    msg2() {
      return dayjs()
    },
    msg3() {
      return dayjs.locale('zh-cn')
    },
    msg4() {
      return dayjs().locale('zh-cn')
    },
  },
  created() {
    console.log('dayjs():', dayjs())
  }
})