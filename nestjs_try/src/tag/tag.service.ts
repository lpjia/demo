import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagEntity } from './entities/tag.entity';
import { IsNull, Repository } from 'typeorm';
import { FindAllTagDto } from './dto/find-all-tag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>
  ) { }

  async create(tag: Partial<TagEntity>) {
    const { name } = tag;

    const existTag = await this.tagRepository.findOne({
      where: { name }
    });
    if (existTag) {
      throw new HttpException('标签已存在', 409);
    }

    const entity = this.tagRepository.create(tag);
    return await this.tagRepository.save(entity);
  }

  async findAll() {
    const [list, total] = await this.tagRepository.findAndCount()
    return { total, list }
  }

  async findAllPagination(query: FindAllTagDto) {
    const { curPage, pageSize } = query;

    const [list, total] = await this.tagRepository.findAndCount({
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
    const existTag = await this.tagRepository.findOne({
      where: { id },
    });
    if (!existTag) {
      throw new HttpException(`id为${id}的标签不存在`, 404);
    }
    return existTag
  }

  async updateById(id: number, tag: Partial<TagEntity>) {
    const existTag = await this.tagRepository.findOne({
      where: { id }
    })
    if (!existTag) {
      throw new HttpException(`id为${id}的标签不存在`, 404);
    }
    const t = await this.tagRepository.findOne({
      where: {
        name: tag.name
      }
    })
    if (t && t.id !== id) {
      throw new HttpException('标签已存在', 409)
    }
    const updateTag = this.tagRepository.merge(existTag, tag);
    updateTag.operateUpdateTime = new Date();
    try {
      await this.tagRepository.save(updateTag);
      return { _respMsg: '更新成功' };
    }
    catch {
      throw new HttpException('更新失败', 400);
    }
  }

  async remove(id: number) {
    const result = await this.tagRepository.softDelete({
      id,
      deleteTime: IsNull(), // 不会重复删除"已删除"的记录
    });
    if (!result.affected) {
      throw new HttpException(`id为${id}的标签不存在或已删除`, 404);
    }
    await this.tagRepository.update(id, {
      operateUpdateTime: new Date()
    });
    return { _respMsg: '删除成功' }
  }
}
