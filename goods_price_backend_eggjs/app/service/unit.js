const { Service } = require('egg');

class UnitService extends Service {
  async getUnitMap() {
    const { app } = this

    /* list是模型实例数组 */
    const list = await app.model.Unit.findAll({
      // attributes: ['id', 'unitName'],
      attributes: {
        include: ['id', 'unitName'],
        // exclude: ['deleteTime']
      }
    })
    /* 遍历list, 每个item都是模型实例 */
    const o = list.reduce((acc, cur) => {
      acc[cur.get('id')] = cur.get('unitName'); // item.get(' ') 拿到原始查询数据
      return acc
    }, {});

    /* let n;
    const { objToArr } = await import('../utils/commonMethod.mjs') // 动态导入
    n = objToArr({ 1: 'one' })
    console.log('n:', n) */

    return o
  }

  async getUnitList() {
    const { app } = this

    const list = await app.model.Unit.findAll({
      attributes: {
        exclude: ['deleteTime']
      }
    })

    return list
  }







  async createUnit(body) {
    const result = await this.app.model.Unit.create(body)
    console.log('result:', result.toJSON())
  }

  async deleteUnit(id) {
    // await this.service.unit.createUnit(this.ctx.request.body)
    // this.ctx.status = 200
    // this.ctx.body = {
    //   code: 0,
    //   msg: '',
    //   data: {}
    // }
    console.log('id:', id)
    const unit = await this.app.model.Unit.findByPk(id) // findByPk 通过主键查数据
    await unit.destroy();

    // if (unit) {
    //   unit.destroy();
    // }
  }
}

module.exports = UnitService;