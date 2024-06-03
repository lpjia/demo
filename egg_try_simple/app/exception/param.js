const HttpException = require("./http");

class ParamException extends HttpException {
  constructor(msg = '表单参数校验失败', code = -1) {
    super({
      code,
      msg,
      data: null,
      httpCode: 400
    })
  }
}

module.exports = ParamException