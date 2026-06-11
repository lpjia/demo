import { HttpException, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { PermissionEntity } from './entities/permission.entity';
import { curIdToLook } from '#/core/util/permission';
import { FindAllPermissionDto } from './dto/find-all-permission.dto';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly permissionRepository: Repository<PermissionEntity>
  ) { }

  async create(permission: CreatePermissionDto) {
    const { name } = permission;

    const existPermission = await this.permissionRepository.findOne({
      where: { name }
    });
    if (existPermission) {
      throw new HttpException('权限已存在', 409);
    }

    this.validateLookCodes(permission)

    // const computedLook = curIdToLook(curId)
    // if (look !== computedLook) {
    //   throw new HttpException('curId和look不匹配', 400);
    // }

    // let computedParentLook = ''
    // if (parentId) { // 不是null就
    //   computedParentLook = curIdToLook(parentId)
    //   if (parentLook !== computedParentLook) {
    //     throw new HttpException('parentId和parentLook不匹配', 400);
    //   }
    // }

    const entity = this.permissionRepository.create(permission);
    return await this.permissionRepository.save(entity);
  }

  // 校验curId和look是否匹配
  validateLookCodes(permission: CreatePermissionDto) {
    const { curId, look, parentId, parentLook } = permission;

    const computedLook = curIdToLook(curId)
    if (look !== computedLook) {
      throw new HttpException('curId和look不匹配', 400);
    }

    let computedParentLook = ''
    if (parentId) { // 不是null就
      computedParentLook = curIdToLook(parentId)
      if (parentLook !== computedParentLook) {
        throw new HttpException('parentId和parentLook不匹配', 400);
      }
    }
  }

  async findAll() {
    const [list, total] = await this.permissionRepository.findAndCount()
    return { total, list }
  }

  async findAllPagination(query: FindAllPermissionDto) {
    const { curPage, pageSize } = query;

    const [list, total] = await this.permissionRepository.findAndCount({
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
    const existPermission = await this.permissionRepository.findOne({
      where: { id },
    });
    if (!existPermission) {
      throw new HttpException(`id为${id}的权限不存在`, 404);
    }
    return existPermission
  }

  async updateById(id: number, permission: CreatePermissionDto) {
    const existPermission = await this.permissionRepository.findOne({
      where: { id }
    })
    if (!existPermission) {
      throw new HttpException(`id为${id}的权限不存在`, 404);
    }
    const p = await this.permissionRepository.findOne({
      where: {
        name: permission.name
      }
    })
    if (p && p.id !== id) {
      throw new HttpException('权限已存在', 409)
    }

    this.validateLookCodes(permission)

    const updatePermission = this.permissionRepository.merge(existPermission, permission);
    updatePermission.operateUpdateTime = new Date();
    try {
      await this.permissionRepository.save(updatePermission);
      return { _respMsg: '更新成功' };
    }
    catch {
      throw new HttpException('更新失败', 400);
    }
  }

  async remove(id: number) {
    const result = await this.permissionRepository.softDelete({
      id,
      deleteTime: IsNull(), // 不会重复删除"已删除"的记录
    });
    if (!result.affected) {
      throw new HttpException(`id为${id}的权限不存在或已删除`, 404);
    }
    await this.permissionRepository.update(id, {
      operateUpdateTime: new Date()
    });
    return { _respMsg: '删除成功' }
  }
}
