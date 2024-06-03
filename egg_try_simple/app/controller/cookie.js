const BaseController = require('./base');

/* cookie */
class CookieController extends BaseController {
  async cookieView() {
    const { ctx } = this
    await ctx.render('auth/cookie.html')
  }

  /* cookie可以是响应头给的
  并在下次请求同一个服务的时候带上, 在请求头的Cookie字段, 自动带上 */

  create() {
    const { ctx } = this
    /* cookie set get 同时加解密才可以 */
    ctx.cookies.set('u', 'xiongda', {
      // encrypt: true // 加密
      // signed: false
      // maxAge: 1000 * 5
    })
    this.success()
  }

  show() {
    const { ctx, app } = this
    /* 通过 this.app.config 来用config的信息 */
    console.log(
      app.config.keys
    )

    const result = ctx.cookies.get('u', {
      // encrypt: true // 加密
      // signed: false
    })
    this.success(result)
  }

  update() {
    const { ctx } = this
    ctx.cookies.set('u', 'zhaosi')
    this.success()
  }

  destroy() {
    const { ctx } = this
    ctx.cookies.set('u', null)
    this.success()
  }
}

module.exports = CookieController;