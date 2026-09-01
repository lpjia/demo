import { userRoleMap } from '#/common/constant';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  SetMetadata
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

type RoleParam = (typeof userRoleMap)[keyof typeof userRoleMap];

/** 免校验角色列表 */
const bypassRoles = ['root', 'super_admin'] as const;

// 角色装饰器@Roles
export const Roles = (roles: string[]) => SetMetadata('roles', roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService
  ) {}

  canActivate(context: ExecutionContext): boolean {
    // 获取路由角色
    // 获得路径设置的可访问角色，定义了@Roles装饰器， 并使用Reflector辅助类获取
    const roles = this.reflector.get('roles', context.getHandler()); // get roles是装饰器@Roles
    if (!roles) {
      return true;
    }

    // 读取user
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    if (!user) {
      return false;
    }

    // bypassRoles 中的角色直接放行
    if (bypassRoles.includes(userRoleMap[user.role])) {
      // 用户角色暂时定义是单角色
      // 多角色的话, 前端得先去重, 再传给后台
      return true;
    }

    // 判断用户的角色是否包含和roles相同的角色列表
    const hasRoles = roles.some(
      (role: RoleParam) => role === userRoleMap[user.role]
    );
    if (!hasRoles) {
      throw new HttpException('权限不足', 403);
    }

    return hasRoles;
  }
}
