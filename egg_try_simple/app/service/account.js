const { Service } = require('egg')

class AccountService extends Service {
  /* 手动控制 事务 */
  async update(id, bod) {
    const { app } = this
    // 手动控制
    const conn = await app.mysql.beginTransaction(); // 初始化事务
    try {
      /* 手动捕获错误 */
      const { amount } = bod
      await conn.query(`update account set balance = balance - ? where name = ?;`, [amount, '小黄'])
      await conn.query(`update account set balance = balance + ? where name = ?;`, [amount, '小明'])
      await conn.commit(); // 提交事务
      return true
    } catch (err) {
      await conn.rollback(); // 一定记得捕获异常后回滚事务！！
      throw err;
    }
  }

  /* 自动控制 事务 */
  async update2(id, bod) {
    const { ctx, app } = this
    try {
      /* 手动捕获错误, 可以不用 */
      const { amount } = bod
      // 自动控制
      const result = await app.mysql.beginTransactionScope(async (conn) => {
        await conn.query(`update account set balance = balance - ? where name = ?;`, [amount, '小黄'])
        await conn.query(`update account set balance = balance + ? where name = ?;`, [amount, '小明'])
        return true
      }, ctx)
      return result
    } catch (err) {
      throw err;
    }
  }

  async update3(id, bod) {
    const { app } = this
    /* this.app.mysql.escape(id) 拼接来自前端传的数据, 防止sql注入 */
    const list = await app.mysql.query(`select * from account where id = ${app.mysql.escape(id)}`)
    /* 找到name, 不直接用id */
    if (!list.length) return false
    const { amount } = bod
    /* 另一种"占位符"方案, mysql内部会调用escape方法来转义 */
    const result = await app.mysql.query(`update account set balance = ? where name = ?;`, [amount, list[0].name]) // 用id查出来的, 有且仅有一个
    return result.affectedRows === 1
  }
}

module.exports = AccountService