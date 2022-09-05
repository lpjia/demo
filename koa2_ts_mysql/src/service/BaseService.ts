

export default class BaseService {

  // protected model: any;
  constructor(model: any) {
    this.model = model
  }

  getGoodListByPage(page: number, limit: number, where?: any) {
    return this.model.findAndCountAll({
      offset: (page - 1) * limit,
      limit,
    })
  }
}

// export default new BaseService()