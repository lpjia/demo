const { Service } = require('egg')
const dayjs = require('dayjs');
const { nanoid } = require('nanoid');
const AuthException = require('../exception/auth');

class JwtService extends Service {
  // 生成token
  createToken(userId, secret, maxAge) {
    const now = dayjs().unix();
    /* 这些键是什么意思得看云笔记 */
    return this.app.jwt.sign({
      aud: 'http://127.0.0.1',
      iss: '',
      jti: nanoid(),
      iat: now,
      nbf: now,
      exp: now + maxAge,
      uid: userId,
    }, secret);
  }

  /* 单独生成token返回, 尝试看结果 */
  createToken2(userId) {
    const { app } = this
    const now = dayjs().unix();
    const config = app.config.jwt
    /* 这些键是什么意思得看云笔记 */
    return app.jwt.sign({
      jti: nanoid(),
      iat: now,
      nbf: now,
      exp: now + config.maxAge,
      uid: userId,
    }, config.secret);
  }

  async awardToken(userId) {
    const config = this.app.config.jwt;
    return {
      token: await this.createToken(userId, config.secret, config.maxAge),
      refresh_token: await this.createToken(userId, config.refresh_secret, config.refresh_maxAge),
    };
  }

  // 刷新token
  async refreshToken(refreshToken) {
    const userId = await this.getUserIdFromToken(refreshToken, true);
    const token = await this.createToken(userId, this.app.config.jwt.secret, this.app.config.jwt.maxAge);
    return {
      token,
      refresh_token: refreshToken,
    };
  }

  // 验证token
  async verifyToken(token) {
    const { app } = this
    if (!token) { // 如果token不存在就抛出异常
      throw new AuthException();
    }
    const { secret } = app.config.jwt;
    try {
      await app.jwt.verify(token, secret);
    } catch (e) { // 如果token验证失败直接抛出异常
      // 通过消息判断token是否过期
      if (e.message === 'jwt maxAged') {
        throw new AuthException('令牌过期', 10003);
      }
      throw new AuthException();
    }
    return true;
  }

  // 通过token获取用户id
  async getUserIdFromToken(token) {
    await this.verifyToken(token);
    // 解析token
    const res = await this.app.jwt.decode(token);
    return res.uid;
  }
}

module.exports = JwtService
