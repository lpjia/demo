module.exports = {
  changjian: () => {
    console.log('常见导出写法')
    // console.log('箭头函数 this:', this)
    // 箭头函数的 this = {}
    return 'this is 箭头函数'
  },

  changjian_2() {
    // console.log('xxx() this:', this)
    // 普通函数的 this = 导出的整个对象
    return 'this is xxx()'
  },

  changjian_3: function () {
    // console.log('xxx:fn () this:', this)
    // 和2一样
    return 'this is xxx:fn ()'
  }
}