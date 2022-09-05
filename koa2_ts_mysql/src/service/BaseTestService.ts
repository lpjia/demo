import Good from "../model/GoodModel";
import BaseService from "./BaseService";

class BaseTestService extends BaseService {
  constructor(model: any) {
    super(model)
  }
}

export default new BaseTestService(Good)