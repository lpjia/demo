const AuthException = require("../exception/auth");
const { isEmpty, getMaxRoleLevel, toInt } = require("../utils");

module.exports = (opt) => {
  return async function permissionLevelMiddleware(ctx, next) {
    let loginUserMaxRole = null
    /* 先判断 middlewareData 是不是存在?
    存在则说明 auth 中间件传值过来了, 是登录人的角色信息
    不存在还得在此查一次登录人的角色信息 */
    if (!isEmpty(ctx.middlewareData)) {
      /* ctx.middlewareData 值为 
      userId: 
      roles: [
        {
          role_id: 4,
          role: {
            "id": 4,
            "name": "主管",
            "level": "0004"
          }
        },
        {
          role_id: 3,
          role: {
            "id": 4,
            "name": "主管",
            "level": "0004"
          }
        },
      ] */
      const { middlewareData } = ctx
      delete ctx.middlewareData
      /* 组装 loginUser 的最大等级角色 */
      const loginUserRoles = middlewareData.roles.map((item) => item.role)
      loginUserMaxRole = getMaxRoleLevel(loginUserRoles)
      loginUserMaxRole.dataValues.userId = middlewareData.userId
    }
    else {
      const { userId } = ctx.state
      const roles = await ctx.model.AdminRoleUser.findAll({
        attributes: ['role_id'],
        where: {
          user_id: userId
        },
        /* 关联角色表 */
        include: [{
          model: ctx.model.AdminRole,
          as: 'role',
        }]
      });
      const loginUserRoles = roles.map((item) => item.role)
      loginUserMaxRole = getMaxRoleLevel(loginUserRoles)
      loginUserMaxRole.dataValues.userId = userId
    }
    delete ctx.state


    // 查询用户绑定的角色
    const targetUserId = toInt(ctx.params.id)
    const roles = await ctx.model.AdminRoleUser.findAll({
      attributes: ['role_id'],
      where: {
        user_id: targetUserId
      },
      /* 关联角色表 */
      include: [{
        model: ctx.model.AdminRole,
        as: 'role',
      }]
    });
    /* 组装 targetUser 的最大等级角色 */
    const targetUserRoles = roles.map((item) => item.role)
    const targetUserMaxRole = getMaxRoleLevel(targetUserRoles)
    /* 当被操作的用户没有绑定角色时, targetUserMaxRole 得到 null */
    if (!targetUserMaxRole) {
      await next()
    }
    else {
      targetUserMaxRole.dataValues.userId = targetUserId
      /* 比较出来两个之中谁等级更大
      和当前登录人的 userId 比较
      === 则说明登录人可以操作, 有数据权限
      !== 则没有 */
      const maxRoleLevel = getMaxRoleLevel([loginUserMaxRole, targetUserMaxRole])
      if (maxRoleLevel === '权限不足') {
        /* 0304和1205, 不同租户之间, 权限不能比较 */
        throw new AuthException('权限不足', 10002);
      }
      else if (loginUserMaxRole.dataValues.userId === maxRoleLevel.dataValues.userId) {
        /* loginUserMaxRole.userId 不用内部属性取不到值 */
        await next()
      }
      else {
        throw new AuthException('权限不足', 10002);
      }
    }
  }
}