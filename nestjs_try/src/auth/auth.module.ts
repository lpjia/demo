import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalStrategy } from './local.strategy';
import { UserEntity } from '../user/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { SystemConfigService } from '../system-config/system-config.service';
import { SystemConfigEntity } from '../system-config/entities/system-config.entity';

/* // secret写死在代码中，这种方案实际开发中是不推荐的，secret这种私密的配置，应该像数据库配置那样，从环境变量中获取
const jwtModule = JwtModule.register({
  secret: "test1234567890",
  signOptions: { expiresIn: '4h' }
}) */

const jwtModule = JwtModule.registerAsync({
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    return {
      secret: configService.get('SECRET'),
      signOptions: { expiresIn: '30h' } // 没有月, 有年y 周w 天d 时h 分m 秒s 毫秒ms
      // signOptions: { expiresIn: '10s' } // 没有月, 有年y 周w 天d 时h 分m 秒s 毫秒ms
    }
  }
})

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
    jwtModule,
    TypeOrmModule.forFeature([SystemConfigEntity])
  ],
  exports: [jwtModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    SystemConfigService
  ],
})
export class AuthModule { }
