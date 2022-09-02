import Good from "../model/GoodModel";


class GoodService {
  getGoodListByPage(page: number, limit: number, where?: any) {
    return Good.findAndCountAll({
      offset: (page - 1) * limit,
      limit,

      /* 全匹配 */
      // where: {
      //   productName: '芹菜'
      // }
    })
  }

  getGood() {
    return Good.findAll()
  }
}

export default new GoodService()