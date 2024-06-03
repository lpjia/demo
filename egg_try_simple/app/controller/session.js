const BaseController = require('./base');

class SessionController extends BaseController {
  async sessionView() {
    const { ctx } = this
    await ctx.render('auth/session.html')
  }

  create() {
    const { ctx } = this
    ctx.session.u_s = 'xd'
    this.success()
  }

  show() {
    const { ctx } = this
    const result = ctx.session
    this.success(result)
  }

  update() {
    const { ctx } = this
    ctx.session.u_s_x = 'zs'
    this.success()
  }

  destroy() {
    const { ctx } = this
    ctx.session = null
    this.success()
  }
}

module.exports = SessionController;