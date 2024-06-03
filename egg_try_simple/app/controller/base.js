const { Controller } = require('egg');

/* 有可能带有操作的中文提示, 光success不够用, 比如添加成功, 删除成功, 删除失败等
这时候想想怎么映射

还有一种国际化的方案 */

class BaseController extends Controller {
  success(data = null, msg = 'success') {
    this.ctx.status = 200
    this.ctx.body = {
      code: 0,
      msg,
      data: JSON.parse(JSON.stringify(data))
    }
  }

  fail(code = -1, msg = 'fail') {
    this.ctx.status = 500
    this.ctx.body = {
      code,
      msg,
      data: null
    }
  }
}

module.exports = BaseController;