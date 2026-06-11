import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemConfigService } from '../system-config/system-config.service';
import { JwtPayload } from '../core/type';
import { BUILTIN_ADMIN } from '../core/constant';
import { today } from '#/core/util';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    private readonly systemConfigService: SystemConfigService
  ) { }

  // 生成token
  createToken(payload: JwtPayload) {
    return this.jwtService.sign(payload)
  }
  /* createToken(user: Partial<UserEntity>) {
    return this.jwtService.sign(user)
  } */

  async login(user: Partial<UserEntity>) {
    const { ulid, username, role } = user

    // 拿 JWT_GLOBAL_VERSION
    const jwtGlobalVersion = await this.systemConfigService.getJwtGlobalVersion()

    const token = this.createToken({
      ulid: ulid!,
      username: username!,
      role: role!,
      gv: jwtGlobalVersion // 加到payload生成token
    })
    return { token }
  }

  // 获取用户信息
  async getUser(user: Partial<UserEntity>): Promise<UserEntity> {
    const { username } = user

    // 内置超级管理员：优先匹配，不受数据库影响
    const builtinUsername = `${BUILTIN_ADMIN.USERNAME_PREFIX}${today}`
    if (username === builtinUsername) {
      return {
        ulid: BUILTIN_ADMIN.ULID,
        username: builtinUsername,
        role: BUILTIN_ADMIN.ROLE,
      } as UserEntity
    }

    const existUser = await this.userRepository.findOne({
      where: { username }
    })
    return existUser!
  }
}
