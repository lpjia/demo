import Goods from "../model/GoodsModel";
import BaseService from "./BaseService";

class BaseTestService extends BaseService {
  constructor(model: any) {
    super(model);
  }
}

export default new BaseTestService(Goods)