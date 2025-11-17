const BaseController = require('./base');

class ShopController extends BaseController {
  /* async getShopMap() {
    const { service } = this
    const map = await service.shop.getShopMap();
    this.success(map);
  } */

  async getShopList() {
    const { service } = this
    const list = await service.shop.getShopList();
    this.success(list);
  }
}

module.exports = ShopController;