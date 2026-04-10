import { Test, TestingModule } from '@nestjs/testing';
import { ArticleService } from './article.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ArticleEntity } from './entities/article.entity';
import { HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';

describe('ArticleService', () => {
  let service: ArticleService;
  let repository: Repository<ArticleEntity>;

  const mockRepository = {
    save: jest.fn(),
    findOne: jest.fn(),
    findAndCount: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticleService,
        {
          provide: getRepositoryToken(ArticleEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ArticleService>(ArticleService);
    repository = module.get<Repository<ArticleEntity>>(getRepositoryToken(ArticleEntity));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an article successfully', async () => {
      const articleDto = { title: 'Test Article', content: 'Test Content' };
      const expectedArticle = { id: 1, ...articleDto };

      mockRepository.findOne.mockResolvedValue(null);
      mockRepository.save.mockResolvedValue(expectedArticle);

      const result = await service.create(articleDto);

      expect(result).toEqual(expectedArticle);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { title: articleDto.title }
      });
      expect(mockRepository.save).toHaveBeenCalledWith(articleDto);
    });

    it('should throw error if title is missing', async () => {
      const articleDto = { content: 'Test Content' };

      await expect(service.create(articleDto)).rejects.toThrow(
        new HttpException('缺少文章标题', 401)
      );
    });

    it('should throw error if article already exists', async () => {
      const articleDto = { title: 'Existing Article', content: 'Test Content' };

      mockRepository.findOne.mockResolvedValue({ id: 1, ...articleDto });

      await expect(service.create(articleDto)).rejects.toThrow(
        new HttpException('文章已存在', 409)
      );
    });
  });

  describe('findAll', () => {
    it('should return articles list and total count', async () => {
      const expectedResult = {
        list: [
          { id: 1, title: 'Article 1', content: 'Content 1' },
          { id: 2, title: 'Article 2', content: 'Content 2' }
        ],
        total: 2
      };

      mockRepository.findAndCount.mockResolvedValue([expectedResult.list, expectedResult.total]);

      const result = await service.findAll();

      expect(result).toEqual(expectedResult);
      expect(mockRepository.findAndCount).toHaveBeenCalled();
    });
  });
});
