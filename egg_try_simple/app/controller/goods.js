const BaseController = require('./base');
const { toInt, calcOffsetByPage } = require('../utils');
const {
  create: createRule,
  update: updateRule,
  listByPage: listByPageRule
} = require('../validate/goods')

class GoodsController extends BaseController {
  async index() {
    const { ctx } = this;
    const result = await ctx.service.goods.index();
    this.success(result)
  }

  async listByPage() {
    const { ctx } = this;
    let { page, pageSize } = ctx.query

    /* ctx.query 可以用 */
    ctx.validate(listByPageRule, ctx.query);

    page = toInt(page)
    pageSize = toInt(pageSize)
    const offset = calcOffsetByPage(page, pageSize)
    const limit = pageSize

    const { list, total } = await ctx.service.goods.listByPage({ offset, limit });

    this.success({
      list,
      total,
      page,
      pageSize,
    })
  }

  async show() {
    const { ctx } = this;
    let { id } = ctx.params


    /* 参数校验, 还没封装到单独的文件 */
    const rule = {
      id: { type: 'int', required: true },
    };
    /* 如果不传第二个参数，会自动校验 `ctx.request.body` */
    ctx.validate(rule, ctx.params);


    id = toInt(id)
    const result = await ctx.service.goods.show({ id });
    result ? this.success(result) : this.fail()
  }

  async create() {
    const { ctx } = this;
    const { name, age } = ctx.request.body;

    ctx.validate(createRule);

    /* 是否成功 */
    const isSuccess = await ctx.service.goods.create({ name, age })
    isSuccess ? this.success() : this.fail()
  }

  /* 更新数据, 也就是改数据
  一般会携带id, 拼接在路径上, router要用":字段"区分 */
  async update() {
    const { ctx } = this;
    let { id } = ctx.params

    /* 捕获错误 */
    try {
      /* ctx.params 可以用 */
      ctx.validate({ id: updateRule.id }, ctx.params);
      /* 利用对象解构和重命名, 剔除掉某属性
      _命名会忽略, 剩余属性重新组成对象, ...起的作用 */
      const { id: _, ...updateBodyRule } = updateRule
      ctx.validate(updateBodyRule, ctx.request.body)
    } catch (error) {
      ctx.logger.warn(error.errors)
    }

    id = toInt(id)
    const { name, age } = ctx.request.body;

    const isSuccess = await ctx.service.goods.update({ id, name, age })
    isSuccess ? this.success() : this.fail()
  }
}

module.exports = GoodsController;