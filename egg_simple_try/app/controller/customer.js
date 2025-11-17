const { Controller } = require('egg');
const NotFoundException = require('../exception/notFound');

class CustomerController extends Controller {

  /* 捕获错误 */
  async tryCatchError() {
    const { ctx, app } = this;

    /* 框架通过 onerror 插件提供统一的错误处理机制。
    此机制将捕获所有处理方法（Middleware、Controller、Service）中抛出的任何异常 */

    /* 错误可以捕获 */
    // ctx.throw(500, '故意出错')
    // throw new Error('这个错误可以捕获')
    // throw new NotFoundException('xx不存在', -1)


    const { name, age } = ctx.request.body;
    // const result = await ctx.service.customer.tryCatchError({ name, age })
    const result = await app.mysql.get('customer_list', { name })
    if (result) {
      throw new NotFoundException('查成功了, 但是主动抛错') // 同样可以在Service抛错, 类似印象中java的判断后抛错
    }


    /* 不设置 body 默认就是 404 */


    /* 改默认404页面, 改成json */
    // ctx.set('Content-Type', 'application/json')


    // ctx.status = 500
    // ctx.body = {}
  }

  /* 用到了egg-mysql插件
  这里暂时先不用crud
  有需要就看user的完整例子 */
  async create() {
    const { ctx } = this;
    const { name, age } = ctx.request.body;
    const result = await ctx.service.customer.create({ name, age })

    ctx.status = 201;
    ctx.body = result;
  }
}

module.exports = CustomerController;
