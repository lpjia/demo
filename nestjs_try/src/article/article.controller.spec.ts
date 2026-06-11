import 'reflect-metadata';
import { Test, TestingModule } from '@nestjs/testing';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { FindAllArticleDto } from './dto/find-all-article.dto';
import { GUARDS_METADATA, HTTP_CODE_METADATA } from '@nestjs/common/constants';

describe('ArticleController', () => {
  let controller: ArticleController;
  let articleService: {
    create: jest.Mock;
    findAll: jest.Mock;
    findAllPagination: jest.Mock;
    findById: jest.Mock;
    updateById: jest.Mock;
    remove: jest.Mock;
  };

  beforeEach(async () => {
    articleService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findAllPagination: jest.fn(),
      findById: jest.fn(),
      updateById: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleController],
      providers: [
        {
          provide: ArticleService,
          useValue: articleService,
        },
      ],
    }).compile();

    controller = module.get<ArticleController>(ArticleController);
  });

  it('应该被定义', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('应该调用 ArticleService.create 并返回结果', async () => {
      const article: CreateArticleDto = {
        title: 'NestJS 入门',
        author: '张三',
        content: '文章内容',
        type: 1,
      };
      const expected = { id: 1, ...article };
      articleService.create.mockResolvedValue(expected);

      const result = await controller.create(article);

      expect(articleService.create).toHaveBeenCalledTimes(1);
      expect(articleService.create).toHaveBeenCalledWith(article);
      expect(result).toBe(expected);
    });

    it('应该设置 HttpCode 元数据为 200', () => {
      const httpCode = Reflect.getMetadata(HTTP_CODE_METADATA, ArticleController.prototype.create);

      expect(httpCode).toBe(200);
    });
  });

  describe('findAll', () => {
    it('应该调用 ArticleService.findAll 并返回结果', async () => {
      const expected = {
        list: [
          { id: 1, title: 'NestJS 入门' },
          { id: 2, title: '拉萨大家了解' },
        ],
        total: 2,
      };
      articleService.findAll.mockResolvedValue(expected);

      const result = await controller.findAll();

      expect(articleService.findAll).toHaveBeenCalledTimes(1);
      expect(result).toBe(expected);
    });

    it('应该使用 jwt 认证守卫', () => {
      const guards = Reflect.getMetadata(GUARDS_METADATA, ArticleController.prototype.findAll);

      expect(guards).toHaveLength(1);
      expect(typeof guards[0]).toBe('function');
    });
  });

  describe('findAllPagination', () => {
    it('应该调用 ArticleService.findAllPagination 并返回结果', async () => {
      const query: FindAllArticleDto = {
        curPage: 1,
        pageSize: 10,
      };
      const expected = {
        ...query,
        total: 3,
        list: [
          { id: 1, title: 'NestJS 入门' },
          { id: 10, title: '爱丽丝等级划分 入门' },
          { id: 100, title: '啊管控手段包括多个 入门' },
        ],
      };
      articleService.findAllPagination.mockResolvedValue(expected);

      const result = await controller.findAllPagination(query);

      expect(articleService.findAllPagination).toHaveBeenCalledTimes(1);
      expect(articleService.findAllPagination).toHaveBeenCalledWith(query);
      expect(result).toBe(expected);
    });

    it('应该使用 jwt 认证守卫', () => {
      const guards = Reflect.getMetadata(GUARDS_METADATA, ArticleController.prototype.findAllPagination);

      expect(guards).toHaveLength(1);
      expect(typeof guards[0]).toBe('function');
    });
  });

  describe('findById', () => {
    it('应该将 id 转为数字，调用 ArticleService.findById 并返回结果', async () => {
      const expected = { id: 111, title: 'NestJS 入门' };
      articleService.findById.mockResolvedValue(expected);

      const result = await controller.findById('111');

      expect(articleService.findById).toHaveBeenCalledTimes(1);
      expect(articleService.findById).toHaveBeenCalledWith(111);
      expect(result).toEqual(expected);
    });
  });

  describe('update', () => {
    it('应该将 id 转为数字，调用 ArticleService.updateById 并返回结果', async () => {
      const article: CreateArticleDto = {
        title: 'NestJS 进阶',
        author: '李四',
        content: '更新后的文章内容',
        type: 1,
      };
      const expected = { id: 1, ...article };
      articleService.updateById.mockResolvedValue(expected);

      const result = await controller.update('1', article);

      expect(articleService.updateById).toHaveBeenCalledTimes(1);
      expect(articleService.updateById).toHaveBeenCalledWith(1, article);
      expect(result).toBe(expected);
    });
  });

  describe('remove', () => {
    it('应该将 id 转为数字，调用 ArticleService.remove 并返回结果', async () => {
      const expected = { _respMsg: '删除成功' };
      articleService.remove.mockResolvedValue(expected);

      const result = await controller.remove('1');

      expect(articleService.remove).toHaveBeenCalledTimes(1);
      expect(articleService.remove).toHaveBeenCalledWith(1);
      expect(result).toBe(expected);
    });
  });
});
