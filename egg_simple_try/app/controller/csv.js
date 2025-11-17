const BaseController = require('./base');
const { parseCSV } = require('../utils');

class CsvController extends BaseController {
  /* 业务场景有
  用户要上传一些csv文件(含有大量数据), 后端来解析数据, 还可能要存到数据库里面
  上传文件逻辑可看koa2_ts_mysql */
  async readCSV() {
    const { ctx } = this
    try {
      /* 注意路径问题
      不能传 /test/csv/price.csv, 否则本地开发环境下, 开头的"/"识别为磁盘根目录, 去掉则识别为项目根目录 */
      const arr = await parseCSV('test/csv/price.csv')
      console.log('解析csv文件数据:', arr)
      this.success(arr)
    } catch (err) {
      ctx.throw(500, '抛出错误')
    }
  }

  /* 暂时放这里, 不值得单独弄控制层 */
  getToken() {
    const token = this.service.jwt.createToken2('1')
    this.success({ token })
  }
}

module.exports = CsvController;