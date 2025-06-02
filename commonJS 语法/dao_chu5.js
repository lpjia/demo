/* 导出一个对象, 对象有方法 */
module.exports = {

  fn_arrow: () => {
    console.log('this:', this)
    return '这个 () => {}'
  },

  fn() {
    console.log('this:', this)
    return '这个 xxx()'
  },

  fn_function: function () {
    console.log('this:', this)
    return '这个 xxx:fn ()'
  }
}


// console.log('this:', this)