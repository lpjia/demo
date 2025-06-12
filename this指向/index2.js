class MyController {
  lei_zi_duan = '这是类字段'

  constructor() { }

  /* 常见 类方法 */
  fn1() {
    console.log(
      'fn1()'
    )
    this.fn2()

    return 'fn1()返回值'
  }

  fn2() {
    console.log(
      'fn2()'
    )
  }

  /* 类字段, 不推荐这样书写 */
  lei_fn1 = function () {
    this.fn2()
  }

  /* 类字段 箭头函数 */
  lei_fn_arrow = () => {
    this.fn2()
  }
}

export default new MyController() // 导出 类的实例