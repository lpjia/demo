class User {
  // 类字段 成员
  /* 类字段, 会在每个独立对象(实例)中被设好, 而不是设在 User.prototype */
  lei_zi_duan_shu_xing = '类的一部分'
  lei_zi_duan_fang_fa = () => console.log('lei_zi_duan_fang_fa()')

  constructor() {
    this.gou_zao_qi_can = 'gou_zao_qi_can'
  }

  // 实例方法
  fang_fa() {

  }

  // 类字段
  fang_fa_2 = function () {

  }

  /* 非法的js语法 类的 */
  // fangfa3: () => {

  // }
}

let user = new User()
console.log(
  user, '\n',
  user.lei_zi_duan_shu_xing,
)
user.lei_zi_duan_fang_fa()