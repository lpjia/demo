const { genderObj, userStatusObj } = require('../utils/enum');
const BaseController = require('./base');

class EnumController extends BaseController {
  async getGenderMap() {
    this.success(genderObj)
  }
  async getUserStatusMap() {
    this.success(userStatusObj)
  }
}

module.exports = EnumController;