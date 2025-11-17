const { Service } = require('egg')

class HomeService extends Service {
  async index() {
    /* 直接返回数据 */
    return { name: '从service返回的数据' }
  }
}

module.exports = HomeService