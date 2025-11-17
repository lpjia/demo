const HttpException = require("./http");

class BadRequestException extends HttpException {
  constructor(code = -1, msg = '') {
    super({
      code,
      msg,
      data: null,
      httpCode: 400
    })
  }
}

module.exports = BadRequestException