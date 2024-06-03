const { Service } = require('egg')

class CustomerService extends Service {
  async tryCatchError() {
    /* 错误可以捕获 */
    // ctx.throw(500, '故意出错')
    // throw new Error('这个错误可以捕获')
    // throw new NotFoundException('xx不存在', -1)
    // return '返回'

    try {
      /* 也可以捕获, 但是框架内部可以捕获错误 */
    } catch (error) {

    }
  }

  async create({ name, age }) {
    const { app } = this
    const result = await app.mysql.insert('customer_list', { name, age })
    return result.affectedRows === 1 ? result : null
  }
}

module.exports = CustomerService