const { nanoid } = require('nanoid');
// const svgCaptcha = require('svg-captcha');
const BaseService = require('./base');
const ParamException = require('../exception/param');
const crypto = require('crypto');
const BadRequestException = require('../exception/badRequest');
const NotFoundException = require('../exception/notFound');
const { toInt, maskPhoneNumber, getTokenFromAuthorization } = require('../utils');
const { toRealVal } = require('../utils/enum');

class AdminUserService extends BaseService {
  async getUserList() {
    const { AdminUser, AdminRoleUser, AdminRole } = this.app.model;
    // 报错, 提示as别名重复了
    // AdminUser.hasMany(AdminRoleUser, {
    //   as: 'roles',
    //   foreignKey: 'user_id',
    //   targetKey: 'id',
    // });

    /* 获取总数 */
    const count = await AdminUser.count({
      where: this.queryWhere(),
    })
    /* findAndCountAll方法获取的count不对 */
    // const { count, rows } = await AdminUser.findAndCountAll({
    /* 获取分页列表 */
    const rows = await AdminUser.findAll({
      where: this.queryWhere(),
      attributes: {
        exclude: ['delete_time', 'password']
      },
      /* 关联查询 */
      include: [{
        model: AdminRoleUser,
        as: 'roles', // 这个别名必须有, 对应定义关联时的别名, 同时也作为键值对(键是别名, 值是AdminRoleUser的数据)挂载到查出数据上
        attributes: ['user_id', 'role_id'],
        /* 这里进行了多级关联查询 */
        // include: [AdminRole]
        /* 有别名, 推荐写 */
        include: [{
          model: AdminRole,
          as: 'role',
        }]
      }],
      ...this.pageParam(),
    });
    return this.paginate(count, rows);

    /* 不想要整个模型实例数据, 只要单个字段的值, 拼接到role键 */
    for (const row of rows) {
      /* 如果rows没有值, 那么就不会遍历
      不用学后端去判断obj的key是否存在
      关联有model, 如果没值, 就不会遍历, 有值就有roles字段 */
      row.roles.forEach(roleItem => {
        /* 如果row.roles没值, 那么就不会遍历, 同上 */
        /* 得用内部属性 dataValues
        打印包装过的数据时发现, 想增加、删除属性, 就用.dataValues.xxx */
        roleItem.dataValues.roleName = roleItem.role.name
        delete roleItem.dataValues.role
        /* 不生效
        roleItem.roleName = roleItem.role.name
        delete roleItem.role */
      })
    }

    return this.paginate(count, rows);
  }

  queryWhere() {
    const { Op } = this.app.Sequelize;
    const { query } = this.ctx;
    const where = {};
    const keyword = this.app._.trim(query.keyword);
    if (keyword && keyword.length > 0) {
      where[Op.and] = {
        [Op.or]: [
          { username: { [Op.like]: `%${keyword}%` } },
          { mobile: { [Op.like]: `%${keyword}%` } },
        ],
      };
    }
    const status = parseInt(query.status);
    if (!Number.isNaN(status) && [1, 2].includes(status)) {
      where.status = status;
    }
    return where;
  }

  /* 创建用户 */
  async createUser(p) {
    const model = this.app.model.AdminUser;
    const user = await model.findOne({
      where: {
        username: p.username
      }
    });
    if (user !== null) {
      throw new ParamException('用户名重复');
    }
    if (p.mobile) {
      const mobileUser = await model.findOne({
        where: {
          mobile: p.mobile
        }
      });
      if (mobileUser !== null) {
        throw new ParamException('手机号码重复');
      }
    }
    p.password = this.encryptPassword(p.password);
    p.create_time = new Date();

    /* create方法用于向数据库中插入一条新记录，并返回一个 Promise 对象
    当 Promise 被成功解析时，会返回一个表示插入的 Sequelize 模型实例
    通过检查 Promise 对象是否被成功解析，可以判断插入操作是否成功
    也就是说 await解析成功则插入成功, 解析失败则egg框架捕获错误 */
    await model.create(p);

    // const result = await model.create(p);
    /* 推荐打印 result.toJSON() 方便查看 */

    /* 提取 Sequelize 实例的属性值，并转换为纯 JavaScript 对象 */
    // const userData = result.get({ plain: true });

    /* 从 Sequelize 实例中提取需要的数据 */
    // const userData = result.get({
    //   plain: true,
    //   attributes: ['id', 'username']
    // });
    /* 从 Sequelize 实例中提取需要的数据, 排除某些属性 */
    // const userData = result.get({
    //   plain: true,
    //   attributes: {
    //     exclude: ['password']
    //   }
    // });
    /* 以上两个get例子没生效, 不懂为啥 */
  }

