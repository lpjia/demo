/* BaseService 和 BaseTestService 是为了复用, 继承过来查询方法, 感觉只适用于简单的查询 */
export default class BaseService {

  private model: any;

  constructor(model: any) {
    this.model = model
  }

  getListByPage(page: number, limit: number) {
    return this.model.findAndCountAll({
      offset: (page - 1) * limit,
      limit,
    })
  }
}

/* 不需要导出实例 */
// export default new BaseService()