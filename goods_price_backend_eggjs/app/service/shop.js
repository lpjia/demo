const { Service } = require('egg');

class ShopService extends Service {
  // async getShopMap() {
  //   const { app } = this

  //   const list = await app.model.Shop.findAll({
  //     attributes: ['id', 'Shop_name']
  //   })

  //   const o = list.reduce((acc, cur) => {
  //     acc[cur.get('id')] = cur.get('Shop_name');
  //     return acc
  //   }, {});

  //   /* let n;
  //   const { objToArr } = await import('../utils/commonMethod.mjs')
  //   n = objToArr({ 1: 'one' })
  //   console.log('n:', n) */

  //   return o
  // }

  async getShopList() {
    const { app } = this

    const list = await app.model.Shop.findAll({
      attributes: {
        exclude: ['deleteTime']
      }
    })

    return list
  }
}

module.exports = ShopService;