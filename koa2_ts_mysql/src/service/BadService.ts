import Bad from "../model/BadModel";


class BadService {
  getBadListByPage(page: number, limit: number, where?: any) {
    return Bad.findAndCountAll({
      offset: (page - 1) * limit,
      limit,

      /* 全匹配 */
      // where: {
      //   productName: '芹菜'
      // }
    })
  }
}

export default new BadService()