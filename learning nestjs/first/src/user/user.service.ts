import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  async register(createUser: CreateUserDto) {
    const { username } = createUser

    const existUser = await this.userRepository.findOne({
      where: { username }
    })
    if (existUser) throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST)

    const newUser = await this.userRepository.create(createUser)
    // return await this.userRepository.save(newUser)

    // 以下是隐藏 password 数据
    await this.userRepository.save(newUser)
    return await this.userRepository.findOne({ where: { username } })
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

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
