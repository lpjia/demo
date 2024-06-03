const BaseController = require('./base');
const { update: updateRule } = require('../validate/account')

class AccountController extends BaseController {
  async update() {
    const { ctx } = this;

    ctx.validate({ id: updateRule.id }, ctx.params);
    const { id: _, ...updateBodyRule } = updateRule
    ctx.validate(updateBodyRule);

    const isSuccess = await ctx.service.account.update(ctx.params.id, ctx.request.body);
    isSuccess ? this.success() : this.fail()
  }

  async update2() {
    const { ctx } = this;

    ctx.validate({ id: updateRule.id }, ctx.params);
    const { id: _, ...updateBodyRule } = updateRule
    ctx.validate(updateBodyRule);

    const isSuccess = await ctx.service.account.update2(ctx.params.id, ctx.request.body);
    isSuccess ? this.success() : this.fail()
  }

  async update3() {
    const { ctx } = this;

    ctx.validate({ id: updateRule.id }, ctx.params);
    const { id: _, ...updateBodyRule } = updateRule
    ctx.validate(updateBodyRule);

    const isSuccess = await ctx.service.account.update3(ctx.params.id, ctx.request.body);
    isSuccess ? this.success() : this.fail()
  }
}

module.exports = AccountController;