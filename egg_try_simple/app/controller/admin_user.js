const { getTokenFromAuthorization, maskPhoneNumber } = require('../utils');
const { toRealVal } = require('../utils/enum');
const BaseController = require('./base');

class AdminUserController extends BaseController {

  async login() {
    this.ctx.validate({
      username: { type: 'string', required: true, min: 4, max: 20 },
      password: { type: 'password', required: true },
      /* captcha: { type: 'name', required: true, min: 4, max: 6, message: '验证码不正确' },
      captcha_token: { type: 'name', require: true, message: '验证码不正确' }, */
    });
    const data = this.ctx.request.body;
    const res = await this.ctx.service.adminUser.login(data);
    this.success(res);
  }

  async refreshToken() {
    this.ctx.validate({
      refresh_token: { type: 'name', require: true, max: 1000, field: '刷新token' },
    });
    const data = await this.ctx.service.jwt.refreshToken(this.ctx.request.body.refresh_token);
    return this.success(data);
  }

  /* 查登录人的信息 */
  async userInfo() {
    const token = getTokenFromAuthorization(this.ctx)
    const userId = await this.ctx.service.jwt.getUserIdFromToken(token);
    const data = await this.ctx.service.adminUser.getUserInfo(userId);
    return this.success(data);
  }

  /* 查单个用户的信息 */
  async show() {
    const user = await this.ctx.service.adminUser.show(this.ctx.params.id)
    return this.success(user);
  }

  /* async captcha() {
    const data = await this.ctx.service.adminUser.createCaptcha();
    this.success(data);
  } */


  async userList() {
    const data = await this.service.adminUser.getUserList();
    this.success(data);
  }

  async createUser() {
    this.ctx.validate({
      /* 参数校验规则
      配置项没有field */
      username: { type: 'string', required: true, min: 4, max: 20 },
      nickname: { type: 'string', required: false, min: 2, max: 20 },
      password: { type: 'password', required: true },
      mobile: { type: 'string', required: false },
      status: { type: 'enum', required: true, values: [1, 2] },
    });
    await this.ctx.service.adminUser.createUser(this.ctx.request.body);
    this.success();
  }

  async updateUser() {
    this.ctx.validate({
      username: { type: 'string', required: true, min: 4, max: 20 },
      nickname: { type: 'string', required: false, min: 2, max: 20 },
      mobile: { type: 'string', required: false },
      status: { type: 'enum', required: true, values: [1, 2] },
    });
    await this.ctx.service.adminUser.updateUser(this.ctx.params.id, this.ctx.request.body);
    this.success();
  }

  async deleteUser() {
    await this.ctx.service.adminUser.deleteUser(this.ctx.params.id);
    this.success();
  }
}

module.exports = AdminUserController;
