import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { IsNull, Repository } from 'typeorm';
import { FindAllRoleDto } from './dto/find-all-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>
  ) { }

  async create(role: Partial<RoleEntity>) {
    const { name } = role;

    const existRole = await this.roleRepository.findOne({
      where: { name }
    });
    if (existRole) {
      throw new HttpException('角色已存在', 409);
    }

    const entity = this.roleRepository.create(role);
    return await this.roleRepository.save(entity);
  }

  async findAll() {
    const [list, total] = await this.roleRepository.findAndCount()
    return { total, list }
  }

  async findAllPagination(query: FindAllRoleDto) {
    const { curPage, pageSize } = query;

    const [list, total] = await this.roleRepository.findAndCount({
      skip: (curPage - 1) * pageSize,
      take: pageSize,
    });

    return {
      curPage,
      pageSize,
      total,
      list,
    };
  }

  async findById(id: number) {
    const existRole = await this.roleRepository.findOne({
      where: { id },
      relations: ['roleList', 'roleList.permission']
    });
    if (!existRole) {
      throw new HttpException(`id为${id}的角色不存在`, 404);
    }
    return existRole
  }

  async updateById(id: number, role: Partial<RoleEntity>) {
    const existRole = await this.roleRepository.findOne({
      where: { id }
    })
    if (!existRole) {
      throw new HttpException(`id为${id}的角色不存在`, 404);
    }
    const r = await this.roleRepository.findOne({
      where: {
        name: role.name
      }
    })
    if (r && r.id !== id) {
      throw new HttpException('角色已存在', 409)
    }
    const updateRole = this.roleRepository.merge(existRole, role);
    updateRole.operateUpdateTime = new Date();
    try {
      await this.roleRepository.save(updateRole);
      return { _respMsg: '更新成功' };
    }
    catch {
      throw new HttpException('更新失败', 400);
    }
  }

  async remove(id: number) {
    const result = await this.roleRepository.softDelete({
      id,
      deleteTime: IsNull(), // 不会重复删除"已删除"的记录
    });
    if (!result.affected) {
      throw new HttpException(`id为${id}的角色不存在或已删除`, 404);
    }
    await this.roleRepository.update(id, {
      operateUpdateTime: new Date()
    });
    return { _respMsg: '删除成功' }
  }
}
