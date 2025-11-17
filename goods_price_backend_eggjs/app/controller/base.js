const { Controller } = require('egg');

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