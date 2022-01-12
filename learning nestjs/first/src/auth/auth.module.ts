import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStorage } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';

const jwtModule = JwtModule.register({
  secret: 'test123456',
  signOptions: { expiresIn: '3h' }
})

@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule, jwtModule],
  exports: [jwtModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStorage]
})
export class AuthModule { }
