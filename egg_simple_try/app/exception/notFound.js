/* 其他自定义业务异常全部继承 HttpExctption */
const HttpException = require('./http');

class NotFoundException extends HttpException {
  constructor(msg = '资源不存在', code = -1) {
    super({
      code,
      msg,
      data: null,
      httpCode: 404
    });
  }
}

module.exports = NotFoundException;