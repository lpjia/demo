import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { KindEntity } from './entities/kind.entity';
import { FindAllKindDto } from './dto/find-all-kind.dto';
// import { RedisCacheService } from '#/db/redis-cache.service';

@Injectable()
export class KindService {
  constructor(
    @InjectRepository(KindEntity)
    private readonly kindRepository: Repository<KindEntity>

    // private readonly redisCacheService: RedisCacheService
  ) {}

  async create(kind: Partial<KindEntity>) {
    const { name } = kind;

    const existKind = await this.kindRepository.findOne({
      where: { name }
    });
    if (existKind) {
      throw new HttpException('分类已存在', 409);
    }

    const entity = this.kindRepository.create(kind);
    return await this.kindRepository.save(entity);
  }

  async findAll() {
    const [list, total] = await this.kindRepository.findAndCount();
    return { total, list };
  }

  async findAllPagination(query: FindAllKindDto) {
    const { curPage, pageSize } = query;

    const [list, total] = await this.kindRepository.findAndCount({
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

  async findById(id: number) {
    const existKind = await this.kindRepository.findOne({
      where: { id }
    });
    if (!existKind) {
      throw new HttpException(`id为${id}的分类不存在`, 404);
    }
    return existKind;
  }

  async updateById(id: number, tag: Partial<KindEntity>) {
    const existKind = await this.kindRepository.findOne({
      where: { id }
    });
    if (!existKind) {
      throw new HttpException(`id为${id}的分类不存在`, 404);
    }
    const k = await this.kindRepository.findOne({
      where: {
        name: tag.name
      }
    });
    if (k && k.id !== id) {
      throw new HttpException('分类已存在', 409);
    }
    const updateKind = this.kindRepository.merge(existKind, tag);
    updateKind.operateUpdateTime = new Date();
    try {
      await this.kindRepository.save(updateKind);
      return { _respMsg: '更新成功' };
    } catch {
      throw new HttpException('更新失败', 400);
    }
  }

  async remove(id: number) {
    const result = await this.kindRepository.softDelete({
      id,
      deleteTime: IsNull() // 不会重复删除"已删除"的记录
    });
    if (!result.affected) {
      throw new HttpException(`id为${id}的分类不存在或已删除`, 404);
    }
    await this.kindRepository.update(id, {
      operateUpdateTime: new Date()
    });
    return { _respMsg: '删除成功' };
  }

  // // 缓存穿透防护：查 DB → 写入缓存 → 返回
  // async findAll() {
  //   const cacheKey = 'kind:all';
  //   const cached = await this.redisCacheService.cacheGet(cacheKey);
  //   if (cached) {
  //     return cached;
  // }

  //   const list = await this.kindRepository.find();
  //   await this.redisCacheService.cacheSet(cacheKey, list, 30_000); // 30s TTL
  //   return list;
  // }

  // // 单条缓存 + 空值缓存（防止缓存穿透）
  // async findOne(id: number) {
  //   const cacheKey = `kind:${id}`;
  //   const cached = await this.redisCacheService.cacheGet(cacheKey);
  //   if (cached) {
  //     return cached;
  //   }

  //   const entity = await this.kindRepository.findOne({
  //     where: { id }
  //   });
  //   await this.redisCacheService.cacheSet(cacheKey, entity, 60_000); // 60s TTL
  //   return entity;
  // }

  // // 写操作后删除相关缓存
  // async update(id: number, updateKindDto: UpdateKindDto) {
  //   const entity = await this.kindRepository.preload({ id, ...updateKindDto });
  //   if (!entity) throw new HttpException('分类不存在', 404);
  //   const result = await this.kindRepository.save(entity);

  //   await this.redisCacheService.cacheSet(`kind:${id}`, result, 60_000);
  //   await this.redisCacheService.cacheSet('kind:all', null, 1); // 使列表缓存失效
  //   return result;
  // }

  // // 删除时清除缓存
  // async remove(id: number) {
  //   const entity = await this.findOne(id);
  //   if (!entity) {
  //     throw new HttpException('分类不存在', 404);
  //   }
  //   await this.kindRepository.remove(entity);

  //   await this.redisCacheService.cacheSet(`kind:${id}`, null, 1);
  //   await this.redisCacheService.cacheSet('kind:all', null, 1);
  // }
}
