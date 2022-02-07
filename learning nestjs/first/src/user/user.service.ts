import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) { }

  async register(createUser: CreateUserDto) {
    const { username } = createUser

    const existUser = await this.userRepository.findOne({
      where: { username }
    })
    if (existUser) throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST)

    const newUser = await this.userRepository.create(createUser) // 相当于 new User(createUser) // 只是创建了一个新的用户对象
    return await this.userRepository.save(newUser)
  }

  create(user: CreateUserDto) {
    return this.register(user)
  }

  // //
  // async getUser(user: UserEntity) {
  //   const { username } = user
  //   const existUser = await this.userRepository.findOne({
  //     where: { username }
  //   })

  //   return existUser

  //   // return 'true'
  // }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