  async updateUser(id, p) {
    /* this.ctx.params.id 得到的是string类型 */
    id = toInt(id)
    const user = await this.findUser(id);
    const {
      username, nickname, mobile,
      status
    } = p

    /* 一般情况 username 是用户登录账号, 不应该可改
    这里暂时先可改
    数据库定了 username和mobile两个字段是唯一索引, 所以不会有重复的username和mobile */

    /* 存在重复的 username */
    if (await this.existDuplicateUsers('username', username, id)) {
      throw new ParamException('username 已存在');
    }
    /* 存在重复的 mobile */
    if (await this.existDuplicateUsers('mobile', mobile, id)) {
      throw new ParamException('mobile 已存在');
    }

    /* 有个问题, 怎么保证更新数据时比对字段值有没有变化?
    还是前端来判断吧, 数据都能拿到, 好比对 */

    /* 这里还不能用 === 来比对字段值有没有变化
    因为前端有可能就不传没值的字段
    导致p.mobile(举例)为undefined
    数据库没值, 查出来的mobile为"", 这两个 !== */

    /* 当字段的数据没有变化时, 调用save方法后, orm什么也不会做, 也不会生成任何sql
    会报错, 暂时不清楚是唯一索引的问题还是其他? */
    user.username = username;
    user.nickname = nickname;
    user.mobile = mobile;
    user.status = status;
    await user.save();
  }

  /* 是否查出来重复的user */
  async existDuplicateUsers(field, val, id) {
    const duplicateUsers = await this.app.model.AdminUser.findAll({
      where: {
        [field]: val
      },
    });
    /* 查到有重复的username且id不一致, 那不能更新数据
    也就是存在, 返回true */
    const exist = duplicateUsers.length && duplicateUsers.some(item => item.id !== id) // some方法, 有一个符合就返回 true
    /* 用findAll方法, 为了排除自身 */
    return exist
  }

  /* 判断是否为登录账号 */
  async isCurrentLogin(id) {
    const token = getTokenFromAuthorization(this.ctx)
    const userId = await this.ctx.service.jwt.getUserIdFromToken(token);
    return id === userId
  }

  /* 删除 编辑 应该是一样的逻辑 */
  async deleteUser(id) {
    id = toInt(id)
    if (await this.isCurrentLogin(id)) {
      throw new BadRequestException(20002, '不能删除当前账户');
    }
    const user = await this.findUser(id);
    await user.destroy();
  }

  async getUserInfo(userId) {
    const user = await this.findUser(userId);

    /* 原始查询, 不需要访问元数据 */
    const QueryTypes = this.app.Sequelize.QueryTypes;
    /* 查询中的替换可以通过两种不同的方式完成:使用命名参数(以:开头),或者由？表示的未命名参数
    ? -> replacements: ['userId']
    :userId -> replacements: { userId: 替换的值 } */

    /* 看下面sql语句, 需要学习的 in 用法 */
    /* SELECT
      `id`,
      `name` 
    FROM
      `admin_role` 
    WHERE
      ( `id` IN ( SELECT `role_id` FROM `admin_role_user` WHERE `user_id` = : userId ) ) 
      AND `admin_role`.`delete_time` IS NULL */
    const roles = await this.app.model.query('SELECT `id`,`name`,`level` FROM `admin_role` WHERE (`id` IN (SELECT `role_id` FROM `admin_role_user` WHERE `user_id` = :userId) ) AND `admin_role`.`delete_time` IS NULL', {
      type: QueryTypes.SELECT,
      replacements: { userId }
    });
    /* roles是对象数组, 例如[{id: 1, name: '超级管理员'}]
    roleIds是id数组, 例如[1, 2, 3] */
    const roleIds = roles.map(item => item.id);
    let menu = [];
    if (roleIds.includes(1)) { // 角色:超级管理员
      menu = await this.app.model.AdminMenu.findAll({
        order: [
          ['sort', 'ASC'],
          ['id', 'ASC']
        ],
        attributes: {
          exclude: ['delete_time']
        }
      });
    } else {
      if (roleIds.length === 0) {
        throw new BadRequestException(20022, '用户未绑定角色');
      }
      /* SELECT
          * 
        FROM
          `admin_menu` 
        WHERE
          ( `id` IN ( SELECT `menu_id` FROM `admin_role_menu` WHERE `role_id` IN (: roleIds ) ) ) 
          AND `admin_menu`.`delete_time` IS NULL 
        ORDER BY
          `sort` ASC,
          `id` DESC; */
      menu = await this.app.model.query('SELECT * FROM `admin_menu` WHERE (`id` IN (SELECT `menu_id` FROM `admin_role_menu` WHERE `role_id` IN (:roleIds) ) ) AND `admin_menu`.`delete_time` IS NULL ORDER BY `sort` ASC, `id` DESC', {
        type: QueryTypes.SELECT,
        replacements: { roleIds }
      });
    }
    /* dataValues是内部属性, 增加了2个属性
    而不能 user.zdy = '这是自定义属性', 这是无效的
    增加、删除属性还要使用数据库存的字段名, 一般是下划线的 */
    user.dataValues.roles = roles;
    user.dataValues.menus = menu;

    /* user.dataValues.mobile = maskPhoneNumber(user.dataValues.mobile)
    user.dataValues.gender = toRealVal('gender', user.dataValues.gender)
    user.dataValues.status = toRealVal('status', user.dataValues.status) */

    /* 读取和赋值可直接 模型实例.xxx, 因为 Sequelize 会自动处理这些操作。 */
    /* 有中间件统一处理这些字段, 不用一个个处理了 */
    /* user.mobile = maskPhoneNumber(user.mobile)
    user.gender = toRealVal('gender', user.gender)
    user.status = toRealVal('status', user.status)
    delete user.dataValues.password */

    // this.ctx.currentLoginUser = user

    return user;
  }

