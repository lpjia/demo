import { UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { StrategyOptions, Strategy, ExtractJwt } from "passport-jwt";
import { UserEntity } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { AuthService } from "./auth.service";

export class JwtStorage extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('SECRET')
    } as StrategyOptions)
  }

  async validate(user: UserEntity) {
    const existUser = await this.authService.getUser(user)
    if (!existUser) throw new UnauthorizedException('token不正确')
    return existUser
  }
}