const BaseController = require('./base');

class UnitController extends BaseController {
  async getUnitMap() {
    const { service } = this
    const map = await service.unit.getUnitMap();
    this.success(map);
  }

  async getUnitList() {
    const { service } = this
    const list = await service.unit.getUnitList();
    this.success(list);
  }
}

module.exports = UnitController;