  /* 查单个用户的信息 */
  async show(userId) {
    /* orm的findOne等方法在传string类型的数字时, 也会正常查数据库 */
    const user = await this.findUser(userId)
    /* 有中间件统一处理这些字段, 不用一个个处理了 */
    /* user.mobile = maskPhoneNumber(user.mobile)
    user.gender = toRealVal('gender', user.gender)
    user.status = toRealVal('status', user.status)
    delete user.dataValues.password */
    return user
  }

  /* 直接查用户的id来获取信息, 适用于用户基本信息表+用户详情信息表, 得分表 */
  async findUser(userId) {
    const user = await this.app.model.AdminUser.findOne({
      where: {
        id: userId
      },
      attributes: {
        exclude: ['delete_time']
      }
    });
    if (user === null) {
      throw new NotFoundException('用户不存在', 20000);
    }
    return user;
  }

  async login(p) {
    // 校验验证码
    /* await this.validCaptcha(p.captcha_token, p.captcha); */
    let user = await this.app.model.AdminUser.findOne({
      where: {
        username: p.username
      }
    });
    if (user === null) {
      user = await this.app.model.AdminUser.findOne({
        where: {
          mobile: p.username
        }
      });
    }
    if (user === null) {
      throw new BadRequestException(20001, '账号密码不匹配');
    }
    if (user.password !== this.encryptPassword(p.password)) {
      throw new BadRequestException(20001, '账号密码不匹配');
    }
    if (user.status === 2) {
      throw new BadRequestException(20002, '用户已禁用');
    }
    await this.app.model.AdminUser.update(
      { last_login_time: new Date() },
      {
        where: { id: user.id }
      });
    return await this.ctx.service.jwt.awardToken(user.id);
  }

  encryptPassword(password) {
    const key = this.md5Encrypt('12345654321');
    const pass = this.md5Encrypt(password);
    return this.md5Encrypt(pass + key);
  }

  md5Encrypt(str) {
    return crypto.createHash('md5').update(str).digest('hex');
  }

  /* async createCaptcha() {
    const token = nanoid();
    const captcha = svgCaptcha.create({
      size: 5,
      ignoreChars: '0o1il',
      background: '#ffffff',
      width: 120,
      height: 36,
    });
    const cacheData = {
      code: captcha.text,
      times: 0,
    };
    await this.app.redis.set(token, JSON.stringify(cacheData), 'ex', 300);
    return {
      text: captcha.text,
      token,
      code: captcha.data,
    };
  } */
  /* async validCaptcha(token, text) {
    let captcha = await this.app.redis.get(token);
    if (!captcha) {
      throw new ParamException('验证码不正确');
    }
    captcha = JSON.parse(captcha);
    if (!captcha.code) {
      throw new ParamException('验证码不正确');
    }
    if (text.toLowerCase() !== captcha.code.toLowerCase()) {
      let times = captcha.times;
      times += 1;
      if (times >= 5) {
        await this.app.redis.del(token);
      } else {
        captcha.times = times;
        const ttl = this.app.redis.ttl(token);
        if (ttl > 1) {
          await this.app.redis.set(token, JSON.stringify(captcha), 'ex', parseInt(ttl));
        }
      }
      throw new ParamException('验证码不正确');
    }
    await this.app.redis.del(token);
    return true;
  } */
}

module.exports = AdminUserService;
