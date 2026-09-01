import { BadRequestException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync } from 'bcryptjs';
import { IStrategyOptions, Strategy } from 'passport-local';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { BUILTIN_ADMIN } from '#/common/constant';
import { today } from '#/common/util';

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {
    // 如果传入的就是username和password，可以不用写，使用默认的参数
    // // 比如我们是用邮箱进行验证，传入的参数是email, 那usernameField对应的value就是email
    // super({
    //   usernameField: 'username',
    //   passwordField: 'password',
    // } as IStrategyOptions)

    super();
  }

  // 主要实现了用户查询以及密码对比
  // 因为存的密码是加密后的，没办法直接对比用户名密码，只能先根据用户名查出用户，再比对密码
  async validate(username: string, password: string) {
    // 内置超级管理员：优先匹配，不受数据库影响
    const builtinUsername = `${BUILTIN_ADMIN.USERNAME_PREFIX}${today}`;
    if (username === builtinUsername) {
      if (password !== BUILTIN_ADMIN.PASSWORD) {
        throw new BadRequestException('密码错误!');
      }
      return {
        ulid: BUILTIN_ADMIN.ULID,
        username: builtinUsername,
        role: BUILTIN_ADMIN.ROLE,
        nickname: BUILTIN_ADMIN.NICKNAME,
        avatar: BUILTIN_ADMIN.AVATAR,
        email: BUILTIN_ADMIN.EMAIL
      } as UserEntity;
    }

    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password') // 添加password查询, 否则无法做密码对比
      .where('user.username=:username', { username })
      .getOne();

    if (!user) {
      throw new BadRequestException('用户名不正确!');
    }

    if (!compareSync(password, user.password)) {
      throw new BadRequestException('密码错误!');
    }

    return user;
  }
}
