import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { IsNull, Repository } from 'typeorm';
import { FindAllUserDto } from './dto/find-all-user.dto';
import { isEmptyThree } from '#/common/util';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async register(user: Partial<UserEntity>): Promise<UserEntity> {
    const { username } = user;
    // if (!username) { // 在dto加校验
    //   throw new HttpException('缺少用户名', 400);
    // }
    const existUser = await this.userRepository.findOne({
      where: { username }
    });
    if (existUser) {
      throw new HttpException('用户名已存在', 409);
    }

    const entity = this.userRepository.create(user);
    // 前端传什么字段, 就返回给前端什么字段, 少传也不返回某字段, 不推荐, 容易歧义
    return await this.userRepository.save(entity);
  }
  /* async register(user: Partial<UserEntity>): Promise<UserEntity> {
    const { username } = user;
    // if (!username) { // 在dto加校验
    //   throw new HttpException('缺少用户名', 400);
    // }
    const existUser = await this.userRepository.findOne({
      where: { username }
    });
    if (existUser) {
      throw new HttpException('用户名已存在', 409);
    }
    // 先存再查, deleteTime字段则不会存在
    // 先create再save, 才会触发生周期钩子
    // create方法返回的是真正的实体obj对象
    // userRepository.create(user)相当于new User(createUser), 只是创建了一个新的用户对象
    const entity = this.userRepository.create(user);
    const result = await this.userRepository.save(entity);
    if (!result) {
      throw new HttpException('用户创建失败', 500);
    }
    const newUser = await this.userRepository.findOne({
      where: { username }
    });
    return newUser!;
  } */

  async findAll() {
    const [list, total] = await this.userRepository.findAndCount();
    return { total, list };
  }

  async findAllPagination(query: FindAllUserDto) {
    const { curPage, pageSize } = query;

    // 分页查询
    // 每页10条, 索引是0->10, 11->20
    const [list, total] = await this.userRepository.findAndCount({
      skip: (curPage - 1) * pageSize,
      take: pageSize
    });

    return {
      curPage,
      pageSize,
      total,
      list
    };
  }

  async findById(ulid: string) {
    const existUser = await this.userRepository.findOne({
      where: { ulid }
    });
    if (!existUser) {
      throw new HttpException(`ulid为${ulid}的用户不存在`, 404);
    }
    return existUser;
  }

  async updateById(ulid: string, user: Partial<UserEntity>) {
    const existUser = await this.userRepository.findOne({
      where: { ulid }
    });
    if (!existUser) {
      throw new HttpException(`ulid为${ulid}的用户不存在`, 404);
    }
    const u = await this.userRepository.findOneBy({ username: user.username });
    if (u && u.ulid !== ulid) {
      // 得排除自身
      throw new HttpException('用户名已存在', 409);
    }
    const cleanUser = Object.fromEntries(
      Object.entries(user).filter(([_, v]) => !isEmptyThree(v)) // 字段值为空的字段全都去掉
    );
    const updateUser = this.userRepository.merge(existUser, cleanUser);
    updateUser.operateUpdateTime = new Date(); // 调接口改数据才更新operateUpdateTime
    try {
      await this.userRepository.save(updateUser);
      return { _respMsg: '更新成功' };
    } catch {
      throw new HttpException('更新失败', 400);
    }
  }

  async remove(ulid: string) {
    const result = await this.userRepository.softDelete({
      ulid,
      deleteTime: IsNull() // 不会重复删除"已删除"的记录
    });
    if (!result.affected) {
      throw new NotFoundException(`ulid为${ulid}的文章不存在或已删除`);
    }
    await this.userRepository.update(ulid, {
      operateUpdateTime: new Date()
    });
    return { _respMsg: '删除成功' };
  }
}
