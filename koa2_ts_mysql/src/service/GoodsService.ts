import Goods from "../model/GoodsModel";


class GoodsService {
  getGoodsListByPage(page: number, limit: number, where?: any) {
    return Goods.findAndCountAll({
      offset: (page - 1) * limit,
      limit,

      /* 全匹配 */
      // where: {
      //   productName: '芹菜'
      // }
    })
  }

  getGoodsList() {
    return Goods.findAll()
  }
}

export default new GoodsService()