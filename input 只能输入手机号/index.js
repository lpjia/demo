
new Vue({
  el: '#app',
  data: {
    phone: '',

    phone2: ''
  },
  computed: {
  },
  methods: {
    handleKeydown(key) {
      /**
       * 按退格键则正常操作
       * 在索引为3和8的地方加空格
       */
      if (key.keyCode !== 8 && (this.phone.length === 3 || this.phone.length === 8)) {
        this.phone = this.phone + ' '
      }
    },
    handleInput(val) {
      /**
       * 处理输入除空格外的所有常见字符
       */
      this.phone = this.phone.replace(/[A-Za-z\u4e00-\u9fa5\[\]\\`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g, '')
      /**
       * 处理输入空格
       */
      if (val.data === ' ') {
        let leng = this.phone.length
        this.phone = this.phone.substring(0, leng - 1)
      }
    }
  }
})