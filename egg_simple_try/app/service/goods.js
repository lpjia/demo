const { Service } = require('egg')

class GoodsService extends Service {
  /* mysql.get方法查一条记录
  mysql.select方法查多条记录 */

  async index() {
    const { app } = this
    const result = await app.mysql.select('customer_list')
    return result
  }

  async listByPage({ offset, limit }) {
    const { app } = this
    const list = await app.mysql.select('customer_list', {
      offset, // 数据偏移量
      limit, // 返回数据量
    })
    const total = await app.mysql.count('customer_list')
    return { list, total }
  }

  async show({ id }) {
    const { app } = this
    /* mysql.get方法, 返回的是
    查到数据 ==> 包装后的数据 RowDataPacket, 可以判定为true
    查不到数据 ==> null, 判断为false */
    const result = await app.mysql.get('customer_list', { id })
    return result
  }

  /* 一般创建数据, 会去重
  也就是先查一遍该数据是否已添加
  是则提示已添加, status赋值500 */
  async create({ name, age }) {
    const { app } = this
    const existData = await app.mysql.get('customer_list', { name })
    if (existData) return false

    /* mysql.insert方法, 返回的是
    有affectedRows属性的 OkPacket
    判定成功与否, result.affectedRows === 1
    insert、update、delete方法都是这样来判断
    不适合把result返回 */
    const result = await app.mysql.insert('customer_list', { name, age })
    return result.affectedRows === 1
  }

  /* 更新数据, 查id, 看数据是否存在
  存在则更新
  考虑到名字等字段的值重复问题
  重名的不能改 */
  async update({ id, name, age }) {
    const { app } = this
    const existData = await app.mysql.get('customer_list', { id })
    if (!existData) return false

    const existArr = await app.mysql.select('customer_list', {
      where: { name }
    })
    /* 查到有重名的且id不一致, 那不能更新数据 */
    if (existArr.length && existArr.some(item => item.id !== id)) {
      return false
    }

    const result = await app.mysql.update('customer_list', { id, name, age })
    return result.affectedRows === 1
  }
}

module.exports = GoodsService