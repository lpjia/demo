const { Service } = require('egg')
const { toInt, calcOffsetByPage, toUnderlineCase } = require('../utils')

class ClassService extends Service {
  /* 一般是在查数据库时, 字段名需要下划线的
  处理前端传的参数, 一般是对象, 键基本全是小驼峰
  很少传数组, 就算传数组, 遍历数组后一样处理
  然后就是从数据库返回的字段名有下划线的, 通过中间件来转成小驼峰 */
  async index(query) {
    const { app } = this
    /* 小驼峰转成下划线 */
    const p = toUnderlineCase(query)
    console.log('p:', p) // apifox不好查看query的中文, 故在此打印

    // const result = await app.mysql.query(`select * from class_list where `)
    const result = await app.mysql.select('class_list', {
      where: p
    })
    return result
  }

  async listByPage({ page, pageSize }) {
    const { app } = this

    page = toInt(page)
    pageSize = toInt(pageSize)
    const offset = calcOffsetByPage(page, pageSize)
    const limit = pageSize

    const list = await app.mysql.select('class_list', {
      offset, // 数据偏移量
      limit, // 返回数据量
    })

    const total = await app.mysql.count('class_list')

    return {
      list,
      total,
      page,
      pageSize,
    }
  }
}

module.exports = ClassService