const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    console.log('某个接口resp')
    ctx.body = 'hi, egg';
  }

  async getDataByService() {
    const { ctx } = this
    const result = await ctx.service.home.index()
    ctx.body = result
  }
}

module.exports = HomeController;