const HttpException = require('./http');

class ParamException extends HttpException {
  constructor(msg = '表单参数校验失败', code = 40009) {
    super({
      code,
      msg,
      data: null,
      httpCode: 409
    });
  }
}

module.exports = ParamException;
