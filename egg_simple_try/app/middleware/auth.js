const AuthException = require("../exception/auth");
const { getTokenFromAuthorization } = require("../utils");

module.exports = (name) => { // 此处name为 auth(xxx) 的xxx

  async function checkAuth(userId, ctx) {
    /* 为了在中间件之间传登录人的 id */
    ctx.state.userId = userId

    // 没传参, 意味着不需要权限即可放行
    if (!name) {
      return true;
    }
    // 查询菜单是否存在
    const menu = await ctx.model.AdminMenu.findOne({
      where: {
        api_route_name: name
      }
    });
    /* 数据库中的 api_route_name 字段是后端自己定的
    一般 auth 不会乱传参, 根据数据库已有的数据来
    如果 api_route_name 没有匹配上, 那么故意走空数据, 也就是不需要权限
    又或者权限数据被删了, 也匹配不上 */
    if (menu === null) {
      /* 没menu的话, 放行 */
      return true;
    }
    // 查询用户绑定的角色
    const roles = await ctx.model.AdminRoleUser.findAll({
      attributes: ['role_id'],
      where: {
        user_id: userId
      },
      /* 关联角色表, 为数据权限查角色 level */
      include: [{
        model: ctx.model.AdminRole,
        as: 'role',
      }]
    });
    /* 为了在中间件之间传登录人的角色数据和 userId */
    ctx.middlewareData = { roles, userId }

    const roleIds = roles.map(item => item.role_id);
    if (roleIds.includes(1)) {
      // 如果是"超级管理员"
      return true;
    }
    const Op = ctx.app.Sequelize.Op;
    // 查询用户是否有菜单的权限
    const hasAccess = await ctx.model.AdminRoleMenu.findOne({
      where: {
        role_id: {
          [Op.in]: roleIds
        },
        menu_id: menu.id
      }
    });
    if (hasAccess === null) {
      throw new AuthException('权限不足', 10002);
    }
  }

  return async function authMiddleware(ctx, next) {
    // 获取 Authorization 标头中的 token 字符串
    const authorizationHeader = ctx.request.header.authorization;

    // 检查 token 字符串是否以 Bearer 前缀开头
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw new AuthException()
    }

    // 去掉 Bearer 前缀，获取纯净的 token 字符串
    const token = authorizationHeader.substring(7); // 去掉 "Bearer " 前缀的长度

    // 通过token获取用户id
    const userId = await ctx.service.jwt.getUserIdFromToken(token);
    // 校验权限
    await checkAuth(userId, ctx);
    await next();
  }
}