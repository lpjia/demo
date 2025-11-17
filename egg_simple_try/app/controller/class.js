const BaseController = require('./base');
const { list: listRule, listByPage: listByPageRule } = require('../validate/class')

class ClassController extends BaseController {
  async index() {
    const { ctx } = this;

    ctx.validate(listRule, ctx.query);

    const result = await ctx.service.class.index(ctx.query);
    this.success(result)
  }

  async listByPage() {
    const { ctx } = this;

    /* ctx.query 可以用 */
    ctx.validate(listByPageRule, ctx.query);

    const result = await ctx.service.class.listByPage(ctx.query)
    this.success(result)
  }
}

module.exports = ClassController;