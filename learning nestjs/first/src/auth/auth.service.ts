import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { rejects } from 'assert';
import { loadavg } from 'os';
import { resolve } from 'path/posix';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { WxLoginDto } from './dto/wxLogin.dto';
// import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
const request = require('request')

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) { }

  // 生成 token
  createToken(user: Partial<UserEntity>) {
    return this.jwtService.sign(user)
  }

  // 登录
  async login(user: Partial<UserEntity>) {
    const token = this.createToken({
      id: user.id,
      username: user.username,
      role: user.role,
    })
    return { token }
  }

  // 获取用户信息
  async getUser(user: UserEntity): Promise<UserEntity> {
    const { username } = user
    const existUser = await this.userRepository.findOne({
      where: { username }
    })
    delete existUser['password']
    return existUser
  }


  // 微信登录
  async wxLogin(wxCode: WxLoginDto) {
    /**
     * 拿到 code 去调微信的api
     * https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
     * https://api.weixin.qq.com/sns/jscode2session?appid=wx2941ca5e9ed2305c&secret=2b8948cef875570580a6361a03f9f7f7&js_code=0213l6000dFMnN15Wk00027n5I23l60s&grant_type=authorization_code
     * 
     */
    const { code } = wxCode

    return await new Promise((resolve, rejects) => {
      request(`https://api.weixin.qq.com/sns/jscode2session?appid=wx2941ca5e9ed2305c&secret=2b8948cef875570580a6361a03f9f7f7&js_code=${code}&grant_type=authorization_code`, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          resolve(JSON.parse(body))
        } else {
          rejects(error)
        }
      })
    })
  }

  // 测试
  wxLogin2(code: string) {
    return { code: code }
  }



  /*
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  } */
}
