import { HttpException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { FindAllArticleDto } from './dto/find-all-article.dto';
import { ArticleEntity } from './entities/article.entity';

describe('ArticleService', () => {
  let service: ArticleService;
  let articleRepository: {
    findOne: jest.Mock;
    save: jest.Mock;
    findAndCount: jest.Mock;
    findOneBy: jest.Mock;
    merge: jest.Mock;
    softDelete: jest.Mock;
  };

  const mockArticle: ArticleEntity = {
    id: 1,
    title: 'NestJS 入门',
    author: '张三',
    content: '文章内容',
    coverUrl: '',
    type: 1,
    typeText: '原创',
    createTime: new Date('2024-01-01T00:00:00.000Z'),
    updateTime: new Date('2024-01-02T00:00:00.000Z'),
    deleteTime: undefined as unknown as Date,
    setTypeText: jest.fn(),
  };

  beforeEach(async () => {
    articleRepository = {
      findOne: jest.fn(),
      save: jest.fn(),
      findAndCount: jest.fn(),
      findOneBy: jest.fn(),
      merge: jest.fn(),
      softDelete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticleService,
        {
          provide: getRepositoryToken(ArticleEntity),
          useValue: articleRepository,
        },
      ],
    }).compile();

    service = module.get<ArticleService>(ArticleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('当 title 缺失时应抛出异常', async () => {
      await expect(service.create({ author: '张三' })).rejects.toThrow(
        new HttpException('缺少文章标题', 400),
      );
      expect(articleRepository.findOne).not.toHaveBeenCalled();
    });

    it('当文章已存在时应抛出异常', async () => {
      articleRepository.findOne.mockResolvedValueOnce(mockArticle);

      await expect(service.create({ title: mockArticle.title })).rejects.toThrow(
        new HttpException('文章已存在', 409),
      );

      expect(articleRepository.findOne).toHaveBeenCalledWith({
        where: { title: mockArticle.title },
      });
      expect(articleRepository.save).not.toHaveBeenCalled();
    });

    it('应创建文章并返回新文章', async () => {
      const article: Partial<ArticleEntity> = {
        title: 'NestJS 实战',
        author: '李四',
        content: '新的文章内容',
        type: 1,
      };
      const createdArticle = { ...mockArticle, ...article, id: 2 };

      articleRepository.findOne
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(createdArticle);
      articleRepository.save.mockResolvedValue(createdArticle);

      const result = await service.create(article);

      expect(articleRepository.save).toHaveBeenCalledWith(article);
      expect(result).toEqual(createdArticle);
    });

    it('当保存失败时应抛出异常', async () => {
      const article: Partial<ArticleEntity> = {
        title: 'NestJS 失败案例',
        author: '王五',
        content: '文章内容',
        type: 1,
      };

      articleRepository.findOne.mockResolvedValueOnce(null);
      articleRepository.save.mockResolvedValue(null);

      await expect(service.create(article)).rejects.toThrow(
        new HttpException('文章创建失败', 500),
      );
    });
  });

  describe('findAll', () => {
    it('应返回文章列表和总数', async () => {
      const list = [mockArticle, { ...mockArticle, id: 2, title: 'TypeScript 进阶' }];
      articleRepository.findAndCount.mockResolvedValue([list, 2]);

      const result = await service.findAll();

      expect(articleRepository.findAndCount).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ list, total: 2 });
    });
  });

  describe('findAllPagination', () => {
    it('应按分页参数返回文章列表', async () => {
      const query: FindAllArticleDto = {
        curPage: 2,
        pageSize: 10,
      };
      const list = [mockArticle];
      articleRepository.findAndCount.mockResolvedValue([list, 11]);

      const result = await service.findAllPagination(query);

      expect(articleRepository.findAndCount).toHaveBeenCalledWith({
        skip: 10,
        take: 10,
      });
      expect(result).toEqual({
        curPage: 2,
        pageSize: 10,
        total: 11,
        list,
      });
    });
  });

  describe('findById', () => {
    it('当文章存在时应返回文章', async () => {
      articleRepository.findOne.mockResolvedValue(mockArticle);

      const result = await service.findById(1);

      expect(articleRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toBe(mockArticle);
    });

    it('当文章不存在时应抛出异常', async () => {
      articleRepository.findOne.mockResolvedValue(null);

      await expect(service.findById(999)).rejects.toThrow(
        new HttpException('id为999的文章不存在', 404),
      );
    });
  });

  describe('updateById', () => {
    const updateDto: CreateArticleDto = {
      title: 'NestJS 更新后',
      author: '赵六',
      content: '更新内容',
      type: 2,
    };

    it('当原文章不存在时应抛出异常', async () => {
      articleRepository.findOne.mockResolvedValue(null);

      await expect(service.updateById(1, updateDto)).rejects.toThrow(
        new HttpException('id为1的文章不存在', 404),
      );

      expect(articleRepository.findOneBy).not.toHaveBeenCalled();
    });

    it('当标题与其他文章重复时应抛出异常', async () => {
      articleRepository.findOne.mockResolvedValue(mockArticle);
      articleRepository.findOneBy.mockResolvedValue({ ...mockArticle, id: 2, title: updateDto.title });

      await expect(service.updateById(1, updateDto)).rejects.toThrow(
        new HttpException('文章已存在', 409),
      );
    });

    it('应合并并保存更新后的文章', async () => {
      const mergedArticle = { ...mockArticle, ...updateDto };
      articleRepository.findOne.mockResolvedValue(mockArticle);
      articleRepository.findOneBy.mockResolvedValue({ ...mockArticle, id: 1, title: updateDto.title });
      articleRepository.merge.mockReturnValue(mergedArticle);
      articleRepository.save.mockResolvedValue(mergedArticle);

      const result = await service.updateById(1, updateDto);

      expect(articleRepository.merge).toHaveBeenCalledWith(mockArticle, updateDto);
      expect(articleRepository.save).toHaveBeenCalledWith(mergedArticle);
      expect(result).toEqual(mergedArticle);
    });
  });

  describe('remove', () => {
    it('删除成功时应返回成功消息', async () => {
      articleRepository.softDelete.mockResolvedValue({ affected: 1 });

      const result = await service.remove(1);

      expect(articleRepository.softDelete).toHaveBeenCalledWith({
        id: 1,
        deleteTime: expect.anything(),
      });
      expect(result).toEqual({ _respMsg: '删除成功' });
    });

    it('删除不存在的文章时应抛出 NotFoundException', async () => {
      articleRepository.softDelete.mockResolvedValue({ affected: 0 });

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      await expect(service.remove(999)).rejects.toThrow('id为999的文章不存在或已删除');
    });
  });
});
