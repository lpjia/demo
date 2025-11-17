const HttpException = require('./http');

class AuthException extends HttpException {
  constructor(msg = '令牌无效', code = -1) {
    super({
      code,
      msg,
      data: null,
      httpCode: 401
    });
  }
}

module.exports = AuthException;