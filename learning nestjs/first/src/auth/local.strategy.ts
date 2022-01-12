import { BadRequestException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { compareSync } from "bcryptjs";
import { IStrategyOptions, Strategy } from "passport-local";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";

export class LocalStorage extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
    // 比如我们是用邮箱进行验证，传入的参数是email, 那usernameField对应的value就是email
    super({
      usernameField: 'username',
      passwordField: 'password',
    } as IStrategyOptions)
  }

  // 主要实现了用户查询以及密码对比
  // 为存的密码是加密后的，没办法直接对比用户名密码，只能先根据用户名查出用户，再比对密码
  async validate(username: string, password: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password') //  否则无法做密码对比
      .where('user.username=:username', { username })
      .getOne()

    if (!user) throw new BadRequestException('用户名不正确!')

    if (!compareSync(password, user.password)) throw new BadRequestException('密码错误!')

    return user
  }
}