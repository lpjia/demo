let app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  },
  computed: {
    reverseMsg() {
      return this.message.split('').reverse().join('')
    }
  },
  methods: {
    /* click() {
      this.message = this.message.split('').reverse().join('')
    } */

    /* click() {
      ELEMENT.Message.success("success")
    }, */

    click() {
      ELEMENT.MessageBox.confirm('确认退出吗?', '提示', {
        confirmButtonClass: 'el-button--warning',
        customClass: 'message-logout'
      })
      return false;
      ELEMENT.Message({
        messge: '确定要删除?',
        type: 'warning'
      })
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
})