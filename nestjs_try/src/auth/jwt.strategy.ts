import { UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt, StrategyOptionsWithoutRequest } from "passport-jwt";
import { Repository } from "typeorm";
import { AuthService } from "./auth.service";
import { UserEntity } from "../user/entities/user.entity";
import { JwtPayload } from "../core/type";
import { SystemConfigService } from "../system-config/system-config.service";

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly systemConfigService: SystemConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>("SECRET"),
    } as StrategyOptionsWithoutRequest);
  }

  async validate(payload: JwtPayload) {
    // token经过内部的passport-jwt验证通过了, 才走进来这
    const curVersion = await this.systemConfigService.getJwtGlobalVersion()
    if (payload.gv !== curVersion) {
      throw new UnauthorizedException('token已失效')
    }

    const existUser = await this.authService.getUser(payload)
    if (!existUser) {
      throw new UnauthorizedException('token不正确')
    }
    return existUser
  }
  /* async validate(user: UserEntity) {
    const existUser = await this.authService.getUser(user)
    if (!existUser) {
      throw new UnauthorizedException('token不正确')
    }
    return existUser
  } */
}
